import React, {Component} from "react";

import {Button} from "react-bootstrap";
import Modal from 'react-bootstrap/Modal'
import * as ReactDOM from "react-dom";
import DialogData, {DialogButton} from "./DialogData";
import "./styleDialog.css"


 export default class WrapperModal{
     myRef= React.createRef();
    constructor(root) {
        this._root = root;
    }

    extracted(dialogData) {
         const root = document.getElementById(this._root);
         ReactDOM.unmountComponentAtNode(root);
         ReactDOM.render(<DialogIon ref={this.myRef} dialogData={dialogData}/>, root);


     }
     modalPar={
         size: 'sm' | 'lg' | 'xl'
     };
    async DialogAlertCore({dialogData,size,fullscreen,centered,animation,dialogClassName,contentClassName,scrollable}) {
        this.extracted(dialogData);
        const modal = this.myRef.current;
        const  res= await modal.show("alert");
        return res;
    }
     async DialogAlert({head,body,icon,size,fullscreen,centered,animation,dialogClassName,contentClassName,scrollable}) {
         const props=new DialogData(head,body,icon)
         props.pushButton(new DialogButton("Close"));
         this.extracted(props);
         const modal = this.myRef.current;
         const  res= await modal.show("alert");
         return res;
     }
     async DialogConfirmCore(dialogData) {
        if(dialogData.countButton!==2){
           throw   Error(`DialogConfirm, должно быть две кнопки, у вас ${dialogData.countButton}`)
        }
         this.extracted(dialogData);
         const modal = this.myRef.current;
         const  res= await modal.show("confirm");
         return res;
     }

     async DialogConfirm(head,body) {
         const props=new DialogData(head,body)
         props.pushButton(new DialogButton("Ok")).pushButton(new DialogButton("Cancel",2,"secondary"));
         this.extracted(props);
         const modal = this.myRef.current;
         const  res= await modal.show("confirm");
         return res;
     }
     async DialogSelection(dialogData) {
         this.extracted(dialogData);
         const modal = this.myRef.current;
         const  res= await modal.show("selection");
         return res;
     }
     async DialogFree(dialogData) {
         this.extracted(dialogData);
         const modal = this.myRef.current;
         const  res= await modal.show("free");
         return res;
     }
     async DialogForm(dialogData) {
         this.extracted(dialogData);
         const modal = this.myRef.current;
         const  res= await modal.show("form");
         return res;
     }


 }

class DialogIon extends Component{

     constructor(props) {
         super(props);
         this.state={
             head:props.dialogData?._head??"no date",
             body:props.dialogData?._body??"no date",
             buttons:props.dialogData?._buttons??[],
             isShow:false//props.dialogData?._isShow??true,


         }
         this.refForm=undefined;
         this.myRef= React.createRef();
         this.myRefWorm= React.createRef();
         this.buttonModeAction=undefined;
         this.promiseInfo = {};
         this.dialogType="none";
         this.icon=props.dialogData?._icon??null;

         // this.size?: 'sm' | 'lg' | 'xl';
         // this.fullscreen?: true | 'sm-down' | 'md-down' | 'lg-down' | 'xl-down' | 'xxl-down';
         // this.bsPrefix?: string;
         // this.centered?: boolean;
         // this.backdropClassName?: string;
         // this.animation?: boolean;
         // this.dialogClassName?: string;
         // this.contentClassName?: string;
         // this.dialogAs?: React.ElementType;
         // this.scrollable?: boolean;
         // this.[other: string]: any;



         //{size,fullscreen,bsPrefix,centered,animation,dialogClassName,contentClassName,dialogAs,scrollable}

     }
    show = async (type) => {
        this.dialogType=type;
        return new Promise((resolve, reject) => {
            this.promiseInfo = {
                resolve,
                reject
            };
            this.setState({
                isShow: true
            });
        });
    };


     onClick=()=>{

         let { resolve, reject } = this.promiseInfo;
         try{
             switch (this.dialogType){
                 case "none":{
                     resolve(this.buttonModeAction)
                     this.setState({isShow:false})

                     break
                 }
                 case "free":{
                     resolve(this.buttonModeAction)
                     this.setState({isShow:false})
                     break
                 }
                 case "alert":{
                     const ss=this.buttonModeAction?.modeId??-1;
                     if(ss===1){
                         resolve(true)
                     }else{
                         resolve(false)
                     }
                     this.setState({isShow:false})
                     break
                 }
                 case "confirm":{
                     const ss=this.buttonModeAction?.modeId??-1;
                     if(ss!==1){
                         resolve(false)
                     }else{
                         resolve(true)
                     }
                     this.setState({isShow:false})
                     break
                 }
                 case "selection":{
                     const ss=this.buttonModeAction?.modeId??-1;
                     resolve(ss)
                     this.setState({isShow:false})
                     break
                 }
                 case "form":{

                     const ss=this.buttonModeAction?.modeId??-1;
                     if(ss===1){
                         if(window.refform.validate.bind(window.refform)()===true){
                             const res=window.refform.getData.bind(window.refform)();
                             console.log("#form",res)
                             resolve(res)
                             this.setState({isShow:false})
                         }
                     }else{
                         resolve(null)
                         this.setState({isShow:false})
                     }
                     break
                 }
                 default:{

                     const msg=`Не могу обработать тип диалога: ${this.dialogType} type {free,alert,confirm,form,selection}`
                     console.error(msg)
                     reject(msg)
                     this.setState({isShow:false})

                 }

             }
         }catch (ex){
             console.error(ex)
             reject(ex)
             this.setState({isShow:false})
         }



     }



     checkBodu(b){
         if (typeof b === 'function') {
             this.refForm=React.createElement(b,{})

             return this.refForm;


         }else{
             return b;
         }
     }
     renderIcon(){
         if(this.icon){
             return (<div className="imageDialogion" style={{marginLeft:"10px",marginRight:"10px"}} > {this.icon}</div>);
         }
     }

     render() {


         return(


             <Modal ref={this.myRef}
                    show={this.state.isShow}
                 onHide={()=>{
                     this.buttonModeAction=null;
                     this.onClick(this)
                 }}
                 backdrop="static"
                 keyboard={false}

             >

                 <Modal.Header closeButton className="headerDialogion">
                     {this.renderIcon()}
                     <Modal.Title>{this.state.head}</Modal.Title>
                 </Modal.Header>
                 <Modal.Body >


                     {this.checkBodu(this.state.body)}
                 </Modal.Body>
                 <Modal.Footer className="footerDialogion">
                     {
                         this.state.buttons.map((b,i)=>{
                             return(
                                 <Button key={i} variant={b.variant} onClick={()=>{
                                     this.buttonModeAction=b;
                                     this.onClick(this)
                                 }}>
                                     {b.name}
                                 </Button>
                             );
                         })
                     }

                 </Modal.Footer>
             </Modal>
         );
     }

 }

