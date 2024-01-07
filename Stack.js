class Node {
  constructor(data, next = null) {
    this.data = data;
    this.next = next;
  }
}

class Stack {
  constructor(maxElemsInStack = 10) {
    this.maxStackLength = maxElemsInStack;
    this.head = null;
    this.stackLength = 0;
    this.currentElem = null;
  }

  push(elem) {
    if (this.stackLength === this.maxStackLength) {
      throw new Error('Стек переполнен.');
    }

    if (elem === undefined) {
      throw new Error('Не введено значения для добавления.');
    }

    const node = new Node(elem, this.head);

    this.stackLength++;
    this.head = node;
    this.currentElem = node.data;
  }

  pop() {
    if (this.stackLength === 0) {
      throw new Error('Стек пуст.');
    }

    this.stackLength--;
    
    const returnValue = this.head.data;

    if (this.head.next === null) {
      this.currentElem = null;
      this.head = null;
      
      return returnValue;
    }

    this.currentElem = this.head.next.data;
    this.head = this.head.next;

    return returnValue;
  }

  peek() {
    if (!this.head) {
      return null;
    }

    return this.head.data;
  }

  isEmpty() {
    return !this.head;
  }

  toArray() {
    const output = [];
    let current = this.head;

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

    const stackLength = iterable.length || iterable.size || Object.keys(iterable).length;
    const stack = new Stack(stackLength);

    for (let element of iterable) {
      stack.push(element);
    }

    return stack;
  }
}