var Person = (function () {
    var instance
    function init(name) {
        return {
            name: name
        }
    }

    return {
        createPerson: function (name) {
            if (!instance) {
                instance = init(name);
            }
            return instance
        }
    }
})();

var obj1 = Person.createPerson('xiaoming');
var obj2 = Person.createPerson('limei');

console.log(obj1 === obj2)