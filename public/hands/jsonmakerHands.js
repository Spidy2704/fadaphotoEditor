const fs = require('fs');
const path = require('path');

function createFolderStructure(folderPath) {
  function traverseDirectory(directoryPath) {
    const folderContent = fs.readdirSync(directoryPath, { withFileTypes: true });

    const files = [];
    const folders = [];

    folderContent.forEach((item) => {
      const itemPath = path.join(directoryPath, item.name);

      if (item.isDirectory()) {
        const subfolder = {
          [item.name]: traverseDirectory(itemPath),
        };
        folders.push(subfolder);
      } else if (item.isFile()) {
        const fileName = item.name.split('.')[0]; // Get the filename without the extension
        const file = {
          [fileName]: '/hands/' + itemPath.substring(folderPath.length + 1).replace(/\\/g, '/'),
        };
        files.push(file);
      }
    });

    return [...folders, ...files];
  }

  const folderStructure = traverseDirectory(folderPath);

  // Remove empty "Hands" folder from the structure
  const filteredStructure = folderStructure.filter((item) => {
    const key = Object.keys(item)[0];
    const value = item[key];
    return key !== 'Hands' || (key === 'Hands' && value.length > 0);
  });

  return filteredStructure.find((item) => 'Hands' in item); // Return the element with "Hands" key
}

const folderPath = process.cwd(); // Use the current working directory as the root folder
const folderStructure = createFolderStructure(folderPath);

const json = JSON.stringify(folderStructure, null, 2);
const outputPath = path.join(folderPath, 'Hands.json');
fs.writeFileSync(outputPath, json);

console.log(`Folder structure JSON file created successfully at ${outputPath}.`);
