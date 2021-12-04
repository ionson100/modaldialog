"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WrapperModal = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactBootstrap = require("react-bootstrap");

var _Modal = _interopRequireDefault(require("react-bootstrap/Modal"));

var ReactDOM = _interopRequireWildcard(require("react-dom"));

var _uuid = require("uuid");

var _StorageDialog = require("./StorageDialog");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * обертка компонента модального окна, требуется точка монтирования
 */
var WrapperModal = /*#__PURE__*/function () {
  /**
   * ctor
   * ( другие данные в DOM в этой точке могут исчезнуть)
   */
  function WrapperModal() {
    _classCallCheck(this, WrapperModal);

    this.myRef = /*#__PURE__*/_react.default.createRef();
  }

  _createClass(WrapperModal, [{
    key: "extracted",
    value: function extracted(dialogData) {
      var root = document.createElement('div');
      root.style.display = 'contents';
      ReactDOM.render( /*#__PURE__*/_react.default.createElement(DialogIon, {
        ref: this.myRef,
        dialogData: dialogData
      }), root);
    }
    /**
     * получение аттрибутов модального диалога со значениями по умолчанию
     * @param o параметры компонента
     * @returns {{size: *, centered, fullscree, dialogClassName: *, contentClassName: *, scrollable, animation}}
     */

  }, {
    key: "getModalAttributes",
    value: function getModalAttributes(o) {
      var _o$fullscree, _o$centered, _o$animation, _o$scrollable;

      return {
        size: o.size,
        fullscree: (_o$fullscree = o.fullscree) !== null && _o$fullscree !== void 0 ? _o$fullscree : false,
        centered: (_o$centered = o.centered) !== null && _o$centered !== void 0 ? _o$centered : false,
        animation: (_o$animation = o.animation) !== null && _o$animation !== void 0 ? _o$animation : true,
        dialogClassName: o.dialogClassName,
        contentClassName: o.contentClassName,
        scrollable: (_o$scrollable = o.scrollable) !== null && _o$scrollable !== void 0 ? _o$scrollable : false
      };
    }
  }]);

  return WrapperModal;
}();
/*
 Компонент асинхронного вызова диалога
 */


exports.WrapperModal = WrapperModal;

var DialogIon = /*#__PURE__*/function (_Component) {
  _inherits(DialogIon, _Component);

  var _super = _createSuper(DialogIon);

  function DialogIon(props) {
    var _p$dialogData$_head, _p$dialogData, _p$dialogData$_body, _p$dialogData2, _p$dialogData$_button, _p$dialogData3, _props$dialogData$_ic, _props$dialogData;

    var _this;

    _classCallCheck(this, DialogIon);

    _this = _super.call(this, props);
    _this.moduleIdCore = (0, _uuid.v4)();

    _this.checkGlobal();
    /* eslint-disable */


    _this.state = {
      isShow: false //props.dialogData?._isShow??true,

    };
    var p = props;
    _this.head = (_p$dialogData$_head = (_p$dialogData = p.dialogData) === null || _p$dialogData === void 0 ? void 0 : _p$dialogData._head) !== null && _p$dialogData$_head !== void 0 ? _p$dialogData$_head : "no date";
    _this.body = (_p$dialogData$_body = (_p$dialogData2 = p.dialogData) === null || _p$dialogData2 === void 0 ? void 0 : _p$dialogData2._body) !== null && _p$dialogData$_body !== void 0 ? _p$dialogData$_body : "no date";
    _this.buttons = (_p$dialogData$_button = (_p$dialogData3 = p.dialogData) === null || _p$dialogData3 === void 0 ? void 0 : _p$dialogData3._buttons) !== null && _p$dialogData$_button !== void 0 ? _p$dialogData$_button : [];
    _this.modalAtr = p.dialogData.modalAtr; // атрибуты для модального диалога

    _this.myRef = /*#__PURE__*/_react.default.createRef();
    _this.buttonModeAction = undefined; // копка которую нажали, закрытие по кресту odeId=-1

    _this.promiseInfo = {};
    _this.dialogType = "none";
    _this.icon = (_props$dialogData$_ic = (_props$dialogData = props.dialogData) === null || _props$dialogData === void 0 ? void 0 : _props$dialogData._icon) !== null && _props$dialogData$_ic !== void 0 ? _props$dialogData$_ic : null;
    _this.innerValidate = undefined;
    _this.innerGetData = undefined;
    _this.myRefFocus = /*#__PURE__*/_react.default.createRef();
    _this.oldDialog = undefined;
    /* eslint-enable */

    return _this;
  }

  _createClass(DialogIon, [{
    key: "checkGlobal",
    value: function checkGlobal() {
      this.oldDialog = _StorageDialog.hostDialog.currentDialog;
      _StorageDialog.hostDialog.currentDialog = this; //console.log("old", this.oldDialog)
      // console.log("current", hostDialog.currentDialog)

      if (!_StorageDialog.hostDialog.moduleId) {
        _StorageDialog.hostDialog.moduleId = this.moduleIdCore; //  console.log("init", hostDialog.moduleId, "  ", this.moduleIdCore)
      }
    }
  }, {
    key: "show",
    value: function () {
      var _show = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(type) {
        var _this2 = this;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this.dialogType = type;
                return _context.abrupt("return", new Promise(function (resolve, reject) {
                  _this2.promiseInfo = {
                    resolve: resolve,
                    reject: reject
                  };

                  _this2.setState({
                    isShow: true
                  });
                }));

              case 2:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function show(_x) {
        return _show.apply(this, arguments);
      }

      return show;
    }()
  }, {
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps, nextState) {
      if (nextState.isShow === false) {
        console.log(_StorageDialog.hostDialog.moduleId, "  ", this.moduleIdCore);

        if (_StorageDialog.hostDialog.moduleId === this.moduleIdCore) {
          _StorageDialog.hostDialog.currentDialog = undefined;
          _StorageDialog.hostDialog.moduleId = undefined;
        } else {
          _StorageDialog.hostDialog.currentDialog = this.oldDialog;
        }
      }

      return true;
    }
  }, {
    key: "checkValidateForm",
    value: function checkValidateForm(b) {
      if (this.innerValidate) {
        return this.innerValidate(b);
      } else {
        return true;
      }
    }
  }, {
    key: "checkGetDataForm",
    value: function checkGetDataForm(b) {
      if (this.innerGetData) {
        return this.innerGetData(b);
      } else {
        return {
          data: "Base data body content"
        };
      }
    }
  }, {
    key: "onClick",
    value: function onClick() {
      var _this$promiseInfo = this.promiseInfo,
          resolve = _this$promiseInfo.resolve,
          reject = _this$promiseInfo.reject;

      try {
        switch (this.dialogType) {
          case "none":
            {
              resolve(new MyResolve({
                button: this.buttonModeAction
              }));
              this.setState({
                isShow: false
              });
              break;
            }

          case "simple":
            {
              var _this$buttonModeActio, _this$buttonModeActio2;

              var ss = (_this$buttonModeActio = (_this$buttonModeActio2 = this.buttonModeAction) === null || _this$buttonModeActio2 === void 0 ? void 0 : _this$buttonModeActio2.modeId) !== null && _this$buttonModeActio !== void 0 ? _this$buttonModeActio : -1;
              var ok = ss !== -1;
              resolve(new MyResolve({
                ok: ok,
                modeId: ss,
                button: this.buttonModeAction
              }));
              this.setState({
                isShow: false
              });
              break;
            }

          case "form":
            {
              var _this$buttonModeActio3, _this$buttonModeActio4;

              var _ss = (_this$buttonModeActio3 = (_this$buttonModeActio4 = this.buttonModeAction) === null || _this$buttonModeActio4 === void 0 ? void 0 : _this$buttonModeActio4.modeId) !== null && _this$buttonModeActio3 !== void 0 ? _this$buttonModeActio3 : -1;

              if (_ss !== -1) {
                if (this.checkValidateForm(_ss) === true) {
                  var res = this.checkGetDataForm(_ss);

                  var _ok = _ss !== -1;

                  resolve(new MyResolve({
                    ok: _ok,
                    modeId: _ss,
                    button: this.buttonModeAction,
                    formData: res
                  }));
                  this.setState({
                    isShow: false
                  });
                }
              } else {
                var _ok2 = _ss !== -1;

                resolve(new MyResolve({
                  ok: _ok2,
                  modeId: _ss,
                  button: this.buttonModeAction
                }));
                this.setState({
                  isShow: false
                });
              }

              break;
            }

          default:
            {
              var msg = "\u041D\u0435 \u043C\u043E\u0433\u0443 \u043E\u0431\u0440\u0430\u0431\u043E\u0442\u0430\u0442\u044C \u0442\u0438\u043F \u0434\u0438\u0430\u043B\u043E\u0433\u0430: ".concat(this.dialogType, " type {simple,form,}");
              console.error(msg);
              reject(msg);
              this.setState({
                isShow: false
              });
            }
        }
      } catch (ex) {
        console.error(ex);
        reject(ex);
        this.setState({
          isShow: false
        });
      }
    }
  }, {
    key: "checkBody",
    value: function checkBody(b) {
      return b;
    }
  }, {
    key: "renderIcon",
    value: function renderIcon() {
      if (this.icon) {
        if (typeof this.icon === "string") {
          this.icon = /*#__PURE__*/_react.default.createElement(_reactBootstrap.Image, {
            src: this.icon,
            height: 40
          });
        }

        return /*#__PURE__*/_react.default.createElement("div", {
          className: "imageDialogion",
          style: {
            marginLeft: "10px",
            marginRight: "10px"
          }
        }, " ", this.icon);
      }
    }
  }, {
    key: "checkButtonFocus",
    value: function checkButtonFocus(b, i) {
      var _this3 = this;

      if (b.isFocus === true) {
        return /*#__PURE__*/_react.default.createElement(_reactBootstrap.Button, {
          key: i,
          ref: this.myRefFocus,
          variant: b.variant,
          onClick: function onClick() {
            _this3.buttonModeAction = b;

            _this3.onClick(_this3);
          },
          "data-mode-id": b.modeId
        }, b.name);
      } else {
        return /*#__PURE__*/_react.default.createElement(_reactBootstrap.Button, {
          key: i,
          variant: b.variant,
          onClick: function onClick() {
            _this3.buttonModeAction = b;

            _this3.onClick(_this3);
          },
          "data-mode-id": b.modeId
        }, b.name);
      }
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this4 = this;

      setTimeout(function () {
        var _this4$myRefFocus$cur;

        (_this4$myRefFocus$cur = _this4.myRefFocus.current) === null || _this4$myRefFocus$cur === void 0 ? void 0 : _this4$myRefFocus$cur.focus();
      }, 1);
    }
  }, {
    key: "render",
    value: function render() {
      var _this5 = this;

      return /*#__PURE__*/_react.default.createElement(_Modal.default, {
        ref: this.myRef,
        size: this.modalAtr.size,
        as: "section",
        fullscreen: this.modalAtr.fullscree,
        centered: this.modalAtr.centered,
        animation: this.modalAtr.animation,
        dialogClassName: this.modalAtr.dialogClassName,
        contentClassName: this.modalAtr.contentClassName,
        scrollable: this.modalAtr.scrollable,
        show: this.state.isShow,
        onHide: function onHide() {
          _this5.buttonModeAction = null;

          _this5.onClick(_this5);
        },
        backdrop: "static",
        keyboard: true
      }, /*#__PURE__*/_react.default.createElement(_Modal.default.Header, {
        closeButton: true,
        className: "headerDialogion"
      }, this.renderIcon(), /*#__PURE__*/_react.default.createElement(_Modal.default.Title, null, this.head)), /*#__PURE__*/_react.default.createElement(_Modal.default.Body, null, this.checkBody(this.body)), /*#__PURE__*/_react.default.createElement(_Modal.default.Footer, {
        className: "footerDialogion"
      }, this.buttons.map(function (b, i) {
        return _this5.checkButtonFocus(b, i);
      })));
    }
  }]);

  return DialogIon;
}(_react.Component);

var MyResolve = function MyResolve(_ref) {
  var _ref$ok = _ref.ok,
      ok = _ref$ok === void 0 ? false : _ref$ok,
      _ref$modeId = _ref.modeId,
      modeId = _ref$modeId === void 0 ? -1 : _ref$modeId,
      _ref$button = _ref.button,
      button = _ref$button === void 0 ? undefined : _ref$button,
      _ref$formData = _ref.formData,
      formData = _ref$formData === void 0 ? undefined : _ref$formData;

  _classCallCheck(this, MyResolve);

  this.ok = ok;
  this.modeId = modeId;
  this.button = button;
  this.formData = formData;
};
