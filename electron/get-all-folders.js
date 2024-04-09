const fs = require('fs');
const path = require('path');

function getAllSubDirectories(directory) {
  const subDirectories = [];

  function traverseDirectories(dir) {
    if (!subDirectories.includes(dir)) {
      subDirectories.push(dir);
    }

    fs.readdirSync(dir).forEach((file) => {
      const filePath = path.join(dir, file);
      if (fs.statSync(filePath).isDirectory() && !subDirectories.includes(filePath)) {
        traverseDirectories(filePath);
      }
    });
  }

  traverseDirectories(directory);

  return subDirectories;
}

module.exports = getAllSubDirectories;
