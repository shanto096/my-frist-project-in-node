const fs = require('fs');

const path = require('path');

const lib = {}

lib.base = path.join(__dirname, '../.data/')

console.log(lib.create);




//  create file ...............
lib.create = (dir, file, data, callback) => {

    //open file.............
    fs.open(`${lib.base + dir}/${file}.json`, 'wx', (err, fileDescriptor) => {
        if (!err && fileDescriptor) {
            //convert data string....................
            const stringData = JSON.stringify(data)
                //write a file ..............
            fs.writeFile(fileDescriptor, stringData, (err2) => {
                if (!err2) {
                    // close a file...........
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

//read file............
lib.read = (dir, file, callback) => {
        fs.readFile(`${lib.base + dir}/${file}.json`, 'utf8', (err, data) => {
            if (!err) {
                callback(data)
            } else {
                callback(err)
            }
        })
    }
    // update file.................
lib.update = (dir, file, data, callback) => {
        //open file .................
        fs.open(`${lib.base + dir}${file}.json`, 'r+', (err, fileDescriptor) => {
            if (!err && fileDescriptor) {
                //convert the data string...............
                const stringData = JSON.stringify(data)
                    // truncate this file ..................
                fs.ftruncate(fileDescriptor, (err2) => {
                    if (!err2) {
                        // update writing file ...........
                        fs.write(fileDescriptor, stringData, (err3) => {
                            if (!err3) {
                                //file close......
                                fs.close(fileDescriptor, (err4) => {
                                    if (!err4) {
                                        callback(false)
                                    } else {
                                        callback('error closing file ')
                                    }
                                })
                            } else {
                                callback('error writing file')
                            }
                        })

                    } else {
                        callback(err2)
                    }
                })

            } else {
                callback('file does not open')
            }
        })
    }
    //delete file ..................
lib.delete = (dir, file, callback) => {
    fs.unlink(`${lib.base + dir}${file}.json`, (err) => {
        if (!err) {
            callback(false)
        } else {
            callback('error deleting file')
        }
    })
}

module.exports = lib;