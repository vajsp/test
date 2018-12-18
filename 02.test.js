function People(name){
    this.name = name;
}

People.prototype.sayName = function () { 
    console.log(this.name);
}

var liming = new People('liming');

liming.sayName();