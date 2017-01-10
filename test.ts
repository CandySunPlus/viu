import { hp, INodeAttrs } from './hyper-parser';

interface IHyperText {
    tagName: string;
    attrs: INodeAttrs;
    children: IHyperText[];
}

const tpl = hp<IHyperText>(function(tagName, attrs, children) {
    return { tagName, attrs, children };
});

let newC = 'new-class';

function update() {
    console.log('update.');
}

let x = tpl`
<div class= "panel ${newC}" ${newC} onclick=${update}>
<h1 class="panel-title">This is title</h1>
<br />
<div class="panel-content">
<span> Next Content </span>
</div>
</div>
`;


console.log(x);
