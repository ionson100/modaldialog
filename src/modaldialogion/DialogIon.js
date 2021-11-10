import React, {Component} from "react";

import {Button, Image} from "react-bootstrap";
import Modal from 'react-bootstrap/Modal'
import * as ReactDOM from "react-dom";
import "./styleDialog.css"
import {v4 as uuidv4} from 'uuid';


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
        //const root = document.getElementById(this._root);
        //ReactDOM.unmountComponentAtNode(root);//todo размонтирование точки

        ReactDOM.render(<DialogIon ref={this.myRef} dialogData={dialogData}/>, root);
    }

    /**
     * получение аттрибутов модального диалога со значениями по умолчанию
     * @param o параметры компонента
     * @returns {{size: *, centered, fullscree, dialogClassName: *, contentClassName: *, scrollable, animation}}
     */
    getModalAttributes(o) {
        return {
            size: o.size,
            fullscree: o.fullscree ,
            centered: o.centered ?? false,
            animation: o.animation ?? true,
            dialogClassName: o.dialogClassName,
            contentClassName: o.contentClassName,
            scrollable: o.scrollable ?? true,
            dialogAs:o.dialogAs,
            backdrop:o.backdrop??"static",
            keyboard:o.keyboard??true,
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

        this.state = {

            isShow: false//props.dialogData?._isShow??true,


        }
        const p=props;

        this.head= p.dialogData?._head ?? "no date";

        this.body= p.dialogData?._body ?? "no date";
        this.buttons=p.dialogData?._buttons ?? [];

        this.modalAtr = p.dialogData.modalAtr;// атрибуты для модального диалога

        this.myRef = React.createRef();
        this.buttonModeAction = undefined;// копка которую нажали, закрытие по кресту odeId=-1
        this.promiseInfo = {};
        this.dialogType = "none";
        this.icon = p.dialogData?._icon ?? null;
        this.innerValidate = undefined
        this.innerGetData = undefined;
        this.myRefFocus = React.createRef()
        this.oldDialog = undefined


    }


    checkGlobal() {
        // eslint-disable-next-line no-undef
        if (!global.hostDialog) {
            // eslint-disable-next-line no-undef
            global.hostDialog = {

                currentDialog: undefined,
                moduleId: undefined
            }
        }


        // eslint-disable-next-line no-undef
        this.oldDialog = global.hostDialog.currentDialog

        // eslint-disable-next-line no-undef
        global.hostDialog.currentDialog = this;
        console.log("old", this.oldDialog)
        // eslint-disable-next-line no-undef
        console.log("current", global.hostDialog.currentDialog)
        // eslint-disable-next-line no-undef
        if (!global.hostDialog.moduleId) {
            // eslint-disable-next-line no-undef
            global.hostDialog.moduleId = this.moduleIdCore;
            // eslint-disable-next-line no-undef
            console.log("init", global.hostDialog.moduleId, "  ", this.moduleIdCore)
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

    /* eslint-disable */
    shouldComponentUpdate(nextProps, nextState) {
        if (nextState.isShow === false) {
            console.log(global.hostDialog.moduleId, "  ", this.moduleIdCore)
            if (global.hostDialog.moduleId === this.moduleIdCore) {
                global.hostDialog.currentDialog = undefined;
                global.hostDialog.moduleId = undefined;
            } else {
                global.hostDialog.currentDialog = this.oldDialog;
            }


        }
        return true

    }

    checkValidateForm(b) {
        if (this.innerValidate) {
            return this.innerValidate(b)
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
                        if (this.checkValidateForm(ss) === true) {  //todo внимание тут магия вызова снаружи
                            const res = this.checkGetDataForm(ss);//todo внимание тут магия вызова снаружи
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
            console.log("reder icon",this.icon)
            if (typeof this.icon === "string") {
                this.icon = <Image src={this.icon} height={40}/>;
            }
            return (
                <div className="imageDialogion" > {this.icon}</div>);
        }
    }

    checkButtonFocus(b, i) {
        if (b.isFocus === true) {
            return (<Button key={i} ref={this.myRefFocus} variant={b.variant} onClick={() => {
                this.buttonModeAction = b;
                this.onClick(this)
            }} data-mode-id={b.modeId}>
                {b.name}
            </Button>);
        } else {
            return (<Button key={i} variant={b.variant} onClick={() => {
                this.buttonModeAction = b;
                this.onClick(this)
            }} data-mode-id={b.modeId}>
                {b.name}
            </Button>);
        }
    }

    componentDidMount() {
        setTimeout(() => {
            this.myRefFocus.current?.focus();
        }, 1);

    }

    getHeaderDialog(){
       if(!this.head&&!this.icon){
           return("");
       }else{
           return (<Modal.Header closeButton className="headerDialogion">
               {this.renderIcon()}
               <Modal.Title>{this.head}</Modal.Title>
           </Modal.Header>);
       }

    }

    render() {

        return (

            // dialogAs:o.dialogAs??"ModalDialog",
            // backdrop:o.backdrop??true,
            // keyboard:o.keyboard??true,
            <Modal ref={this.myRef}
                   {...this.modalAtr}
                   show={this.state.isShow}
                   onHide={() => {
                       this.buttonModeAction = null;
                       this.onClick(this)
                   }}
                   as="section"

            >

                {this.getHeaderDialog()}

                <Modal.Body>
                    {this.checkBody(this.body)}
                </Modal.Body>
                <Modal.Footer className="footerDialogion">
                    {
                        this.buttons.map((b, i) => {
                            return (
                                this.checkButtonFocus(b, i)
                            );
                        })
                    }

                </Modal.Footer>
            </Modal>

        );
    }

}

class MyResolve {

    constructor({ok = false, modeId = -1, button = undefined, formData = undefined}) {
        this.ok = ok;
        /**
         * идентификатор нажатой кнопки
         * @type {number}
         */
        this.modeId = modeId;
        this.button = button;
        /**
         * объект для пользовательского контента
         * @type {undefined}
         */
        this.formData = formData;
    }
}





