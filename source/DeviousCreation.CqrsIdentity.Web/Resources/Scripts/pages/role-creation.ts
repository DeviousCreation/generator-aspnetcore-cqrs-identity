import * as $ from 'jquery'
import { Validator } from '../services/validator';
import 'gijgo'


export class RoleCreation {
    private tree: Types.Tree;
    private form: HTMLFormElement;
    private validator: Validator
    constructor() {
        if (document.readyState !== 'loading') {
            this.init();
        } else {
            document.addEventListener('DOMContentLoaded', e => this.init());
        }
    }

    init() {
        const contextThis = this;
        this.tree = $('#tree').tree({
            uiLibrary: 'bootstrap4',
            dataSource: '/api/resources/list-for-current-user',
            primaryKey: 'id',
            childrenField: 'simpleResources',
            textField: 'name',
            checkboxes: true,        
        });

        
         this.form = document.querySelector('form#role-create') as HTMLFormElement;
         this.validator = new Validator(this.form, false)
        
         this.form.addEventListener('submit', (e) => { contextThis.formSubmit(e); });        
    }

     private formSubmit(event: Event): void {
         
         if (!this.validator.validate()) {
            this.tree.find('input[type=checkbox]:checked').each((index, value) => {
                var checkbox = $(value)
                checkbox.attr('name', 'pagemodel.roles')

                var parentLi = checkbox.closest('li');
                checkbox.val(parentLi.data('id'))
    
            })
         } else {
            event.preventDefault();
         }
         console.log(this.tree.getCheckedNodes());
     }

    private treeOnDataBound(e: Event){
        this.tree.find('input[type=checkbox]').each((index, value) => {
            var checkbox = $(value)
            checkbox.attr('name', 'roles')

        })
    }
}

new RoleCreation();