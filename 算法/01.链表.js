
function Node(element) {
    this.element = element;
    this.next = null;
}

function LList() {
    this.head = new Node("head");
    // this.find = find;
    // this.insert = insert;
    // this.remove = remove;
    // this.display = display;
}

LList.prototype.find = function (item) {
    var currNode = this.head;
    while (currNode.element != item) {
        currNode = currNode.next;
    }
    return currNode;
}

LList.prototype.insert = function (newElement,item) {
    var newNode = new Node(newElement);
    var current = this.find(item);
    newNode.next = current.next;
    current.next = newNode;
}

LList.prototype.display = function () {
    var currNode = this.head;
    while(!(currNode.next == null)){
        // print(currNode.next.element);
        console.log(currNode.next.element)
        currNode = currNode.next;
    }
}

LList.prototype.findPrevious = function (item) {
    var currNode = this.head;
    while (!(currNode.next == null) &&
        (currNode.next.element != item)) {
        currNode = currNode.next;
    }
    return currNode;
}

LList.prototype.remove = function (item) {
    var prevNode = this.findPrevious(item);
    if (!(prevNode.next == null)) {
        prevNode.next = prevNode.next.next;
    }
}



var cities = new LList();
cities.insert("Conway", "head");
cities.insert("Russellville", "Conway");
cities.insert("Alma", "Russellville");
cities.remove("Alma");
cities.display()


