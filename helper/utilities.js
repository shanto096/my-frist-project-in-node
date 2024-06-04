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


 module.exports = utilities