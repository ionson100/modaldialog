"use strict";
import {Component} from "react";
import {hostDialog} from "./StorageDialog";


export  default class BaseDialog extends Component {
        constructor() {
        super(undefined);
        this.form=undefined;
        this.form=hostDialog.currentDialog
        setTimeout(() => {
            hostDialog.currentDialog.innerValidate=this.validate.bind(this)
            hostDialog.currentDialog.innerGetData=this.getData.bind(this)
            this.form=hostDialog.currentDialog;

        }, 1);
        this.selfClose=()=>{
            this.form?.selfClose()
        }

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

