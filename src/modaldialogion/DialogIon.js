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
         dialogData.callback = (b) => {


         }
         ReactDOM.unmountComponentAtNode(root);
         ReactDOM.render(<DialogIon ref={this.myRef} dialogData={dialogData}/>, root);


     }
    async DialogAlert(dialogData) {
         this.extracted(dialogData);
        const modal = this.myRef.current;
        alert('start')
        const  res= await modal.show();
        alert('finish')
        return new Promise((resolve, reject) => {

            resolve(1234);

        });
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
         this.myRef= React.createRef();
         this.buttonModeAction=undefined;
         this.call=props.dialogData.callback;
         this.promiseInfo = {};

     }
    show = async () => {

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


     // componentDidUpdate(prevProps, prevState, snapshot) {
     //     console.log(this.buttonModeAction)
     //     this.call(this.buttonModeAction)
     // }

     onClick(mode){



        this.setState({isShow:false})
         let { resolve, reject } = this.promiseInfo;
         resolve(this.buttonModeAction)
     }



     render() {

         return(
             <Modal ref={this.myRef}
                    show={this.state.isShow}
                 onHide={this.onClick.bind(this)}
                 backdrop="static"
                 keyboard={false}
             >
                 <Modal.Header closeButton>
                     <Modal.Title>{this.state.head}</Modal.Title>
                 </Modal.Header>
                 <Modal.Body>
                     {this.state.body}
                 </Modal.Body>
                 <Modal.Footer>
                     {
                         this.state.buttons.map((b,i)=>{
                             return(
                                 <Button key={i} variant={b._type} onClick={()=>{
                                     this.buttonModeAction=b;
                                     this.setState({isShow:false})
                                     let { resolve, reject } = this.promiseInfo;
                                     resolve(this.buttonModeAction)
                                 }}>
                                     {b._name}
                                 </Button>
                             );
                         })
                     }

                 </Modal.Footer>
             </Modal>
         );
     }

    getResolve() {
        const { resolve = () => {} } = this.promiseInfo || {};
        return result => {
            resolve(result);
            this.hide();
        };
    }


    getReject() {
        const { reject = () => {} } = this.promiseInfo || {};
        return err => {
            reject(err);
            this.hide();
        };
    }



 }

