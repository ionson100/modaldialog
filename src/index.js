import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

import {DialogButton} from "./modaldialogion/DialogData";

import reportWebVitals from './reportWebVitals';
import * as ReactDOM from "react-dom";
import React from "react";
import Clock from "./clock/Clock";
import {FormNameF} from "./formbody/FormName"
import Icon from "./iconosprait/myicons"


import {DialogAlert, DialogPrompt, DialogConfirm, DialogModalAsync} from "./modaldialogion/index"


const bt1 = document.getElementById('bt_1');
const span = document.getElementById('span');
function Head(){
    return (<div className="h-50"><h6>siduisudu</h6></div>);
}
bt1.onclick = () => {

    span.innerHTML = ""

    DialogAlert(
        {head: <Head/>, body: "Body Dialog", icon: <Icon name="info" color="red" size={40}/>}).then(value => {
        span.innerHTML = JSON.stringify(value);
    }).catch(reason => {
        console.error(reason)
    })
}

const bt2 = document.getElementById('bt_2');
bt2.onclick = () => {
    DialogConfirm({head: "close winows", body: "Закрыть диалог"}).then(value => {
        span.innerHTML = JSON.stringify(value, null, 1);
    }).catch(reason => {

        console.log(reason)
    })
}

const bt3 = document.getElementById('bt_3');
bt3.onclick = () => {
    selectionDialog("select dialog", "Выбрать тип закрытия").then(value => {
        span.innerHTML = `Нажали кнопку: ${JSON.stringify(value, null, 1)}`;
    }).catch(reason => {

        console.log(reason)
    })
}


const bt5 = document.getElementById('bt_5');
bt5.onclick = () => {
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
        head: "Simple prompt Dialog", body: "Пож. введите текст", valueForPrompt: "my text", icon:
            <Icon name="info" size={40}/>, centered: true
    }).then(value => {
        span.innerHTML = JSON.stringify(value);
    }).catch(reason => {
        console.log(reason)
    })
}

{
    const bt11 = document.getElementById('bt_11');
    bt11.onclick = () => {
        span.innerHTML = ""
        DialogAlert({
            head: "Simple Dialog", body: "Body Dialog center", icon:
                <Icon name="info" size={55}/>, centered: true
        }).then(value => {
            span.innerHTML = JSON.stringify(value, null, 1);
        }).catch(reason => {

            console.log(reason)
        })
    }

    const bt12 = document.getElementById('bt_12');
    bt12.onclick = () => {
        span.innerHTML = ""

        DialogAlert({
                head: "Simple Dialog", body: "Body Dialog", icon:
                    "./error_.svg"
            }
            // <Icon name="error-warning" color="red"  size={55} />
        ).then(value => {
            span.innerHTML = JSON.stringify(value, null, 1);
        }).catch(reason => {

            console.log(reason)
        })
    }

    const bt13 = document.getElementById('bt_13');
    bt13.onclick = () => {
        span.innerHTML = ""

        DialogAlert({
            head: "Simple Dialog", body: "Body Dialog", icon:
                <Icon name="error-warning" color="#FFC433" size={55}/>
        }).then(value => {
            span.innerHTML = JSON.stringify(value, null, 1);
        }).catch(reason => {

            console.log(reason)
        })
    }

    const bt14 = document.getElementById('bt_14');
    bt14.onclick = () => {
        span.innerHTML = ""

        DialogAlert({
            head: "Simple Dialog", body: "Body Dialog", icon:
                <Icon name="form" size={55}/>
        }).then(value => {
            span.innerHTML = JSON.stringify(value, null, 1);
        }).catch(reason => {

            console.log(reason)
        })
    }

    const bt15 = document.getElementById('bt_15');
    bt15.onclick = () => {
        span.innerHTML = ""

        DialogAlert({
            head: "Simple Dialog", body: "Body Dialog", icon:
                <Icon name="confirm" color="#20A945" size={55}/>
        }).then(value => {
            span.innerHTML = JSON.stringify(value, null, 1);
        }).catch(reason => {

            console.log(reason)
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

    s.push(new DialogButton("select 1", 1, "primary"))
    s.push(new DialogButton("select 2", 2, "primary"))
    s.push(new DialogButton("select 3", 3, "primary"))
    s.push(new DialogButton("Close", -1, "danger", true))
    return DialogModalAsync({head: head, body: body, listButton: s})

}


function formDialog() {

    const p = {name: "simple route", lang: "Ru", description: "tratata"}
    const _body = <FormNameF data={p}/>
    const s = [];
    s.push(new DialogButton("Save", 2, "primary"))
    s.push(new DialogButton("Close", -1, "danger"))
    return DialogModalAsync({head: "Описание маршрута", body: _body, listButton: s})
}

