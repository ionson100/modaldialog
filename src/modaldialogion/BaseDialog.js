
import {Component} from "react";


export  default class BaseDialog extends Component {
        constructor(props) {
        super(props);
        setTimeout(() => {



            // eslint-disable-next-line no-undef
            global.hostDialog.currentDialog.innerValidate=this.validate.bind(this)
            // eslint-disable-next-line no-undef
            global.hostDialog.currentDialog.innerGetData=this.getData.bind(this)
        }, 1);

    }

    validate(){
            return true;
    }
    getData(){
            return {body:"none"}
    }
}

