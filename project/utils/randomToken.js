import crypto from "crypto"
const buffer = crypto.randomBytes(32);
const token = buffer.toString('hex')

const hash = crypto.createHash('sha256').update(token).digest('hex')
const expiry = Date.now() + 15 * 60 * 1000

export { token, hash, expiry }