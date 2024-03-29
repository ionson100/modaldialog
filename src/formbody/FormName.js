import React from "react";
import {FloatingLabel, Form, Row} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {DialogPrompt} from "../modaldialogion/index";
import BaseDialog from "../modaldialogion/BaseDialog";


export class FormNameF extends BaseDialog {

    constructor(props) {
        super(props);
        this.state =
            {

                validated: false
            }

        this.lang = props?.data?.lang ?? undefined;
        this.name = props?.data?.name ?? undefined;
        this.description = props?.data?.description ?? undefined;
        this.myRef = React.createRef()
        this.myRef1 = React.createRef()
        this.myRef2 = React.createRef()
        this.myRef3 = React.createRef()


        // eslint-disable-next-line no-undef
        global.refform = this;
        this.validate.bind(this)
        this.getData.bind(this)


    }
    setActionClose(callback){
        this.callbackClose=callback;
    }

    setValidated(v) {
        this.setState({validated: v})
        this.forceUpdate()
    }

    /**
     * проверка пользовательских данных
     * @param modeId modeId нажатой кнопки
     * @returns {boolean} true - данные хорошие, false- данные плохие
     */
    /* eslint-disable */
    validate(modeId) {
        //this.callbackClose();
        //return false
        const form = this.myRef.current;
        if (form.checkValidity() === false) {
            this.setValidated(true);
            return false
        }
        this.setValidated(true);
        return true;

    };
    /* eslint-enable */

    /**
     * получение данных с формы
     * @param modeId  modeId нажатой кнопки
     * @returns {{name, description, lang}}
     */
    getData (modeId){
        return {
            modeId: modeId,
            lang: this.myRef1.current.value,
            name: this.myRef2.current.value,
            description: this.myRef3.current.value
        }
    }


    componentDidMount() {

        setTimeout(() => {
            this.myRef2.current.focus();
        }, 1);

    }

    render() {
        return (
            <Form noValidate ref={this.myRef} validated={this.state.validated} onKeyDown={() => {
                return false
            }}>
                <Row className="mb-3">
                    <Form.Group md="6" controlId="validationCustom02">
                        <FloatingLabel controlId="floatingSelect" label="Язык">
                            <Form.Control ref={this.myRef1} as="select" placeholder="Выбор языка" required
                                          defaultValue={this.lang}>
                                <option value={undefined}/>
                                <option value="Ru">Руссский</option>
                                <option value="En">English</option>
                            </Form.Control>
                            <Form.Control.Feedback type="invalid">
                                Please clect language.
                            </Form.Control.Feedback>
                        </FloatingLabel>
                    </Form.Group>
                    <Form.Group md="6" controlId="validationCustom03" onKeyDown={() => {
                        return false
                    }}>
                        <Form.Label>Название маршрута</Form.Label>
                        <Form.Control ref={this.myRef2} type="text" placeholder="Название маршрута" onKeyDown={() => {
                            return false
                        }} required defaultValue={this.name}/>
                        <Form.Control.Feedback type="invalid">
                            Please provide a valid route.
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group md="6" controlId="validationCustom04">
                        <Form.Label>Описание маршрута</Form.Label>
                        <Form.Control ref={this.myRef3} as="textarea" type="text" placeholder="Описание маршрута"
                                      defaultValue={this.description} required/>
                        <Form.Control.Feedback type="invalid">
                            Please provide a valid descriptive route.
                        </Form.Control.Feedback>
                    </Form.Group>
                </Row>
                <Button variant="info" onClick={() => {
                DialogPrompt({head: "asasa", body: "asdassad"})
            }}>click</Button>
                <Button variant="info" onClick={() => {
                   this.selfClose()
                }}>selfClose</Button>
            </Form>
        );
    }


}

//FormNameF.contextType = DialogContext;
