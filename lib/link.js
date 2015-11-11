"use strict";


var config = require("./config");
var createHierarchy = require("./createHierarchy");


function link(rootElementNode, needle, linkTask) {
    var rootNode = createHierarchy(rootElementNode, needle, config.SELECTOR_ATTRIBUTE);

    if (rootNode.id) {
        _link(rootNode, linkTask);

    } else {
        for (var i = 0, l = rootNode.children.length; i < l; i += 1) {
            rootNode.children[i] = _link(rootNode.children[i], linkTask);
        }
    }

    return rootNode;
}

function _link(node, linkTask) {
    for (var i = 0, l = node.children.length; i < l; i += 1) {
        node.children[i] = _link(node.children[i], linkTask);
    }

    node.component = linkTask(node.getId(), node);
    return node.component;
}


module.exports = link;
