const $ = require("jquery");
import {JsCore} from '../../jsCore';

export class Gallery {

    constructor(private jsCore: JsCore) {
        this.jsCore.onClick(this);
    }

    private openFileDetail(event:MouseEvent): void {
        const el = (event.target) as HTMLElement;
        $('.file-container').remove();
        const hd = `<div class="file-hd"><span class="file-close" data-onClick="closeFileDetail">Close</span></div>`;
        const bd = `<div class="file-bd"><img src="${$(el).data('file')}" /></div>`;
        const container = $('<div/>',{
            class: 'file-container',
            html: `${hd}${bd}`,
        });

        container.insertAfter(el);
        $('html, body').animate({
            scrollTop: container.position().top
        }, 500);
    }

    private closeFileDetail(): void {
        $('.file-container').remove();
    }


}

new Gallery(new JsCore());
