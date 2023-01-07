
const crypto = require('crypto')
const BLOCK_SIZE = 16
function pad(s) {
    return s + (BLOCK_SIZE - s.length % BLOCK_SIZE) * String.fromCharCode(BLOCK_SIZE - s.length % BLOCK_SIZE);
}

const getPrivateKey = () => {
    const { SECRET_KEY, SALT_KEY } = process.env
    return crypto.pbkdf2Sync(SECRET_KEY, SALT_KEY, 1000, 32, 'sha256')
}

export const EncryptWithAES = (pin) => {
    const privateKey = getPrivateKey()
    const iv = Buffer.alloc(BLOCK_SIZE)
    const cipher = crypto.createCipheriv('aes-256-cbc', privateKey, iv)
    pin = pad(pin)
    let encrypted = cipher.update(pin, 'utf8', 'base64')
    encrypted += cipher.final('base64')
    return encrypted
}