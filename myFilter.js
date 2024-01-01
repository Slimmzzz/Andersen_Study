Array.prototype.myFilter = function(callbackFunc, thisArg = this) {
  let resultArr = [];

  for (let i = 0; i < this.length; i++) {
    if (typeof callbackFunc !== 'function') {
      throw new Error('Первый аргумент не является функцией.');
    }

    if (callbackFunc.call(thisArg, this[i], i, this)) {
      resultArr.push(this[i]);
    }
  }

  return resultArr;
}