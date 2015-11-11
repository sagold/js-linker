"use strict";


var ComponentNode = require("./Node");


/**
 * Generates a hierachical node-list of component-elements
 *
 * @param  {HTMLElement} element        - root HTMLElement
 * @param  {String} needle              - HTMLElement-attribute for components
 * @param  {String} selectorAttribute   - attribute used for assigning nodes on `elements`-property
 * @return {ComponentNode} root node
 */
function getRootNode(element, needle, selectorAttribute) {
    var rootId = element.getAttribute(needle) || false;
    var rootNode = new ComponentNode(rootId, element);

    parseDom(rootNode, rootNode.element, needle, selectorAttribute);
    return rootNode;
}

function parseDom(currentNode, currentElement, needle, selectElementAttribute) {
    var elem = currentElement;
    var found;
    var attrVal;

    for (elem = elem.firstChild; elem; elem = elem.nextSibling) {
        if (elem.nodeType === 1) {

            if ((attrVal = elem.getAttribute(selectElementAttribute))) {
                currentNode.addItem(attrVal, elem);
            }

            if ((found = elem.getAttribute(needle))) {
                parseDom(currentNode.createChild(found, elem), elem, needle, selectElementAttribute);

            } else {
                parseDom(currentNode, elem, needle, selectElementAttribute);
            }
        }
    }
}


module.exports = getRootNode;
