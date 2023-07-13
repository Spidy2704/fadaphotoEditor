const fs = require('fs');
const path = require('path');

function createFolderStructure(folderPath) {
  const rootFolder = [];

  function traverseDirectory(directoryPath) {
    const folderContent = fs.readdirSync(directoryPath, { withFileTypes: true });

    const files = [];

    folderContent.forEach((item) => {
      const itemPath = path.join(directoryPath, item.name);

      if (item.isDirectory()) {
        const subfolder = {
          [item.name]: traverseDirectory(itemPath),
        };
        rootFolder.push(subfolder);
      } else if (item.isFile()) {
        const fileName = item.name.split('.')[0]; // Get the filename without the extension
        const file = {
          [fileName]: '/avatar' + itemPath.substring(folderPath.length).replace(/\\/g, '/'),
        };
        files.push(file);
      }
    });

    return files;
  }

  traverseDirectory(folderPath);

  return rootFolder;
}

const folderPath = process.cwd(); // Use the current working directory as the root folder
const folderStructure = createFolderStructure(folderPath);

const json = JSON.stringify(folderStructure, null, 2);
fs.writeFileSync(path.join(folderPath, 'Avatar.json'), json);

console.log('Folder structure JSON file created successfully.');
