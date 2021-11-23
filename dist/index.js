"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DialogAlert = DialogAlert;
exports.DialogConfirm = DialogConfirm;
exports.DialogModalAsync = DialogModalAsync;
exports.DialogPrompt = DialogPrompt;

var _DialogData = require("./DialogData");

var _react = _interopRequireDefault(require("react"));

var _PromptBody = _interopRequireDefault(require("./PromptBody"));

var _DialogIon = require("./DialogIon");

require("bootstrap/dist/css/bootstrap.min.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

/**
 *  Вызов модального диалога в режиме полного конструктора
 *  параметры соответствия : https://react-bootstrap.github.io/components/modal/
 * @param head head заголовок, строка или React Component
 * @param body лейбл для поля ввода
 * @param icon иконка для файла диалога, строка или React Component
 * @param listButton массив кнопок
 * @param size
 * @param fullscreen
 * @param centered
 * @param animation
 * @param dialogClassName
 * @param contentClassName
 * @param scrollable
 * @param dialogAs
 * @param backdrop
 * @param keyboard
 * @returns {Promise<*>}
 * @constructor
 */

/* eslint-disable */
function DialogModalAsync(_x) {
  return _DialogModalAsync.apply(this, arguments);
}
/* eslint-enable */

/**
 * Вызов окна предупреждения
 * @param head заголовок окна строка или React Component
 * @param body тело сообщения строка или React Component
 * @param icon иконка для файла диалога, строка или React Component
 * @returns {Promise<*>}
 * @constructor
 */

/* eslint-disable */


function _DialogModalAsync() {
  _DialogModalAsync = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_ref) {
    var head,
        body,
        icon,
        _ref$listButton,
        listButton,
        size,
        fullscreen,
        centered,
        animation,
        dialogClassName,
        contentClassName,
        scrollable,
        dialogAs,
        backdrop,
        keyboard,
        wrap,
        props,
        type,
        modal,
        _args = arguments;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            head = _ref.head, body = _ref.body, icon = _ref.icon, _ref$listButton = _ref.listButton, listButton = _ref$listButton === void 0 ? [] : _ref$listButton, size = _ref.size, fullscreen = _ref.fullscreen, centered = _ref.centered, animation = _ref.animation, dialogClassName = _ref.dialogClassName, contentClassName = _ref.contentClassName, scrollable = _ref.scrollable, dialogAs = _ref.dialogAs, backdrop = _ref.backdrop, keyboard = _ref.keyboard;
            wrap = new _DialogIon.WrapperModal();
            props = new _DialogData.DialogData(head, body, icon);
            listButton.map(function (b) {
              props.pushButton(b);
              return false;
            });
            type = "simple";

            if ( /*#__PURE__*/_react.default.isValidElement(body)) {
              type = "form";
            }

            props.modalAtr = wrap.getModalAttributes(_args[0]);
            wrap.extracted(props);
            modal = wrap.myRef.current;
            _context.next = 11;
            return modal.show(type);

          case 11:
            return _context.abrupt("return", _context.sent);

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _DialogModalAsync.apply(this, arguments);
}

function DialogAlert(_x2) {
  return _DialogAlert.apply(this, arguments);
}
/* eslint-enable */

/**
 * Вызов диалога с полем ввода
 * @param head head заголовок, строка или React Component
 * @param body лейбл для поля ввода
 * @param icon иконка для файла диалога, строка или React Component
 * @param valueForPrompt значение по умолчанию для поля ввода
 * @returns {Promise<*>}
 * @constructor
 */


function _DialogAlert() {
  _DialogAlert = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(_ref2) {
    var head, body, icon, s;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            head = _ref2.head, body = _ref2.body, icon = _ref2.icon;
            s = [new _DialogData.DialogButton("Close", -1, "primary", true)];
            return _context2.abrupt("return", DialogModalAsync({
              head: head,
              body: body,
              listButton: s,
              icon: icon
            }));

          case 3:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _DialogAlert.apply(this, arguments);
}

function DialogPrompt(_x3) {
  return _DialogPrompt.apply(this, arguments);
}
/**
 * Вызов диалога соглашения
 * @param head заголовок, строка или React Component
 * @param body тело диалога строка или React Component ( тело должно наследовать класс BaseDialog ( переопределит validate и getData )
 * @param icon иконка для файла диалога, строка или React Component
 * @returns {Promise<*>}
 * @constructor
 */


function _DialogPrompt() {
  _DialogPrompt = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(_ref3) {
    var head, body, icon, valueForPrompt, s, p, _body;

    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            head = _ref3.head, body = _ref3.body, icon = _ref3.icon, valueForPrompt = _ref3.valueForPrompt;
            s = [new _DialogData.DialogButton("Close", -1, "primary", true), new _DialogData.DialogButton("Ok", 1, "primary")];
            p = {
              label: body,
              value: valueForPrompt
            };
            _body = /*#__PURE__*/_react.default.createElement(_PromptBody.default, {
              data: p
            });
            return _context3.abrupt("return", DialogModalAsync({
              head: head,
              body: _body,
              listButton: s,
              icon: icon
            }));

          case 5:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _DialogPrompt.apply(this, arguments);
}

function DialogConfirm(_x4) {
  return _DialogConfirm.apply(this, arguments);
}

function _DialogConfirm() {
  _DialogConfirm = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(_ref4) {
    var head, body, icon, s;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            head = _ref4.head, body = _ref4.body, icon = _ref4.icon;
            s = [new _DialogData.DialogButton("Close", -1, "primary", true), new _DialogData.DialogButton("Ok", 1, "primary")];
            return _context4.abrupt("return", DialogModalAsync({
              head: head,
              body: body,
              listButton: s,
              icon: icon
            }));

          case 3:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));
  return _DialogConfirm.apply(this, arguments);
}