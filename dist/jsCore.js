const $ = require('jquery');
require('jquery-datetimepicker');
export class JsCore {
    constructor() {
    }
    getTest() {
        console.log('getTest');
    }
    /**
     * @param {Object}  object
     */
    onClick(object) {
        $(document).on('click', '[data-onClick]', (event) => {
            this.fn = $((event.target)).data('onclick');
            if (!this.fn) {
                throw new Error('not fn name');
            }
            else if (typeof Object.getPrototypeOf(object)[this.fn] !== 'function') {
                throw new Error('not fn in object');
            }
            Object.getPrototypeOf(object)[this.fn](event);
        });
    }
    /**
     * dateTimePicker
     */
    dateTimePicker(callBackFn) {
        $('.datetimepicker').datetimepicker({
            format: 'Y-m-d H:i:s',
            lang: 'de',
            onChangeDateTime: (dp, $input) => {
                callBackFn(dp, $input);
            },
        });
    }
    chaining() {
        console.log('jarek');
    }
}
