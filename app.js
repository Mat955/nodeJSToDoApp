//console.log(process.argv.slice(2,3));

const parseArgs = require('minimist');
const colors = require('colors');
const fs = require('fs');

const command = parseArgs(process.argv.slice(2, 3));
delete command._;
console.log(command);

const handleCommand = ({ add, remove, list }) => {
  if (add) {
    if (typeof add !== 'string') {
      return console.log('put name of task! (only text)'.red);
    } else if (add.length < 7) {
      return console.log('name of task must have more than 6 signs'.red);
    }
    handleData(1, add);
  } else if (remove) {
    if (typeof remove !== 'string' || remove.length < 7) {
      return console.log('put name of deleting task. This must be a text and have more than 6 signs'.red);
    }
    handleData(2, remove);
  } else if (list || list === '') {
    handleData(3, null);
  } else {
    console.log('i dont understand command. Use --add="name of task", --remove="name of task" or use option --list');
  }
}

const handleData = (type, title) => {
  //type = number (1-add; 2-remove; 3-list)
  //title = (string || null)

  const data = fs.readFileSync('datadb.json');
  const tasks = JSON.parse(data)
  console.log(tasks);
}

handleCommand(command);