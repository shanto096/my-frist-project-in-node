const fs = require('fs');

const path = require('path');

const lib = {}

lib.base = path.join(__dirname, '../.data/')





lib.create = (dir, file, data, callback) => {


    fs.open(`${lib.base + dir}${file}.json`, 'wx', (err, fileDescriptor) => {
        if (!err && fileDescriptor) {
            const stringData = JSON.stringify(data)
            fs.writeFile(fileDescriptor, stringData, (err2) => {
                if (!err2) {
                    fs.close(fileDescriptor, (err3) => {
                        if (!err3) {
                            callback(false)
                        } else {
                            callback('error closing the new file')
                        }
                    })

                } else {
                    callback('error writing to new file')
                }

            })

        } else {
            callback(err)
        }

    })
}

module.exports = lib;