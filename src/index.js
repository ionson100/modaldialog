import { MdOutlineSettings } from "react-icons/md";
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import WrapperModal from "./modaldialogion/DialogIon";
import DialogData,{DialogButton} from "./modaldialogion/DialogData";

import reportWebVitals from './reportWebVitals';
import * as ReactDOM from "react-dom";
import React from "react";
import Clock from "./clock/Clock";
import {FormNameF} from "./formbody/FormName"
import Icon from  "./iconosprait/myicons"
import {Image} from "react-bootstrap";


const dialog=new WrapperModal("root");

const bt1=document.getElementById('bt_1');
const span=document.getElementById('span');
bt1.onclick=()=>{

    span.innerHTML=""

    dialog.DialogAlert(
        {head:"Simple Dialog",body:"Body Dialog"}).then(value => {
        span.innerHTML=value;
   }).catch(reason => {

    })
}

const bt2=document.getElementById('bt_2');
bt2.onclick=()=>{
    dialog.DialogConfirm("close winows","Закрыть диалог").then(value => {
        span.innerHTML=value;
    }).catch(reason => {

    })
}

const bt3=document.getElementById('bt_3');
bt3.onclick=()=>{
    selectionDialog("select dialog","Выбрать тип закрытия").then(value => {
        span.innerHTML=`Нажали кнопку: ${value}`;
    }).catch(reason => {

    })
}

const bt4=document.getElementById('bt_4');
bt4.onclick=()=>{
    freeDialog("select dialog","Выбрать тип закрытия").then(value => {
        if(value){
          const s=  JSON.stringify(value,null,1)
            span.innerHTML=`кнопка: ${s}`;
        }else{
            span.innerHTML=`Диалог закрыли как окно`;
        }

    }).catch(reason => {

    })
}

const bt5=document.getElementById('bt_5');
bt5.onclick=()=>{
    formDialog().then(value => {
        if(value){
            const s=  JSON.stringify(value,null,1)
            span.innerHTML=`json: ${s}`;
        }else{
            span.innerHTML=`null`;
        }

    })
}

{
    const bt11=document.getElementById('bt_11');
    bt11.onclick=()=>{
        span.innerHTML=""

        dialog.DialogAlert({head:"Simple Dialog",body:"Body Dialog",icon:
            <Icon name="info"   size={55} />}).then(value => {
            span.innerHTML=value;
        }).catch(reason => {

        })
    }

    const bt12=document.getElementById('bt_12');
    bt12.onclick=()=>{
        span.innerHTML=""

        dialog.DialogAlert({head:"Simple Dialog",body:"Body Dialog", icon:
            <Image src="./error_.svg" width={50} rounded />}
            // <Icon name="error-warning" color="red"  size={55} />
            ).then(value => {
            span.innerHTML=value;
        }).catch(reason => {

        })
    }

    const bt13=document.getElementById('bt_13');
    bt13.onclick=()=>{
        span.innerHTML=""

        dialog.DialogAlert({head:"Simple Dialog",body:"Body Dialog",icon:
            <Icon name="error-warning" color="#FFC433"  size={55} />}).then(value => {
            span.innerHTML=value;
        }).catch(reason => {

        })
    }

    const bt14=document.getElementById('bt_14');
    bt14.onclick=()=>{
        span.innerHTML=""

        dialog.DialogAlert({head:"Simple Dialog",body:"Body Dialog",icon:
            <Icon name="form"   size={55} />}).then(value => {
            span.innerHTML=value;
        }).catch(reason => {

        })
    }

    const bt15=document.getElementById('bt_15');
    bt15.onclick=()=>{
        span.innerHTML=""

        dialog.DialogAlert({head:"Simple Dialog",body:"Body Dialog",icon:
            <Icon name="confirm" color="#20A945"   size={55} />}).then(value => {
            span.innerHTML=value;
        }).catch(reason => {

        })
    }

}




// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
ReactDOM.render(<Clock />, document.getElementById('mount'))

function confirmDialog(head,body){
    const props=new DialogData(head,body)
    props.pushButton(new DialogButton("Cancel",2,"secondary")).pushButton(new DialogButton("Ok"));
   return  dialog.DialogConfirmCore(props);
}
//eslint-disable-next-line
function selectionDialog(head,body){
    const props=new DialogData(head,body)
    props.pushButton(new DialogButton("select 1",1,"primary")).
    pushButton(new DialogButton("select 2",2,"primary")).
    pushButton(new DialogButton("select 3",3,"primary")).
    pushButton(new DialogButton("Close",-1,"danger"));
    return  dialog.DialogSelection(props);
}


function freeDialog(head,body){
    const props=new DialogData(head,body)
    props.pushButton(new DialogButton("select 1",1,"primary")).
    pushButton(new DialogButton("select 2",2,"primary")).
    pushButton(new DialogButton("select 3",3,"primary")).
    pushButton(new DialogButton("Close",-1,"danger"));
    return  dialog.DialogFree(props);
}
function formDialog(){

    const props=new DialogData("Название маршрута",FormNameF)
    props.pushButton(new DialogButton("Save",1,"primary")).
    pushButton(new DialogButton("Close",2,"danger"));
    return  dialog.DialogForm(props);
}