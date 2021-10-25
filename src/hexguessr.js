const hexIntegers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];

export default class HexGuessr {

    _hexValues = []

    constructor() {
        this._hexToGuess = this._generate();
        this._hexValues.push(this._hexToGuess);
        for (let i = 0; i < 4; i++) {
            this._hexValues.push(this._generate());
        }
        this._shuffle(this._hexValues);
    }

    /**
     * @returns {String}
     */
    get hexToGuess() { 
        return this._hexToGuess;
    }

    /**
     * @returns {Array}
     */
    get hexValues() {
        return this._hexValues;
    }

    /**
     * Generates and returns a hexadecimal value that represents a color 
     * @returns {String}
     */
    _generate() {
        let hexCode = '#';
        for (let i = 0; i < 6; i++) {
            hexCode += hexIntegers[Math.floor(Math.random() * hexIntegers.length)];
        }
        return hexCode;
    }

    /**
     * Randomly shuffle an array based on the Fisher-Yates shuffle algorithm
     * @param {Array} array
     */
    _shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
          let j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
        }
    }

    /**
     * Convert a decimal value to hexadecimal
     * @param {String} value
     * @returns {String}
     */
    static decToHex(value) {
        if (value > 255) {
            return 'FF';
        } else if (value < 0) {
            return '00';
        } else {
            return value.toString(16).padStart(2, '0').toUpperCase();
        }
    }

    /**
     * Convert a RGB value to hexadecimal
     * @param {String} value
     * @returns {String}
     */
    static rgbToHex(value) {
        const rgbValue = value.substring(4, (value.length-1)).split(', ');
        return '#' + rgbValue.map((x) => HexGuessr.decToHex(~~x)).join('');
    }

}