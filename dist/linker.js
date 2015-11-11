var Linker=function(n){function e(r){if(t[r])return t[r].exports;var o=t[r]={exports:{},id:r,loaded:!1};return n[r].call(o.exports,o,o.exports,e),o.loaded=!0,o.exports}var t={};return e.m=n,e.c=t,e.p="/dist",e(0)}([function(module,exports,__webpack_require__){eval("module.exports = __webpack_require__(1);\n\n\n/*****************\n ** WEBPACK FOOTER\n ** multi main\n ** module id = 0\n ** module chunks = 0\n **/\n//# sourceURL=webpack:///multi_main?")},function(module,exports,__webpack_require__){eval('"use strict";\n\nmodule.exports = {\n\n    config: __webpack_require__(2),\n    link: __webpack_require__(3),\n    Registry: __webpack_require__(6)\n};\n\n\n/*****************\n ** WEBPACK FOOTER\n ** ./lib/index.js\n ** module id = 1\n ** module chunks = 0\n **/\n//# sourceURL=webpack:///./lib/index.js?')},function(module,exports){eval('"use strict";\n\nmodule.exports = {\n\n    ELEMENT_ID: "$element",\n    ITEMS_ID: "$items",\n    PARENT_ID: "$parent",\n    SELECTOR_ATTRIBUTE: "data-item",\n    NEEDLE: "data-component",\n};\n\n\n/*****************\n ** WEBPACK FOOTER\n ** ./lib/config.js\n ** module id = 2\n ** module chunks = 0\n **/\n//# sourceURL=webpack:///./lib/config.js?')},function(module,exports,__webpack_require__){eval('"use strict";\n\n\nvar config = __webpack_require__(2);\nvar createHierarchy = __webpack_require__(4);\n\n\nfunction link(rootElementNode, needle, registry) {\n    var rootNode;\n\n    if (registry.linkTask == null) {\n        throw new Error("Missing required method `linkTask` on registry object");\n    }\n\n    rootNode = createHierarchy(rootElementNode, needle, config.SELECTOR_ATTRIBUTE);\n    _link(rootNode, registry);\n\n    return rootNode;\n}\n\nfunction _link(node, registry) {\n    for (var i = 0, l = node.children.length; i < l; i += 1) {\n        node.children[i] = _link(node.children[i], registry);\n    }\n\n    if (node.getId()) {\n        node.component = registry.linkTask(node.getId(), node);\n    }\n\n    return node.component;\n}\n\n\nmodule.exports = link;\n\n\n/*****************\n ** WEBPACK FOOTER\n ** ./lib/link.js\n ** module id = 3\n ** module chunks = 0\n **/\n//# sourceURL=webpack:///./lib/link.js?')},function(module,exports,__webpack_require__){eval('"use strict";\n\n\nvar ComponentNode = __webpack_require__(5);\n\n\n/**\n * Generates a hierachical node-list of component-elements\n *\n * @param  {HTMLElement} element        - root HTMLElement\n * @param  {String} needle              - HTMLElement-attribute for components\n * @param  {String} selectorAttribute   - attribute used for assigning nodes on `elements`-property\n * @return {ComponentNode} root node\n */\nfunction getRootNode(element, needle, selectorAttribute) {\n    var rootId = element.getAttribute(needle) || false;\n    var rootNode = new ComponentNode(rootId, element);\n\n    parseDom(rootNode, rootNode.element, needle, selectorAttribute);\n    return rootNode;\n}\n\nfunction parseDom(currentNode, currentElement, needle, selectElementAttribute) {\n    var elem = currentElement;\n    var found;\n    var attrVal;\n\n    for (elem = elem.firstChild; elem; elem = elem.nextSibling) {\n        if (elem.nodeType === 1) {\n\n            if ((attrVal = elem.getAttribute(selectElementAttribute))) {\n                currentNode.addItem(attrVal, elem);\n            }\n\n            if ((found = elem.getAttribute(needle))) {\n                parseDom(currentNode.createChild(found, elem), elem, needle, selectElementAttribute);\n\n            } else {\n                parseDom(currentNode, elem, needle, selectElementAttribute);\n            }\n        }\n    }\n}\n\n\nmodule.exports = getRootNode;\n\n\n/*****************\n ** WEBPACK FOOTER\n ** ./lib/createHierarchy.js\n ** module id = 4\n ** module chunks = 0\n **/\n//# sourceURL=webpack:///./lib/createHierarchy.js?')},function(module,exports,__webpack_require__){eval('"use strict";\n\n\nvar config = __webpack_require__(2);\n\n\n/**\n * A single query result. Used to store hierachical information\n *\n * @param {HTMLElement} node\n * @param {Node} parent\n */\nfunction Node(id, element, parent) {\n    this.id = id;\n    this.element = element;\n    this.parent = parent;\n    this.children = [];\n    this.items = {};\n}\n\nNode.prototype.getId = function () {\n    return this.id;\n};\n\nNode.prototype.getElement = function () {\n    return this.element;\n};\n\nNode.prototype.getChildren = function () {\n    return this.children;\n};\n\nNode.prototype.getItems = function () {\n    return this.items;\n};\n\nNode.prototype.getRoot = function () {\n    if (this.parent == null) {\n        return this;\n    } else {\n        return this.parent.getRoot();\n    }\n};\n\nNode.prototype.createChild = function (id, elem) {\n    var child = new Node(id, elem, this);\n    this.children.push(child);\n    return child;\n};\n\nNode.prototype.addItem = function (id, element) {\n    this.items[id] = element;\n};\n\n// debug\nNode.prototype.toString = function () {\n    return (this.id || this.node.nodeName) + " (" + Object.keys(this.elements).length + ")";\n};\n\n// debug\nNode.prototype.print = function (padding) {\n    padding = padding || "";\n\n    var result = "\\n" + padding + this.toString();\n    this.children.forEach(function (child) {\n        result += "\\n" + child.print(padding + "  ");\n    });\n\n    return result;\n};\n\n\nmodule.exports = Node;\n\n\n\n/*****************\n ** WEBPACK FOOTER\n ** ./lib/Node.js\n ** module id = 5\n ** module chunks = 0\n **/\n//# sourceURL=webpack:///./lib/Node.js?')},function(module,exports){eval('"use strict";\n\n\nfunction Registry(registry) {\n    this.registry = registry || {};\n}\n\nRegistry.prototype.publish = function (id, Constructor) {\n    this.registry[id] = Constructor;\n};\n\nRegistry.prototype.linkTask = function (id, node) {\n    var Constructor = this.registry[id];\n\n    if (Constructor == null) {\n        throw new Error("Missing constructor " + id + " in linker registry");\n    }\n\n    return new Constructor(node.getElement(), node.getChildren(), node.getItems());\n};\n\n\nmodule.exports = Registry;\n\n\n\n/*****************\n ** WEBPACK FOOTER\n ** ./lib/Registry.js\n ** module id = 6\n ** module chunks = 0\n **/\n//# sourceURL=webpack:///./lib/Registry.js?')}]);