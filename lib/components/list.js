define(['vue', 'lib/component'], function(Vue, parent) {
"use strict";

var component = {
    name: 'i-list',
    mixins: [parent],
    template: '<ul v-comp v-on:dragstart="dragstart" draggable="true"><li v-item>list2</li></ul>',
    dragImage: '<div>list</div>',
    data: function() {
        return {
            setting: {
                delete: function() {

                },
            },
            panel: {
                style: {

                },
                _style: {
                }
            }
        };
    }
}

Vue.component(component.name, component);
return component;
});
