class State {
    constructor(color) {
        this.color = color
    }
    
    handle(context) {
        console.log(`turn to ${this.color} light`);
        context.setState(this);
    }
}

class Context {
    constructor() {
        this.state = null;
    }

    setState(state) {
        this.state = state
    }

    getSate () {
        return this.state
    }
}

// 测试代码
let context = new Context();

let red = new State('red');
let yellow = new State('yellow');
let green = new State('green');

// 绿灯亮了
green.handle(context)
console.log(context.getSate());
// 红灯亮了
red.handle(context);
console.log(context.getSate());




