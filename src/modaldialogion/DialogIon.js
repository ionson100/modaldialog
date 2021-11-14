import React, {Component} from "react";

import {Button, Image} from "react-bootstrap";
import Modal from 'react-bootstrap/Modal'
import * as ReactDOM from "react-dom";
import "./styleDialog.css"
import {v4 as uuidv4} from 'uuid';
import {hostDialog} from "./StorageDialog";


/**
 * обертка компонента модального окна, требуется точка монтирования
 */
export class WrapperModal {
    myRef = React.createRef();
    static InstanceModal

    /**
     * ctor
     * ( другие данные в DOM в этой точке могут исчезнуть)
     */
    constructor() {

        WrapperModal.InstanceModal = this;
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
            fullscree: o.fullscree ?? false,
            centered: o.centered ?? false,
            animation: o.animation ?? true,
            dialogClassName: o.dialogClassName,
            contentClassName: o.contentClassName,
            scrollable: o.scrollable ?? true
        }
    }
}


/*
 Компонент асинхронного вызова диалога
 */
class DialogIon extends Component {
    static refParent;


    constructor(props) {
        super(props);
        this.moduleIdCore = uuidv4()
        this.checkGlobal()

        this.state = {
            head: props.dialogData?._head ?? "no date",
            body: props.dialogData?._body ?? "no date",
            buttons: props.dialogData?._buttons ?? [],
            isShow: false//props.dialogData?._isShow??true,


        }

        this.modalAtr = props.dialogData.modalAtr;// атрибуты для модального диалога

        this.myRef = React.createRef();
        this.buttonModeAction = undefined;// копка которую нажали, закрытие по кресту odeId=-1
        this.promiseInfo = {};
        this.dialogType = "none";
        this.icon = props.dialogData?._icon ?? null;
        this.innerValidate = undefined
        this.innerGetData = undefined;
        this.myRefFocus = React.createRef()
        this.oldDialog = undefined


    }

    checkGlobal() {



        this.oldDialog = hostDialog.currentDialog

        hostDialog.currentDialog = this;
        console.log("old", this.oldDialog)
        console.log("current", hostDialog.currentDialog)
        if (!hostDialog.moduleId) {
            hostDialog.moduleId = this.moduleIdCore;
            console.log("init", hostDialog.moduleId, "  ", this.moduleIdCore)
        }
    }


    show = async (type) => {
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
    };

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        if (nextState.isShow === false) {
            console.log(hostDialog.moduleId, "  ", this.moduleIdCore)
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


    onClick = () => {

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
            if (typeof this.icon === "string") {
                this.icon = <Image src={this.icon} height={40}/>;
            }
            return (
                <div className="imageDialogion" style={{marginLeft: "10px", marginRight: "10px"}}> {this.icon}</div>);
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

    render() {

        return (


            <Modal ref={this.myRef}
                   size={this.modalAtr.size} as="section"
                   fullscreen={this.modalAtr.fullscree}
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

                <Modal.Header closeButton className="headerDialogion">
                    {this.renderIcon()}
                    <Modal.Title>{this.state.head}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {this.checkBody(this.state.body)}
                </Modal.Body>
                <Modal.Footer className="footerDialogion">
                    {
                        this.state.buttons.map((b, i) => {
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
    ok;
    modeId;
    button;
    formData;

    constructor({ok = false, modeId = -1, button = undefined, formData = undefined}) {
        this.ok = ok;
        this.modeId = modeId;
        this.button = button;
        this.formData = formData;
    }
}





