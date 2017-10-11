define(['vue'], function(Vue) {
    "use strict";

    return {
        dragstart: function (e) {
            e.stopPropagation();
            //this.isDragging = true;
            if (this.$options.name === 'block') {
                this.editor.draggingComponent = this.editor.getComponent(this.component.name);
            } else if (this.$options.name === 'outline') {
                this.editor.draggingComponent = this.relatedComponent;
            } else {
                this.editor.draggingComponent = this;
            }
            this.editor.$placeEl = null;
            this.editor.$container = null;
            e.dataTransfer.setDragImage(this.editor.getDragImage(this.editor.draggingComponent.$options.name), 0, 0);

        },
        dragleave: function(e) {
            //e.stopPropagation();
            this.editor.clearFixedOutline();
        },
        dragend: function (e) {
            e.stopPropagation();
        },
        drop: function(e) {
            e.stopPropagation();
            var component = this.editor.draggingComponent;
            if (!component) {
                return;
            }

            var c = component.$mount();
            //need compute the conflict between 2 components
            if (this.editor.$placeEl) {
                insertAfter.call(this.editor.$target, c.$el, this.editor.$placeEl);
                //this.editor.$target.insertBefore(c.$el, this.editor.$placeEl);
            } else {
                this.editor.$target.appendChild(c.$el);
            }
            this.editor.draggingComponent = null;
            this.editor.clearTargetOutline();
            this.editor.clearLinetOutline();

        },
        dragover: function(e) {
            e.preventDefault();

            if (!this.editor || !this.editor.draggingComponent) {
                return;
            }
            var $target = e.target.closest('.ui-container') || this.editor.$refs.content;
            var $component = e.target.closest('.ui-cmp');

            if ($target) {
                this.editor.setTarget($target);
            }

            if ($target === $component) {
                $component = null;
            }
            if ($component) {
                var a = $component.compareDocumentPosition($target);
                if (a == 16 || a == 20) {
                    $component = null;
                }
            }
            this.editor.setPlaceEl($component);
            e.stopPropagation();
        },
    };

    function insertAfter(newEl, targetEl)
    {
        var parentEl = targetEl.parentNode;
        if(parentEl.lastChild == targetEl)
        {
            this.appendChild(newEl);
        }else
        {
            this.insertBefore(newEl,targetEl.nextSibling);
        }
    }
});
