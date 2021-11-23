import React, { Component } from "react";
import { Button, Image } from "react-bootstrap";
import Modal from 'react-bootstrap/Modal';
import * as ReactDOM from "react-dom";
import { v4 as uuidv4 } from 'uuid';
import { hostDialog } from "./StorageDialog";
/**
 * обертка компонента модального окна, требуется точка монтирования
 */

export class WrapperModal {
  /**
   * ctor
   * ( другие данные в DOM в этой точке могут исчезнуть)
   */
  constructor() {
    this.myRef = /*#__PURE__*/React.createRef();
  }

  extracted(dialogData) {
    const root = document.createElement('div');
    root.style.display = 'contents';
    ReactDOM.render( /*#__PURE__*/React.createElement(DialogIon, {
      ref: this.myRef,
      dialogData: dialogData
    }), root);
  }
  /**
   * получение аттрибутов модального диалога со значениями по умолчанию
   * @param o параметры компонента
   * @returns {{size: *, centered, fullscree, dialogClassName: *, contentClassName: *, scrollable, animation}}
   */


  getModalAttributes(o) {
    return {
      size: o.size,
      fullscree: o.fullscree ?? false,
      centered: o.centered ?? false,
      animation: o.animation ?? true,
      dialogClassName: o.dialogClassName,
      contentClassName: o.contentClassName,
      scrollable: o.scrollable ?? true
    };
  }

}
/*
 Компонент асинхронного вызова диалога
 */

class DialogIon extends Component {
  constructor(props) {
    super(props);
    this.moduleIdCore = uuidv4();
    this.checkGlobal();
    /* eslint-disable */

    this.state = {
      isShow: false //props.dialogData?._isShow??true,

    };
    const p = props;
    this.head = p.dialogData?._head ?? "no date";
    this.body = p.dialogData?._body ?? "no date";
    this.buttons = p.dialogData?._buttons ?? [];
    this.modalAtr = p.dialogData.modalAtr; // атрибуты для модального диалога

    this.myRef = /*#__PURE__*/React.createRef();
    this.buttonModeAction = undefined; // копка которую нажали, закрытие по кресту odeId=-1

    this.promiseInfo = {};
    this.dialogType = "none";
    this.icon = props.dialogData?._icon ?? null;
    this.innerValidate = undefined;
    this.innerGetData = undefined;
    this.myRefFocus = /*#__PURE__*/React.createRef();
    this.oldDialog = undefined;
    /* eslint-enable */
  }

  checkGlobal() {
    this.oldDialog = hostDialog.currentDialog;
    hostDialog.currentDialog = this;
    console.log("old", this.oldDialog);
    console.log("current", hostDialog.currentDialog);

    if (!hostDialog.moduleId) {
      hostDialog.moduleId = this.moduleIdCore;
      console.log("init", hostDialog.moduleId, "  ", this.moduleIdCore);
    }
  }

  async show(type) {
    this.dialogType = type;
    return new Promise((resolve, reject) => {
      this.promiseInfo = {
        resolve,
        reject
      };
      this.setState({
        isShow: true
      });
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextState.isShow === false) {
      console.log(hostDialog.moduleId, "  ", this.moduleIdCore);

      if (hostDialog.moduleId === this.moduleIdCore) {
        hostDialog.currentDialog = undefined;
        hostDialog.moduleId = undefined;
      } else {
        hostDialog.currentDialog = this.oldDialog;
      }
    }

    return true;
  }

  checkValidateForm(b) {
    if (this.innerValidate) {
      return this.innerValidate(b);
    } else {
      return true;
    }
  }

  checkGetDataForm(b) {
    if (this.innerGetData) {
      return this.innerGetData(b);
    } else {
      return {
        data: "Base data body content"
      };
    }
  }

  onClick() {
    let {
      resolve,
      reject
    } = this.promiseInfo;

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
            const ss = this.buttonModeAction?.modeId ?? -1;
            const ok = ss !== -1;
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
            const ss = this.buttonModeAction?.modeId ?? -1;

            if (ss !== -1) {
              if (this.checkValidateForm(ss) === true) {
                const res = this.checkGetDataForm(ss);
                const ok = ss !== -1;
                resolve(new MyResolve({
                  ok: ok,
                  modeId: ss,
                  button: this.buttonModeAction,
                  formData: res
                }));
                this.setState({
                  isShow: false
                });
              }
            } else {
              const ok = ss !== -1;
              resolve(new MyResolve({
                ok: ok,
                modeId: ss,
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
            const msg = `Не могу обработать тип диалога: ${this.dialogType} type {simple,form,}`;
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

  checkBody(b) {
    return b;
  }

  renderIcon() {
    if (this.icon) {
      if (typeof this.icon === "string") {
        this.icon = /*#__PURE__*/React.createElement(Image, {
          src: this.icon,
          height: 40
        });
      }

      return /*#__PURE__*/React.createElement("div", {
        className: "imageDialogion",
        style: {
          marginLeft: "10px",
          marginRight: "10px"
        }
      }, " ", this.icon);
    }
  }

  checkButtonFocus(b, i) {
    if (b.isFocus === true) {
      return /*#__PURE__*/React.createElement(Button, {
        key: i,
        ref: this.myRefFocus,
        variant: b.variant,
        onClick: () => {
          this.buttonModeAction = b;
          this.onClick(this);
        },
        "data-mode-id": b.modeId
      }, b.name);
    } else {
      return /*#__PURE__*/React.createElement(Button, {
        key: i,
        variant: b.variant,
        onClick: () => {
          this.buttonModeAction = b;
          this.onClick(this);
        },
        "data-mode-id": b.modeId
      }, b.name);
    }
  }

  componentDidMount() {
    setTimeout(() => {
      this.myRefFocus.current?.focus();
    }, 1);
  }

  render() {
    return /*#__PURE__*/React.createElement(Modal, {
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
      onHide: () => {
        this.buttonModeAction = null;
        this.onClick(this);
      },
      backdrop: "static",
      keyboard: true
    }, /*#__PURE__*/React.createElement(Modal.Header, {
      closeButton: true,
      className: "headerDialogion"
    }, this.renderIcon(), /*#__PURE__*/React.createElement(Modal.Title, null, this.head)), /*#__PURE__*/React.createElement(Modal.Body, null, this.checkBody(this.body)), /*#__PURE__*/React.createElement(Modal.Footer, {
      className: "footerDialogion"
    }, this.buttons.map((b, i) => {
      return this.checkButtonFocus(b, i);
    })));
  }

}

class MyResolve {
  constructor({
    ok = false,
    modeId = -1,
    button = undefined,
    formData = undefined
  }) {
    this.ok = ok;
    this.modeId = modeId;
    this.button = button;
    this.formData = formData;
  }

}