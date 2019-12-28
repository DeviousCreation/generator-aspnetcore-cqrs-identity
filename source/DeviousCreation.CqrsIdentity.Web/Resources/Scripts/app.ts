import { Validator } from './services/validator';
import { AppInsights } from 'applicationinsights-js';

class App {

    private header: HTMLElement;
    private pageWrapper: HTMLElement;
     
    constructor() {
        if (document.readyState !== 'loading') {
            this.init();
        } else {
            document.addEventListener('DOMContentLoaded', e => this.init());
        }
    }
    init(): void {

        this.header = document.querySelector('header.topbar');
        this.pageWrapper = document.querySelector(".page-wrapper");

        this.setupAppInsights();
        this.setupNavbar();
    }

    private setupAppInsights(): void {
        var appInsightsKey = document.body.dataset['appInsightsKey'];

        if (appInsightsKey && AppInsights && AppInsights.downloadAndSetup && AppInsights.trackPageView) {
            AppInsights.downloadAndSetup({ instrumentationKey: appInsightsKey });
            AppInsights.trackPageView();
        }        
        const forms = document.querySelectorAll('form:not([data-no-auto-validation])');
        Array.prototype.forEach.call(forms, (form: any) => {
            const v = new Validator(form);
        });
    }

    private setupNavbar():void {
        const contextThis = this;
        
        if (this.header) {
            window.addEventListener('resize', () => contextThis.windowResizeListener())
            
            document.querySelector('.nav-toggler').addEventListener('click', () => {
                document.body.classList.toggle('show-sidebar');
                document.querySelector('.nav-toggler i').classList.toggle('ti-menu');
                document.querySelector('.nav-toggler i').classList.add("ti-close");
            })

            this.windowResizeListener();
            
        }
    }

    private windowResizeListener(): void {
        
        var width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
        var topOffset = 70;

        if (width < 1170) {
            document.body.classList.add('mini-sidebar')
            document.querySelector('.navbar-brand span').classList.add('d-none');
            document.querySelector(".scroll-sidebar, .slimScrollDiv").classList.add('overflow-auto')
            document.querySelector(".scroll-sidebar, .slimScrollDiv").parentElement.classList.add('overflow-hidden');
        } else {
            document.body.classList.remove('mini-sidebar');
            document.querySelector('.navbar-brand span').classList.remove('d-none');
        }

        var height = ((window.innerHeight > 0) ? window.innerHeight : screen.height) - 1;
        height = height - topOffset;
        if (height < 1) height = 1;
        if (height > topOffset) {
            this.pageWrapper.style.minHeight = `$(height)px`;
        }
        const headerHeight: number = this.header.clientHeight;
        this.pageWrapper.style.paddingTop =  headerHeight + 'px';
        
    }
}

let app = new App();