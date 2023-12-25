function checkForNumber(input) {
  return input.trim().length && !isNaN(input);
}

function makeCalculatedOutput() {
  const firstInput = prompt('Введите, пожалуйста, число.');
  const secondInput = prompt('Введите ещё одно число');
  const valuesNotValid = !checkForNumber(firstInput) || !checkForNumber(secondInput);
  
  if (valuesNotValid) {
    return console.log('Некорректный ввод!');
  }

  console.log(Number(firstPrompt).toString(Number(secondPrompt)));
}

makeCalculatedOutput();