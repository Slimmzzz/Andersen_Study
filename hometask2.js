function makeObjectDeepCopy(obj) {
  const newObj = {};

  for (let key in obj) {
    const errorObjectType = obj[key].constructor.name === 'Error';
    const dateObjectType = obj[key].constructor.name === 'Date';
    const notPlainObject = errorObjectType || dateObjectType;
    
    if (Array.isArray(obj[key])) {
      obj[key] = [...obj[key]];
    } else if (typeof obj[key] === 'object' && !notPlainObject) {
      newObj[key] = makeObjectDeepCopy(obj[key]);
    } else {
      newObj[key] = obj[key];
    }
  }

  return newObj;
}

function selectFromInterval(arr, firstIntVal, secondIntVal) {
  const resultArr = [];
  const notValidIntVals = isNaN(firstIntVal) || isNaN(secondIntVal);

  if (arr.some((elem) => isNaN(elem))) {
    throw new Error('Переданое первое значение должно являться массивом с числовыми значениями.');
  }

  if (notValidIntVals) {
    throw new Error('Одно из значений интервала не является валидным числом.');
  }

  const [minIntervalValue, maxIntervalValue] = [firstIntVal, secondIntVal].sort((a, b) => a - b);
  
  for (let key of arr) {
    const compareValsInArr = key >= minIntervalValue && key <= maxIntervalValue;

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
    const validationForCurrent = isNaN(this.from);
    const validationForLast = isNaN(this.to);

    if (this.from > this.to) {
      throw new Error('Значение to больше значения from.');
    }

    if (validationForCurrent || validationForLast) {
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
        }

        return {
          done: true,
        };
      }
    }
  }
}