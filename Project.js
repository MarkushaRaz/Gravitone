const Temp = require('./Temp.js');

process.stdin.setEncoding('utf-8');

let TempData = Temp.ReadTemp();

const CurrPath = process.cwd();

function CheckFlags(args, trueArgs) {
    let flags = {};

    for (const arg of args) {
        const match = arg.match(/^-(\w+)=["']?(.+?)["']?$/);
        if (match) {
            const key = match[1];
            const value = match[2];

            if (trueArgs.includes(key)) {
                flags[key] = value;
            }
        }
    }

    return flags;
}

if (CurrPath in TempData) {
    console.log('Проект уже инициализирован. Хотите продолжить разработку?\nДа / нет');

    process.stdin.on('data', (input) => {
        let text = input.trim();
        text = text.toLowerCase();

        if (text === "да") {
            console.log('\nПроект открыт!');
        }
        else if (text === "нет") {
            console.log('\nОткрытие проекта отклонено');
        }
    });
}
else {
    let Name, Des;
    let Step = 'confirm';

    console.log('Проект в данной папке отсутствует. Хотите создать его?\nДа / нет');

    process.stdin.on('data', (input) => {
        const text = input.trim();

        if (Step === 'confirm') {
            if (text.toLowerCase() === 'да') {
                console.log('\nВведите название проекта:');
                Step = 'name';
            }
            else if (text.toLowerCase() === 'нет') {
                console.log('Проект не создан');
                process.exit();
            }
        }
        else if (Step === 'name') {
            Name = text;
            console.log('\nОтлично, теперь введите описание, или нажмите Enter чтобы пропустить:');
            Step = 'desc';
        }
        else if (Step === 'desc') {
            Des = text === '' ? 'Описание отсутствует' : text;

            TempData[CurrPath] = {
                Name: Name,
                Des: Des
            }
            Temp.SaveTemp(TempData);

            process.exit();
        }
    });
}

process.stdin.on('data', (input) => {
    let TrueFlags = [];

    const text = input.trim();
    const parts = text.split(' ');
    const MainComm = parts[0];
    const args = parts.slice(1);

    // Change
    if (MainComm === 'change') {
        TrueFlags = ['name'];
        const Check = CheckFlags(args, TrueFlags);

        if (Check.name !== null) {
            TempData[CurrPath] = {
                Name: Check.name,
                Des: TempData[CurrPath].Des
            };
            Temp.SaveTemp(TempData);
        }
        // else if (Check.des !== null) {
        //     TempData[CurrPath] = {
        //         Name: TempData[CurrPath].Name,
        //         Des: Check.des
        //     };
        //     Temp.SaveTemp(TempData);
        // }
    }

    // Exit
    else if (text === 'exit') {
        console.log('\nЗавершение программы...');
        process.exit();
    }

    else {
        console.clear();
    }
});