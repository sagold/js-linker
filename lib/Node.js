"use strict";


/**
 * A single query result. Used to store hierachical information
 *
 * @param {HTMLElement} node
 * @param {Node} parent
 */
function Node(id, element, parent) {
    this.id = id;
    this.element = element;
    this.parent = parent;
    this.children = [];
    this.items = {};
}

Node.prototype.getId = function () {
    return this.id;
};

Node.prototype.getElement = function () {
    return this.element;
};

Node.prototype.getChildren = function () {
    return this.children;
};

Node.prototype.getItems = function () {
    return this.items;
};

Node.prototype.getRoot = function () {
    if (this.parent == null) {
        return this;
    } else {
        return this.parent.getRoot();
    }
};

Node.prototype.createChild = function (id, elem) {
    var child = new Node(id, elem, this);
    this.children.push(child);
    return child;
};

Node.prototype.addItem = function (id, element) {
    this.items[id] = element;
};

// debug
Node.prototype.toString = function () {
    return (this.id || this.node.nodeName) + " (" + Object.keys(this.elements).length + ")";
};

// debug
Node.prototype.print = function (padding) {
    padding = padding || "";

    var result = "\n" + padding + this.toString();
    this.children.forEach(function (child) {
        result += "\n" + child.print(padding + "  ");
    });

    return result;
};


module.exports = Node;

