const { execSync } = require('child_process');
const path = require("path");
const fs = require("fs");
const { config, dir } = require("./config");

function readFileList(dir, filesList = []) {
    const files = fs.readdirSync(dir);
    files.forEach((item, index) => {
        var fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
            readFileList(path.join(dir, item), filesList);
        } else {
            filesList.push(fullPath);
        }
    });
    return filesList;
}

function uploadPlugin(zip) {
    const cmd = `kintone-plugin-uploader --domain ${config.domain} --username ${config.username} --password ${config.password} ${zip}`
    execSync(cmd);
}


const filesList = readFileList(dir);

for (let file of filesList) {
    uploadPlugin(file)
}
console.log(`环境${config.domain}的插件上传完成`)
