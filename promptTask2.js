function checkIfNumber(value) {
  const isFullyNumber = parseInt(value) == value;
  const checkForValidInput = isFullyNumber ? true : console.log('Некорректный ввод!');

  return checkForValidInput;
}

function makeCalculatedOutput() {
  const firstPrompt = prompt('Введите, пожалуйста, число.');
  
  if (checkIfNumber(firstPrompt)) {
    const secondPrompt = prompt('Введите ещё одно число');
    const parsedFirstPrompt = parseInt(firstPrompt);

    if (checkIfNumber(secondPrompt)) {
      const secondParsedPrompt = parseInt(secondPrompt);
      const addition = parsedFirstPrompt + secondParsedPrompt;
      const divisor = parsedFirstPrompt / secondParsedPrompt;
      const output = `Ответ: ${addition}, ${divisor}`;
  
      console.log(output);
    }
  }
}

makeCalculatedOutput();