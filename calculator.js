function checkNumberValid(num) {
  return Number.isFinite(num);
}

class Calculator {
  constructor(x, y) {
    if (x === undefined || y === undefined) {
      throw new Error('Требуется ввести 2 значения.');
    }

    if (!checkNumberValid(x) || !checkNumberValid(y)) {
      throw new Error('Одно из значений является невалидным числом');
    }

    this.x = x;
    this.y = y;
    this.logSum = this.logSum.bind(this);
    this.logMul = this.logMul.bind(this);
    this.logSub = this.logSub.bind(this);
    this.logDiv = this.logDiv.bind(this);
  }

  setX(newX) {
    if (!checkNumberValid(newX)) {
      throw new Error('Введено невалидное число.');
    }

    return this.x = newX;
  };

  setY(newY) {
    if (!checkNumberValid(newY)) {
      throw new Error('Введено невалидное число.');
    }

    return this.y = newY;
  };

  logSum() {
    console.log(this.x + this.y);
  };

  logMul() {
    console.log(this.x * this.y);
  };

  logSub() {
    console.log(this.x - this.y);
  };

  logDiv() {
    if (this.y === 0) {
      throw new Error('На ноль делить запрещено.');
    }
    
    console.log(this.x / this.y);
  }
}
