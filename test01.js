function Person(name, sex) {
    this.name = name;
    this.sex = sex;
}

Person.prototype.getName = function () {
    console.log(this.name);
};

function Male(name, sex, age) {
    Person.call(this, name, sex);
    this.age = age;
}

Male.prototype = Object.create(Person.prototype);
Male.prototype.constructor = Male;

Male.prototype.getAge = function () {
    console.log(this.age);
};

var ruoyu = new Male('小明', '男', 27);
ruoyu.getName();
ruoyu.getAge();
console.log(ruoyu.constructor);