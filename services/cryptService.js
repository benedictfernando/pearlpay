const se = require('simple-encryptor')('benedictfernando');

const x = {
    encrypt: val => {
        return encodeURIComponent(se.encrypt(val));
    },

    decrypt: val => {
        return se.decrypt(decodeURIComponent(val));
    }
}

module.exports = x;