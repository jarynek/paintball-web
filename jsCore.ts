const $ = require('jquery');
require('jquery-datetimepicker');

export class JsCore {

    private fn: string;

    constructor(){

    }

    public getTest(): void {
        console.log('getTest');
    }

    /**
     * @param {Object}  object
     */
    public onClick(object: Object): void {

        $('[data-onClick]').on('click', (event: MouseEvent) => {

            this.fn = $((event.target) as HTMLElement).data('onclick');

            if(!this.fn) {
                throw new Error('not fn name');
            }
            else if(typeof Object.getPrototypeOf(object)[this.fn] !== 'function') {
                throw new Error('not fn in object');
            }

            Object.getPrototypeOf(object)[this.fn](event);
        });
    }

    /**
     * dateTimePicker
     */
    public dateTimePicker(callBackFn: any) {
        $('.datetimepicker').datetimepicker({
                format:'Y-m-d H:i:s',
                lang:'de',
                onChangeDateTime:(dp: any, $input: JQuery | null) => {
                    callBackFn(dp, $input);
                }
            }
        );
    }
}
