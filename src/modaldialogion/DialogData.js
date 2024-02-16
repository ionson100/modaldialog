"use strict";

/**
 * данные для показа диалогового окна.
 */
 export class DialogData{


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
        список кнопок для диалога {DialogButton} отображение слева на право
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
 export  class DialogButton{


    /**
     *
     * @param name текст в копке
     * @param modeId {number} идентификатор кнопки, для кнопки отмены или закрытия : = -1;
     * @param variant {string} стиль кнопки : https://react-bootstrap.github.io/components/buttons/
     * @param isFocus первоначальный фокус кнопки
     * @param isLink вид ссылки
     * @param Icon иконка
     */
    constructor(name,modeId=1,variant="primary",isFocus=false,IsLink=false,Icon=undefined) {
        this.name = name;
        this.variant = variant;
        this.modeId = modeId;
        this.isFocus=isFocus;
        this.IsLink = IsLink;
        this.Icon=Icon;
    }
}
