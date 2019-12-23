import * as $ from 'jquery'
import 'datatables.net'
import 'datatables.net-bs4'

import {DataTablesODataProvider} from '../services/datatables-odata-provider'

export class UsersList {
    constructor() {
        if (document.readyState !== 'loading') {
            this.init();
        } else {
            document.addEventListener('DOMContentLoaded', e => this.init());
        }
    }

    init() {
        $('#users').DataTable({
            processing: true,
            serverSide: true,
            ajax: DataTablesODataProvider.providerFunction('/odata/user'),
            columns: [
                { data: "Id" }                
            ],
        });
    }

}

new UsersList();