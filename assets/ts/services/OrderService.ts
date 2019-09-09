const $ = require("jquery");

export class OrderService {
    public name: string;
    public orderForm: any;
    constructor(name: string) {
        this._init();
    }

    public checkFormData(form: HTMLFormElement): void {
        $(form).find('input[data-check]').on('keyup blur', (event: any) => {

            const el = $(event.target);
            const type = $(event.target).data('check');

            switch (type) {
                case 'fill':
                    this.checkFill(el);
                    break;
                case 'email':
                    this.checkFill(el);
                    break;
                case 'dateTime':
                    console.log('dateTime');
                    break;
                default:
                    break;
            }

            const checkStatue = Object.values(this.orderForm).filter((item: any) =>  item.check === false);
            if(!checkStatue.length) {
                $('#next')
                    .prop('disabled', false)
                    .removeClass('disabled');
            }
        });
    }

    public checkDateTime(dp: any, $input: JQuery) {
        const compareId = $input.attr('id') === 'date_time_from' ? 'date_time_to' : 'date_time_from';
        const compareInput = $(`#${compareId}`);
        const currentDateTime = $input.val();
        const compereDateTime = compareInput.val();

        const dateCurrent = currentDateTime ? new Date(Date.parse(currentDateTime.toString())): null;
        const dateCompare = compereDateTime ? new Date(Date.parse(compereDateTime.toString())): null;

        if(!dateCurrent || !dateCompare) {
            return;
        }
        let compareData = null;

        switch($input.attr('id')){
            case 'date_time_from':
                compareData = dateCurrent < dateCompare;
                break;
            case 'date_time_to':
                compareData = dateCurrent > dateCompare;
                break;
            default:
                break;
        }

        compareInput.removeClass('compare');
        if(compareData === false) {
            $input.addClass('compare');
        }
    }

    private checkFill(el: JQuery): void {
        const name = el.attr('name');
        Object.values(this.orderForm).forEach((item: any) => {
            if(item.name === name) {
                el.removeClass('error');
                item.check = (el.val() as string).length > 5;
                if(!item.check){
                    el.addClass('error');
                }
            }
        });
    }

    private checkEmail(el: JQuery): void {
        const name = el.attr('name');
        Object.values(this.orderForm).forEach((item: any) => {
            if(item.name === name) {
                item.check = (el.val() as string).length > 5;
            }
        });
    }

    private _init(): void {
        this.orderForm = [
            {name: 'name', check: false},
            {name: 'user_name', check: false}
        ]
    }
}