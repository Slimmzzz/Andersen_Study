
function checkIfNumber(value) {
  return !!(parseInt(value) == value);
}

function makeCalculatedOutput() {
  const firstPrompt = prompt('Введите, пожалуйста, число.');
  const secondPrompt = prompt('Введите ещё одно число');
  const valuesValid = checkIfNumber(firstPrompt) || checkIfNumber(secondPrompt);
  
  if (!valuesValid) {
    return console.log('Некорректный ввод!');
  }

  console.log(parseInt(firstPrompt).toString(parseInt(secondPrompt)));
}

makeCalculatedOutput();