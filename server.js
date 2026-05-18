import { createReadStream, existsSync } from 'node:fs'
import { readFile } from 'node:fs/promises'
import { createServer } from 'node:http'
import net from 'node:net'
import path from 'node:path'
import tls from 'node:tls'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const distDir = path.join(__dirname, 'dist')
const envPath = path.join(__dirname, '.env')
const maxBodyBytes = 64 * 1024

await loadEnvFile()

const port = Number(process.env.PORT || 4173)
const contactToEmail = process.env.CONTACT_TO_EMAIL || 'sahilsvaghela007@gmail.com'

async function loadEnvFile() {
  if (!existsSync(envPath)) {
    return
  }

  const envText = await readFile(envPath, 'utf8')

  envText.split(/\r?\n/).forEach((line) => {
    const trimmed = line.trim()

    if (!trimmed || trimmed.startsWith('#')) {
      return
    }

    const equalsIndex = trimmed.indexOf('=')

    if (equalsIndex === -1) {
      return
    }

    const key = trimmed.slice(0, equalsIndex).trim()
    let value = trimmed.slice(equalsIndex + 1).trim()

    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1)
    }

    if (!process.env[key]) {
      process.env[key] = value
    }
  })
}

function sendJson(response, statusCode, payload) {
  response.writeHead(statusCode, {
    'Access-Control-Allow-Origin': process.env.CORS_ORIGIN || '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json; charset=utf-8',
  })
  response.end(JSON.stringify(payload))
}

function sendText(response, statusCode, text) {
  response.writeHead(statusCode, {
    'Access-Control-Allow-Origin': process.env.CORS_ORIGIN || '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'text/plain; charset=utf-8',
  })
  response.end(text)
}

function readRequestBody(request) {
  return new Promise((resolve, reject) => {
    let body = ''
    let size = 0

    request.setEncoding('utf8')

    request.on('data', (chunk) => {
      size += Buffer.byteLength(chunk)

      if (size > maxBodyBytes) {
        reject(new Error('Request body is too large.'))
        request.destroy()
        return
      }

      body += chunk
    })

    request.on('end', () => resolve(body))
    request.on('error', reject)
  })
}

function validateContactPayload(payload) {
  const fromName = String(payload.from_name || '').trim()
  const fromEmail = String(payload.from_email || '').trim()
  const message = String(payload.message || '').trim()

  if (!fromName || !fromEmail || !message) {
    throw new Error('Name, email, and message are required.')
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fromEmail)) {
    throw new Error('A valid email address is required.')
  }

  return { fromName, fromEmail, message }
}

function sanitizeHeader(value) {
  return String(value).replace(/[\r\n]+/g, ' ').trim()
}

function encodeHeader(value) {
  const sanitized = sanitizeHeader(value)

  if (/^[\x20-\x7E]*$/.test(sanitized)) {
    return sanitized
  }

  return `=?UTF-8?B?${Buffer.from(sanitized, 'utf8').toString('base64')}?=`
}

function formatAddress(email, name) {
  const safeEmail = sanitizeHeader(email)
  const safeName = encodeHeader(name)
  return safeName ? `${safeName} <${safeEmail}>` : safeEmail
}

function dotStuff(text) {
  return text
    .replace(/\r?\n/g, '\r\n')
    .split('\r\n')
    .map((line) => (line.startsWith('.') ? `.${line}` : line))
    .join('\r\n')
}

function buildContactEmail({ fromName, fromEmail, message }) {
  const smtpUser = process.env.SMTP_USER
  const fromAddress = process.env.CONTACT_FROM_EMAIL || smtpUser
  const subject = `Portfolio contact from ${fromName}`
  const textBody = [
    `Name: ${fromName}`,
    `Email: ${fromEmail}`,
    '',
    'Message:',
    message,
  ].join('\n')

  const headers = [
    `From: ${formatAddress(fromAddress, 'Portfolio Contact')}`,
    `Reply-To: ${formatAddress(fromEmail, fromName)}`,
    `To: ${contactToEmail}`,
    `Subject: ${encodeHeader(subject)}`,
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: 8bit',
  ].join('\r\n')

  return `${headers}\r\n\r\n${textBody.replace(/\r?\n/g, '\r\n')}`
}

class SmtpClient {
  constructor(socket) {
    this.socket = socket
    this.buffer = ''
    this.lines = []
  }

  setSocket(socket) {
    this.socket = socket
    this.buffer = ''
    this.lines = []
  }

  readResponse() {
    return new Promise((resolve, reject) => {
      const cleanup = () => {
        this.socket.off('data', onData)
        this.socket.off('error', onError)
      }

      const finishIfReady = () => {
        let newlineIndex = this.buffer.indexOf('\n')

        while (newlineIndex !== -1) {
          const line = this.buffer.slice(0, newlineIndex).replace(/\r$/, '')
          this.buffer = this.buffer.slice(newlineIndex + 1)
          this.lines.push(line)

          if (/^\d{3} /.test(line)) {
            const response = this.lines.join('\n')
            this.lines = []
            cleanup()
            resolve(response)
            return
          }

          newlineIndex = this.buffer.indexOf('\n')
        }
      }

      const onData = (chunk) => {
        this.buffer += chunk
        finishIfReady()
      }

      const onError = (error) => {
        cleanup()
        reject(error)
      }

      this.socket.on('data', onData)
      this.socket.on('error', onError)
      finishIfReady()
    })
  }

  async command(command, expectedCodes) {
    if (command) {
      this.socket.write(`${command}\r\n`)
    }

    const response = await this.readResponse()
    const code = Number(response.slice(0, 3))

    if (!expectedCodes.includes(code)) {
      throw new Error(`SMTP command failed (${command || 'connect'}): ${response}`)
    }

    return response
  }
}

function connectSmtp({ host, port, secure }) {
  return new Promise((resolve, reject) => {
    const socket = secure
      ? tls.connect({ host, port, servername: host })
      : net.connect({ host, port })

    socket.setEncoding('utf8')
    socket.once(secure ? 'secureConnect' : 'connect', () => resolve(socket))
    socket.once('error', reject)
  })
}

function upgradeToTls(socket, host) {
  return new Promise((resolve, reject) => {
    const secureSocket = tls.connect({ socket, servername: host })
    secureSocket.setEncoding('utf8')
    secureSocket.once('secureConnect', () => resolve(secureSocket))
    secureSocket.once('error', reject)
  })
}

async function sendContactEmail(payload) {
  const host = process.env.SMTP_HOST
  const port = Number(process.env.SMTP_PORT || 465)
  const user = process.env.SMTP_USER
  const pass = process.env.SMTP_PASS
  const secure = process.env.SMTP_SECURE === 'false' ? false : port === 465

  if (!host || !user || !pass) {
    throw new Error('SMTP_HOST, SMTP_USER, and SMTP_PASS must be configured.')
  }

  const mailFrom = process.env.CONTACT_FROM_EMAIL || user
  const socket = await connectSmtp({ host, port, secure })
  const client = new SmtpClient(socket)

  try {
    await client.command(null, [220])
    await client.command('EHLO portfolio.local', [250])

    if (!secure) {
      await client.command('STARTTLS', [220])
      client.setSocket(await upgradeToTls(socket, host))
      await client.command('EHLO portfolio.local', [250])
    }

    await client.command('AUTH LOGIN', [334])
    await client.command(Buffer.from(user).toString('base64'), [334])
    await client.command(Buffer.from(pass).toString('base64'), [235])
    await client.command(`MAIL FROM:<${mailFrom}>`, [250])
    await client.command(`RCPT TO:<${contactToEmail}>`, [250, 251])
    await client.command('DATA', [354])

    client.socket.write(`${dotStuff(buildContactEmail(payload))}\r\n.\r\n`)
    await client.command(null, [250])
    await client.command('QUIT', [221])
  } finally {
    client.socket.end()
  }
}

async function handleContact(request, response) {
  try {
    const body = await readRequestBody(request)
    const payload = validateContactPayload(JSON.parse(body || '{}'))

    await sendContactEmail(payload)
    sendJson(response, 200, { ok: true })
  } catch (error) {
    console.error('Contact form error:', error)
    sendJson(response, 500, { ok: false, error: 'Message could not be sent.' })
  }
}

function getContentType(filePath) {
  const extension = path.extname(filePath)

  return {
    '.css': 'text/css; charset=utf-8',
    '.html': 'text/html; charset=utf-8',
    '.js': 'text/javascript; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.svg': 'image/svg+xml',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.webp': 'image/webp',
  }[extension] || 'application/octet-stream'
}

function serveStatic(request, response) {
  const url = new URL(request.url, `http://${request.headers.host}`)
  const decodedPath = decodeURIComponent(url.pathname)
  const requestedPath = path.normalize(decodedPath).replace(/^(\.\.[/\\])+/, '')
  let filePath = path.join(distDir, requestedPath)

  if (!filePath.startsWith(distDir)) {
    sendText(response, 403, 'Forbidden')
    return
  }

  if (!existsSync(filePath) || decodedPath === '/') {
    filePath = path.join(distDir, 'index.html')
  }

  if (!existsSync(filePath)) {
    sendText(response, 404, 'Run npm run build before starting the server.')
    return
  }

  response.writeHead(200, {
    'Content-Type': getContentType(filePath),
  })
  createReadStream(filePath).pipe(response)
}

const server = createServer((request, response) => {
  if (request.url?.startsWith('/api/contact')) {
    if (request.method === 'OPTIONS') {
      sendJson(response, 204, {})
      return
    }

    if (request.method !== 'POST') {
      sendJson(response, 405, { ok: false, error: 'Method not allowed.' })
      return
    }

    handleContact(request, response)
    return
  }

  serveStatic(request, response)
})

server.listen(port)
