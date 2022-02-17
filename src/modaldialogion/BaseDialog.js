"use strict";
import {Component} from "react";
import {hostDialog} from "./StorageDialog";


export  default class BaseDialog extends Component {
        constructor() {
        super(undefined);
        setTimeout(() => {
            hostDialog.currentDialog.innerValidate=this.validate.bind(this)
            hostDialog.currentDialog.innerGetData=this.getData.bind(this)
            hostDialog.currentDialog.innerSetActionClose=this.setActionClose.bind(this)
        }, 1);

    }


    // eslint-disable-next-line no-unused-vars
    setActionClose(){

    }
    validate(){
 return true;
    }
    getData(){
 return {
     data:'no data'
 }
    }
}

