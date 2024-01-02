class Node {
  constructor(data, next = null, prev = null) {
    this.data = data;
    this.next = next;
    this.prev = prev;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;

    this.append = this.append.bind(this);
    this.prepend = this.prepend.bind(this);
    this.find = this.find.bind(this);
    this.toArray = this.toArray.bind(this);
  }

  append(elem) {
    const node = new Node(elem, null, this.tail);

    if (this.tail) {
      this.tail.next = node;
    }

    if(!this.head) {
      this.head = node;
    }

    node.prev = this.tail;
    this.tail = node;
  }

  prepend(elem) {
    const node = new Node(elem, this.head)
    
    if (this.head) {
      this.head.prev = node;
    }

    this.head = node;

    if (!this.tail) {
      this.tail = node;
    }
  }

  find(elem) {
    if (!this.head) {
      return null;
    }
    
    let current = this.head;

    while (current) {
      if (current.data === elem) {
        return current.data;
      }

      current = current.next;
    }

    return null;
  }

  toArray() {
    let resultArr = [];

    if (!this.head) {
      return resultArr;
    }

    let current = this.head;

    while (current) {
      resultArr.push(current.data);
      current = current.next;
    }

    return resultArr;
  }

  static fromIterable(iterable) {
    if (typeof iterable[Symbol.iterator] === 'undefined') {
      throw new Error('Сущность не является итерируемой.');
    }

    const linkedList = new LinkedList();

    for (let element of iterable) {
      linkedList.append(element);
    }

    return linkedList;
  }
}