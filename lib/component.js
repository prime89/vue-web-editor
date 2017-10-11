define(['vue', 'lib/event'], function(Vue, event) {
    "use strict";

var methods = {
    edit: edit,
};
for(var func in event) {
    methods[func] = event[func];
}
let count = 0;

//definition of directive;
Vue.directive('comp', {

    bind: function (el, binding, vnode) {
        el.className += ' ui-cmp';

        let component = vnode.context;
        component.$on('select', function(isSelect, e) {
            this.editor.updateRelatedComponents(this, isSelect, e);
        });
        el.addEventListener('mousedown', function(e) {
            e.stopPropagation();
            count = 0;
        }, false);
        el.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            count++;
            var isSelect = count <= 1;
            component.$emit('select', isSelect, e);
        }, false);
        el.addEventListener('mouseover', function(e) {
            e.preventDefault();
            e.stopPropagation();
            preSelectComponent.call(component);
        }, false);
    },
    unbind: function (el, binding) {
        el.removeEventListener('click', null);
        el.removeEventListener('mousedown', null);
        el.removeEventListener('mouseover', null);
    },
});

Vue.directive('item', {
    bind: function (el, binding, vnode) {
        console.log('1');
        let component = vnode.context;
        el.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            component.editor.openSetting(e, [{'name': 'add', callback: add}]);
        }, false);

        function add() {
            var node = cloneVNode(vnode, true);

            el.parentNode.insertBefore(node.elm, el);
        }
    },
    unbind: function (el, binding) {
        el.removeEventListener('click', null);
    },
});

function cloneVNode (vnode, deep) {

    const cloned = new vnode.constructor(
        vnode.tag,
        vnode.data,
        vnode.children,
        vnode.text,
        vnode.elm.cloneNode(true),
        vnode.context,
        vnode.componentOptions,
        vnode.asyncFactory
    )
    cloned.ns = vnode.ns
    cloned.isStatic = vnode.isStatic
    cloned.key = vnode.key
    cloned.isComment = vnode.isComment
    cloned.isCloned = true
    if (deep && vnode.children) {
        cloned.children = cloneVNodes(vnode.children)
    }
    return cloned
}

function cloneVNodes (vnodes, deep){
    const len = vnodes.length
    const res = new Array(len)
    for (let i = 0; i < len; i++) {
        res[i] = cloneVNode(vnodes[i], deep)
    }
    return res
}


return {
    template: '<div>{{name}}</div>',
    methods: methods,
    data: function() {
        return {
            editor: null,
            isDragging: false,
            isEditable: false
        }
    },
    mounted: function() {
    },
};

function edit() {
    this.$el.focus();
}

function selectComponent(isSelect) {
    //outline
    this.editor.updateRelatedComponents(this, isSelect)
}

function preSelectComponent() {
    //outline
    this.editor.preSelectComponent(this)
}
});
