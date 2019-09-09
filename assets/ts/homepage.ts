import {OrderService} from "./services/OrderService";

const $ = require("jquery");
import {JsCore} from '../../jsCore';

export class Homepage {

    public name: string;

    constructor(name: string,
                private jsCore: JsCore,
                private orderService: OrderService) {
        this.name = name;

        /**
         * JsCore onClick
         */
        this.jsCore.onClick(this);
        /**
         * dateTimePicker
         */
        this.jsCore.dateTimePicker(this.orderService.checkDateTime.bind(this));
        this.orderService.checkFormData($('[name="order"]'));
        this._sendForm();
    }

    /**
     * @param {MouseEvent} event
     */
    public toggleSelection(event: MouseEvent): void {
        event.preventDefault();
        const href: string = $((event.target) as HTMLElement).attr('href');
        const nav: string = href.split('#').join('');

        if (!nav) {
            return;
        }

        const section: JQuery = $(`#${nav}`);
        const sections = $('.section');

        sections.removeClass('active fadeOut');

        if (section.length) {
            section.addClass('active fadeIn');
        }
    }

    /**
     * Close all selection
     */
    public closeSelection(): void {
        const section = $('.section');
        section.addClass('fadeOut')
        setTimeout(() => section.removeClass('active'), 600);
    }

    public back(event: MouseEvent): void {
        const el = $('.order-section');
        el.removeClass('active');
        $('#send').prop('checked', false);
        $('#next').prop('disabled', false).removeClass('disabled');
        $('#sendOrder').addClass('hdn');
        $(event.target).addClass('hdn');
        setTimeout(() => el.empty(), 200);
    }

    private _sendForm(): void {
        $('[data-type="post"]').submit((event: any) => {
            event.preventDefault();
            console.log('spinner');
            $.ajax({
                method: "POST",
                url: "/order",
                data: $(event.target).serializeArray(),
                beforeSend:() => {
                    $('<span class="spinner">Loadding...</span>').appendTo('.bd');
                    $('.order-section').empty();
                },
                success: (response: any) => {
                    $('.spinner').remove();
                    $(response).appendTo($('.order-section'));
                    $('#send').prop('checked', true);
                    $('#next').prop('disabled', true).addClass('disabled');
                    $('#back').removeClass('hdn');
                    $('#sendOrder').removeClass('hdn');

                },
                complete: () =>{
                    $('.order-section').addClass('active');
                }
            });
        });
    }
}

new Homepage('jarek', new JsCore(), new OrderService('jarek'));

