"use strict";


var config = require("./config");
var createHierarchy = require("./createHierarchy");


function link(rootElementNode, needle, registry) {
    var rootNode;

    if (registry.linkTask == null) {
        throw new Error("Missing required method `linkTask` on registry object");
    }

    rootNode = createHierarchy(rootElementNode, needle, config.SELECTOR_ATTRIBUTE);
    _link(rootNode, registry);

    return rootNode;
}

function _link(node, registry) {
    for (var i = 0, l = node.children.length; i < l; i += 1) {
        node.children[i] = _link(node.children[i], registry);
    }

    if (node.getId()) {
        node.component = registry.linkTask(node.getId(), node);
    }

    return node.component;
}


module.exports = link;
