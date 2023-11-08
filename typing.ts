class Timestamps {
    timestamps: number[];
};

type KTime = Map<string, Timestamps>;
class K2KTime {
    keymap: Map<string, KTime>;
    getPairTimestamps(key1: string, key2: string) {
        return this.keymap.get(key1)?.get(key2)?.timestamps;
    }
    addTimestamp(key1: string, key2: string, time: number) {
        return this.getPairTimestamps(key1, key2)?.push(time);
    }
}

class TypingSingleton {
    key_to_key_ms: K2KTime[] = [];
    shifted_keys = [
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
    typeable_keys = [];
    durations: number[] = [];

    constructor() {
        this.shifted_keys.forEach(key => {
            typeable_keys.push(key[0]);
            typeable_keys.push(key[1]);
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
            durations.push(last - timestamps.pop());
        }
        return durations.reverse();
    }

    displayMillis(mills) {
        if (mills > 1000)
            return (mills / 1000) + ' s';
        return mills + ' ms';
    }

    addDurationEvent() {
        durations.push(Date.now());
    }

    endDurationEvent() {
        const current = durations;
        current.push(Date.now());
        durations = [];
        const timeElapsed = current[current.length - 1] - current[0];

        console.log([
            ['time elapsed:', displayMillis(timeElapsed)].join(' '),
            ['keys duration:', calculateDurationSince(current).map(displayMillis)].join(' ')
        ].join(' --- '));
    }



    keydownhandler(e: HTMLElementEventMap['keydown']) {
        // console.log('keydown', e.code, e);
        console.log('keydown', e.code);
        if (e instanceof KeyboardEvent) {
            if (e.code === 'Enter') {
                const value = e.target.value;
                console.log('Enter', value);
                window.document.getElementById('typetext').textContent = value;
                endDurationEvent();
            } else if (typeable_keys.includes(e.key)) {
                window.document.getElementById('outputtext').textContent = durations;
                console.log('FOUND key', e.key);
                endDurationEvent();
                addDurationEvent();
            }
        }
    }

};