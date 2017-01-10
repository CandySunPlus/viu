import v from './v';

let newC = 'new-class';

let list = [
    'aaaaaaaa',
    'bbbbbbbb',
    'cccccccc'
];

function update() {
    console.log('update.');
}

let x = v`
<div class= "panel ${newC}" ${newC} onclick=${update}>
<h1 class="panel-title">This is title</h1>
<br />
<div class="panel-content">
${list.map(item => v`<li>${item}</li>`)}
</div>
</div>
`;

console.log(x);

document.querySelector('.app').appendChild(x);
