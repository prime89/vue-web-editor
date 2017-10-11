define(['vue', 'lib/event'], function(Vue, event) {
    "use strict";

    var methods = {
        click: function(e, action) {
            if (action.callback) {
                action.callback();
            }
        }
    };

    for(var func in event) {
        methods[func] = event[func];
    }

    Vue.component('setting', {
        template: '<div class="ui-setting" v-bind:style="style"><div class="" v-for="action in actions" v-on:click="click(event, action)">{{action.name}}</div></div>',
        methods: methods,
        data: function() {
            return {
                actions: [],
                style: {
                    left: 0,
                    top: 0,
                    display: 'none'
                }
            }
        }
    });

});
