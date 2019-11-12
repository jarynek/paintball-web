var $ = require("jquery");
import { JsCore } from '../../jsCore';
var Gallery = /** @class */ (function () {
    function Gallery(jsCore) {
        this.jsCore = jsCore;
        this.jsCore.onClick(this);
    }
    Gallery.prototype.openFileDetail = function (event) {
        var el = (event.target);
        $('.file-container').remove();
        var hd = "<div class=\"file-hd\"><span class=\"file-close\" data-onClick=\"closeFileDetail\">Close</span></div>";
        var bd = "<div class=\"file-bd\"><img src=\"" + $(el).data('file') + "\" /></div>";
        var container = $('<div/>', {
            class: 'file-container',
            html: "" + hd + bd,
        });
        container.insertAfter(el);
        $('html, body').animate({
            scrollTop: container.position().top
        }, 500);
    };
    Gallery.prototype.closeFileDetail = function () {
        $('.file-container').remove();
    };
    return Gallery;
}());
export { Gallery };
new Gallery(new JsCore());
