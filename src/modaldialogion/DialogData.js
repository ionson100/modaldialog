export default class DialogData{
    BUTTON_OK=1;
    BUTTON_CANCEL=2;
    _body;
    constructor(head,body) {
        this._head = head;
        this._body = body;
        this._buttons=[];
        this._isShow=true;
    }
    push(button){
        this._buttons.push(button);
        return this;
    }
}
 export class DialogButton{

    constructor(name,modeId=1,type="primary") {
        const BUTTON_OK=1;
        const BUTTON_CANCEL=2;
        this._name = name;
        this._type = type;
        this._modeId = modeId;
    }
}