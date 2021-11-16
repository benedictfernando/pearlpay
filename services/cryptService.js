const se = require('simple-encryptor')(process.env.PASSPHRASE);

const x = {
    encrypt: val => {
        return encodeURIComponent(se.encrypt(val));
    },

    decrypt: val => {
        return se.decrypt(decodeURIComponent(val));
    }
}

module.exports = x;