"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactBootstrap = require("react-bootstrap");

var _BaseDialog2 = _interopRequireDefault(require("./BaseDialog"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var PromptBody = /*#__PURE__*/function (_BaseDialog) {
  _inherits(PromptBody, _BaseDialog);

  var _super = _createSuper(PromptBody);

  function PromptBody(props) {
    var _props$data$label, _props$data, _props$data$value, _props$data2;

    var _this;

    _classCallCheck(this, PromptBody);

    _this = _super.call(this, props);
    _this.state = {
      validated: false
    };
    _this.label = (_props$data$label = props === null || props === void 0 ? void 0 : (_props$data = props.data) === null || _props$data === void 0 ? void 0 : _props$data.label) !== null && _props$data$label !== void 0 ? _props$data$label : undefined;
    _this.value = (_props$data$value = props === null || props === void 0 ? void 0 : (_props$data2 = props.data) === null || _props$data2 === void 0 ? void 0 : _props$data2.value) !== null && _props$data$value !== void 0 ? _props$data$value : undefined;
    _this.myRef = /*#__PURE__*/_react.default.createRef();
    _this.myRef1 = /*#__PURE__*/_react.default.createRef();
    return _this;
  }

  _createClass(PromptBody, [{
    key: "setValidated",
    value: function setValidated(v) {
      this.setState({
        validated: v
      });
      this.forceUpdate();
    }
    /**
     * проверка пользовательских данных
     * @param modeId modeId нажатой кнопки
     * @returns {boolean} true - данные хорошие, false- данные плохие
     */

    /* eslint-disable */

  }, {
    key: "validate",
    value: function validate(modeId) {
      var form = this.myRef.current;

      if (form.checkValidity() === false) {
        this.setValidated(true);
        return false;
      }

      this.setValidated(true);
      return true;
    }
  }, {
    key: "componentDidMount",
    value:
    /* eslint-enable */
    function componentDidMount() {
      var _this2 = this;

      setTimeout(function () {
        _this2.myRef1.current.focus();
      }, 1);
    }
    /**
     * получение данных с формы
     * @param modeId  modeId нажатой кнопки
     * @returns {{name, description, lang}}
     */

  }, {
    key: "getData",
    value: function getData(modeId) {
      return {
        modeId: modeId,
        value: this.myRef1.current.value
      };
    }
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/_react.default.createElement(_reactBootstrap.Form, {
        noValidate: true,
        ref: this.myRef,
        validated: this.state.validated
      }, /*#__PURE__*/_react.default.createElement(_reactBootstrap.Row, {
        className: "mb-3"
      }, /*#__PURE__*/_react.default.createElement(_reactBootstrap.Form.Group, {
        md: "6",
        controlId: "validationCustom03"
      }, /*#__PURE__*/_react.default.createElement(_reactBootstrap.Form.Label, null, this.label), /*#__PURE__*/_react.default.createElement(_reactBootstrap.Form.Control, {
        ref: this.myRef1,
        type: "text",
        required: true,
        defaultValue: this.value
      }), /*#__PURE__*/_react.default.createElement(_reactBootstrap.Form.Control.Feedback, {
        type: "invalid"
      }, "Please provide a valid route."))));
    }
  }]);

  return PromptBody;
}(_BaseDialog2.default);

exports.default = PromptBody;