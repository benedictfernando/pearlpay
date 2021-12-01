const se = require('simple-encryptor')(process.env.PASSPHRASE);

const x = {
    encrypt: val => {
        return se.encrypt(val)?.replace(/\//g, '_');
    },

    decrypt: val => {
        return se.decrypt(val?.replace(/\_/g, '/'));
    }
}

module.exports = x;