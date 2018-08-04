let sha1 = require('sha1');
let secret = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis ipsum deserunt, nemo omnis inventore doloremque, veritatis, cum cumque tempora molestias maiores quaerat culpa. Blanditiis recusandae expedita consequatur dolorem quod amet.';

let generateSecret = () => {
  let secL = secret.length;
  let rand = Math.random;
  let result =
    secret.slice(rand(secL), secL) +
    secret.slice(rand(secL), rand(secL));
  return sha1(result);
}

var generateToken = generateSecret;


var generateLogin = (email) => {
  let name = email.match('([^@]+)@([^@]+)')[1];
  return `${name}${Math.random(161825)}`;
};


module.exports = {
  generateToken: generateToken,
  generatePassword: generateSecret().slice(0, 13),
  generateLogin: generateLogin
}