const fs = require("fs");
const path = require('path');

const fileName = 'lint-result.js';

fs.writeFileSync(path.join(__dirname, fileName), "I like lage!")

console.log('reactivlty test')