const crypto = require('crypto')
const fs = require("fs")

const generatKey = () => {
    return new Promise((res ) => {
        crypto.generateKeyPair('rsa', {
            modulusLength: 4096,
            publicKeyEncoding: {
                type: 'spki',
                format: 'pem'
            },
            privateKeyEncoding: {
                type: 'pkcs8',
                format: 'pem'
            }
        }, (err, publicKey, privateKey) => {
            fs.writeFileSync('./private.pem',privateKey)
            fs.writeFileSync('./public.pem',publicKey)
            return res(true)
        })
    })
}
const getKey = async (isPublic = true) => {
    if (!fs.existsSync("./private.pem")) {
        await generatKey()
    }
    if (isPublic) {
        return fs.readFileSync("./public.pem").toString()
    }
    return fs.readFileSync("./private.pem").toString()
}

const encrypt = (text, publicKey) => {
  const buffer = Buffer.from(text);
  const encrypted = crypto.publicEncrypt(publicKey, buffer);
  return encrypted.toString('hex');
}

const decrypt = (text, privateKey) => {
  const buffer = Buffer.from(text, 'hex');
  const decrypted = crypto.privateDecrypt(privateKey, buffer);
  return decrypted.toString('utf8');
}

export const _createPaymentUrl = async (obj = {}) => {
    let publicKey = await getKey()
    obj = JSON.stringify(obj)
    return encrypt(obj, publicKey)
}

export const _decodePaymentUrl = async (encrypted, isMobileEncrpt = true) => {
    let privateKey = await getKey(false)
    let data = JSON.parse(decrypt(encrypted, privateKey))
    if (isMobileEncrpt) {
        data = {...data, mobile: _encryptMobile(data.mobile)}
    }
    return data
}

export const _encryptMobile = (mobile) => {
    mobile = mobile.toString()
    return `XXXXXX${mobile.substr(mobile.length - 4)}`
}