/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
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

Object.defineProperty(exports, "__esModule", { value: true });
var validator_1 = __webpack_require__(/*! ./services/validator */ "./Resources/Scripts/services/validator.ts");
var applicationinsights_js_1 = __webpack_require__(/*! applicationinsights-js */ "./node_modules/applicationinsights-js/bundle/ai.module.js");
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
    };
    App.prototype.setupAppInsights = function () {
        var appInsightsKey = document.body.dataset['appInsightsKey'];
        if (appInsightsKey && applicationinsights_js_1.AppInsights && applicationinsights_js_1.AppInsights.downloadAndSetup && applicationinsights_js_1.AppInsights.trackPageView) {
            applicationinsights_js_1.AppInsights.downloadAndSetup({ instrumentationKey: appInsightsKey });
            applicationinsights_js_1.AppInsights.trackPageView();
        }
        var forms = document.getElementsByTagName('form');
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
    return App;
}());
var app = new App();


/***/ }),

/***/ "./Resources/Scripts/services/validator.ts":
/*!*************************************************!*\
  !*** ./Resources/Scripts/services/validator.ts ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var validate = __webpack_require__(/*! validate.js */ "./node_modules/validate.js/validate.js");
var Validator = /** @class */ (function () {
    function Validator(formQuery) {
        var _this = this;
        this.hasValidated = false;
        var contextThis = this;
        if (formQuery.isPrototypeOf(String)) {
            this.form = document.querySelector(formQuery);
        }
        else {
            this.form = formQuery;
        }
        if (!this.form)
            return;
        if (this.form.dataset['noValidate'])
            return;
        this.constraints = {};
        this.elements = [];
        var els = this.form.querySelectorAll('input:not([type="hidden"]), textarea');
        Array.prototype.forEach.call(els, function (element) {
            var needsValidation = false;
            var elementId = element.id;
            if (elementId) {
                elementId = elementId.replace('.', '_');
                contextThis.constraints[elementId] = {};
                for (var i in element.dataset) {
                    switch (i) {
                        case 'valRequired':
                            needsValidation = true;
                            contextThis.constraints[elementId].presence = {
                                message: "^" + element.dataset[i]
                            };
                            break;
                        case 'valEmail':
                            needsValidation = true;
                            contextThis.constraints[elementId].email = {
                                message: "^" + element.dataset[i]
                            };
                            break;
                        case 'valMinlength':
                            needsValidation = true;
                            contextThis.constraints[elementId].length = {
                                tooShort: "^" + element.dataset[i],
                                minimum: parseInt(element.dataset['valMinlengthMin'])
                            };
                            break;
                        case 'valEqualto':
                            needsValidation = true;
                            if (element.dataset['valEqualtoOther'].charAt(0) === '*') {
                                var searchTerm = element.dataset['valEqualtoOther'].replace('*.', '.');
                                element.dataset['valEqualtoOther'] = document.querySelector('[name*="' + searchTerm + '"]').id;
                            }
                            contextThis.constraints[elementId].equality = {
                                message: "^" + element.dataset[i],
                                attribute: element.dataset['valEqualtoOther'],
                                comparator: function (v1, v2) {
                                    return JSON.stringify(v1) === JSON.stringify(v2);
                                }
                            };
                            break;
                        case 'valRegex':
                            needsValidation = true;
                            contextThis.constraints[elementId].format = {
                                message: "^" + element.dataset[i],
                                pattern: element.dataset['valRegexPattern'],
                                flags: 'i'
                            };
                            break;
                    }
                }
                if (needsValidation) {
                    element.addEventListener('blur', function (e) { contextThis.elementChange(e); });
                    element.addEventListener('change', function (e) { contextThis.elementChange(e); });
                    _this.elements.push(element);
                }
            }
        });
        this.form.addEventListener('submit', function (e) { contextThis.formSubmit(e); });
        this.formSubmitted = false;
    }
    Validator.prototype.elementChange = function (event) {
        if (this.hasValidated) {
            this.performValidation();
        }
    };
    Validator.prototype.formSubmit = function (event) {
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
    };
    Validator.prototype.performValidation = function () {
        var formValues = JSON.parse(JSON.stringify(validate.collectFormValues(this.form)).replace(/\\\\\\\\\./g, '_'));
        var validationResult = validate(formValues, this.constraints);
        var contextThis = this;
        Array.prototype.forEach.call(this.elements, function (element) {
            contextThis.decorateElement(element, validationResult);
        });
        return validationResult;
    };
    Validator.prototype.decorateElement = function (element, validationResult) {
        var group = element.closest('.form-group');
        group.classList.remove('has-success');
        group.classList.remove('has-error');
        var elementId = element.id;
        if (elementId) {
            elementId = elementId.replace('.', '_');
            var helpblock = group.querySelector("span[data-valmsg-for]");
            helpblock.innerHTML = '';
            if (validationResult) {
                var item = validationResult[elementId];
                if (item) {
                    group.classList.add('has-error');
                    helpblock.innerHTML = item[0];
                }
                else {
                    group.classList.add('has-success');
                }
            }
            else {
                group.classList.add('has-success');
            }
        }
    };
    return Validator;
}());
exports.Validator = Validator;


/***/ }),

/***/ "./Resources/Styles/app.sass":
/*!***********************************!*\
  !*** ./Resources/Styles/app.sass ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./node_modules/applicationinsights-js/bundle/ai.module.js":
/*!*****************************************************************!*\
  !*** ./node_modules/applicationinsights-js/bundle/ai.module.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;
var Microsoft;
(function (Microsoft) {
    var ApplicationInsights;
    (function (ApplicationInsights) {
        "use strict";
    })(ApplicationInsights = Microsoft.ApplicationInsights || (Microsoft.ApplicationInsights = {}));
})(Microsoft || (Microsoft = {}));
// THIS FILE WAS AUTOGENERATED
var Microsoft;
(function (Microsoft) {
    var Telemetry;
    (function (Telemetry) {
        "use strict";
        /**
         * Data struct to contain only C section with custom fields.
         */
        var Base = /** @class */ (function () {
            function Base() {
            }
            return Base;
        }());
        Telemetry.Base = Base;
    })(Telemetry = Microsoft.Telemetry || (Microsoft.Telemetry = {}));
})(Microsoft || (Microsoft = {}));
// THIS FILE WAS AUTOGENERATED
/// <reference path="Base.ts" />
var Microsoft;
(function (Microsoft) {
    var Telemetry;
    (function (Telemetry) {
        "use strict";
        /**
         * System variables for a telemetry item.
         */
        var Envelope = /** @class */ (function () {
            function Envelope() {
                this.ver = 1;
                this.sampleRate = 100.0;
                this.tags = {};
            }
            return Envelope;
        }());
        Telemetry.Envelope = Envelope;
    })(Telemetry = Microsoft.Telemetry || (Microsoft.Telemetry = {}));
})(Microsoft || (Microsoft = {}));
var Microsoft;
(function (Microsoft) {
    var ApplicationInsights;
    (function (ApplicationInsights) {
        var Context;
        (function (Context) {
            "use strict";
        })(Context = ApplicationInsights.Context || (ApplicationInsights.Context = {}));
    })(ApplicationInsights = Microsoft.ApplicationInsights || (Microsoft.ApplicationInsights = {}));
})(Microsoft || (Microsoft = {}));
var Microsoft;
(function (Microsoft) {
    var ApplicationInsights;
    (function (ApplicationInsights) {
        var Context;
        (function (Context) {
            "use strict";
        })(Context = ApplicationInsights.Context || (ApplicationInsights.Context = {}));
    })(ApplicationInsights = Microsoft.ApplicationInsights || (Microsoft.ApplicationInsights = {}));
})(Microsoft || (Microsoft = {}));
var Microsoft;
(function (Microsoft) {
    var ApplicationInsights;
    (function (ApplicationInsights) {
        var Context;
        (function (Context) {
            "use strict";
        })(Context = ApplicationInsights.Context || (ApplicationInsights.Context = {}));
    })(ApplicationInsights = Microsoft.ApplicationInsights || (Microsoft.ApplicationInsights = {}));
})(Microsoft || (Microsoft = {}));
var Microsoft;
(function (Microsoft) {
    var ApplicationInsights;
    (function (ApplicationInsights) {
        var Context;
        (function (Context) {
            "use strict";
        })(Context = ApplicationInsights.Context || (ApplicationInsights.Context = {}));
    })(ApplicationInsights = Microsoft.ApplicationInsights || (Microsoft.ApplicationInsights = {}));
})(Microsoft || (Microsoft = {}));
var Microsoft;
(function (Microsoft) {
    var ApplicationInsights;
    (function (ApplicationInsights) {
        var Context;
        (function (Context) {
            "use strict";
        })(Context = ApplicationInsights.Context || (ApplicationInsights.Context = {}));
    })(ApplicationInsights = Microsoft.ApplicationInsights || (Microsoft.ApplicationInsights = {}));
})(Microsoft || (Microsoft = {}));
var Microsoft;
(function (Microsoft) {
    var ApplicationInsights;
    (function (ApplicationInsights) {
        var Context;
        (function (Context) {
            "use strict";
        })(Context = ApplicationInsights.Context || (ApplicationInsights.Context = {}));
    })(ApplicationInsights = Microsoft.ApplicationInsights || (Microsoft.ApplicationInsights = {}));
})(Microsoft || (Microsoft = {}));
var Microsoft;
(function (Microsoft) {
    var ApplicationInsights;
    (function (ApplicationInsights) {
        var Context;
        (function (Context) {
            "use strict";
        })(Context = ApplicationInsights.Context || (ApplicationInsights.Context = {}));
    })(ApplicationInsights = Microsoft.ApplicationInsights || (Microsoft.ApplicationInsights = {}));
})(Microsoft || (Microsoft = {}));
var Microsoft;
(function (Microsoft) {
    var ApplicationInsights;
    (function (ApplicationInsights) {
        var Context;
        (function (Context) {
            "use strict";
        })(Context = ApplicationInsights.Context || (ApplicationInsights.Context = {}));
    })(ApplicationInsights = Microsoft.ApplicationInsights || (Microsoft.ApplicationInsights = {}));
})(Microsoft || (Microsoft = {}));
var Microsoft;
(function (Microsoft) {
    var ApplicationInsights;
    (function (ApplicationInsights) {
        "use strict";
    })(ApplicationInsights = Microsoft.ApplicationInsights || (Microsoft.ApplicationInsights = {}));
})(Microsoft || (Microsoft = {}));
/// <reference path="./ISerializable.ts" />
var Microsoft;
(function (Microsoft) {
    var ApplicationInsights;
    (function (ApplicationInsights) {
        "use strict";
    })(ApplicationInsights = Microsoft.ApplicationInsights || (Microsoft.ApplicationInsights = {}));
})(Microsoft || (Microsoft = {}));
/// <reference path="./Contracts/Generated/Envelope.ts" />
/// <reference path="./Context/IApplication.ts"/>
/// <reference path="./Context/IDevice.ts"/>
/// <reference path="./Context/IInternal.ts"/>
/// <reference path="./Context/ILocation.ts"/>
/// <reference path="./Context/IOperation.ts"/>
/// <reference path="./Context/ISample.ts"/>
/// <reference path="./Context/IUser.ts"/>
/// <reference path="./Context/ISession.ts"/>
/// <reference path="./Telemetry/IEnvelope.ts"/>
var Microsoft;
(function (Microsoft) {
    var ApplicationInsights;
    (function (ApplicationInsights) {
        "use strict";
    })(ApplicationInsights = Microsoft.ApplicationInsights || (Microsoft.ApplicationInsights = {}));
})(Microsoft || (Microsoft = {}));
// THIS FILE WAS AUTOGENERATED
var AI;
(function (AI) {
    "use strict";
    /**
     * Defines the level of severity for the event.
     */
    var SeverityLevel;
    (function (SeverityLevel) {
        SeverityLevel[SeverityLevel["Verbose"] = 0] = "Verbose";
        SeverityLevel[SeverityLevel["Information"] = 1] = "Information";
        SeverityLevel[SeverityLevel["Warning"] = 2] = "Warning";
        SeverityLevel[SeverityLevel["Error"] = 3] = "Error";
        SeverityLevel[SeverityLevel["Critical"] = 4] = "Critical";
    })(SeverityLevel = AI.SeverityLevel || (AI.SeverityLevel = {}));
})(AI || (AI = {}));
/// <reference path="./IConfig.ts" />
/// <reference path="./ITelemetryContext.ts" />
/// <reference path="./Contracts/Generated/SeverityLevel.ts" />
var Microsoft;
(function (Microsoft) {
    var ApplicationInsights;
    (function (ApplicationInsights) {
        "use strict";
    })(ApplicationInsights = Microsoft.ApplicationInsights || (Microsoft.ApplicationInsights = {}));
})(Microsoft || (Microsoft = {}));
var Microsoft;
(function (Microsoft) {
    var ApplicationInsights;
    (function (ApplicationInsights) {
        "use strict";
        var UtilHelpers = /** @class */ (function () {
            function UtilHelpers() {
            }
            /**
             * generate random id string
             */
            UtilHelpers.newId = function () {
                var base64chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
                var result = "";
                var random = Math.random() * 1073741824; //5 symbols in base64, almost maxint
                while (random > 0) {
                    var char = base64chars.charAt(random % 64);
                    result += char;
                    random = Math.floor(random / 64);
                }
                return result;
            };
            return UtilHelpers;
        }());
        ApplicationInsights.UtilHelpers = UtilHelpers;
    })(ApplicationInsights = Microsoft.ApplicationInsights || (Microsoft.ApplicationInsights = {}));
})(Microsoft || (Microsoft = {}));
/// <reference path="../JavaScriptSDK.Interfaces/IConfig.ts"/>
/// <reference path="../JavaScriptSDK.Interfaces/IAppInsights.ts"/>
/// <reference path="../JavaScriptSDK/UtilHelpers.ts"/>
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports], __WEBPACK_AMD_DEFINE_RESULT__ = (function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var AppInsightsModule = /** @class */ (function () {
        function AppInsightsModule() {
        }
        AppInsightsModule._createLazyMethod = function (name) {
            var aiObject = window[AppInsightsModule.appInsightsName];
            // Define a temporary method that queues-up a the real method call
            aiObject[name] = function () {
                // Capture the original arguments passed to the method
                var originalArguments = arguments;
                // If the queue is available, it means that the function wasn't yet replaced with actual function value
                if (aiObject.queue) {
                    aiObject.queue.push(function () { return aiObject[name].apply(aiObject, originalArguments); });
                }
                else {
                    // otherwise execute the function
                    aiObject[name].apply(aiObject, originalArguments);
                }
            };
        };
        ;
        AppInsightsModule._defineLazyMethods = function () {
            var aiObject = window[AppInsightsModule.appInsightsName];
            // capture initial cookie if possible
            try {
                aiObject.cookie = document.cookie;
            }
            catch (e) {
            }
            aiObject.queue = [];
            var method = [
                "clearAuthenticatedUserContext",
                "flush",
                "setAuthenticatedUserContext",
                "startTrackEvent",
                "startTrackPage",
                "stopTrackEvent",
                "stopTrackPage",
                "trackDependency",
                "trackEvent",
                "trackException",
                "trackMetric",
                "trackPageView",
                "trackTrace"
            ];
            while (method.length) {
                AppInsightsModule._createLazyMethod(method.pop());
            }
        };
        AppInsightsModule._download = function (aiConfig) {
            AppInsightsModule.appInsightsInstance.config = aiConfig;
            var aiObject = window[AppInsightsModule.appInsightsName];
            // if script was previously downloaded and initialized, queue will be deleted, reinitialize it
            if (!aiObject.queue) {
                aiObject.queue = [];
            }
            setTimeout(function () {
                var scriptElement = document.createElement("script");
                scriptElement.src = aiConfig.url || "https://az416426.vo.msecnd.net/scripts/a/ai.0.js";
                document.head.appendChild(scriptElement);
            });
            // collect global errors by wrapping the window.onerror method
            if (!aiConfig.disableExceptionTracking) {
                var method_1 = "onerror";
                AppInsightsModule._createLazyMethod("_" + method_1);
                var originalOnError = window[method_1];
                window[method_1] = function (message, url, lineNumber, columnNumber, error) {
                    var handled = originalOnError && originalOnError(message, url, lineNumber, columnNumber, error);
                    if (handled !== true) {
                        aiObject["_" + method_1](message, url, lineNumber, columnNumber, error);
                    }
                    return handled;
                };
            }
        };
        Object.defineProperty(AppInsightsModule, "appInsightsInstance", {
            get: function () {
                if (typeof window === 'undefined') {
                    return;
                }
                if (!window[AppInsightsModule.appInsightsName]) {
                    window[AppInsightsModule.appInsightsName] = {
                        downloadAndSetup: AppInsightsModule._download,
                        // exposing it for unit tests only, not part of interface
                        _defineLazyMethods: AppInsightsModule._defineLazyMethods
                    };
                    AppInsightsModule._defineLazyMethods();
                }
                return window[AppInsightsModule.appInsightsName];
            },
            enumerable: true,
            configurable: true
        });
        AppInsightsModule.appInsightsInitialized = false;
        AppInsightsModule.appInsightsName = "appInsights";
        return AppInsightsModule;
    }());
    exports.AppInsights = AppInsightsModule.appInsightsInstance;
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
//# sourceMappingURL=ai.module.js.map

/***/ }),

/***/ "./node_modules/validate.js/validate.js":
/*!**********************************************!*\
  !*** ./node_modules/validate.js/validate.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {/*!
 * validate.js 0.13.1
 *
 * (c) 2013-2019 Nicklas Ansman, 2013 Wrapp
 * Validate.js may be freely distributed under the MIT license.
 * For all details and documentation:
 * http://validatejs.org/
 */

(function(exports, module, define) {
  "use strict";

  // The main function that calls the validators specified by the constraints.
  // The options are the following:
  //   - format (string) - An option that controls how the returned value is formatted
  //     * flat - Returns a flat array of just the error messages
  //     * grouped - Returns the messages grouped by attribute (default)
  //     * detailed - Returns an array of the raw validation data
  //   - fullMessages (boolean) - If `true` (default) the attribute name is prepended to the error.
  //
  // Please note that the options are also passed to each validator.
  var validate = function(attributes, constraints, options) {
    options = v.extend({}, v.options, options);

    var results = v.runValidations(attributes, constraints, options)
      , attr
      , validator;

    if (results.some(function(r) { return v.isPromise(r.error); })) {
      throw new Error("Use validate.async if you want support for promises");
    }
    return validate.processValidationResults(results, options);
  };

  var v = validate;

  // Copies over attributes from one or more sources to a single destination.
  // Very much similar to underscore's extend.
  // The first argument is the target object and the remaining arguments will be
  // used as sources.
  v.extend = function(obj) {
    [].slice.call(arguments, 1).forEach(function(source) {
      for (var attr in source) {
        obj[attr] = source[attr];
      }
    });
    return obj;
  };

  v.extend(validate, {
    // This is the version of the library as a semver.
    // The toString function will allow it to be coerced into a string
    version: {
      major: 0,
      minor: 13,
      patch: 1,
      metadata: null,
      toString: function() {
        var version = v.format("%{major}.%{minor}.%{patch}", v.version);
        if (!v.isEmpty(v.version.metadata)) {
          version += "+" + v.version.metadata;
        }
        return version;
      }
    },

    // Below is the dependencies that are used in validate.js

    // The constructor of the Promise implementation.
    // If you are using Q.js, RSVP or any other A+ compatible implementation
    // override this attribute to be the constructor of that promise.
    // Since jQuery promises aren't A+ compatible they won't work.
    Promise: typeof Promise !== "undefined" ? Promise : /* istanbul ignore next */ null,

    EMPTY_STRING_REGEXP: /^\s*$/,

    // Runs the validators specified by the constraints object.
    // Will return an array of the format:
    //     [{attribute: "<attribute name>", error: "<validation result>"}, ...]
    runValidations: function(attributes, constraints, options) {
      var results = []
        , attr
        , validatorName
        , value
        , validators
        , validator
        , validatorOptions
        , error;

      if (v.isDomElement(attributes) || v.isJqueryElement(attributes)) {
        attributes = v.collectFormValues(attributes);
      }

      // Loops through each constraints, finds the correct validator and run it.
      for (attr in constraints) {
        value = v.getDeepObjectValue(attributes, attr);
        // This allows the constraints for an attribute to be a function.
        // The function will be called with the value, attribute name, the complete dict of
        // attributes as well as the options and constraints passed in.
        // This is useful when you want to have different
        // validations depending on the attribute value.
        validators = v.result(constraints[attr], value, attributes, attr, options, constraints);

        for (validatorName in validators) {
          validator = v.validators[validatorName];

          if (!validator) {
            error = v.format("Unknown validator %{name}", {name: validatorName});
            throw new Error(error);
          }

          validatorOptions = validators[validatorName];
          // This allows the options to be a function. The function will be
          // called with the value, attribute name, the complete dict of
          // attributes as well as the options and constraints passed in.
          // This is useful when you want to have different
          // validations depending on the attribute value.
          validatorOptions = v.result(validatorOptions, value, attributes, attr, options, constraints);
          if (!validatorOptions) {
            continue;
          }
          results.push({
            attribute: attr,
            value: value,
            validator: validatorName,
            globalOptions: options,
            attributes: attributes,
            options: validatorOptions,
            error: validator.call(validator,
                value,
                validatorOptions,
                attr,
                attributes,
                options)
          });
        }
      }

      return results;
    },

    // Takes the output from runValidations and converts it to the correct
    // output format.
    processValidationResults: function(errors, options) {
      errors = v.pruneEmptyErrors(errors, options);
      errors = v.expandMultipleErrors(errors, options);
      errors = v.convertErrorMessages(errors, options);

      var format = options.format || "grouped";

      if (typeof v.formatters[format] === 'function') {
        errors = v.formatters[format](errors);
      } else {
        throw new Error(v.format("Unknown format %{format}", options));
      }

      return v.isEmpty(errors) ? undefined : errors;
    },

    // Runs the validations with support for promises.
    // This function will return a promise that is settled when all the
    // validation promises have been completed.
    // It can be called even if no validations returned a promise.
    async: function(attributes, constraints, options) {
      options = v.extend({}, v.async.options, options);

      var WrapErrors = options.wrapErrors || function(errors) {
        return errors;
      };

      // Removes unknown attributes
      if (options.cleanAttributes !== false) {
        attributes = v.cleanAttributes(attributes, constraints);
      }

      var results = v.runValidations(attributes, constraints, options);

      return new v.Promise(function(resolve, reject) {
        v.waitForResults(results).then(function() {
          var errors = v.processValidationResults(results, options);
          if (errors) {
            reject(new WrapErrors(errors, options, attributes, constraints));
          } else {
            resolve(attributes);
          }
        }, function(err) {
          reject(err);
        });
      });
    },

    single: function(value, constraints, options) {
      options = v.extend({}, v.single.options, options, {
        format: "flat",
        fullMessages: false
      });
      return v({single: value}, {single: constraints}, options);
    },

    // Returns a promise that is resolved when all promises in the results array
    // are settled. The promise returned from this function is always resolved,
    // never rejected.
    // This function modifies the input argument, it replaces the promises
    // with the value returned from the promise.
    waitForResults: function(results) {
      // Create a sequence of all the results starting with a resolved promise.
      return results.reduce(function(memo, result) {
        // If this result isn't a promise skip it in the sequence.
        if (!v.isPromise(result.error)) {
          return memo;
        }

        return memo.then(function() {
          return result.error.then(function(error) {
            result.error = error || null;
          });
        });
      }, new v.Promise(function(r) { r(); })); // A resolved promise
    },

    // If the given argument is a call: function the and: function return the value
    // otherwise just return the value. Additional arguments will be passed as
    // arguments to the function.
    // Example:
    // ```
    // result('foo') // 'foo'
    // result(Math.max, 1, 2) // 2
    // ```
    result: function(value) {
      var args = [].slice.call(arguments, 1);
      if (typeof value === 'function') {
        value = value.apply(null, args);
      }
      return value;
    },

    // Checks if the value is a number. This function does not consider NaN a
    // number like many other `isNumber` functions do.
    isNumber: function(value) {
      return typeof value === 'number' && !isNaN(value);
    },

    // Returns false if the object is not a function
    isFunction: function(value) {
      return typeof value === 'function';
    },

    // A simple check to verify that the value is an integer. Uses `isNumber`
    // and a simple modulo check.
    isInteger: function(value) {
      return v.isNumber(value) && value % 1 === 0;
    },

    // Checks if the value is a boolean
    isBoolean: function(value) {
      return typeof value === 'boolean';
    },

    // Uses the `Object` function to check if the given argument is an object.
    isObject: function(obj) {
      return obj === Object(obj);
    },

    // Simply checks if the object is an instance of a date
    isDate: function(obj) {
      return obj instanceof Date;
    },

    // Returns false if the object is `null` of `undefined`
    isDefined: function(obj) {
      return obj !== null && obj !== undefined;
    },

    // Checks if the given argument is a promise. Anything with a `then`
    // function is considered a promise.
    isPromise: function(p) {
      return !!p && v.isFunction(p.then);
    },

    isJqueryElement: function(o) {
      return o && v.isString(o.jquery);
    },

    isDomElement: function(o) {
      if (!o) {
        return false;
      }

      if (!o.querySelectorAll || !o.querySelector) {
        return false;
      }

      if (v.isObject(document) && o === document) {
        return true;
      }

      // http://stackoverflow.com/a/384380/699304
      /* istanbul ignore else */
      if (typeof HTMLElement === "object") {
        return o instanceof HTMLElement;
      } else {
        return o &&
          typeof o === "object" &&
          o !== null &&
          o.nodeType === 1 &&
          typeof o.nodeName === "string";
      }
    },

    isEmpty: function(value) {
      var attr;

      // Null and undefined are empty
      if (!v.isDefined(value)) {
        return true;
      }

      // functions are non empty
      if (v.isFunction(value)) {
        return false;
      }

      // Whitespace only strings are empty
      if (v.isString(value)) {
        return v.EMPTY_STRING_REGEXP.test(value);
      }

      // For arrays we use the length property
      if (v.isArray(value)) {
        return value.length === 0;
      }

      // Dates have no attributes but aren't empty
      if (v.isDate(value)) {
        return false;
      }

      // If we find at least one property we consider it non empty
      if (v.isObject(value)) {
        for (attr in value) {
          return false;
        }
        return true;
      }

      return false;
    },

    // Formats the specified strings with the given values like so:
    // ```
    // format("Foo: %{foo}", {foo: "bar"}) // "Foo bar"
    // ```
    // If you want to write %{...} without having it replaced simply
    // prefix it with % like this `Foo: %%{foo}` and it will be returned
    // as `"Foo: %{foo}"`
    format: v.extend(function(str, vals) {
      if (!v.isString(str)) {
        return str;
      }
      return str.replace(v.format.FORMAT_REGEXP, function(m0, m1, m2) {
        if (m1 === '%') {
          return "%{" + m2 + "}";
        } else {
          return String(vals[m2]);
        }
      });
    }, {
      // Finds %{key} style patterns in the given string
      FORMAT_REGEXP: /(%?)%\{([^\}]+)\}/g
    }),

    // "Prettifies" the given string.
    // Prettifying means replacing [.\_-] with spaces as well as splitting
    // camel case words.
    prettify: function(str) {
      if (v.isNumber(str)) {
        // If there are more than 2 decimals round it to two
        if ((str * 100) % 1 === 0) {
          return "" + str;
        } else {
          return parseFloat(Math.round(str * 100) / 100).toFixed(2);
        }
      }

      if (v.isArray(str)) {
        return str.map(function(s) { return v.prettify(s); }).join(", ");
      }

      if (v.isObject(str)) {
        if (!v.isDefined(str.toString)) {
          return JSON.stringify(str);
        }

        return str.toString();
      }

      // Ensure the string is actually a string
      str = "" + str;

      return str
        // Splits keys separated by periods
        .replace(/([^\s])\.([^\s])/g, '$1 $2')
        // Removes backslashes
        .replace(/\\+/g, '')
        // Replaces - and - with space
        .replace(/[_-]/g, ' ')
        // Splits camel cased words
        .replace(/([a-z])([A-Z])/g, function(m0, m1, m2) {
          return "" + m1 + " " + m2.toLowerCase();
        })
        .toLowerCase();
    },

    stringifyValue: function(value, options) {
      var prettify = options && options.prettify || v.prettify;
      return prettify(value);
    },

    isString: function(value) {
      return typeof value === 'string';
    },

    isArray: function(value) {
      return {}.toString.call(value) === '[object Array]';
    },

    // Checks if the object is a hash, which is equivalent to an object that
    // is neither an array nor a function.
    isHash: function(value) {
      return v.isObject(value) && !v.isArray(value) && !v.isFunction(value);
    },

    contains: function(obj, value) {
      if (!v.isDefined(obj)) {
        return false;
      }
      if (v.isArray(obj)) {
        return obj.indexOf(value) !== -1;
      }
      return value in obj;
    },

    unique: function(array) {
      if (!v.isArray(array)) {
        return array;
      }
      return array.filter(function(el, index, array) {
        return array.indexOf(el) == index;
      });
    },

    forEachKeyInKeypath: function(object, keypath, callback) {
      if (!v.isString(keypath)) {
        return undefined;
      }

      var key = ""
        , i
        , escape = false;

      for (i = 0; i < keypath.length; ++i) {
        switch (keypath[i]) {
          case '.':
            if (escape) {
              escape = false;
              key += '.';
            } else {
              object = callback(object, key, false);
              key = "";
            }
            break;

          case '\\':
            if (escape) {
              escape = false;
              key += '\\';
            } else {
              escape = true;
            }
            break;

          default:
            escape = false;
            key += keypath[i];
            break;
        }
      }

      return callback(object, key, true);
    },

    getDeepObjectValue: function(obj, keypath) {
      if (!v.isObject(obj)) {
        return undefined;
      }

      return v.forEachKeyInKeypath(obj, keypath, function(obj, key) {
        if (v.isObject(obj)) {
          return obj[key];
        }
      });
    },

    // This returns an object with all the values of the form.
    // It uses the input name as key and the value as value
    // So for example this:
    // <input type="text" name="email" value="foo@bar.com" />
    // would return:
    // {email: "foo@bar.com"}
    collectFormValues: function(form, options) {
      var values = {}
        , i
        , j
        , input
        , inputs
        , option
        , value;

      if (v.isJqueryElement(form)) {
        form = form[0];
      }

      if (!form) {
        return values;
      }

      options = options || {};

      inputs = form.querySelectorAll("input[name], textarea[name]");
      for (i = 0; i < inputs.length; ++i) {
        input = inputs.item(i);

        if (v.isDefined(input.getAttribute("data-ignored"))) {
          continue;
        }

        var name = input.name.replace(/\./g, "\\\\.");
        value = v.sanitizeFormValue(input.value, options);
        if (input.type === "number") {
          value = value ? +value : null;
        } else if (input.type === "checkbox") {
          if (input.attributes.value) {
            if (!input.checked) {
              value = values[name] || null;
            }
          } else {
            value = input.checked;
          }
        } else if (input.type === "radio") {
          if (!input.checked) {
            value = values[name] || null;
          }
        }
        values[name] = value;
      }

      inputs = form.querySelectorAll("select[name]");
      for (i = 0; i < inputs.length; ++i) {
        input = inputs.item(i);
        if (v.isDefined(input.getAttribute("data-ignored"))) {
          continue;
        }

        if (input.multiple) {
          value = [];
          for (j in input.options) {
            option = input.options[j];
             if (option && option.selected) {
              value.push(v.sanitizeFormValue(option.value, options));
            }
          }
        } else {
          var _val = typeof input.options[input.selectedIndex] !== 'undefined' ? input.options[input.selectedIndex].value : /* istanbul ignore next */ '';
          value = v.sanitizeFormValue(_val, options);
        }
        values[input.name] = value;
      }

      return values;
    },

    sanitizeFormValue: function(value, options) {
      if (options.trim && v.isString(value)) {
        value = value.trim();
      }

      if (options.nullify !== false && value === "") {
        return null;
      }
      return value;
    },

    capitalize: function(str) {
      if (!v.isString(str)) {
        return str;
      }
      return str[0].toUpperCase() + str.slice(1);
    },

    // Remove all errors who's error attribute is empty (null or undefined)
    pruneEmptyErrors: function(errors) {
      return errors.filter(function(error) {
        return !v.isEmpty(error.error);
      });
    },

    // In
    // [{error: ["err1", "err2"], ...}]
    // Out
    // [{error: "err1", ...}, {error: "err2", ...}]
    //
    // All attributes in an error with multiple messages are duplicated
    // when expanding the errors.
    expandMultipleErrors: function(errors) {
      var ret = [];
      errors.forEach(function(error) {
        // Removes errors without a message
        if (v.isArray(error.error)) {
          error.error.forEach(function(msg) {
            ret.push(v.extend({}, error, {error: msg}));
          });
        } else {
          ret.push(error);
        }
      });
      return ret;
    },

    // Converts the error mesages by prepending the attribute name unless the
    // message is prefixed by ^
    convertErrorMessages: function(errors, options) {
      options = options || {};

      var ret = []
        , prettify = options.prettify || v.prettify;
      errors.forEach(function(errorInfo) {
        var error = v.result(errorInfo.error,
            errorInfo.value,
            errorInfo.attribute,
            errorInfo.options,
            errorInfo.attributes,
            errorInfo.globalOptions);

        if (!v.isString(error)) {
          ret.push(errorInfo);
          return;
        }

        if (error[0] === '^') {
          error = error.slice(1);
        } else if (options.fullMessages !== false) {
          error = v.capitalize(prettify(errorInfo.attribute)) + " " + error;
        }
        error = error.replace(/\\\^/g, "^");
        error = v.format(error, {
          value: v.stringifyValue(errorInfo.value, options)
        });
        ret.push(v.extend({}, errorInfo, {error: error}));
      });
      return ret;
    },

    // In:
    // [{attribute: "<attributeName>", ...}]
    // Out:
    // {"<attributeName>": [{attribute: "<attributeName>", ...}]}
    groupErrorsByAttribute: function(errors) {
      var ret = {};
      errors.forEach(function(error) {
        var list = ret[error.attribute];
        if (list) {
          list.push(error);
        } else {
          ret[error.attribute] = [error];
        }
      });
      return ret;
    },

    // In:
    // [{error: "<message 1>", ...}, {error: "<message 2>", ...}]
    // Out:
    // ["<message 1>", "<message 2>"]
    flattenErrorsToArray: function(errors) {
      return errors
        .map(function(error) { return error.error; })
        .filter(function(value, index, self) {
          return self.indexOf(value) === index;
        });
    },

    cleanAttributes: function(attributes, whitelist) {
      function whitelistCreator(obj, key, last) {
        if (v.isObject(obj[key])) {
          return obj[key];
        }
        return (obj[key] = last ? true : {});
      }

      function buildObjectWhitelist(whitelist) {
        var ow = {}
          , lastObject
          , attr;
        for (attr in whitelist) {
          if (!whitelist[attr]) {
            continue;
          }
          v.forEachKeyInKeypath(ow, attr, whitelistCreator);
        }
        return ow;
      }

      function cleanRecursive(attributes, whitelist) {
        if (!v.isObject(attributes)) {
          return attributes;
        }

        var ret = v.extend({}, attributes)
          , w
          , attribute;

        for (attribute in attributes) {
          w = whitelist[attribute];

          if (v.isObject(w)) {
            ret[attribute] = cleanRecursive(ret[attribute], w);
          } else if (!w) {
            delete ret[attribute];
          }
        }
        return ret;
      }

      if (!v.isObject(whitelist) || !v.isObject(attributes)) {
        return {};
      }

      whitelist = buildObjectWhitelist(whitelist);
      return cleanRecursive(attributes, whitelist);
    },

    exposeModule: function(validate, root, exports, module, define) {
      if (exports) {
        if (module && module.exports) {
          exports = module.exports = validate;
        }
        exports.validate = validate;
      } else {
        root.validate = validate;
        if (validate.isFunction(define) && define.amd) {
          define([], function () { return validate; });
        }
      }
    },

    warn: function(msg) {
      if (typeof console !== "undefined" && console.warn) {
        console.warn("[validate.js] " + msg);
      }
    },

    error: function(msg) {
      if (typeof console !== "undefined" && console.error) {
        console.error("[validate.js] " + msg);
      }
    }
  });

  validate.validators = {
    // Presence validates that the value isn't empty
    presence: function(value, options) {
      options = v.extend({}, this.options, options);
      if (options.allowEmpty !== false ? !v.isDefined(value) : v.isEmpty(value)) {
        return options.message || this.message || "can't be blank";
      }
    },
    length: function(value, options, attribute) {
      // Empty values are allowed
      if (!v.isDefined(value)) {
        return;
      }

      options = v.extend({}, this.options, options);

      var is = options.is
        , maximum = options.maximum
        , minimum = options.minimum
        , tokenizer = options.tokenizer || function(val) { return val; }
        , err
        , errors = [];

      value = tokenizer(value);
      var length = value.length;
      if(!v.isNumber(length)) {
        return options.message || this.notValid || "has an incorrect length";
      }

      // Is checks
      if (v.isNumber(is) && length !== is) {
        err = options.wrongLength ||
          this.wrongLength ||
          "is the wrong length (should be %{count} characters)";
        errors.push(v.format(err, {count: is}));
      }

      if (v.isNumber(minimum) && length < minimum) {
        err = options.tooShort ||
          this.tooShort ||
          "is too short (minimum is %{count} characters)";
        errors.push(v.format(err, {count: minimum}));
      }

      if (v.isNumber(maximum) && length > maximum) {
        err = options.tooLong ||
          this.tooLong ||
          "is too long (maximum is %{count} characters)";
        errors.push(v.format(err, {count: maximum}));
      }

      if (errors.length > 0) {
        return options.message || errors;
      }
    },
    numericality: function(value, options, attribute, attributes, globalOptions) {
      // Empty values are fine
      if (!v.isDefined(value)) {
        return;
      }

      options = v.extend({}, this.options, options);

      var errors = []
        , name
        , count
        , checks = {
            greaterThan:          function(v, c) { return v > c; },
            greaterThanOrEqualTo: function(v, c) { return v >= c; },
            equalTo:              function(v, c) { return v === c; },
            lessThan:             function(v, c) { return v < c; },
            lessThanOrEqualTo:    function(v, c) { return v <= c; },
            divisibleBy:          function(v, c) { return v % c === 0; }
          }
        , prettify = options.prettify ||
          (globalOptions && globalOptions.prettify) ||
          v.prettify;

      // Strict will check that it is a valid looking number
      if (v.isString(value) && options.strict) {
        var pattern = "^-?(0|[1-9]\\d*)";
        if (!options.onlyInteger) {
          pattern += "(\\.\\d+)?";
        }
        pattern += "$";

        if (!(new RegExp(pattern).test(value))) {
          return options.message ||
            options.notValid ||
            this.notValid ||
            this.message ||
            "must be a valid number";
        }
      }

      // Coerce the value to a number unless we're being strict.
      if (options.noStrings !== true && v.isString(value) && !v.isEmpty(value)) {
        value = +value;
      }

      // If it's not a number we shouldn't continue since it will compare it.
      if (!v.isNumber(value)) {
        return options.message ||
          options.notValid ||
          this.notValid ||
          this.message ||
          "is not a number";
      }

      // Same logic as above, sort of. Don't bother with comparisons if this
      // doesn't pass.
      if (options.onlyInteger && !v.isInteger(value)) {
        return options.message ||
          options.notInteger ||
          this.notInteger ||
          this.message ||
          "must be an integer";
      }

      for (name in checks) {
        count = options[name];
        if (v.isNumber(count) && !checks[name](value, count)) {
          // This picks the default message if specified
          // For example the greaterThan check uses the message from
          // this.notGreaterThan so we capitalize the name and prepend "not"
          var key = "not" + v.capitalize(name);
          var msg = options[key] ||
            this[key] ||
            this.message ||
            "must be %{type} %{count}";

          errors.push(v.format(msg, {
            count: count,
            type: prettify(name)
          }));
        }
      }

      if (options.odd && value % 2 !== 1) {
        errors.push(options.notOdd ||
            this.notOdd ||
            this.message ||
            "must be odd");
      }
      if (options.even && value % 2 !== 0) {
        errors.push(options.notEven ||
            this.notEven ||
            this.message ||
            "must be even");
      }

      if (errors.length) {
        return options.message || errors;
      }
    },
    datetime: v.extend(function(value, options) {
      if (!v.isFunction(this.parse) || !v.isFunction(this.format)) {
        throw new Error("Both the parse and format functions needs to be set to use the datetime/date validator");
      }

      // Empty values are fine
      if (!v.isDefined(value)) {
        return;
      }

      options = v.extend({}, this.options, options);

      var err
        , errors = []
        , earliest = options.earliest ? this.parse(options.earliest, options) : NaN
        , latest = options.latest ? this.parse(options.latest, options) : NaN;

      value = this.parse(value, options);

      // 86400000 is the number of milliseconds in a day, this is used to remove
      // the time from the date
      if (isNaN(value) || options.dateOnly && value % 86400000 !== 0) {
        err = options.notValid ||
          options.message ||
          this.notValid ||
          "must be a valid date";
        return v.format(err, {value: arguments[0]});
      }

      if (!isNaN(earliest) && value < earliest) {
        err = options.tooEarly ||
          options.message ||
          this.tooEarly ||
          "must be no earlier than %{date}";
        err = v.format(err, {
          value: this.format(value, options),
          date: this.format(earliest, options)
        });
        errors.push(err);
      }

      if (!isNaN(latest) && value > latest) {
        err = options.tooLate ||
          options.message ||
          this.tooLate ||
          "must be no later than %{date}";
        err = v.format(err, {
          date: this.format(latest, options),
          value: this.format(value, options)
        });
        errors.push(err);
      }

      if (errors.length) {
        return v.unique(errors);
      }
    }, {
      parse: null,
      format: null
    }),
    date: function(value, options) {
      options = v.extend({}, options, {dateOnly: true});
      return v.validators.datetime.call(v.validators.datetime, value, options);
    },
    format: function(value, options) {
      if (v.isString(options) || (options instanceof RegExp)) {
        options = {pattern: options};
      }

      options = v.extend({}, this.options, options);

      var message = options.message || this.message || "is invalid"
        , pattern = options.pattern
        , match;

      // Empty values are allowed
      if (!v.isDefined(value)) {
        return;
      }
      if (!v.isString(value)) {
        return message;
      }

      if (v.isString(pattern)) {
        pattern = new RegExp(options.pattern, options.flags);
      }
      match = pattern.exec(value);
      if (!match || match[0].length != value.length) {
        return message;
      }
    },
    inclusion: function(value, options) {
      // Empty values are fine
      if (!v.isDefined(value)) {
        return;
      }
      if (v.isArray(options)) {
        options = {within: options};
      }
      options = v.extend({}, this.options, options);
      if (v.contains(options.within, value)) {
        return;
      }
      var message = options.message ||
        this.message ||
        "^%{value} is not included in the list";
      return v.format(message, {value: value});
    },
    exclusion: function(value, options) {
      // Empty values are fine
      if (!v.isDefined(value)) {
        return;
      }
      if (v.isArray(options)) {
        options = {within: options};
      }
      options = v.extend({}, this.options, options);
      if (!v.contains(options.within, value)) {
        return;
      }
      var message = options.message || this.message || "^%{value} is restricted";
      if (v.isString(options.within[value])) {
        value = options.within[value];
      }
      return v.format(message, {value: value});
    },
    email: v.extend(function(value, options) {
      options = v.extend({}, this.options, options);
      var message = options.message || this.message || "is not a valid email";
      // Empty values are fine
      if (!v.isDefined(value)) {
        return;
      }
      if (!v.isString(value)) {
        return message;
      }
      if (!this.PATTERN.exec(value)) {
        return message;
      }
    }, {
      PATTERN: /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/i
    }),
    equality: function(value, options, attribute, attributes, globalOptions) {
      if (!v.isDefined(value)) {
        return;
      }

      if (v.isString(options)) {
        options = {attribute: options};
      }
      options = v.extend({}, this.options, options);
      var message = options.message ||
        this.message ||
        "is not equal to %{attribute}";

      if (v.isEmpty(options.attribute) || !v.isString(options.attribute)) {
        throw new Error("The attribute must be a non empty string");
      }

      var otherValue = v.getDeepObjectValue(attributes, options.attribute)
        , comparator = options.comparator || function(v1, v2) {
          return v1 === v2;
        }
        , prettify = options.prettify ||
          (globalOptions && globalOptions.prettify) ||
          v.prettify;

      if (!comparator(value, otherValue, options, attribute, attributes)) {
        return v.format(message, {attribute: prettify(options.attribute)});
      }
    },
    // A URL validator that is used to validate URLs with the ability to
    // restrict schemes and some domains.
    url: function(value, options) {
      if (!v.isDefined(value)) {
        return;
      }

      options = v.extend({}, this.options, options);

      var message = options.message || this.message || "is not a valid url"
        , schemes = options.schemes || this.schemes || ['http', 'https']
        , allowLocal = options.allowLocal || this.allowLocal || false
        , allowDataUrl = options.allowDataUrl || this.allowDataUrl || false;
      if (!v.isString(value)) {
        return message;
      }

      // https://gist.github.com/dperini/729294
      var regex =
        "^" +
        // protocol identifier
        "(?:(?:" + schemes.join("|") + ")://)" +
        // user:pass authentication
        "(?:\\S+(?::\\S*)?@)?" +
        "(?:";

      var tld = "(?:\\.(?:[a-z\\u00a1-\\uffff]{2,}))";

      if (allowLocal) {
        tld += "?";
      } else {
        regex +=
          // IP address exclusion
          // private & local networks
          "(?!(?:10|127)(?:\\.\\d{1,3}){3})" +
          "(?!(?:169\\.254|192\\.168)(?:\\.\\d{1,3}){2})" +
          "(?!172\\.(?:1[6-9]|2\\d|3[0-1])(?:\\.\\d{1,3}){2})";
      }

      regex +=
          // IP address dotted notation octets
          // excludes loopback network 0.0.0.0
          // excludes reserved space >= 224.0.0.0
          // excludes network & broacast addresses
          // (first & last IP address of each class)
          "(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])" +
          "(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}" +
          "(?:\\.(?:[1-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))" +
        "|" +
          // host name
          "(?:(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)" +
          // domain name
          "(?:\\.(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)*" +
          tld +
        ")" +
        // port number
        "(?::\\d{2,5})?" +
        // resource path
        "(?:[/?#]\\S*)?" +
      "$";

      if (allowDataUrl) {
        // RFC 2397
        var mediaType = "\\w+\\/[-+.\\w]+(?:;[\\w=]+)*";
        var urlchar = "[A-Za-z0-9-_.!~\\*'();\\/?:@&=+$,%]*";
        var dataurl = "data:(?:"+mediaType+")?(?:;base64)?,"+urlchar;
        regex = "(?:"+regex+")|(?:^"+dataurl+"$)";
      }

      var PATTERN = new RegExp(regex, 'i');
      if (!PATTERN.exec(value)) {
        return message;
      }
    },
    type: v.extend(function(value, originalOptions, attribute, attributes, globalOptions) {
      if (v.isString(originalOptions)) {
        originalOptions = {type: originalOptions};
      }

      if (!v.isDefined(value)) {
        return;
      }

      var options = v.extend({}, this.options, originalOptions);

      var type = options.type;
      if (!v.isDefined(type)) {
        throw new Error("No type was specified");
      }

      var check;
      if (v.isFunction(type)) {
        check = type;
      } else {
        check = this.types[type];
      }

      if (!v.isFunction(check)) {
        throw new Error("validate.validators.type.types." + type + " must be a function.");
      }

      if (!check(value, options, attribute, attributes, globalOptions)) {
        var message = originalOptions.message ||
          this.messages[type] ||
          this.message ||
          options.message ||
          (v.isFunction(type) ? "must be of the correct type" : "must be of type %{type}");

        if (v.isFunction(message)) {
          message = message(value, originalOptions, attribute, attributes, globalOptions);
        }

        return v.format(message, {attribute: v.prettify(attribute), type: type});
      }
    }, {
      types: {
        object: function(value) {
          return v.isObject(value) && !v.isArray(value);
        },
        array: v.isArray,
        integer: v.isInteger,
        number: v.isNumber,
        string: v.isString,
        date: v.isDate,
        boolean: v.isBoolean
      },
      messages: {}
    })
  };

  validate.formatters = {
    detailed: function(errors) {return errors;},
    flat: v.flattenErrorsToArray,
    grouped: function(errors) {
      var attr;

      errors = v.groupErrorsByAttribute(errors);
      for (attr in errors) {
        errors[attr] = v.flattenErrorsToArray(errors[attr]);
      }
      return errors;
    },
    constraint: function(errors) {
      var attr;
      errors = v.groupErrorsByAttribute(errors);
      for (attr in errors) {
        errors[attr] = errors[attr].map(function(result) {
          return result.validator;
        }).sort();
      }
      return errors;
    }
  };

  validate.exposeModule(validate, this, exports, module, __webpack_require__(/*! !webpack amd define */ "./node_modules/webpack/buildin/amd-define.js"));
}).call(this,
         true ? /* istanbul ignore next */ exports : undefined,
         true ? /* istanbul ignore next */ module : undefined,
        __webpack_require__(/*! !webpack amd define */ "./node_modules/webpack/buildin/amd-define.js"));

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./node_modules/webpack/buildin/amd-define.js":
/*!***************************************!*\
  !*** (webpack)/buildin/amd-define.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function() {
	throw new Error("define cannot be used indirect");
};


/***/ }),

/***/ "./node_modules/webpack/buildin/module.js":
/*!***********************************!*\
  !*** (webpack)/buildin/module.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function(module) {
	if (!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if (!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vUmVzb3VyY2VzL1NjcmlwdHMvYXBwLnRzIiwid2VicGFjazovLy8uL1Jlc291cmNlcy9TY3JpcHRzL3NlcnZpY2VzL3ZhbGlkYXRvci50cyIsIndlYnBhY2s6Ly8vLi9SZXNvdXJjZXMvU3R5bGVzL2FwcC5zYXNzP2FkYjEiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2FwcGxpY2F0aW9uaW5zaWdodHMtanMvYnVuZGxlL2FpLm1vZHVsZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdmFsaWRhdGUuanMvdmFsaWRhdGUuanMiLCJ3ZWJwYWNrOi8vLyh3ZWJwYWNrKS9idWlsZGluL2FtZC1kZWZpbmUuanMiLCJ3ZWJwYWNrOi8vLyh3ZWJwYWNrKS9idWlsZGluL21vZHVsZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFH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YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMCk7XG4iLCJpbXBvcnQgeyBWYWxpZGF0b3IgfSBmcm9tICcuL3NlcnZpY2VzL3ZhbGlkYXRvcic7XHJcbmltcG9ydCB7IEFwcEluc2lnaHRzIH0gZnJvbSAnYXBwbGljYXRpb25pbnNpZ2h0cy1qcyc7XHJcblxyXG5jbGFzcyBBcHAge1xyXG5cclxuICAgIHByaXZhdGUgaGVhZGVyOiBIVE1MRWxlbWVudDtcclxuICAgIHByaXZhdGUgcGFnZVdyYXBwZXI6IEhUTUxFbGVtZW50O1xyXG4gICAgIFxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgaWYgKGRvY3VtZW50LnJlYWR5U3RhdGUgIT09ICdsb2FkaW5nJykge1xyXG4gICAgICAgICAgICB0aGlzLmluaXQoKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZSA9PiB0aGlzLmluaXQoKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgaW5pdCgpOiB2b2lkIHtcclxuXHJcbiAgICAgICAgdGhpcy5oZWFkZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdoZWFkZXIudG9wYmFyJyk7XHJcbiAgICAgICAgdGhpcy5wYWdlV3JhcHBlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucGFnZS13cmFwcGVyXCIpO1xyXG5cclxuICAgICAgICB0aGlzLnNldHVwQXBwSW5zaWdodHMoKTtcclxuICAgICAgICB0aGlzLnNldHVwTmF2YmFyKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzZXR1cEFwcEluc2lnaHRzKCk6IHZvaWQge1xyXG4gICAgICAgIHZhciBhcHBJbnNpZ2h0c0tleSA9IGRvY3VtZW50LmJvZHkuZGF0YXNldFsnYXBwSW5zaWdodHNLZXknXTtcclxuXHJcbiAgICAgICAgaWYgKGFwcEluc2lnaHRzS2V5ICYmIEFwcEluc2lnaHRzICYmIEFwcEluc2lnaHRzLmRvd25sb2FkQW5kU2V0dXAgJiYgQXBwSW5zaWdodHMudHJhY2tQYWdlVmlldykge1xyXG4gICAgICAgICAgICBBcHBJbnNpZ2h0cy5kb3dubG9hZEFuZFNldHVwKHsgaW5zdHJ1bWVudGF0aW9uS2V5OiBhcHBJbnNpZ2h0c0tleSB9KTtcclxuICAgICAgICAgICAgQXBwSW5zaWdodHMudHJhY2tQYWdlVmlldygpO1xyXG4gICAgICAgIH0gICAgICAgIFxyXG4gICAgICAgIGNvbnN0IGZvcm1zID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2Zvcm0nKTtcclxuICAgICAgICBBcnJheS5wcm90b3R5cGUuZm9yRWFjaC5jYWxsKGZvcm1zLCAoZm9ybTogYW55KSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHYgPSBuZXcgVmFsaWRhdG9yKGZvcm0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc2V0dXBOYXZiYXIoKTp2b2lkIHtcclxuICAgICAgICBjb25zdCBjb250ZXh0VGhpcyA9IHRoaXM7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKHRoaXMuaGVhZGVyKSB7XHJcbiAgICAgICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCAoKSA9PiBjb250ZXh0VGhpcy53aW5kb3dSZXNpemVMaXN0ZW5lcigpKVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm5hdi10b2dnbGVyJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC50b2dnbGUoJ3Nob3ctc2lkZWJhcicpO1xyXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm5hdi10b2dnbGVyIGknKS5jbGFzc0xpc3QudG9nZ2xlKCd0aS1tZW51Jyk7XHJcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubmF2LXRvZ2dsZXIgaScpLmNsYXNzTGlzdC5hZGQoXCJ0aS1jbG9zZVwiKTtcclxuICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgIHRoaXMud2luZG93UmVzaXplTGlzdGVuZXIoKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgd2luZG93UmVzaXplTGlzdGVuZXIoKTogdm9pZCB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdmFyIHdpZHRoID0gKHdpbmRvdy5pbm5lcldpZHRoID4gMCkgPyB3aW5kb3cuaW5uZXJXaWR0aCA6IHNjcmVlbi53aWR0aDtcclxuICAgICAgICB2YXIgdG9wT2Zmc2V0ID0gNzA7XHJcblxyXG4gICAgICAgIGlmICh3aWR0aCA8IDExNzApIHtcclxuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QuYWRkKCdtaW5pLXNpZGViYXInKVxyXG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubmF2YmFyLWJyYW5kIHNwYW4nKS5jbGFzc0xpc3QuYWRkKCdkLW5vbmUnKTtcclxuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zY3JvbGwtc2lkZWJhciwgLnNsaW1TY3JvbGxEaXZcIikuY2xhc3NMaXN0LmFkZCgnb3ZlcmZsb3ctYXV0bycpXHJcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2Nyb2xsLXNpZGViYXIsIC5zbGltU2Nyb2xsRGl2XCIpLnBhcmVudEVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnb3ZlcmZsb3ctaGlkZGVuJyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QucmVtb3ZlKCdtaW5pLXNpZGViYXInKTtcclxuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm5hdmJhci1icmFuZCBzcGFuJykuY2xhc3NMaXN0LnJlbW92ZSgnZC1ub25lJyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2YXIgaGVpZ2h0ID0gKCh3aW5kb3cuaW5uZXJIZWlnaHQgPiAwKSA/IHdpbmRvdy5pbm5lckhlaWdodCA6IHNjcmVlbi5oZWlnaHQpIC0gMTtcclxuICAgICAgICBoZWlnaHQgPSBoZWlnaHQgLSB0b3BPZmZzZXQ7XHJcbiAgICAgICAgaWYgKGhlaWdodCA8IDEpIGhlaWdodCA9IDE7XHJcbiAgICAgICAgaWYgKGhlaWdodCA+IHRvcE9mZnNldCkge1xyXG4gICAgICAgICAgICB0aGlzLnBhZ2VXcmFwcGVyLnN0eWxlLm1pbkhlaWdodCA9IGAkKGhlaWdodClweGA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IGhlYWRlckhlaWdodDogbnVtYmVyID0gdGhpcy5oZWFkZXIuY2xpZW50SGVpZ2h0O1xyXG4gICAgICAgIHRoaXMucGFnZVdyYXBwZXIuc3R5bGUucGFkZGluZ1RvcCA9ICBoZWFkZXJIZWlnaHQgKyAncHgnO1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG59XHJcblxyXG5sZXQgYXBwID0gbmV3IEFwcCgpOyIsImltcG9ydCAqIGFzIHZhbGlkYXRlIGZyb20gJ3ZhbGlkYXRlLmpzJztcclxuaW1wb3J0IHsgc3RyaW5naWZ5IH0gZnJvbSAncXVlcnlzdHJpbmcnO1xyXG5cclxuZXhwb3J0IGNsYXNzIFZhbGlkYXRvciB7XHJcbiAgICBwcml2YXRlIGZvcm06IEhUTUxGb3JtRWxlbWVudDtcclxuICAgIHByaXZhdGUgZm9ybVN1Ym1pdHRlZDpib29sZWFuXHJcbiAgICBwcml2YXRlIGVsZW1lbnRzOiBFbGVtZW50W107XHJcbiAgICBwcml2YXRlIGNvbnN0cmFpbnRzOiBhbnk7XHJcbiAgICBwcml2YXRlIGhhc1ZhbGlkYXRlZDogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGZvcm1RdWVyeTogc3RyaW5nIHwgSFRNTEZvcm1FbGVtZW50KSB7XHJcbiAgICAgICAgY29uc3QgY29udGV4dFRoaXMgPSB0aGlzO1xyXG4gICAgICAgIGlmIChmb3JtUXVlcnkuaXNQcm90b3R5cGVPZihTdHJpbmcpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoZm9ybVF1ZXJ5IGFzIHN0cmluZykgYXMgSFRNTEZvcm1FbGVtZW50O1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuZm9ybSA9IGZvcm1RdWVyeSBhcyBIVE1MRm9ybUVsZW1lbnQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghdGhpcy5mb3JtKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmZvcm0uZGF0YXNldFsnbm9WYWxpZGF0ZSddKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgIHRoaXMuY29uc3RyYWludHMgPSB7fTtcclxuICAgICAgICB0aGlzLmVsZW1lbnRzID0gW107XHJcbiAgICAgICAgdmFyIGVscyA9IHRoaXMuZm9ybS5xdWVyeVNlbGVjdG9yQWxsKCdpbnB1dDpub3QoW3R5cGU9XCJoaWRkZW5cIl0pLCB0ZXh0YXJlYScpO1xyXG4gICAgICAgIEFycmF5LnByb3RvdHlwZS5mb3JFYWNoLmNhbGwoZWxzLFxyXG4gICAgICAgICAgICAoZWxlbWVudDogSFRNTElucHV0RWxlbWVudCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgbGV0IG5lZWRzVmFsaWRhdGlvbjogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdmFyIGVsZW1lbnRJZCA9IGVsZW1lbnQuaWQ7XHJcbiAgICAgICAgICAgICAgICBpZiAoZWxlbWVudElkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudElkID0gZWxlbWVudElkLnJlcGxhY2UoJy4nLCAnXycpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRleHRUaGlzLmNvbnN0cmFpbnRzW2VsZW1lbnRJZF0gPSB7fTtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgaW4gZWxlbWVudC5kYXRhc2V0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAndmFsUmVxdWlyZWQnOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBuZWVkc1ZhbGlkYXRpb24gPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0VGhpcy5jb25zdHJhaW50c1tlbGVtZW50SWRdLnByZXNlbmNlID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogYF4ke2VsZW1lbnQuZGF0YXNldFtpXX1gXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlICd2YWxFbWFpbCc6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5lZWRzVmFsaWRhdGlvbiA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHRUaGlzLmNvbnN0cmFpbnRzW2VsZW1lbnRJZF0uZW1haWwgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiBgXiR7ZWxlbWVudC5kYXRhc2V0W2ldfWBcclxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAndmFsTWlubGVuZ3RoJzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmVlZHNWYWxpZGF0aW9uID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dFRoaXMuY29uc3RyYWludHNbZWxlbWVudElkXS5sZW5ndGggPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b29TaG9ydDogYF4ke2VsZW1lbnQuZGF0YXNldFtpXX1gLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWluaW11bTogcGFyc2VJbnQoZWxlbWVudC5kYXRhc2V0Wyd2YWxNaW5sZW5ndGhNaW4nXSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAndmFsRXF1YWx0byc6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5lZWRzVmFsaWRhdGlvbiA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlbGVtZW50LmRhdGFzZXRbJ3ZhbEVxdWFsdG9PdGhlciddLmNoYXJBdCgwKSA9PT0gJyonKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBzZWFyY2hUZXJtID0gZWxlbWVudC5kYXRhc2V0Wyd2YWxFcXVhbHRvT3RoZXInXS5yZXBsYWNlKCcqLicsICcuJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50LmRhdGFzZXRbJ3ZhbEVxdWFsdG9PdGhlciddID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW25hbWUqPVwiJyArIHNlYXJjaFRlcm0gKyAnXCJdJykuaWRcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0VGhpcy5jb25zdHJhaW50c1tlbGVtZW50SWRdLmVxdWFsaXR5ID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogYF4ke2VsZW1lbnQuZGF0YXNldFtpXX1gLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cmlidXRlOiBlbGVtZW50LmRhdGFzZXRbJ3ZhbEVxdWFsdG9PdGhlciddLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29tcGFyYXRvcjogKHYxOiBhbnksIHYyOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkodjEpID09PSBKU09OLnN0cmluZ2lmeSh2Mik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ3ZhbFJlZ2V4JzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmVlZHNWYWxpZGF0aW9uID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dFRoaXMuY29uc3RyYWludHNbZWxlbWVudElkXS5mb3JtYXQgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiBgXiR7ZWxlbWVudC5kYXRhc2V0W2ldfWAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXR0ZXJuOiBlbGVtZW50LmRhdGFzZXRbJ3ZhbFJlZ2V4UGF0dGVybiddLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmxhZ3M6ICdpJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKG5lZWRzVmFsaWRhdGlvbikge1xyXG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignYmx1cicsIChlKSA9PiB7IGNvbnRleHRUaGlzLmVsZW1lbnRDaGFuZ2UoZSk7IH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgKGUpID0+IHsgY29udGV4dFRoaXMuZWxlbWVudENoYW5nZShlKTsgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbGVtZW50cy5wdXNoKGVsZW1lbnQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLmZvcm0uYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgKGUpID0+IHsgY29udGV4dFRoaXMuZm9ybVN1Ym1pdChlKTsgfSk7XHJcbiAgICAgICAgdGhpcy5mb3JtU3VibWl0dGVkID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBlbGVtZW50Q2hhbmdlKGV2ZW50OiBFdmVudCk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLmhhc1ZhbGlkYXRlZCkge1xyXG4gICAgICAgICAgICB0aGlzLnBlcmZvcm1WYWxpZGF0aW9uKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZm9ybVN1Ym1pdChldmVudDogRXZlbnQpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5mb3JtLmRhdGFzZXRbJ25vVmFsaWRhdGUnXSlcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICB0aGlzLmhhc1ZhbGlkYXRlZCA9IHRydWU7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLnBlcmZvcm1WYWxpZGF0aW9uKCkpIHtcclxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5mb3JtU3VibWl0dGVkKSB7XHJcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuZm9ybVN1Ym1pdHRlZCA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBwZXJmb3JtVmFsaWRhdGlvbigpOiBhbnkge1xyXG4gICAgICAgIGNvbnN0IGZvcm1WYWx1ZXMgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHZhbGlkYXRlLmNvbGxlY3RGb3JtVmFsdWVzKHRoaXMuZm9ybSkpLnJlcGxhY2UoL1xcXFxcXFxcXFxcXFxcXFxcXC4vZywgJ18nKSk7XHJcbiAgICAgICAgY29uc3QgdmFsaWRhdGlvblJlc3VsdCA9IHZhbGlkYXRlKGZvcm1WYWx1ZXMsIHRoaXMuY29uc3RyYWludHMpO1xyXG4gICAgICAgIGNvbnN0IGNvbnRleHRUaGlzID0gdGhpcztcclxuICAgICAgICBBcnJheS5wcm90b3R5cGUuZm9yRWFjaC5jYWxsKHRoaXMuZWxlbWVudHMsXHJcbiAgICAgICAgICAgIChlbGVtZW50OiBIVE1MSW5wdXRFbGVtZW50KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb250ZXh0VGhpcy5kZWNvcmF0ZUVsZW1lbnQoZWxlbWVudCwgdmFsaWRhdGlvblJlc3VsdCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiB2YWxpZGF0aW9uUmVzdWx0O1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZGVjb3JhdGVFbGVtZW50KGVsZW1lbnQ6IEhUTUxJbnB1dEVsZW1lbnQsIHZhbGlkYXRpb25SZXN1bHQ6IGFueSkge1xyXG4gICAgICAgIGNvbnN0IGdyb3VwID0gZWxlbWVudC5jbG9zZXN0KCcuZm9ybS1ncm91cCcpO1xyXG4gICAgICAgIGdyb3VwLmNsYXNzTGlzdC5yZW1vdmUoJ2hhcy1zdWNjZXNzJyk7XHJcbiAgICAgICAgZ3JvdXAuY2xhc3NMaXN0LnJlbW92ZSgnaGFzLWVycm9yJyk7XHJcbiAgICAgICAgdmFyIGVsZW1lbnRJZCA9IGVsZW1lbnQuaWRcclxuICAgICAgICBpZiAoZWxlbWVudElkKSB7XHJcbiAgICAgICAgICAgIGVsZW1lbnRJZCA9IGVsZW1lbnRJZC5yZXBsYWNlKCcuJywgJ18nKTtcclxuICAgICAgICAgICAgY29uc3QgaGVscGJsb2NrID0gZ3JvdXAucXVlcnlTZWxlY3Rvcihgc3BhbltkYXRhLXZhbG1zZy1mb3JdYCk7XHJcbiAgICAgICAgICAgIGhlbHBibG9jay5pbm5lckhUTUwgPSAnJztcclxuICAgICAgICAgICAgaWYgKHZhbGlkYXRpb25SZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGl0ZW0gPSB2YWxpZGF0aW9uUmVzdWx0W2VsZW1lbnRJZF07XHJcbiAgICAgICAgICAgICAgICBpZiAoaXRlbSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGdyb3VwLmNsYXNzTGlzdC5hZGQoJ2hhcy1lcnJvcicpO1xyXG4gICAgICAgICAgICAgICAgICAgIGhlbHBibG9jay5pbm5lckhUTUwgPSBpdGVtWzBdO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBncm91cC5jbGFzc0xpc3QuYWRkKCdoYXMtc3VjY2VzcycpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgZ3JvdXAuY2xhc3NMaXN0LmFkZCgnaGFzLXN1Y2Nlc3MnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBcclxuICAgICAgICBcclxuICAgIH0gICAgXHJcbn0iLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW4iLCJcInVzZSBzdHJpY3RcIjtcclxudmFyIE1pY3Jvc29mdDtcclxuKGZ1bmN0aW9uIChNaWNyb3NvZnQpIHtcclxuICAgIHZhciBBcHBsaWNhdGlvbkluc2lnaHRzO1xyXG4gICAgKGZ1bmN0aW9uIChBcHBsaWNhdGlvbkluc2lnaHRzKSB7XHJcbiAgICAgICAgXCJ1c2Ugc3RyaWN0XCI7XHJcbiAgICB9KShBcHBsaWNhdGlvbkluc2lnaHRzID0gTWljcm9zb2Z0LkFwcGxpY2F0aW9uSW5zaWdodHMgfHwgKE1pY3Jvc29mdC5BcHBsaWNhdGlvbkluc2lnaHRzID0ge30pKTtcclxufSkoTWljcm9zb2Z0IHx8IChNaWNyb3NvZnQgPSB7fSkpO1xyXG4vLyBUSElTIEZJTEUgV0FTIEFVVE9HRU5FUkFURURcclxudmFyIE1pY3Jvc29mdDtcclxuKGZ1bmN0aW9uIChNaWNyb3NvZnQpIHtcclxuICAgIHZhciBUZWxlbWV0cnk7XHJcbiAgICAoZnVuY3Rpb24gKFRlbGVtZXRyeSkge1xyXG4gICAgICAgIFwidXNlIHN0cmljdFwiO1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIERhdGEgc3RydWN0IHRvIGNvbnRhaW4gb25seSBDIHNlY3Rpb24gd2l0aCBjdXN0b20gZmllbGRzLlxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHZhciBCYXNlID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBmdW5jdGlvbiBCYXNlKCkge1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBCYXNlO1xyXG4gICAgICAgIH0oKSk7XHJcbiAgICAgICAgVGVsZW1ldHJ5LkJhc2UgPSBCYXNlO1xyXG4gICAgfSkoVGVsZW1ldHJ5ID0gTWljcm9zb2Z0LlRlbGVtZXRyeSB8fCAoTWljcm9zb2Z0LlRlbGVtZXRyeSA9IHt9KSk7XHJcbn0pKE1pY3Jvc29mdCB8fCAoTWljcm9zb2Z0ID0ge30pKTtcclxuLy8gVEhJUyBGSUxFIFdBUyBBVVRPR0VORVJBVEVEXHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCJCYXNlLnRzXCIgLz5cclxudmFyIE1pY3Jvc29mdDtcclxuKGZ1bmN0aW9uIChNaWNyb3NvZnQpIHtcclxuICAgIHZhciBUZWxlbWV0cnk7XHJcbiAgICAoZnVuY3Rpb24gKFRlbGVtZXRyeSkge1xyXG4gICAgICAgIFwidXNlIHN0cmljdFwiO1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFN5c3RlbSB2YXJpYWJsZXMgZm9yIGEgdGVsZW1ldHJ5IGl0ZW0uXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdmFyIEVudmVsb3BlID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBmdW5jdGlvbiBFbnZlbG9wZSgpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudmVyID0gMTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2FtcGxlUmF0ZSA9IDEwMC4wO1xyXG4gICAgICAgICAgICAgICAgdGhpcy50YWdzID0ge307XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIEVudmVsb3BlO1xyXG4gICAgICAgIH0oKSk7XHJcbiAgICAgICAgVGVsZW1ldHJ5LkVudmVsb3BlID0gRW52ZWxvcGU7XHJcbiAgICB9KShUZWxlbWV0cnkgPSBNaWNyb3NvZnQuVGVsZW1ldHJ5IHx8IChNaWNyb3NvZnQuVGVsZW1ldHJ5ID0ge30pKTtcclxufSkoTWljcm9zb2Z0IHx8IChNaWNyb3NvZnQgPSB7fSkpO1xyXG52YXIgTWljcm9zb2Z0O1xyXG4oZnVuY3Rpb24gKE1pY3Jvc29mdCkge1xyXG4gICAgdmFyIEFwcGxpY2F0aW9uSW5zaWdodHM7XHJcbiAgICAoZnVuY3Rpb24gKEFwcGxpY2F0aW9uSW5zaWdodHMpIHtcclxuICAgICAgICB2YXIgQ29udGV4dDtcclxuICAgICAgICAoZnVuY3Rpb24gKENvbnRleHQpIHtcclxuICAgICAgICAgICAgXCJ1c2Ugc3RyaWN0XCI7XHJcbiAgICAgICAgfSkoQ29udGV4dCA9IEFwcGxpY2F0aW9uSW5zaWdodHMuQ29udGV4dCB8fCAoQXBwbGljYXRpb25JbnNpZ2h0cy5Db250ZXh0ID0ge30pKTtcclxuICAgIH0pKEFwcGxpY2F0aW9uSW5zaWdodHMgPSBNaWNyb3NvZnQuQXBwbGljYXRpb25JbnNpZ2h0cyB8fCAoTWljcm9zb2Z0LkFwcGxpY2F0aW9uSW5zaWdodHMgPSB7fSkpO1xyXG59KShNaWNyb3NvZnQgfHwgKE1pY3Jvc29mdCA9IHt9KSk7XHJcbnZhciBNaWNyb3NvZnQ7XHJcbihmdW5jdGlvbiAoTWljcm9zb2Z0KSB7XHJcbiAgICB2YXIgQXBwbGljYXRpb25JbnNpZ2h0cztcclxuICAgIChmdW5jdGlvbiAoQXBwbGljYXRpb25JbnNpZ2h0cykge1xyXG4gICAgICAgIHZhciBDb250ZXh0O1xyXG4gICAgICAgIChmdW5jdGlvbiAoQ29udGV4dCkge1xyXG4gICAgICAgICAgICBcInVzZSBzdHJpY3RcIjtcclxuICAgICAgICB9KShDb250ZXh0ID0gQXBwbGljYXRpb25JbnNpZ2h0cy5Db250ZXh0IHx8IChBcHBsaWNhdGlvbkluc2lnaHRzLkNvbnRleHQgPSB7fSkpO1xyXG4gICAgfSkoQXBwbGljYXRpb25JbnNpZ2h0cyA9IE1pY3Jvc29mdC5BcHBsaWNhdGlvbkluc2lnaHRzIHx8IChNaWNyb3NvZnQuQXBwbGljYXRpb25JbnNpZ2h0cyA9IHt9KSk7XHJcbn0pKE1pY3Jvc29mdCB8fCAoTWljcm9zb2Z0ID0ge30pKTtcclxudmFyIE1pY3Jvc29mdDtcclxuKGZ1bmN0aW9uIChNaWNyb3NvZnQpIHtcclxuICAgIHZhciBBcHBsaWNhdGlvbkluc2lnaHRzO1xyXG4gICAgKGZ1bmN0aW9uIChBcHBsaWNhdGlvbkluc2lnaHRzKSB7XHJcbiAgICAgICAgdmFyIENvbnRleHQ7XHJcbiAgICAgICAgKGZ1bmN0aW9uIChDb250ZXh0KSB7XHJcbiAgICAgICAgICAgIFwidXNlIHN0cmljdFwiO1xyXG4gICAgICAgIH0pKENvbnRleHQgPSBBcHBsaWNhdGlvbkluc2lnaHRzLkNvbnRleHQgfHwgKEFwcGxpY2F0aW9uSW5zaWdodHMuQ29udGV4dCA9IHt9KSk7XHJcbiAgICB9KShBcHBsaWNhdGlvbkluc2lnaHRzID0gTWljcm9zb2Z0LkFwcGxpY2F0aW9uSW5zaWdodHMgfHwgKE1pY3Jvc29mdC5BcHBsaWNhdGlvbkluc2lnaHRzID0ge30pKTtcclxufSkoTWljcm9zb2Z0IHx8IChNaWNyb3NvZnQgPSB7fSkpO1xyXG52YXIgTWljcm9zb2Z0O1xyXG4oZnVuY3Rpb24gKE1pY3Jvc29mdCkge1xyXG4gICAgdmFyIEFwcGxpY2F0aW9uSW5zaWdodHM7XHJcbiAgICAoZnVuY3Rpb24gKEFwcGxpY2F0aW9uSW5zaWdodHMpIHtcclxuICAgICAgICB2YXIgQ29udGV4dDtcclxuICAgICAgICAoZnVuY3Rpb24gKENvbnRleHQpIHtcclxuICAgICAgICAgICAgXCJ1c2Ugc3RyaWN0XCI7XHJcbiAgICAgICAgfSkoQ29udGV4dCA9IEFwcGxpY2F0aW9uSW5zaWdodHMuQ29udGV4dCB8fCAoQXBwbGljYXRpb25JbnNpZ2h0cy5Db250ZXh0ID0ge30pKTtcclxuICAgIH0pKEFwcGxpY2F0aW9uSW5zaWdodHMgPSBNaWNyb3NvZnQuQXBwbGljYXRpb25JbnNpZ2h0cyB8fCAoTWljcm9zb2Z0LkFwcGxpY2F0aW9uSW5zaWdodHMgPSB7fSkpO1xyXG59KShNaWNyb3NvZnQgfHwgKE1pY3Jvc29mdCA9IHt9KSk7XHJcbnZhciBNaWNyb3NvZnQ7XHJcbihmdW5jdGlvbiAoTWljcm9zb2Z0KSB7XHJcbiAgICB2YXIgQXBwbGljYXRpb25JbnNpZ2h0cztcclxuICAgIChmdW5jdGlvbiAoQXBwbGljYXRpb25JbnNpZ2h0cykge1xyXG4gICAgICAgIHZhciBDb250ZXh0O1xyXG4gICAgICAgIChmdW5jdGlvbiAoQ29udGV4dCkge1xyXG4gICAgICAgICAgICBcInVzZSBzdHJpY3RcIjtcclxuICAgICAgICB9KShDb250ZXh0ID0gQXBwbGljYXRpb25JbnNpZ2h0cy5Db250ZXh0IHx8IChBcHBsaWNhdGlvbkluc2lnaHRzLkNvbnRleHQgPSB7fSkpO1xyXG4gICAgfSkoQXBwbGljYXRpb25JbnNpZ2h0cyA9IE1pY3Jvc29mdC5BcHBsaWNhdGlvbkluc2lnaHRzIHx8IChNaWNyb3NvZnQuQXBwbGljYXRpb25JbnNpZ2h0cyA9IHt9KSk7XHJcbn0pKE1pY3Jvc29mdCB8fCAoTWljcm9zb2Z0ID0ge30pKTtcclxudmFyIE1pY3Jvc29mdDtcclxuKGZ1bmN0aW9uIChNaWNyb3NvZnQpIHtcclxuICAgIHZhciBBcHBsaWNhdGlvbkluc2lnaHRzO1xyXG4gICAgKGZ1bmN0aW9uIChBcHBsaWNhdGlvbkluc2lnaHRzKSB7XHJcbiAgICAgICAgdmFyIENvbnRleHQ7XHJcbiAgICAgICAgKGZ1bmN0aW9uIChDb250ZXh0KSB7XHJcbiAgICAgICAgICAgIFwidXNlIHN0cmljdFwiO1xyXG4gICAgICAgIH0pKENvbnRleHQgPSBBcHBsaWNhdGlvbkluc2lnaHRzLkNvbnRleHQgfHwgKEFwcGxpY2F0aW9uSW5zaWdodHMuQ29udGV4dCA9IHt9KSk7XHJcbiAgICB9KShBcHBsaWNhdGlvbkluc2lnaHRzID0gTWljcm9zb2Z0LkFwcGxpY2F0aW9uSW5zaWdodHMgfHwgKE1pY3Jvc29mdC5BcHBsaWNhdGlvbkluc2lnaHRzID0ge30pKTtcclxufSkoTWljcm9zb2Z0IHx8IChNaWNyb3NvZnQgPSB7fSkpO1xyXG52YXIgTWljcm9zb2Z0O1xyXG4oZnVuY3Rpb24gKE1pY3Jvc29mdCkge1xyXG4gICAgdmFyIEFwcGxpY2F0aW9uSW5zaWdodHM7XHJcbiAgICAoZnVuY3Rpb24gKEFwcGxpY2F0aW9uSW5zaWdodHMpIHtcclxuICAgICAgICB2YXIgQ29udGV4dDtcclxuICAgICAgICAoZnVuY3Rpb24gKENvbnRleHQpIHtcclxuICAgICAgICAgICAgXCJ1c2Ugc3RyaWN0XCI7XHJcbiAgICAgICAgfSkoQ29udGV4dCA9IEFwcGxpY2F0aW9uSW5zaWdodHMuQ29udGV4dCB8fCAoQXBwbGljYXRpb25JbnNpZ2h0cy5Db250ZXh0ID0ge30pKTtcclxuICAgIH0pKEFwcGxpY2F0aW9uSW5zaWdodHMgPSBNaWNyb3NvZnQuQXBwbGljYXRpb25JbnNpZ2h0cyB8fCAoTWljcm9zb2Z0LkFwcGxpY2F0aW9uSW5zaWdodHMgPSB7fSkpO1xyXG59KShNaWNyb3NvZnQgfHwgKE1pY3Jvc29mdCA9IHt9KSk7XHJcbnZhciBNaWNyb3NvZnQ7XHJcbihmdW5jdGlvbiAoTWljcm9zb2Z0KSB7XHJcbiAgICB2YXIgQXBwbGljYXRpb25JbnNpZ2h0cztcclxuICAgIChmdW5jdGlvbiAoQXBwbGljYXRpb25JbnNpZ2h0cykge1xyXG4gICAgICAgIHZhciBDb250ZXh0O1xyXG4gICAgICAgIChmdW5jdGlvbiAoQ29udGV4dCkge1xyXG4gICAgICAgICAgICBcInVzZSBzdHJpY3RcIjtcclxuICAgICAgICB9KShDb250ZXh0ID0gQXBwbGljYXRpb25JbnNpZ2h0cy5Db250ZXh0IHx8IChBcHBsaWNhdGlvbkluc2lnaHRzLkNvbnRleHQgPSB7fSkpO1xyXG4gICAgfSkoQXBwbGljYXRpb25JbnNpZ2h0cyA9IE1pY3Jvc29mdC5BcHBsaWNhdGlvbkluc2lnaHRzIHx8IChNaWNyb3NvZnQuQXBwbGljYXRpb25JbnNpZ2h0cyA9IHt9KSk7XHJcbn0pKE1pY3Jvc29mdCB8fCAoTWljcm9zb2Z0ID0ge30pKTtcclxudmFyIE1pY3Jvc29mdDtcclxuKGZ1bmN0aW9uIChNaWNyb3NvZnQpIHtcclxuICAgIHZhciBBcHBsaWNhdGlvbkluc2lnaHRzO1xyXG4gICAgKGZ1bmN0aW9uIChBcHBsaWNhdGlvbkluc2lnaHRzKSB7XHJcbiAgICAgICAgXCJ1c2Ugc3RyaWN0XCI7XHJcbiAgICB9KShBcHBsaWNhdGlvbkluc2lnaHRzID0gTWljcm9zb2Z0LkFwcGxpY2F0aW9uSW5zaWdodHMgfHwgKE1pY3Jvc29mdC5BcHBsaWNhdGlvbkluc2lnaHRzID0ge30pKTtcclxufSkoTWljcm9zb2Z0IHx8IChNaWNyb3NvZnQgPSB7fSkpO1xyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi9JU2VyaWFsaXphYmxlLnRzXCIgLz5cclxudmFyIE1pY3Jvc29mdDtcclxuKGZ1bmN0aW9uIChNaWNyb3NvZnQpIHtcclxuICAgIHZhciBBcHBsaWNhdGlvbkluc2lnaHRzO1xyXG4gICAgKGZ1bmN0aW9uIChBcHBsaWNhdGlvbkluc2lnaHRzKSB7XHJcbiAgICAgICAgXCJ1c2Ugc3RyaWN0XCI7XHJcbiAgICB9KShBcHBsaWNhdGlvbkluc2lnaHRzID0gTWljcm9zb2Z0LkFwcGxpY2F0aW9uSW5zaWdodHMgfHwgKE1pY3Jvc29mdC5BcHBsaWNhdGlvbkluc2lnaHRzID0ge30pKTtcclxufSkoTWljcm9zb2Z0IHx8IChNaWNyb3NvZnQgPSB7fSkpO1xyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi9Db250cmFjdHMvR2VuZXJhdGVkL0VudmVsb3BlLnRzXCIgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4vQ29udGV4dC9JQXBwbGljYXRpb24udHNcIi8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuL0NvbnRleHQvSURldmljZS50c1wiLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4vQ29udGV4dC9JSW50ZXJuYWwudHNcIi8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuL0NvbnRleHQvSUxvY2F0aW9uLnRzXCIvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi9Db250ZXh0L0lPcGVyYXRpb24udHNcIi8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuL0NvbnRleHQvSVNhbXBsZS50c1wiLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4vQ29udGV4dC9JVXNlci50c1wiLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4vQ29udGV4dC9JU2Vzc2lvbi50c1wiLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4vVGVsZW1ldHJ5L0lFbnZlbG9wZS50c1wiLz5cclxudmFyIE1pY3Jvc29mdDtcclxuKGZ1bmN0aW9uIChNaWNyb3NvZnQpIHtcclxuICAgIHZhciBBcHBsaWNhdGlvbkluc2lnaHRzO1xyXG4gICAgKGZ1bmN0aW9uIChBcHBsaWNhdGlvbkluc2lnaHRzKSB7XHJcbiAgICAgICAgXCJ1c2Ugc3RyaWN0XCI7XHJcbiAgICB9KShBcHBsaWNhdGlvbkluc2lnaHRzID0gTWljcm9zb2Z0LkFwcGxpY2F0aW9uSW5zaWdodHMgfHwgKE1pY3Jvc29mdC5BcHBsaWNhdGlvbkluc2lnaHRzID0ge30pKTtcclxufSkoTWljcm9zb2Z0IHx8IChNaWNyb3NvZnQgPSB7fSkpO1xyXG4vLyBUSElTIEZJTEUgV0FTIEFVVE9HRU5FUkFURURcclxudmFyIEFJO1xyXG4oZnVuY3Rpb24gKEFJKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuICAgIC8qKlxyXG4gICAgICogRGVmaW5lcyB0aGUgbGV2ZWwgb2Ygc2V2ZXJpdHkgZm9yIHRoZSBldmVudC5cclxuICAgICAqL1xyXG4gICAgdmFyIFNldmVyaXR5TGV2ZWw7XHJcbiAgICAoZnVuY3Rpb24gKFNldmVyaXR5TGV2ZWwpIHtcclxuICAgICAgICBTZXZlcml0eUxldmVsW1NldmVyaXR5TGV2ZWxbXCJWZXJib3NlXCJdID0gMF0gPSBcIlZlcmJvc2VcIjtcclxuICAgICAgICBTZXZlcml0eUxldmVsW1NldmVyaXR5TGV2ZWxbXCJJbmZvcm1hdGlvblwiXSA9IDFdID0gXCJJbmZvcm1hdGlvblwiO1xyXG4gICAgICAgIFNldmVyaXR5TGV2ZWxbU2V2ZXJpdHlMZXZlbFtcIldhcm5pbmdcIl0gPSAyXSA9IFwiV2FybmluZ1wiO1xyXG4gICAgICAgIFNldmVyaXR5TGV2ZWxbU2V2ZXJpdHlMZXZlbFtcIkVycm9yXCJdID0gM10gPSBcIkVycm9yXCI7XHJcbiAgICAgICAgU2V2ZXJpdHlMZXZlbFtTZXZlcml0eUxldmVsW1wiQ3JpdGljYWxcIl0gPSA0XSA9IFwiQ3JpdGljYWxcIjtcclxuICAgIH0pKFNldmVyaXR5TGV2ZWwgPSBBSS5TZXZlcml0eUxldmVsIHx8IChBSS5TZXZlcml0eUxldmVsID0ge30pKTtcclxufSkoQUkgfHwgKEFJID0ge30pKTtcclxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4vSUNvbmZpZy50c1wiIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuL0lUZWxlbWV0cnlDb250ZXh0LnRzXCIgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4vQ29udHJhY3RzL0dlbmVyYXRlZC9TZXZlcml0eUxldmVsLnRzXCIgLz5cclxudmFyIE1pY3Jvc29mdDtcclxuKGZ1bmN0aW9uIChNaWNyb3NvZnQpIHtcclxuICAgIHZhciBBcHBsaWNhdGlvbkluc2lnaHRzO1xyXG4gICAgKGZ1bmN0aW9uIChBcHBsaWNhdGlvbkluc2lnaHRzKSB7XHJcbiAgICAgICAgXCJ1c2Ugc3RyaWN0XCI7XHJcbiAgICB9KShBcHBsaWNhdGlvbkluc2lnaHRzID0gTWljcm9zb2Z0LkFwcGxpY2F0aW9uSW5zaWdodHMgfHwgKE1pY3Jvc29mdC5BcHBsaWNhdGlvbkluc2lnaHRzID0ge30pKTtcclxufSkoTWljcm9zb2Z0IHx8IChNaWNyb3NvZnQgPSB7fSkpO1xyXG52YXIgTWljcm9zb2Z0O1xyXG4oZnVuY3Rpb24gKE1pY3Jvc29mdCkge1xyXG4gICAgdmFyIEFwcGxpY2F0aW9uSW5zaWdodHM7XHJcbiAgICAoZnVuY3Rpb24gKEFwcGxpY2F0aW9uSW5zaWdodHMpIHtcclxuICAgICAgICBcInVzZSBzdHJpY3RcIjtcclxuICAgICAgICB2YXIgVXRpbEhlbHBlcnMgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIFV0aWxIZWxwZXJzKCkge1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgKiBnZW5lcmF0ZSByYW5kb20gaWQgc3RyaW5nXHJcbiAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICBVdGlsSGVscGVycy5uZXdJZCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHZhciBiYXNlNjRjaGFycyA9ICdBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWmFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6MDEyMzQ1Njc4OSsvJztcclxuICAgICAgICAgICAgICAgIHZhciByZXN1bHQgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgdmFyIHJhbmRvbSA9IE1hdGgucmFuZG9tKCkgKiAxMDczNzQxODI0OyAvLzUgc3ltYm9scyBpbiBiYXNlNjQsIGFsbW9zdCBtYXhpbnRcclxuICAgICAgICAgICAgICAgIHdoaWxlIChyYW5kb20gPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGNoYXIgPSBiYXNlNjRjaGFycy5jaGFyQXQocmFuZG9tICUgNjQpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCArPSBjaGFyO1xyXG4gICAgICAgICAgICAgICAgICAgIHJhbmRvbSA9IE1hdGguZmxvb3IocmFuZG9tIC8gNjQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgcmV0dXJuIFV0aWxIZWxwZXJzO1xyXG4gICAgICAgIH0oKSk7XHJcbiAgICAgICAgQXBwbGljYXRpb25JbnNpZ2h0cy5VdGlsSGVscGVycyA9IFV0aWxIZWxwZXJzO1xyXG4gICAgfSkoQXBwbGljYXRpb25JbnNpZ2h0cyA9IE1pY3Jvc29mdC5BcHBsaWNhdGlvbkluc2lnaHRzIHx8IChNaWNyb3NvZnQuQXBwbGljYXRpb25JbnNpZ2h0cyA9IHt9KSk7XHJcbn0pKE1pY3Jvc29mdCB8fCAoTWljcm9zb2Z0ID0ge30pKTtcclxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL0phdmFTY3JpcHRTREsuSW50ZXJmYWNlcy9JQ29uZmlnLnRzXCIvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vSmF2YVNjcmlwdFNESy5JbnRlcmZhY2VzL0lBcHBJbnNpZ2h0cy50c1wiLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL0phdmFTY3JpcHRTREsvVXRpbEhlbHBlcnMudHNcIi8+XHJcbmRlZmluZShcIkphdmFTY3JpcHRTREsuTW9kdWxlL0FwcEluc2lnaHRzTW9kdWxlXCIsIFtcInJlcXVpcmVcIiwgXCJleHBvcnRzXCJdLCBmdW5jdGlvbiAocmVxdWlyZSwgZXhwb3J0cykge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbiAgICB2YXIgQXBwSW5zaWdodHNNb2R1bGUgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgZnVuY3Rpb24gQXBwSW5zaWdodHNNb2R1bGUoKSB7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIEFwcEluc2lnaHRzTW9kdWxlLl9jcmVhdGVMYXp5TWV0aG9kID0gZnVuY3Rpb24gKG5hbWUpIHtcclxuICAgICAgICAgICAgdmFyIGFpT2JqZWN0ID0gd2luZG93W0FwcEluc2lnaHRzTW9kdWxlLmFwcEluc2lnaHRzTmFtZV07XHJcbiAgICAgICAgICAgIC8vIERlZmluZSBhIHRlbXBvcmFyeSBtZXRob2QgdGhhdCBxdWV1ZXMtdXAgYSB0aGUgcmVhbCBtZXRob2QgY2FsbFxyXG4gICAgICAgICAgICBhaU9iamVjdFtuYW1lXSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIC8vIENhcHR1cmUgdGhlIG9yaWdpbmFsIGFyZ3VtZW50cyBwYXNzZWQgdG8gdGhlIG1ldGhvZFxyXG4gICAgICAgICAgICAgICAgdmFyIG9yaWdpbmFsQXJndW1lbnRzID0gYXJndW1lbnRzO1xyXG4gICAgICAgICAgICAgICAgLy8gSWYgdGhlIHF1ZXVlIGlzIGF2YWlsYWJsZSwgaXQgbWVhbnMgdGhhdCB0aGUgZnVuY3Rpb24gd2Fzbid0IHlldCByZXBsYWNlZCB3aXRoIGFjdHVhbCBmdW5jdGlvbiB2YWx1ZVxyXG4gICAgICAgICAgICAgICAgaWYgKGFpT2JqZWN0LnF1ZXVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYWlPYmplY3QucXVldWUucHVzaChmdW5jdGlvbiAoKSB7IHJldHVybiBhaU9iamVjdFtuYW1lXS5hcHBseShhaU9iamVjdCwgb3JpZ2luYWxBcmd1bWVudHMpOyB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIG90aGVyd2lzZSBleGVjdXRlIHRoZSBmdW5jdGlvblxyXG4gICAgICAgICAgICAgICAgICAgIGFpT2JqZWN0W25hbWVdLmFwcGx5KGFpT2JqZWN0LCBvcmlnaW5hbEFyZ3VtZW50cyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfTtcclxuICAgICAgICA7XHJcbiAgICAgICAgQXBwSW5zaWdodHNNb2R1bGUuX2RlZmluZUxhenlNZXRob2RzID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgYWlPYmplY3QgPSB3aW5kb3dbQXBwSW5zaWdodHNNb2R1bGUuYXBwSW5zaWdodHNOYW1lXTtcclxuICAgICAgICAgICAgLy8gY2FwdHVyZSBpbml0aWFsIGNvb2tpZSBpZiBwb3NzaWJsZVxyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgYWlPYmplY3QuY29va2llID0gZG9jdW1lbnQuY29va2llO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgYWlPYmplY3QucXVldWUgPSBbXTtcclxuICAgICAgICAgICAgdmFyIG1ldGhvZCA9IFtcclxuICAgICAgICAgICAgICAgIFwiY2xlYXJBdXRoZW50aWNhdGVkVXNlckNvbnRleHRcIixcclxuICAgICAgICAgICAgICAgIFwiZmx1c2hcIixcclxuICAgICAgICAgICAgICAgIFwic2V0QXV0aGVudGljYXRlZFVzZXJDb250ZXh0XCIsXHJcbiAgICAgICAgICAgICAgICBcInN0YXJ0VHJhY2tFdmVudFwiLFxyXG4gICAgICAgICAgICAgICAgXCJzdGFydFRyYWNrUGFnZVwiLFxyXG4gICAgICAgICAgICAgICAgXCJzdG9wVHJhY2tFdmVudFwiLFxyXG4gICAgICAgICAgICAgICAgXCJzdG9wVHJhY2tQYWdlXCIsXHJcbiAgICAgICAgICAgICAgICBcInRyYWNrRGVwZW5kZW5jeVwiLFxyXG4gICAgICAgICAgICAgICAgXCJ0cmFja0V2ZW50XCIsXHJcbiAgICAgICAgICAgICAgICBcInRyYWNrRXhjZXB0aW9uXCIsXHJcbiAgICAgICAgICAgICAgICBcInRyYWNrTWV0cmljXCIsXHJcbiAgICAgICAgICAgICAgICBcInRyYWNrUGFnZVZpZXdcIixcclxuICAgICAgICAgICAgICAgIFwidHJhY2tUcmFjZVwiXHJcbiAgICAgICAgICAgIF07XHJcbiAgICAgICAgICAgIHdoaWxlIChtZXRob2QubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICBBcHBJbnNpZ2h0c01vZHVsZS5fY3JlYXRlTGF6eU1ldGhvZChtZXRob2QucG9wKCkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICBBcHBJbnNpZ2h0c01vZHVsZS5fZG93bmxvYWQgPSBmdW5jdGlvbiAoYWlDb25maWcpIHtcclxuICAgICAgICAgICAgQXBwSW5zaWdodHNNb2R1bGUuYXBwSW5zaWdodHNJbnN0YW5jZS5jb25maWcgPSBhaUNvbmZpZztcclxuICAgICAgICAgICAgdmFyIGFpT2JqZWN0ID0gd2luZG93W0FwcEluc2lnaHRzTW9kdWxlLmFwcEluc2lnaHRzTmFtZV07XHJcbiAgICAgICAgICAgIC8vIGlmIHNjcmlwdCB3YXMgcHJldmlvdXNseSBkb3dubG9hZGVkIGFuZCBpbml0aWFsaXplZCwgcXVldWUgd2lsbCBiZSBkZWxldGVkLCByZWluaXRpYWxpemUgaXRcclxuICAgICAgICAgICAgaWYgKCFhaU9iamVjdC5xdWV1ZSkge1xyXG4gICAgICAgICAgICAgICAgYWlPYmplY3QucXVldWUgPSBbXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHZhciBzY3JpcHRFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNjcmlwdFwiKTtcclxuICAgICAgICAgICAgICAgIHNjcmlwdEVsZW1lbnQuc3JjID0gYWlDb25maWcudXJsIHx8IFwiaHR0cHM6Ly9hejQxNjQyNi52by5tc2VjbmQubmV0L3NjcmlwdHMvYS9haS4wLmpzXCI7XHJcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKHNjcmlwdEVsZW1lbnQpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgLy8gY29sbGVjdCBnbG9iYWwgZXJyb3JzIGJ5IHdyYXBwaW5nIHRoZSB3aW5kb3cub25lcnJvciBtZXRob2RcclxuICAgICAgICAgICAgaWYgKCFhaUNvbmZpZy5kaXNhYmxlRXhjZXB0aW9uVHJhY2tpbmcpIHtcclxuICAgICAgICAgICAgICAgIHZhciBtZXRob2RfMSA9IFwib25lcnJvclwiO1xyXG4gICAgICAgICAgICAgICAgQXBwSW5zaWdodHNNb2R1bGUuX2NyZWF0ZUxhenlNZXRob2QoXCJfXCIgKyBtZXRob2RfMSk7XHJcbiAgICAgICAgICAgICAgICB2YXIgb3JpZ2luYWxPbkVycm9yID0gd2luZG93W21ldGhvZF8xXTtcclxuICAgICAgICAgICAgICAgIHdpbmRvd1ttZXRob2RfMV0gPSBmdW5jdGlvbiAobWVzc2FnZSwgdXJsLCBsaW5lTnVtYmVyLCBjb2x1bW5OdW1iZXIsIGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGhhbmRsZWQgPSBvcmlnaW5hbE9uRXJyb3IgJiYgb3JpZ2luYWxPbkVycm9yKG1lc3NhZ2UsIHVybCwgbGluZU51bWJlciwgY29sdW1uTnVtYmVyLCBlcnJvcik7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGhhbmRsZWQgIT09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWlPYmplY3RbXCJfXCIgKyBtZXRob2RfMV0obWVzc2FnZSwgdXJsLCBsaW5lTnVtYmVyLCBjb2x1bW5OdW1iZXIsIGVycm9yKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGhhbmRsZWQ7XHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQXBwSW5zaWdodHNNb2R1bGUsIFwiYXBwSW5zaWdodHNJbnN0YW5jZVwiLCB7XHJcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB3aW5kb3cgPT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKCF3aW5kb3dbQXBwSW5zaWdodHNNb2R1bGUuYXBwSW5zaWdodHNOYW1lXSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHdpbmRvd1tBcHBJbnNpZ2h0c01vZHVsZS5hcHBJbnNpZ2h0c05hbWVdID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkb3dubG9hZEFuZFNldHVwOiBBcHBJbnNpZ2h0c01vZHVsZS5fZG93bmxvYWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGV4cG9zaW5nIGl0IGZvciB1bml0IHRlc3RzIG9ubHksIG5vdCBwYXJ0IG9mIGludGVyZmFjZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBfZGVmaW5lTGF6eU1ldGhvZHM6IEFwcEluc2lnaHRzTW9kdWxlLl9kZWZpbmVMYXp5TWV0aG9kc1xyXG4gICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgQXBwSW5zaWdodHNNb2R1bGUuX2RlZmluZUxhenlNZXRob2RzKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gd2luZG93W0FwcEluc2lnaHRzTW9kdWxlLmFwcEluc2lnaHRzTmFtZV07XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIEFwcEluc2lnaHRzTW9kdWxlLmFwcEluc2lnaHRzSW5pdGlhbGl6ZWQgPSBmYWxzZTtcclxuICAgICAgICBBcHBJbnNpZ2h0c01vZHVsZS5hcHBJbnNpZ2h0c05hbWUgPSBcImFwcEluc2lnaHRzXCI7XHJcbiAgICAgICAgcmV0dXJuIEFwcEluc2lnaHRzTW9kdWxlO1xyXG4gICAgfSgpKTtcclxuICAgIGV4cG9ydHMuQXBwSW5zaWdodHMgPSBBcHBJbnNpZ2h0c01vZHVsZS5hcHBJbnNpZ2h0c0luc3RhbmNlO1xyXG59KTtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YWkubW9kdWxlLmpzLm1hcCIsIi8qIVxuICogdmFsaWRhdGUuanMgMC4xMy4xXG4gKlxuICogKGMpIDIwMTMtMjAxOSBOaWNrbGFzIEFuc21hbiwgMjAxMyBXcmFwcFxuICogVmFsaWRhdGUuanMgbWF5IGJlIGZyZWVseSBkaXN0cmlidXRlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UuXG4gKiBGb3IgYWxsIGRldGFpbHMgYW5kIGRvY3VtZW50YXRpb246XG4gKiBodHRwOi8vdmFsaWRhdGVqcy5vcmcvXG4gKi9cblxuKGZ1bmN0aW9uKGV4cG9ydHMsIG1vZHVsZSwgZGVmaW5lKSB7XG4gIFwidXNlIHN0cmljdFwiO1xuXG4gIC8vIFRoZSBtYWluIGZ1bmN0aW9uIHRoYXQgY2FsbHMgdGhlIHZhbGlkYXRvcnMgc3BlY2lmaWVkIGJ5IHRoZSBjb25zdHJhaW50cy5cbiAgLy8gVGhlIG9wdGlvbnMgYXJlIHRoZSBmb2xsb3dpbmc6XG4gIC8vICAgLSBmb3JtYXQgKHN0cmluZykgLSBBbiBvcHRpb24gdGhhdCBjb250cm9scyBob3cgdGhlIHJldHVybmVkIHZhbHVlIGlzIGZvcm1hdHRlZFxuICAvLyAgICAgKiBmbGF0IC0gUmV0dXJucyBhIGZsYXQgYXJyYXkgb2YganVzdCB0aGUgZXJyb3IgbWVzc2FnZXNcbiAgLy8gICAgICogZ3JvdXBlZCAtIFJldHVybnMgdGhlIG1lc3NhZ2VzIGdyb3VwZWQgYnkgYXR0cmlidXRlIChkZWZhdWx0KVxuICAvLyAgICAgKiBkZXRhaWxlZCAtIFJldHVybnMgYW4gYXJyYXkgb2YgdGhlIHJhdyB2YWxpZGF0aW9uIGRhdGFcbiAgLy8gICAtIGZ1bGxNZXNzYWdlcyAoYm9vbGVhbikgLSBJZiBgdHJ1ZWAgKGRlZmF1bHQpIHRoZSBhdHRyaWJ1dGUgbmFtZSBpcyBwcmVwZW5kZWQgdG8gdGhlIGVycm9yLlxuICAvL1xuICAvLyBQbGVhc2Ugbm90ZSB0aGF0IHRoZSBvcHRpb25zIGFyZSBhbHNvIHBhc3NlZCB0byBlYWNoIHZhbGlkYXRvci5cbiAgdmFyIHZhbGlkYXRlID0gZnVuY3Rpb24oYXR0cmlidXRlcywgY29uc3RyYWludHMsIG9wdGlvbnMpIHtcbiAgICBvcHRpb25zID0gdi5leHRlbmQoe30sIHYub3B0aW9ucywgb3B0aW9ucyk7XG5cbiAgICB2YXIgcmVzdWx0cyA9IHYucnVuVmFsaWRhdGlvbnMoYXR0cmlidXRlcywgY29uc3RyYWludHMsIG9wdGlvbnMpXG4gICAgICAsIGF0dHJcbiAgICAgICwgdmFsaWRhdG9yO1xuXG4gICAgaWYgKHJlc3VsdHMuc29tZShmdW5jdGlvbihyKSB7IHJldHVybiB2LmlzUHJvbWlzZShyLmVycm9yKTsgfSkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIlVzZSB2YWxpZGF0ZS5hc3luYyBpZiB5b3Ugd2FudCBzdXBwb3J0IGZvciBwcm9taXNlc1wiKTtcbiAgICB9XG4gICAgcmV0dXJuIHZhbGlkYXRlLnByb2Nlc3NWYWxpZGF0aW9uUmVzdWx0cyhyZXN1bHRzLCBvcHRpb25zKTtcbiAgfTtcblxuICB2YXIgdiA9IHZhbGlkYXRlO1xuXG4gIC8vIENvcGllcyBvdmVyIGF0dHJpYnV0ZXMgZnJvbSBvbmUgb3IgbW9yZSBzb3VyY2VzIHRvIGEgc2luZ2xlIGRlc3RpbmF0aW9uLlxuICAvLyBWZXJ5IG11Y2ggc2ltaWxhciB0byB1bmRlcnNjb3JlJ3MgZXh0ZW5kLlxuICAvLyBUaGUgZmlyc3QgYXJndW1lbnQgaXMgdGhlIHRhcmdldCBvYmplY3QgYW5kIHRoZSByZW1haW5pbmcgYXJndW1lbnRzIHdpbGwgYmVcbiAgLy8gdXNlZCBhcyBzb3VyY2VzLlxuICB2LmV4dGVuZCA9IGZ1bmN0aW9uKG9iaikge1xuICAgIFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKS5mb3JFYWNoKGZ1bmN0aW9uKHNvdXJjZSkge1xuICAgICAgZm9yICh2YXIgYXR0ciBpbiBzb3VyY2UpIHtcbiAgICAgICAgb2JqW2F0dHJdID0gc291cmNlW2F0dHJdO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBvYmo7XG4gIH07XG5cbiAgdi5leHRlbmQodmFsaWRhdGUsIHtcbiAgICAvLyBUaGlzIGlzIHRoZSB2ZXJzaW9uIG9mIHRoZSBsaWJyYXJ5IGFzIGEgc2VtdmVyLlxuICAgIC8vIFRoZSB0b1N0cmluZyBmdW5jdGlvbiB3aWxsIGFsbG93IGl0IHRvIGJlIGNvZXJjZWQgaW50byBhIHN0cmluZ1xuICAgIHZlcnNpb246IHtcbiAgICAgIG1ham9yOiAwLFxuICAgICAgbWlub3I6IDEzLFxuICAgICAgcGF0Y2g6IDEsXG4gICAgICBtZXRhZGF0YTogbnVsbCxcbiAgICAgIHRvU3RyaW5nOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHZlcnNpb24gPSB2LmZvcm1hdChcIiV7bWFqb3J9LiV7bWlub3J9LiV7cGF0Y2h9XCIsIHYudmVyc2lvbik7XG4gICAgICAgIGlmICghdi5pc0VtcHR5KHYudmVyc2lvbi5tZXRhZGF0YSkpIHtcbiAgICAgICAgICB2ZXJzaW9uICs9IFwiK1wiICsgdi52ZXJzaW9uLm1ldGFkYXRhO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB2ZXJzaW9uO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICAvLyBCZWxvdyBpcyB0aGUgZGVwZW5kZW5jaWVzIHRoYXQgYXJlIHVzZWQgaW4gdmFsaWRhdGUuanNcblxuICAgIC8vIFRoZSBjb25zdHJ1Y3RvciBvZiB0aGUgUHJvbWlzZSBpbXBsZW1lbnRhdGlvbi5cbiAgICAvLyBJZiB5b3UgYXJlIHVzaW5nIFEuanMsIFJTVlAgb3IgYW55IG90aGVyIEErIGNvbXBhdGlibGUgaW1wbGVtZW50YXRpb25cbiAgICAvLyBvdmVycmlkZSB0aGlzIGF0dHJpYnV0ZSB0byBiZSB0aGUgY29uc3RydWN0b3Igb2YgdGhhdCBwcm9taXNlLlxuICAgIC8vIFNpbmNlIGpRdWVyeSBwcm9taXNlcyBhcmVuJ3QgQSsgY29tcGF0aWJsZSB0aGV5IHdvbid0IHdvcmsuXG4gICAgUHJvbWlzZTogdHlwZW9mIFByb21pc2UgIT09IFwidW5kZWZpbmVkXCIgPyBQcm9taXNlIDogLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi8gbnVsbCxcblxuICAgIEVNUFRZX1NUUklOR19SRUdFWFA6IC9eXFxzKiQvLFxuXG4gICAgLy8gUnVucyB0aGUgdmFsaWRhdG9ycyBzcGVjaWZpZWQgYnkgdGhlIGNvbnN0cmFpbnRzIG9iamVjdC5cbiAgICAvLyBXaWxsIHJldHVybiBhbiBhcnJheSBvZiB0aGUgZm9ybWF0OlxuICAgIC8vICAgICBbe2F0dHJpYnV0ZTogXCI8YXR0cmlidXRlIG5hbWU+XCIsIGVycm9yOiBcIjx2YWxpZGF0aW9uIHJlc3VsdD5cIn0sIC4uLl1cbiAgICBydW5WYWxpZGF0aW9uczogZnVuY3Rpb24oYXR0cmlidXRlcywgY29uc3RyYWludHMsIG9wdGlvbnMpIHtcbiAgICAgIHZhciByZXN1bHRzID0gW11cbiAgICAgICAgLCBhdHRyXG4gICAgICAgICwgdmFsaWRhdG9yTmFtZVxuICAgICAgICAsIHZhbHVlXG4gICAgICAgICwgdmFsaWRhdG9yc1xuICAgICAgICAsIHZhbGlkYXRvclxuICAgICAgICAsIHZhbGlkYXRvck9wdGlvbnNcbiAgICAgICAgLCBlcnJvcjtcblxuICAgICAgaWYgKHYuaXNEb21FbGVtZW50KGF0dHJpYnV0ZXMpIHx8IHYuaXNKcXVlcnlFbGVtZW50KGF0dHJpYnV0ZXMpKSB7XG4gICAgICAgIGF0dHJpYnV0ZXMgPSB2LmNvbGxlY3RGb3JtVmFsdWVzKGF0dHJpYnV0ZXMpO1xuICAgICAgfVxuXG4gICAgICAvLyBMb29wcyB0aHJvdWdoIGVhY2ggY29uc3RyYWludHMsIGZpbmRzIHRoZSBjb3JyZWN0IHZhbGlkYXRvciBhbmQgcnVuIGl0LlxuICAgICAgZm9yIChhdHRyIGluIGNvbnN0cmFpbnRzKSB7XG4gICAgICAgIHZhbHVlID0gdi5nZXREZWVwT2JqZWN0VmFsdWUoYXR0cmlidXRlcywgYXR0cik7XG4gICAgICAgIC8vIFRoaXMgYWxsb3dzIHRoZSBjb25zdHJhaW50cyBmb3IgYW4gYXR0cmlidXRlIHRvIGJlIGEgZnVuY3Rpb24uXG4gICAgICAgIC8vIFRoZSBmdW5jdGlvbiB3aWxsIGJlIGNhbGxlZCB3aXRoIHRoZSB2YWx1ZSwgYXR0cmlidXRlIG5hbWUsIHRoZSBjb21wbGV0ZSBkaWN0IG9mXG4gICAgICAgIC8vIGF0dHJpYnV0ZXMgYXMgd2VsbCBhcyB0aGUgb3B0aW9ucyBhbmQgY29uc3RyYWludHMgcGFzc2VkIGluLlxuICAgICAgICAvLyBUaGlzIGlzIHVzZWZ1bCB3aGVuIHlvdSB3YW50IHRvIGhhdmUgZGlmZmVyZW50XG4gICAgICAgIC8vIHZhbGlkYXRpb25zIGRlcGVuZGluZyBvbiB0aGUgYXR0cmlidXRlIHZhbHVlLlxuICAgICAgICB2YWxpZGF0b3JzID0gdi5yZXN1bHQoY29uc3RyYWludHNbYXR0cl0sIHZhbHVlLCBhdHRyaWJ1dGVzLCBhdHRyLCBvcHRpb25zLCBjb25zdHJhaW50cyk7XG5cbiAgICAgICAgZm9yICh2YWxpZGF0b3JOYW1lIGluIHZhbGlkYXRvcnMpIHtcbiAgICAgICAgICB2YWxpZGF0b3IgPSB2LnZhbGlkYXRvcnNbdmFsaWRhdG9yTmFtZV07XG5cbiAgICAgICAgICBpZiAoIXZhbGlkYXRvcikge1xuICAgICAgICAgICAgZXJyb3IgPSB2LmZvcm1hdChcIlVua25vd24gdmFsaWRhdG9yICV7bmFtZX1cIiwge25hbWU6IHZhbGlkYXRvck5hbWV9KTtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihlcnJvcik7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdmFsaWRhdG9yT3B0aW9ucyA9IHZhbGlkYXRvcnNbdmFsaWRhdG9yTmFtZV07XG4gICAgICAgICAgLy8gVGhpcyBhbGxvd3MgdGhlIG9wdGlvbnMgdG8gYmUgYSBmdW5jdGlvbi4gVGhlIGZ1bmN0aW9uIHdpbGwgYmVcbiAgICAgICAgICAvLyBjYWxsZWQgd2l0aCB0aGUgdmFsdWUsIGF0dHJpYnV0ZSBuYW1lLCB0aGUgY29tcGxldGUgZGljdCBvZlxuICAgICAgICAgIC8vIGF0dHJpYnV0ZXMgYXMgd2VsbCBhcyB0aGUgb3B0aW9ucyBhbmQgY29uc3RyYWludHMgcGFzc2VkIGluLlxuICAgICAgICAgIC8vIFRoaXMgaXMgdXNlZnVsIHdoZW4geW91IHdhbnQgdG8gaGF2ZSBkaWZmZXJlbnRcbiAgICAgICAgICAvLyB2YWxpZGF0aW9ucyBkZXBlbmRpbmcgb24gdGhlIGF0dHJpYnV0ZSB2YWx1ZS5cbiAgICAgICAgICB2YWxpZGF0b3JPcHRpb25zID0gdi5yZXN1bHQodmFsaWRhdG9yT3B0aW9ucywgdmFsdWUsIGF0dHJpYnV0ZXMsIGF0dHIsIG9wdGlvbnMsIGNvbnN0cmFpbnRzKTtcbiAgICAgICAgICBpZiAoIXZhbGlkYXRvck9wdGlvbnMpIHtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXN1bHRzLnB1c2goe1xuICAgICAgICAgICAgYXR0cmlidXRlOiBhdHRyLFxuICAgICAgICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgICAgICAgdmFsaWRhdG9yOiB2YWxpZGF0b3JOYW1lLFxuICAgICAgICAgICAgZ2xvYmFsT3B0aW9uczogb3B0aW9ucyxcbiAgICAgICAgICAgIGF0dHJpYnV0ZXM6IGF0dHJpYnV0ZXMsXG4gICAgICAgICAgICBvcHRpb25zOiB2YWxpZGF0b3JPcHRpb25zLFxuICAgICAgICAgICAgZXJyb3I6IHZhbGlkYXRvci5jYWxsKHZhbGlkYXRvcixcbiAgICAgICAgICAgICAgICB2YWx1ZSxcbiAgICAgICAgICAgICAgICB2YWxpZGF0b3JPcHRpb25zLFxuICAgICAgICAgICAgICAgIGF0dHIsXG4gICAgICAgICAgICAgICAgYXR0cmlidXRlcyxcbiAgICAgICAgICAgICAgICBvcHRpb25zKVxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiByZXN1bHRzO1xuICAgIH0sXG5cbiAgICAvLyBUYWtlcyB0aGUgb3V0cHV0IGZyb20gcnVuVmFsaWRhdGlvbnMgYW5kIGNvbnZlcnRzIGl0IHRvIHRoZSBjb3JyZWN0XG4gICAgLy8gb3V0cHV0IGZvcm1hdC5cbiAgICBwcm9jZXNzVmFsaWRhdGlvblJlc3VsdHM6IGZ1bmN0aW9uKGVycm9ycywgb3B0aW9ucykge1xuICAgICAgZXJyb3JzID0gdi5wcnVuZUVtcHR5RXJyb3JzKGVycm9ycywgb3B0aW9ucyk7XG4gICAgICBlcnJvcnMgPSB2LmV4cGFuZE11bHRpcGxlRXJyb3JzKGVycm9ycywgb3B0aW9ucyk7XG4gICAgICBlcnJvcnMgPSB2LmNvbnZlcnRFcnJvck1lc3NhZ2VzKGVycm9ycywgb3B0aW9ucyk7XG5cbiAgICAgIHZhciBmb3JtYXQgPSBvcHRpb25zLmZvcm1hdCB8fCBcImdyb3VwZWRcIjtcblxuICAgICAgaWYgKHR5cGVvZiB2LmZvcm1hdHRlcnNbZm9ybWF0XSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBlcnJvcnMgPSB2LmZvcm1hdHRlcnNbZm9ybWF0XShlcnJvcnMpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKHYuZm9ybWF0KFwiVW5rbm93biBmb3JtYXQgJXtmb3JtYXR9XCIsIG9wdGlvbnMpKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHYuaXNFbXB0eShlcnJvcnMpID8gdW5kZWZpbmVkIDogZXJyb3JzO1xuICAgIH0sXG5cbiAgICAvLyBSdW5zIHRoZSB2YWxpZGF0aW9ucyB3aXRoIHN1cHBvcnQgZm9yIHByb21pc2VzLlxuICAgIC8vIFRoaXMgZnVuY3Rpb24gd2lsbCByZXR1cm4gYSBwcm9taXNlIHRoYXQgaXMgc2V0dGxlZCB3aGVuIGFsbCB0aGVcbiAgICAvLyB2YWxpZGF0aW9uIHByb21pc2VzIGhhdmUgYmVlbiBjb21wbGV0ZWQuXG4gICAgLy8gSXQgY2FuIGJlIGNhbGxlZCBldmVuIGlmIG5vIHZhbGlkYXRpb25zIHJldHVybmVkIGEgcHJvbWlzZS5cbiAgICBhc3luYzogZnVuY3Rpb24oYXR0cmlidXRlcywgY29uc3RyYWludHMsIG9wdGlvbnMpIHtcbiAgICAgIG9wdGlvbnMgPSB2LmV4dGVuZCh7fSwgdi5hc3luYy5vcHRpb25zLCBvcHRpb25zKTtcblxuICAgICAgdmFyIFdyYXBFcnJvcnMgPSBvcHRpb25zLndyYXBFcnJvcnMgfHwgZnVuY3Rpb24oZXJyb3JzKSB7XG4gICAgICAgIHJldHVybiBlcnJvcnM7XG4gICAgICB9O1xuXG4gICAgICAvLyBSZW1vdmVzIHVua25vd24gYXR0cmlidXRlc1xuICAgICAgaWYgKG9wdGlvbnMuY2xlYW5BdHRyaWJ1dGVzICE9PSBmYWxzZSkge1xuICAgICAgICBhdHRyaWJ1dGVzID0gdi5jbGVhbkF0dHJpYnV0ZXMoYXR0cmlidXRlcywgY29uc3RyYWludHMpO1xuICAgICAgfVxuXG4gICAgICB2YXIgcmVzdWx0cyA9IHYucnVuVmFsaWRhdGlvbnMoYXR0cmlidXRlcywgY29uc3RyYWludHMsIG9wdGlvbnMpO1xuXG4gICAgICByZXR1cm4gbmV3IHYuUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgdi53YWl0Rm9yUmVzdWx0cyhyZXN1bHRzKS50aGVuKGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHZhciBlcnJvcnMgPSB2LnByb2Nlc3NWYWxpZGF0aW9uUmVzdWx0cyhyZXN1bHRzLCBvcHRpb25zKTtcbiAgICAgICAgICBpZiAoZXJyb3JzKSB7XG4gICAgICAgICAgICByZWplY3QobmV3IFdyYXBFcnJvcnMoZXJyb3JzLCBvcHRpb25zLCBhdHRyaWJ1dGVzLCBjb25zdHJhaW50cykpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXNvbHZlKGF0dHJpYnV0ZXMpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSwgZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSxcblxuICAgIHNpbmdsZTogZnVuY3Rpb24odmFsdWUsIGNvbnN0cmFpbnRzLCBvcHRpb25zKSB7XG4gICAgICBvcHRpb25zID0gdi5leHRlbmQoe30sIHYuc2luZ2xlLm9wdGlvbnMsIG9wdGlvbnMsIHtcbiAgICAgICAgZm9ybWF0OiBcImZsYXRcIixcbiAgICAgICAgZnVsbE1lc3NhZ2VzOiBmYWxzZVxuICAgICAgfSk7XG4gICAgICByZXR1cm4gdih7c2luZ2xlOiB2YWx1ZX0sIHtzaW5nbGU6IGNvbnN0cmFpbnRzfSwgb3B0aW9ucyk7XG4gICAgfSxcblxuICAgIC8vIFJldHVybnMgYSBwcm9taXNlIHRoYXQgaXMgcmVzb2x2ZWQgd2hlbiBhbGwgcHJvbWlzZXMgaW4gdGhlIHJlc3VsdHMgYXJyYXlcbiAgICAvLyBhcmUgc2V0dGxlZC4gVGhlIHByb21pc2UgcmV0dXJuZWQgZnJvbSB0aGlzIGZ1bmN0aW9uIGlzIGFsd2F5cyByZXNvbHZlZCxcbiAgICAvLyBuZXZlciByZWplY3RlZC5cbiAgICAvLyBUaGlzIGZ1bmN0aW9uIG1vZGlmaWVzIHRoZSBpbnB1dCBhcmd1bWVudCwgaXQgcmVwbGFjZXMgdGhlIHByb21pc2VzXG4gICAgLy8gd2l0aCB0aGUgdmFsdWUgcmV0dXJuZWQgZnJvbSB0aGUgcHJvbWlzZS5cbiAgICB3YWl0Rm9yUmVzdWx0czogZnVuY3Rpb24ocmVzdWx0cykge1xuICAgICAgLy8gQ3JlYXRlIGEgc2VxdWVuY2Ugb2YgYWxsIHRoZSByZXN1bHRzIHN0YXJ0aW5nIHdpdGggYSByZXNvbHZlZCBwcm9taXNlLlxuICAgICAgcmV0dXJuIHJlc3VsdHMucmVkdWNlKGZ1bmN0aW9uKG1lbW8sIHJlc3VsdCkge1xuICAgICAgICAvLyBJZiB0aGlzIHJlc3VsdCBpc24ndCBhIHByb21pc2Ugc2tpcCBpdCBpbiB0aGUgc2VxdWVuY2UuXG4gICAgICAgIGlmICghdi5pc1Byb21pc2UocmVzdWx0LmVycm9yKSkge1xuICAgICAgICAgIHJldHVybiBtZW1vO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG1lbW8udGhlbihmdW5jdGlvbigpIHtcbiAgICAgICAgICByZXR1cm4gcmVzdWx0LmVycm9yLnRoZW4oZnVuY3Rpb24oZXJyb3IpIHtcbiAgICAgICAgICAgIHJlc3VsdC5lcnJvciA9IGVycm9yIHx8IG51bGw7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgfSwgbmV3IHYuUHJvbWlzZShmdW5jdGlvbihyKSB7IHIoKTsgfSkpOyAvLyBBIHJlc29sdmVkIHByb21pc2VcbiAgICB9LFxuXG4gICAgLy8gSWYgdGhlIGdpdmVuIGFyZ3VtZW50IGlzIGEgY2FsbDogZnVuY3Rpb24gdGhlIGFuZDogZnVuY3Rpb24gcmV0dXJuIHRoZSB2YWx1ZVxuICAgIC8vIG90aGVyd2lzZSBqdXN0IHJldHVybiB0aGUgdmFsdWUuIEFkZGl0aW9uYWwgYXJndW1lbnRzIHdpbGwgYmUgcGFzc2VkIGFzXG4gICAgLy8gYXJndW1lbnRzIHRvIHRoZSBmdW5jdGlvbi5cbiAgICAvLyBFeGFtcGxlOlxuICAgIC8vIGBgYFxuICAgIC8vIHJlc3VsdCgnZm9vJykgLy8gJ2ZvbydcbiAgICAvLyByZXN1bHQoTWF0aC5tYXgsIDEsIDIpIC8vIDJcbiAgICAvLyBgYGBcbiAgICByZXN1bHQ6IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICB2YXIgYXJncyA9IFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKTtcbiAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgdmFsdWUgPSB2YWx1ZS5hcHBseShudWxsLCBhcmdzKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9LFxuXG4gICAgLy8gQ2hlY2tzIGlmIHRoZSB2YWx1ZSBpcyBhIG51bWJlci4gVGhpcyBmdW5jdGlvbiBkb2VzIG5vdCBjb25zaWRlciBOYU4gYVxuICAgIC8vIG51bWJlciBsaWtlIG1hbnkgb3RoZXIgYGlzTnVtYmVyYCBmdW5jdGlvbnMgZG8uXG4gICAgaXNOdW1iZXI6IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJyAmJiAhaXNOYU4odmFsdWUpO1xuICAgIH0sXG5cbiAgICAvLyBSZXR1cm5zIGZhbHNlIGlmIHRoZSBvYmplY3QgaXMgbm90IGEgZnVuY3Rpb25cbiAgICBpc0Z1bmN0aW9uOiBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gJ2Z1bmN0aW9uJztcbiAgICB9LFxuXG4gICAgLy8gQSBzaW1wbGUgY2hlY2sgdG8gdmVyaWZ5IHRoYXQgdGhlIHZhbHVlIGlzIGFuIGludGVnZXIuIFVzZXMgYGlzTnVtYmVyYFxuICAgIC8vIGFuZCBhIHNpbXBsZSBtb2R1bG8gY2hlY2suXG4gICAgaXNJbnRlZ2VyOiBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgcmV0dXJuIHYuaXNOdW1iZXIodmFsdWUpICYmIHZhbHVlICUgMSA9PT0gMDtcbiAgICB9LFxuXG4gICAgLy8gQ2hlY2tzIGlmIHRoZSB2YWx1ZSBpcyBhIGJvb2xlYW5cbiAgICBpc0Jvb2xlYW46IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSAnYm9vbGVhbic7XG4gICAgfSxcblxuICAgIC8vIFVzZXMgdGhlIGBPYmplY3RgIGZ1bmN0aW9uIHRvIGNoZWNrIGlmIHRoZSBnaXZlbiBhcmd1bWVudCBpcyBhbiBvYmplY3QuXG4gICAgaXNPYmplY3Q6IGZ1bmN0aW9uKG9iaikge1xuICAgICAgcmV0dXJuIG9iaiA9PT0gT2JqZWN0KG9iaik7XG4gICAgfSxcblxuICAgIC8vIFNpbXBseSBjaGVja3MgaWYgdGhlIG9iamVjdCBpcyBhbiBpbnN0YW5jZSBvZiBhIGRhdGVcbiAgICBpc0RhdGU6IGZ1bmN0aW9uKG9iaikge1xuICAgICAgcmV0dXJuIG9iaiBpbnN0YW5jZW9mIERhdGU7XG4gICAgfSxcblxuICAgIC8vIFJldHVybnMgZmFsc2UgaWYgdGhlIG9iamVjdCBpcyBgbnVsbGAgb2YgYHVuZGVmaW5lZGBcbiAgICBpc0RlZmluZWQ6IGZ1bmN0aW9uKG9iaikge1xuICAgICAgcmV0dXJuIG9iaiAhPT0gbnVsbCAmJiBvYmogIT09IHVuZGVmaW5lZDtcbiAgICB9LFxuXG4gICAgLy8gQ2hlY2tzIGlmIHRoZSBnaXZlbiBhcmd1bWVudCBpcyBhIHByb21pc2UuIEFueXRoaW5nIHdpdGggYSBgdGhlbmBcbiAgICAvLyBmdW5jdGlvbiBpcyBjb25zaWRlcmVkIGEgcHJvbWlzZS5cbiAgICBpc1Byb21pc2U6IGZ1bmN0aW9uKHApIHtcbiAgICAgIHJldHVybiAhIXAgJiYgdi5pc0Z1bmN0aW9uKHAudGhlbik7XG4gICAgfSxcblxuICAgIGlzSnF1ZXJ5RWxlbWVudDogZnVuY3Rpb24obykge1xuICAgICAgcmV0dXJuIG8gJiYgdi5pc1N0cmluZyhvLmpxdWVyeSk7XG4gICAgfSxcblxuICAgIGlzRG9tRWxlbWVudDogZnVuY3Rpb24obykge1xuICAgICAgaWYgKCFvKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgaWYgKCFvLnF1ZXJ5U2VsZWN0b3JBbGwgfHwgIW8ucXVlcnlTZWxlY3Rvcikge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIGlmICh2LmlzT2JqZWN0KGRvY3VtZW50KSAmJiBvID09PSBkb2N1bWVudCkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cblxuICAgICAgLy8gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMzg0MzgwLzY5OTMwNFxuICAgICAgLyogaXN0YW5idWwgaWdub3JlIGVsc2UgKi9cbiAgICAgIGlmICh0eXBlb2YgSFRNTEVsZW1lbnQgPT09IFwib2JqZWN0XCIpIHtcbiAgICAgICAgcmV0dXJuIG8gaW5zdGFuY2VvZiBIVE1MRWxlbWVudDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBvICYmXG4gICAgICAgICAgdHlwZW9mIG8gPT09IFwib2JqZWN0XCIgJiZcbiAgICAgICAgICBvICE9PSBudWxsICYmXG4gICAgICAgICAgby5ub2RlVHlwZSA9PT0gMSAmJlxuICAgICAgICAgIHR5cGVvZiBvLm5vZGVOYW1lID09PSBcInN0cmluZ1wiO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICBpc0VtcHR5OiBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgdmFyIGF0dHI7XG5cbiAgICAgIC8vIE51bGwgYW5kIHVuZGVmaW5lZCBhcmUgZW1wdHlcbiAgICAgIGlmICghdi5pc0RlZmluZWQodmFsdWUpKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuXG4gICAgICAvLyBmdW5jdGlvbnMgYXJlIG5vbiBlbXB0eVxuICAgICAgaWYgKHYuaXNGdW5jdGlvbih2YWx1ZSkpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuXG4gICAgICAvLyBXaGl0ZXNwYWNlIG9ubHkgc3RyaW5ncyBhcmUgZW1wdHlcbiAgICAgIGlmICh2LmlzU3RyaW5nKHZhbHVlKSkge1xuICAgICAgICByZXR1cm4gdi5FTVBUWV9TVFJJTkdfUkVHRVhQLnRlc3QodmFsdWUpO1xuICAgICAgfVxuXG4gICAgICAvLyBGb3IgYXJyYXlzIHdlIHVzZSB0aGUgbGVuZ3RoIHByb3BlcnR5XG4gICAgICBpZiAodi5pc0FycmF5KHZhbHVlKSkge1xuICAgICAgICByZXR1cm4gdmFsdWUubGVuZ3RoID09PSAwO1xuICAgICAgfVxuXG4gICAgICAvLyBEYXRlcyBoYXZlIG5vIGF0dHJpYnV0ZXMgYnV0IGFyZW4ndCBlbXB0eVxuICAgICAgaWYgKHYuaXNEYXRlKHZhbHVlKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIC8vIElmIHdlIGZpbmQgYXQgbGVhc3Qgb25lIHByb3BlcnR5IHdlIGNvbnNpZGVyIGl0IG5vbiBlbXB0eVxuICAgICAgaWYgKHYuaXNPYmplY3QodmFsdWUpKSB7XG4gICAgICAgIGZvciAoYXR0ciBpbiB2YWx1ZSkge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0sXG5cbiAgICAvLyBGb3JtYXRzIHRoZSBzcGVjaWZpZWQgc3RyaW5ncyB3aXRoIHRoZSBnaXZlbiB2YWx1ZXMgbGlrZSBzbzpcbiAgICAvLyBgYGBcbiAgICAvLyBmb3JtYXQoXCJGb286ICV7Zm9vfVwiLCB7Zm9vOiBcImJhclwifSkgLy8gXCJGb28gYmFyXCJcbiAgICAvLyBgYGBcbiAgICAvLyBJZiB5b3Ugd2FudCB0byB3cml0ZSAley4uLn0gd2l0aG91dCBoYXZpbmcgaXQgcmVwbGFjZWQgc2ltcGx5XG4gICAgLy8gcHJlZml4IGl0IHdpdGggJSBsaWtlIHRoaXMgYEZvbzogJSV7Zm9vfWAgYW5kIGl0IHdpbGwgYmUgcmV0dXJuZWRcbiAgICAvLyBhcyBgXCJGb286ICV7Zm9vfVwiYFxuICAgIGZvcm1hdDogdi5leHRlbmQoZnVuY3Rpb24oc3RyLCB2YWxzKSB7XG4gICAgICBpZiAoIXYuaXNTdHJpbmcoc3RyKSkge1xuICAgICAgICByZXR1cm4gc3RyO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHN0ci5yZXBsYWNlKHYuZm9ybWF0LkZPUk1BVF9SRUdFWFAsIGZ1bmN0aW9uKG0wLCBtMSwgbTIpIHtcbiAgICAgICAgaWYgKG0xID09PSAnJScpIHtcbiAgICAgICAgICByZXR1cm4gXCIle1wiICsgbTIgKyBcIn1cIjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gU3RyaW5nKHZhbHNbbTJdKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSwge1xuICAgICAgLy8gRmluZHMgJXtrZXl9IHN0eWxlIHBhdHRlcm5zIGluIHRoZSBnaXZlbiBzdHJpbmdcbiAgICAgIEZPUk1BVF9SRUdFWFA6IC8oJT8pJVxceyhbXlxcfV0rKVxcfS9nXG4gICAgfSksXG5cbiAgICAvLyBcIlByZXR0aWZpZXNcIiB0aGUgZ2l2ZW4gc3RyaW5nLlxuICAgIC8vIFByZXR0aWZ5aW5nIG1lYW5zIHJlcGxhY2luZyBbLlxcXy1dIHdpdGggc3BhY2VzIGFzIHdlbGwgYXMgc3BsaXR0aW5nXG4gICAgLy8gY2FtZWwgY2FzZSB3b3Jkcy5cbiAgICBwcmV0dGlmeTogZnVuY3Rpb24oc3RyKSB7XG4gICAgICBpZiAodi5pc051bWJlcihzdHIpKSB7XG4gICAgICAgIC8vIElmIHRoZXJlIGFyZSBtb3JlIHRoYW4gMiBkZWNpbWFscyByb3VuZCBpdCB0byB0d29cbiAgICAgICAgaWYgKChzdHIgKiAxMDApICUgMSA9PT0gMCkge1xuICAgICAgICAgIHJldHVybiBcIlwiICsgc3RyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBwYXJzZUZsb2F0KE1hdGgucm91bmQoc3RyICogMTAwKSAvIDEwMCkudG9GaXhlZCgyKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAodi5pc0FycmF5KHN0cikpIHtcbiAgICAgICAgcmV0dXJuIHN0ci5tYXAoZnVuY3Rpb24ocykgeyByZXR1cm4gdi5wcmV0dGlmeShzKTsgfSkuam9pbihcIiwgXCIpO1xuICAgICAgfVxuXG4gICAgICBpZiAodi5pc09iamVjdChzdHIpKSB7XG4gICAgICAgIGlmICghdi5pc0RlZmluZWQoc3RyLnRvU3RyaW5nKSkge1xuICAgICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShzdHIpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHN0ci50b1N0cmluZygpO1xuICAgICAgfVxuXG4gICAgICAvLyBFbnN1cmUgdGhlIHN0cmluZyBpcyBhY3R1YWxseSBhIHN0cmluZ1xuICAgICAgc3RyID0gXCJcIiArIHN0cjtcblxuICAgICAgcmV0dXJuIHN0clxuICAgICAgICAvLyBTcGxpdHMga2V5cyBzZXBhcmF0ZWQgYnkgcGVyaW9kc1xuICAgICAgICAucmVwbGFjZSgvKFteXFxzXSlcXC4oW15cXHNdKS9nLCAnJDEgJDInKVxuICAgICAgICAvLyBSZW1vdmVzIGJhY2tzbGFzaGVzXG4gICAgICAgIC5yZXBsYWNlKC9cXFxcKy9nLCAnJylcbiAgICAgICAgLy8gUmVwbGFjZXMgLSBhbmQgLSB3aXRoIHNwYWNlXG4gICAgICAgIC5yZXBsYWNlKC9bXy1dL2csICcgJylcbiAgICAgICAgLy8gU3BsaXRzIGNhbWVsIGNhc2VkIHdvcmRzXG4gICAgICAgIC5yZXBsYWNlKC8oW2Etel0pKFtBLVpdKS9nLCBmdW5jdGlvbihtMCwgbTEsIG0yKSB7XG4gICAgICAgICAgcmV0dXJuIFwiXCIgKyBtMSArIFwiIFwiICsgbTIudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgfSlcbiAgICAgICAgLnRvTG93ZXJDYXNlKCk7XG4gICAgfSxcblxuICAgIHN0cmluZ2lmeVZhbHVlOiBmdW5jdGlvbih2YWx1ZSwgb3B0aW9ucykge1xuICAgICAgdmFyIHByZXR0aWZ5ID0gb3B0aW9ucyAmJiBvcHRpb25zLnByZXR0aWZ5IHx8IHYucHJldHRpZnk7XG4gICAgICByZXR1cm4gcHJldHRpZnkodmFsdWUpO1xuICAgIH0sXG5cbiAgICBpc1N0cmluZzogZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgIHJldHVybiB0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnO1xuICAgIH0sXG5cbiAgICBpc0FycmF5OiBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgcmV0dXJuIHt9LnRvU3RyaW5nLmNhbGwodmFsdWUpID09PSAnW29iamVjdCBBcnJheV0nO1xuICAgIH0sXG5cbiAgICAvLyBDaGVja3MgaWYgdGhlIG9iamVjdCBpcyBhIGhhc2gsIHdoaWNoIGlzIGVxdWl2YWxlbnQgdG8gYW4gb2JqZWN0IHRoYXRcbiAgICAvLyBpcyBuZWl0aGVyIGFuIGFycmF5IG5vciBhIGZ1bmN0aW9uLlxuICAgIGlzSGFzaDogZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgIHJldHVybiB2LmlzT2JqZWN0KHZhbHVlKSAmJiAhdi5pc0FycmF5KHZhbHVlKSAmJiAhdi5pc0Z1bmN0aW9uKHZhbHVlKTtcbiAgICB9LFxuXG4gICAgY29udGFpbnM6IGZ1bmN0aW9uKG9iaiwgdmFsdWUpIHtcbiAgICAgIGlmICghdi5pc0RlZmluZWQob2JqKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICBpZiAodi5pc0FycmF5KG9iaikpIHtcbiAgICAgICAgcmV0dXJuIG9iai5pbmRleE9mKHZhbHVlKSAhPT0gLTE7XG4gICAgICB9XG4gICAgICByZXR1cm4gdmFsdWUgaW4gb2JqO1xuICAgIH0sXG5cbiAgICB1bmlxdWU6IGZ1bmN0aW9uKGFycmF5KSB7XG4gICAgICBpZiAoIXYuaXNBcnJheShhcnJheSkpIHtcbiAgICAgICAgcmV0dXJuIGFycmF5O1xuICAgICAgfVxuICAgICAgcmV0dXJuIGFycmF5LmZpbHRlcihmdW5jdGlvbihlbCwgaW5kZXgsIGFycmF5KSB7XG4gICAgICAgIHJldHVybiBhcnJheS5pbmRleE9mKGVsKSA9PSBpbmRleDtcbiAgICAgIH0pO1xuICAgIH0sXG5cbiAgICBmb3JFYWNoS2V5SW5LZXlwYXRoOiBmdW5jdGlvbihvYmplY3QsIGtleXBhdGgsIGNhbGxiYWNrKSB7XG4gICAgICBpZiAoIXYuaXNTdHJpbmcoa2V5cGF0aCkpIHtcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgIH1cblxuICAgICAgdmFyIGtleSA9IFwiXCJcbiAgICAgICAgLCBpXG4gICAgICAgICwgZXNjYXBlID0gZmFsc2U7XG5cbiAgICAgIGZvciAoaSA9IDA7IGkgPCBrZXlwYXRoLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIHN3aXRjaCAoa2V5cGF0aFtpXSkge1xuICAgICAgICAgIGNhc2UgJy4nOlxuICAgICAgICAgICAgaWYgKGVzY2FwZSkge1xuICAgICAgICAgICAgICBlc2NhcGUgPSBmYWxzZTtcbiAgICAgICAgICAgICAga2V5ICs9ICcuJztcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIG9iamVjdCA9IGNhbGxiYWNrKG9iamVjdCwga2V5LCBmYWxzZSk7XG4gICAgICAgICAgICAgIGtleSA9IFwiXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgIGNhc2UgJ1xcXFwnOlxuICAgICAgICAgICAgaWYgKGVzY2FwZSkge1xuICAgICAgICAgICAgICBlc2NhcGUgPSBmYWxzZTtcbiAgICAgICAgICAgICAga2V5ICs9ICdcXFxcJztcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGVzY2FwZSA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICBlc2NhcGUgPSBmYWxzZTtcbiAgICAgICAgICAgIGtleSArPSBrZXlwYXRoW2ldO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGNhbGxiYWNrKG9iamVjdCwga2V5LCB0cnVlKTtcbiAgICB9LFxuXG4gICAgZ2V0RGVlcE9iamVjdFZhbHVlOiBmdW5jdGlvbihvYmosIGtleXBhdGgpIHtcbiAgICAgIGlmICghdi5pc09iamVjdChvYmopKSB7XG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB2LmZvckVhY2hLZXlJbktleXBhdGgob2JqLCBrZXlwYXRoLCBmdW5jdGlvbihvYmosIGtleSkge1xuICAgICAgICBpZiAodi5pc09iamVjdChvYmopKSB7XG4gICAgICAgICAgcmV0dXJuIG9ialtrZXldO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9LFxuXG4gICAgLy8gVGhpcyByZXR1cm5zIGFuIG9iamVjdCB3aXRoIGFsbCB0aGUgdmFsdWVzIG9mIHRoZSBmb3JtLlxuICAgIC8vIEl0IHVzZXMgdGhlIGlucHV0IG5hbWUgYXMga2V5IGFuZCB0aGUgdmFsdWUgYXMgdmFsdWVcbiAgICAvLyBTbyBmb3IgZXhhbXBsZSB0aGlzOlxuICAgIC8vIDxpbnB1dCB0eXBlPVwidGV4dFwiIG5hbWU9XCJlbWFpbFwiIHZhbHVlPVwiZm9vQGJhci5jb21cIiAvPlxuICAgIC8vIHdvdWxkIHJldHVybjpcbiAgICAvLyB7ZW1haWw6IFwiZm9vQGJhci5jb21cIn1cbiAgICBjb2xsZWN0Rm9ybVZhbHVlczogZnVuY3Rpb24oZm9ybSwgb3B0aW9ucykge1xuICAgICAgdmFyIHZhbHVlcyA9IHt9XG4gICAgICAgICwgaVxuICAgICAgICAsIGpcbiAgICAgICAgLCBpbnB1dFxuICAgICAgICAsIGlucHV0c1xuICAgICAgICAsIG9wdGlvblxuICAgICAgICAsIHZhbHVlO1xuXG4gICAgICBpZiAodi5pc0pxdWVyeUVsZW1lbnQoZm9ybSkpIHtcbiAgICAgICAgZm9ybSA9IGZvcm1bMF07XG4gICAgICB9XG5cbiAgICAgIGlmICghZm9ybSkge1xuICAgICAgICByZXR1cm4gdmFsdWVzO1xuICAgICAgfVxuXG4gICAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblxuICAgICAgaW5wdXRzID0gZm9ybS5xdWVyeVNlbGVjdG9yQWxsKFwiaW5wdXRbbmFtZV0sIHRleHRhcmVhW25hbWVdXCIpO1xuICAgICAgZm9yIChpID0gMDsgaSA8IGlucHV0cy5sZW5ndGg7ICsraSkge1xuICAgICAgICBpbnB1dCA9IGlucHV0cy5pdGVtKGkpO1xuXG4gICAgICAgIGlmICh2LmlzRGVmaW5lZChpbnB1dC5nZXRBdHRyaWJ1dGUoXCJkYXRhLWlnbm9yZWRcIikpKSB7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgbmFtZSA9IGlucHV0Lm5hbWUucmVwbGFjZSgvXFwuL2csIFwiXFxcXFxcXFwuXCIpO1xuICAgICAgICB2YWx1ZSA9IHYuc2FuaXRpemVGb3JtVmFsdWUoaW5wdXQudmFsdWUsIG9wdGlvbnMpO1xuICAgICAgICBpZiAoaW5wdXQudHlwZSA9PT0gXCJudW1iZXJcIikge1xuICAgICAgICAgIHZhbHVlID0gdmFsdWUgPyArdmFsdWUgOiBudWxsO1xuICAgICAgICB9IGVsc2UgaWYgKGlucHV0LnR5cGUgPT09IFwiY2hlY2tib3hcIikge1xuICAgICAgICAgIGlmIChpbnB1dC5hdHRyaWJ1dGVzLnZhbHVlKSB7XG4gICAgICAgICAgICBpZiAoIWlucHV0LmNoZWNrZWQpIHtcbiAgICAgICAgICAgICAgdmFsdWUgPSB2YWx1ZXNbbmFtZV0gfHwgbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdmFsdWUgPSBpbnB1dC5jaGVja2VkO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChpbnB1dC50eXBlID09PSBcInJhZGlvXCIpIHtcbiAgICAgICAgICBpZiAoIWlucHV0LmNoZWNrZWQpIHtcbiAgICAgICAgICAgIHZhbHVlID0gdmFsdWVzW25hbWVdIHx8IG51bGw7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHZhbHVlc1tuYW1lXSA9IHZhbHVlO1xuICAgICAgfVxuXG4gICAgICBpbnB1dHMgPSBmb3JtLnF1ZXJ5U2VsZWN0b3JBbGwoXCJzZWxlY3RbbmFtZV1cIik7XG4gICAgICBmb3IgKGkgPSAwOyBpIDwgaW5wdXRzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIGlucHV0ID0gaW5wdXRzLml0ZW0oaSk7XG4gICAgICAgIGlmICh2LmlzRGVmaW5lZChpbnB1dC5nZXRBdHRyaWJ1dGUoXCJkYXRhLWlnbm9yZWRcIikpKSB7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaW5wdXQubXVsdGlwbGUpIHtcbiAgICAgICAgICB2YWx1ZSA9IFtdO1xuICAgICAgICAgIGZvciAoaiBpbiBpbnB1dC5vcHRpb25zKSB7XG4gICAgICAgICAgICBvcHRpb24gPSBpbnB1dC5vcHRpb25zW2pdO1xuICAgICAgICAgICAgIGlmIChvcHRpb24gJiYgb3B0aW9uLnNlbGVjdGVkKSB7XG4gICAgICAgICAgICAgIHZhbHVlLnB1c2godi5zYW5pdGl6ZUZvcm1WYWx1ZShvcHRpb24udmFsdWUsIG9wdGlvbnMpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdmFyIF92YWwgPSB0eXBlb2YgaW5wdXQub3B0aW9uc1tpbnB1dC5zZWxlY3RlZEluZGV4XSAhPT0gJ3VuZGVmaW5lZCcgPyBpbnB1dC5vcHRpb25zW2lucHV0LnNlbGVjdGVkSW5kZXhdLnZhbHVlIDogLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi8gJyc7XG4gICAgICAgICAgdmFsdWUgPSB2LnNhbml0aXplRm9ybVZhbHVlKF92YWwsIG9wdGlvbnMpO1xuICAgICAgICB9XG4gICAgICAgIHZhbHVlc1tpbnB1dC5uYW1lXSA9IHZhbHVlO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdmFsdWVzO1xuICAgIH0sXG5cbiAgICBzYW5pdGl6ZUZvcm1WYWx1ZTogZnVuY3Rpb24odmFsdWUsIG9wdGlvbnMpIHtcbiAgICAgIGlmIChvcHRpb25zLnRyaW0gJiYgdi5pc1N0cmluZyh2YWx1ZSkpIHtcbiAgICAgICAgdmFsdWUgPSB2YWx1ZS50cmltKCk7XG4gICAgICB9XG5cbiAgICAgIGlmIChvcHRpb25zLm51bGxpZnkgIT09IGZhbHNlICYmIHZhbHVlID09PSBcIlwiKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH0sXG5cbiAgICBjYXBpdGFsaXplOiBmdW5jdGlvbihzdHIpIHtcbiAgICAgIGlmICghdi5pc1N0cmluZyhzdHIpKSB7XG4gICAgICAgIHJldHVybiBzdHI7XG4gICAgICB9XG4gICAgICByZXR1cm4gc3RyWzBdLnRvVXBwZXJDYXNlKCkgKyBzdHIuc2xpY2UoMSk7XG4gICAgfSxcblxuICAgIC8vIFJlbW92ZSBhbGwgZXJyb3JzIHdobydzIGVycm9yIGF0dHJpYnV0ZSBpcyBlbXB0eSAobnVsbCBvciB1bmRlZmluZWQpXG4gICAgcHJ1bmVFbXB0eUVycm9yczogZnVuY3Rpb24oZXJyb3JzKSB7XG4gICAgICByZXR1cm4gZXJyb3JzLmZpbHRlcihmdW5jdGlvbihlcnJvcikge1xuICAgICAgICByZXR1cm4gIXYuaXNFbXB0eShlcnJvci5lcnJvcik7XG4gICAgICB9KTtcbiAgICB9LFxuXG4gICAgLy8gSW5cbiAgICAvLyBbe2Vycm9yOiBbXCJlcnIxXCIsIFwiZXJyMlwiXSwgLi4ufV1cbiAgICAvLyBPdXRcbiAgICAvLyBbe2Vycm9yOiBcImVycjFcIiwgLi4ufSwge2Vycm9yOiBcImVycjJcIiwgLi4ufV1cbiAgICAvL1xuICAgIC8vIEFsbCBhdHRyaWJ1dGVzIGluIGFuIGVycm9yIHdpdGggbXVsdGlwbGUgbWVzc2FnZXMgYXJlIGR1cGxpY2F0ZWRcbiAgICAvLyB3aGVuIGV4cGFuZGluZyB0aGUgZXJyb3JzLlxuICAgIGV4cGFuZE11bHRpcGxlRXJyb3JzOiBmdW5jdGlvbihlcnJvcnMpIHtcbiAgICAgIHZhciByZXQgPSBbXTtcbiAgICAgIGVycm9ycy5mb3JFYWNoKGZ1bmN0aW9uKGVycm9yKSB7XG4gICAgICAgIC8vIFJlbW92ZXMgZXJyb3JzIHdpdGhvdXQgYSBtZXNzYWdlXG4gICAgICAgIGlmICh2LmlzQXJyYXkoZXJyb3IuZXJyb3IpKSB7XG4gICAgICAgICAgZXJyb3IuZXJyb3IuZm9yRWFjaChmdW5jdGlvbihtc2cpIHtcbiAgICAgICAgICAgIHJldC5wdXNoKHYuZXh0ZW5kKHt9LCBlcnJvciwge2Vycm9yOiBtc2d9KSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0LnB1c2goZXJyb3IpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIHJldHVybiByZXQ7XG4gICAgfSxcblxuICAgIC8vIENvbnZlcnRzIHRoZSBlcnJvciBtZXNhZ2VzIGJ5IHByZXBlbmRpbmcgdGhlIGF0dHJpYnV0ZSBuYW1lIHVubGVzcyB0aGVcbiAgICAvLyBtZXNzYWdlIGlzIHByZWZpeGVkIGJ5IF5cbiAgICBjb252ZXJ0RXJyb3JNZXNzYWdlczogZnVuY3Rpb24oZXJyb3JzLCBvcHRpb25zKSB7XG4gICAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblxuICAgICAgdmFyIHJldCA9IFtdXG4gICAgICAgICwgcHJldHRpZnkgPSBvcHRpb25zLnByZXR0aWZ5IHx8IHYucHJldHRpZnk7XG4gICAgICBlcnJvcnMuZm9yRWFjaChmdW5jdGlvbihlcnJvckluZm8pIHtcbiAgICAgICAgdmFyIGVycm9yID0gdi5yZXN1bHQoZXJyb3JJbmZvLmVycm9yLFxuICAgICAgICAgICAgZXJyb3JJbmZvLnZhbHVlLFxuICAgICAgICAgICAgZXJyb3JJbmZvLmF0dHJpYnV0ZSxcbiAgICAgICAgICAgIGVycm9ySW5mby5vcHRpb25zLFxuICAgICAgICAgICAgZXJyb3JJbmZvLmF0dHJpYnV0ZXMsXG4gICAgICAgICAgICBlcnJvckluZm8uZ2xvYmFsT3B0aW9ucyk7XG5cbiAgICAgICAgaWYgKCF2LmlzU3RyaW5nKGVycm9yKSkge1xuICAgICAgICAgIHJldC5wdXNoKGVycm9ySW5mbyk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGVycm9yWzBdID09PSAnXicpIHtcbiAgICAgICAgICBlcnJvciA9IGVycm9yLnNsaWNlKDEpO1xuICAgICAgICB9IGVsc2UgaWYgKG9wdGlvbnMuZnVsbE1lc3NhZ2VzICE9PSBmYWxzZSkge1xuICAgICAgICAgIGVycm9yID0gdi5jYXBpdGFsaXplKHByZXR0aWZ5KGVycm9ySW5mby5hdHRyaWJ1dGUpKSArIFwiIFwiICsgZXJyb3I7XG4gICAgICAgIH1cbiAgICAgICAgZXJyb3IgPSBlcnJvci5yZXBsYWNlKC9cXFxcXFxeL2csIFwiXlwiKTtcbiAgICAgICAgZXJyb3IgPSB2LmZvcm1hdChlcnJvciwge1xuICAgICAgICAgIHZhbHVlOiB2LnN0cmluZ2lmeVZhbHVlKGVycm9ySW5mby52YWx1ZSwgb3B0aW9ucylcbiAgICAgICAgfSk7XG4gICAgICAgIHJldC5wdXNoKHYuZXh0ZW5kKHt9LCBlcnJvckluZm8sIHtlcnJvcjogZXJyb3J9KSk7XG4gICAgICB9KTtcbiAgICAgIHJldHVybiByZXQ7XG4gICAgfSxcblxuICAgIC8vIEluOlxuICAgIC8vIFt7YXR0cmlidXRlOiBcIjxhdHRyaWJ1dGVOYW1lPlwiLCAuLi59XVxuICAgIC8vIE91dDpcbiAgICAvLyB7XCI8YXR0cmlidXRlTmFtZT5cIjogW3thdHRyaWJ1dGU6IFwiPGF0dHJpYnV0ZU5hbWU+XCIsIC4uLn1dfVxuICAgIGdyb3VwRXJyb3JzQnlBdHRyaWJ1dGU6IGZ1bmN0aW9uKGVycm9ycykge1xuICAgICAgdmFyIHJldCA9IHt9O1xuICAgICAgZXJyb3JzLmZvckVhY2goZnVuY3Rpb24oZXJyb3IpIHtcbiAgICAgICAgdmFyIGxpc3QgPSByZXRbZXJyb3IuYXR0cmlidXRlXTtcbiAgICAgICAgaWYgKGxpc3QpIHtcbiAgICAgICAgICBsaXN0LnB1c2goZXJyb3IpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldFtlcnJvci5hdHRyaWJ1dGVdID0gW2Vycm9yXTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICByZXR1cm4gcmV0O1xuICAgIH0sXG5cbiAgICAvLyBJbjpcbiAgICAvLyBbe2Vycm9yOiBcIjxtZXNzYWdlIDE+XCIsIC4uLn0sIHtlcnJvcjogXCI8bWVzc2FnZSAyPlwiLCAuLi59XVxuICAgIC8vIE91dDpcbiAgICAvLyBbXCI8bWVzc2FnZSAxPlwiLCBcIjxtZXNzYWdlIDI+XCJdXG4gICAgZmxhdHRlbkVycm9yc1RvQXJyYXk6IGZ1bmN0aW9uKGVycm9ycykge1xuICAgICAgcmV0dXJuIGVycm9yc1xuICAgICAgICAubWFwKGZ1bmN0aW9uKGVycm9yKSB7IHJldHVybiBlcnJvci5lcnJvcjsgfSlcbiAgICAgICAgLmZpbHRlcihmdW5jdGlvbih2YWx1ZSwgaW5kZXgsIHNlbGYpIHtcbiAgICAgICAgICByZXR1cm4gc2VsZi5pbmRleE9mKHZhbHVlKSA9PT0gaW5kZXg7XG4gICAgICAgIH0pO1xuICAgIH0sXG5cbiAgICBjbGVhbkF0dHJpYnV0ZXM6IGZ1bmN0aW9uKGF0dHJpYnV0ZXMsIHdoaXRlbGlzdCkge1xuICAgICAgZnVuY3Rpb24gd2hpdGVsaXN0Q3JlYXRvcihvYmosIGtleSwgbGFzdCkge1xuICAgICAgICBpZiAodi5pc09iamVjdChvYmpba2V5XSkpIHtcbiAgICAgICAgICByZXR1cm4gb2JqW2tleV07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIChvYmpba2V5XSA9IGxhc3QgPyB0cnVlIDoge30pO1xuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBidWlsZE9iamVjdFdoaXRlbGlzdCh3aGl0ZWxpc3QpIHtcbiAgICAgICAgdmFyIG93ID0ge31cbiAgICAgICAgICAsIGxhc3RPYmplY3RcbiAgICAgICAgICAsIGF0dHI7XG4gICAgICAgIGZvciAoYXR0ciBpbiB3aGl0ZWxpc3QpIHtcbiAgICAgICAgICBpZiAoIXdoaXRlbGlzdFthdHRyXSkge1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgfVxuICAgICAgICAgIHYuZm9yRWFjaEtleUluS2V5cGF0aChvdywgYXR0ciwgd2hpdGVsaXN0Q3JlYXRvcik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG93O1xuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBjbGVhblJlY3Vyc2l2ZShhdHRyaWJ1dGVzLCB3aGl0ZWxpc3QpIHtcbiAgICAgICAgaWYgKCF2LmlzT2JqZWN0KGF0dHJpYnV0ZXMpKSB7XG4gICAgICAgICAgcmV0dXJuIGF0dHJpYnV0ZXM7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgcmV0ID0gdi5leHRlbmQoe30sIGF0dHJpYnV0ZXMpXG4gICAgICAgICAgLCB3XG4gICAgICAgICAgLCBhdHRyaWJ1dGU7XG5cbiAgICAgICAgZm9yIChhdHRyaWJ1dGUgaW4gYXR0cmlidXRlcykge1xuICAgICAgICAgIHcgPSB3aGl0ZWxpc3RbYXR0cmlidXRlXTtcblxuICAgICAgICAgIGlmICh2LmlzT2JqZWN0KHcpKSB7XG4gICAgICAgICAgICByZXRbYXR0cmlidXRlXSA9IGNsZWFuUmVjdXJzaXZlKHJldFthdHRyaWJ1dGVdLCB3KTtcbiAgICAgICAgICB9IGVsc2UgaWYgKCF3KSB7XG4gICAgICAgICAgICBkZWxldGUgcmV0W2F0dHJpYnV0ZV07XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXQ7XG4gICAgICB9XG5cbiAgICAgIGlmICghdi5pc09iamVjdCh3aGl0ZWxpc3QpIHx8ICF2LmlzT2JqZWN0KGF0dHJpYnV0ZXMpKSB7XG4gICAgICAgIHJldHVybiB7fTtcbiAgICAgIH1cblxuICAgICAgd2hpdGVsaXN0ID0gYnVpbGRPYmplY3RXaGl0ZWxpc3Qod2hpdGVsaXN0KTtcbiAgICAgIHJldHVybiBjbGVhblJlY3Vyc2l2ZShhdHRyaWJ1dGVzLCB3aGl0ZWxpc3QpO1xuICAgIH0sXG5cbiAgICBleHBvc2VNb2R1bGU6IGZ1bmN0aW9uKHZhbGlkYXRlLCByb290LCBleHBvcnRzLCBtb2R1bGUsIGRlZmluZSkge1xuICAgICAgaWYgKGV4cG9ydHMpIHtcbiAgICAgICAgaWYgKG1vZHVsZSAmJiBtb2R1bGUuZXhwb3J0cykge1xuICAgICAgICAgIGV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHZhbGlkYXRlO1xuICAgICAgICB9XG4gICAgICAgIGV4cG9ydHMudmFsaWRhdGUgPSB2YWxpZGF0ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJvb3QudmFsaWRhdGUgPSB2YWxpZGF0ZTtcbiAgICAgICAgaWYgKHZhbGlkYXRlLmlzRnVuY3Rpb24oZGVmaW5lKSAmJiBkZWZpbmUuYW1kKSB7XG4gICAgICAgICAgZGVmaW5lKFtdLCBmdW5jdGlvbiAoKSB7IHJldHVybiB2YWxpZGF0ZTsgfSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuXG4gICAgd2FybjogZnVuY3Rpb24obXNnKSB7XG4gICAgICBpZiAodHlwZW9mIGNvbnNvbGUgIT09IFwidW5kZWZpbmVkXCIgJiYgY29uc29sZS53YXJuKSB7XG4gICAgICAgIGNvbnNvbGUud2FybihcIlt2YWxpZGF0ZS5qc10gXCIgKyBtc2cpO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICBlcnJvcjogZnVuY3Rpb24obXNnKSB7XG4gICAgICBpZiAodHlwZW9mIGNvbnNvbGUgIT09IFwidW5kZWZpbmVkXCIgJiYgY29uc29sZS5lcnJvcikge1xuICAgICAgICBjb25zb2xlLmVycm9yKFwiW3ZhbGlkYXRlLmpzXSBcIiArIG1zZyk7XG4gICAgICB9XG4gICAgfVxuICB9KTtcblxuICB2YWxpZGF0ZS52YWxpZGF0b3JzID0ge1xuICAgIC8vIFByZXNlbmNlIHZhbGlkYXRlcyB0aGF0IHRoZSB2YWx1ZSBpc24ndCBlbXB0eVxuICAgIHByZXNlbmNlOiBmdW5jdGlvbih2YWx1ZSwgb3B0aW9ucykge1xuICAgICAgb3B0aW9ucyA9IHYuZXh0ZW5kKHt9LCB0aGlzLm9wdGlvbnMsIG9wdGlvbnMpO1xuICAgICAgaWYgKG9wdGlvbnMuYWxsb3dFbXB0eSAhPT0gZmFsc2UgPyAhdi5pc0RlZmluZWQodmFsdWUpIDogdi5pc0VtcHR5KHZhbHVlKSkge1xuICAgICAgICByZXR1cm4gb3B0aW9ucy5tZXNzYWdlIHx8IHRoaXMubWVzc2FnZSB8fCBcImNhbid0IGJlIGJsYW5rXCI7XG4gICAgICB9XG4gICAgfSxcbiAgICBsZW5ndGg6IGZ1bmN0aW9uKHZhbHVlLCBvcHRpb25zLCBhdHRyaWJ1dGUpIHtcbiAgICAgIC8vIEVtcHR5IHZhbHVlcyBhcmUgYWxsb3dlZFxuICAgICAgaWYgKCF2LmlzRGVmaW5lZCh2YWx1ZSkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBvcHRpb25zID0gdi5leHRlbmQoe30sIHRoaXMub3B0aW9ucywgb3B0aW9ucyk7XG5cbiAgICAgIHZhciBpcyA9IG9wdGlvbnMuaXNcbiAgICAgICAgLCBtYXhpbXVtID0gb3B0aW9ucy5tYXhpbXVtXG4gICAgICAgICwgbWluaW11bSA9IG9wdGlvbnMubWluaW11bVxuICAgICAgICAsIHRva2VuaXplciA9IG9wdGlvbnMudG9rZW5pemVyIHx8IGZ1bmN0aW9uKHZhbCkgeyByZXR1cm4gdmFsOyB9XG4gICAgICAgICwgZXJyXG4gICAgICAgICwgZXJyb3JzID0gW107XG5cbiAgICAgIHZhbHVlID0gdG9rZW5pemVyKHZhbHVlKTtcbiAgICAgIHZhciBsZW5ndGggPSB2YWx1ZS5sZW5ndGg7XG4gICAgICBpZighdi5pc051bWJlcihsZW5ndGgpKSB7XG4gICAgICAgIHJldHVybiBvcHRpb25zLm1lc3NhZ2UgfHwgdGhpcy5ub3RWYWxpZCB8fCBcImhhcyBhbiBpbmNvcnJlY3QgbGVuZ3RoXCI7XG4gICAgICB9XG5cbiAgICAgIC8vIElzIGNoZWNrc1xuICAgICAgaWYgKHYuaXNOdW1iZXIoaXMpICYmIGxlbmd0aCAhPT0gaXMpIHtcbiAgICAgICAgZXJyID0gb3B0aW9ucy53cm9uZ0xlbmd0aCB8fFxuICAgICAgICAgIHRoaXMud3JvbmdMZW5ndGggfHxcbiAgICAgICAgICBcImlzIHRoZSB3cm9uZyBsZW5ndGggKHNob3VsZCBiZSAle2NvdW50fSBjaGFyYWN0ZXJzKVwiO1xuICAgICAgICBlcnJvcnMucHVzaCh2LmZvcm1hdChlcnIsIHtjb3VudDogaXN9KSk7XG4gICAgICB9XG5cbiAgICAgIGlmICh2LmlzTnVtYmVyKG1pbmltdW0pICYmIGxlbmd0aCA8IG1pbmltdW0pIHtcbiAgICAgICAgZXJyID0gb3B0aW9ucy50b29TaG9ydCB8fFxuICAgICAgICAgIHRoaXMudG9vU2hvcnQgfHxcbiAgICAgICAgICBcImlzIHRvbyBzaG9ydCAobWluaW11bSBpcyAle2NvdW50fSBjaGFyYWN0ZXJzKVwiO1xuICAgICAgICBlcnJvcnMucHVzaCh2LmZvcm1hdChlcnIsIHtjb3VudDogbWluaW11bX0pKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHYuaXNOdW1iZXIobWF4aW11bSkgJiYgbGVuZ3RoID4gbWF4aW11bSkge1xuICAgICAgICBlcnIgPSBvcHRpb25zLnRvb0xvbmcgfHxcbiAgICAgICAgICB0aGlzLnRvb0xvbmcgfHxcbiAgICAgICAgICBcImlzIHRvbyBsb25nIChtYXhpbXVtIGlzICV7Y291bnR9IGNoYXJhY3RlcnMpXCI7XG4gICAgICAgIGVycm9ycy5wdXNoKHYuZm9ybWF0KGVyciwge2NvdW50OiBtYXhpbXVtfSkpO1xuICAgICAgfVxuXG4gICAgICBpZiAoZXJyb3JzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgcmV0dXJuIG9wdGlvbnMubWVzc2FnZSB8fCBlcnJvcnM7XG4gICAgICB9XG4gICAgfSxcbiAgICBudW1lcmljYWxpdHk6IGZ1bmN0aW9uKHZhbHVlLCBvcHRpb25zLCBhdHRyaWJ1dGUsIGF0dHJpYnV0ZXMsIGdsb2JhbE9wdGlvbnMpIHtcbiAgICAgIC8vIEVtcHR5IHZhbHVlcyBhcmUgZmluZVxuICAgICAgaWYgKCF2LmlzRGVmaW5lZCh2YWx1ZSkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBvcHRpb25zID0gdi5leHRlbmQoe30sIHRoaXMub3B0aW9ucywgb3B0aW9ucyk7XG5cbiAgICAgIHZhciBlcnJvcnMgPSBbXVxuICAgICAgICAsIG5hbWVcbiAgICAgICAgLCBjb3VudFxuICAgICAgICAsIGNoZWNrcyA9IHtcbiAgICAgICAgICAgIGdyZWF0ZXJUaGFuOiAgICAgICAgICBmdW5jdGlvbih2LCBjKSB7IHJldHVybiB2ID4gYzsgfSxcbiAgICAgICAgICAgIGdyZWF0ZXJUaGFuT3JFcXVhbFRvOiBmdW5jdGlvbih2LCBjKSB7IHJldHVybiB2ID49IGM7IH0sXG4gICAgICAgICAgICBlcXVhbFRvOiAgICAgICAgICAgICAgZnVuY3Rpb24odiwgYykgeyByZXR1cm4gdiA9PT0gYzsgfSxcbiAgICAgICAgICAgIGxlc3NUaGFuOiAgICAgICAgICAgICBmdW5jdGlvbih2LCBjKSB7IHJldHVybiB2IDwgYzsgfSxcbiAgICAgICAgICAgIGxlc3NUaGFuT3JFcXVhbFRvOiAgICBmdW5jdGlvbih2LCBjKSB7IHJldHVybiB2IDw9IGM7IH0sXG4gICAgICAgICAgICBkaXZpc2libGVCeTogICAgICAgICAgZnVuY3Rpb24odiwgYykgeyByZXR1cm4gdiAlIGMgPT09IDA7IH1cbiAgICAgICAgICB9XG4gICAgICAgICwgcHJldHRpZnkgPSBvcHRpb25zLnByZXR0aWZ5IHx8XG4gICAgICAgICAgKGdsb2JhbE9wdGlvbnMgJiYgZ2xvYmFsT3B0aW9ucy5wcmV0dGlmeSkgfHxcbiAgICAgICAgICB2LnByZXR0aWZ5O1xuXG4gICAgICAvLyBTdHJpY3Qgd2lsbCBjaGVjayB0aGF0IGl0IGlzIGEgdmFsaWQgbG9va2luZyBudW1iZXJcbiAgICAgIGlmICh2LmlzU3RyaW5nKHZhbHVlKSAmJiBvcHRpb25zLnN0cmljdCkge1xuICAgICAgICB2YXIgcGF0dGVybiA9IFwiXi0/KDB8WzEtOV1cXFxcZCopXCI7XG4gICAgICAgIGlmICghb3B0aW9ucy5vbmx5SW50ZWdlcikge1xuICAgICAgICAgIHBhdHRlcm4gKz0gXCIoXFxcXC5cXFxcZCspP1wiO1xuICAgICAgICB9XG4gICAgICAgIHBhdHRlcm4gKz0gXCIkXCI7XG5cbiAgICAgICAgaWYgKCEobmV3IFJlZ0V4cChwYXR0ZXJuKS50ZXN0KHZhbHVlKSkpIHtcbiAgICAgICAgICByZXR1cm4gb3B0aW9ucy5tZXNzYWdlIHx8XG4gICAgICAgICAgICBvcHRpb25zLm5vdFZhbGlkIHx8XG4gICAgICAgICAgICB0aGlzLm5vdFZhbGlkIHx8XG4gICAgICAgICAgICB0aGlzLm1lc3NhZ2UgfHxcbiAgICAgICAgICAgIFwibXVzdCBiZSBhIHZhbGlkIG51bWJlclwiO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIENvZXJjZSB0aGUgdmFsdWUgdG8gYSBudW1iZXIgdW5sZXNzIHdlJ3JlIGJlaW5nIHN0cmljdC5cbiAgICAgIGlmIChvcHRpb25zLm5vU3RyaW5ncyAhPT0gdHJ1ZSAmJiB2LmlzU3RyaW5nKHZhbHVlKSAmJiAhdi5pc0VtcHR5KHZhbHVlKSkge1xuICAgICAgICB2YWx1ZSA9ICt2YWx1ZTtcbiAgICAgIH1cblxuICAgICAgLy8gSWYgaXQncyBub3QgYSBudW1iZXIgd2Ugc2hvdWxkbid0IGNvbnRpbnVlIHNpbmNlIGl0IHdpbGwgY29tcGFyZSBpdC5cbiAgICAgIGlmICghdi5pc051bWJlcih2YWx1ZSkpIHtcbiAgICAgICAgcmV0dXJuIG9wdGlvbnMubWVzc2FnZSB8fFxuICAgICAgICAgIG9wdGlvbnMubm90VmFsaWQgfHxcbiAgICAgICAgICB0aGlzLm5vdFZhbGlkIHx8XG4gICAgICAgICAgdGhpcy5tZXNzYWdlIHx8XG4gICAgICAgICAgXCJpcyBub3QgYSBudW1iZXJcIjtcbiAgICAgIH1cblxuICAgICAgLy8gU2FtZSBsb2dpYyBhcyBhYm92ZSwgc29ydCBvZi4gRG9uJ3QgYm90aGVyIHdpdGggY29tcGFyaXNvbnMgaWYgdGhpc1xuICAgICAgLy8gZG9lc24ndCBwYXNzLlxuICAgICAgaWYgKG9wdGlvbnMub25seUludGVnZXIgJiYgIXYuaXNJbnRlZ2VyKHZhbHVlKSkge1xuICAgICAgICByZXR1cm4gb3B0aW9ucy5tZXNzYWdlIHx8XG4gICAgICAgICAgb3B0aW9ucy5ub3RJbnRlZ2VyIHx8XG4gICAgICAgICAgdGhpcy5ub3RJbnRlZ2VyIHx8XG4gICAgICAgICAgdGhpcy5tZXNzYWdlIHx8XG4gICAgICAgICAgXCJtdXN0IGJlIGFuIGludGVnZXJcIjtcbiAgICAgIH1cblxuICAgICAgZm9yIChuYW1lIGluIGNoZWNrcykge1xuICAgICAgICBjb3VudCA9IG9wdGlvbnNbbmFtZV07XG4gICAgICAgIGlmICh2LmlzTnVtYmVyKGNvdW50KSAmJiAhY2hlY2tzW25hbWVdKHZhbHVlLCBjb3VudCkpIHtcbiAgICAgICAgICAvLyBUaGlzIHBpY2tzIHRoZSBkZWZhdWx0IG1lc3NhZ2UgaWYgc3BlY2lmaWVkXG4gICAgICAgICAgLy8gRm9yIGV4YW1wbGUgdGhlIGdyZWF0ZXJUaGFuIGNoZWNrIHVzZXMgdGhlIG1lc3NhZ2UgZnJvbVxuICAgICAgICAgIC8vIHRoaXMubm90R3JlYXRlclRoYW4gc28gd2UgY2FwaXRhbGl6ZSB0aGUgbmFtZSBhbmQgcHJlcGVuZCBcIm5vdFwiXG4gICAgICAgICAgdmFyIGtleSA9IFwibm90XCIgKyB2LmNhcGl0YWxpemUobmFtZSk7XG4gICAgICAgICAgdmFyIG1zZyA9IG9wdGlvbnNba2V5XSB8fFxuICAgICAgICAgICAgdGhpc1trZXldIHx8XG4gICAgICAgICAgICB0aGlzLm1lc3NhZ2UgfHxcbiAgICAgICAgICAgIFwibXVzdCBiZSAle3R5cGV9ICV7Y291bnR9XCI7XG5cbiAgICAgICAgICBlcnJvcnMucHVzaCh2LmZvcm1hdChtc2csIHtcbiAgICAgICAgICAgIGNvdW50OiBjb3VudCxcbiAgICAgICAgICAgIHR5cGU6IHByZXR0aWZ5KG5hbWUpXG4gICAgICAgICAgfSkpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChvcHRpb25zLm9kZCAmJiB2YWx1ZSAlIDIgIT09IDEpIHtcbiAgICAgICAgZXJyb3JzLnB1c2gob3B0aW9ucy5ub3RPZGQgfHxcbiAgICAgICAgICAgIHRoaXMubm90T2RkIHx8XG4gICAgICAgICAgICB0aGlzLm1lc3NhZ2UgfHxcbiAgICAgICAgICAgIFwibXVzdCBiZSBvZGRcIik7XG4gICAgICB9XG4gICAgICBpZiAob3B0aW9ucy5ldmVuICYmIHZhbHVlICUgMiAhPT0gMCkge1xuICAgICAgICBlcnJvcnMucHVzaChvcHRpb25zLm5vdEV2ZW4gfHxcbiAgICAgICAgICAgIHRoaXMubm90RXZlbiB8fFxuICAgICAgICAgICAgdGhpcy5tZXNzYWdlIHx8XG4gICAgICAgICAgICBcIm11c3QgYmUgZXZlblwiKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGVycm9ycy5sZW5ndGgpIHtcbiAgICAgICAgcmV0dXJuIG9wdGlvbnMubWVzc2FnZSB8fCBlcnJvcnM7XG4gICAgICB9XG4gICAgfSxcbiAgICBkYXRldGltZTogdi5leHRlbmQoZnVuY3Rpb24odmFsdWUsIG9wdGlvbnMpIHtcbiAgICAgIGlmICghdi5pc0Z1bmN0aW9uKHRoaXMucGFyc2UpIHx8ICF2LmlzRnVuY3Rpb24odGhpcy5mb3JtYXQpKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIkJvdGggdGhlIHBhcnNlIGFuZCBmb3JtYXQgZnVuY3Rpb25zIG5lZWRzIHRvIGJlIHNldCB0byB1c2UgdGhlIGRhdGV0aW1lL2RhdGUgdmFsaWRhdG9yXCIpO1xuICAgICAgfVxuXG4gICAgICAvLyBFbXB0eSB2YWx1ZXMgYXJlIGZpbmVcbiAgICAgIGlmICghdi5pc0RlZmluZWQodmFsdWUpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgb3B0aW9ucyA9IHYuZXh0ZW5kKHt9LCB0aGlzLm9wdGlvbnMsIG9wdGlvbnMpO1xuXG4gICAgICB2YXIgZXJyXG4gICAgICAgICwgZXJyb3JzID0gW11cbiAgICAgICAgLCBlYXJsaWVzdCA9IG9wdGlvbnMuZWFybGllc3QgPyB0aGlzLnBhcnNlKG9wdGlvbnMuZWFybGllc3QsIG9wdGlvbnMpIDogTmFOXG4gICAgICAgICwgbGF0ZXN0ID0gb3B0aW9ucy5sYXRlc3QgPyB0aGlzLnBhcnNlKG9wdGlvbnMubGF0ZXN0LCBvcHRpb25zKSA6IE5hTjtcblxuICAgICAgdmFsdWUgPSB0aGlzLnBhcnNlKHZhbHVlLCBvcHRpb25zKTtcblxuICAgICAgLy8gODY0MDAwMDAgaXMgdGhlIG51bWJlciBvZiBtaWxsaXNlY29uZHMgaW4gYSBkYXksIHRoaXMgaXMgdXNlZCB0byByZW1vdmVcbiAgICAgIC8vIHRoZSB0aW1lIGZyb20gdGhlIGRhdGVcbiAgICAgIGlmIChpc05hTih2YWx1ZSkgfHwgb3B0aW9ucy5kYXRlT25seSAmJiB2YWx1ZSAlIDg2NDAwMDAwICE9PSAwKSB7XG4gICAgICAgIGVyciA9IG9wdGlvbnMubm90VmFsaWQgfHxcbiAgICAgICAgICBvcHRpb25zLm1lc3NhZ2UgfHxcbiAgICAgICAgICB0aGlzLm5vdFZhbGlkIHx8XG4gICAgICAgICAgXCJtdXN0IGJlIGEgdmFsaWQgZGF0ZVwiO1xuICAgICAgICByZXR1cm4gdi5mb3JtYXQoZXJyLCB7dmFsdWU6IGFyZ3VtZW50c1swXX0pO1xuICAgICAgfVxuXG4gICAgICBpZiAoIWlzTmFOKGVhcmxpZXN0KSAmJiB2YWx1ZSA8IGVhcmxpZXN0KSB7XG4gICAgICAgIGVyciA9IG9wdGlvbnMudG9vRWFybHkgfHxcbiAgICAgICAgICBvcHRpb25zLm1lc3NhZ2UgfHxcbiAgICAgICAgICB0aGlzLnRvb0Vhcmx5IHx8XG4gICAgICAgICAgXCJtdXN0IGJlIG5vIGVhcmxpZXIgdGhhbiAle2RhdGV9XCI7XG4gICAgICAgIGVyciA9IHYuZm9ybWF0KGVyciwge1xuICAgICAgICAgIHZhbHVlOiB0aGlzLmZvcm1hdCh2YWx1ZSwgb3B0aW9ucyksXG4gICAgICAgICAgZGF0ZTogdGhpcy5mb3JtYXQoZWFybGllc3QsIG9wdGlvbnMpXG4gICAgICAgIH0pO1xuICAgICAgICBlcnJvcnMucHVzaChlcnIpO1xuICAgICAgfVxuXG4gICAgICBpZiAoIWlzTmFOKGxhdGVzdCkgJiYgdmFsdWUgPiBsYXRlc3QpIHtcbiAgICAgICAgZXJyID0gb3B0aW9ucy50b29MYXRlIHx8XG4gICAgICAgICAgb3B0aW9ucy5tZXNzYWdlIHx8XG4gICAgICAgICAgdGhpcy50b29MYXRlIHx8XG4gICAgICAgICAgXCJtdXN0IGJlIG5vIGxhdGVyIHRoYW4gJXtkYXRlfVwiO1xuICAgICAgICBlcnIgPSB2LmZvcm1hdChlcnIsIHtcbiAgICAgICAgICBkYXRlOiB0aGlzLmZvcm1hdChsYXRlc3QsIG9wdGlvbnMpLFxuICAgICAgICAgIHZhbHVlOiB0aGlzLmZvcm1hdCh2YWx1ZSwgb3B0aW9ucylcbiAgICAgICAgfSk7XG4gICAgICAgIGVycm9ycy5wdXNoKGVycik7XG4gICAgICB9XG5cbiAgICAgIGlmIChlcnJvcnMubGVuZ3RoKSB7XG4gICAgICAgIHJldHVybiB2LnVuaXF1ZShlcnJvcnMpO1xuICAgICAgfVxuICAgIH0sIHtcbiAgICAgIHBhcnNlOiBudWxsLFxuICAgICAgZm9ybWF0OiBudWxsXG4gICAgfSksXG4gICAgZGF0ZTogZnVuY3Rpb24odmFsdWUsIG9wdGlvbnMpIHtcbiAgICAgIG9wdGlvbnMgPSB2LmV4dGVuZCh7fSwgb3B0aW9ucywge2RhdGVPbmx5OiB0cnVlfSk7XG4gICAgICByZXR1cm4gdi52YWxpZGF0b3JzLmRhdGV0aW1lLmNhbGwodi52YWxpZGF0b3JzLmRhdGV0aW1lLCB2YWx1ZSwgb3B0aW9ucyk7XG4gICAgfSxcbiAgICBmb3JtYXQ6IGZ1bmN0aW9uKHZhbHVlLCBvcHRpb25zKSB7XG4gICAgICBpZiAodi5pc1N0cmluZyhvcHRpb25zKSB8fCAob3B0aW9ucyBpbnN0YW5jZW9mIFJlZ0V4cCkpIHtcbiAgICAgICAgb3B0aW9ucyA9IHtwYXR0ZXJuOiBvcHRpb25zfTtcbiAgICAgIH1cblxuICAgICAgb3B0aW9ucyA9IHYuZXh0ZW5kKHt9LCB0aGlzLm9wdGlvbnMsIG9wdGlvbnMpO1xuXG4gICAgICB2YXIgbWVzc2FnZSA9IG9wdGlvbnMubWVzc2FnZSB8fCB0aGlzLm1lc3NhZ2UgfHwgXCJpcyBpbnZhbGlkXCJcbiAgICAgICAgLCBwYXR0ZXJuID0gb3B0aW9ucy5wYXR0ZXJuXG4gICAgICAgICwgbWF0Y2g7XG5cbiAgICAgIC8vIEVtcHR5IHZhbHVlcyBhcmUgYWxsb3dlZFxuICAgICAgaWYgKCF2LmlzRGVmaW5lZCh2YWx1ZSkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgaWYgKCF2LmlzU3RyaW5nKHZhbHVlKSkge1xuICAgICAgICByZXR1cm4gbWVzc2FnZTtcbiAgICAgIH1cblxuICAgICAgaWYgKHYuaXNTdHJpbmcocGF0dGVybikpIHtcbiAgICAgICAgcGF0dGVybiA9IG5ldyBSZWdFeHAob3B0aW9ucy5wYXR0ZXJuLCBvcHRpb25zLmZsYWdzKTtcbiAgICAgIH1cbiAgICAgIG1hdGNoID0gcGF0dGVybi5leGVjKHZhbHVlKTtcbiAgICAgIGlmICghbWF0Y2ggfHwgbWF0Y2hbMF0ubGVuZ3RoICE9IHZhbHVlLmxlbmd0aCkge1xuICAgICAgICByZXR1cm4gbWVzc2FnZTtcbiAgICAgIH1cbiAgICB9LFxuICAgIGluY2x1c2lvbjogZnVuY3Rpb24odmFsdWUsIG9wdGlvbnMpIHtcbiAgICAgIC8vIEVtcHR5IHZhbHVlcyBhcmUgZmluZVxuICAgICAgaWYgKCF2LmlzRGVmaW5lZCh2YWx1ZSkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgaWYgKHYuaXNBcnJheShvcHRpb25zKSkge1xuICAgICAgICBvcHRpb25zID0ge3dpdGhpbjogb3B0aW9uc307XG4gICAgICB9XG4gICAgICBvcHRpb25zID0gdi5leHRlbmQoe30sIHRoaXMub3B0aW9ucywgb3B0aW9ucyk7XG4gICAgICBpZiAodi5jb250YWlucyhvcHRpb25zLndpdGhpbiwgdmFsdWUpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHZhciBtZXNzYWdlID0gb3B0aW9ucy5tZXNzYWdlIHx8XG4gICAgICAgIHRoaXMubWVzc2FnZSB8fFxuICAgICAgICBcIl4le3ZhbHVlfSBpcyBub3QgaW5jbHVkZWQgaW4gdGhlIGxpc3RcIjtcbiAgICAgIHJldHVybiB2LmZvcm1hdChtZXNzYWdlLCB7dmFsdWU6IHZhbHVlfSk7XG4gICAgfSxcbiAgICBleGNsdXNpb246IGZ1bmN0aW9uKHZhbHVlLCBvcHRpb25zKSB7XG4gICAgICAvLyBFbXB0eSB2YWx1ZXMgYXJlIGZpbmVcbiAgICAgIGlmICghdi5pc0RlZmluZWQodmFsdWUpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGlmICh2LmlzQXJyYXkob3B0aW9ucykpIHtcbiAgICAgICAgb3B0aW9ucyA9IHt3aXRoaW46IG9wdGlvbnN9O1xuICAgICAgfVxuICAgICAgb3B0aW9ucyA9IHYuZXh0ZW5kKHt9LCB0aGlzLm9wdGlvbnMsIG9wdGlvbnMpO1xuICAgICAgaWYgKCF2LmNvbnRhaW5zKG9wdGlvbnMud2l0aGluLCB2YWx1ZSkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgdmFyIG1lc3NhZ2UgPSBvcHRpb25zLm1lc3NhZ2UgfHwgdGhpcy5tZXNzYWdlIHx8IFwiXiV7dmFsdWV9IGlzIHJlc3RyaWN0ZWRcIjtcbiAgICAgIGlmICh2LmlzU3RyaW5nKG9wdGlvbnMud2l0aGluW3ZhbHVlXSkpIHtcbiAgICAgICAgdmFsdWUgPSBvcHRpb25zLndpdGhpblt2YWx1ZV07XG4gICAgICB9XG4gICAgICByZXR1cm4gdi5mb3JtYXQobWVzc2FnZSwge3ZhbHVlOiB2YWx1ZX0pO1xuICAgIH0sXG4gICAgZW1haWw6IHYuZXh0ZW5kKGZ1bmN0aW9uKHZhbHVlLCBvcHRpb25zKSB7XG4gICAgICBvcHRpb25zID0gdi5leHRlbmQoe30sIHRoaXMub3B0aW9ucywgb3B0aW9ucyk7XG4gICAgICB2YXIgbWVzc2FnZSA9IG9wdGlvbnMubWVzc2FnZSB8fCB0aGlzLm1lc3NhZ2UgfHwgXCJpcyBub3QgYSB2YWxpZCBlbWFpbFwiO1xuICAgICAgLy8gRW1wdHkgdmFsdWVzIGFyZSBmaW5lXG4gICAgICBpZiAoIXYuaXNEZWZpbmVkKHZhbHVlKSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBpZiAoIXYuaXNTdHJpbmcodmFsdWUpKSB7XG4gICAgICAgIHJldHVybiBtZXNzYWdlO1xuICAgICAgfVxuICAgICAgaWYgKCF0aGlzLlBBVFRFUk4uZXhlYyh2YWx1ZSkpIHtcbiAgICAgICAgcmV0dXJuIG1lc3NhZ2U7XG4gICAgICB9XG4gICAgfSwge1xuICAgICAgUEFUVEVSTjogL14oPzpbYS16MC05ISMkJSYnKisvPT9eX2B7fH1+LV0rKD86XFwuW2EtejAtOSEjJCUmJyorLz0/Xl9ge3x9fi1dKykqfFwiKD86W1xceDAxLVxceDA4XFx4MGJcXHgwY1xceDBlLVxceDFmXFx4MjFcXHgyMy1cXHg1YlxceDVkLVxceDdmXXxcXFxcW1xceDAxLVxceDA5XFx4MGJcXHgwY1xceDBlLVxceDdmXSkqXCIpQCg/Oig/OlthLXowLTldKD86W2EtejAtOS1dKlthLXowLTldKT9cXC4pK1thLXowLTldKD86W2EtejAtOS1dKlthLXowLTldKT98XFxbKD86KD86MjVbMC01XXwyWzAtNF1bMC05XXxbMDFdP1swLTldWzAtOV0/KVxcLil7M30oPzoyNVswLTVdfDJbMC00XVswLTldfFswMV0/WzAtOV1bMC05XT98W2EtejAtOS1dKlthLXowLTldOig/OltcXHgwMS1cXHgwOFxceDBiXFx4MGNcXHgwZS1cXHgxZlxceDIxLVxceDVhXFx4NTMtXFx4N2ZdfFxcXFxbXFx4MDEtXFx4MDlcXHgwYlxceDBjXFx4MGUtXFx4N2ZdKSspXFxdKSQvaVxuICAgIH0pLFxuICAgIGVxdWFsaXR5OiBmdW5jdGlvbih2YWx1ZSwgb3B0aW9ucywgYXR0cmlidXRlLCBhdHRyaWJ1dGVzLCBnbG9iYWxPcHRpb25zKSB7XG4gICAgICBpZiAoIXYuaXNEZWZpbmVkKHZhbHVlKSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGlmICh2LmlzU3RyaW5nKG9wdGlvbnMpKSB7XG4gICAgICAgIG9wdGlvbnMgPSB7YXR0cmlidXRlOiBvcHRpb25zfTtcbiAgICAgIH1cbiAgICAgIG9wdGlvbnMgPSB2LmV4dGVuZCh7fSwgdGhpcy5vcHRpb25zLCBvcHRpb25zKTtcbiAgICAgIHZhciBtZXNzYWdlID0gb3B0aW9ucy5tZXNzYWdlIHx8XG4gICAgICAgIHRoaXMubWVzc2FnZSB8fFxuICAgICAgICBcImlzIG5vdCBlcXVhbCB0byAle2F0dHJpYnV0ZX1cIjtcblxuICAgICAgaWYgKHYuaXNFbXB0eShvcHRpb25zLmF0dHJpYnV0ZSkgfHwgIXYuaXNTdHJpbmcob3B0aW9ucy5hdHRyaWJ1dGUpKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIlRoZSBhdHRyaWJ1dGUgbXVzdCBiZSBhIG5vbiBlbXB0eSBzdHJpbmdcIik7XG4gICAgICB9XG5cbiAgICAgIHZhciBvdGhlclZhbHVlID0gdi5nZXREZWVwT2JqZWN0VmFsdWUoYXR0cmlidXRlcywgb3B0aW9ucy5hdHRyaWJ1dGUpXG4gICAgICAgICwgY29tcGFyYXRvciA9IG9wdGlvbnMuY29tcGFyYXRvciB8fCBmdW5jdGlvbih2MSwgdjIpIHtcbiAgICAgICAgICByZXR1cm4gdjEgPT09IHYyO1xuICAgICAgICB9XG4gICAgICAgICwgcHJldHRpZnkgPSBvcHRpb25zLnByZXR0aWZ5IHx8XG4gICAgICAgICAgKGdsb2JhbE9wdGlvbnMgJiYgZ2xvYmFsT3B0aW9ucy5wcmV0dGlmeSkgfHxcbiAgICAgICAgICB2LnByZXR0aWZ5O1xuXG4gICAgICBpZiAoIWNvbXBhcmF0b3IodmFsdWUsIG90aGVyVmFsdWUsIG9wdGlvbnMsIGF0dHJpYnV0ZSwgYXR0cmlidXRlcykpIHtcbiAgICAgICAgcmV0dXJuIHYuZm9ybWF0KG1lc3NhZ2UsIHthdHRyaWJ1dGU6IHByZXR0aWZ5KG9wdGlvbnMuYXR0cmlidXRlKX0pO1xuICAgICAgfVxuICAgIH0sXG4gICAgLy8gQSBVUkwgdmFsaWRhdG9yIHRoYXQgaXMgdXNlZCB0byB2YWxpZGF0ZSBVUkxzIHdpdGggdGhlIGFiaWxpdHkgdG9cbiAgICAvLyByZXN0cmljdCBzY2hlbWVzIGFuZCBzb21lIGRvbWFpbnMuXG4gICAgdXJsOiBmdW5jdGlvbih2YWx1ZSwgb3B0aW9ucykge1xuICAgICAgaWYgKCF2LmlzRGVmaW5lZCh2YWx1ZSkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBvcHRpb25zID0gdi5leHRlbmQoe30sIHRoaXMub3B0aW9ucywgb3B0aW9ucyk7XG5cbiAgICAgIHZhciBtZXNzYWdlID0gb3B0aW9ucy5tZXNzYWdlIHx8IHRoaXMubWVzc2FnZSB8fCBcImlzIG5vdCBhIHZhbGlkIHVybFwiXG4gICAgICAgICwgc2NoZW1lcyA9IG9wdGlvbnMuc2NoZW1lcyB8fCB0aGlzLnNjaGVtZXMgfHwgWydodHRwJywgJ2h0dHBzJ11cbiAgICAgICAgLCBhbGxvd0xvY2FsID0gb3B0aW9ucy5hbGxvd0xvY2FsIHx8IHRoaXMuYWxsb3dMb2NhbCB8fCBmYWxzZVxuICAgICAgICAsIGFsbG93RGF0YVVybCA9IG9wdGlvbnMuYWxsb3dEYXRhVXJsIHx8IHRoaXMuYWxsb3dEYXRhVXJsIHx8IGZhbHNlO1xuICAgICAgaWYgKCF2LmlzU3RyaW5nKHZhbHVlKSkge1xuICAgICAgICByZXR1cm4gbWVzc2FnZTtcbiAgICAgIH1cblxuICAgICAgLy8gaHR0cHM6Ly9naXN0LmdpdGh1Yi5jb20vZHBlcmluaS83MjkyOTRcbiAgICAgIHZhciByZWdleCA9XG4gICAgICAgIFwiXlwiICtcbiAgICAgICAgLy8gcHJvdG9jb2wgaWRlbnRpZmllclxuICAgICAgICBcIig/Oig/OlwiICsgc2NoZW1lcy5qb2luKFwifFwiKSArIFwiKTovLylcIiArXG4gICAgICAgIC8vIHVzZXI6cGFzcyBhdXRoZW50aWNhdGlvblxuICAgICAgICBcIig/OlxcXFxTKyg/OjpcXFxcUyopP0ApP1wiICtcbiAgICAgICAgXCIoPzpcIjtcblxuICAgICAgdmFyIHRsZCA9IFwiKD86XFxcXC4oPzpbYS16XFxcXHUwMGExLVxcXFx1ZmZmZl17Mix9KSlcIjtcblxuICAgICAgaWYgKGFsbG93TG9jYWwpIHtcbiAgICAgICAgdGxkICs9IFwiP1wiO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVnZXggKz1cbiAgICAgICAgICAvLyBJUCBhZGRyZXNzIGV4Y2x1c2lvblxuICAgICAgICAgIC8vIHByaXZhdGUgJiBsb2NhbCBuZXR3b3Jrc1xuICAgICAgICAgIFwiKD8hKD86MTB8MTI3KSg/OlxcXFwuXFxcXGR7MSwzfSl7M30pXCIgK1xuICAgICAgICAgIFwiKD8hKD86MTY5XFxcXC4yNTR8MTkyXFxcXC4xNjgpKD86XFxcXC5cXFxcZHsxLDN9KXsyfSlcIiArXG4gICAgICAgICAgXCIoPyExNzJcXFxcLig/OjFbNi05XXwyXFxcXGR8M1swLTFdKSg/OlxcXFwuXFxcXGR7MSwzfSl7Mn0pXCI7XG4gICAgICB9XG5cbiAgICAgIHJlZ2V4ICs9XG4gICAgICAgICAgLy8gSVAgYWRkcmVzcyBkb3R0ZWQgbm90YXRpb24gb2N0ZXRzXG4gICAgICAgICAgLy8gZXhjbHVkZXMgbG9vcGJhY2sgbmV0d29yayAwLjAuMC4wXG4gICAgICAgICAgLy8gZXhjbHVkZXMgcmVzZXJ2ZWQgc3BhY2UgPj0gMjI0LjAuMC4wXG4gICAgICAgICAgLy8gZXhjbHVkZXMgbmV0d29yayAmIGJyb2FjYXN0IGFkZHJlc3Nlc1xuICAgICAgICAgIC8vIChmaXJzdCAmIGxhc3QgSVAgYWRkcmVzcyBvZiBlYWNoIGNsYXNzKVxuICAgICAgICAgIFwiKD86WzEtOV1cXFxcZD98MVxcXFxkXFxcXGR8MlswMV1cXFxcZHwyMlswLTNdKVwiICtcbiAgICAgICAgICBcIig/OlxcXFwuKD86MT9cXFxcZHsxLDJ9fDJbMC00XVxcXFxkfDI1WzAtNV0pKXsyfVwiICtcbiAgICAgICAgICBcIig/OlxcXFwuKD86WzEtOV1cXFxcZD98MVxcXFxkXFxcXGR8MlswLTRdXFxcXGR8MjVbMC00XSkpXCIgK1xuICAgICAgICBcInxcIiArXG4gICAgICAgICAgLy8gaG9zdCBuYW1lXG4gICAgICAgICAgXCIoPzooPzpbYS16XFxcXHUwMGExLVxcXFx1ZmZmZjAtOV0tKikqW2EtelxcXFx1MDBhMS1cXFxcdWZmZmYwLTldKylcIiArXG4gICAgICAgICAgLy8gZG9tYWluIG5hbWVcbiAgICAgICAgICBcIig/OlxcXFwuKD86W2EtelxcXFx1MDBhMS1cXFxcdWZmZmYwLTldLSopKlthLXpcXFxcdTAwYTEtXFxcXHVmZmZmMC05XSspKlwiICtcbiAgICAgICAgICB0bGQgK1xuICAgICAgICBcIilcIiArXG4gICAgICAgIC8vIHBvcnQgbnVtYmVyXG4gICAgICAgIFwiKD86OlxcXFxkezIsNX0pP1wiICtcbiAgICAgICAgLy8gcmVzb3VyY2UgcGF0aFxuICAgICAgICBcIig/OlsvPyNdXFxcXFMqKT9cIiArXG4gICAgICBcIiRcIjtcblxuICAgICAgaWYgKGFsbG93RGF0YVVybCkge1xuICAgICAgICAvLyBSRkMgMjM5N1xuICAgICAgICB2YXIgbWVkaWFUeXBlID0gXCJcXFxcdytcXFxcL1stKy5cXFxcd10rKD86O1tcXFxcdz1dKykqXCI7XG4gICAgICAgIHZhciB1cmxjaGFyID0gXCJbQS1aYS16MC05LV8uIX5cXFxcKicoKTtcXFxcLz86QCY9KyQsJV0qXCI7XG4gICAgICAgIHZhciBkYXRhdXJsID0gXCJkYXRhOig/OlwiK21lZGlhVHlwZStcIik/KD86O2Jhc2U2NCk/LFwiK3VybGNoYXI7XG4gICAgICAgIHJlZ2V4ID0gXCIoPzpcIityZWdleCtcIil8KD86XlwiK2RhdGF1cmwrXCIkKVwiO1xuICAgICAgfVxuXG4gICAgICB2YXIgUEFUVEVSTiA9IG5ldyBSZWdFeHAocmVnZXgsICdpJyk7XG4gICAgICBpZiAoIVBBVFRFUk4uZXhlYyh2YWx1ZSkpIHtcbiAgICAgICAgcmV0dXJuIG1lc3NhZ2U7XG4gICAgICB9XG4gICAgfSxcbiAgICB0eXBlOiB2LmV4dGVuZChmdW5jdGlvbih2YWx1ZSwgb3JpZ2luYWxPcHRpb25zLCBhdHRyaWJ1dGUsIGF0dHJpYnV0ZXMsIGdsb2JhbE9wdGlvbnMpIHtcbiAgICAgIGlmICh2LmlzU3RyaW5nKG9yaWdpbmFsT3B0aW9ucykpIHtcbiAgICAgICAgb3JpZ2luYWxPcHRpb25zID0ge3R5cGU6IG9yaWdpbmFsT3B0aW9uc307XG4gICAgICB9XG5cbiAgICAgIGlmICghdi5pc0RlZmluZWQodmFsdWUpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdmFyIG9wdGlvbnMgPSB2LmV4dGVuZCh7fSwgdGhpcy5vcHRpb25zLCBvcmlnaW5hbE9wdGlvbnMpO1xuXG4gICAgICB2YXIgdHlwZSA9IG9wdGlvbnMudHlwZTtcbiAgICAgIGlmICghdi5pc0RlZmluZWQodHlwZSkpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTm8gdHlwZSB3YXMgc3BlY2lmaWVkXCIpO1xuICAgICAgfVxuXG4gICAgICB2YXIgY2hlY2s7XG4gICAgICBpZiAodi5pc0Z1bmN0aW9uKHR5cGUpKSB7XG4gICAgICAgIGNoZWNrID0gdHlwZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNoZWNrID0gdGhpcy50eXBlc1t0eXBlXTtcbiAgICAgIH1cblxuICAgICAgaWYgKCF2LmlzRnVuY3Rpb24oY2hlY2spKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcInZhbGlkYXRlLnZhbGlkYXRvcnMudHlwZS50eXBlcy5cIiArIHR5cGUgKyBcIiBtdXN0IGJlIGEgZnVuY3Rpb24uXCIpO1xuICAgICAgfVxuXG4gICAgICBpZiAoIWNoZWNrKHZhbHVlLCBvcHRpb25zLCBhdHRyaWJ1dGUsIGF0dHJpYnV0ZXMsIGdsb2JhbE9wdGlvbnMpKSB7XG4gICAgICAgIHZhciBtZXNzYWdlID0gb3JpZ2luYWxPcHRpb25zLm1lc3NhZ2UgfHxcbiAgICAgICAgICB0aGlzLm1lc3NhZ2VzW3R5cGVdIHx8XG4gICAgICAgICAgdGhpcy5tZXNzYWdlIHx8XG4gICAgICAgICAgb3B0aW9ucy5tZXNzYWdlIHx8XG4gICAgICAgICAgKHYuaXNGdW5jdGlvbih0eXBlKSA/IFwibXVzdCBiZSBvZiB0aGUgY29ycmVjdCB0eXBlXCIgOiBcIm11c3QgYmUgb2YgdHlwZSAle3R5cGV9XCIpO1xuXG4gICAgICAgIGlmICh2LmlzRnVuY3Rpb24obWVzc2FnZSkpIHtcbiAgICAgICAgICBtZXNzYWdlID0gbWVzc2FnZSh2YWx1ZSwgb3JpZ2luYWxPcHRpb25zLCBhdHRyaWJ1dGUsIGF0dHJpYnV0ZXMsIGdsb2JhbE9wdGlvbnMpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHYuZm9ybWF0KG1lc3NhZ2UsIHthdHRyaWJ1dGU6IHYucHJldHRpZnkoYXR0cmlidXRlKSwgdHlwZTogdHlwZX0pO1xuICAgICAgfVxuICAgIH0sIHtcbiAgICAgIHR5cGVzOiB7XG4gICAgICAgIG9iamVjdDogZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgICByZXR1cm4gdi5pc09iamVjdCh2YWx1ZSkgJiYgIXYuaXNBcnJheSh2YWx1ZSk7XG4gICAgICAgIH0sXG4gICAgICAgIGFycmF5OiB2LmlzQXJyYXksXG4gICAgICAgIGludGVnZXI6IHYuaXNJbnRlZ2VyLFxuICAgICAgICBudW1iZXI6IHYuaXNOdW1iZXIsXG4gICAgICAgIHN0cmluZzogdi5pc1N0cmluZyxcbiAgICAgICAgZGF0ZTogdi5pc0RhdGUsXG4gICAgICAgIGJvb2xlYW46IHYuaXNCb29sZWFuXG4gICAgICB9LFxuICAgICAgbWVzc2FnZXM6IHt9XG4gICAgfSlcbiAgfTtcblxuICB2YWxpZGF0ZS5mb3JtYXR0ZXJzID0ge1xuICAgIGRldGFpbGVkOiBmdW5jdGlvbihlcnJvcnMpIHtyZXR1cm4gZXJyb3JzO30sXG4gICAgZmxhdDogdi5mbGF0dGVuRXJyb3JzVG9BcnJheSxcbiAgICBncm91cGVkOiBmdW5jdGlvbihlcnJvcnMpIHtcbiAgICAgIHZhciBhdHRyO1xuXG4gICAgICBlcnJvcnMgPSB2Lmdyb3VwRXJyb3JzQnlBdHRyaWJ1dGUoZXJyb3JzKTtcbiAgICAgIGZvciAoYXR0ciBpbiBlcnJvcnMpIHtcbiAgICAgICAgZXJyb3JzW2F0dHJdID0gdi5mbGF0dGVuRXJyb3JzVG9BcnJheShlcnJvcnNbYXR0cl0pO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGVycm9ycztcbiAgICB9LFxuICAgIGNvbnN0cmFpbnQ6IGZ1bmN0aW9uKGVycm9ycykge1xuICAgICAgdmFyIGF0dHI7XG4gICAgICBlcnJvcnMgPSB2Lmdyb3VwRXJyb3JzQnlBdHRyaWJ1dGUoZXJyb3JzKTtcbiAgICAgIGZvciAoYXR0ciBpbiBlcnJvcnMpIHtcbiAgICAgICAgZXJyb3JzW2F0dHJdID0gZXJyb3JzW2F0dHJdLm1hcChmdW5jdGlvbihyZXN1bHQpIHtcbiAgICAgICAgICByZXR1cm4gcmVzdWx0LnZhbGlkYXRvcjtcbiAgICAgICAgfSkuc29ydCgpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGVycm9ycztcbiAgICB9XG4gIH07XG5cbiAgdmFsaWRhdGUuZXhwb3NlTW9kdWxlKHZhbGlkYXRlLCB0aGlzLCBleHBvcnRzLCBtb2R1bGUsIGRlZmluZSk7XG59KS5jYWxsKHRoaXMsXG4gICAgICAgIHR5cGVvZiBleHBvcnRzICE9PSAndW5kZWZpbmVkJyA/IC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovIGV4cG9ydHMgOiBudWxsLFxuICAgICAgICB0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyA/IC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovIG1vZHVsZSA6IG51bGwsXG4gICAgICAgIHR5cGVvZiBkZWZpbmUgIT09ICd1bmRlZmluZWQnID8gLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi8gZGVmaW5lIDogbnVsbCk7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCkge1xuXHR0aHJvdyBuZXcgRXJyb3IoXCJkZWZpbmUgY2Fubm90IGJlIHVzZWQgaW5kaXJlY3RcIik7XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihtb2R1bGUpIHtcblx0aWYgKCFtb2R1bGUud2VicGFja1BvbHlmaWxsKSB7XG5cdFx0bW9kdWxlLmRlcHJlY2F0ZSA9IGZ1bmN0aW9uKCkge307XG5cdFx0bW9kdWxlLnBhdGhzID0gW107XG5cdFx0Ly8gbW9kdWxlLnBhcmVudCA9IHVuZGVmaW5lZCBieSBkZWZhdWx0XG5cdFx0aWYgKCFtb2R1bGUuY2hpbGRyZW4pIG1vZHVsZS5jaGlsZHJlbiA9IFtdO1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShtb2R1bGUsIFwibG9hZGVkXCIsIHtcblx0XHRcdGVudW1lcmFibGU6IHRydWUsXG5cdFx0XHRnZXQ6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRyZXR1cm4gbW9kdWxlLmw7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG1vZHVsZSwgXCJpZFwiLCB7XG5cdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuXHRcdFx0Z2V0OiBmdW5jdGlvbigpIHtcblx0XHRcdFx0cmV0dXJuIG1vZHVsZS5pO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHRcdG1vZHVsZS53ZWJwYWNrUG9seWZpbGwgPSAxO1xuXHR9XG5cdHJldHVybiBtb2R1bGU7XG59O1xuIl0sInNvdXJjZVJvb3QiOiIifQ==