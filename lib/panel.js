define(['vue', 'lib/event'], function(Vue, event) {
    "use strict";

    var methods = {
        updateInput: function(target, key, value) {
            target[key] = value;
            let editor = this.editor;
            setTimeout(function() {
                editor.updateOutline();
            }, 50);
        }
    };

    for(var func in event) {
        methods[func] = event[func];
    }

    Vue.component('panel', {
        template: '<div class="ui-panel" v-bind:style="style">\
        <dl><template v-for="(item, key) in ref.component.panel.style"><dt>{{key}}:</dt>\
        <dd><input v-bind:value="item" v-on:input="updateInput(ref.component.panel.style, key, $event.target.value)"></dd></template></dl></div>',
        methods: methods,
        data: function() {
            return {
                ref: {
                    component: {panel: {style:{}}},
                },
                style: {
                    display: 'none'
                },
                editor: null
            }
        },
        watch: {
            component: function(newValue, oldValue) {
                console.log(newValue);
            }
        }
    });

});
