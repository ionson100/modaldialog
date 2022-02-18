"use strict";
import {Component} from "react";
import {hostDialog} from "./StorageDialog";


export  default class BaseDialog extends Component {
        constructor() {
        super(undefined);
        setTimeout(() => {
            hostDialog.currentDialog.innerValidate=this.validate.bind(this)
            hostDialog.currentDialog.innerGetData=this.getData.bind(this)

        }, 1);

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

