import { OrderService } from "./services/OrderService";
var $ = require("jquery");
import { JsCore } from '../../jsCore';
export var orderForm = [
    { name: 'name', type: 'text', check: false },
    { name: 'user_name', type: 'text', check: false },
    { name: 'email', type: 'email', check: false },
    { name: 'mobil', type: 'mobil', check: false },
    { name: 'date', type: 'date', check: false }
];
var Homepage = /** @class */ (function () {
    function Homepage(name, orderForm, jsCore, orderService) {
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
    }
    /**
     * @param {MouseEvent} event
     */
    Homepage.prototype.toggleSelection = function (event) {
        event.preventDefault();
        var href = $((event.target)).attr('href');
        var nav = href.split('#').join('');
        if (!nav) {
            return;
        }
        var section = $("#" + nav);
        var sections = $('.section');
        sections.removeClass('active fadeOut');
        $('.order-section').removeClass('active');
        if (section.length) {
            section.addClass('active fadeIn');
        }
    };
    /**
     * Close all selection
     */
    Homepage.prototype.closeSelection = function () {
        var section = $('.section');
        section.addClass('fadeOut');
        setTimeout(function () { return section.removeClass('active'); }, 600);
    };
    Homepage.prototype.back = function (event) {
        var el = $('.order-section');
        el.removeClass('active');
        $('#send').prop('checked', false);
        $('#next').prop('disabled', false).removeClass('disabled');
        $('#sendOrder').addClass('hdn');
        $(event.target).addClass('hdn');
        setTimeout(function () { return el.empty(); }, 200);
        $('.hd').html("<h2>Objedn\u00E1vka</h2>");
    };
    Homepage.prototype.sendForm = function () {
        $('[data-type="post"]').submit(function (event) {
            event.preventDefault();
            var form = event.target;
            $.ajax({
                method: "POST",
                url: "/order",
                data: $(form).serializeArray(),
                beforeSend: function () {
                    $('<span class="loading"></span>').appendTo('.bd');
                    $('.order-section').empty();
                },
                success: function (response, status, xhr) {
                    var content = function () {
                        $(response).appendTo($('.order-section'));
                        $('#send').prop('checked', true);
                        $('#next').prop('disabled', true).addClass('disabled');
                        $('#back').removeClass('hdn');
                        $('#sendOrder').removeClass('hdn');
                        $('.order-section').addClass('active');
                    };
                    var header = 'Objednávka';
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
                    $('.hd').html("<h2>" + header + "</h2>");
                    $('.loading').remove();
                }
            });
        });
    };
    return Homepage;
}());
export { Homepage };
new Homepage('jarek', orderForm, new JsCore(), new OrderService('jarek', orderForm));
