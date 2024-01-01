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
    
    this.push = this.push.bind(this);
    this.pop = this.pop.bind(this);
    this.peek = this.peek.bind(this);
    this.isEmpty = this.isEmpty.bind(this);
    this.toArray = this.toArray.bind(this);
  }

  push(elem) {
    if (this.stackLength === this.maxStackLength) {
      throw new Error('Стек переполнен.');
    }

    if (elem === undefined) {
      throw new Error('Не введено значения для добавления.');
    }

    let node = new Node(elem, this.head);
    this.stackLength++;
    this.head = node;
    this.currentElem = node.data;
  }

  pop() {
    if (this.stackLength === 0) {
      throw new Error('Стек пуст.');
    }

    this.stackLength--;

    if (this.head.next === null) {
      this.currentElem = null;
      this.head = null;
      let returnValue = null;
      
      return returnValue;
    }

    let returnValue = this.head.data;
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
    if (!this.head) {
      return true;
    }

    return false;
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