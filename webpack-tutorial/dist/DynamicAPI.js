"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkwebpack_tutorial"] = self["webpackChunkwebpack_tutorial"] || []).push([["DynamicAPI"],{

/***/ "./source/common/usersAPIDynamic.js":
/*!******************************************!*\
  !*** ./source/common/usersAPIDynamic.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"getUsersDynamic\": () => (/* binding */ getUsersDynamic)\n/* harmony export */ });\nvar ENDPOINT = \"https://jsonplaceholder.typicode.com/users/\";\nvar getUsersDynamic = function getUsersDynamic() {\n  return fetch(ENDPOINT).then(function (res) {\n    if (!res.ok) throw Error(res.statusText);\n    return res.json();\n  }).then(function (res) {\n    return res;\n  });\n};\n\n//# sourceURL=webpack://webpack-tutorial/./source/common/usersAPIDynamic.js?");

/***/ })

}]);