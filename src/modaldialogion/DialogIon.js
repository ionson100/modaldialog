import React, {Component} from "react";

import {Button, Image} from "react-bootstrap";
import Modal from 'react-bootstrap/Modal'
import * as ReactDOM from "react-dom";
import DialogData, {DialogButton} from "./DialogData";
import "./styleDialog.css"
import PromptBody from "./PromptBody"



/**
 * обертка компонента модального окна, требуется точка монтирования
 */
 export default class WrapperModal{
     myRef= React.createRef();
    static InstanceModal
    /**
     * ctor
     * ( другие данные в DOM в этой точке могут исчезнуть)
     */
    constructor() {

        WrapperModal.InstanceModal=this;
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
     getModalAttributes(o){
       return {
            size:o.size,
            fullscree:o.fullscree??false,
            centered:o.centered??false,
            animation:o.animation??true,
            dialogClassName:o.dialogClassName,
            contentClassName:o.contentClassName,
            scrollable:o.scrollable??true
        }
     }

     /**
      * Асинхронный вызов базового, данные диалога:dialogData ( стили кнопки готовим сами), условие: у кнопки ок modeId=1 у кнопки close modeId=-1
      * @param dialogData данные кнопки
      * @param size {'sm'| 'lg'|'xl'} Визуализируйте модальное окно большого, очень большого или маленького размера.
      * Если не указан, модальное окно отображается со средним (по умолчанию) размером.
      * @param fullscree Отображает полноэкранное модальное окно. При указании точки останова модальное окно будет
      * отображаться в полноэкранном режиме ниже размера точки останова.
      * @param centered {boolean} вертикально центрируйте диалог в окне
      * @param animation {boolean} использование анимации при открытии окна
      * @param dialogClassName {string} Класс css для применения к узлу DOM модального диалога.
      * @param contentClassName {string} необязательное имя дополнительного класса в .modal-content
      * @param scrollable {boolean} возможность прокрутки содержимого окна
      * @returns {Q.Promise<*>}
      *  resolve {MyResolve}
      *  ok: true - ok  select, false- cancel  or close
      *  modeId: modeId  нажатой кнопки ( close= -1)
      *  button: нажатая кнопка ( close is null)
      *  formData: только для пользовательского контента тела,
      *  reject {Error}
      */
    async DialogSimpleCore({dialogData,size,fullscree,centered,animation,dialogClassName,contentClassName,scrollable}) {
        dialogData.modalAtr=this.getModalAttributes(arguments[0])
        this.extracted(dialogData);
        const modal = this.myRef.current;
        return  await modal.show("simple");
    }

     /**
      * Асинхронный упрощенный вызов алерта, объект DialogData создается по умолчанию
      * @param head текст или компонент для заголовка окана
      * @param body текст или компонент для тела окна
      * @param icon текст или компонент для иконки заголовка окна
      * @param size {'sm'| 'lg'|'xl'} Визуализируйте модальное окно большого, очень большого или маленького размера.
      * Если не указан, модальное окно отображается со средним (по умолчанию) размером.
      * @param fullscree Отображает полноэкранное модальное окно. При указании точки останова модальное окно будет
      * отображаться в полноэкранном режиме ниже размера точки останова.
      * @param centered {boolean} вертикально центрируйте диалог в окне
      * @param animation {boolean} использование анимации при открытии окна
      * @param dialogClassName {string} Класс css для применения к узлу DOM модального диалога.
      * @param contentClassName {string} необязательное имя дополнительного класса в .modal-content
      * @param scrollable {boolean} возможность прокрутки содержимого окна
      * @returns {Q.Promise<*>}
      *  resolve {MyResolve}
      *  ok: true - ok  select, false- cancel  or close
      *  modeId: modeId  нажатой кнопки ( close= -1)
      *  button: нажатая кнопка ( close is null)
      *  formData: только для пользовательского контента тела,
      *  reject {Error}
      */
     async DialogAlert({head,body,icon,size,fullscreen,centered,animation,dialogClassName,contentClassName,scrollable}) {



         const props=new DialogData(head,body,icon)
         props.pushButton(new DialogButton("Close"));
         props.modalAtr=this.getModalAttributes(arguments[0])
         this.extracted(props);
         const modal = this.myRef.current;
         return  await modal.show("simple");
     }

     /**
      * Асинхронный упрощенный вызов диалога соглашения, объект DialogData создается по умолчанию
      * @param head текст или компонент для заголовка окна
      * @param body текст или компонент для тела окна
      * @param icon текст или компонент для иконки заголовка окна
      * @param size {'sm'| 'lg'|'xl'} Визуализируйте модальное окно большого, очень большого или маленького размера.
      * Если не указан, модальное окно отображается со средним (по умолчанию) размером.
      * @param fullscree Отображает полноэкранное модальное окно. При указании точки останова модальное окно будет
      * отображаться в полноэкранном режиме ниже размера точки останова.
      * @param centered {boolean} вертикально центрируйте диалог в окне
      * @param animation {boolean} использование анимации при открытии окна
      * @param dialogClassName {string} Класс css для применения к узлу DOM модального диалога.
      * @param contentClassName {string} необязательное имя дополнительного класса в .modal-content
      * @param scrollable {boolean} возможность прокрутки содержимого окна
      * @returns {Q.Promise<*>}
      *  resolve {MyResolve}
      *  ok: true - ok  select, false- cancel  or close
      *  modeId: modeId  нажатой кнопки ( close= -1)
      *  button: нажатая кнопка ( close is null)
      *  formData: только для пользовательского контента тела,
      *  reject {Error}
      */

     async DialogConfirm({head,body,icon,size,fullscreen,centered,animation,dialogClassName,contentClassName,scrollable}) {

         const props=new DialogData(head,body)
         props.pushButton(new DialogButton("Ok")).pushButton(new DialogButton("Cancel",-1,"secondary"));
         props.modalAtr=this.getModalAttributes(arguments[0])
         this.extracted(props);
         const modal = this.myRef.current;
         return await modal.show("simple");
     }


     /**
      * Асинхронный вызов диалога c пользовательским контентом, данные диалога:dialogData ( стили кнопки готовим сами), условие: у кнопки ок modeId=1
      * показ кнопок происходит с лево на право с начала списка кнопок.
      * Объект пользовательского контента должен реализовывать два метода:
      * 1 validate(modeId) метод возвращает булевое значения результата валидации пользовательских данных
      * 2 getData(modeId) возвращает объект состояния пользовательских данных
      * параметр modeId - modeId нажатой кнопки
      * Все методы должны быть пропатчены контекстом в конструкторе  через .bind(this) ( this.validate.bind(this) this.getData.bind(this))
      * Сам объект должен быть зарегистрирован через global.refform=this; в конструкторе пользовательского компонета формы или через рендеринг.
      * @param dialogData данные кнопки
      * @param size {'sm'| 'lg'|'xl'} Визуализируйте модальное окно большого, очень большого или маленького размера.
      * Если не указан, модальное окно отображается со средним (по умолчанию) размером.
      * @param fullscree Отображает полноэкранное модальное окно. При указании точки останова модальное окно будет
      * отображаться в полноэкранном режиме ниже размера точки останова.
      * @param centered {boolean} вертикально центрируйте диалог в окне
      * @param animation {boolean} использование анимации при открытии окна
      * @param dialogClassName {string} Класс css для применения к узлу DOM модального диалога.
      * @param contentClassName {string} необязательное имя дополнительного класса в .modal-content
      * @param scrollable {boolean} возможность прокрутки содержимого окна
      * @returns {Q.Promise<*>}
      *  resolve {MyResolve}
      *  ok: true - ok  select, false- cancel  or close
      *  modeId: modeId  нажатой кнопки ( close= -1)
      *  button: нажатая кнопка ( close is null)
      *  formData: только для пользовательского контента тела,
      *  reject {Error}
      */
     async DialogForm({dialogData,size,fullscreen,centered,animation,dialogClassName,contentClassName,scrollable}) {
         dialogData.modalAtr=this.getModalAttributes(arguments[0])
         this.extracted(dialogData);
         const modal = this.myRef.current;
         return  await modal.show("form");

     }

    async DialogPrompt({head,body,icon,size,fullscreen,centered,animation,dialogClassName,contentClassName,scrollable,valueForPrompt}) {

         const p={label:body,value:valueForPrompt}
        const props=new DialogData(head,<PromptBody data={p}/>,icon)
        props.pushButton(new DialogButton("Ok")).pushButton(new DialogButton("Cancel",-1,"secondary"));
        props.modalAtr=this.getModalAttributes(arguments[0])
        this.extracted(props);
        const modal = this.myRef.current;
        return await modal.show("form");
    }


 }


 export const DialogContext = React.createContext();
/*
 Компонент асинхронного вызова диалога
 */
class DialogIon extends Component{



     constructor(props) {
         super(props);
         this.state={
             head:props.dialogData?._head??"no date",
             body:props.dialogData?._body??"no date",
             buttons:props.dialogData?._buttons??[],
             isShow:false//props.dialogData?._isShow??true,



         }
         this.self=this;
         this.modalAtr=props.dialogData.modalAtr;// атрибуты для модального диалога
         this.refForm=undefined;
         this.myRef= React.createRef();
         this.buttonModeAction=undefined;// копка которую нажали, закрытие по кресту odeId=-1
         this.promiseInfo = {};
         this.dialogType="none";
         this.icon=props.dialogData?._icon??null;
         this.innerValidate=undefined
         this.innerGetData=undefined;




     }
     Assa(){
         alert(33)
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
                     resolve(new MyResolve({button:this.buttonModeAction}))
                     this.setState({isShow:false})

                     break
                 }

                 case "simple":{
                     const ss=this.buttonModeAction?.modeId??-1;
                     const ok=ss!==-1;
                     resolve(new MyResolve({ok:ok,modeId:ss,button:this.buttonModeAction}))
                     this.setState({isShow:false})
                     break
                 }


                 case "form":{

                     const ss=this.buttonModeAction?.modeId??-1;
                     if(ss!==-1){
                         if(this.innerValidate()===true){  //todo внимание тут магия вызова снаружи
                             const res=this.innerGetData(ss);//todo внимание тут магия вызова снаружи
                             const ok=ss!==-1;
                             resolve(new MyResolve({ok:ok,modeId:ss,button:this.buttonModeAction,formData:res}))
                             this.setState({isShow:false})
                         }
                     }else{
                         const ok=ss!==-1;
                         resolve(new MyResolve({ok:ok,modeId:ss,button:this.buttonModeAction}))
                         this.setState({isShow:false})
                     }
                     break
                 }
                 default:{

                     const msg=`Не могу обработать тип диалога: ${this.dialogType} type {simple,form,}`
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



     checkBody(b){
             return b;
     }
     renderIcon(){
         if(this.icon){
             if(typeof this.icon==="string"){
                 this.icon= <Image src={this.icon} height={40}   />;
             }
             return (<div className="imageDialogion" style={{marginLeft:"10px",marginRight:"10px"}} > {this.icon}</div>);
         }
     }

     render() {

         return(


             <DialogContext.Provider value={{validate:(v)=>{this.innerValidate=v},getdata:(v)=>{this.innerGetData=v}}}>
             <Modal ref={this.myRef}
                    size={this.modalAtr.size} as="section"
                    fullscreen={this.modalAtr.fullscree}
                    centered={this.modalAtr.centered}
                    animation={this.modalAtr.animation}
                    dialogClassName={this.modalAtr.dialogClassName}
                    contentClassName={this.modalAtr.contentClassName}
                    scrollable={this.modalAtr.scrollable}

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
                 <Modal.Body  >


                     {this.checkBody(this.state.body)}
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
             </DialogContext.Provider>
         );
     }

 }

export class MyResolve{
     ok;
     modeId;
     button;
     formData;
    constructor({ok=false,modeId=-1,button=undefined,formData=undefined}) {
        this.ok = ok;
        this.modeId = modeId;
        this.button = button;
        this.formData=formData;
    }
 }


