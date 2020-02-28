export class MfaSelection {
    constructor() {
        if (document.readyState !== 'loading') {
            this.init();
        } else {
            document.addEventListener('DOMContentLoaded', e => this.init());
        }
    }
    init(): void {
        var triggers = document.querySelectorAll('[data-trigger]');
        if (triggers && triggers.length) {
            triggers.forEach((value:HTMLElement) =>{
                value.addEventListener('click',(e:Event) => {
                    e.preventDefault();
                    const elementToTrigger = document.getElementById(value.dataset.trigger);
                    if(elementToTrigger) {
                        elementToTrigger.click();
                    }
                });                                
            }, this);
        }
    }
}

new MfaSelection();