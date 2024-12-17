// how to use node modules

const lodash = require('lodash');

const names = ["sagan", "john", "terry", "alex", "pius"]
const capitalize = lodash.map(names, lodash.capitalize);
console.log(capitalize);

