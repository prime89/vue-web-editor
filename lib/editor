define(['vue', 'lib/event', 'lib/outline', 'lib/panel', 'lib/setting'], function(Vue, event, outline) {
"use strict";

var methods = {
    init: function(components) {
        this.registerComponents(components);
        this.getOutline().editor = this;
        this.getPanel().editor = this;
        this.getSetting().editor = this;
    },
    registerComponents: function(components) {
        for(var i=0,len=components.length;i<len;i++) {
            var Block = Vue.component('block');
            var block = new Block({
                data: {
                    component: components[i],
                    editor: this
                }
            }).$mount();

            this.components[components[i].name] = block;
            this.$refs.container.appendChild(block.$el);
        }
    },
    getComponent: function(name) {
        var Component = Vue.component(name);
        var instance = new Component({
            data: {
                editor: this,
            }
        });
        return instance;
    },
    getDragImage: function(name) {
        return this.components[name].$refs.dragImage.firstChild;
    },
    updateRelatedComponents: function(component, isSelect, e) {
        //compute component width & height
        if (isSelect) {
            for(var i=0,len=this.getOutline().relatedComponents.length;i<len;i++) {
                this.getOutline().relatedComponents.pop();
            }
            this.selectComponent(component, e);
        }
        //
        this.getOutline().relatedComponents.push(component);
    },
    setTarget: function ($el) {
        this.$target = $el;
        this.getOutline().target.display = 'block';
        this.getOutline().target.width = $el.offsetWidth - 4 + 'px';
        this.getOutline().target.height = $el.offsetHeight - 4 + 'px';
        this.getOutline().target.transform = 'translate('+ $el.offsetLeft  + 'px, '+  $el.offsetTop +'px)';

    },
    setPlaceEl: function ($el) {
        this.$placeEl = $el;
        if (!$el) {
            return;
        }

        this.getOutline().line.display = 'block';
        this.getOutline().line.width = $el.offsetWidth - 1 + 'px';
        this.getOutline().line.transform = 'translate('+ $el.offsetLeft  + 'px, '+  ($el.offsetTop + $el.offsetHeight) +'px)';

    },
    setFixedOutline: function(component) {
        this.getOutline().relatedComponent = component;
        this.getOutline().fixed.display = 'block';
        this.getOutline().fixed.width = component.$el.offsetWidth - 1 + 'px';
        this.getOutline().fixed.height = component.$el.offsetHeight - 1  + 'px';
        this.getOutline().fixed.transform = 'translate('+ component.$el.offsetLeft  + 'px, '+  component.$el.offsetTop +'px)';

    },
    updateOutline: function() {
        this.setFixedOutline(this.getOutline().relatedComponent);
    },
    getOutline: function() {
        return this.$refs.outline;
    },
    getPanel: function() {
        return this.$refs.panel;
    },
    getSetting: function() {
        return this.$refs.setting;
    },
    selectComponent: function(component, e) {
        this.setFixedOutline(component);

        //open panel
        var panel = this.getPanel();
        panel.ref.component = component;
        panel.style.display = 'block';

        //open setting
        this.openSetting(e, [])
    },
    preSelectComponent: function (component) {

    },
    clearFixedOutline: function() {
        this.getOutline().fixed.display = 'none';
    },
    clearTargetOutline: function () {
        this.getOutline().target.display = 'none';
    },
    clearLinetOutline: function () {
        this.getOutline().line.display = 'none';
    },
    openSetting: function(e, actions) {
        this.getSetting().style.display = 'block';
        this.getSetting().style.left = e.clientX + 'px';
        this.getSetting().style.top = e.clientY + 'px';

        for(var i=0,len=this.getSetting().actions.length;i<len;i++) {
            this.getSetting().actions.pop();
        }

        for(var i=0,len=actions.length;i<len;i++) {
            this.getSetting().actions.push(actions[i]);
        }
    }
};
for(var func in event) {
    methods[func] = event[func];
}

Vue.component('block', {
    mixins: [{
        methods: event
    }],
    data: function() {
        return {
            isDragging: false,
            component: ''
        };
    },
    template: '<div class="ui-block" v-bind:class="{dragging: isDragging}" v-on:dragstart="dragstart" v-on:dragend="dragend" v-on:dragleave="dragleave" draggable="true">\
    <div class="ui-block-sub">{{component.name}}</div>\
    <div class="drag-image" ref="dragImage" v-html="component.dragImage"></div></div>',
});

return {
    template: '<div><div class="ui-block-container" ><div class="ui-block-container-wrap" ref="container"></div></div>\
    <div class="ui-content" v-on:drop="drop" v-on:dragover="dragover" ref="content"></div>\
    <outline ref="outline"></outline><panel ref="panel"></panel><setting ref="setting"></setting></div>',
    data: function() {
        return {
            draggingComponent: null,
            components: {},
            editor: null,
            $target: null,
            $placeEl: null,
        }
    },
    methods: methods,
    created: function() {
        this.editor = this;
    }
}
});
