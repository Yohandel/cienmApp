import { IonButton, IonButtons, IonContent, IonHeader, IonModal, IonTitle, IonToolbar } from '@ionic/react'
import React, { useState } from 'react'
import './Modal.css'

export const Modal = (props:any) => {


    return (
        <IonModal isOpen={props.show} cssClass="my-custom-modal" animated backdropDismiss={false}>

        <IonToolbar style={{padding:"15px", border:"none"}}>
          <IonTitle>
            <img src="/assets/images/008-popcorn.png" alt=""/> Agrega un bocao
          </IonTitle>
          {props.buttons}
        </IonToolbar>

        <IonContent>
        {props.content}
        </IonContent>
        
      </IonModal>
    )
}
