let concatStrings = function(str, separator = '') {
  let resultArr = [ str ];

  return function inner(arg) {
    if (typeof arg === 'string') {
      resultArr.push(arg);
      
      return function(...nextFuncArg) {
        return inner(...nextFuncArg);
      }
    }

    if (typeof separator === 'string') {
      return resultArr.join(separator);
    }

    return resultArr.join('');
  }
}