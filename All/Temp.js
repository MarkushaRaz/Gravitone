const os = require('os');
const fs = require('fs');
const path = require('path');

const TempPath = path.join(os.tmpdir(), 'Gravitone');
const TempFilePath = TempPath + '\\Data.json';

if (!fs.existsSync(TempPath)) {
    fs.mkdirSync(TempPath);
}
if (!fs.existsSync(TempFilePath)) {
    fs.writeFileSync(TempFilePath, JSON.stringify({}, null, 2));
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
    }
};