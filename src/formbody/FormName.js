import React, {Component} from "react";
import { FloatingLabel, Form, Row} from "react-bootstrap";


//  export function FormName2(props){
//      const {lang,name}=props;
//      const [validated, setValidated] = useState(false);
//      const Col='er'
//      const myRef=React.createRef()
//      const myRef1=React.createRef()
//      const myRef2=React.createRef()
//      const myRef3=React.createRef()
//
//      const validate = () => {
//
//
//          const form = myRef.current;
//          if (form.checkValidity() === false) {
//              // event.preventDefault();
//              // event.stopPropagation();
//          }
//          setValidated(true);
//      };
//      const getData=()=>{
//
//      }
//
//
//
//      return (
//          <Form noValidate ref={myRef} validated={validated} >
//              <Row className="mb-3">
//                  <Form.Group  md="6" controlId="validationCustom02">
//                     <FloatingLabel controlId="floatingSelect" label="Язык">
//                       <Form.Control ref={myRef1} as="select" placeholder="Описание маршрута" required >
//                          <option value={undefined}></option>
//                          <option value="Ru">Руссский</option>
//                          <option value="En">English</option>
//                       </Form.Control>
//                         <Form.Control.Feedback type="invalid">
//                             Please clect language.
//                         </Form.Control.Feedback>
//                      </FloatingLabel>
//                  </Form.Group>
//                  <Form.Group  md="6" controlId="validationCustom03">
//                      <Form.Label>Название маршрута</Form.Label>
//                      <Form.Control ref={myRef2}  type="text" placeholder="Название маршрута" required value={name} />
//                      <Form.Control.Feedback type="invalid">
//                          Please provide a valid route.
//                      </Form.Control.Feedback>
//                  </Form.Group>
//
//                  <Form.Group  md="6" controlId="validationCustom04">
//                      <Form.Label>Описание маршрута</Form.Label>
//                      <Form.Control ref={myRef3} as="textarea" type="text" placeholder="Описание маршрута" required value={name} />
//                      <Form.Control.Feedback type="invalid">
//                          Please provide a valid descriptive route.
//                      </Form.Control.Feedback>
//                  </Form.Group>
//              </Row>
//
//              <Button  type="button" onClick={validate}>Submit form</Button>
//          </Form>
//      );
// }


 export  class FormNameF extends Component{

     constructor(props) {
         super();
         this.state =
             {

                 validated:false
             }

         this.lang= props?.data?.lang??undefined;
         this.name= props?.data?.name??undefined;
         this.description=props?.data?.description??undefined;
         this.myRef = React.createRef()
         this.myRef1 = React.createRef()
         this.myRef2 = React.createRef()
         this.myRef3 = React.createRef()
             //todo внимание тут магия вызова снаружи
         global.refform=this;
         this.validate.bind(this)
         this.getData.bind(this)

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

     /**
      * получение данных с формы
      * @param modeId  modeId нажатой кнопки
      * @returns {{name, description, lang}}
      */
    getData=(modeId)=>{
        return {
            modeId:modeId,
            lang:this.myRef1.current.value,
            name:this.myRef2.current.value,
            description:this.myRef3.current.value
        }
    }

    render() {
        return(
            <Form noValidate ref={this.myRef} validated={this.state.validated} >
                <Row className="mb-3">
                    <Form.Group  md="6" controlId="validationCustom02">
                        <FloatingLabel controlId="floatingSelect" label="Язык">
                            <Form.Control ref={this.myRef1} as="select" placeholder="Выбор языка" required defaultValue={this.lang} >
                                <option value={undefined}/>
                                <option value="Ru">Руссский</option>
                                <option value="En">English</option>
                            </Form.Control>
                            <Form.Control.Feedback type="invalid">
                                Please clect language.
                            </Form.Control.Feedback>
                        </FloatingLabel>
                    </Form.Group>
                    <Form.Group  md="6" controlId="validationCustom03">
                        <Form.Label>Название маршрута</Form.Label>
                        <Form.Control ref={this.myRef2}  type="text" placeholder="Название маршрута" required defaultValue={this.name}  />
                        <Form.Control.Feedback type="invalid">
                            Please provide a valid route.
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group  md="6" controlId="validationCustom04">
                        <Form.Label>Описание маршрута</Form.Label>
                        <Form.Control ref={this.myRef3} as="textarea" type="text" placeholder="Описание маршрута" defaultValue={this.description} required  />
                        <Form.Control.Feedback type="invalid">
                            Please provide a valid descriptive route.
                        </Form.Control.Feedback>
                    </Form.Group>
                </Row>
            </Form>
        );
    }


}