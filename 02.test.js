var obj = {
    name: 'tom'
}    

var  fn1 = function(){
    console.log(this)
}
var fn2 = () => {
    console.log(this)
}

fn1()
fn1.call(obj)
fn2.call(obj)