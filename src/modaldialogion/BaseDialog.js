import {DialogContext} from "./DialogIon";
import {Component} from "react";

export  default class BaseDialog extends Component {
    constructor(props) {
        super();
        setTimeout(() => {
            this.init()
        }, 1);

    }
    init(){
        this.context.validate(this.validate.bind(this))
        this.context.getdata(this.getData.bind(this))
    }



    validate(button){

    }
    getData(button){

    }
}
BaseDialog.contextType = DialogContext;
