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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
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
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/client/views/index/index-index.entry.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/client/views/index/index-index.entry.js":
/*!*****************************************************!*\
  !*** ./src/client/views/index/index-index.entry.js ***!
  \*****************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _widgets_topbanner_topbanner_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../widgets/topbanner/topbanner.js */ \"./src/client/widgets/topbanner/topbanner.js\");\n/* harmony import */ var _widgets_footer_footer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../widgets/footer/footer.js */ \"./src/client/widgets/footer/footer.js\");\n\r\n\r\nconst topbanner = new _widgets_topbanner_topbanner_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]\r\nconst footer = new _widgets_footer_footer_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"]\r\ntopbanner.init()\r\nfooter.init()\r\n\r\n\n\n//# sourceURL=webpack:///./src/client/views/index/index-index.entry.js?");

/***/ }),

/***/ "./src/client/widgets/footer/footer.css":
/*!**********************************************!*\
  !*** ./src/client/widgets/footer/footer.css ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// removed by extract-text-webpack-plugin\n\n//# sourceURL=webpack:///./src/client/widgets/footer/footer.css?");

/***/ }),

/***/ "./src/client/widgets/footer/footer.js":
/*!*********************************************!*\
  !*** ./src/client/widgets/footer/footer.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _footer_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./footer.css */ \"./src/client/widgets/footer/footer.css\");\n/* harmony import */ var _footer_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_footer_css__WEBPACK_IMPORTED_MODULE_0__);\n\r\n\r\nclass Footer {\r\n    init() {\r\n        const s = \"init topbanner\"\r\n        console.log(s)\r\n    }\r\n}\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (Footer);\n\n//# sourceURL=webpack:///./src/client/widgets/footer/footer.js?");

/***/ }),

/***/ "./src/client/widgets/topbanner/topbanner.css":
/*!****************************************************!*\
  !*** ./src/client/widgets/topbanner/topbanner.css ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// removed by extract-text-webpack-plugin\n\n//# sourceURL=webpack:///./src/client/widgets/topbanner/topbanner.css?");

/***/ }),

/***/ "./src/client/widgets/topbanner/topbanner.js":
/*!***************************************************!*\
  !*** ./src/client/widgets/topbanner/topbanner.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _topbanner_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./topbanner.css */ \"./src/client/widgets/topbanner/topbanner.css\");\n/* harmony import */ var _topbanner_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_topbanner_css__WEBPACK_IMPORTED_MODULE_0__);\n\r\n\r\nclass Topbanner {\r\n    init() {\r\n        const s = \"init topbanner\"\r\n        console.log(s)\r\n    }\r\n}\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (Topbanner);\n\n//# sourceURL=webpack:///./src/client/widgets/topbanner/topbanner.js?");

/***/ })

/******/ });