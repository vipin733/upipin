import moment from "moment"
import CryptoJS from "crypto-js"

export const cryptPin = (text) => {
    let salt = process.env.NEXT_PUBLIC_ANALYTICS_SALT
    const textToChars = (text) => text.split("").map((c) => c.charCodeAt(0));
    const byteHex = (n) => ("0" + Number(n).toString(16)).substr(-2);
    const applySaltToChar = (code) => textToChars(salt).reduce((a, b) => a ^ b, code);
    return text
        .split("")
        .map(textToChars)
        .map(applySaltToChar)
        .map(byteHex)
        .join("");
};

export const decryptPin = (encoded) => {
    let salt = process.env.NEXT_PUBLIC_ANALYTICS_SALT
    const textToChars = (text) => text.split("").map((c) => c.charCodeAt(0));
    const applySaltToChar = (code) => textToChars(salt).reduce((a, b) => a ^ b, code);
    return encoded
        .match(/.{1,2}/g)
        .map((hex) => parseInt(hex, 16))
        .map(applySaltToChar)
        .map((charCode) => String.fromCharCode(charCode))
        .join("");
}

export const _csrfTokenCreate = (req) => {
    let salt = process.env.COOKIES_KEY
    let data = {
        time: moment().toDate(),
        domain: req.headers.host
    }
    let token = JSON.stringify(data)
    let CSRF = CryptoJS.AES.encrypt(token, salt).toString()
    return CSRF
}

export const _csrfTokenDecode = (token) => {
    let salt = process.env.COOKIES_KEY
    let bytes  = CryptoJS.AES.decrypt(token, salt)
    let originalText = bytes.toString(CryptoJS.enc.Utf8)
    return JSON.parse(originalText)
}