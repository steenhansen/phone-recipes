/* 
NB

Replaces TypeCzech-2-import.js when running in production so as to not ship Type-Czech file

npm run prod ../prod-config.js

/dist/client/assets/renderer/_default.page.client.jsx.5c724ca3.js      == 189 KB instead of 237KB

*/

let the_exports;
if (typeof window !== 'undefined') {
  the_exports = window; // for browser environment
} else if (typeof exports !== 'undefined') {
  the_exports = exports; // for Node environment
} else {
  the_exports = {}; // for JSX environment
}



(function (the_exports) {
  the_exports.TypeCzech = function () {
    the_exports.type_czech = { linkUp: (nop) => nop, isActive: (x) => false, isPruned: (y) => true, _from: 'TypeCzech-2-require_PROD_without_type-czech' };
  };  // only place isPruned is true
  return the_exports.type_czech;
})(the_exports);

module.exports.the_exports;  // for CJS
