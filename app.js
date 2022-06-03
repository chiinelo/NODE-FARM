const url = "https://google.com";
module.exports = (drinks) => `i like to drink ${drinks}`; //anonymous modules
const canEat = (food) => {
  return `you can eat ${food}`;
};

console.log(url);
console.log(canEat("rice"));

module.exports.canEat = canEat;
