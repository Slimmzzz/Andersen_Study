function checkIfNumber(value) {
  const isNumberCorrect = value.trim().length && !isNaN(value);
  
  return isNumberCorrect;
}

function makeCalculatedOutput() {
  const firstPrompt = prompt('Введите, пожалуйста, число.');
  
  if (!checkIfNumber(firstPrompt)) {
    return console.log('Некорректный ввод!');
  }

  const secondPrompt = prompt('Введите ещё одно число');
  const parsedFirstPrompt = Number(firstPrompt);
  
  if (!checkIfNumber(secondPrompt)) {
    return console.log('Некорректный ввод!');
  }
  
  const secondParsedPrompt = Number(secondPrompt);
  const addition = parsedFirstPrompt + secondParsedPrompt;
  const divisor = parsedFirstPrompt / secondParsedPrompt;
  const output = `Ответ: ${addition}, ${divisor}`;
  
  console.log(output);
}

makeCalculatedOutput();