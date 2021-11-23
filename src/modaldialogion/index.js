"use strict";
import {DialogData, DialogButton} from "./DialogData";
import React from "react";
import PromptBody from "./PromptBody";
import {WrapperModal} from "./DialogIon";
import 'bootstrap/dist/css/bootstrap.min.css';

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
/* eslint-disable */
export async function DialogModalAsync({head, body, icon, listButton = [], size,
                                           fullscreen, centered, animation, dialogClassName, contentClassName,
                                           scrollable,dialogAs,backdrop,keyboard}) {
    const wrap = new WrapperModal();
    const props = new DialogData(head, body, icon)
    listButton.map((b) => {
        props.pushButton(b)
        return false
    })
    let type = "simple";
    if (React.isValidElement(body)) {
        type = "form"
    }

    props.modalAtr = wrap.getModalAttributes(arguments[0])
    wrap.extracted(props);
    const modal = wrap.myRef.current;
    return await modal.show(type);
}
/* eslint-enable */

/**
 * Вызов окна предупреждения
 * @param head заголовок окна строка или React Component
 * @param body тело сообщения строка или React Component
 * @param icon иконка для файла диалога, строка или React Component
 * @returns {Promise<*>}
 * @constructor
 */
/* eslint-disable */
export async function DialogAlert({head, body, icon}) {
    const s = [new DialogButton("Close", -1, "primary", true)]
    return DialogModalAsync({head: head, body: body, listButton: s, icon: icon})
}
/* eslint-enable */

/**
 * Вызов диалога с полем ввода
 * @param head head заголовок, строка или React Component
 * @param body лейбл для поля ввода
 * @param icon иконка для файла диалога, строка или React Component
 * @param valueForPrompt значение по умолчанию для поля ввода
 * @returns {Promise<*>}
 * @constructor
 */
export async function DialogPrompt({head, body, icon, valueForPrompt}) {
    const s = [new DialogButton("Close", -1, "primary", true), new DialogButton("Ok", 1, "primary")]
    const p = {label: body, value: valueForPrompt}
    const _body = <PromptBody data={p}/>
    return DialogModalAsync({head: head, body: _body, listButton: s, icon: icon})
}

/**
 * Вызов диалога соглашения
 * @param head заголовок, строка или React Component
 * @param body тело диалога строка или React Component ( тело должно наследовать класс BaseDialog ( переопределит validate и getData )
 * @param icon иконка для файла диалога, строка или React Component
 * @returns {Promise<*>}
 * @constructor
 */
export async function DialogConfirm({head, body, icon}) {
    const s = [new DialogButton("Close", -1, "primary", true), new DialogButton("Ok", 1, "primary")]
    return DialogModalAsync({head: head, body: body, listButton: s, icon: icon})
}
