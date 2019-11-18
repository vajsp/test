// 基础示例
class Circle {
    draw() {
        console.log('画一个圆');
    }
}

class Decorator {
    constructor(circle) {
        this.circle = circle
    }

    draw() {
        this.circle.draw()
        this.setRedBorder(circle)
    }

    setRedBorder(circle) {
        console.log('设置成红色边框');
    }
}

// 测试代码
let circle = new Circle();
circle.draw()
console.log('--分割--');
let dec = new Decorator(circle);
dec.draw();




