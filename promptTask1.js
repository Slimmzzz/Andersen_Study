function makeCalculatedOutput() {
  const firstPrompt = prompt('Введите, пожалуйста, число.');
  const secondPrompt = prompt('Введите ещё одно число');
  const firstPromptCheck = (firstPrompt === '') ? false : Number.isSafeInteger(Number(firstPrompt));
  const secondPromptCheck = (secondPrompt === '') ? false : Number.isSafeInteger(Number(secondPrompt));
  const valuesNotValid = !firstPromptCheck || !secondPromptCheck;
  
  if (valuesNotValid) {
    return console.log('Некорректный ввод!');
  }

  console.log(Number(firstPrompt).toString(Number(secondPrompt)));
}

makeCalculatedOutput();