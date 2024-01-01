Array.prototype.myFilter = function(callbackFunc, thisArg = this) {
  let resultArr = [];

  for (let i = 0; i < this.length; i++) {
    if (callbackFunc.call(thisArg, this[i], i, this)) {
      resultArr.push(this[i]);
    }
  }

  return resultArr;
}