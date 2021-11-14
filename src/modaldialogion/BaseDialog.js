
import {Component} from "react";
import {hostDialog} from "./StorageDialog";


export  default class BaseDialog extends Component {
        constructor(props) {
        super(undefined);
        setTimeout(() => {
            hostDialog.currentDialog.innerValidate=this.validate.bind(this)
            hostDialog.currentDialog.innerGetData=this.getData.bind(this)
        }, 1);

    }


    validate(button){

    }
    getData(button){

    }
}

