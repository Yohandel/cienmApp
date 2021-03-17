import { IonToast } from '@ionic/react'
import React from 'react'

export const Toast = (props:any) => {
    return (
        <IonToast
        isOpen={props.show}
        onDidDismiss={props.close}
        message={props.message}
        duration={600}
        animated
        color="success"
        cssClass={props.cssClass}
      />
    )
}
