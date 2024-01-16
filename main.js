const resultBarContainer = document.getElementById('result_bar');
const upperInput = document.getElementById('main_result');
const buttonsContainer = document.getElementById('buttons');
const historyBar = document.getElementById('history');

const CURRENT_OPERATION = {
  operand1: '',
  operand2: '',
  operator: ''
}
let LAST_PRESSED_BUTTON = null;

const HANDLERS = {
  numbersHandler(eventTarget) {
    if ( this.isEqualsBeenLastPressedButton() ) {
      CURRENT_OPERATION.operand1 = '';
      CURRENT_OPERATION.operand2 = '';
      CURRENT_OPERATION.operator = '';
    }
  
    let valueToInput;
  
    if (!CURRENT_OPERATION.operator) {
      if (!CURRENT_OPERATION.operand1) {
        this.createHistoryItem();
      }
  
      CURRENT_OPERATION.operand1 += eventTarget.dataset.value;
      CURRENT_OPERATION.operand1 = CURRENT_OPERATION.operand1.replace(/^([0]+(?!\.))?/, '');
  
      valueToInput = CURRENT_OPERATION.operand1;
    } else {
      CURRENT_OPERATION.operand2 += eventTarget.dataset.value;
      CURRENT_OPERATION.operand2 = (CURRENT_OPERATION.operand2 === '0') ? '0' : CURRENT_OPERATION.operand2.replace(/^(-)?([0]+(?!\.))?/, '$1');
      
      valueToInput = `${CURRENT_OPERATION.operand1}${this.getOperatorRender(CURRENT_OPERATION.operator)}${CURRENT_OPERATION.operand2}`;
    }
    
    this.renderIntoInput(valueToInput);
    this.writeToHistoryItem(valueToInput);
  },

  operatorsHandler(eventTarget) {
    if ( this.isEqualsBeenLastPressedButton() ) {
      CURRENT_OPERATION.operand2 = '';
      CURRENT_OPERATION.operator = '';
      this.createHistoryItem();
    }
  
    if (!CURRENT_OPERATION.operand1) {
      CURRENT_OPERATION.operand1 = '0';
  
      this.writeToHistoryItem(`${CURRENT_OPERATION.operand1}${this.getOperatorRender(CURRENT_OPERATION.operator)}`);
    }
  
    if (CURRENT_OPERATION.operand1 && CURRENT_OPERATION.operand2) {
      let oldOperand1 = CURRENT_OPERATION.operand1;
  
      this.makeOperationOrHandleDivByZero();
  
      this.writeToHistoryItem(`${oldOperand1}${this.getOperatorRender(CURRENT_OPERATION.operator)}${CURRENT_OPERATION.operand2}=${CURRENT_OPERATION.operand1}`);
      
      CURRENT_OPERATION.operand2 = '';
  
      this.createHistoryItem();
    }
    
    CURRENT_OPERATION.operator = eventTarget.dataset.operation;
  
    this.renderIntoInput(`${CURRENT_OPERATION.operand1}${this.getOperatorRender(CURRENT_OPERATION.operator)}`);
    this.writeToHistoryItem(`${CURRENT_OPERATION.operand1}${this.getOperatorRender(CURRENT_OPERATION.operator)}`);
  },

  equalBtnHandler() {
    if ( this.isEqualsBeenLastPressedButton() ) {
      this.createHistoryItem();
    }
  
    CURRENT_OPERATION.operand1 = CURRENT_OPERATION.operand1 || '0';
  
    if (!CURRENT_OPERATION.operand2) {
      if (!CURRENT_OPERATION.operator) {
        CURRENT_OPERATION.operand2 = '0';
      } else {
        CURRENT_OPERATION.operand2 = CURRENT_OPERATION.operand1;
      }
    }
  
    let oldOperand1 = CURRENT_OPERATION.operand1;
  
    CURRENT_OPERATION.operator = CURRENT_OPERATION.operator || 'plus';

    this.makeOperationOrHandleDivByZero();
  
    this.writeToHistoryItem(`${oldOperand1}${this.getOperatorRender(CURRENT_OPERATION.operator)}${CURRENT_OPERATION.operand2}=${CURRENT_OPERATION.operand1}`);
    this.renderIntoInput(`${CURRENT_OPERATION.operand1}`);
  },

  clearBtnHandler() {
    CURRENT_OPERATION.operand1 = '';
    CURRENT_OPERATION.operand2 = '';
    CURRENT_OPERATION.operator = '';
  
    this.renderIntoInput('0');
  
    [...historyBar.children].forEach((child) => {
      child.remove();
    });
  
    this.createHistoryItem();
    this.writeToHistoryItem('0');
  },

  backspaceBtnHandler() {
    if ( this.isEqualsBeenLastPressedButton() ) {
      CURRENT_OPERATION.operand2 = '';
      CURRENT_OPERATION.operator = '';
  
      this.createHistoryItem();
    }
  
    if (CURRENT_OPERATION.operand2) {
      if (!CURRENT_OPERATION.operand2.endsWith(')')) {
        CURRENT_OPERATION.operand2 = CURRENT_OPERATION.operand2.slice(0, -1);
      } else if (CURRENT_OPERATION.operand2.endsWith(')') && CURRENT_OPERATION.operand2.length === 4) {
        CURRENT_OPERATION.operand2 = '';
      } else if (CURRENT_OPERATION.operand2.endsWith(')') && CURRENT_OPERATION.operand2.length > 4) {
        CURRENT_OPERATION.operand2 = CURRENT_OPERATION.operand2.slice(0, -2);
        CURRENT_OPERATION.operand2 += ')';
      }
    } else if (!CURRENT_OPERATION.operand2 && !CURRENT_OPERATION.operator) {
      if (CURRENT_OPERATION.operand1 === '-0') {
        CURRENT_OPERATION.operand1 = '0';
      }
      
      CURRENT_OPERATION.operand1 = CURRENT_OPERATION.operand1.slice(0, -1);
    } else if (!CURRENT_OPERATION.operand2 && CURRENT_OPERATION.operator) {
      CURRENT_OPERATION.operator = '';
    }
  
    const valueToRender = `${CURRENT_OPERATION.operand1 || '0'}${this.getOperatorRender(CURRENT_OPERATION.operator)}${CURRENT_OPERATION.operand2}`;
    
    this.writeToHistoryItem(valueToRender);
    this.renderIntoInput(valueToRender);
  },

  changePolarityBtnHandler() {
    if ( this.isEqualsBeenLastPressedButton() ) {
      CURRENT_OPERATION.operand2 = '';
      CURRENT_OPERATION.operator = '';
  
      this.createHistoryItem();
    }
  
    if (CURRENT_OPERATION.operand2) {
      CURRENT_OPERATION.operand2 = /\(-/.test(CURRENT_OPERATION.operand2) ? CURRENT_OPERATION.operand2.replace(/[-\(\)]/g, '') : `(-${CURRENT_OPERATION.operand2})`;
    } else if (!CURRENT_OPERATION.operand2 && CURRENT_OPERATION.operand1) {
      CURRENT_OPERATION.operand1 = /-/.test(CURRENT_OPERATION.operand1) ? CURRENT_OPERATION.operand1.replace('-', '') : `-${CURRENT_OPERATION.operand1}`;
    } else if (!CURRENT_OPERATION.operand1) {
      CURRENT_OPERATION.operand1 = '-0';
      
      if (!historyBar.children.length) {
        this.createHistoryItem();
      }
    }
  
    const valueToRender = `${CURRENT_OPERATION.operand1 || '0'}${this.getOperatorRender(CURRENT_OPERATION.operator)}${CURRENT_OPERATION.operand2}`;
    
    this.writeToHistoryItem(valueToRender);
    this.renderIntoInput(valueToRender);
  },

  dotBtnHandler() {
    if (!CURRENT_OPERATION.operand1) {
      CURRENT_OPERATION.operand1 = '0.';
    } else if (CURRENT_OPERATION.operand1 && !CURRENT_OPERATION.operand2 && !(/\./.test(CURRENT_OPERATION.operand1)) && !CURRENT_OPERATION.operator) {
      CURRENT_OPERATION.operand1 += '.';
    } else if (CURRENT_OPERATION.operand1 && CURRENT_OPERATION.operator) {
      if (!CURRENT_OPERATION.operand2) {
        CURRENT_OPERATION.operand2 = '0.';
      } else if (CURRENT_OPERATION.operand2 && !(/\./.test(CURRENT_OPERATION.operand2))) {
        CURRENT_OPERATION.operand2 += '.';
      }
    }
    
    const valueToRender = `${CURRENT_OPERATION.operand1 || '0.'}${this.getOperatorRender(CURRENT_OPERATION.operator)}${CURRENT_OPERATION.operand2}`;
  
    this.writeToHistoryItem(valueToRender);
    this.renderIntoInput(valueToRender);
  },

  getOperatorRender(operatorName) {
    switch (operatorName) {
      case 'plus':
        return '+';
  
      case 'minus':
        return '-';
  
      case 'mult':
        return '×';
  
      case 'division':
        return '÷';
  
      default:
        return '';
    }
  },

  makeOperation() {
    const invalidValuesToDivision = CURRENT_OPERATION.operand2 === '0' ||
                                    CURRENT_OPERATION.operand2 === '0.' ||
                                    CURRENT_OPERATION.operand2 === '(-0)' ||
                                    CURRENT_OPERATION.operand2 === '(-0.)';

    switch(CURRENT_OPERATION.operator) {
      case 'plus':
        return String(((CURRENT_OPERATION.operand1 * 1e9) + (CURRENT_OPERATION.operand2.replace(/[()]/g, '') * 1e9)) / 1e9);
  
      case 'minus':
        return String(((CURRENT_OPERATION.operand1 * 1e9) - (CURRENT_OPERATION.operand2.replace(/[()]/g, '') * 1e9)) / 1e9);
  
      case 'division':
        if (invalidValuesToDivision) {
          throw new Error('На 0 делить нельзя!');
        }
  
        return String(Number(CURRENT_OPERATION.operand1) / Number(CURRENT_OPERATION.operand2.replace(/[()]/g, '')));
  
      case 'mult':
        return String(((CURRENT_OPERATION.operand1 * 10) * (CURRENT_OPERATION.operand2.replace(/[()]/g, '') * 10)) / 100);
    }
  },

  renderIntoInput(value) {
    document.dispatchEvent(new CustomEvent('render-into-input', {
      detail: {
        value
      }
    }));
  },

  writeToHistoryItem(str) {
    const historyItem = document.querySelector('#history > span:last-of-type');
  
    historyItem.textContent = str;
  },

  createHistoryItem() {
    if (Array.from(historyBar.querySelectorAll('span')).length === 2) {
      historyBar.children[0].remove();
    }
  
    historyBar.appendChild(document.createElement('span'));
  },

  renderError(error) {
    const errorDiv = historyBar.appendChild(document.createElement('div'));
  
    errorDiv.setAttribute('style', 'position:absolute;top:0;left:0;width:100%;height:100%;z-index:2;text-align:right;background-color:#FFF;color:red;');
    errorDiv.textContent = error.message;
    
    buttonsContainer.addEventListener('click', () => {
      errorDiv.remove();
    }, {
      once: true,
    });
  },

  isDatasetFits(eventTarget, dataType) {
    return eventTarget.dataset.operation === dataType;
  },

  makeOperationOrHandleDivByZero() {
    try {
      CURRENT_OPERATION.operand1 = this.makeOperation();
    } catch (error) {
      this.renderError(error);
    }
  },

  isEqualsBeenLastPressedButton() {
    return LAST_PRESSED_BUTTON && LAST_PRESSED_BUTTON.dataset.operation === 'equals';
  }
}

function mouseClicksHandler(event) {
  let target = event.target.closest('button');
  if (target) {
    if (target.dataset.value) {
      HANDLERS.numbersHandler(target);
    } else if (/^(mult|min|plus|div)/.test(target.dataset.operation)) {
      HANDLERS.operatorsHandler(target);
    } else if ( HANDLERS.isDatasetFits(target, 'equals') ) {
      HANDLERS.equalBtnHandler();
    } else if ( HANDLERS.isDatasetFits(target, 'clear') ) {
      HANDLERS.clearBtnHandler();
    } else if ( HANDLERS.isDatasetFits(target, 'backspace') ) {
      HANDLERS.backspaceBtnHandler();
    } else if ( HANDLERS.isDatasetFits(target, 'changePolarity') ) {
      HANDLERS.changePolarityBtnHandler();
    } else if ( HANDLERS.isDatasetFits(target, 'dot') ) {
      HANDLERS.dotBtnHandler(target);
    }

    LAST_PRESSED_BUTTON = target;
  }
}

function keyboardClicksHandler(event) {
  if (/^\d/.test(event.key)) {
    buttonsContainer.querySelector(`[data-value="${event.key}"]`).click();
  } else if (/enter/i.test(event.key)) {
    buttonsContainer.querySelector(`[data-operation="equals"]`).click();
  } else if (/(\+|-|\*|\/)/.test(event.key)) {
    switch (event.key) {
      case '+':
        buttonsContainer.querySelector(`[data-operation="plus"]`).click();
        break;
      
      case '-':
        buttonsContainer.querySelector(`[data-operation="minus"]`).click();
        break;

      case '*':
        buttonsContainer.querySelector(`[data-operation="mult"]`).click();
        break;

      case '/':
        buttonsContainer.querySelector(`[data-operation="division"]`).click();
        break;
    }
  } else if (/del/i.test(event.key)) {
    buttonsContainer.querySelector(`[data-operation="clear"]`).click();
  } else if (/backspace/i.test(event.key)) {
    buttonsContainer.querySelector(`[data-operation="backspace"]`).click();
  } else if (/\.|\,/.test(event.key)) {
    buttonsContainer.querySelector('[data-operation="dot"]').click();
  }
}

function renderIntoInputHandler(event) {
  upperInput.value = event.detail.value || '0';
}

HANDLERS.createHistoryItem();
HANDLERS.writeToHistoryItem('0');

buttonsContainer.addEventListener('click', mouseClicksHandler);
document.addEventListener('keyup', keyboardClicksHandler);
document.addEventListener('render-into-input', renderIntoInputHandler);