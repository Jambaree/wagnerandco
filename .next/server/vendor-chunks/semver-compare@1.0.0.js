/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/semver-compare@1.0.0";
exports.ids = ["vendor-chunks/semver-compare@1.0.0"];
exports.modules = {

/***/ "(rsc)/./node_modules/.pnpm/semver-compare@1.0.0/node_modules/semver-compare/index.js":
/*!**************************************************************************************!*\
  !*** ./node_modules/.pnpm/semver-compare@1.0.0/node_modules/semver-compare/index.js ***!
  \**************************************************************************************/
/***/ ((module) => {

eval("module.exports = function cmp (a, b) {\n    var pa = a.split('.');\n    var pb = b.split('.');\n    for (var i = 0; i < 3; i++) {\n        var na = Number(pa[i]);\n        var nb = Number(pb[i]);\n        if (na > nb) return 1;\n        if (nb > na) return -1;\n        if (!isNaN(na) && isNaN(nb)) return 1;\n        if (isNaN(na) && !isNaN(nb)) return -1;\n    }\n    return 0;\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvLnBucG0vc2VtdmVyLWNvbXBhcmVAMS4wLjAvbm9kZV9tb2R1bGVzL3NlbXZlci1jb21wYXJlL2luZGV4LmpzIiwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixPQUFPO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL0B3YWduZXJhbmRjby9mcm9udGVuZC8uL25vZGVfbW9kdWxlcy8ucG5wbS9zZW12ZXItY29tcGFyZUAxLjAuMC9ub2RlX21vZHVsZXMvc2VtdmVyLWNvbXBhcmUvaW5kZXguanM/MWNkNSJdLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGNtcCAoYSwgYikge1xuICAgIHZhciBwYSA9IGEuc3BsaXQoJy4nKTtcbiAgICB2YXIgcGIgPSBiLnNwbGl0KCcuJyk7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCAzOyBpKyspIHtcbiAgICAgICAgdmFyIG5hID0gTnVtYmVyKHBhW2ldKTtcbiAgICAgICAgdmFyIG5iID0gTnVtYmVyKHBiW2ldKTtcbiAgICAgICAgaWYgKG5hID4gbmIpIHJldHVybiAxO1xuICAgICAgICBpZiAobmIgPiBuYSkgcmV0dXJuIC0xO1xuICAgICAgICBpZiAoIWlzTmFOKG5hKSAmJiBpc05hTihuYikpIHJldHVybiAxO1xuICAgICAgICBpZiAoaXNOYU4obmEpICYmICFpc05hTihuYikpIHJldHVybiAtMTtcbiAgICB9XG4gICAgcmV0dXJuIDA7XG59O1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/.pnpm/semver-compare@1.0.0/node_modules/semver-compare/index.js\n");

/***/ })

};
;