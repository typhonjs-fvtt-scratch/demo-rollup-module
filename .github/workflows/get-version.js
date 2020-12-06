var fs = require('fs');
console.log(JSON.parse(fs.readFileSync('./deploy/module.json', 'utf8')).version);