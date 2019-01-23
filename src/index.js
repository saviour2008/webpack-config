let str = require("./text.js");
require('./index.css');
document.querySelector('div').innerHTML=str;
// console.log(document.querySelector('div')); 
console.log(str); 
if(module.hot){
    module.hot.accept();
}