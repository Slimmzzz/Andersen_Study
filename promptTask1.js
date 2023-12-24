function makeCalculatedOutput() {
  const firstPrompt = prompt('Введите, пожалуйста, число.');
  const secondPrompt = prompt('Введите ещё одно число');
  const valuesNotValid = !Number.isSafeInteger(Number(firstPrompt)) || !Number.isSafeInteger(Number(secondPrompt));
  
  if (valuesNotValid) {
    return console.log('Некорректный ввод!');
  }

  console.log(Number(firstPrompt).toString(Number(secondPrompt)));
}

makeCalculatedOutput();