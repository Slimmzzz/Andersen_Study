let concatStrings = function(str, separator = '') {
  let resultArr = [str];

  return function inner(arg) {
    const argExistAndString = arg && typeof arg === 'string';
    
    if (argExistAndString || arg === '') {
      resultArr.push(arg);
      
      return function(...nextFuncArg) {
        return inner(...nextFuncArg);
      }
    }

    if (typeof separator === 'string') {
      return resultArr.join(separator);
    } else {
      return resultArr.join('');
    }
  }
}