import { OrderService } from "./services/OrderService";
const $ = require("jquery");
import { JsCore } from '../../jsCore';
export const orderForm = [
    { name: 'name', type: 'text', check: false },
    { name: 'user_name', type: 'text', check: false },
    { name: 'email', type: 'email', check: false },
    { name: 'mobil', type: 'mobil', check: false },
    { name: 'date', type: 'date', check: false }
];
export class Homepage {
    constructor(name, orderForm, jsCore, orderService) {
        var _a;
        this.jsCore = jsCore;
        this.orderService = orderService;
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
        (_a = this.jsCore) === null || _a === void 0 ? void 0 : _a.chaining();
        const test = {
            name: 'jarek'
        };
        const foo = null;
        let x = (foo !== null && foo !== void 0 ? foo : 'jarek');
        console.log(x);
    }
    /**
     * @param {MouseEvent} event
     */
    toggleSelection(event) {
        event.preventDefault();
        const href = $((event.target)).attr('href');
        const nav = href.split('#').join('');
        if (!nav) {
            return;
        }
        const section = $(`#${nav}`);
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
    closeSelection() {
        const section = $('.section');
        section.addClass('fadeOut');
        setTimeout(() => section.removeClass('active'), 600);
    }
    back(event) {
        const el = $('.order-section');
        el.removeClass('active');
        $('#send').prop('checked', false);
        $('#next').prop('disabled', false).removeClass('disabled');
        $('#sendOrder').addClass('hdn');
        $(event.target).addClass('hdn');
        setTimeout(() => el.empty(), 200);
        $('.hd').html(`<h2>Objednávka</h2>`);
    }
    sendForm() {
        $('[data-type="post"]').submit((event) => {
            event.preventDefault();
            const form = event.target;
            $.ajax({
                method: "POST",
                url: "/order",
                data: $(form).serializeArray(),
                beforeSend: () => {
                    $('<span class="loading"></span>').appendTo('.bd');
                    $('.order-section').empty();
                },
                success: (response, status, xhr) => {
                    const content = () => {
                        $(response).appendTo($('.order-section'));
                        $('#send').prop('checked', true);
                        $('#next').prop('disabled', true).addClass('disabled');
                        $('#back').removeClass('hdn');
                        $('#sendOrder').removeClass('hdn');
                        $('.order-section').addClass('active');
                    };
                    let header = 'Objednávka';
                    if (xhr.status === 202) {
                        header = 'Error';
                    }
                    else if (xhr.status === 201) {
                        /**
                         * clear local storage
                         */
                        header = 'Rekapitulace';
                        content();
                    }
                    else if (xhr.status === 200) {
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
