"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hostDialog = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var StorageDialog = function StorageDialog() {
  _classCallCheck(this, StorageDialog);

  this.currentDialog = undefined;
  this.moduleId = undefined;
};

var hostDialog = new StorageDialog();
exports.hostDialog = hostDialog;