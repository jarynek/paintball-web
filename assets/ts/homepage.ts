import {OrderService} from "./services/OrderService";

const $ = require("jquery");
import {JsCore} from '../../jsCore';

export const orderForm = [
    {name: 'name', type: 'text', check: false},
    {name: 'user_name', type: 'text', check: false},
    {name: 'email', type: 'email', check: false},
    {name: 'mobil', type: 'mobil', check: false},
    {name: 'date', type: 'date', check: false}
];

export class Homepage {

    public name: string;
    public orderForm: any;

    constructor(name: string,
                orderForm: any,
                private jsCore: JsCore,
                private orderService: OrderService) {
        this.name = name;
        this.orderForm = orderForm;
        /**
         * JsCore onClick
         */
        this.jsCore.onClick(this);
        /**
         * dateTimePicker
         */
        this.jsCore.dateTimePicker(this.orderService.checkDateTime.bind(this));
        this.orderService.checkFormData($('[name="order"]'));
        this.sendForm();

        this.jsCore?.chaining();

        const test = {
            name: 'jarek'
        };

        const foo: any = null;

        let x = foo ?? 'jarek';

        console.log(x);
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
        $('.order-section').removeClass('active');


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
        $('.hd').html(`<h2>Objednávka</h2>`);
    }

    private sendForm(): void {
        $('[data-type="post"]').submit((event: any) => {
            event.preventDefault();

            const form = event.target;

            $.ajax({
                method: "POST",
                url: "/order",
                data: $(form).serializeArray(),
                beforeSend:() => {
                    $('<span class="loading"></span>').appendTo('.bd');
                    $('.order-section').empty();
                },
                success: (response: any, status: any, xhr: any) => {

                    const content = () => {
                        $(response).appendTo($('.order-section'));
                        $('#send').prop('checked', true);
                        $('#next').prop('disabled', true).addClass('disabled');
                        $('#back').removeClass('hdn');
                        $('#sendOrder').removeClass('hdn');
                        $('.order-section').addClass('active');
                    };

                    let header = 'Objednávka';
                    if(xhr.status === 202) {
                        header = 'Error';
                    }else if(xhr.status === 201){
                        /**
                         * clear local storage
                         */
                        header = 'Rekapitulace';
                        content();
                    }else if (xhr.status === 200) {
                        content();
                        header = 'Odesláno';
                        $(form).find('.form-control').val('');
                    }

                    $('.hd').html(`<h2>${header}</h2>`);
                    $('.loading').remove();
                }
            });
        });
    }
}

new Homepage('jarek', orderForm, new JsCore(), new OrderService('jarek', orderForm));

