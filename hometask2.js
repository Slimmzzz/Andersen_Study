function makeObjectDeepCopy(obj) {
  const newObj = {};

  for (let key in obj) {
    const errorObjectType = obj[key].constructor.name === 'Error';
    const dateObjectType = obj[key].constructor.name === 'Date';
    const notPlainObject = errorObjectType || dateObjectType;
    
    if (typeof obj[key] === 'function') {
      newObj[key] = obj[key];
    } else if (Array.isArray(obj[key])) {
      newObj[key] = [...obj[key]];
    } else if (typeof obj[key] === 'object' && !notPlainObject) {
      newObj[key] = makeObjectDeepCopy(obj[key]);
    } else {
      newObj[key] = obj[key];
    }
  }

  return newObj;
}

function selectFromInterval(arr, firstIntVal, secondIntVal) {
  let resultArr = [];
  const notValidIntVals = isNaN(firstIntVal) || isNaN(secondIntVal);

  if (notValidIntVals) {
    throw new Error('Одно из значений интервала не является валидным числом.');
  }

  const arrWithIntVals = [firstIntVal, secondIntVal];
  const sortedIntervalValues = arrWithIntVals.sort((a, b) => a - b);
  const minIntervalValue = sortedIntervalValues[0];
  const maxIntervalValue = sortedIntervalValues[1];
  
  for (let key of arr) {
    const keyGreaterOrEqualsThanMin = key >= minIntervalValue;
    const keyLessOrEqualsThanMax = key <= maxIntervalValue;
    const compareValsInArr = keyGreaterOrEqualsThanMin && keyLessOrEqualsThanMax;

    if (isNaN(key)) {
      resultArr = [];
      throw new Error('Переданое первое значение должно являться массивом с числовыми значениями.');
    }

    if (compareValsInArr) {
      resultArr.push(key);
    }
  }

  return resultArr;
}

const myIterable = {
  from: 1,
  to: 6,

  [Symbol.iterator]() {
    const validationForCurrent = !isNaN(this.from) ? this.from : false;
    const validationForLast = !isNaN(this.to) ? this.to : false;

    if (this.from > this.to) {
      throw new Error('Значение to больше значения from.');
    }

    if (!validationForCurrent || !validationForLast) {
      throw new Error('Значение "FROM" или "TO" отсутствует, либо не является числом');
    }

    return {
      current: this.from,
      last: this.to,

      next() {
        if (this.current <= this.last) {
          return {
            value: this.current++,
            done: false,
          };
        } else {
          return {
            done: true,
          };
        }
      }
    }
  }
}
 