function checkIfNumber(value) {
  const isNumberCorrect = value.trim().length && !isNaN(value);
  
  return isNumberCorrect;
}

function makeCalculatedOutput() {
  const firstPrompt = prompt('Введите, пожалуйста, число.');
  
  if (checkIfNumber(firstPrompt)) {
    const secondPrompt = prompt('Введите ещё одно число');
    const parsedFirstPrompt = Number(firstPrompt);

    if (checkIfNumber(secondPrompt)) {
      const secondParsedPrompt = Number(secondPrompt);
      const addition = parsedFirstPrompt + secondParsedPrompt;
      const divisor = parsedFirstPrompt / secondParsedPrompt;
      const output = `Ответ: ${addition}, ${divisor}`;
  
      console.log(output);
    } else {
      console.log('Некорректный ввод!');
    }
  } else {
    console.log('Некорректный ввод!');
  }
}

makeCalculatedOutput();