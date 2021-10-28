export default class DialogData{
    BUTTON_OK=1;
    BUTTON_CANCEL=2;
    _body;
    constructor(head,body) {
        this._head = head;
        this._body = body;
        this._buttons=[];
        this._isShow=true;
        this.ref=undefined;
    }
    pushButton(button){
        this._buttons.push(button);
        return this;
    }
    get countButton(){
        return this._buttons.length;
    }
}
 export class DialogButton{

    constructor(name,modeId=1,variant="primary") {
        const BUTTON_OK=1;
        const BUTTON_CANCEL=2;
        this.name = name;
        this.variant = variant;
        this.modeId = modeId;
    }
}