class Subject {
    constructor() {
        this.state = 0;
        this.observers = [];
    }

    getState() {
        return this.state
    }

    setState(state) {
        this.state = state;
        this.notifyAllObservers();
    }

    attach(observer){
        this.observers.push(observer);
    }

    notifyAllObservers(){
        this.observers.forEach((observer) => {
            observer.update();
        })
    }
}

class Observer {
    constructor(name,sub) {
        this.name = name;
        this.sub = sub;
        this.sub.attach(this)
    }

    update() {
        console.log(`${this.name},state ${this.sub.getState()}`);
    }
}

var sub = new Subject();

var ob1 = new Observer('ob1', sub);
var ob2 = new Observer('ob2', sub);

sub.setState(2);