import { HyperParser } from './hyper-parser';
import { createElement } from './create-element';

const hp = new HyperParser<Element>(createElement);

export default hp.tpl.bind(hp);
