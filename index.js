window.addEventListener('DOMContentLoaded', function (e) {
    const singleton = new TypingSingleton();
    console.log('loaded');
    this.document.getElementById('in')
        .addEventListener('keydown', singleton.keydownhandler, false);
    this.document.getElementById('in')
        .addEventListener('keyup', function (e) {
            // console.log('keyup', e);
            console.log('keyup', e.code);
        }, false);
}, false);
