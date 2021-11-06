import {DialogData, DialogButton} from "./DialogData";
import React from "react";
import PromptBody from "./PromptBody";
import {WrapperModal} from "./DialogIon";

export async function DialogModalAsync({head, body, icon, listButton = [], size, fullscreen, centered, animation, dialogClassName, contentClassName, scrollable}) {
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

export async function DialogAlert({head, body, icon}) {
    const s = [new DialogButton("Close", -1, "primary", true)]
    return DialogModalAsync({head: head, body: body, listButton: s, icon: icon})
}

export async function DialogPrompt({head, body, icon, valueForPrompt}) {
    const s = [new DialogButton("Close", -1, "primary", true), new DialogButton("Ok", 1, "primary")]
    const p = {label: body, value: valueForPrompt}
    const _body = <PromptBody data={p}/>
    return DialogModalAsync({head: head, body: _body, listButton: s, icon: icon})
}

export async function DialogConfirm({head, body, icon}) {
    const s = [new DialogButton("Close", -1, "primary", true), new DialogButton("Ok", 1, "primary")]
    return DialogModalAsync({head: head, body: body, listButton: s, icon: icon})
}
