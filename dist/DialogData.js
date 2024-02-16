"use strict";
/**
 * данные для показа диалогового окна.
 */

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DialogData = exports.DialogButton = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var DialogData = /*#__PURE__*/function () {
  /**
   *
   * @param head строка или компонент для заголовка окна
   * @param body строка или компонент для тела окна
   * @param icon строка или компонент для иконки заголовка окна
   */
  function DialogData(head, body) {
    var icon = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;

    _classCallCheck(this, DialogData);

    this._head = head;
    this._body = body;
    this._icon = icon;
    /*
    список кнопок для диалога {DialogButton} отображение слева на право
     */

    this._buttons = [];
    this.ref = undefined;
  }
  /**
   * Добавление кнопки
   * @param button {DialogButton}
   * @returns {DialogData}
   */


  _createClass(DialogData, [{
    key: "pushButton",
    value: function pushButton(button) {
      this._buttons.push(button);

      return this;
    }
    /*
    Количество кнопок в списке для диалога
     */

  }, {
    key: "countButton",
    get: function get() {
      return this._buttons.length;
    }
  }]);

  return DialogData;
}();
/**
 * кнопка диалога
 */


exports.DialogData = DialogData;

var DialogButton =
/**
 *
 * @param name текст в копке
 * @param modeId {number} идентификатор кнопки, для кнопки отмены или закрытия : = -1;
 * @param variant {string} стиль кнопки : https://react-bootstrap.github.io/components/buttons/
 * @param isFocus первоначальный фокус кнопки
 * @param isLink вид ссылки
 * @param Icon иконка
 */
function DialogButton(name) {
  var modeId = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
  var variant = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "primary";
  var isFocus = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  var IsLink = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  var Icon = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : undefined;

  _classCallCheck(this, DialogButton);

  this.name = name;
  this.variant = variant;
  this.modeId = modeId;
  this.isFocus = isFocus;
  this.IsLink = IsLink;
  this.Icon = Icon;
};

exports.DialogButton = DialogButton;