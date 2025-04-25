const Temp = require('./Temp.js');

process.stdin.setEncoding('utf-8');

let TempData = Temp.ReadTemp();

const CurrPath = process.cwd();