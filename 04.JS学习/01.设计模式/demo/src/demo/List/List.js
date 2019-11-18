import $ from 'jquery';
import {
    GET_LIST
} from '../config/config.js';
import createItem from './CreateItem';



export default class List {
    constructor(app) {
        this.app = app;
        this.$el = $('<div></div>');
    }

    // 获取数据
    loadData() {
        // 返回Promise实例
        return fetch(GET_LIST).then((result) => {
            return result.json();
        })
    }

    // 生成列表
    initItemList(data) {
        // 创建一个Item 然后 init

        // data.map((itemData) => {
        //     // 创建一个 Item  然后init
        //     let item = createItem(this,itemData)
        //     item.init()
        //     return item
        // })

        data.forEach((itemData) => {
            let item = createItem( this ,itemData )
            item.init();
        })

    }

    // 渲染
    render() {
        this.app.$el.append(this.$el);
    }

    init() {
        console.log('init List');
        this.loadData().then((data) => {
            this.initItemList(data)
        }).then(() => {
            // 渲染
            this.render();
        })
    }
}