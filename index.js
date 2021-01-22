const { execSync } = require('child_process');
const path = require("path");
const fs = require("fs");
const { config, dir } = require("./config");

function readFileList(dir, filesList = []) {
    const files = fs.readdirSync(dir);
    files.forEach((item, index) => {
        var extname = path.extname(item);
        var fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
            readFileList(path.join(dir, item), filesList);
        } else if (extname === '.zip') {
            filesList.push(fullPath);
        } else {
            return
        }
    });
    return filesList;
}

function uploadPlugin(zip) {
    const cmd = `kintone-plugin-uploader --domain ${config.domain} --username ${config.username} --password ${config.password} ${zip}`
    try {
        execSync(cmd);
    }
    catch (error) {
        console.log(`插件${zip}上传失败`)
    }
}

const filesList = readFileList(dir);

for (let zip of filesList) {
    console.log(`插件${zip}上传开始`)
    uploadPlugin(zip)
}
console.log(`环境${config.domain}的插件上传完成`)
