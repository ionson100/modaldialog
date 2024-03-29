import { MdCancel } from "react-icons/md";
import './index.css';

import {DialogButton} from "./modaldialogion/DialogData";
import "./modaldialogion/styleDialog.css"
import reportWebVitals from './reportWebVitals';
import * as ReactDOM from "react-dom";
import React from "react";
import Clock from "./clock/Clock";
import {FormNameF} from "./formbody/FormName"
import { FcDeleteDatabase,FcGallery,FcFactory,FcMultipleSmartphones } from "react-icons/fc";


import {DialogAlert, DialogPrompt, DialogConfirm, DialogModalAsync} from "./modaldialogion/index"


const bt1 = document.getElementById('bt_1');
const span = document.getElementById('span');
function Head(){
    return (<div className="h-50"><h6>my title</h6></div>);
}
bt1.onclick = () => {

    span.innerHTML = ""

    DialogAlert(
        {
            head: <Head/>,
            rebaseFooter:"iontest",
            body: "Body Dialog image test",
            icon: <FcDeleteDatabase size={40}/>
        }).then(value => {
        span.innerHTML = JSON.stringify(value);
    }).catch(reason => {
        console.error(reason)
    })
}

const bt2 = document.getElementById('bt_2');
bt2.onclick = () => {
    span.innerHTML = ""
    DialogConfirm({
        head: "close winows",
        body: "Закрыть диалог"
    }).then(value => {
        span.innerHTML = JSON.stringify(value, null, 1);
    }).catch(reason => {

        console.error(reason)
    })
}

const bt3 = document.getElementById('bt_3');
bt3.onclick = () => {
    span.innerHTML = ""
    selectionDialog("assa", "Выбрать тип закрытия").then(value => {
        span.innerHTML = `Нажали кнопку: ${JSON.stringify(value, null, 1)}`;
    }).catch(reason => {

        console.error(reason)
    })
}


const bt5 = document.getElementById('bt_5');
bt5.onclick = () => {
    span.innerHTML = ""
    formDialog().then(value => {
        if (value) {
            const s = JSON.stringify(value, null, 1)
            span.innerHTML = `json: ${s}`;
        } else {
            span.innerHTML = `null`;
        }

    })
}

const bt6 = document.getElementById('bt_6');
bt6.onclick = () => {
    span.innerHTML = ""
    DialogPrompt({
        head: "Simple prompt Dialog",
        body: "Пож. введите текст",
        valueForPrompt: "my text",
        icon: <FcGallery size={40}/>,
        centered: true
    }).then(value => {
        span.innerHTML = JSON.stringify(value);
    }).catch(reason => {
        console.error(reason)
    })
}

{
    const bt11 = document.getElementById('bt_11');
    bt11.onclick = () => {
        span.innerHTML = ""
        DialogAlert({
            head: "Simple Dialog",
            body: "Body Dialog center",
            icon: <FcFactory size={40}/>,
            centered: true
        }).then(value => {
            span.innerHTML = JSON.stringify(value, null, 1);
        }).catch(reason => {

            console.error(reason)
        })
    }

    const bt12 = document.getElementById('bt_12');
    bt12.onclick = () => {
        span.innerHTML = ""

        DialogAlert({
                head: "Simple Dialog",
                body: "Body Dialog",
                icon: "./error_.svg"
            }
        ).then(value => {
            span.innerHTML = JSON.stringify(value, null, 1);
        }).catch(reason => {

            console.error(reason)
        })
    }

    const bt13 = document.getElementById('bt_13');
    bt13.onclick = () => {
        span.innerHTML = ""
        DialogAlert({
            "head": "Simple Dialog",
            "body": "Body Dialog",
            "icon": <FcMultipleSmartphones size={40}/>
        }).then(value => {
            span.innerHTML = JSON.stringify(value, null, 1);
        }).catch(reason => {

            console.error(reason)
        })
    }

    const bt14 = document.getElementById('bt_14');
    bt14.onclick = () => {
        span.innerHTML = ""

        DialogAlert({

            head: "Simple Dialog iontest",
            body: "Body Dialog",
            icon: <FcDeleteDatabase size={40}/>
        }).then(value => {
            span.innerHTML = JSON.stringify(value, null, 1);
        }).catch(reason => {

            console.error(reason)
        })
    }

    const bt15 = document.getElementById('bt_15');
    bt15.onclick = () => {
        span.innerHTML = ""

        DialogAlert({
            head: "Simple Dialog",
            body: "Body Dialog", icon: <FcMultipleSmartphones size={40}/>
        }).then(value => {
            span.innerHTML = JSON.stringify(value, null, 1);
        }).catch(reason => {

            console.error(reason)
        })
    }

}


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
ReactDOM.render(<Clock/>, document.getElementById('mount'))

// function confirmDialog(head,body){
//     const props=new DialogData(head,body)
//     props.pushButton(new DialogButton("Cancel",-1,"secondary")).pushButton(new DialogButton("Ok"));
//    return  dialog.DialogSimpleCore({dialogData:props});
// }
//eslint-disable-next-line
function selectionDialog(head, body) {

    const s = [];

    // s.push(new DialogButton("select 1", 1, "primary",false,false,<FcGallery/>))
    s.push(new DialogButton({name:'Select 2',modeId:2,icon:<FcGallery/>},))
    s.push(new DialogButton({name:'select3',modeId:3,isLink:true}))
    s.push(new DialogButton({name:'Close',modeId:-1,variant:'outline-danger',icon:<MdCancel/>,isFocus:true}));

    return DialogModalAsync({
        head: head,
        body: body,
        icon:<FcMultipleSmartphones size={40}/>,
        listButton: s})

}


function formDialog() {

    const p = {name: "simple route", lang: "Ru", description: "tratata"}
    const _body = <FormNameF data={p}/>
    const s = [new DialogButton({name:'Save1',modeId:2}),
        new DialogButton({name:'Close',modeId:-1,variant:'danger',dataUser:'23-34'})];
    s.push()
    s.push()
    return DialogModalAsync({
        head: "Описание маршрута",
        icon:<FcMultipleSmartphones size={40}/>,
        body: _body,
        listButton: s,
        showHead:false,fullscreen:true,
    })
}

