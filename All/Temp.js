const os = require('os');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const TempPath = path.join(os.tmpdir(), 'Gravitone');
const TempFilePath = TempPath + '\\Data.json';

// Temp
if (!fs.existsSync(TempPath)) {
    fs.mkdirSync(TempPath);
}
if (!fs.existsSync(TempFilePath)) {
    fs.writeFileSync(TempFilePath, JSON.stringify({}, null, 2));
}

// Project
if (!fs.existsSync('.gravitone')) {
    fs.mkdirSync('.gravitone');

    if (fs.existsSync('.git')) {
        fs.writeFileSync('.gitignore', '.gravitone/');
    }
}
if (!fs.existsSync('.gravitone/Project.json')) {
    fs.writeFileSync('.gravitone/Project.json', JSON.stringify({}, null, 2));
}

module.exports = {
    SaveTemp: (data) => {
        fs.writeFileSync(TempFilePath, JSON.stringify(data, null, 2));
    },
    ReadTemp: () => {
        if (fs.existsSync(TempPath)) {
            return JSON.parse(fs.readFileSync(TempFilePath, 'utf-8'));
        }
        return {};
    },
    SaveProject: (data) => {
        fs.writeFileSync('.gravitone/Project.json', JSON.stringify(data, null, 2));

        exec(`attrib +h ".gravitone"`, () => {});
    },
    ReadProject: () => {
        if (fs.existsSync('.gravitone')) {
            return JSON.parse(fs.readFileSync('.gravitone/Project.json', 'utf-8'));
        }
        return {};
    }
};