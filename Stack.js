class Node {
  constructor(data, next = null) {
    this.data = data;
    this.next = next;
  }
}

class Stack {
  static stackLength;
  static head;

  constructor(maxElemsInStack = 10) {
    this.maxStackLength = maxElemsInStack;
    Stack.head = null;
    Stack.stackLength = 0;
    this.currentElem = null;
    
    this.push = this.push.bind(this);
    this.pop = this.pop.bind(this);
    this.peek = this.peek.bind(this);
    this.isEmpty = this.isEmpty.bind(this);
    this.toArray = this.toArray.bind(this);
  }

  push(elem) {
    if (Stack.stackLength === this.maxStackLength) {
      throw new Error('Стек переполнен.');
    }

    if (elem === undefined) {
      throw new Error('Не введено значения для добавления.');
    }

    let node = new Node(elem, Stack.head);
    Stack.stackLength++;
    Stack.head = node;
    this.currentElem = node.data;
  }

  pop() {
    if (Stack.stackLength === 0) {
      throw new Error('Стек пуст.');
    }

    Stack.stackLength--;

    if (Stack.head.next === null) {
      this.currentElem = null;
      Stack.head = null;
      let returnValue = null;
      
      return returnValue;
    }

    let returnValue = Stack.head.data;
    this.currentElem = Stack.head.next.data;
    Stack.head = Stack.head.next;

    return returnValue;
  }

  peek() {
    if (!Stack.head) {
      return null;
    }

    return Stack.head.data;
  }

  isEmpty() {
    if (!Stack.head) {
      return true;
    }

    return false;
  }

  toArray() {
    const output = [];
    let current = Stack.head;

    while (current) {
      output.push(current.data);
      current = current.next;
    }

    return output;
  }

  static fromIterable(iterable) {
    if (typeof iterable[Symbol.iterator] === 'undefined') {
      throw new Error('Сущность не является итерируемой.');
    }

    const stackLength = iterable.length || iterable.size;
    const stack = new Stack(stackLength);

    for (let element of iterable) {
      stack.push(element);
    }

    return stack;
  }
}
