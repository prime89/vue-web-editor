define(['vue', 'lib/event'], function(Vue, event) {
"use strict";

var methods = {
    dblclick: function (e) {
        //
        if (!this.relatedComponent) {
            return;
        }
        this.fixed.display = 'none';
        this.relatedComponent.edit();
    },
    selectComponent: function(e, index) {
        this.relatedComponents[index].$emit('select', true);
    },
    setConfig: function(e) {
        console.log(this.relatedComponent);
        console.log('open config panel');
    }
};

for(var func in event) {
    methods[func] = event[func];
}

Vue.component('outline', {
    template: '<div><div class="ui-outline-target" v-bind:style="target"></div><div class="ui-outline-line" v-bind:style="line"></div>' +
    '<div class="ui-outline-cover" v-bind:style="fixed" v-on:dblclick="dblclick" v-on:dragstart="dragstart" draggable="true"><div class="crumbs clearfix" title="Show More">' +
    '<div class="crumb" v-for="(crumb, index) in relatedComponents" v-on:click="selectComponent(event, index)"><span>{{crumb.$options.name}}</span><span v-on:click="setConfig">A</span></div></div></div></div>',
    methods: methods,
    data: function() {
        return {
            fixed: {
                display: 'block',
                width: 100,
                height: 200,
                top: 0,
                left: 0,
                transform: 'translate(10px, 0px)'
            },
            target: {
                display: 'block',
                width: 0,
                height: 0,
                top: 0,
                left: 0,
                transform: 'translate(10px, 0px)'
            },
            line: {
                display: 'block',
                width: 0,
                height: '2px',
                top: 0,
                left: 0,
                transform: 'translate(10px, 0px)'
            },
            relatedComponent: null,
            relatedComponents: [],
            editor: null,
        }
    }
});

Vue.component('outline-position', {
    template: '<div class="ui-outline-position" v-bind:style="fixed" v-on:dblclick="dblclick" v-on:dragstart="dragstart" draggable="true"><div class="crumbs clearfix" title="Show More">' +
    '<div class="crumb" v-for="(crumb, index) in relatedComponents" v-on:click="selectComponent(event, index)"><span>{{crumb.$options.name}}</span><span v-on:click="setConfig">A</span></div></div></div>',
    methods: methods,
    data: function() {
        return {
            fixed: {
                display: 'block',
                width: 100,
                height: 200,
                top: 0,
                left: 0,
                transform: 'translate(10px, 0px)'
            },
            mounted: false,
            relatedComponent: null,
            relatedComponents: [],
            editor: null,
        }
    }
});

});
