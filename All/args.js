const { Command } = require('commander');

const program = new Command();

program
    .name('Gravitone')
    .description('Простой инструмент для ориентирования в проекте')
    .version('1.0.0');

// const change = new Command('change')
//     .description('Изменение параметров');

// change
//     .command('project')
//     .description('Обращение к проекту')
//     .option('--name <имя>', 'Новое имя проекта')

// program.addCommand(change);
program.parse(process.argv);

module.exports = {
    get: () => {
        return program.opts();
    }
};