Array.prototype.myFilter = function(callbackFunc, thisArg = null) {
  let resultArr = [];

  for (let i = 0; i < this.length; i++) {
    if (thisArg) {
      if (callbackFunc.call(thisArg, this[i], i, this)) {
        resultArr.push(this[i]);
      }
    }

    if (callbackFunc(this[i], i, this)) {
      resultArr.push(this[i]);
    }
  }

  return resultArr;
}