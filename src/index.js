
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import WrapperModal from "./modaldialogion/DialogIon";
import DialogData,{DialogButton} from "./modaldialogion/DialogData";

import reportWebVitals from './reportWebVitals';
import * as ReactDOM from "react-dom";
import React from "react";
import Clock from "./clock/Clock";
import {FormNameF} from "./formbody/FormName"


const dialog=new WrapperModal("root");

const bt1=document.getElementById('bt_1');
const span=document.getElementById('span');
bt1.onclick=()=>{

    span.innerHTML=""
    const props=new DialogData("Просто диалог","Тело диалога")
    props.pushButton(new DialogButton("Закрыть"));
    dialog.DialogAlert(props).then(value => {
        span.innerHTML=value;
   }).catch(reason => {

    })
}

const bt2=document.getElementById('bt_2');
bt2.onclick=()=>{
    confirmDialog("close winows","Закрыть диалог").then(value => {
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
    nameDialog().then(value => {

    })
}




// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
ReactDOM.render(<Clock />, document.getElementById('mount'))

function confirmDialog(head,body){
    const props=new DialogData(head,body)
    props.pushButton(new DialogButton("Cancel",2,"secondary")).pushButton(new DialogButton("Ok"));
   return  dialog.DialogConfirm(props);
}
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
function nameDialog(){

    const props=new DialogData("Название маршрута",FormNameF)
    props.pushButton(new DialogButton("Save",1,"primary")).
    pushButton(new DialogButton("Close",2,"danger"));
    return  dialog.DialogForm(props);
}