"use strict";


function Registry(registry) {
    this.registry = registry || {};
}

Registry.prototype.publish = function (id, Constructor) {
    this.registry[id] = Constructor;
};

Registry.prototype.linkTask = function (id, node) {
    var Constructor = this.registry[id];

    if (Constructor == null) {
        throw new Error("Missing constructor " + id + " in linker registry");
    }

    return new Constructor(node.getElement(), node.getChildren(), node.getItems());
};


module.exports = Registry;

