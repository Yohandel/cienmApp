import { IonButton, IonCol, IonIcon, IonItem, IonLabel, IonRow, IonSelect, IonSelectOption } from '@ionic/react'
import React, { useEffect, useState } from 'react'
import { add, trash } from 'ionicons/icons'
import './menu.css'
import { db } from '../../../../firebase'
import {Toast} from '../../../Alerts/Toast'

export const Menu = (props: any) => {

    const [bocadillo, setBocadillo] = useState("")
    const [amountBocadillo, setAmountBocadillo] = useState("")
    const [beverages, setBeverages] = useState("")
    const [amountBeverages, setAmountBeverages] = useState("")
    const [snacks, setSnacks]: any = useState()
    const [show, setShow] = useState(false)
    const [message, setMessage] = useState('')

    const addSnack = async (e: any) => {
        e.preventDefault()
        const data = {
            snack: bocadillo || beverages,
            amount: amountBocadillo || amountBeverages
        }
        await db.collection('snacks').doc().set(data).then((e) => {
            setBocadillo("")
            setAmountBocadillo("")
            setBeverages("")
            setAmountBeverages("")
        }).catch((error) => {
            console.log(error)
        })
    }



    useEffect((): any => {
        const fetchSnacks = async () => {

            db.collection('snacks').onSnapshot((query) => {
                let data: any = []
                query.forEach(doc => {
                    data.push(({ ...doc.data(), id: doc.id }))
                });
                setSnacks(data)
                setMessage('Ahora agrega una pelicula')
            })

        }
        return fetchSnacks()
    }, [])

    return (
        <div style={{ padding: "0px 10px" }}>
            {
                props.snackType === 'bocadillos' ?
                    ///BOCADILLOS
                    <form onSubmit={addSnack}>

                        <IonRow >
                            <IonCol size="5">
                                <IonItem>
                                    <IonSelect interface="action-sheet" name="selectFood" value={bocadillo} onIonChange={(e) => setBocadillo(e.detail.value)}>
                                        <IonSelectOption value="Hotdog">Hotdog</IonSelectOption>
                                        <IonSelectOption value="Pop corn">Pop corn</IonSelectOption>
                                        <IonSelectOption value="Nachos">Nachos</IonSelectOption>
                                    </IonSelect>
                                </IonItem>
                            </IonCol>
                            <IonCol size="4">
                                <IonItem>
                                    <IonLabel>#</IonLabel>
                                    <IonSelect interface="action-sheet" name="selectFoodCant" value={amountBocadillo} onIonChange={(e) => setAmountBocadillo(e.detail.value)}>
                                        <IonSelectOption value="1">1</IonSelectOption>
                                        <IonSelectOption value="2">2</IonSelectOption>
                                        <IonSelectOption value="3">3</IonSelectOption>
                                    </IonSelect>
                                </IonItem>
                            </IonCol>
                            <IonCol size="3">
                                <IonButton className="menuButton" color="danger" type="submit">
                                    <IonIcon icon={add}></IonIcon>
                                </IonButton>
                            </IonCol>
                        </IonRow>
                    </form>

                    :
                    ///BEBIDAS
                    <form onSubmit={addSnack}>
                        <IonRow style={{ padding: "0px 10px" }}>
                            <IonCol size="5">
                                <IonItem>
                                    <IonSelect interface="action-sheet" name="selectBeverages" value={beverages} onIonChange={(e) => setBeverages(e.detail.value)}>
                                        <IonSelectOption value="Ice tea">Ice tea</IonSelectOption>
                                        <IonSelectOption value="Refresco">Refresco</IonSelectOption>
                                        <IonSelectOption value="Agua">Agua</IonSelectOption>
                                    </IonSelect>
                                </IonItem>
                            </IonCol>
                            <IonCol size="4">
                                <IonItem>
                                    <IonLabel>#</IonLabel>
                                    <IonSelect interface="action-sheet" name="selectBeveragesCant" value={amountBeverages} onIonChange={(e) => setAmountBeverages(e.detail.value)}>
                                        <IonSelectOption value="1">1</IonSelectOption>
                                        <IonSelectOption value="2">2</IonSelectOption>
                                        <IonSelectOption value="3">3</IonSelectOption>
                                    </IonSelect>
                                </IonItem>
                            </IonCol>
                            <IonCol size="3">
                                <IonButton className="menuButton" color="danger" type="submit">
                                    <IonIcon icon={add}></IonIcon>
                                </IonButton>
                            </IonCol>
                        </IonRow>
                    </form>

            }
            <div className="selectedFood">


                    {snacks && snacks.map((snack: any) => (
                        <IonRow key={snack.id}>
                            <IonCol size="3"> <img src="assets/images/003-tickets.png" alt="" /></IonCol>
                            <IonCol>
                                <p className="movieTitle fs-3" >{`${snack.amount} ${snack.snack}`} </p>
                            </IonCol>
                            <IonCol size="3">
                                <IonButton className="menuButton" color="danger">
                                    <IonIcon icon={trash}></IonIcon>
                                </IonButton>
                            </IonCol>
                        </IonRow>
                    ))}
            </div>
            <IonButton className="confirmOrderMenu" color="danger" onClick={()=>setShow(true)} >
                Agregar orden
            </IonButton>
            <Toast
            show={show}
            close={()=>setShow(false)}
            message={message}
            />

        </div>

    )
}
