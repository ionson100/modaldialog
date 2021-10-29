export default class DialogData{


    constructor(head,body,icon=null) {
        this._head = head;
        this._body = body;
        this._icon = icon;
        this._buttons=[];
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
        this.name = name;
        this.variant = variant;
        this.modeId = modeId;
    }
}