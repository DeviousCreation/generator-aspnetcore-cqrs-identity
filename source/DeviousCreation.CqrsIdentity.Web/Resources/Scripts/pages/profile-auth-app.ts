export class ProfileAuthApp {

    constructor() {
        if (document.readyState !== 'loading') {
            this.init();
        } else {
            document.addEventListener('DOMContentLoaded', e => this.init());
        }
    }
    init(): void {
        var ele = document.getElementById('qrCode');
    }
}

let page = new ProfileAuthApp();