define(['vue', 'lib/component'], function(Vue, parent) {
    "use strict";

var component = {
    name: 'i-div',
    mixins: [parent],
    template: '<div class="ui-empty" v-comp v-on:dragstart="dragstart" draggable="true" v-on:drop="drop" v-bind:style="panel._style"><div  class="ui-container"></div></div>',
    dragImage: '<div>div</div>',
    data: function() {
        return {
            setting: {
                delete: function() {

                },
            },
            panel: {
                style: {
                    width: 0,
                    height: 'auto',

                },
                _style: {
                    width: 0,
                    height: 'auto',
                }
            }
        };
    },
    watch: {
        'panel.style.width': function(newValue, oldValue) {
            if (isNaN(newValue)) {
                this.panel._style.width = 'auto';
            } else {
                this.panel._style.width = newValue + 'px';
            }
        },
        'panel.style.height': function(newValue, oldValue) {
            if (isNaN(newValue)) {
                this.panel._style.height = 'auto';
            } else {
                this.panel._style.height = newValue + 'px';
            }
        }
    }
};
Vue.component('i-div', component);
return component;
});
