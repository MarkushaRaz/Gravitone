const fs = require('fs');
const path = require('path');
const Temp = require('./Temp.js');

let TempData = Temp.ReadTemp();
let ProjectData = Temp.ReadProject();

const CurrPath = process.cwd();

module.exports = {
    New: (name, des) => {
        TempData[CurrPath] = {
            Name: name,
            Des: des
        }
        Temp.SaveTemp(TempData);
    },
    ReadPathFiles: () => {}
};

// console.table([
//     { Id: 1, name: 'Вася', points: 120 },
//     { Id: 2, name: 'Катя', points: 98 },
//     { Id: 3, name: 'Петя', points: 135 },
// ]);