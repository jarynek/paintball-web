var $ = require("jquery");
var OrderService = /** @class */ (function () {
    function OrderService(name, orderForm) {
        this.orderForm = orderForm;
    }
    OrderService.prototype.checkFormData = function (form) {
        var _this = this;
        $(form).find('input[data-check]').on('keyup blur', function (event) {
            var el = $(event.target);
            var type = $(event.target).data('check');
            var next = $('#next');
            switch (type) {
                case 'fill':
                    _this.checkFill(el);
                    break;
                case 'email':
                    _this.checkEmail(el);
                    break;
                default:
                    break;
            }
            var checkStatus = Object.values(_this.orderForm).filter(function (item) { return item.check === false; });
            next.prop('disabled', true).addClass('disabled');
            if (!checkStatus.length) {
                next.prop('disabled', false).removeClass('disabled');
            }
        });
    };
    OrderService.prototype.checkDateTime = function (dp, $input) {
        var compareId = $input.attr('id') === 'date_time_from' ? 'date_time_to' : 'date_time_from';
        var compareInput = $("#" + compareId);
        var currentDateTime = $input.val();
        var compereDateTime = compareInput.val();
        var dateCurrent = currentDateTime ? new Date(Date.parse(currentDateTime.toString())) : null;
        var dateCompare = compereDateTime ? new Date(Date.parse(compereDateTime.toString())) : null;
        var orderFormDate = this.orderForm.find(function (item) { return item.name === 'date'; });
        orderFormDate.check = false;
        if (!dateCurrent || !dateCompare) {
            $input.closest('label').addClass('error');
            return;
        }
        var compareData = null;
        switch ($input.attr('id')) {
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
        if (!compareData) {
            $input.addClass('compare');
            $input.closest('label').addClass('error');
        }
        console.log(compareData);
        orderFormDate.check = compareData;
        this.orderForm.find(function (item) { return item.name === 'date' ? Object.assign(item, orderFormDate) : item; });
    };
    OrderService.prototype.checkFill = function (el) {
        var type = el.attr('type');
        Object.values(this.orderForm).forEach(function (item) {
            if (item.type === type) {
                el.closest('label').removeClass('error');
                item.check = el.val().length > 0;
                if (!item.check) {
                    el.closest('label').addClass('error');
                }
            }
        });
    };
    OrderService.prototype.checkEmail = function (el) {
        var type = el.attr('type');
        Object.values(this.orderForm).forEach(function (item) {
            if (item.type === type) {
                el.closest('label').removeClass('error');
                item.check = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(el.val());
                if (!item.check) {
                    el.closest('label').addClass('error');
                }
            }
        });
    };
    return OrderService;
}());
export { OrderService };
