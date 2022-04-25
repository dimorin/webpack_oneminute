export function message(msg){
    const el = document.createElement('p');
    el.textContent = msg;
    document.body.append(el);
}