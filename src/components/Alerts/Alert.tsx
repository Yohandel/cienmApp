import { IonAlert } from '@ionic/react'
import React from 'react'

const Alert = (props:any) => {
    return (
        <IonAlert
        isOpen={props.show}
        onDidDismiss={props.close}
        cssClass={props.cssClass}
        header={props.header}
        subHeader={props.subHEader}
        message={props.message}
        buttons={['OK']}
        backdropDismiss
        animated
        keyboardClose
      />
    )
}

export default Alert
