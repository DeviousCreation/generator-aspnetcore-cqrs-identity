import * as validate from 'validate.js';
import { stringify } from 'querystring';

export class Validator {
    private form: HTMLFormElement;
    private formSubmitted:boolean
    private elements: Element[];
    private constraints: any;
    private hasValidated: boolean = false;

    constructor(formQuery: string | HTMLFormElement | JQuery, validateOnSubmit: boolean = true) {
        const contextThis = this;
        if (formQuery.isPrototypeOf(String)) {
            this.form = document.querySelector(formQuery as string) as HTMLFormElement;
        } else if (formQuery instanceof  jQuery && formQuery.length) {
            this.form = formQuery[0] as HTMLFormElement;
        } else {
            this.form = formQuery as HTMLFormElement;
        }
        if (!this.form)
            return;

        if (this.form.dataset['noValidate'])
            return;

        this.constraints = {};
        this.elements = [];
        var els = this.form.querySelectorAll('input:not([type="hidden"]):not([data-val="false"]), textarea:not([data-val="false"])');
        Array.prototype.forEach.call(els,
            (element: HTMLInputElement) => {
                let needsValidation: boolean = false;
                var elementId = element.id;
                if (elementId) {
                    elementId = elementId.replace('.', '_');
                    contextThis.constraints[elementId] = {};
                for (let i in element.dataset) {
                    switch (i) {
                    case 'valRequired':
                        needsValidation = true;
                        contextThis.constraints[elementId].presence = {
                            message: `^${element.dataset[i]}`
                        };

                        break;
                    case 'valEmail':
                        needsValidation = true;
                        contextThis.constraints[elementId].email = {
                            message: `^${element.dataset[i]}`
                        };
                        break;
                    case 'valMinlength':
                        needsValidation = true;
                        contextThis.constraints[elementId].length = {
                            tooShort: `^${element.dataset[i]}`,
                            minimum: parseInt(element.dataset['valMinlengthMin'])
                        };
                        break;
                    case 'valEqualto':
                        needsValidation = true;
                        if (element.dataset['valEqualtoOther'].charAt(0) === '*') {
                            const searchTerm = element.dataset['valEqualtoOther'].replace('*.', '.');
                            element.dataset['valEqualtoOther'] = document.querySelector('[name*="' + searchTerm + '"]').id
                        }
                        contextThis.constraints[elementId].equality = {
                            message: `^${element.dataset[i]}`,
                            attribute: element.dataset['valEqualtoOther'],
                            comparator: (v1: any, v2: any) => {
                                return JSON.stringify(v1) === JSON.stringify(v2);
                            }
                        };
                        break;
                    case 'valRegex':
                        needsValidation = true;
                        contextThis.constraints[elementId].format = {
                            message: `^${element.dataset[i]}`,
                            pattern: element.dataset['valRegexPattern'],
                            flags: 'i'
                        };
                        break;
                    }

                }
                if (needsValidation) {
                    element.addEventListener('blur', (e) => { contextThis.elementChange(e); });
                    element.addEventListener('change', (e) => { contextThis.elementChange(e); });
                    this.elements.push(element);
                }
            }
                
        });
        if(validateOnSubmit) {
            this.form.addEventListener('submit', (e) => { contextThis.formSubmit(e); });
        }
        this.formSubmitted = false;
    }

    private elementChange(event: Event): void {
        if (this.hasValidated) {
            this.performValidation();
        }
    }

    public validate(): boolean {
        this.hasValidated = true;
        return this.performValidation();
    }

    private formSubmit(event: Event): void {
        if (this.form.dataset['noValidate'])
            return;

        this.hasValidated = true;

        if (this.performValidation()) {
            event.preventDefault();
            return;
        }
        if (this.formSubmitted) {
            event.preventDefault();
        }
        this.formSubmitted = true;
    }

    private performValidation(): any {
        const formValues = JSON.parse(JSON.stringify(validate.collectFormValues(this.form)).replace(/\\\\\\\\\./g, '_'));
        const validationResult = validate(formValues, this.constraints);
        const contextThis = this;
        Array.prototype.forEach.call(this.elements,
            (element: HTMLInputElement) => {
                contextThis.decorateElement(element, validationResult);
            });
        return validationResult;
    }

    private decorateElement(element: HTMLInputElement, validationResult: any) {
        const group = element.closest('.form-group');
        group.classList.remove('has-success');
        group.classList.remove('has-error');
        var elementId = element.id
        if (elementId) {
            elementId = elementId.replace('.', '_');
            const helpblock = group.querySelector(`span[data-valmsg-for]`);
            helpblock.innerHTML = '';
            if (validationResult) {
                const item = validationResult[elementId];
                if (item) {
                    group.classList.add('has-error');
                    helpblock.innerHTML = item[0];
                } else {
                    group.classList.add('has-success');
                }
            } else {
                group.classList.add('has-success');
            }
        }
        
        
        
    }    
}