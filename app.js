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
    console.log('i dont understand command. Use --add="name of task", --remove="name of task" or use option --list'.red);
  }
}

const handleData = (type, title) => {
  //type = number (1-add; 2-remove; 3-list)
  //title = (string || null)

  const data = fs.readFileSync('datadb.json');
  const tasks = JSON.parse(data)
  let dataJSON = '';
  // console.log(tasks);

  if (type === 1 || type === 2) {
    const isExisted = tasks.find(task => task.title === title) ? true : false;
    if (type === 1 && isExisted) {
      return console.log('that task is exist'.red);
    } else if (type === 2 && !isExisted) {
      return console.log('I can\'t delete task becouse not exist'.red);
    }
  }

  switch (type) {
    case 1:
      // console.log('add task');
      const id = tasks.length + 1;
      tasks.push({ id, title });
      // console.log(tasks);
      dataJSON = JSON.stringify(tasks);
      // console.log(dataJSON);
      fs.writeFileSync('datadb.json', dataJSON);
      console.log(`adding task: ${title}`.white.bgGreen);
      break;
    case 2:
      const index = tasks.findIndex(task => task.title === title);
      tasks.splice(index, 1);
      console.log(tasks);
      dataJSON = JSON.stringify(tasks);
      fs.writeFile('datadb.json', dataJSON, 'utf-8', (err) => {
        if (err) throw err;
        console.log(`Task ${title} is remove!`.white.bgGreen);
      });
      break;
    case 3:
      console.log(`List of task to do contain ${tasks.length} position. You have to do: `);
      if (tasks.length) {
        tasks.forEach((task, index) => {
          if (index % 2) return console.log(task.title.green);
          return console.log(task.title.yellow);
        });
      }
      break;
  }

}



handleCommand(command);