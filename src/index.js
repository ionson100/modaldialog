
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import WrapperModal from "./modaldialogion/DialogIon";
import DialogData,{DialogButton} from "./modaldialogion/DialogData";

import reportWebVitals from './reportWebVitals';
import * as ReactDOM from "react-dom";

const dialog=new WrapperModal("root");

const bt1=document.getElementById('bt_1');
bt1.onclick=()=>{

    const props=new DialogData("Просто диалог","Тело диалога")
    props.push(new DialogButton("Закрыть"));
   dialog.DialogAlert(props).then(value => {
       alert(value)
   })
}


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
