class K2KTime {
    constructor() {
        this.keymap = new Map();
    }
    getPairTimestamps(key1, key2) {
        var _a, _b;
        return (_b = (_a = this.keymap.get(key1)) === null || _a === void 0 ? void 0 : _a.get(key2)) === null || _b === void 0 ? void 0 : _b.timestamps;
    }
    addTimestamp(key1, key2, time) {
        var _a;
        return (_a = this.getPairTimestamps(key1, key2)) === null || _a === void 0 ? void 0 : _a.push(time);
    }
}
export class TypingSingleton {
    constructor() {
        this.key_to_key_ms = [];
        this.shifted_keys = [
            // number row
            ['`', '~'],
            ['1', '!'],
            ['2', '@'],
            ['3', '#'],
            ['4', '$'],
            ['5', '%'],
            ['6', '^'],
            ['7', '&'],
            ['8', '*'],
            ['9', '('],
            ['0', ')'],
            ['-', '_'],
            ['=', '+'],
            // q row
            ['q', 'Q'],
            ['w', 'W'],
            ['e', 'E'],
            ['r', 'R'],
            ['t', 'T'],
            ['y', 'Y'],
            ['u', 'U'],
            ['i', 'I'],
            ['o', 'O'],
            ['p', 'P'],
            ['[', '{'],
            [']', '}'],
            ['\\', '|'],
            // a row
            ['a', 'A'],
            ['s', 'S'],
            ['d', 'D'],
            ['f', 'F'],
            ['g', 'G'],
            ['h', 'H'],
            ['j', 'J'],
            ['k', 'K'],
            ['l', 'L'],
            [';', ':'],
            ['\'', '"'],
            // z row
            ['z', 'Z'],
            ['x', 'X'],
            ['c', 'C'],
            ['v', 'V'],
            ['b', 'B'],
            ['n', 'N'],
            ['m', 'M'],
            [',', '<'],
            ['.', '>'],
            ['/', '?'],
        ];
        this.typeable_keys = [];
        this.durations = [];
        this.shifted_keys.forEach(key => {
            this.typeable_keys.push(key[0]);
            this.typeable_keys.push(key[1]);
        });
        // this.typeable_keys.forEach(key => {
        //     this.typeable_keys.forEach(key1 => {
        //         this.key_to_key_ms.push({});
        //     });
        // });
    }
    calculateDurationSince(timestamps) {
        const last = timestamps.pop();
        while (timestamps.length) {
            this.durations.push(last - timestamps.pop());
        }
        return this.durations.reverse();
    }
    displayMillis(mills) {
        if (mills > 1000)
            return (mills / 1000) + ' s';
        return mills + ' ms';
    }
    addDurationEvent() {
        this.durations.push(Date.now());
    }
    endDurationEvent() {
        const current = this.durations;
        current.push(Date.now());
        this.durations = [];
        const timeElapsed = current[current.length - 1] - current[0];
        // this.key_to_key_ms.push({});
        console.log([
            ['time elapsed:', this.displayMillis(timeElapsed)].join(' '),
            ['keys duration:', this.calculateDurationSince(current).map(this.displayMillis)].join(' ')
        ].join(' --- '));
    }
    keydownhandler(e) {
        // console.log('keydown', e.code, e);
        console.log('keydown', e.code, e);
        if (e instanceof KeyboardEvent) {
            if (e.target == null || !(e.target instanceof HTMLInputElement)) {
                console.log('NOT INPUT EVENT??', e.target);
                return;
            }
            if (e.code === 'Enter') {
                const value = e.target.value;
                console.log('Enter', value);
                window.document.getElementById('typetext').textContent = value;
                this.endDurationEvent();
            }
            else if (this.typeable_keys.includes(e.key)) {
                window.document.getElementById('outputtext').textContent = this.durations.toString();
                console.log('FOUND key', e.key);
                this.endDurationEvent();
                this.addDurationEvent();
            }
        }
    }
}
;
