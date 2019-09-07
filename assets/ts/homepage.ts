const $ = require("jquery");
import {JsCore} from '../../jsCore';

export class Homepage {

    public name: string;

    constructor (name: string, private jsCore: JsCore){
        this.name = name;

        /**
         * JsCore onClick
         */
        this.jsCore.onClick(this);
        /**
         * dateTimePicker
         */
        this.jsCore.dateTimePicker();

    }

    /**
     * @param {MouseEvent} event
     */
    public toggleSelection(event: MouseEvent): void {
        event.preventDefault();
        const href: string = $((event.target) as HTMLElement).attr('href');
        const nav: string = href.split('#').join('');

        if(!nav) {
            return;
        }

        const section: JQuery = $(`#${nav}`);
        const sections = $('.section');

        sections.removeClass('active fadeOut');

        if(section.length) {
            section.addClass('active fadeIn');
        }
    }

    /**
     * Close all selection
     */
    public closeSelection() {
        const section = $('.section');
        section.addClass('fadeOut')
        setTimeout(() => section.removeClass('active'), 600);
    }
}

new Homepage('jarek', new JsCore());

