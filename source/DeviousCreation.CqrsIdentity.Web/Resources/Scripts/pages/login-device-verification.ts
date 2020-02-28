import {ArrayHelpers} from '../helpers/array-helper'

export class LoginDeviceVerification {
    async init() {
        const contextThis = this;
        document.getElementById('start-verification').addEventListener('submit', (e) => contextThis.startVerification(e))
    }

    private async startVerification(e: Event) {
        e.preventDefault();
        let makeAssertionOptions;
        try {
            var res = await fetch('/api/auth-device/assertion-options', {
                method: 'POST',            
                headers: {
                    'Accept': 'application/json'
                }
            });
            makeAssertionOptions = await res.json();
        } catch (e) {
        //    showErrorAlert("Request to server failed", e);
        }
        console.log("Assertion Options Object", makeAssertionOptions);

        // show options error to user
        if (makeAssertionOptions.status !== "ok") {
            console.log("Error creating assertion options");
            console.log(makeAssertionOptions.errorMessage);
            //showErrorAlert(makeAssertionOptions.errorMessage);
            return;
        }

        // todo: switch this to coercebase64
        const challenge = makeAssertionOptions.challenge.replace(/-/g, "+").replace(/_/g, "/");
        makeAssertionOptions.challenge = Uint8Array.from(atob(challenge), c => c.charCodeAt(0));

        // fix escaping. Change this to coerce
        makeAssertionOptions.allowCredentials.forEach(function (listItem) {
            var fixedId = listItem.id.replace(/\_/g, "/").replace(/\-/g, "+");
             listItem.id = Uint8Array.from(atob(fixedId), c => c.charCodeAt(0));
         });

        console.log("Assertion options", makeAssertionOptions);

        let credential;
        try {
            credential = await navigator.credentials.get({ publicKey: makeAssertionOptions })
        } catch (err) {
            console.log(err)
            //showErrorAlert(err.message ? err.message : err);
        }

        try {
            await this.verifyAssertionWithServer(credential);
        } catch (e) {
            //showErrorAlert("Could not verify assertion", e);
        }
    }

    private async verifyAssertionWithServer(assertedCredential) {

        // Move data into Arrays incase it is super long
        let authData = new Uint8Array(assertedCredential.response.authenticatorData);
        let clientDataJSON = new Uint8Array(assertedCredential.response.clientDataJSON);
        let rawId = new Uint8Array(assertedCredential.rawId);
        let sig = new Uint8Array(assertedCredential.response.signature);
        const data = {
            id: assertedCredential.id,
            rawId: ArrayHelpers.coerceToBase64Url(rawId),
            type: assertedCredential.type,
            extensions: assertedCredential.getClientExtensionResults(),
            response: {
                authenticatorData: ArrayHelpers.coerceToBase64Url(authData),
                clientDataJson: ArrayHelpers.coerceToBase64Url(clientDataJSON),
                signature: ArrayHelpers.coerceToBase64Url(sig)
            }
        };
    
        let response;
        try {
            let res = await fetch("/api/auth-device/make-assertion", {
                method: 'POST', // or 'PUT'
                body: JSON.stringify(data), // data can be `string` or {object}!
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });
    
            response = await res.json();
        } catch (e) {
            //showErrorAlert("Request to server failed", e);
            throw e;
        }
    
        console.log("Assertion Object", response);
    
        // show error
        if (response.status !== "ok") {
            console.log("Error doing assertion");
            console.log(response.errorMessage);
            //showErrorAlert(response.errorMessage);
            return;
        }
    
        // show success message
        // await Swal.fire({
        //     title: 'Logged In!',
        //     text: 'You\'re logged in successfully.',
        //     type: 'success',
        //     timer: 2000
        // });
    
    
        // redirect to dashboard to show keys
        window.location.href = "/app/";
    }

    constructor() {
        if (document.readyState !== 'loading') {
            this.init();
        } else {
            document.addEventListener('DOMContentLoaded', e => this.init());
        }
    } 
}

let page = new LoginDeviceVerification();