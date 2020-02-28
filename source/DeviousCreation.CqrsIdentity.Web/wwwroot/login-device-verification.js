/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"login-device-verification": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push(["./Resources/Scripts/pages/login-device-verification.ts","commons"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./Resources/Scripts/pages/login-device-verification.ts":
/*!**************************************************************!*\
  !*** ./Resources/Scripts/pages/login-device-verification.ts ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var array_helper_1 = __webpack_require__(/*! ../helpers/array-helper */ "./Resources/Scripts/helpers/array-helper.ts");
var LoginDeviceVerification = /** @class */ (function () {
    function LoginDeviceVerification() {
        var _this = this;
        if (document.readyState !== 'loading') {
            this.init();
        }
        else {
            document.addEventListener('DOMContentLoaded', function (e) { return _this.init(); });
        }
    }
    LoginDeviceVerification.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            var contextThis;
            return __generator(this, function (_a) {
                contextThis = this;
                document.getElementById('start-verification').addEventListener('submit', function (e) { return contextThis.startVerification(e); });
                return [2 /*return*/];
            });
        });
    };
    LoginDeviceVerification.prototype.startVerification = function (e) {
        return __awaiter(this, void 0, void 0, function () {
            var makeAssertionOptions, res, e_1, challenge, credential, err_1, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        e.preventDefault();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, fetch('/api/auth-device/assertion-options', {
                                method: 'POST',
                                headers: {
                                    'Accept': 'application/json'
                                }
                            })];
                    case 2:
                        res = _a.sent();
                        return [4 /*yield*/, res.json()];
                    case 3:
                        makeAssertionOptions = _a.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        e_1 = _a.sent();
                        return [3 /*break*/, 5];
                    case 5:
                        console.log("Assertion Options Object", makeAssertionOptions);
                        // show options error to user
                        if (makeAssertionOptions.status !== "ok") {
                            console.log("Error creating assertion options");
                            console.log(makeAssertionOptions.errorMessage);
                            //showErrorAlert(makeAssertionOptions.errorMessage);
                            return [2 /*return*/];
                        }
                        challenge = makeAssertionOptions.challenge.replace(/-/g, "+").replace(/_/g, "/");
                        makeAssertionOptions.challenge = Uint8Array.from(atob(challenge), function (c) { return c.charCodeAt(0); });
                        // fix escaping. Change this to coerce
                        makeAssertionOptions.allowCredentials.forEach(function (listItem) {
                            var fixedId = listItem.id.replace(/\_/g, "/").replace(/\-/g, "+");
                            listItem.id = Uint8Array.from(atob(fixedId), function (c) { return c.charCodeAt(0); });
                        });
                        console.log("Assertion options", makeAssertionOptions);
                        _a.label = 6;
                    case 6:
                        _a.trys.push([6, 8, , 9]);
                        return [4 /*yield*/, navigator.credentials.get({ publicKey: makeAssertionOptions })];
                    case 7:
                        credential = _a.sent();
                        return [3 /*break*/, 9];
                    case 8:
                        err_1 = _a.sent();
                        console.log(err_1);
                        return [3 /*break*/, 9];
                    case 9:
                        _a.trys.push([9, 11, , 12]);
                        return [4 /*yield*/, this.verifyAssertionWithServer(credential)];
                    case 10:
                        _a.sent();
                        return [3 /*break*/, 12];
                    case 11:
                        e_2 = _a.sent();
                        return [3 /*break*/, 12];
                    case 12: return [2 /*return*/];
                }
            });
        });
    };
    LoginDeviceVerification.prototype.verifyAssertionWithServer = function (assertedCredential) {
        return __awaiter(this, void 0, void 0, function () {
            var authData, clientDataJSON, rawId, sig, data, response, res, e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        authData = new Uint8Array(assertedCredential.response.authenticatorData);
                        clientDataJSON = new Uint8Array(assertedCredential.response.clientDataJSON);
                        rawId = new Uint8Array(assertedCredential.rawId);
                        sig = new Uint8Array(assertedCredential.response.signature);
                        data = {
                            id: assertedCredential.id,
                            rawId: array_helper_1.ArrayHelpers.coerceToBase64Url(rawId),
                            type: assertedCredential.type,
                            extensions: assertedCredential.getClientExtensionResults(),
                            response: {
                                authenticatorData: array_helper_1.ArrayHelpers.coerceToBase64Url(authData),
                                clientDataJson: array_helper_1.ArrayHelpers.coerceToBase64Url(clientDataJSON),
                                signature: array_helper_1.ArrayHelpers.coerceToBase64Url(sig)
                            }
                        };
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, fetch("/api/auth-device/make-assertion", {
                                method: 'POST',
                                body: JSON.stringify(data),
                                headers: {
                                    'Accept': 'application/json',
                                    'Content-Type': 'application/json'
                                }
                            })];
                    case 2:
                        res = _a.sent();
                        return [4 /*yield*/, res.json()];
                    case 3:
                        response = _a.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        e_3 = _a.sent();
                        //showErrorAlert("Request to server failed", e);
                        throw e_3;
                    case 5:
                        console.log("Assertion Object", response);
                        // show error
                        if (response.status !== "ok") {
                            console.log("Error doing assertion");
                            console.log(response.errorMessage);
                            //showErrorAlert(response.errorMessage);
                            return [2 /*return*/];
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
                        return [2 /*return*/];
                }
            });
        });
    };
    return LoginDeviceVerification;
}());
exports.LoginDeviceVerification = LoginDeviceVerification;
var page = new LoginDeviceVerification();


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vUmVzb3VyY2VzL1NjcmlwdHMvcGFnZXMvbG9naW4tZGV2aWNlLXZlcmlmaWNhdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSxRQUFRLG9CQUFvQjtRQUM1QjtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLGlCQUFpQiw0QkFBNEI7UUFDN0M7UUFDQTtRQUNBLGtCQUFrQiwyQkFBMkI7UUFDN0M7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFlO1FBQ2hEO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLHNE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LEVBQUU7b0NBQ0wsUUFBUSxFQUFFLGtCQUFrQjtvQ0FDNUIsY0FBYyxFQUFFLGtCQUFrQjtpQ0FDckM7NkJBQ0osQ0FBQzs7d0JBUEUsR0FBRyxHQUFHLFNBT1I7d0JBRVMscUJBQU0sR0FBRyxDQUFDLElBQUksRUFBRTs7d0JBQTNCLFFBQVEsR0FBRyxTQUFnQixDQUFDOzs7O3dCQUU1QixnREFBZ0Q7d0JBQ2hELE1BQU0sR0FBQyxDQUFDOzt3QkFHWixPQUFPLENBQUMsR0FBRyxDQUFDLGtCQUFrQixFQUFFLFFBQVEsQ0FBQyxDQUFDO3dCQUUxQyxhQUFhO3dCQUNiLElBQUksUUFBUSxDQUFDLE1BQU0sS0FBSyxJQUFJLEVBQUU7NEJBQzFCLE9BQU8sQ0FBQyxHQUFHLENBQUMsdUJBQXVCLENBQUMsQ0FBQzs0QkFDckMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLENBQUM7NEJBQ25DLHdDQUF3Qzs0QkFDeEMsc0JBQU87eUJBQ1Y7d0JBRUQsdUJBQXVCO3dCQUN2QixvQkFBb0I7d0JBQ3BCLDJCQUEyQjt3QkFDM0IsK0NBQStDO3dCQUMvQyx1QkFBdUI7d0JBQ3ZCLGtCQUFrQjt3QkFDbEIsTUFBTTt3QkFHTixxQ0FBcUM7d0JBQ3JDLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQzs7Ozs7S0FDbEM7SUFTTCw4QkFBQztBQUFELENBQUM7QUEzSFksMERBQXVCO0FBNkhwQyxJQUFJLElBQUksR0FBRyxJQUFJLHVCQUF1QixFQUFFLENBQUMiLCJmaWxlIjoibG9naW4tZGV2aWNlLXZlcmlmaWNhdGlvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIGluc3RhbGwgYSBKU09OUCBjYWxsYmFjayBmb3IgY2h1bmsgbG9hZGluZ1xuIFx0ZnVuY3Rpb24gd2VicGFja0pzb25wQ2FsbGJhY2soZGF0YSkge1xuIFx0XHR2YXIgY2h1bmtJZHMgPSBkYXRhWzBdO1xuIFx0XHR2YXIgbW9yZU1vZHVsZXMgPSBkYXRhWzFdO1xuIFx0XHR2YXIgZXhlY3V0ZU1vZHVsZXMgPSBkYXRhWzJdO1xuXG4gXHRcdC8vIGFkZCBcIm1vcmVNb2R1bGVzXCIgdG8gdGhlIG1vZHVsZXMgb2JqZWN0LFxuIFx0XHQvLyB0aGVuIGZsYWcgYWxsIFwiY2h1bmtJZHNcIiBhcyBsb2FkZWQgYW5kIGZpcmUgY2FsbGJhY2tcbiBcdFx0dmFyIG1vZHVsZUlkLCBjaHVua0lkLCBpID0gMCwgcmVzb2x2ZXMgPSBbXTtcbiBcdFx0Zm9yKDtpIDwgY2h1bmtJZHMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRjaHVua0lkID0gY2h1bmtJZHNbaV07XG4gXHRcdFx0aWYoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGluc3RhbGxlZENodW5rcywgY2h1bmtJZCkgJiYgaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdKSB7XG4gXHRcdFx0XHRyZXNvbHZlcy5wdXNoKGluc3RhbGxlZENodW5rc1tjaHVua0lkXVswXSk7XG4gXHRcdFx0fVxuIFx0XHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IDA7XG4gXHRcdH1cbiBcdFx0Zm9yKG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG4gXHRcdFx0aWYoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcbiBcdFx0XHRcdG1vZHVsZXNbbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdH1cbiBcdFx0fVxuIFx0XHRpZihwYXJlbnRKc29ucEZ1bmN0aW9uKSBwYXJlbnRKc29ucEZ1bmN0aW9uKGRhdGEpO1xuXG4gXHRcdHdoaWxlKHJlc29sdmVzLmxlbmd0aCkge1xuIFx0XHRcdHJlc29sdmVzLnNoaWZ0KCkoKTtcbiBcdFx0fVxuXG4gXHRcdC8vIGFkZCBlbnRyeSBtb2R1bGVzIGZyb20gbG9hZGVkIGNodW5rIHRvIGRlZmVycmVkIGxpc3RcbiBcdFx0ZGVmZXJyZWRNb2R1bGVzLnB1c2guYXBwbHkoZGVmZXJyZWRNb2R1bGVzLCBleGVjdXRlTW9kdWxlcyB8fCBbXSk7XG5cbiBcdFx0Ly8gcnVuIGRlZmVycmVkIG1vZHVsZXMgd2hlbiBhbGwgY2h1bmtzIHJlYWR5XG4gXHRcdHJldHVybiBjaGVja0RlZmVycmVkTW9kdWxlcygpO1xuIFx0fTtcbiBcdGZ1bmN0aW9uIGNoZWNrRGVmZXJyZWRNb2R1bGVzKCkge1xuIFx0XHR2YXIgcmVzdWx0O1xuIFx0XHRmb3IodmFyIGkgPSAwOyBpIDwgZGVmZXJyZWRNb2R1bGVzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0dmFyIGRlZmVycmVkTW9kdWxlID0gZGVmZXJyZWRNb2R1bGVzW2ldO1xuIFx0XHRcdHZhciBmdWxmaWxsZWQgPSB0cnVlO1xuIFx0XHRcdGZvcih2YXIgaiA9IDE7IGogPCBkZWZlcnJlZE1vZHVsZS5sZW5ndGg7IGorKykge1xuIFx0XHRcdFx0dmFyIGRlcElkID0gZGVmZXJyZWRNb2R1bGVbal07XG4gXHRcdFx0XHRpZihpbnN0YWxsZWRDaHVua3NbZGVwSWRdICE9PSAwKSBmdWxmaWxsZWQgPSBmYWxzZTtcbiBcdFx0XHR9XG4gXHRcdFx0aWYoZnVsZmlsbGVkKSB7XG4gXHRcdFx0XHRkZWZlcnJlZE1vZHVsZXMuc3BsaWNlKGktLSwgMSk7XG4gXHRcdFx0XHRyZXN1bHQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IGRlZmVycmVkTW9kdWxlWzBdKTtcbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHRyZXR1cm4gcmVzdWx0O1xuIFx0fVxuXG4gXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIGNodW5rc1xuIFx0Ly8gdW5kZWZpbmVkID0gY2h1bmsgbm90IGxvYWRlZCwgbnVsbCA9IGNodW5rIHByZWxvYWRlZC9wcmVmZXRjaGVkXG4gXHQvLyBQcm9taXNlID0gY2h1bmsgbG9hZGluZywgMCA9IGNodW5rIGxvYWRlZFxuIFx0dmFyIGluc3RhbGxlZENodW5rcyA9IHtcbiBcdFx0XCJsb2dpbi1kZXZpY2UtdmVyaWZpY2F0aW9uXCI6IDBcbiBcdH07XG5cbiBcdHZhciBkZWZlcnJlZE1vZHVsZXMgPSBbXTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0dmFyIGpzb25wQXJyYXkgPSB3aW5kb3dbXCJ3ZWJwYWNrSnNvbnBcIl0gPSB3aW5kb3dbXCJ3ZWJwYWNrSnNvbnBcIl0gfHwgW107XG4gXHR2YXIgb2xkSnNvbnBGdW5jdGlvbiA9IGpzb25wQXJyYXkucHVzaC5iaW5kKGpzb25wQXJyYXkpO1xuIFx0anNvbnBBcnJheS5wdXNoID0gd2VicGFja0pzb25wQ2FsbGJhY2s7XG4gXHRqc29ucEFycmF5ID0ganNvbnBBcnJheS5zbGljZSgpO1xuIFx0Zm9yKHZhciBpID0gMDsgaSA8IGpzb25wQXJyYXkubGVuZ3RoOyBpKyspIHdlYnBhY2tKc29ucENhbGxiYWNrKGpzb25wQXJyYXlbaV0pO1xuIFx0dmFyIHBhcmVudEpzb25wRnVuY3Rpb24gPSBvbGRKc29ucEZ1bmN0aW9uO1xuXG5cbiBcdC8vIGFkZCBlbnRyeSBtb2R1bGUgdG8gZGVmZXJyZWQgbGlzdFxuIFx0ZGVmZXJyZWRNb2R1bGVzLnB1c2goW1wiLi9SZXNvdXJjZXMvU2NyaXB0cy9wYWdlcy9sb2dpbi1kZXZpY2UtdmVyaWZpY2F0aW9uLnRzXCIsXCJjb21tb25zXCJdKTtcbiBcdC8vIHJ1biBkZWZlcnJlZCBtb2R1bGVzIHdoZW4gcmVhZHlcbiBcdHJldHVybiBjaGVja0RlZmVycmVkTW9kdWxlcygpO1xuIiwiaW1wb3J0IHtBcnJheUhlbHBlcnN9IGZyb20gJy4uL2hlbHBlcnMvYXJyYXktaGVscGVyJ1xyXG5cclxuZXhwb3J0IGNsYXNzIExvZ2luRGV2aWNlVmVyaWZpY2F0aW9uIHtcclxuICAgIGFzeW5jIGluaXQoKSB7XHJcbiAgICAgICAgY29uc3QgY29udGV4dFRoaXMgPSB0aGlzO1xyXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdGFydC12ZXJpZmljYXRpb24nKS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCAoZSkgPT4gY29udGV4dFRoaXMuc3RhcnRWZXJpZmljYXRpb24oZSkpXHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBhc3luYyBzdGFydFZlcmlmaWNhdGlvbihlOiBFdmVudCkge1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICBsZXQgbWFrZUFzc2VydGlvbk9wdGlvbnM7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgdmFyIHJlcyA9IGF3YWl0IGZldGNoKCcvYXBpL2F1dGgtZGV2aWNlL2Fzc2VydGlvbi1vcHRpb25zJywge1xyXG4gICAgICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgJ0FjY2VwdCc6ICdhcHBsaWNhdGlvbi9qc29uJ1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgbWFrZUFzc2VydGlvbk9wdGlvbnMgPSBhd2FpdCByZXMuanNvbigpO1xyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAvLyAgICBzaG93RXJyb3JBbGVydChcIlJlcXVlc3QgdG8gc2VydmVyIGZhaWxlZFwiLCBlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJBc3NlcnRpb24gT3B0aW9ucyBPYmplY3RcIiwgbWFrZUFzc2VydGlvbk9wdGlvbnMpO1xyXG5cclxuICAgICAgICAvLyBzaG93IG9wdGlvbnMgZXJyb3IgdG8gdXNlclxyXG4gICAgICAgIGlmIChtYWtlQXNzZXJ0aW9uT3B0aW9ucy5zdGF0dXMgIT09IFwib2tcIikge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yIGNyZWF0aW5nIGFzc2VydGlvbiBvcHRpb25zXCIpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhtYWtlQXNzZXJ0aW9uT3B0aW9ucy5lcnJvck1lc3NhZ2UpO1xyXG4gICAgICAgICAgICAvL3Nob3dFcnJvckFsZXJ0KG1ha2VBc3NlcnRpb25PcHRpb25zLmVycm9yTWVzc2FnZSk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIHRvZG86IHN3aXRjaCB0aGlzIHRvIGNvZXJjZWJhc2U2NFxyXG4gICAgICAgIGNvbnN0IGNoYWxsZW5nZSA9IG1ha2VBc3NlcnRpb25PcHRpb25zLmNoYWxsZW5nZS5yZXBsYWNlKC8tL2csIFwiK1wiKS5yZXBsYWNlKC9fL2csIFwiL1wiKTtcclxuICAgICAgICBtYWtlQXNzZXJ0aW9uT3B0aW9ucy5jaGFsbGVuZ2UgPSBVaW50OEFycmF5LmZyb20oYXRvYihjaGFsbGVuZ2UpLCBjID0+IGMuY2hhckNvZGVBdCgwKSk7XHJcblxyXG4gICAgICAgIC8vIGZpeCBlc2NhcGluZy4gQ2hhbmdlIHRoaXMgdG8gY29lcmNlXHJcbiAgICAgICAgbWFrZUFzc2VydGlvbk9wdGlvbnMuYWxsb3dDcmVkZW50aWFscy5mb3JFYWNoKGZ1bmN0aW9uIChsaXN0SXRlbSkge1xyXG4gICAgICAgICAgICB2YXIgZml4ZWRJZCA9IGxpc3RJdGVtLmlkLnJlcGxhY2UoL1xcXy9nLCBcIi9cIikucmVwbGFjZSgvXFwtL2csIFwiK1wiKTtcclxuICAgICAgICAgICAgIGxpc3RJdGVtLmlkID0gVWludDhBcnJheS5mcm9tKGF0b2IoZml4ZWRJZCksIGMgPT4gYy5jaGFyQ29kZUF0KDApKTtcclxuICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiQXNzZXJ0aW9uIG9wdGlvbnNcIiwgbWFrZUFzc2VydGlvbk9wdGlvbnMpO1xyXG5cclxuICAgICAgICBsZXQgY3JlZGVudGlhbDtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBjcmVkZW50aWFsID0gYXdhaXQgbmF2aWdhdG9yLmNyZWRlbnRpYWxzLmdldCh7IHB1YmxpY0tleTogbWFrZUFzc2VydGlvbk9wdGlvbnMgfSlcclxuICAgICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKVxyXG4gICAgICAgICAgICAvL3Nob3dFcnJvckFsZXJ0KGVyci5tZXNzYWdlID8gZXJyLm1lc3NhZ2UgOiBlcnIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgYXdhaXQgdGhpcy52ZXJpZnlBc3NlcnRpb25XaXRoU2VydmVyKGNyZWRlbnRpYWwpO1xyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgLy9zaG93RXJyb3JBbGVydChcIkNvdWxkIG5vdCB2ZXJpZnkgYXNzZXJ0aW9uXCIsIGUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGFzeW5jIHZlcmlmeUFzc2VydGlvbldpdGhTZXJ2ZXIoYXNzZXJ0ZWRDcmVkZW50aWFsKSB7XHJcblxyXG4gICAgICAgIC8vIE1vdmUgZGF0YSBpbnRvIEFycmF5cyBpbmNhc2UgaXQgaXMgc3VwZXIgbG9uZ1xyXG4gICAgICAgIGxldCBhdXRoRGF0YSA9IG5ldyBVaW50OEFycmF5KGFzc2VydGVkQ3JlZGVudGlhbC5yZXNwb25zZS5hdXRoZW50aWNhdG9yRGF0YSk7XHJcbiAgICAgICAgbGV0IGNsaWVudERhdGFKU09OID0gbmV3IFVpbnQ4QXJyYXkoYXNzZXJ0ZWRDcmVkZW50aWFsLnJlc3BvbnNlLmNsaWVudERhdGFKU09OKTtcclxuICAgICAgICBsZXQgcmF3SWQgPSBuZXcgVWludDhBcnJheShhc3NlcnRlZENyZWRlbnRpYWwucmF3SWQpO1xyXG4gICAgICAgIGxldCBzaWcgPSBuZXcgVWludDhBcnJheShhc3NlcnRlZENyZWRlbnRpYWwucmVzcG9uc2Uuc2lnbmF0dXJlKTtcclxuICAgICAgICBjb25zdCBkYXRhID0ge1xyXG4gICAgICAgICAgICBpZDogYXNzZXJ0ZWRDcmVkZW50aWFsLmlkLFxyXG4gICAgICAgICAgICByYXdJZDogQXJyYXlIZWxwZXJzLmNvZXJjZVRvQmFzZTY0VXJsKHJhd0lkKSxcclxuICAgICAgICAgICAgdHlwZTogYXNzZXJ0ZWRDcmVkZW50aWFsLnR5cGUsXHJcbiAgICAgICAgICAgIGV4dGVuc2lvbnM6IGFzc2VydGVkQ3JlZGVudGlhbC5nZXRDbGllbnRFeHRlbnNpb25SZXN1bHRzKCksXHJcbiAgICAgICAgICAgIHJlc3BvbnNlOiB7XHJcbiAgICAgICAgICAgICAgICBhdXRoZW50aWNhdG9yRGF0YTogQXJyYXlIZWxwZXJzLmNvZXJjZVRvQmFzZTY0VXJsKGF1dGhEYXRhKSxcclxuICAgICAgICAgICAgICAgIGNsaWVudERhdGFKc29uOiBBcnJheUhlbHBlcnMuY29lcmNlVG9CYXNlNjRVcmwoY2xpZW50RGF0YUpTT04pLFxyXG4gICAgICAgICAgICAgICAgc2lnbmF0dXJlOiBBcnJheUhlbHBlcnMuY29lcmNlVG9CYXNlNjRVcmwoc2lnKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgIFxyXG4gICAgICAgIGxldCByZXNwb25zZTtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBsZXQgcmVzID0gYXdhaXQgZmV0Y2goXCIvYXBpL2F1dGgtZGV2aWNlL21ha2UtYXNzZXJ0aW9uXCIsIHtcclxuICAgICAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLCAvLyBvciAnUFVUJ1xyXG4gICAgICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoZGF0YSksIC8vIGRhdGEgY2FuIGJlIGBzdHJpbmdgIG9yIHtvYmplY3R9IVxyXG4gICAgICAgICAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAgICAgICAgICdBY2NlcHQnOiAnYXBwbGljYXRpb24vanNvbicsXHJcbiAgICAgICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgIFxyXG4gICAgICAgICAgICByZXNwb25zZSA9IGF3YWl0IHJlcy5qc29uKCk7XHJcbiAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICAvL3Nob3dFcnJvckFsZXJ0KFwiUmVxdWVzdCB0byBzZXJ2ZXIgZmFpbGVkXCIsIGUpO1xyXG4gICAgICAgICAgICB0aHJvdyBlO1xyXG4gICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiQXNzZXJ0aW9uIE9iamVjdFwiLCByZXNwb25zZSk7XHJcbiAgICBcclxuICAgICAgICAvLyBzaG93IGVycm9yXHJcbiAgICAgICAgaWYgKHJlc3BvbnNlLnN0YXR1cyAhPT0gXCJva1wiKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3IgZG9pbmcgYXNzZXJ0aW9uXCIpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhyZXNwb25zZS5lcnJvck1lc3NhZ2UpO1xyXG4gICAgICAgICAgICAvL3Nob3dFcnJvckFsZXJ0KHJlc3BvbnNlLmVycm9yTWVzc2FnZSk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICAvLyBzaG93IHN1Y2Nlc3MgbWVzc2FnZVxyXG4gICAgICAgIC8vIGF3YWl0IFN3YWwuZmlyZSh7XHJcbiAgICAgICAgLy8gICAgIHRpdGxlOiAnTG9nZ2VkIEluIScsXHJcbiAgICAgICAgLy8gICAgIHRleHQ6ICdZb3VcXCdyZSBsb2dnZWQgaW4gc3VjY2Vzc2Z1bGx5LicsXHJcbiAgICAgICAgLy8gICAgIHR5cGU6ICdzdWNjZXNzJyxcclxuICAgICAgICAvLyAgICAgdGltZXI6IDIwMDBcclxuICAgICAgICAvLyB9KTtcclxuICAgIFxyXG4gICAgXHJcbiAgICAgICAgLy8gcmVkaXJlY3QgdG8gZGFzaGJvYXJkIHRvIHNob3cga2V5c1xyXG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gXCIvYXBwL1wiO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIGlmIChkb2N1bWVudC5yZWFkeVN0YXRlICE9PSAnbG9hZGluZycpIHtcclxuICAgICAgICAgICAgdGhpcy5pbml0KCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGUgPT4gdGhpcy5pbml0KCkpO1xyXG4gICAgICAgIH1cclxuICAgIH0gXHJcbn1cclxuXHJcbmxldCBwYWdlID0gbmV3IExvZ2luRGV2aWNlVmVyaWZpY2F0aW9uKCk7Il0sInNvdXJjZVJvb3QiOiIifQ==