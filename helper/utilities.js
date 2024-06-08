 const crypto = require('crypto')

 const utilities = {}

 utilities.jsonParse = (str) => {
     let outPut
     try {
         outPut = JSON.parse(str)

     } catch {
         outPut = {}
     }
     return outPut
 }

 utilities.hash = (str) => {
     if (typeof(str === ' string') && str.length > 0) {
         const hash = crypto
             .createHmac('sha256', 'llllfgmddkdkd')
             .update(str)
             .digest('hex');
         return hash
     }
     return false
 }
 utilities.createToken = (strLength) => {
     let length = strLength
     length = typeof(strLength === 'number') && strLength > 0 ? strLength : false

     if (length) {
         const possibleCharacters = 'abcdefghijklmnopqrstuvwxyz1234567890';
         let outPut = ''
         for (let i = 1; i <= length; i++) {
             const randomCharacter = possibleCharacters.charAt(Math.floor(Math.random() * possibleCharacters.length))
             outPut += randomCharacter;
         }
         return outPut
     }
     return false
 }


 module.exports = utilities