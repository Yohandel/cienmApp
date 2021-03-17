import { IonButton, IonButtons, IonFab, IonFabButton, IonIcon, IonToolbar } from '@ionic/react'
import React, { useState } from 'react'
import { add } from 'ionicons/icons';
import './food.css'
import { Modal } from '../../Modal/Modal'
import {Menu} from './menu/menu'

const Food = (props: any) => {

    const [show, setShow] = useState(false)
    const [snackType, setSnackType] = useState("")

    return (
        <ul className="containerFood">
            <li><div className="listFood" style={{ backgroundImage: "url(/assets/images/eiliv-sonas-aceron-iyqj9IKpQK0-unsplash.jpg)" }}>
                <div className="bgFood" >
                    <IonFab className="btnContainer" edge slot="fixed" onClick={() => {
                        setShow(true) 
                        setSnackType("bebidas")
                        }}>
                        <IonFabButton className="addButton" color='danger'>
                            <IonIcon icon={add} />
                        </IonFabButton>
                    </IonFab>
                    <h1>Bebidas</h1>
                </div>
            </div></li>
            <li> <div className="listFood" style={{ backgroundImage: "url(/assets/images/charles-deluvio-PvAAYZx-yf8-unsplash.jpg)" }}>
                <div className="bgFood" >
                <IonFab className="btnContainer" edge slot="fixed" onClick={() => {
                        setShow(true) 
                        setSnackType("bocadillos")
                        }}>
                        <IonFabButton className="addButton" color='danger'>
                            <IonIcon icon={add} />
                        </IonFabButton>
                    </IonFab>
                    <h1>Picaderas</h1>
                </div>
            </div></li>

            <Modal show={show} buttons={
                <IonButtons slot="end">
                    <IonButton onClick={() => setShow(false)} style={ {textTransform: "inherit"}}>Cerrar</IonButton>
                </IonButtons>
            }
                content={(
                    <Menu snackType={snackType}/>
                )}
            />

        </ul>
    )
}

export default Food
