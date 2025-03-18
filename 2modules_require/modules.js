const {people1 : peoples, age1 : ages} = require('./people');

console.log(peoples);
console.log(ages);

const os = require('os');
console.log(os.platform(), os.homedir())