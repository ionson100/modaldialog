import React from "react";
import { Form, Row } from "react-bootstrap";
import BaseDialog from "./BaseDialog";
export default class PromptBody extends BaseDialog {
  constructor(props) {
    super(props);
    this.state = {
      validated: false
    };
    this.label = props?.data?.label ?? undefined;
    this.value = props?.data?.value ?? undefined;
    this.myRef = /*#__PURE__*/React.createRef();
    this.myRef1 = /*#__PURE__*/React.createRef();
  }

  setValidated(v) {
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


  validate(modeId) {
    const form = this.myRef.current;

    if (form.checkValidity() === false) {
      this.setValidated(true);
      return false;
    }

    this.setValidated(true);
    return true;
  }

  /* eslint-enable */
  componentDidMount() {
    setTimeout(() => {
      this.myRef1.current.focus();
    }, 1);
  }
  /**
   * получение данных с формы
   * @param modeId  modeId нажатой кнопки
   * @returns {{name, description, lang}}
   */


  getData(modeId) {
    return {
      modeId: modeId,
      value: this.myRef1.current.value
    };
  }

  render() {
    return /*#__PURE__*/React.createElement(Form, {
      noValidate: true,
      ref: this.myRef,
      validated: this.state.validated
    }, /*#__PURE__*/React.createElement(Row, {
      className: "mb-3"
    }, /*#__PURE__*/React.createElement(Form.Group, {
      md: "6",
      controlId: "validationCustom03"
    }, /*#__PURE__*/React.createElement(Form.Label, null, this.label), /*#__PURE__*/React.createElement(Form.Control, {
      ref: this.myRef1,
      type: "text",
      required: true,
      defaultValue: this.value
    }), /*#__PURE__*/React.createElement(Form.Control.Feedback, {
      type: "invalid"
    }, "Please provide a valid route."))));
  }

}