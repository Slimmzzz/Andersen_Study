function makeCalculatedOutput() {
  const firstInput = prompt('Введите, пожалуйста, число.');
  const secondInput = prompt('Введите ещё одно число');
  const firstInputValid = firstInput.trim().length && !isNaN(firstInput);
  const secondInputValid = secondInput.trim().length && !isNaN(secondInput);
  const valuesNotValid = !firstInputValid || !secondInputValid;
  
  if (valuesNotValid) {
    return console.log('Некорректный ввод!');
  }

  console.log(Number(firstPrompt).toString(Number(secondPrompt)));
}

makeCalculatedOutput();