import $ from 'jquery';
import ShoppingCart from './ShoppingCart/ShoppingCart';
import List from './List/List';

export default class App {
    constructor(id) {
        this.$el = $('#' + id)
    }

    // 初始化购物车
    initShoppingCart() {
        let shoppingCart = new ShoppingCart(this)
        shoppingCart.init();
    }

    //初始列表
    initList() {
        let List = new List(this)
        List.init()
    }
    
    init() {
        console.log(123);
        this.initShoppingCart()
        this.initList()
    }
}