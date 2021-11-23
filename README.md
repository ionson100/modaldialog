# Асинхронный модальный диалог

Обертки для быстрого вызова
```javascript
/**
 * Вызов окна предупреждения
 * @param head заголовок окна строка или React Component
 * @param body тело сообщения строка или React Component
 * @param icon иконка для файла диалога, строка или React Component
 * @returns {Promise<*>}
 * @constructor
 */
export async function DialogAlert({head, body, icon}){}
```
```javascript
/**
 * Вызов диалога с полем ввода
 * @param head head заголовок, строка или React Component
 * @param body лейбл для поля ввода
 * @param icon иконка для файла диалога, строка или React Component
 * @param valueForPrompt значение по умолчанию для поля ввода
 * @returns {Promise<*>}
 * @constructor
 */
export async function DialogPrompt({head, body, icon, valueForPrompt}){}
```
```javascript

/**
 * Вызов диалога соглашения
 * @param head заголовок, строка или React Component
 * @param body тело диалога строка или React Component ( тело должно наследовать класс BaseDialog ( переопределит validate и getData )
 * @param icon иконка для файла диалога, строка или React Component
 * @returns {Promise<*>}
 * @constructor
 */
export async function DialogConfirm({head, body, icon}){}
```
вызов полного конструктора
```javascript
/**
 *  Вызов модального диалога в режиме полного конструктора
 *  параметры соответствия : https://react-bootstrap.github.io/components/modal/
 * @param head head заголовок, строка или React Component
 * @param body лейбл для поля ввода
 * @param icon иконка для файла диалога, строка или React Component
 * @param listButton массив кнопок
 * @param size
 * @param fullscreen
 * @param centered
 * @param animation
 * @param dialogClassName
 * @param contentClassName
 * @param scrollable
 * @param dialogAs
 * @param backdrop
 * @param keyboard
 * @returns {Promise<*>}
 * @constructor
 */
export async function DialogModalAsync({head, body, icon, listButton = [], size,
                                           fullscreen, centered, animation, dialogClassName, contentClassName,
                                           scrollable,dialogAs,backdrop,keyboard}){}
```
что нужно учесть,
Параметр head: может быть строкой или JSX React Component

Параметр body: может быть строкой или JSX React Component
если это компонент , он должен быть классовым и наследоваться от BaseDialog
он должен по желанию переопределять 2 метода validate и getDate
validate проверяет корректность виденных данных, по умолчанию `true`;
а getData возвращает объект формы, по умочанию : `{body:"none"}`
массив кнопок задается объектами
```javascript
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
     */
    constructor(name,modeId=1,variant="primary",isFocus=false) {
        this.name = name;
        this.variant = variant;
        this.modeId = modeId;
        this.isFocus=isFocus;
    }
}
```


промизе возврашает в случае успеха объект
```javascript
class MyResolve {
    ok;
    modeId;
    button;
    formData;

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
```
установка:
```
npm install https://github.com/ionson100/modaldialog.git

```
использование:
```
import {DialogAlert, DialogPrompt} from "modaldialogion";
import "modaldialogion/dist/styleDialog.css"

const b=document.getElementById("bt1")
b.onclick=function (){
    DialogAlert({
        head: "Simple alert Dialog",
        body: "Alert!!"
    }).then(value => {
        console.log(value)
    }).catch(reason => {
        console.log(reason)
    })
}
```
требует окончания
