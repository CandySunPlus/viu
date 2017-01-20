import SVG_TAGS from './svg-tags';
import { INodeAttrs } from './hyper-parser';
import events from './events';
const SVG_NS = 'http://www.w3.org/2000/svg';
const XLINK_NS = 'http://www.w3.org/1999/xlink';

function isNSAttr(attrName: string): boolean {
    return /^xmlns($|:)/i.test(attrName);
}

function appendChild(element: Element, children: Element[]) {
    if (!Array.isArray(children)) {
        children = [children];
    }
    for (let node of children) {
        if (Array.isArray(node)) {
            appendChild(element, node);
            continue;
        }
        if (node && node.nodeType) {
            element.appendChild(node);
        } else if (node !== undefined && node !== null) {
            if (!element.lastChild || element.lastChild.nodeName !== '#text') {
                element.appendChild(document.createTextNode(''));
            }
            element.lastChild.nodeValue += node;
        }
    }
}

export function createElement(tagName: string, attrs: INodeAttrs, ...children: Element[]): Element {
    let element: Element, namespace = null;
    attrs = attrs ? attrs : {};

    if (SVG_TAGS.indexOf(tagName) >= 0) {
        attrs['namespace'] = SVG_NS;
    }

    if (attrs.hasOwnProperty('namespace')) {
        namespace = attrs['namespace'];
        delete attrs['namespace'];
    }

    if (namespace) {
        element = document.createElementNS(namespace, tagName);
    } else {
        element = document.createElement(tagName);
    }

    for (let attrName of Object.keys(attrs)) {
        let attrValue = attrs[attrName];

        if (namespace) {
            if (!isNSAttr(attrName)) {
                if (attrName === 'xlink:href') {
                    element.setAttributeNS(XLINK_NS, attrName, attrValue);
                } else {
                    element.setAttributeNS(SVG_NS, attrName, attrValue);
                }
            }
        } else {
            if (events.indexOf(attrName) >= 0 || attrName === 'ref') {
                element[attrName] = attrValue;
            } else {
                if (attrName === 'className') {
                    attrName = 'class';
                } else if (attrName === 'htmlFor') {
                    attrName = 'for';
                }
                element.setAttribute(attrName, attrValue);
            }
        }
    }

    appendChild(element, children);
    return element;
}
