(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["commons"],{

/***/ "./Resources/Scripts/helpers/array-helper.ts":
/*!***************************************************!*\
  !*** ./Resources/Scripts/helpers/array-helper.ts ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ArrayHelpers = /** @class */ (function () {
    function ArrayHelpers() {
    }
    ArrayHelpers.coerceToArrayBuffer = function (data) {
        if (typeof data === "string") {
            data = data.replace(/-/g, "+").replace(/_/g, "/");
            var str = window.atob(data);
            var bytes = new Uint8Array(str.length);
            for (var i = 0; i < str.length; i++) {
                bytes[i] = str.charCodeAt(i);
            }
            data = bytes;
        }
        if (Array.isArray(data)) {
            data = new Uint8Array(data);
        }
        if (data instanceof Uint8Array) {
            data = data.buffer;
        }
        if (!(data instanceof ArrayBuffer)) {
            throw new TypeError("could not coerce data to ArrayBuffer");
        }
        return data;
    };
    ;
    ArrayHelpers.coerceToBase64Url = function (data) {
        if (Array.isArray(data)) {
            data = Uint8Array.from(data);
        }
        if (data instanceof ArrayBuffer) {
            data = new Uint8Array(data);
        }
        if (data instanceof Uint8Array) {
            var str = "";
            var len = data.byteLength;
            for (var i = 0; i < len; i++) {
                str += String.fromCharCode(data[i]);
            }
            data = window.btoa(str);
        }
        if (typeof data !== "string") {
            throw new Error("could not coerce to string");
        }
        data = data.replace(/\+/g, "-").replace(/\//g, "_").replace(/=*$/g, "");
        return data;
    };
    return ArrayHelpers;
}());
exports.ArrayHelpers = ArrayHelpers;


/***/ }),

/***/ "./Resources/Scripts/services/datatables-odata-provider.ts":
/*!*****************************************************************!*\
  !*** ./Resources/Scripts/services/datatables-odata-provider.ts ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function($) {
Object.defineProperty(exports, "__esModule", { value: true });
var DataTablesODataProvider = /** @class */ (function () {
    function DataTablesODataProvider() {
    }
    DataTablesODataProvider.providerFunction = function (url) {
        return function (data, callback, settings) {
            var params = {};
            $.each(data, function (i, value) {
                params[i] = value;
            });
            console.log(params);
            var odataQuery = {
                $format: 'json'
            };
            $.each(settings.aoColumns, function (i, value) {
                var sFieldName = ((typeof value.mData === 'string') ? value.mData : null);
                if (sFieldName === null || !isNaN(Number(sFieldName))) {
                    return;
                }
                if (odataQuery.$select == null) {
                    odataQuery.$select = sFieldName;
                }
                else {
                    odataQuery.$select += "," + sFieldName;
                }
            });
            console.log(odataQuery);
            odataQuery.$skip = settings._iDisplayStart;
            if (settings._iDisplayLength > -1) {
                odataQuery.$top = settings._iDisplayLength;
            }
            odataQuery.$count = true;
            var asFilters = [];
            var asColumnFilters = []; //used for jquery.dataTables.columnFilter.js
            $.each(settings.aoColumns, function (i, value) {
                var sFieldName = value.sName || value.mData;
                var columnFilter = params["sSearch_" + i]; //fortunately columnFilter's _number matches the index of aoColumns
                if ((params.search && params.search.value || columnFilter) && value.bSearchable) {
                    switch (value.sType) {
                        case 'string':
                        case 'html':
                            if (params.search && params.search.value) {
                                asFilters.push("indexof(tolower(" + sFieldName + "), '" + params.search.value.toLowerCase() + "') gt -1");
                            }
                            if (columnFilter) {
                                asColumnFilters.push("indexof(tolower(" + sFieldName + "), '" + columnFilter.toLowerCase() + "') gt -1");
                            }
                            break;
                        case 'date':
                        case 'numeric':
                            var fnFormatValue = (value.sType == 'numeric') ? function (val) { return val; } : function (val) { return (new Date(val)).toISOString(); };
                            if (columnFilter !== null && columnFilter !== "" && columnFilter !== "~") {
                                var asRanges = columnFilter.split("~");
                                if (asRanges[0] !== "") {
                                    asColumnFilters.push("(" + sFieldName + " gt " + fnFormatValue(asRanges[0]) + ")");
                                }
                                if (asRanges[1] !== "") {
                                    asColumnFilters.push("(" + sFieldName + " lt " + fnFormatValue(asRanges[1]) + ")");
                                }
                            }
                            break;
                        default:
                            break;
                    }
                }
            });
            if (asFilters.length > 0) {
                odataQuery.$filter = asFilters.join(" or ");
            }
            if (asColumnFilters.length > 0) {
                if (odataQuery.$filter !== undefined) {
                    odataQuery.$filter = " ( " + odataQuery.$filter + " ) and ( " + asColumnFilters.join(" and ") + " ) ";
                }
                else {
                    odataQuery.$filter = asColumnFilters.join(" and ");
                }
            }
            console.log(odataQuery);
            var asOrderBy = [];
            for (var i = 0; i < params.iSortingCols; i++) {
                asOrderBy.push(params["mDataProp_" + params["iSortCol_" + i]] + " " + (params["sSortDir_" + i] || ""));
            }
            if (asOrderBy.length > 0) {
                odataQuery.$orderby = asOrderBy.join();
            }
            console.log(odataQuery);
            $.ajax({
                url: url,
                data: odataQuery,
                success: function (returnedData) {
                    var oDataSource = {};
                    // Probe data structures for V4, V3, and V2 versions of OData response
                    oDataSource.aaData = returnedData.value || (returnedData.d && returnedData.d.results) || returnedData.d;
                    var iCount = (returnedData["@odata.count"]) ? returnedData["@odata.count"] : ((returnedData["odata.count"]) ? returnedData["odata.count"] : ((returnedData.__count) ? returnedData.__count : (returnedData.d && returnedData.d.__count)));
                    if (iCount == null) {
                        if (oDataSource.aaData.length === settings._iDisplayLength) {
                            oDataSource.iTotalRecords = settings._iDisplayStart + settings._iDisplayLength + 1;
                        }
                        else {
                            oDataSource.iTotalRecords = settings._iDisplayStart + oDataSource.aaData.length;
                        }
                    }
                    else {
                        oDataSource.iTotalRecords = iCount;
                    }
                    oDataSource.iTotalDisplayRecords = oDataSource.iTotalRecords;
                    callback(oDataSource);
                }
            });
        };
    };
    return DataTablesODataProvider;
}());
exports.DataTablesODataProvider = DataTablesODataProvider;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js")))

/***/ }),

/***/ "./Resources/Scripts/services/validator.ts":
/*!*************************************************!*\
  !*** ./Resources/Scripts/services/validator.ts ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(jQuery) {
Object.defineProperty(exports, "__esModule", { value: true });
var validate = __webpack_require__(/*! validate.js */ "./node_modules/validate.js/validate.js");
var Validator = /** @class */ (function () {
    function Validator(formQuery, validateOnSubmit) {
        var _this = this;
        if (validateOnSubmit === void 0) { validateOnSubmit = true; }
        this.hasValidated = false;
        var contextThis = this;
        if (formQuery.isPrototypeOf(String)) {
            this.form = document.querySelector(formQuery);
        }
        else if (formQuery instanceof jQuery && formQuery.length) {
            this.form = formQuery[0];
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
        var els = this.form.querySelectorAll('input:not([type="hidden"]):not([data-val="false"]), textarea:not([data-val="false"])');
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
        if (validateOnSubmit) {
            this.form.addEventListener('submit', function (e) { contextThis.formSubmit(e); });
        }
        this.formSubmitted = false;
    }
    Validator.prototype.elementChange = function (event) {
        if (this.hasValidated) {
            this.performValidation();
        }
    };
    Validator.prototype.validate = function () {
        this.hasValidated = true;
        return this.performValidation();
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

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js")))

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9SZXNvdXJjZXMvU2NyaXB0cy9oZWxwZXJzL2FycmF5LWhlbHBlci50cyIsIndlYnBhY2s6Ly8vLi9SZXNvdXJjZXMvU2NyaXB0cy9zZXJ2aWNlcy9kYXRhdGFibGVzLW9kYXRhLXByb3ZpZGVyLnRzIiwid2VicGFjazovLy8uL1Jlc291cmNlcy9TY3JpcHRzL3NlcnZpY2VzL3ZhbGlkYXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQTtJQUFBO0lBd0RBLENBQUM7SUF2RGlCLGdDQUFtQixHQUFqQyxVQUFrQyxJQUFtQztRQUNqRSxJQUFJLE9BQU8sSUFBSSxLQUFLLFFBQVEsRUFBRTtZQUMxQixJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQztZQUVsRCxJQUFJLEdBQUcsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzVCLElBQUksS0FBSyxHQUFHLElBQUksVUFBVSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUN2QyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtnQkFDakMsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDaEM7WUFDRCxJQUFJLEdBQUcsS0FBSyxDQUFDO1NBQ2hCO1FBRUQsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQ3JCLElBQUksR0FBRyxJQUFJLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUMvQjtRQUVELElBQUksSUFBSSxZQUFZLFVBQVUsRUFBRTtZQUM1QixJQUFJLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztTQUN0QjtR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Q0FBQyxXQUFXLENBQUMsQ0FBQztvQkFDakMsU0FBUyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7aUJBQ2pDO3FCQUFNO29CQUNILEtBQUssQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxDQUFDO2lCQUN0QzthQUNKO2lCQUFNO2dCQUNILEtBQUssQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxDQUFDO2FBQ3RDO1NBQ0o7SUFJTCxDQUFDO0lBQ0wsZ0JBQUM7QUFBRCxDQUFDO0FBNUpZLDhCQUFTIiwiZmlsZSI6ImNvbW1vbnMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY2xhc3MgQXJyYXlIZWxwZXJzIHtcclxuICAgIHB1YmxpYyBzdGF0aWMgY29lcmNlVG9BcnJheUJ1ZmZlcihkYXRhOiBzdHJpbmd8VWludDhBcnJheXxBcnJheUJ1ZmZlcikge1xyXG4gICAgICAgIGlmICh0eXBlb2YgZGF0YSA9PT0gXCJzdHJpbmdcIikge1xyXG4gICAgICAgICAgICBkYXRhID0gZGF0YS5yZXBsYWNlKC8tL2csIFwiK1wiKS5yZXBsYWNlKC9fL2csIFwiL1wiKTtcclxuICAgIFxyXG4gICAgICAgICAgICB2YXIgc3RyID0gd2luZG93LmF0b2IoZGF0YSk7XHJcbiAgICAgICAgICAgIHZhciBieXRlcyA9IG5ldyBVaW50OEFycmF5KHN0ci5sZW5ndGgpO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHN0ci5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgYnl0ZXNbaV0gPSBzdHIuY2hhckNvZGVBdChpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBkYXRhID0gYnl0ZXM7XHJcbiAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoZGF0YSkpIHtcclxuICAgICAgICAgICAgZGF0YSA9IG5ldyBVaW50OEFycmF5KGRhdGEpO1xyXG4gICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgIGlmIChkYXRhIGluc3RhbmNlb2YgVWludDhBcnJheSkge1xyXG4gICAgICAgICAgICBkYXRhID0gZGF0YS5idWZmZXI7XHJcbiAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgaWYgKCEoZGF0YSBpbnN0YW5jZW9mIEFycmF5QnVmZmVyKSkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiY291bGQgbm90IGNvZXJjZSBkYXRhIHRvIEFycmF5QnVmZmVyXCIpO1xyXG4gICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgIHJldHVybiBkYXRhO1xyXG4gICAgfTtcclxuICAgIFxyXG4gICAgXHJcbiAgICBwdWJsaWMgc3RhdGljIGNvZXJjZVRvQmFzZTY0VXJsIChkYXRhOiBVaW50OEFycmF5fEFycmF5QnVmZmVyfHN0cmluZykge1xyXG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KGRhdGEpKSB7XHJcbiAgICAgICAgICAgIGRhdGEgPSBVaW50OEFycmF5LmZyb20oZGF0YSk7XHJcbiAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgaWYgKGRhdGEgaW5zdGFuY2VvZiBBcnJheUJ1ZmZlcikge1xyXG4gICAgICAgICAgICBkYXRhID0gbmV3IFVpbnQ4QXJyYXkoZGF0YSk7XHJcbiAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgaWYgKGRhdGEgaW5zdGFuY2VvZiBVaW50OEFycmF5KSB7XHJcbiAgICAgICAgICAgIHZhciBzdHIgPSBcIlwiO1xyXG4gICAgICAgICAgICB2YXIgbGVuID0gZGF0YS5ieXRlTGVuZ3RoO1xyXG4gICAgXHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIHN0ciArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGRhdGFbaV0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGRhdGEgPSB3aW5kb3cuYnRvYShzdHIpO1xyXG4gICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgIGlmICh0eXBlb2YgZGF0YSAhPT0gXCJzdHJpbmdcIikge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJjb3VsZCBub3QgY29lcmNlIHRvIHN0cmluZ1wiKTtcclxuICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICBkYXRhID0gZGF0YS5yZXBsYWNlKC9cXCsvZywgXCItXCIpLnJlcGxhY2UoL1xcLy9nLCBcIl9cIikucmVwbGFjZSgvPSokL2csIFwiXCIpO1xyXG4gICAgXHJcbiAgICAgICAgcmV0dXJuIGRhdGE7XHJcbiAgICB9XHJcbn0iLCJleHBvcnQgY2xhc3MgRGF0YVRhYmxlc09EYXRhUHJvdmlkZXIge1xyXG4gICAgcHVibGljIHN0YXRpYyBwcm92aWRlckZ1bmN0aW9uKHVybDogc3RyaW5nKTogKGRhdGE6IG9iamVjdCwgY2FsbGJhY2s6ICgoZGF0YTogYW55KSA9PiB2b2lkKSwgc2V0dGluZ3M6IERhdGFUYWJsZXMuU2V0dGluZ3NMZWdhY3kpID0+IHZvaWQge1xyXG4gICAgICAgIHJldHVybiAoZGF0YTogb2JqZWN0LCBjYWxsYmFjazogKChkYXRhOiBhbnkpID0+IHZvaWQpLCBzZXR0aW5nczogRGF0YVRhYmxlcy5TZXR0aW5nc0xlZ2FjeSkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgcGFyYW1zOiBhbnkgPSB7fTtcclxuICAgICAgICAgICAgJC5lYWNoKGRhdGEsIGZ1bmN0aW9uIChpLCB2YWx1ZTogYW55KSB7XHJcbiAgICAgICAgICAgICAgICBwYXJhbXNbaV0gPSB2YWx1ZTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhwYXJhbXMpO1xyXG5cclxuICAgICAgICAgICAgdmFyIG9kYXRhUXVlcnk6IGFueSA9IHtcclxuICAgICAgICAgICAgICAgICRmb3JtYXQ6ICdqc29uJ1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgJC5lYWNoKHNldHRpbmdzLmFvQ29sdW1ucywgZnVuY3Rpb24gKGksIHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgc0ZpZWxkTmFtZSA9ICgodHlwZW9mIHZhbHVlLm1EYXRhID09PSAnc3RyaW5nJykgPyB2YWx1ZS5tRGF0YSA6IG51bGwpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHNGaWVsZE5hbWUgPT09IG51bGwgfHwgIWlzTmFOKE51bWJlcihzRmllbGROYW1lKSkpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAob2RhdGFRdWVyeS4kc2VsZWN0ID09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICBvZGF0YVF1ZXJ5LiRzZWxlY3QgPSBzRmllbGROYW1lO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBvZGF0YVF1ZXJ5LiRzZWxlY3QgKz0gXCIsXCIgKyBzRmllbGROYW1lO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKG9kYXRhUXVlcnkpXHJcblxyXG4gICAgICAgICAgICBcclxuXHJcbiAgICAgICAgICAgIG9kYXRhUXVlcnkuJHNraXAgPSBzZXR0aW5ncy5faURpc3BsYXlTdGFydDtcclxuICAgICAgICAgICAgaWYgKHNldHRpbmdzLl9pRGlzcGxheUxlbmd0aCA+IC0xKSB7XHJcbiAgICAgICAgICAgICAgICBvZGF0YVF1ZXJ5LiR0b3AgPSBzZXR0aW5ncy5faURpc3BsYXlMZW5ndGg7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICAgICAgb2RhdGFRdWVyeS4kY291bnQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgXHJcbiAgICAgICAgICAgIHZhciBhc0ZpbHRlcnMgPSBbXTtcclxuICAgICAgICAgICAgdmFyIGFzQ29sdW1uRmlsdGVycyA9IFtdOyAvL3VzZWQgZm9yIGpxdWVyeS5kYXRhVGFibGVzLmNvbHVtbkZpbHRlci5qc1xyXG4gICAgICAgICAgICAkLmVhY2goc2V0dGluZ3MuYW9Db2x1bW5zLCBmdW5jdGlvbiAoaSwgdmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIHZhciBzRmllbGROYW1lID0gdmFsdWUuc05hbWUgfHwgdmFsdWUubURhdGE7XHJcbiAgICAgICAgICAgICAgICB2YXIgY29sdW1uRmlsdGVyID0gcGFyYW1zW1wic1NlYXJjaF9cIiArIGldOyAvL2ZvcnR1bmF0ZWx5IGNvbHVtbkZpbHRlcidzIF9udW1iZXIgbWF0Y2hlcyB0aGUgaW5kZXggb2YgYW9Db2x1bW5zXHJcbiAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBpZiAoKHBhcmFtcy5zZWFyY2ggJiYgcGFyYW1zLnNlYXJjaC52YWx1ZSB8fCBjb2x1bW5GaWx0ZXIpICYmIHZhbHVlLmJTZWFyY2hhYmxlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoICh2YWx1ZS5zVHlwZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdzdHJpbmcnOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdodG1sJzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwYXJhbXMuc2VhcmNoICYmIHBhcmFtcy5zZWFyY2gudmFsdWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhc0ZpbHRlcnMucHVzaChcImluZGV4b2YodG9sb3dlcihcIiArIHNGaWVsZE5hbWUgKyBcIiksICdcIiArIHBhcmFtcy5zZWFyY2gudmFsdWUudG9Mb3dlckNhc2UoKSArIFwiJykgZ3QgLTFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY29sdW1uRmlsdGVyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXNDb2x1bW5GaWx0ZXJzLnB1c2goXCJpbmRleG9mKHRvbG93ZXIoXCIgKyBzRmllbGROYW1lICsgXCIpLCAnXCIgKyBjb2x1bW5GaWx0ZXIudG9Mb3dlckNhc2UoKSArIFwiJykgZ3QgLTFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnZGF0ZSc6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ251bWVyaWMnOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGZuRm9ybWF0VmFsdWUgPSAgKHZhbHVlLnNUeXBlID09ICdudW1lcmljJykgPyBmdW5jdGlvbih2YWwpIHsgcmV0dXJuIHZhbDsgfSA6IGZ1bmN0aW9uKHZhbCkgeyByZXR1cm4gKG5ldyBEYXRlKHZhbCkpLnRvSVNPU3RyaW5nKCk7IH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY29sdW1uRmlsdGVyICE9PSBudWxsICYmIGNvbHVtbkZpbHRlciAhPT0gXCJcIiAmJiBjb2x1bW5GaWx0ZXIgIT09IFwiflwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGFzUmFuZ2VzID0gY29sdW1uRmlsdGVyLnNwbGl0KFwiflwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoYXNSYW5nZXNbMF0gIT09IFwiXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXNDb2x1bW5GaWx0ZXJzLnB1c2goXCIoXCIgKyBzRmllbGROYW1lICsgXCIgZ3QgXCIgKyBmbkZvcm1hdFZhbHVlKGFzUmFuZ2VzWzBdKSArIFwiKVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGFzUmFuZ2VzWzFdICE9PSBcIlwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFzQ29sdW1uRmlsdGVycy5wdXNoKFwiKFwiICsgc0ZpZWxkTmFtZSArIFwiIGx0IFwiICsgZm5Gb3JtYXRWYWx1ZShhc1Jhbmdlc1sxXSkgKyBcIilcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIFxyXG4gICAgICAgICAgICBpZiAoYXNGaWx0ZXJzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgIG9kYXRhUXVlcnkuJGZpbHRlciA9IGFzRmlsdGVycy5qb2luKFwiIG9yIFwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgICAgICBpZiAoYXNDb2x1bW5GaWx0ZXJzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgIGlmIChvZGF0YVF1ZXJ5LiRmaWx0ZXIgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIG9kYXRhUXVlcnkuJGZpbHRlciA9IFwiICggXCIgKyBvZGF0YVF1ZXJ5LiRmaWx0ZXIgKyBcIiApIGFuZCAoIFwiICsgYXNDb2x1bW5GaWx0ZXJzLmpvaW4oXCIgYW5kIFwiKSArIFwiICkgXCI7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIG9kYXRhUXVlcnkuJGZpbHRlciA9IGFzQ29sdW1uRmlsdGVycy5qb2luKFwiIGFuZCBcIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKG9kYXRhUXVlcnkpXHJcblxyXG4gICAgICAgICAgICB2YXIgYXNPcmRlckJ5ID0gW107XHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcGFyYW1zLmlTb3J0aW5nQ29sczsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBhc09yZGVyQnkucHVzaChwYXJhbXNbXCJtRGF0YVByb3BfXCIgKyBwYXJhbXNbXCJpU29ydENvbF9cIiArIGldXSArIFwiIFwiICsgKHBhcmFtc1tcInNTb3J0RGlyX1wiICsgaV0gfHwgXCJcIikpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoYXNPcmRlckJ5Lmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgIG9kYXRhUXVlcnkuJG9yZGVyYnkgPSBhc09yZGVyQnkuam9pbigpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhvZGF0YVF1ZXJ5KVxyXG5cclxuICAgICAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgICAgIHVybDogdXJsLFxyXG4gICAgICAgICAgICAgICAgZGF0YTogb2RhdGFRdWVyeSxcclxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJldHVybmVkRGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBvRGF0YVNvdXJjZTphbnkgPSB7fTtcclxuICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAvLyBQcm9iZSBkYXRhIHN0cnVjdHVyZXMgZm9yIFY0LCBWMywgYW5kIFYyIHZlcnNpb25zIG9mIE9EYXRhIHJlc3BvbnNlXHJcbiAgICAgICAgICAgICAgICAgICAgb0RhdGFTb3VyY2UuYWFEYXRhID0gcmV0dXJuZWREYXRhLnZhbHVlIHx8IChyZXR1cm5lZERhdGEuZCAmJiByZXR1cm5lZERhdGEuZC5yZXN1bHRzKSB8fCByZXR1cm5lZERhdGEuZDtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgaUNvdW50ID0gKHJldHVybmVkRGF0YVtcIkBvZGF0YS5jb3VudFwiXSkgPyByZXR1cm5lZERhdGFbXCJAb2RhdGEuY291bnRcIl0gOiAoKHJldHVybmVkRGF0YVtcIm9kYXRhLmNvdW50XCJdKSA/IHJldHVybmVkRGF0YVtcIm9kYXRhLmNvdW50XCJdIDogKChyZXR1cm5lZERhdGEuX19jb3VudCkgPyByZXR1cm5lZERhdGEuX19jb3VudCA6IChyZXR1cm5lZERhdGEuZCAmJiByZXR1cm5lZERhdGEuZC5fX2NvdW50KSkpO1xyXG4gICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpQ291bnQgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAob0RhdGFTb3VyY2UuYWFEYXRhLmxlbmd0aCA9PT0gc2V0dGluZ3MuX2lEaXNwbGF5TGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvRGF0YVNvdXJjZS5pVG90YWxSZWNvcmRzID0gc2V0dGluZ3MuX2lEaXNwbGF5U3RhcnQgKyBzZXR0aW5ncy5faURpc3BsYXlMZW5ndGggKyAxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb0RhdGFTb3VyY2UuaVRvdGFsUmVjb3JkcyA9IHNldHRpbmdzLl9pRGlzcGxheVN0YXJ0ICsgb0RhdGFTb3VyY2UuYWFEYXRhLmxlbmd0aDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9EYXRhU291cmNlLmlUb3RhbFJlY29yZHMgPSBpQ291bnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIG9EYXRhU291cmNlLmlUb3RhbERpc3BsYXlSZWNvcmRzID0gb0RhdGFTb3VyY2UuaVRvdGFsUmVjb3JkcztcclxuICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjayhvRGF0YVNvdXJjZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgfSk7ICAgICAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgIH0gXHJcbn0iLCJpbXBvcnQgKiBhcyB2YWxpZGF0ZSBmcm9tICd2YWxpZGF0ZS5qcyc7XHJcbmltcG9ydCB7IHN0cmluZ2lmeSB9IGZyb20gJ3F1ZXJ5c3RyaW5nJztcclxuXHJcbmV4cG9ydCBjbGFzcyBWYWxpZGF0b3Ige1xyXG4gICAgcHJpdmF0ZSBmb3JtOiBIVE1MRm9ybUVsZW1lbnQ7XHJcbiAgICBwcml2YXRlIGZvcm1TdWJtaXR0ZWQ6Ym9vbGVhblxyXG4gICAgcHJpdmF0ZSBlbGVtZW50czogRWxlbWVudFtdO1xyXG4gICAgcHJpdmF0ZSBjb25zdHJhaW50czogYW55O1xyXG4gICAgcHJpdmF0ZSBoYXNWYWxpZGF0ZWQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihmb3JtUXVlcnk6IHN0cmluZyB8IEhUTUxGb3JtRWxlbWVudCB8IEpRdWVyeSwgdmFsaWRhdGVPblN1Ym1pdDogYm9vbGVhbiA9IHRydWUpIHtcclxuICAgICAgICBjb25zdCBjb250ZXh0VGhpcyA9IHRoaXM7XHJcbiAgICAgICAgaWYgKGZvcm1RdWVyeS5pc1Byb3RvdHlwZU9mKFN0cmluZykpIHtcclxuICAgICAgICAgICAgdGhpcy5mb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcihmb3JtUXVlcnkgYXMgc3RyaW5nKSBhcyBIVE1MRm9ybUVsZW1lbnQ7XHJcbiAgICAgICAgfSBlbHNlIGlmIChmb3JtUXVlcnkgaW5zdGFuY2VvZiAgalF1ZXJ5ICYmIGZvcm1RdWVyeS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgdGhpcy5mb3JtID0gZm9ybVF1ZXJ5WzBdIGFzIEhUTUxGb3JtRWxlbWVudDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmZvcm0gPSBmb3JtUXVlcnkgYXMgSFRNTEZvcm1FbGVtZW50O1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIXRoaXMuZm9ybSlcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5mb3JtLmRhdGFzZXRbJ25vVmFsaWRhdGUnXSlcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICB0aGlzLmNvbnN0cmFpbnRzID0ge307XHJcbiAgICAgICAgdGhpcy5lbGVtZW50cyA9IFtdO1xyXG4gICAgICAgIHZhciBlbHMgPSB0aGlzLmZvcm0ucXVlcnlTZWxlY3RvckFsbCgnaW5wdXQ6bm90KFt0eXBlPVwiaGlkZGVuXCJdKTpub3QoW2RhdGEtdmFsPVwiZmFsc2VcIl0pLCB0ZXh0YXJlYTpub3QoW2RhdGEtdmFsPVwiZmFsc2VcIl0pJyk7XHJcbiAgICAgICAgQXJyYXkucHJvdG90eXBlLmZvckVhY2guY2FsbChlbHMsXHJcbiAgICAgICAgICAgIChlbGVtZW50OiBIVE1MSW5wdXRFbGVtZW50KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBsZXQgbmVlZHNWYWxpZGF0aW9uOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB2YXIgZWxlbWVudElkID0gZWxlbWVudC5pZDtcclxuICAgICAgICAgICAgICAgIGlmIChlbGVtZW50SWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBlbGVtZW50SWQgPSBlbGVtZW50SWQucmVwbGFjZSgnLicsICdfJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGV4dFRoaXMuY29uc3RyYWludHNbZWxlbWVudElkXSA9IHt9O1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSBpbiBlbGVtZW50LmRhdGFzZXQpIHtcclxuICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKGkpIHtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlICd2YWxSZXF1aXJlZCc6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5lZWRzVmFsaWRhdGlvbiA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHRUaGlzLmNvbnN0cmFpbnRzW2VsZW1lbnRJZF0ucHJlc2VuY2UgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiBgXiR7ZWxlbWVudC5kYXRhc2V0W2ldfWBcclxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ3ZhbEVtYWlsJzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmVlZHNWYWxpZGF0aW9uID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dFRoaXMuY29uc3RyYWludHNbZWxlbWVudElkXS5lbWFpbCA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IGBeJHtlbGVtZW50LmRhdGFzZXRbaV19YFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlICd2YWxNaW5sZW5ndGgnOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBuZWVkc1ZhbGlkYXRpb24gPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0VGhpcy5jb25zdHJhaW50c1tlbGVtZW50SWRdLmxlbmd0aCA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvb1Nob3J0OiBgXiR7ZWxlbWVudC5kYXRhc2V0W2ldfWAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtaW5pbXVtOiBwYXJzZUludChlbGVtZW50LmRhdGFzZXRbJ3ZhbE1pbmxlbmd0aE1pbiddKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlICd2YWxFcXVhbHRvJzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmVlZHNWYWxpZGF0aW9uID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVsZW1lbnQuZGF0YXNldFsndmFsRXF1YWx0b090aGVyJ10uY2hhckF0KDApID09PSAnKicpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHNlYXJjaFRlcm0gPSBlbGVtZW50LmRhdGFzZXRbJ3ZhbEVxdWFsdG9PdGhlciddLnJlcGxhY2UoJyouJywgJy4nKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnQuZGF0YXNldFsndmFsRXF1YWx0b090aGVyJ10gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbbmFtZSo9XCInICsgc2VhcmNoVGVybSArICdcIl0nKS5pZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHRUaGlzLmNvbnN0cmFpbnRzW2VsZW1lbnRJZF0uZXF1YWxpdHkgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiBgXiR7ZWxlbWVudC5kYXRhc2V0W2ldfWAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyaWJ1dGU6IGVsZW1lbnQuZGF0YXNldFsndmFsRXF1YWx0b090aGVyJ10sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb21wYXJhdG9yOiAodjE6IGFueSwgdjI6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeSh2MSkgPT09IEpTT04uc3RyaW5naWZ5KHYyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAndmFsUmVnZXgnOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBuZWVkc1ZhbGlkYXRpb24gPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0VGhpcy5jb25zdHJhaW50c1tlbGVtZW50SWRdLmZvcm1hdCA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IGBeJHtlbGVtZW50LmRhdGFzZXRbaV19YCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhdHRlcm46IGVsZW1lbnQuZGF0YXNldFsndmFsUmVnZXhQYXR0ZXJuJ10sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmbGFnczogJ2knXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAobmVlZHNWYWxpZGF0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdibHVyJywgKGUpID0+IHsgY29udGV4dFRoaXMuZWxlbWVudENoYW5nZShlKTsgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCAoZSkgPT4geyBjb250ZXh0VGhpcy5lbGVtZW50Q2hhbmdlKGUpOyB9KTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmVsZW1lbnRzLnB1c2goZWxlbWVudCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGlmKHZhbGlkYXRlT25TdWJtaXQpIHtcclxuICAgICAgICAgICAgdGhpcy5mb3JtLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIChlKSA9PiB7IGNvbnRleHRUaGlzLmZvcm1TdWJtaXQoZSk7IH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmZvcm1TdWJtaXR0ZWQgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGVsZW1lbnRDaGFuZ2UoZXZlbnQ6IEV2ZW50KTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMuaGFzVmFsaWRhdGVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMucGVyZm9ybVZhbGlkYXRpb24oKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHZhbGlkYXRlKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHRoaXMuaGFzVmFsaWRhdGVkID0gdHJ1ZTtcclxuICAgICAgICByZXR1cm4gdGhpcy5wZXJmb3JtVmFsaWRhdGlvbigpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZm9ybVN1Ym1pdChldmVudDogRXZlbnQpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5mb3JtLmRhdGFzZXRbJ25vVmFsaWRhdGUnXSlcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICB0aGlzLmhhc1ZhbGlkYXRlZCA9IHRydWU7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLnBlcmZvcm1WYWxpZGF0aW9uKCkpIHtcclxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5mb3JtU3VibWl0dGVkKSB7XHJcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuZm9ybVN1Ym1pdHRlZCA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBwZXJmb3JtVmFsaWRhdGlvbigpOiBhbnkge1xyXG4gICAgICAgIGNvbnN0IGZvcm1WYWx1ZXMgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHZhbGlkYXRlLmNvbGxlY3RGb3JtVmFsdWVzKHRoaXMuZm9ybSkpLnJlcGxhY2UoL1xcXFxcXFxcXFxcXFxcXFxcXC4vZywgJ18nKSk7XHJcbiAgICAgICAgY29uc3QgdmFsaWRhdGlvblJlc3VsdCA9IHZhbGlkYXRlKGZvcm1WYWx1ZXMsIHRoaXMuY29uc3RyYWludHMpO1xyXG4gICAgICAgIGNvbnN0IGNvbnRleHRUaGlzID0gdGhpcztcclxuICAgICAgICBBcnJheS5wcm90b3R5cGUuZm9yRWFjaC5jYWxsKHRoaXMuZWxlbWVudHMsXHJcbiAgICAgICAgICAgIChlbGVtZW50OiBIVE1MSW5wdXRFbGVtZW50KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb250ZXh0VGhpcy5kZWNvcmF0ZUVsZW1lbnQoZWxlbWVudCwgdmFsaWRhdGlvblJlc3VsdCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiB2YWxpZGF0aW9uUmVzdWx0O1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZGVjb3JhdGVFbGVtZW50KGVsZW1lbnQ6IEhUTUxJbnB1dEVsZW1lbnQsIHZhbGlkYXRpb25SZXN1bHQ6IGFueSkge1xyXG4gICAgICAgIGNvbnN0IGdyb3VwID0gZWxlbWVudC5jbG9zZXN0KCcuZm9ybS1ncm91cCcpO1xyXG4gICAgICAgIGdyb3VwLmNsYXNzTGlzdC5yZW1vdmUoJ2hhcy1zdWNjZXNzJyk7XHJcbiAgICAgICAgZ3JvdXAuY2xhc3NMaXN0LnJlbW92ZSgnaGFzLWVycm9yJyk7XHJcbiAgICAgICAgdmFyIGVsZW1lbnRJZCA9IGVsZW1lbnQuaWRcclxuICAgICAgICBpZiAoZWxlbWVudElkKSB7XHJcbiAgICAgICAgICAgIGVsZW1lbnRJZCA9IGVsZW1lbnRJZC5yZXBsYWNlKCcuJywgJ18nKTtcclxuICAgICAgICAgICAgY29uc3QgaGVscGJsb2NrID0gZ3JvdXAucXVlcnlTZWxlY3Rvcihgc3BhbltkYXRhLXZhbG1zZy1mb3JdYCk7XHJcbiAgICAgICAgICAgIGhlbHBibG9jay5pbm5lckhUTUwgPSAnJztcclxuICAgICAgICAgICAgaWYgKHZhbGlkYXRpb25SZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGl0ZW0gPSB2YWxpZGF0aW9uUmVzdWx0W2VsZW1lbnRJZF07XHJcbiAgICAgICAgICAgICAgICBpZiAoaXRlbSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGdyb3VwLmNsYXNzTGlzdC5hZGQoJ2hhcy1lcnJvcicpO1xyXG4gICAgICAgICAgICAgICAgICAgIGhlbHBibG9jay5pbm5lckhUTUwgPSBpdGVtWzBdO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBncm91cC5jbGFzc0xpc3QuYWRkKCdoYXMtc3VjY2VzcycpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgZ3JvdXAuY2xhc3NMaXN0LmFkZCgnaGFzLXN1Y2Nlc3MnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBcclxuICAgICAgICBcclxuICAgIH0gICAgXHJcbn0iXSwic291cmNlUm9vdCI6IiJ9