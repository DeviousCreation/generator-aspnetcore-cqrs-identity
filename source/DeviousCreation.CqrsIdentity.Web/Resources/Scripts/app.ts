import { Validator } from './services/validator';
import { AppInsights } from 'applicationinsights-js';
import Swal  from 'sweetalert2'
import 'bootstrap'
import 'metismenu'

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
        this.publishPageNotifications();
        this.setupPostableAnchors();
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

            $('#sidebarnav').metisMenu();
            
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

    private publishPageNotifications() {
        var pageNotifications = document.querySelectorAll('span[data-page-notification]');
        if (pageNotifications.length) {
            pageNotifications.forEach((value) => {
                var pageNotification = value as HTMLSpanElement;
                Swal.fire({
                    titleText: pageNotification.dataset.title,
                    text: pageNotification.dataset.message,
                    toast: true,
                    position: "top-end",
                    timer: 4500,
                    showConfirmButton: false
                });
            }, this)
        }
    }

    private setupPostableAnchors() {
        const anchors = document.querySelectorAll('a[data-postable]');
        if (anchors && anchors.length) {
            anchors.forEach((anchor: HTMLAnchorElement) => {
                anchor.addEventListener('click', (e) => {
                    e.preventDefault();
                    var target = e.currentTarget as HTMLAnchorElement;
                    var myForm = document.createElement("form");
                    var requestVerificationToken = document.createElement('input') as HTMLInputElement
                    requestVerificationToken.name = '__RequestVerificationToken';
                    requestVerificationToken.value = target.dataset.postable;
                    requestVerificationToken.type = 'hidden';
                    myForm.appendChild(requestVerificationToken)
                    myForm.action=target.href;// the href of the link
                    //myForm.target="myFrame";
                    myForm.method="POST";
                    document.body.appendChild(myForm);
                    myForm.submit();
                    return false; // cancel the actual link
                })
            })
        }
    }
}

let app = new App();