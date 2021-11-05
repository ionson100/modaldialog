
import {Component} from "react";


export  default class BaseDialog extends Component {
        constructor(props) {
        super(undefined);
        setTimeout(() => {
            global.hostDialog.currentDialog.innerValidate=this.validate.bind(this)
            global.hostDialog.currentDialog.innerGetData=this.getData.bind(this)
        }, 1);

    }


    validate(button){

    }
    getData(button){

    }
}

