export function classList(clist: {[className: string]: boolean}) {
    let cl = [];
    for (let className of Object.keys(clist)) {
        if (clist[className] === true) {
            cl.push(className);
        }
    }
    return cl.join(' ');
}
