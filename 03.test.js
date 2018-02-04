

/* 
    组合继承
 */

function Parent(name) {
    this.name= name;
}

Parent.prototype.sayName = function () {
    console.log(this.name);
}



function Child(name,age) {
    Parent.call(this,name);
    this.age = age;
}

Child.prototype = Object.create(Parent.prototype);
// Child.prototype.constructer = Child;


var p1 = new Child('limming');

console.log(p1.sayName());

console.log(p1 instanceof Child);