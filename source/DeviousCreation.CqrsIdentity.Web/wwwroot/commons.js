(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["commons"],{

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9SZXNvdXJjZXMvU2NyaXB0cy9zZXJ2aWNlcy9kYXRhdGFibGVzLW9kYXRhLXByb3ZpZGVyLnRzIiwid2VicGFjazovLy8uL1Jlc291cmNlcy9TY3JpcHRzL3NlcnZpY2VzL3ZhbGlkYXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQTtJQUFBO0lBa0lBLENBQUM7SUFqSWlCLHdDQUFnQixHQUE5QixVQUErQixHQUFXO1FBQ3RDLE9BQU8sVUFBQyxJQUFZLEVBQUUsUUFBK0IsRUFBRSxRQUFtQztZQUN0RixJQUFJLE1BQU0sR0FBUSxFQUFFLENBQUM7WUFDckIsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsVUFBVSxDQUFDLEVBQUUsS0FBVTtnQkFDaEMsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQztZQUN0QixDQUFDLENBQUMsQ0FBQztZQUVILE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7WUFFcEIsSUFBSSxVQUFVLEdBQVE7Z0JBQ2xCLE9BQU8sRUFBRSxNQUFNO2FBQ2xCLENBQUM7WUFFRixDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLEVBQUUsVUFBVSxDQUFDLEVBQUUsS0FBSztnQkFDekMsSUFBSSxVQUFVLEdBQUcsQ0FBQyxDQUFDLE9BQU8sS0FBSyxDQUFDLEtBQUssS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQzFFLElBQUksVUFBVSxLQUFLLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUMsRUFBRTtvQkFDbkQsT0FBTztpQkFDVjtnQkFDRCxJQUFJLFVBQVUsQ0FBQyxPQUFPLElBQUksSUFBSSxFQUFFO29CQUM1QixVQUFVLENBQUMsT0FBTyxHQUFHLFVBQVUsQ0FBQztpQkFDbkM7cUJB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UyxHQUFHLEVBQUUsQ0FBQztZQUN6QixJQUFJLGdCQUFnQixFQUFFO2dCQUNsQixJQUFNLElBQUksR0FBRyxnQkFBZ0IsQ0FBQyxTQUFTLENBQUMsQ0FBQztnQkFDekMsSUFBSSxJQUFJLEVBQUU7b0JBQ04sS0FBSyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUM7b0JBQ2pDLFNBQVMsQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO2lCQUNqQztxQkFBTTtvQkFDSCxLQUFLLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsQ0FBQztpQkFDdEM7YUFDSjtpQkFBTTtnQkFDSCxLQUFLLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsQ0FBQzthQUN0QztTQUNKO0lBSUwsQ0FBQztJQUNMLGdCQUFDO0FBQUQsQ0FBQztBQTVKWSw4QkFBUyIsImZpbGUiOiJjb21tb25zLmpzIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNsYXNzIERhdGFUYWJsZXNPRGF0YVByb3ZpZGVyIHtcclxuICAgIHB1YmxpYyBzdGF0aWMgcHJvdmlkZXJGdW5jdGlvbih1cmw6IHN0cmluZyk6IChkYXRhOiBvYmplY3QsIGNhbGxiYWNrOiAoKGRhdGE6IGFueSkgPT4gdm9pZCksIHNldHRpbmdzOiBEYXRhVGFibGVzLlNldHRpbmdzTGVnYWN5KSA9PiB2b2lkIHtcclxuICAgICAgICByZXR1cm4gKGRhdGE6IG9iamVjdCwgY2FsbGJhY2s6ICgoZGF0YTogYW55KSA9PiB2b2lkKSwgc2V0dGluZ3M6IERhdGFUYWJsZXMuU2V0dGluZ3NMZWdhY3kpID0+IHtcclxuICAgICAgICAgICAgbGV0IHBhcmFtczogYW55ID0ge307XHJcbiAgICAgICAgICAgICQuZWFjaChkYXRhLCBmdW5jdGlvbiAoaSwgdmFsdWU6IGFueSkge1xyXG4gICAgICAgICAgICAgICAgcGFyYW1zW2ldID0gdmFsdWU7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgY29uc29sZS5sb2cocGFyYW1zKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBvZGF0YVF1ZXJ5OiBhbnkgPSB7XHJcbiAgICAgICAgICAgICAgICAkZm9ybWF0OiAnanNvbidcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICQuZWFjaChzZXR0aW5ncy5hb0NvbHVtbnMsIGZ1bmN0aW9uIChpLCB2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHNGaWVsZE5hbWUgPSAoKHR5cGVvZiB2YWx1ZS5tRGF0YSA9PT0gJ3N0cmluZycpID8gdmFsdWUubURhdGEgOiBudWxsKTtcclxuICAgICAgICAgICAgICAgIGlmIChzRmllbGROYW1lID09PSBudWxsIHx8ICFpc05hTihOdW1iZXIoc0ZpZWxkTmFtZSkpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKG9kYXRhUXVlcnkuJHNlbGVjdCA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgb2RhdGFRdWVyeS4kc2VsZWN0ID0gc0ZpZWxkTmFtZTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgb2RhdGFRdWVyeS4kc2VsZWN0ICs9IFwiLFwiICsgc0ZpZWxkTmFtZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhvZGF0YVF1ZXJ5KVxyXG5cclxuICAgICAgICAgICAgXHJcblxyXG4gICAgICAgICAgICBvZGF0YVF1ZXJ5LiRza2lwID0gc2V0dGluZ3MuX2lEaXNwbGF5U3RhcnQ7XHJcbiAgICAgICAgICAgIGlmIChzZXR0aW5ncy5faURpc3BsYXlMZW5ndGggPiAtMSkge1xyXG4gICAgICAgICAgICAgICAgb2RhdGFRdWVyeS4kdG9wID0gc2V0dGluZ3MuX2lEaXNwbGF5TGVuZ3RoO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgICAgIG9kYXRhUXVlcnkuJGNvdW50ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgIFxyXG4gICAgICAgICAgICB2YXIgYXNGaWx0ZXJzID0gW107XHJcbiAgICAgICAgICAgIHZhciBhc0NvbHVtbkZpbHRlcnMgPSBbXTsgLy91c2VkIGZvciBqcXVlcnkuZGF0YVRhYmxlcy5jb2x1bW5GaWx0ZXIuanNcclxuICAgICAgICAgICAgJC5lYWNoKHNldHRpbmdzLmFvQ29sdW1ucywgZnVuY3Rpb24gKGksIHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgc0ZpZWxkTmFtZSA9IHZhbHVlLnNOYW1lIHx8IHZhbHVlLm1EYXRhO1xyXG4gICAgICAgICAgICAgICAgdmFyIGNvbHVtbkZpbHRlciA9IHBhcmFtc1tcInNTZWFyY2hfXCIgKyBpXTsgLy9mb3J0dW5hdGVseSBjb2x1bW5GaWx0ZXIncyBfbnVtYmVyIG1hdGNoZXMgdGhlIGluZGV4IG9mIGFvQ29sdW1uc1xyXG4gICAgICAgIFxyXG4gICAgICAgICAgICAgICAgaWYgKChwYXJhbXMuc2VhcmNoICYmIHBhcmFtcy5zZWFyY2gudmFsdWUgfHwgY29sdW1uRmlsdGVyKSAmJiB2YWx1ZS5iU2VhcmNoYWJsZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHN3aXRjaCAodmFsdWUuc1R5cGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnc3RyaW5nJzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnaHRtbCc6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocGFyYW1zLnNlYXJjaCAmJiBwYXJhbXMuc2VhcmNoLnZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXNGaWx0ZXJzLnB1c2goXCJpbmRleG9mKHRvbG93ZXIoXCIgKyBzRmllbGROYW1lICsgXCIpLCAnXCIgKyBwYXJhbXMuc2VhcmNoLnZhbHVlLnRvTG93ZXJDYXNlKCkgKyBcIicpIGd0IC0xXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNvbHVtbkZpbHRlcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFzQ29sdW1uRmlsdGVycy5wdXNoKFwiaW5kZXhvZih0b2xvd2VyKFwiICsgc0ZpZWxkTmFtZSArIFwiKSwgJ1wiICsgY29sdW1uRmlsdGVyLnRvTG93ZXJDYXNlKCkgKyBcIicpIGd0IC0xXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ2RhdGUnOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdudW1lcmljJzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBmbkZvcm1hdFZhbHVlID0gICh2YWx1ZS5zVHlwZSA9PSAnbnVtZXJpYycpID8gZnVuY3Rpb24odmFsKSB7IHJldHVybiB2YWw7IH0gOiBmdW5jdGlvbih2YWwpIHsgcmV0dXJuIChuZXcgRGF0ZSh2YWwpKS50b0lTT1N0cmluZygpOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNvbHVtbkZpbHRlciAhPT0gbnVsbCAmJiBjb2x1bW5GaWx0ZXIgIT09IFwiXCIgJiYgY29sdW1uRmlsdGVyICE9PSBcIn5cIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBhc1JhbmdlcyA9IGNvbHVtbkZpbHRlci5zcGxpdChcIn5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGFzUmFuZ2VzWzBdICE9PSBcIlwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFzQ29sdW1uRmlsdGVycy5wdXNoKFwiKFwiICsgc0ZpZWxkTmFtZSArIFwiIGd0IFwiICsgZm5Gb3JtYXRWYWx1ZShhc1Jhbmdlc1swXSkgKyBcIilcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChhc1Jhbmdlc1sxXSAhPT0gXCJcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhc0NvbHVtbkZpbHRlcnMucHVzaChcIihcIiArIHNGaWVsZE5hbWUgKyBcIiBsdCBcIiArIGZuRm9ybWF0VmFsdWUoYXNSYW5nZXNbMV0pICsgXCIpXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICBcclxuICAgICAgICAgICAgaWYgKGFzRmlsdGVycy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICBvZGF0YVF1ZXJ5LiRmaWx0ZXIgPSBhc0ZpbHRlcnMuam9pbihcIiBvciBcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICAgICAgaWYgKGFzQ29sdW1uRmlsdGVycy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAob2RhdGFRdWVyeS4kZmlsdGVyICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBvZGF0YVF1ZXJ5LiRmaWx0ZXIgPSBcIiAoIFwiICsgb2RhdGFRdWVyeS4kZmlsdGVyICsgXCIgKSBhbmQgKCBcIiArIGFzQ29sdW1uRmlsdGVycy5qb2luKFwiIGFuZCBcIikgKyBcIiApIFwiO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBvZGF0YVF1ZXJ5LiRmaWx0ZXIgPSBhc0NvbHVtbkZpbHRlcnMuam9pbihcIiBhbmQgXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhvZGF0YVF1ZXJ5KVxyXG5cclxuICAgICAgICAgICAgdmFyIGFzT3JkZXJCeSA9IFtdO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHBhcmFtcy5pU29ydGluZ0NvbHM7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgYXNPcmRlckJ5LnB1c2gocGFyYW1zW1wibURhdGFQcm9wX1wiICsgcGFyYW1zW1wiaVNvcnRDb2xfXCIgKyBpXV0gKyBcIiBcIiArIChwYXJhbXNbXCJzU29ydERpcl9cIiArIGldIHx8IFwiXCIpKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKGFzT3JkZXJCeS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICBvZGF0YVF1ZXJ5LiRvcmRlcmJ5ID0gYXNPcmRlckJ5LmpvaW4oKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY29uc29sZS5sb2cob2RhdGFRdWVyeSlcclxuXHJcbiAgICAgICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgICAgICB1cmw6IHVybCxcclxuICAgICAgICAgICAgICAgIGRhdGE6IG9kYXRhUXVlcnksXHJcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXR1cm5lZERhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgb0RhdGFTb3VyY2U6YW55ID0ge307XHJcbiAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gUHJvYmUgZGF0YSBzdHJ1Y3R1cmVzIGZvciBWNCwgVjMsIGFuZCBWMiB2ZXJzaW9ucyBvZiBPRGF0YSByZXNwb25zZVxyXG4gICAgICAgICAgICAgICAgICAgIG9EYXRhU291cmNlLmFhRGF0YSA9IHJldHVybmVkRGF0YS52YWx1ZSB8fCAocmV0dXJuZWREYXRhLmQgJiYgcmV0dXJuZWREYXRhLmQucmVzdWx0cykgfHwgcmV0dXJuZWREYXRhLmQ7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGlDb3VudCA9IChyZXR1cm5lZERhdGFbXCJAb2RhdGEuY291bnRcIl0pID8gcmV0dXJuZWREYXRhW1wiQG9kYXRhLmNvdW50XCJdIDogKChyZXR1cm5lZERhdGFbXCJvZGF0YS5jb3VudFwiXSkgPyByZXR1cm5lZERhdGFbXCJvZGF0YS5jb3VudFwiXSA6ICgocmV0dXJuZWREYXRhLl9fY291bnQpID8gcmV0dXJuZWREYXRhLl9fY291bnQgOiAocmV0dXJuZWREYXRhLmQgJiYgcmV0dXJuZWREYXRhLmQuX19jb3VudCkpKTtcclxuICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaUNvdW50ID09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9EYXRhU291cmNlLmFhRGF0YS5sZW5ndGggPT09IHNldHRpbmdzLl9pRGlzcGxheUxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb0RhdGFTb3VyY2UuaVRvdGFsUmVjb3JkcyA9IHNldHRpbmdzLl9pRGlzcGxheVN0YXJ0ICsgc2V0dGluZ3MuX2lEaXNwbGF5TGVuZ3RoICsgMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9EYXRhU291cmNlLmlUb3RhbFJlY29yZHMgPSBzZXR0aW5ncy5faURpc3BsYXlTdGFydCArIG9EYXRhU291cmNlLmFhRGF0YS5sZW5ndGg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvRGF0YVNvdXJjZS5pVG90YWxSZWNvcmRzID0gaUNvdW50O1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBvRGF0YVNvdXJjZS5pVG90YWxEaXNwbGF5UmVjb3JkcyA9IG9EYXRhU291cmNlLmlUb3RhbFJlY29yZHM7XHJcbiAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2sob0RhdGFTb3VyY2UpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIH0pOyAgICAgICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICB9IFxyXG59IiwiaW1wb3J0ICogYXMgdmFsaWRhdGUgZnJvbSAndmFsaWRhdGUuanMnO1xyXG5pbXBvcnQgeyBzdHJpbmdpZnkgfSBmcm9tICdxdWVyeXN0cmluZyc7XHJcblxyXG5leHBvcnQgY2xhc3MgVmFsaWRhdG9yIHtcclxuICAgIHByaXZhdGUgZm9ybTogSFRNTEZvcm1FbGVtZW50O1xyXG4gICAgcHJpdmF0ZSBmb3JtU3VibWl0dGVkOmJvb2xlYW5cclxuICAgIHByaXZhdGUgZWxlbWVudHM6IEVsZW1lbnRbXTtcclxuICAgIHByaXZhdGUgY29uc3RyYWludHM6IGFueTtcclxuICAgIHByaXZhdGUgaGFzVmFsaWRhdGVkOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gICAgY29uc3RydWN0b3IoZm9ybVF1ZXJ5OiBzdHJpbmcgfCBIVE1MRm9ybUVsZW1lbnQgfCBKUXVlcnksIHZhbGlkYXRlT25TdWJtaXQ6IGJvb2xlYW4gPSB0cnVlKSB7XHJcbiAgICAgICAgY29uc3QgY29udGV4dFRoaXMgPSB0aGlzO1xyXG4gICAgICAgIGlmIChmb3JtUXVlcnkuaXNQcm90b3R5cGVPZihTdHJpbmcpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoZm9ybVF1ZXJ5IGFzIHN0cmluZykgYXMgSFRNTEZvcm1FbGVtZW50O1xyXG4gICAgICAgIH0gZWxzZSBpZiAoZm9ybVF1ZXJ5IGluc3RhbmNlb2YgIGpRdWVyeSAmJiBmb3JtUXVlcnkubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZm9ybSA9IGZvcm1RdWVyeVswXSBhcyBIVE1MRm9ybUVsZW1lbnQ7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5mb3JtID0gZm9ybVF1ZXJ5IGFzIEhUTUxGb3JtRWxlbWVudDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCF0aGlzLmZvcm0pXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuZm9ybS5kYXRhc2V0Wydub1ZhbGlkYXRlJ10pXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgdGhpcy5jb25zdHJhaW50cyA9IHt9O1xyXG4gICAgICAgIHRoaXMuZWxlbWVudHMgPSBbXTtcclxuICAgICAgICB2YXIgZWxzID0gdGhpcy5mb3JtLnF1ZXJ5U2VsZWN0b3JBbGwoJ2lucHV0Om5vdChbdHlwZT1cImhpZGRlblwiXSk6bm90KFtkYXRhLXZhbD1cImZhbHNlXCJdKSwgdGV4dGFyZWE6bm90KFtkYXRhLXZhbD1cImZhbHNlXCJdKScpO1xyXG4gICAgICAgIEFycmF5LnByb3RvdHlwZS5mb3JFYWNoLmNhbGwoZWxzLFxyXG4gICAgICAgICAgICAoZWxlbWVudDogSFRNTElucHV0RWxlbWVudCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgbGV0IG5lZWRzVmFsaWRhdGlvbjogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdmFyIGVsZW1lbnRJZCA9IGVsZW1lbnQuaWQ7XHJcbiAgICAgICAgICAgICAgICBpZiAoZWxlbWVudElkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudElkID0gZWxlbWVudElkLnJlcGxhY2UoJy4nLCAnXycpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRleHRUaGlzLmNvbnN0cmFpbnRzW2VsZW1lbnRJZF0gPSB7fTtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgaW4gZWxlbWVudC5kYXRhc2V0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAndmFsUmVxdWlyZWQnOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBuZWVkc1ZhbGlkYXRpb24gPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0VGhpcy5jb25zdHJhaW50c1tlbGVtZW50SWRdLnByZXNlbmNlID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogYF4ke2VsZW1lbnQuZGF0YXNldFtpXX1gXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlICd2YWxFbWFpbCc6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5lZWRzVmFsaWRhdGlvbiA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHRUaGlzLmNvbnN0cmFpbnRzW2VsZW1lbnRJZF0uZW1haWwgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiBgXiR7ZWxlbWVudC5kYXRhc2V0W2ldfWBcclxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAndmFsTWlubGVuZ3RoJzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmVlZHNWYWxpZGF0aW9uID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dFRoaXMuY29uc3RyYWludHNbZWxlbWVudElkXS5sZW5ndGggPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b29TaG9ydDogYF4ke2VsZW1lbnQuZGF0YXNldFtpXX1gLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWluaW11bTogcGFyc2VJbnQoZWxlbWVudC5kYXRhc2V0Wyd2YWxNaW5sZW5ndGhNaW4nXSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAndmFsRXF1YWx0byc6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5lZWRzVmFsaWRhdGlvbiA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlbGVtZW50LmRhdGFzZXRbJ3ZhbEVxdWFsdG9PdGhlciddLmNoYXJBdCgwKSA9PT0gJyonKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBzZWFyY2hUZXJtID0gZWxlbWVudC5kYXRhc2V0Wyd2YWxFcXVhbHRvT3RoZXInXS5yZXBsYWNlKCcqLicsICcuJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50LmRhdGFzZXRbJ3ZhbEVxdWFsdG9PdGhlciddID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW25hbWUqPVwiJyArIHNlYXJjaFRlcm0gKyAnXCJdJykuaWRcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0VGhpcy5jb25zdHJhaW50c1tlbGVtZW50SWRdLmVxdWFsaXR5ID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogYF4ke2VsZW1lbnQuZGF0YXNldFtpXX1gLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cmlidXRlOiBlbGVtZW50LmRhdGFzZXRbJ3ZhbEVxdWFsdG9PdGhlciddLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29tcGFyYXRvcjogKHYxOiBhbnksIHYyOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkodjEpID09PSBKU09OLnN0cmluZ2lmeSh2Mik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ3ZhbFJlZ2V4JzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmVlZHNWYWxpZGF0aW9uID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dFRoaXMuY29uc3RyYWludHNbZWxlbWVudElkXS5mb3JtYXQgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiBgXiR7ZWxlbWVudC5kYXRhc2V0W2ldfWAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXR0ZXJuOiBlbGVtZW50LmRhdGFzZXRbJ3ZhbFJlZ2V4UGF0dGVybiddLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmxhZ3M6ICdpJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKG5lZWRzVmFsaWRhdGlvbikge1xyXG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignYmx1cicsIChlKSA9PiB7IGNvbnRleHRUaGlzLmVsZW1lbnRDaGFuZ2UoZSk7IH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgKGUpID0+IHsgY29udGV4dFRoaXMuZWxlbWVudENoYW5nZShlKTsgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbGVtZW50cy5wdXNoKGVsZW1lbnQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICB9KTtcclxuICAgICAgICBpZih2YWxpZGF0ZU9uU3VibWl0KSB7XHJcbiAgICAgICAgICAgIHRoaXMuZm9ybS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCAoZSkgPT4geyBjb250ZXh0VGhpcy5mb3JtU3VibWl0KGUpOyB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5mb3JtU3VibWl0dGVkID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBlbGVtZW50Q2hhbmdlKGV2ZW50OiBFdmVudCk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLmhhc1ZhbGlkYXRlZCkge1xyXG4gICAgICAgICAgICB0aGlzLnBlcmZvcm1WYWxpZGF0aW9uKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB2YWxpZGF0ZSgpOiBib29sZWFuIHtcclxuICAgICAgICB0aGlzLmhhc1ZhbGlkYXRlZCA9IHRydWU7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucGVyZm9ybVZhbGlkYXRpb24oKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGZvcm1TdWJtaXQoZXZlbnQ6IEV2ZW50KTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMuZm9ybS5kYXRhc2V0Wydub1ZhbGlkYXRlJ10pXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgdGhpcy5oYXNWYWxpZGF0ZWQgPSB0cnVlO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5wZXJmb3JtVmFsaWRhdGlvbigpKSB7XHJcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuZm9ybVN1Ym1pdHRlZCkge1xyXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmZvcm1TdWJtaXR0ZWQgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgcGVyZm9ybVZhbGlkYXRpb24oKTogYW55IHtcclxuICAgICAgICBjb25zdCBmb3JtVmFsdWVzID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeSh2YWxpZGF0ZS5jb2xsZWN0Rm9ybVZhbHVlcyh0aGlzLmZvcm0pKS5yZXBsYWNlKC9cXFxcXFxcXFxcXFxcXFxcXFwuL2csICdfJykpO1xyXG4gICAgICAgIGNvbnN0IHZhbGlkYXRpb25SZXN1bHQgPSB2YWxpZGF0ZShmb3JtVmFsdWVzLCB0aGlzLmNvbnN0cmFpbnRzKTtcclxuICAgICAgICBjb25zdCBjb250ZXh0VGhpcyA9IHRoaXM7XHJcbiAgICAgICAgQXJyYXkucHJvdG90eXBlLmZvckVhY2guY2FsbCh0aGlzLmVsZW1lbnRzLFxyXG4gICAgICAgICAgICAoZWxlbWVudDogSFRNTElucHV0RWxlbWVudCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29udGV4dFRoaXMuZGVjb3JhdGVFbGVtZW50KGVsZW1lbnQsIHZhbGlkYXRpb25SZXN1bHQpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gdmFsaWRhdGlvblJlc3VsdDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGRlY29yYXRlRWxlbWVudChlbGVtZW50OiBIVE1MSW5wdXRFbGVtZW50LCB2YWxpZGF0aW9uUmVzdWx0OiBhbnkpIHtcclxuICAgICAgICBjb25zdCBncm91cCA9IGVsZW1lbnQuY2xvc2VzdCgnLmZvcm0tZ3JvdXAnKTtcclxuICAgICAgICBncm91cC5jbGFzc0xpc3QucmVtb3ZlKCdoYXMtc3VjY2VzcycpO1xyXG4gICAgICAgIGdyb3VwLmNsYXNzTGlzdC5yZW1vdmUoJ2hhcy1lcnJvcicpO1xyXG4gICAgICAgIHZhciBlbGVtZW50SWQgPSBlbGVtZW50LmlkXHJcbiAgICAgICAgaWYgKGVsZW1lbnRJZCkge1xyXG4gICAgICAgICAgICBlbGVtZW50SWQgPSBlbGVtZW50SWQucmVwbGFjZSgnLicsICdfJyk7XHJcbiAgICAgICAgICAgIGNvbnN0IGhlbHBibG9jayA9IGdyb3VwLnF1ZXJ5U2VsZWN0b3IoYHNwYW5bZGF0YS12YWxtc2ctZm9yXWApO1xyXG4gICAgICAgICAgICBoZWxwYmxvY2suaW5uZXJIVE1MID0gJyc7XHJcbiAgICAgICAgICAgIGlmICh2YWxpZGF0aW9uUmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBpdGVtID0gdmFsaWRhdGlvblJlc3VsdFtlbGVtZW50SWRdO1xyXG4gICAgICAgICAgICAgICAgaWYgKGl0ZW0pIHtcclxuICAgICAgICAgICAgICAgICAgICBncm91cC5jbGFzc0xpc3QuYWRkKCdoYXMtZXJyb3InKTtcclxuICAgICAgICAgICAgICAgICAgICBoZWxwYmxvY2suaW5uZXJIVE1MID0gaXRlbVswXTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZ3JvdXAuY2xhc3NMaXN0LmFkZCgnaGFzLXN1Y2Nlc3MnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGdyb3VwLmNsYXNzTGlzdC5hZGQoJ2hhcy1zdWNjZXNzJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgXHJcbiAgICAgICAgXHJcbiAgICB9ICAgIFxyXG59Il0sInNvdXJjZVJvb3QiOiIifQ==