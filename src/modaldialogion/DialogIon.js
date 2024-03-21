"use strict";

import React, {Component} from "react";

import {Button, Image} from "react-bootstrap";
import Modal from 'react-bootstrap/Modal'
import * as ReactDOM from "react-dom";

import {v4 as uuidv4} from 'uuid';
import {hostDialog} from "./StorageDialog";



/**
 * обертка компонента модального окна, требуется точка монтирования
 */
export class WrapperModal {



    /**
     * ctor
     * ( другие данные в DOM в этой точке могут исчезнуть)
     */
    constructor() {


        this.myRef = React.createRef();
    }

    extracted(dialogData) {
        const root = document.createElement('div');
        root.style.display = 'contents';


        ReactDOM.render(<DialogIon ref={this.myRef} dialogData={dialogData}/>, root);
    }

    /**
     * получение аттрибутов модального диалога со значениями по умолчанию
     * @param o параметры компонента
     * @returns {{size: *, centered, fullscree, dialogClassName: *, contentClassName: *, scrollable, animation,rebaseHead,rebaseBody,rebaseFooter}}
     */
    getModalAttributes(o) {
        return {
            size: o.size,
            fullscreen: o.fullscreen ?? false,
            centered: o.centered ?? false,
            animation: o.animation ?? true,
            dialogClassName: o.dialogClassName,
            contentClassName: o.contentClassName,
            scrollable: o.scrollable ?? false,
            showHead:o.showHead??true,
            rebaseHead:o.rebaseHead,
            rebaseBody:o.rebaseBody,
            rebaseFooter:o.rebaseFooter

        }
    }
}


/*
 Компонент асинхронного вызова диалога
 */
class DialogIon extends Component {



    constructor(props) {
        super(props);
        this.moduleIdCore = uuidv4()
        this.checkGlobal()


        /* eslint-disable */
        this.state = {

            isShow: false//props.dialogData?._isShow??true,


        }

        const p=props;

        this.head=p.dialogData?._head ?? "no date";
        this.body= p.dialogData?._body ?? "no date";
        this.buttons= p.dialogData?._buttons ?? [];
        this.modalAtr = p.dialogData.modalAtr;// атрибуты для модального диалога
        this.myRef = React.createRef();
        this.myRefClose = React.createRef();
        this.buttonModeAction = undefined;// кнопка которую нажали, закрытие по кресту odeId=-1
        this.promiseInfo = {};
        this.dialogType = "none";
        this.icon = props.dialogData?._icon ?? null;

        this.innerValidate = undefined
        this.innerGetData = undefined;
        this.innerSetActionClose=undefined;
        this.myRefFocus = React.createRef()
        this.oldDialog = undefined

        this.showHead = this.modalAtr.showHead !== false;
        this.rebaseHead=this.modalAtr.rebaseHead;
        this.rebaseBody=this.modalAtr.rebaseBody;
        this.rebaseFooter=this.modalAtr.rebaseFooter
        this.selfClose=()=>{
            this.myRefClose.current?.click()
        }
    }

    checkGlobal() {



        this.oldDialog = hostDialog.currentDialog

        hostDialog.currentDialog = this;
        if (!hostDialog.moduleId) {
            hostDialog.moduleId = this.moduleIdCore;
        }
    }

    async show(type){
        this.dialogType = type;


        return new Promise((resolve, reject) => {
            this.promiseInfo = {
                resolve,
                reject
            };
            this.setState({
                isShow: true
            });
        });
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextState.isShow === false) {
            if (hostDialog.moduleId === this.moduleIdCore) {
                hostDialog.currentDialog = undefined;
                hostDialog.moduleId = undefined;
            } else {
                hostDialog.currentDialog = this.oldDialog;
            }


        }
        return true

    }


    checkValidateForm(b) {

        if (this.innerValidate) {
            return this.innerValidate(b,()=>{
                this.setState({isShow: false})
            })
        } else {
            return true;
        }
    }

    checkGetDataForm(b) {
        if (this.innerGetData) {
            return this.innerGetData(b)
        } else {
            return {data: "Base data body content"}
        }
    }


    onClick(){

        let {resolve, reject} = this.promiseInfo;
        try {
            switch (this.dialogType) {
                case "none": {
                    resolve(new MyResolve({button: this.buttonModeAction}))
                    this.setState({isShow: false})

                    break
                }

                case "simple": {
                    const ss = this.buttonModeAction?.modeId ?? -1;
                    const ok = ss !== -1;
                    resolve(new MyResolve({ok: ok, modeId: ss, button: this.buttonModeAction}))
                    this.setState({isShow: false})
                    break
                }


                case "form": {

                    const ss = this.buttonModeAction?.modeId ?? -1;
                    if (ss !== -1) {
                        if (this.checkValidateForm(ss) === true) {
                            const res = this.checkGetDataForm(ss);
                            const ok = ss !== -1;
                            resolve(new MyResolve({ok: ok, modeId: ss, button: this.buttonModeAction, formData: res}))
                            this.setState({isShow: false})
                        }
                    } else {
                        const ok = ss !== -1;
                        resolve(new MyResolve({ok: ok, modeId: ss, button: this.buttonModeAction}))
                        this.setState({isShow: false})
                    }
                    break
                }
                default: {

                    const msg = `Не могу обработать тип диалога: ${this.dialogType} type {simple,form,}`
                    console.error(msg)
                    reject(msg)
                    this.setState({isShow: false})

                }

            }
        } catch (ex) {
            console.error(ex)
            reject(ex)
            this.setState({isShow: false})
        }


    }


    checkBody(b) {
        return b;
    }

    renderIcon() {
        if (this.icon) {
            if (typeof this.icon === "string") {
                this.icon = <Image src={this.icon} height={40}/>;
            }
            return (
                <div className="imageDialogion" style={{marginLeft: "10px", marginRight: "10px"}}> {this.icon}</div>);
        }
    }


     addIcon(icon){
        if(icon){
            return(<>{icon}</>)
        }
     }

    checkButtonFocus(b, i) {

            if(b.isLink===true){
                return (<a href="#"  key={i} ref={(el)=>{
                    b.isFocus===true?this.myRefFocus.current=el:null;
                    b.modeId===-1?this.myRefClose.current=el:null;
                }} className={b.variant}  onClick={() => {
                    this.buttonModeAction = b;
                    this.onClick(this)
                }} data-mode-id={b.modeId}>
                    {this.addIcon(b.icon)}
                    {b.name}
                </a>);
            }else{
                return (<Button data-user={b.dataUser?b.dataUser:''}  key={i} ref={(el)=>{
                    b.isFocus===true?this.myRefFocus.current=el:null;
                    b.modeId===-1?this.myRefClose.current=el:null;
                }} variant={b.variant} onClick={() => {
                    this.buttonModeAction = b;
                    this.onClick(this)
                }} data-mode-id={b.modeId}>
                    {this.addIcon(b.icon)}
                    {b.name}
                </Button>);
            }


    }

    componentDidMount() {
        setTimeout(() => {
            this.myRefFocus.current?.focus();
        }, 1);

    }
    showHeadDialog(){
        if(this.showHead===true){
            return(
                <Modal.Header closeButton className={this.rebaseHead?this.rebaseHead:""}>
                    {this.renderIcon()}
                    <Modal.Title>{this.head}</Modal.Title>
                </Modal.Header>
            )
        }else {
            return (<></>)
        }
    }

    render() {

        return (


            <Modal ref={this.myRef}
                   size={this.modalAtr.size} as="section"
                   fullscreen={this.modalAtr.fullscreen}
                   centered={this.modalAtr.centered}
                   animation={this.modalAtr.animation}
                   dialogClassName={this.modalAtr.dialogClassName}
                   contentClassName={this.modalAtr.contentClassName}
                   scrollable={this.modalAtr.scrollable}

                   show={this.state.isShow}
                   onHide={() => {
                       this.buttonModeAction = null;
                       this.onClick(this)
                   }}
                   backdrop="static"
                   keyboard={true}

            >

                {
                    this.showHeadDialog()
                }
                <div  className={this.rebaseBody?("modal-body "+this.rebaseBody):"modal-body"}>
                    {this.checkBody(this.body)}
                </div>
                <div   className={this.rebaseFooter?("modal-footer "+this.rebaseFooter):"modal-footer"}>
                    {
                        this.buttons.map((b, i) => {
                            return (
                                this.checkButtonFocus(b, i)
                            );
                        })
                    }

                </div>
            </Modal>

        );
    }

}

class MyResolve {


    constructor({ok = false, modeId = -1, button = undefined, formData = undefined}) {
        this.ok = ok;
        this.modeId = modeId;
        this.button = button;
        this.formData = formData;
    }
}





