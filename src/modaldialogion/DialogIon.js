import React, {Component, useState} from "react";

import {Button} from "react-bootstrap";
import Modal from 'react-bootstrap/Modal'
import * as ReactDOM from "react-dom";

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
    async DialogAlert(dialogData) {
        this.extracted(dialogData);
        const modal = this.myRef.current;
        const  res= await modal.show("alert");
        return res;
    }
     async DialogConfirm(dialogData) {
        if(dialogData.countButton!==2){
           throw   Error(`DialogConfirm, должно быть две кнопки, у вас ${dialogData.countButton}`)
        }
         this.extracted(dialogData);
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
                if(ss===-1){
                    resolve(null)
                    this.setState({isShow:false})
                    break
                }


                 console.log("33333333333333",window.refform.validate.bind(window.refform)())

                // if(window.refform.validate()===true){
                //     resolve(window.refform.getData())
                // }


                break
            }

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
                 <Modal.Header closeButton>
                     <Modal.Title>{this.state.head}</Modal.Title>
                 </Modal.Header>
                 <Modal.Body>


                     {this.checkBodu(this.state.body)}
                 </Modal.Body>
                 <Modal.Footer>
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

