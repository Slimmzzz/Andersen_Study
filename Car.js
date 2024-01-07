class Car {
  #brand;
  #model;
  #yearOfManufacturing;
  #maxSpeed;
  #maxFuelVolume;
  #fuelConsumption;
  #currentFuelVolume = 0;
  #isStarted = false;
  #mileage = 0;

  constructor() {
    this.#brand;
    this.#model;
    this.#yearOfManufacturing;
    this.#maxSpeed;
    this.#maxFuelVolume;
    this.#fuelConsumption;
    this.#currentFuelVolume;
    this.#isStarted;
    this.#mileage;
  }

  get brand() {
    return this.#brand;
  };

  set brand(brandName) {
    if (typeof brandName !== 'string') {
      throw new Error('Название бренда должно быть строкой.');
    }
    
    if ( isInRange(brandName.length, 1, 50) ) {
      throw new Error('Название бренда должно быть до 1 до 50 символов включительно.');
    }
    
    this.#brand = brandName;
  };

  get model() {
    return this.#model;
  };

  set model(modelType) {
    if (typeof modelType !== 'string') {
      throw new Error('Название бренда должно быть строкой.');
    }
    
    if ( isInRange(modelType.length, 1, 50) ) {
      throw new Error('Название бренда должно быть до 1 до 50 символов включительно.');
    }
    
    this.#model = modelType;
  };

  get yearOfManufacturing() {
    return this.#yearOfManufacturing;
  };

  set yearOfManufacturing(year) {
    if ( isNumberOrNull(year) ) {
      throw new Error('Год должен быть числом.');
    }

    const currentYear = new Date().getFullYear;

    if ( isInRange(year, 1900, currentYear) ) {
      throw new Error('Год должен быть от 1900 до текущего.');
    }

    this.#yearOfManufacturing = year;
  };

  get maxSpeed() {
    return this.#maxSpeed;
  };

  set maxSpeed(speed) {
    if ( isNumberOrNull(speed) ) {
      throw new Error('Заданное значение должно быть числом.');
    }

    if ( isInRange(speed, 100, 300) ) {
      throw new Error('Указанное значение должно быть в пределах от 100 до 300.');
    }

    this.#maxSpeed = speed;
  };

  get maxFuelVolume() {
    return this.#maxFuelVolume;
  };

  set maxFuelVolume(fuelVolume) {
    if ( isNumberOrNull(fuelVolume) ) {
      throw new Error('Введенное значение должно быть числом');
    }

    if ( isInRange(fuelVolume, 5, 20) ) {
      throw new Error('Значение должно быть от 5 до 20.');
    }

    this.#maxFuelVolume = fuelVolume;
  };

  get fuelConsumption() {
    return this.#fuelConsumption;
  };

  set fuelConsumption(litres) {
    if ( isNumberOrNull(litres) ) {
      throw new Error('Введенное значение должно быть числом.');
    }

    this.#fuelConsumption = litres;
  };

  get currentFuelVolume() {
    return this.#currentFuelVolume;
  };

  get isStarted() {
    return this.#isStarted;
  };

  get mileage() {
    return this.#mileage;
  };

  start() {
    if (this.#isStarted) {
      throw new Error('Машина уже заведена');
    }

    this.#isStarted = true;
  };

  shutDownEngine() {
    if (!this.#isStarted) {
      throw new Error('Машина ещё не заведена.');
    }

    this.#isStarted = false;
  };

  fillUpGasTank(fuelToFill) {
    if (!this.#maxFuelVolume) {
      throw new Error('Чтобы заправить машину, должен быть указан размер топливного бака.');
    }

    if (isNumberOrNull(fuelToFill) || fuelToFill <= 0) {
      throw new Error('Неверное количества топлива для заправки.');
    }

    const resultAfterFuelFill = this.#currentFuelVolume + fuelToFill;

    if (resultAfterFuelFill > this.#maxFuelVolume) {
      throw new Error('Топливный бак переполнен.');
    }

    this.#currentFuelVolume = resultAfterFuelFill;
  };

  drive(speed, driveTime) {
    if (isNumberOrNull(speed) || speed <= 0) {
      throw new Error('Неверная скорость.');
    }

    if (isNumberOrNull(driveTime) || driveTime <= 0) {
      throw new Error('Неверное количество часов.');
    }

    if (!this.#maxSpeed) {
      throw new Error('Что бы рассчитать значения, требуется указать максимальную скорость автомобиля.');
    }
    
    if (speed > this.#maxSpeed) {
      throw new Error('Машина не может ехать так быстро.');
    }

    if (!this.#isStarted) {
      throw new Error('Машина должна быть заведена, чтобы ехать.');
    }

    if (!this.#fuelConsumption) {
      throw new Error('Что бы рассчитать значения, требуется указать расход топлива автомобиля.');
    }

    const kilometersDriven = speed * driveTime;
    const fuelUsed = (kilometersDriven * this.#fuelConsumption) / 100;

    if (fuelUsed > this.#currentFuelVolume) {
      throw new Error('Недостаточно топлива.');
    }

    this.#currentFuelVolume = this.#currentFuelVolume - fuelUsed;
    this.#mileage = this.#mileage + kilometersDriven;
  };
}

function isInRange(valueToCheck, min, max) {
  return valueToCheck < min || valueToCheck > max;
}

function isNumberOrNull(valueToCheck) {
  return typeof valueToCheck !== 'number' || valueToCheck === null;
}