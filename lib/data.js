// dependencies 
const fs = require('fs');
const path = require('path');

const lib = {};

// base directiory of the data folder 
lib.basedir = path.join(__dirname, '/../.data/');

// write data to file 
lib.create = function (dir, file, data, callback) {
  // open file for writing 
  fs.open(lib.basedir + dir + '/' + file + '.json', 'wx', function (err, fileDescriptor) {
    if (!err && fileDescriptor) {
      // convert data to string 
      const stringData = JSON.stringify(data);

      // write data to file and then close it

      fs.writeFile(fileDescriptor, stringData, function (err2) {
        if (!err2) {
          fs.close(fileDescriptor, function (err3) {
            if (!err3) {
              callback(false);
            } else {
              callback('Error closing the new file!');
            }
          })
        } else {
          callback('Error to new file!');
        }
      })
      
    } else {
      callback(err);
    }
  });
};

// data read 
lib.read = (dir, file, callback) => {
  fs.readFile(`${lib.basedir + dir}/${file}.json`, 'utf8', (err, data) => {
    callback(err, data);
  });
};

// update existing file
lib.update = (dir, file, data, callback) => {
  // file open for writing 
  fs.open(`${lib.basedir + dir}/${file}.json`, 'r+', (err, fileDescriptor) => {
    if (!err && fileDescriptor) {
      // convert the dta to string 
      const stringData = JSON.stringify(data);

      // truncate the file 
      fs.ftruncate(fileDescriptor, (err) => {
        if (!err) {
          // write to the file and close it 
          fs.writeFile(fileDescriptor, stringData, (err) => {
            if (!err) {
              // close the file 
              fs.close(fileDescriptor, (err) => {
                if (!err) {
                  callback(false);
                } else {
                  callback('Error closing file');
                }
              })
            } else {
              callback('Error writing to file!');
            }
          })
        } else {
          callback("Error truncating file!");
        }
      });
    } else {
      console.log(`Error updating. File may not exist`);
    }
  })
};



module.exports = lib;