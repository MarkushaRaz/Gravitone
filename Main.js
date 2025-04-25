#!/usr/bin/env node

const { exec } = require('child_process');
const args = require('./All/args.js');

const flags = args.get();

console.log(flags);

// const filename = flags.name;

// require('fs').writeFileSync(filename, 'Это секретный файл!');

// exec(`attrib +h ${filename}`, (err) => {
//   if (err) {
//     console.error('Не удалось скрыть файл:', err);
//   } else {
//     console.log('Файл скрыт!');
//   }
// });