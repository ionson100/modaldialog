import React from "react";
import { Form, Row} from "react-bootstrap";
import BaseDialog from "./BaseDialog";


export default  class PromptBody extends BaseDialog{

    constructor(props) {
        super(props);
        this.state =
            {

                validated:false
            }


        this.label= props?.data?.label??undefined;
        this.value=props?.data?.value??undefined;

        this.myRef = React.createRef()
        this.myRef1 = React.createRef()

        //todo внимание тут магия вызова снаружи
       // global.refform=this;
       // this.validate.bind(this)
       // this.getData.bind(this)


    }
    setValidated(v){
        this.setState({validated:v})
        this.forceUpdate()
    }

    /**
     * проверка пользовательских данных
     * @param modeId modeId нажатой кнопки
     * @returns {boolean} true - данные хорошие, false- данные плохие
     */
    validate(modeId){




        const form = this.myRef.current;
        if (form.checkValidity() === false) {
            this.setValidated(true);
            return false
        }
        this.setValidated(true);
        return true;

    };
    componentDidMount() {
        setTimeout(() => {
            this.myRef1.current.focus();
        }, 1);
    }



    componentDidUpdate(prevProps, prevState, snapshot) {


    }

    /**
     * получение данных с формы
     * @param modeId  modeId нажатой кнопки
     * @returns {{name, description, lang}}
     */
    getData=(modeId)=>{
        return {
            modeId:modeId,

            value:this.myRef1.current.value,

        }
    }

    render() {
        return(
            <Form noValidate ref={this.myRef} validated={this.state.validated} >
                <Row className="mb-3" >
                    <Form.Group   md="6" controlId="validationCustom03">
                        <Form.Label>{this.label}</Form.Label>
                        <Form.Control   ref={this.myRef1}  type="text"   required defaultValue={this.value}  />
                        <Form.Control.Feedback type="invalid">
                            Please provide a valid route.
                        </Form.Control.Feedback>
                    </Form.Group>
                </Row>
            </Form>
        );
    }


}
