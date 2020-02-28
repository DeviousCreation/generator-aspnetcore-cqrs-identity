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
/******/ 		"app": 0
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
/******/ 	deferredModules.push([0,"commons","vendors"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./Resources/Scripts/app.ts":
/*!**********************************!*\
  !*** ./Resources/Scripts/app.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function($) {
Object.defineProperty(exports, "__esModule", { value: true });
var validator_1 = __webpack_require__(/*! ./services/validator */ "./Resources/Scripts/services/validator.ts");
var applicationinsights_js_1 = __webpack_require__(/*! applicationinsights-js */ "./node_modules/applicationinsights-js/bundle/ai.module.js");
var sweetalert2_1 = __webpack_require__(/*! sweetalert2 */ "./node_modules/sweetalert2/dist/sweetalert2.all.js");
__webpack_require__(/*! bootstrap */ "./node_modules/bootstrap/dist/js/bootstrap.js");
__webpack_require__(/*! metismenu */ "./node_modules/metismenu/dist/metisMenu.js");
var App = /** @class */ (function () {
    function App() {
        var _this = this;
        if (document.readyState !== 'loading') {
            this.init();
        }
        else {
            document.addEventListener('DOMContentLoaded', function (e) { return _this.init(); });
        }
    }
    App.prototype.init = function () {
        this.header = document.querySelector('header.topbar');
        this.pageWrapper = document.querySelector(".page-wrapper");
        this.setupAppInsights();
        this.setupNavbar();
        this.publishPageNotifications();
        this.setupPostableAnchors();
    };
    App.prototype.setupAppInsights = function () {
        var appInsightsKey = document.body.dataset['appInsightsKey'];
        if (appInsightsKey && applicationinsights_js_1.AppInsights && applicationinsights_js_1.AppInsights.downloadAndSetup && applicationinsights_js_1.AppInsights.trackPageView) {
            applicationinsights_js_1.AppInsights.downloadAndSetup({ instrumentationKey: appInsightsKey });
            applicationinsights_js_1.AppInsights.trackPageView();
        }
        var forms = document.querySelectorAll('form:not([data-no-auto-validation])');
        Array.prototype.forEach.call(forms, function (form) {
            var v = new validator_1.Validator(form);
        });
    };
    App.prototype.setupNavbar = function () {
        var contextThis = this;
        if (this.header) {
            window.addEventListener('resize', function () { return contextThis.windowResizeListener(); });
            document.querySelector('.nav-toggler').addEventListener('click', function () {
                document.body.classList.toggle('show-sidebar');
                document.querySelector('.nav-toggler i').classList.toggle('ti-menu');
                document.querySelector('.nav-toggler i').classList.add("ti-close");
            });
            this.windowResizeListener();
            $('#sidebarnav').metisMenu();
        }
    };
    App.prototype.windowResizeListener = function () {
        var width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
        var topOffset = 70;
        if (width < 1170) {
            document.body.classList.add('mini-sidebar');
            document.querySelector('.navbar-brand span').classList.add('d-none');
            document.querySelector(".scroll-sidebar, .slimScrollDiv").classList.add('overflow-auto');
            document.querySelector(".scroll-sidebar, .slimScrollDiv").parentElement.classList.add('overflow-hidden');
        }
        else {
            document.body.classList.remove('mini-sidebar');
            document.querySelector('.navbar-brand span').classList.remove('d-none');
        }
        var height = ((window.innerHeight > 0) ? window.innerHeight : screen.height) - 1;
        height = height - topOffset;
        if (height < 1)
            height = 1;
        if (height > topOffset) {
            this.pageWrapper.style.minHeight = "$(height)px";
        }
        var headerHeight = this.header.clientHeight;
        this.pageWrapper.style.paddingTop = headerHeight + 'px';
    };
    App.prototype.publishPageNotifications = function () {
        var pageNotifications = document.querySelectorAll('span[data-page-notification]');
        if (pageNotifications.length) {
            pageNotifications.forEach(function (value) {
                var pageNotification = value;
                sweetalert2_1.default.fire({
                    titleText: pageNotification.dataset.title,
                    text: pageNotification.dataset.message,
                    toast: true,
                    position: "top-end",
                    timer: 4500,
                    showConfirmButton: false
                });
            }, this);
        }
    };
    App.prototype.setupPostableAnchors = function () {
        var anchors = document.querySelectorAll('a[data-postable]');
        if (anchors && anchors.length) {
            anchors.forEach(function (anchor) {
                anchor.addEventListener('click', function (e) {
                    e.preventDefault();
                    var target = e.currentTarget;
                    var myForm = document.createElement("form");
                    var requestVerificationToken = document.createElement('input');
                    requestVerificationToken.name = '__RequestVerificationToken';
                    requestVerificationToken.value = target.dataset.postable;
                    requestVerificationToken.type = 'hidden';
                    myForm.appendChild(requestVerificationToken);
                    myForm.action = target.href; // the href of the link
                    //myForm.target="myFrame";
                    myForm.method = "POST";
                    document.body.appendChild(myForm);
                    myForm.submit();
                    return false; // cancel the actual link
                });
            });
        }
    };
    return App;
}());
var app = new App();

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js")))

/***/ }),

/***/ "./Resources/Styles/app.sass":
/*!***********************************!*\
  !*** ./Resources/Styles/app.sass ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ 0:
/*!********************************************************************!*\
  !*** multi ./Resources/Styles/app.sass ./Resources/Scripts/app.ts ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./Resources/Styles/app.sass */"./Resources/Styles/app.sass");
module.exports = __webpack_require__(/*! ./Resources/Scripts/app.ts */"./Resources/Scripts/app.ts");


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vUmVzb3VyY2VzL1NjcmlwdHMvYXBwLnRzIiwid2VicGFjazovLy8uL1Jlc291cmNlcy9TdHlsZXMvYXBwLnNhc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsUUFBUSxvQkFBb0I7UUFDNUI7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSxpQkFBaUIsNEJBQTRCO1FBQzdDO1FBQ0E7UUFDQSxrQkFBa0IsMkJBQTJCO1FBQzdDO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7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QUFRLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBcUI7b0JBQ2xGLHdCQUF3QixDQUFDLElBQUksR0FBRyw0QkFBNEIsQ0FBQztvQkFDN0Qsd0JBQXdCLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDO29CQUN6RCx3QkFBd0IsQ0FBQyxJQUFJLEdBQUcsUUFBUSxDQUFDO29CQUN6QyxNQUFNLENBQUMsV0FBVyxDQUFDLHdCQUF3QixDQUFDO29CQUM1QyxNQUFNLENBQUMsTUFBTSxHQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsd0JBQXVCO29CQUNqRCwwQkFBMEI7b0JBQzFCLE1BQU0sQ0FBQyxNQUFNLEdBQUMsTUFBTSxDQUFDO29CQUNyQixRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQztvQkFDbEMsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDO29CQUNoQixPQUFPLEtBQUssQ0FBQyxDQUFDLHlCQUF5QjtnQkFDM0MsQ0FBQyxDQUFDO1lBQ04sQ0FBQyxDQUFDO1NBQ0w7SUFDTCxDQUFDO0lBQ0wsVUFBQztBQUFELENBQUM7QUFFRCxJQUFJLEdBQUcsR0FBRyxJQUFJLEdBQUcsRUFBRSxDQUFDOzs7Ozs7Ozs7Ozs7O0FDaklwQix1QyIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBpbnN0YWxsIGEgSlNPTlAgY2FsbGJhY2sgZm9yIGNodW5rIGxvYWRpbmdcbiBcdGZ1bmN0aW9uIHdlYnBhY2tKc29ucENhbGxiYWNrKGRhdGEpIHtcbiBcdFx0dmFyIGNodW5rSWRzID0gZGF0YVswXTtcbiBcdFx0dmFyIG1vcmVNb2R1bGVzID0gZGF0YVsxXTtcbiBcdFx0dmFyIGV4ZWN1dGVNb2R1bGVzID0gZGF0YVsyXTtcblxuIFx0XHQvLyBhZGQgXCJtb3JlTW9kdWxlc1wiIHRvIHRoZSBtb2R1bGVzIG9iamVjdCxcbiBcdFx0Ly8gdGhlbiBmbGFnIGFsbCBcImNodW5rSWRzXCIgYXMgbG9hZGVkIGFuZCBmaXJlIGNhbGxiYWNrXG4gXHRcdHZhciBtb2R1bGVJZCwgY2h1bmtJZCwgaSA9IDAsIHJlc29sdmVzID0gW107XG4gXHRcdGZvcig7aSA8IGNodW5rSWRzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0Y2h1bmtJZCA9IGNodW5rSWRzW2ldO1xuIFx0XHRcdGlmKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChpbnN0YWxsZWRDaHVua3MsIGNodW5rSWQpICYmIGluc3RhbGxlZENodW5rc1tjaHVua0lkXSkge1xuIFx0XHRcdFx0cmVzb2x2ZXMucHVzaChpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF1bMF0pO1xuIFx0XHRcdH1cbiBcdFx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSAwO1xuIFx0XHR9XG4gXHRcdGZvcihtb2R1bGVJZCBpbiBtb3JlTW9kdWxlcykge1xuIFx0XHRcdGlmKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChtb3JlTW9kdWxlcywgbW9kdWxlSWQpKSB7XG4gXHRcdFx0XHRtb2R1bGVzW21vZHVsZUlkXSA9IG1vcmVNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHR9XG4gXHRcdH1cbiBcdFx0aWYocGFyZW50SnNvbnBGdW5jdGlvbikgcGFyZW50SnNvbnBGdW5jdGlvbihkYXRhKTtcblxuIFx0XHR3aGlsZShyZXNvbHZlcy5sZW5ndGgpIHtcbiBcdFx0XHRyZXNvbHZlcy5zaGlmdCgpKCk7XG4gXHRcdH1cblxuIFx0XHQvLyBhZGQgZW50cnkgbW9kdWxlcyBmcm9tIGxvYWRlZCBjaHVuayB0byBkZWZlcnJlZCBsaXN0XG4gXHRcdGRlZmVycmVkTW9kdWxlcy5wdXNoLmFwcGx5KGRlZmVycmVkTW9kdWxlcywgZXhlY3V0ZU1vZHVsZXMgfHwgW10pO1xuXG4gXHRcdC8vIHJ1biBkZWZlcnJlZCBtb2R1bGVzIHdoZW4gYWxsIGNodW5rcyByZWFkeVxuIFx0XHRyZXR1cm4gY2hlY2tEZWZlcnJlZE1vZHVsZXMoKTtcbiBcdH07XG4gXHRmdW5jdGlvbiBjaGVja0RlZmVycmVkTW9kdWxlcygpIHtcbiBcdFx0dmFyIHJlc3VsdDtcbiBcdFx0Zm9yKHZhciBpID0gMDsgaSA8IGRlZmVycmVkTW9kdWxlcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdHZhciBkZWZlcnJlZE1vZHVsZSA9IGRlZmVycmVkTW9kdWxlc1tpXTtcbiBcdFx0XHR2YXIgZnVsZmlsbGVkID0gdHJ1ZTtcbiBcdFx0XHRmb3IodmFyIGogPSAxOyBqIDwgZGVmZXJyZWRNb2R1bGUubGVuZ3RoOyBqKyspIHtcbiBcdFx0XHRcdHZhciBkZXBJZCA9IGRlZmVycmVkTW9kdWxlW2pdO1xuIFx0XHRcdFx0aWYoaW5zdGFsbGVkQ2h1bmtzW2RlcElkXSAhPT0gMCkgZnVsZmlsbGVkID0gZmFsc2U7XG4gXHRcdFx0fVxuIFx0XHRcdGlmKGZ1bGZpbGxlZCkge1xuIFx0XHRcdFx0ZGVmZXJyZWRNb2R1bGVzLnNwbGljZShpLS0sIDEpO1xuIFx0XHRcdFx0cmVzdWx0ID0gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBkZWZlcnJlZE1vZHVsZVswXSk7XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0cmV0dXJuIHJlc3VsdDtcbiBcdH1cblxuIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gb2JqZWN0IHRvIHN0b3JlIGxvYWRlZCBhbmQgbG9hZGluZyBjaHVua3NcbiBcdC8vIHVuZGVmaW5lZCA9IGNodW5rIG5vdCBsb2FkZWQsIG51bGwgPSBjaHVuayBwcmVsb2FkZWQvcHJlZmV0Y2hlZFxuIFx0Ly8gUHJvbWlzZSA9IGNodW5rIGxvYWRpbmcsIDAgPSBjaHVuayBsb2FkZWRcbiBcdHZhciBpbnN0YWxsZWRDaHVua3MgPSB7XG4gXHRcdFwiYXBwXCI6IDBcbiBcdH07XG5cbiBcdHZhciBkZWZlcnJlZE1vZHVsZXMgPSBbXTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0dmFyIGpzb25wQXJyYXkgPSB3aW5kb3dbXCJ3ZWJwYWNrSnNvbnBcIl0gPSB3aW5kb3dbXCJ3ZWJwYWNrSnNvbnBcIl0gfHwgW107XG4gXHR2YXIgb2xkSnNvbnBGdW5jdGlvbiA9IGpzb25wQXJyYXkucHVzaC5iaW5kKGpzb25wQXJyYXkpO1xuIFx0anNvbnBBcnJheS5wdXNoID0gd2VicGFja0pzb25wQ2FsbGJhY2s7XG4gXHRqc29ucEFycmF5ID0ganNvbnBBcnJheS5zbGljZSgpO1xuIFx0Zm9yKHZhciBpID0gMDsgaSA8IGpzb25wQXJyYXkubGVuZ3RoOyBpKyspIHdlYnBhY2tKc29ucENhbGxiYWNrKGpzb25wQXJyYXlbaV0pO1xuIFx0dmFyIHBhcmVudEpzb25wRnVuY3Rpb24gPSBvbGRKc29ucEZ1bmN0aW9uO1xuXG5cbiBcdC8vIGFkZCBlbnRyeSBtb2R1bGUgdG8gZGVmZXJyZWQgbGlzdFxuIFx0ZGVmZXJyZWRNb2R1bGVzLnB1c2goWzAsXCJjb21tb25zXCIsXCJ2ZW5kb3JzXCJdKTtcbiBcdC8vIHJ1biBkZWZlcnJlZCBtb2R1bGVzIHdoZW4gcmVhZHlcbiBcdHJldHVybiBjaGVja0RlZmVycmVkTW9kdWxlcygpO1xuIiwiaW1wb3J0IHsgVmFsaWRhdG9yIH0gZnJvbSAnLi9zZXJ2aWNlcy92YWxpZGF0b3InO1xyXG5pbXBvcnQgeyBBcHBJbnNpZ2h0cyB9IGZyb20gJ2FwcGxpY2F0aW9uaW5zaWdodHMtanMnO1xyXG5pbXBvcnQgU3dhbCAgZnJvbSAnc3dlZXRhbGVydDInXHJcbmltcG9ydCAnYm9vdHN0cmFwJ1xyXG5pbXBvcnQgJ21ldGlzbWVudSdcclxuXHJcbmNsYXNzIEFwcCB7XHJcblxyXG4gICAgcHJpdmF0ZSBoZWFkZXI6IEhUTUxFbGVtZW50O1xyXG4gICAgcHJpdmF0ZSBwYWdlV3JhcHBlcjogSFRNTEVsZW1lbnQ7XHJcbiAgICAgXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBpZiAoZG9jdW1lbnQucmVhZHlTdGF0ZSAhPT0gJ2xvYWRpbmcnKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaW5pdCgpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBlID0+IHRoaXMuaW5pdCgpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBpbml0KCk6IHZvaWQge1xyXG5cclxuICAgICAgICB0aGlzLmhlYWRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2hlYWRlci50b3BiYXInKTtcclxuICAgICAgICB0aGlzLnBhZ2VXcmFwcGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wYWdlLXdyYXBwZXJcIik7XHJcblxyXG4gICAgICAgIHRoaXMuc2V0dXBBcHBJbnNpZ2h0cygpO1xyXG4gICAgICAgIHRoaXMuc2V0dXBOYXZiYXIoKTtcclxuICAgICAgICB0aGlzLnB1Ymxpc2hQYWdlTm90aWZpY2F0aW9ucygpO1xyXG4gICAgICAgIHRoaXMuc2V0dXBQb3N0YWJsZUFuY2hvcnMoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHNldHVwQXBwSW5zaWdodHMoKTogdm9pZCB7XHJcbiAgICAgICAgdmFyIGFwcEluc2lnaHRzS2V5ID0gZG9jdW1lbnQuYm9keS5kYXRhc2V0WydhcHBJbnNpZ2h0c0tleSddO1xyXG5cclxuICAgICAgICBpZiAoYXBwSW5zaWdodHNLZXkgJiYgQXBwSW5zaWdodHMgJiYgQXBwSW5zaWdodHMuZG93bmxvYWRBbmRTZXR1cCAmJiBBcHBJbnNpZ2h0cy50cmFja1BhZ2VWaWV3KSB7XHJcbiAgICAgICAgICAgIEFwcEluc2lnaHRzLmRvd25sb2FkQW5kU2V0dXAoeyBpbnN0cnVtZW50YXRpb25LZXk6IGFwcEluc2lnaHRzS2V5IH0pO1xyXG4gICAgICAgICAgICBBcHBJbnNpZ2h0cy50cmFja1BhZ2VWaWV3KCk7XHJcbiAgICAgICAgfSAgICAgICAgXHJcbiAgICAgICAgY29uc3QgZm9ybXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdmb3JtOm5vdChbZGF0YS1uby1hdXRvLXZhbGlkYXRpb25dKScpO1xyXG4gICAgICAgIEFycmF5LnByb3RvdHlwZS5mb3JFYWNoLmNhbGwoZm9ybXMsIChmb3JtOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgdiA9IG5ldyBWYWxpZGF0b3IoZm9ybSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzZXR1cE5hdmJhcigpOnZvaWQge1xyXG4gICAgICAgIGNvbnN0IGNvbnRleHRUaGlzID0gdGhpcztcclxuICAgICAgICBcclxuICAgICAgICBpZiAodGhpcy5oZWFkZXIpIHtcclxuICAgICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsICgpID0+IGNvbnRleHRUaGlzLndpbmRvd1Jlc2l6ZUxpc3RlbmVyKCkpXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubmF2LXRvZ2dsZXInKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnRvZ2dsZSgnc2hvdy1zaWRlYmFyJyk7XHJcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubmF2LXRvZ2dsZXIgaScpLmNsYXNzTGlzdC50b2dnbGUoJ3RpLW1lbnUnKTtcclxuICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5uYXYtdG9nZ2xlciBpJykuY2xhc3NMaXN0LmFkZChcInRpLWNsb3NlXCIpO1xyXG4gICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgdGhpcy53aW5kb3dSZXNpemVMaXN0ZW5lcigpO1xyXG5cclxuICAgICAgICAgICAgJCgnI3NpZGViYXJuYXYnKS5tZXRpc01lbnUoKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgd2luZG93UmVzaXplTGlzdGVuZXIoKTogdm9pZCB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdmFyIHdpZHRoID0gKHdpbmRvdy5pbm5lcldpZHRoID4gMCkgPyB3aW5kb3cuaW5uZXJXaWR0aCA6IHNjcmVlbi53aWR0aDtcclxuICAgICAgICB2YXIgdG9wT2Zmc2V0ID0gNzA7XHJcblxyXG4gICAgICAgIGlmICh3aWR0aCA8IDExNzApIHtcclxuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QuYWRkKCdtaW5pLXNpZGViYXInKVxyXG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubmF2YmFyLWJyYW5kIHNwYW4nKS5jbGFzc0xpc3QuYWRkKCdkLW5vbmUnKTtcclxuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zY3JvbGwtc2lkZWJhciwgLnNsaW1TY3JvbGxEaXZcIikuY2xhc3NMaXN0LmFkZCgnb3ZlcmZsb3ctYXV0bycpXHJcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2Nyb2xsLXNpZGViYXIsIC5zbGltU2Nyb2xsRGl2XCIpLnBhcmVudEVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnb3ZlcmZsb3ctaGlkZGVuJyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QucmVtb3ZlKCdtaW5pLXNpZGViYXInKTtcclxuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm5hdmJhci1icmFuZCBzcGFuJykuY2xhc3NMaXN0LnJlbW92ZSgnZC1ub25lJyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2YXIgaGVpZ2h0ID0gKCh3aW5kb3cuaW5uZXJIZWlnaHQgPiAwKSA/IHdpbmRvdy5pbm5lckhlaWdodCA6IHNjcmVlbi5oZWlnaHQpIC0gMTtcclxuICAgICAgICBoZWlnaHQgPSBoZWlnaHQgLSB0b3BPZmZzZXQ7XHJcbiAgICAgICAgaWYgKGhlaWdodCA8IDEpIGhlaWdodCA9IDE7XHJcbiAgICAgICAgaWYgKGhlaWdodCA+IHRvcE9mZnNldCkge1xyXG4gICAgICAgICAgICB0aGlzLnBhZ2VXcmFwcGVyLnN0eWxlLm1pbkhlaWdodCA9IGAkKGhlaWdodClweGA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IGhlYWRlckhlaWdodDogbnVtYmVyID0gdGhpcy5oZWFkZXIuY2xpZW50SGVpZ2h0O1xyXG4gICAgICAgIHRoaXMucGFnZVdyYXBwZXIuc3R5bGUucGFkZGluZ1RvcCA9ICBoZWFkZXJIZWlnaHQgKyAncHgnO1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgcHVibGlzaFBhZ2VOb3RpZmljYXRpb25zKCkge1xyXG4gICAgICAgIHZhciBwYWdlTm90aWZpY2F0aW9ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ3NwYW5bZGF0YS1wYWdlLW5vdGlmaWNhdGlvbl0nKTtcclxuICAgICAgICBpZiAocGFnZU5vdGlmaWNhdGlvbnMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHBhZ2VOb3RpZmljYXRpb25zLmZvckVhY2goKHZhbHVlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB2YXIgcGFnZU5vdGlmaWNhdGlvbiA9IHZhbHVlIGFzIEhUTUxTcGFuRWxlbWVudDtcclxuICAgICAgICAgICAgICAgIFN3YWwuZmlyZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgdGl0bGVUZXh0OiBwYWdlTm90aWZpY2F0aW9uLmRhdGFzZXQudGl0bGUsXHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogcGFnZU5vdGlmaWNhdGlvbi5kYXRhc2V0Lm1lc3NhZ2UsXHJcbiAgICAgICAgICAgICAgICAgICAgdG9hc3Q6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgcG9zaXRpb246IFwidG9wLWVuZFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHRpbWVyOiA0NTAwLFxyXG4gICAgICAgICAgICAgICAgICAgIHNob3dDb25maXJtQnV0dG9uOiBmYWxzZVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0sIHRoaXMpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc2V0dXBQb3N0YWJsZUFuY2hvcnMoKSB7XHJcbiAgICAgICAgY29uc3QgYW5jaG9ycyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2FbZGF0YS1wb3N0YWJsZV0nKTtcclxuICAgICAgICBpZiAoYW5jaG9ycyAmJiBhbmNob3JzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICBhbmNob3JzLmZvckVhY2goKGFuY2hvcjogSFRNTEFuY2hvckVsZW1lbnQpID0+IHtcclxuICAgICAgICAgICAgICAgIGFuY2hvci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciB0YXJnZXQgPSBlLmN1cnJlbnRUYXJnZXQgYXMgSFRNTEFuY2hvckVsZW1lbnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIG15Rm9ybSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJmb3JtXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciByZXF1ZXN0VmVyaWZpY2F0aW9uVG9rZW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpIGFzIEhUTUxJbnB1dEVsZW1lbnRcclxuICAgICAgICAgICAgICAgICAgICByZXF1ZXN0VmVyaWZpY2F0aW9uVG9rZW4ubmFtZSA9ICdfX1JlcXVlc3RWZXJpZmljYXRpb25Ub2tlbic7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVxdWVzdFZlcmlmaWNhdGlvblRva2VuLnZhbHVlID0gdGFyZ2V0LmRhdGFzZXQucG9zdGFibGU7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVxdWVzdFZlcmlmaWNhdGlvblRva2VuLnR5cGUgPSAnaGlkZGVuJztcclxuICAgICAgICAgICAgICAgICAgICBteUZvcm0uYXBwZW5kQ2hpbGQocmVxdWVzdFZlcmlmaWNhdGlvblRva2VuKVxyXG4gICAgICAgICAgICAgICAgICAgIG15Rm9ybS5hY3Rpb249dGFyZ2V0LmhyZWY7Ly8gdGhlIGhyZWYgb2YgdGhlIGxpbmtcclxuICAgICAgICAgICAgICAgICAgICAvL215Rm9ybS50YXJnZXQ9XCJteUZyYW1lXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgbXlGb3JtLm1ldGhvZD1cIlBPU1RcIjtcclxuICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKG15Rm9ybSk7XHJcbiAgICAgICAgICAgICAgICAgICAgbXlGb3JtLnN1Ym1pdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTsgLy8gY2FuY2VsIHRoZSBhY3R1YWwgbGlua1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmxldCBhcHAgPSBuZXcgQXBwKCk7IiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luIl0sInNvdXJjZVJvb3QiOiIifQ==