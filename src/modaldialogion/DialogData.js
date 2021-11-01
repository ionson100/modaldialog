/**
 * данные для показа диалогового окна.
 */
export default class DialogData{


    /**
     *
     * @param head строка или компонент для заголовка окна
     * @param body строка или компонент для тела окна
     * @param icon строка или компонент для иконки заголовка окна
     */
    constructor(head,body,icon=undefined) {
        this._head = head;
        this._body = body;
        this._icon = icon;
        /*
        списог кнопок для диалога {DialogButton} отображение слева на право
         */
        this._buttons=[];
        this.ref=undefined;
    }

    /**
     * Добавление кнопки
     * @param button {DialogButton}
     * @returns {DialogData}
     */
    pushButton(button){
        this._buttons.push(button);
        return this;
    }
    /*
    Количество кнопок в списке для диалога
     */
    get countButton(){
        return this._buttons.length;
    }
}

/**
 * кнопка диалога
 */
 export class DialogButton{

    /**
     *
     * @param name текст в копке
     * @param modeId {number} идентификатор кнопки, для кнопки ок: = 1;
     * @param variant {string} стиль кнопки : https://react-bootstrap.github.io/components/buttons/
     */
    constructor(name,modeId=1,variant="primary") {
        this.name = name;
        this.variant = variant;
        this.modeId = modeId;
    }
}