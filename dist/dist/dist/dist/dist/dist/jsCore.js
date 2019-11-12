var $ = require('jquery');
require('jquery-datetimepicker');
var JsCore = /** @class */ (function () {
    function JsCore() {
    }
    JsCore.prototype.getTest = function () {
        console.log('getTest');
    };
    /**
     * @param {Object}  object
     */
    JsCore.prototype.onClick = function (object) {
        var _this = this;
        $(document).on('click', '[data-onClick]', function (event) {
            _this.fn = $((event.target)).data('onclick');
            if (!_this.fn) {
                throw new Error('not fn name');
            }
            else if (typeof Object.getPrototypeOf(object)[_this.fn] !== 'function') {
                throw new Error('not fn in object');
            }
            Object.getPrototypeOf(object)[_this.fn](event);
        });
    };
    /**
     * dateTimePicker
     */
    JsCore.prototype.dateTimePicker = function (callBackFn) {
        $('.datetimepicker').datetimepicker({
            format: 'Y-m-d H:i:s',
            lang: 'de',
            onChangeDateTime: function (dp, $input) {
                callBackFn(dp, $input);
            },
        });
    };
    JsCore.prototype.chaining = function () {
        console.log('sdf');
    };
    return JsCore;
}());
export { JsCore };
