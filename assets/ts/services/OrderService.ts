const $ = require("jquery");

export class OrderService {
    public name: string;
    public orderForm: any;
    constructor(name: string, orderForm: any) {
        this.orderForm = orderForm;
    }

    public checkFormData(form: HTMLFormElement): void {
        $(form).find('input[data-check]').on('keyup blur', (event: any) => {

            const el = $(event.target);
            const type = $(event.target).data('check');
            const next = $('#next');

            switch (type) {
                case 'fill':
                    this.checkFill(el);
                    break;
                case 'email':
                    this.checkEmail(el);
                    break;
                default:
                    break;
            }
            const checkStatus = Object.values(this.orderForm).filter((item: any) =>  item.check === false);
            next.prop('disabled', true).addClass('disabled');
            if(!checkStatus.length) {
                next.prop('disabled', false).removeClass('disabled');
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
        const orderFormDate: any = this.orderForm.find((item: any) => item.name === 'date');
        orderFormDate.check = false;

        if(!dateCurrent || !dateCompare) {
            $input.closest('label').addClass('error');
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
        $('[data-check="dateTime"]').closest('label').removeClass('error');
        if(!compareData) {
            $input.addClass('compare');
            $input.closest('label').addClass('error');
        }
        console.log(compareData);
        orderFormDate.check = compareData;
        this.orderForm.find((item: any) => item.name === 'date' ? Object.assign(item, orderFormDate): item);
    }

    private checkFill(el: JQuery): void {
        const type = el.attr('type');
        Object.values(this.orderForm).forEach((item: any) => {
            if(item.type === type) {
                el.closest('label').removeClass('error');
                item.check = (el.val() as string).length > 0;
                if(!item.check){
                    el.closest('label').addClass('error');
                }
            }
        });
    }

    private checkEmail(el: JQuery): void {
        const type = el.attr('type');
        Object.values(this.orderForm).forEach((item: any) => {
            if(item.type === type) {
                el.closest('label').removeClass('error');
                item.check = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test((el.val() as string));
                if(!item.check){
                    el.closest('label').addClass('error');
                }
            }
        });
    }
}
