/** @jsx h */
function h(type, props, ...children) {
    return { type, props, children };
}

function createElement(node) {
    //如果只是一个字符串
    if (typeof node === 'string') {
        return document.createTextNode(node);
    }
    //如果是 HTML 的节点的形式
    const $el = document.createElement(node.type);
    node.children.map(createElement)
        .forEach($el.appendChild.bind($el));
    return $el;
}

//diff 算法
function changed(nodeNew, nodeOld) {
    return typeof nodeOld !== typeof nodeNew ||
        typeof nodeNew === 'string' && nodeOld !== nodeNew ||
        nodeOld.type !== nodeNew.type
}

//更新算法
function updateElement($parent, newNode, oldNode, index = 0) {
    if (!oldNode) { //原本的节点没有，那么就插入新的节点
        $parent.appendChild(
            createElement(newNode)
        );
    } else if (!newNode) { //新的节点没有内容，旧的节点就应该移除
        $parent.removeChild(
            $parent.childNodes[index]
        );
    } else if (changed(newNode, oldNode)) { //比较新旧两个节点是否有变更
        $parent.replaceChild(
            createElement(newNode), //新节点
            $parent.childNodes[index] //之前的旧节点
        );
    } else if (newNode.type) { //递归处理自身的子节点
        const newLength = newNode.children.length;
        const oldLength = oldNode.children.length;
        for (let i = 0; i < newLength || i < oldLength; i++) {
            updateElement(
                $parent.childNodes[index],
                newNode.children[i],
                oldNode.children[i],
                i
            );
        }
    }
}

const list = (
    <ul class="list">
        <li>苹果</li>
        <li>西瓜</li>
    </ul>
);

const listNew = (
    <ul class="list">
        <li>苹果</li>
        <li>西瓜</li>
        <li>荔枝</li>
    </ul>
);


//console.log(list);

const $root = document.getElementById('root');
//$root.appendChild(createElement(list));
updateElement($root, list);

const $reload = document.getElementById('reload');
$reload.addEventListener('click', () => {
    updateElement($root, listNew, list);
});
