enum NodeType {
    ELEMENT_NODE = 1,
    TEXT_NODE = 3,
    COMMENT_NODE = 8
}

const XHTML_NS = 'http://www.w3.org/1999/xhtml';

const SPECIAL_NODE_NAME = ['OPTION', 'INPUT', 'TEXTAREA', 'SELECT'];

export default function diffNode(oldNode: Node, newNode: Node) {
    if (oldNode !== newNode) {
        modifyNode(oldNode, newNode);
    }

    return oldNode;
}

function modifyNode(fromNode: Node, toNode: Node, childrenOnly = true) {
    if (toNode === fromNode) { return; }

    if (fromNode.nodeName !== 'TEXTAREA') {
        let currentToNodeChild = toNode.firstChild,
            currentFromNodeChild = fromNode.firstChild,
            nextToNodeChild, nextFromNodeChild;
        outerLoop: while (currentToNodeChild) {
            nextToNodeChild = currentToNodeChild.nextSibling;
            while (currentFromNodeChild) {
                nextFromNodeChild = currentFromNodeChild.nextSibling;
                if (currentToNodeChild === currentFromNodeChild) {
                    currentToNodeChild = nextToNodeChild;
                    currentFromNodeChild = nextFromNodeChild;
                    continue outerLoop;
                }

                if (currentFromNodeChild.nodeType === currentToNodeChild.nodeType) {
                    if (currentFromNodeChild.nodeType === NodeType.ELEMENT_NODE) {
                        if (currentFromNodeChild.nodeName === currentToNodeChild.nodeName) {
                            modifyElAttrs(<Element>currentFromNodeChild, <Element>currentToNodeChild);
                            modifyNode(currentFromNodeChild, currentToNodeChild);
                            currentToNodeChild = nextToNodeChild;
                            currentFromNodeChild = nextFromNodeChild;
                            continue outerLoop;
                        }
                    } else if ([NodeType.TEXT_NODE, NodeType.COMMENT_NODE].indexOf(currentFromNodeChild.nodeType) >= 0) {
                        if (currentFromNodeChild.nodeValue !== currentToNodeChild.nodeValue) {
                            currentFromNodeChild.nodeValue = currentToNodeChild.nodeValue;
                        }
                        currentToNodeChild = nextToNodeChild;
                        currentFromNodeChild = nextFromNodeChild;
                        continue outerLoop;
                    }
                }

                fromNode.removeChild(currentFromNodeChild);
                currentFromNodeChild = nextFromNodeChild;
            }
            fromNode.appendChild(currentToNodeChild);
            currentToNodeChild = nextToNodeChild;
        }

        while (currentFromNodeChild) {
            nextFromNodeChild = currentFromNodeChild.nextSibling;
            fromNode.removeChild(currentFromNodeChild);
            currentFromNodeChild = nextFromNodeChild;
        }

        if (SPECIAL_NODE_NAME.indexOf(fromNode.nodeName) >= 0) {
            specialNodeModifier(fromNode, toNode);
        }

    }
}

function specialNodeModifier(fromNode: Node, toNode: Node) {
    function syncBooleanAttrProp(fromEl: Element, toEl: Element, propName: string) {
        if (fromEl[propName] !== toEl[propName]) {
            fromEl[propName] = toEl[propName];
        }
    }
    let modifier = {
        OPTION: function(fromNode: Node, toNode: Node) {
            let fromEl = <HTMLOptionElement>fromNode,
                toEl = <HTMLOptionElement>toNode;
            syncBooleanAttrProp(fromEl, toEl, 'selected');
        },
        INPUT: function(fromNode: Node, toNode: Node) {
            let fromEl = <HTMLInputElement>fromNode,
                toEl = <HTMLInputElement>toNode;
            syncBooleanAttrProp(fromEl, toEl, 'checked');
            syncBooleanAttrProp(fromEl, toEl, 'disabled');
            if (!toEl.hasAttribute('value')) {
                fromEl.removeAttribute('value');
            } else {
                if (fromEl.value !== toEl.value) {
                    fromEl.value = toEl.value;
                }
            }
        },
        TEXTAREA: function(fromNode: Node, toNode: Node) {
            let fromEl = <HTMLTextAreaElement>fromNode,
                toEl = <HTMLTextAreaElement>toNode;
            if (fromEl.value !== toEl.value) {
                fromEl.value = toEl.value;
            }
        },
        SELECT: function(fromNode: Node, toNode: Node) {
            let fromEl = <HTMLSelectElement>fromNode,
                toEl = <HTMLSelectElement>toNode;
            if (!toEl.hasAttribute('multiple')) {
                let currentChild = toEl.firstChild,
                    i = 0,
                    selectedIndex = -1;
                while (currentChild) {
                    if (currentChild.nodeName && currentChild.nodeName.toUpperCase() === 'OPTION') {
                        if ((<HTMLOptionElement>currentChild).hasAttribute('selected')) {
                            selectedIndex = i;
                            break;
                        }
                        i++;
                    }
                    currentChild = currentChild.nextSibling;
                }
                fromEl.selectedIndex = selectedIndex;
            }

        }
    };
    modifier[fromNode.nodeName](fromNode, toNode);
}

function modifyElAttrs(fromEl: Element, toEl: Element) {
    let fromAttrs = fromEl.attributes;
    let toAttrs = toEl.attributes;

    for (let i = fromAttrs.length - 1; i >= 0; i--) {
        let attr = fromAttrs[i];

        if (attr.specified) {
            if (!hasAttribute(toEl, attr)) {
                removeAttribute(fromEl, attr);
            }
        }
    }

    for (let i = toAttrs.length - 1; i >= 0; i--) {
        let attr = toAttrs[i],
            attrValue = attr.value,
            fromAttrValue = getAttribute(fromEl, attr);

        if (fromAttrValue !== attrValue) {
            setAttribute(fromEl, attr, attrValue);
        }
    }
}

function moveChildren(sourceEl: Element, targetEl: Element) {
    while (sourceEl.firstChild) {
        targetEl.appendChild(sourceEl.firstChild);
    }
    return targetEl;
}

function createElementNS(name: string, namespaceURI: string) {
    return (!namespaceURI || namespaceURI === XHTML_NS) ?
        document.createElement(name) : document.createElementNS(namespaceURI, name);
}

function walkNodeTree(node: Node) {
    if (node.nodeType === NodeType.ELEMENT_NODE) {
        let currentNode = node.firstChild;
        while (currentNode) {
            let key = (<Element>node).id;
            console.log(key);
            walkNodeTree(currentNode);
            currentNode = currentNode.nextSibling;
        }
    }
}

function hasAttribute(el: Element, attr: Attr) {
    let namespaceURI = attr.namespaceURI,
        attrName = attr.name;
    return namespaceURI ?
        el.hasAttributeNS(namespaceURI, attr.localName || attrName) :
        el.hasAttribute(attrName);
}

function removeAttribute(el: Element, attr: Attr) {
    let namespaceURI = attr.namespaceURI,
        attrName = attr.name;
    return namespaceURI ?
        el.removeAttributeNS(namespaceURI, attr.localName || attrName) :
        el.removeAttribute(attrName);
}

function setAttribute(el: Element, attr: Attr, value: any) {
    let namespaceURI = attr.namespaceURI,
        attrName = attr.name;
    return namespaceURI ?
        el.setAttributeNS(namespaceURI, attr.localName || attrName, value) :
        el.setAttribute(attrName, value);
}

function getAttribute(el: Element, attr: Attr) {
    let namespaceURI = attr.namespaceURI,
        attrName = attr.name;
    return namespaceURI ?
        el.getAttributeNS(namespaceURI, attr.localName || attrName) :
        el.getAttribute(attrName);
}
