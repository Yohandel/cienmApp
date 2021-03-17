import {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonImg,
    IonBackButton,
    IonButtons,
    IonSelect,
    IonSelectOption,
    IonLabel,
    IonText,
    IonCol,
    IonRow,
    IonButton,
    IonItem
} from '@ionic/react';
import { add, arrowBack, documentOutline } from 'ionicons/icons';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Header from '../components/Header/Header';
import { useAuth } from '../context/AuthContext'
import './Movie.css';
import { db } from '../firebase'
import { useHistory } from 'react-router-dom'
import { Toast } from '../components/Alerts/Toast'

const Invoice: React.FC = () => {
    ///ESTADOS

    const [invoice, setInvoice]: any = useState()

    const [show, setShow] = useState(false)
    const [message, setMessage] = useState('')
    //CONSTANTES
    const history = useHistory()
    const { id }: any = useParams()

    useEffect((): any => {

           const data =  db.collection("invoices").doc(`${id}`).get().then(invoice => {
                if (invoice.exists) {
                    setInvoice(invoice.data())
                }
            })
   
        return (data)
    }, [])

    const addInvoice = async (e: any) => {
        e.preventDefault()
        setMessage('No es posible en estos momentos')
        setShow(true)
    }


    return (
        <IonPage>
            <Header>
                <IonButtons slot="start">
                    <IonBackButton
                        className="backButton fw-bold"
                        icon={arrowBack}
                        defaultHref="/" />
                </IonButtons>
            </Header>
            <Toast show={show} close={() => setShow(false)} message={message} />
            <IonContent >
                <div className="movieContainer">
                    <div className="movieImage" style={{ backgroundImage: "url(/assets/images/hipertextual-ver-avengers-endgame-4k-2019810743.jpeg)" }}>
                        <div className="bg">

                            <div className="text m-3">
                                <h1 className='fs-1 text-start'>{invoice && invoice.movie}</h1>
                                <h4 className="text-start">{invoice && invoice.hour}</h4>
                            </div>
                        </div>
                    </div>
                    <form onSubmit={addInvoice}>

                        <div className="details">
                            <h4 className="detailText">Detalles de la orden:</h4>
                            <IonRow style={{ marginBottom: "-15px" }}>
                                <IonCol size="8"><p className="item" >Ticket(s): </p></IonCol>
                                <IonCol><p className="prize">{invoice && invoice.ticketsAmount}</p></IonCol>
                            </IonRow>
                            {invoice && invoice.snacks.map((snack:any)=>(
                                <IonRow key={snack.id}  style={{ marginBottom: "-15px" }}>
                                     <IonCol size="8"><p className="item" >Snack: </p></IonCol>
                                    <IonCol><p className="prize" >{`${snack.amount} ${snack.snack}`}</p></IonCol>
                                </IonRow>
                            ))}
                         
                        </div>


                        <div className="totalContainer text-center">
                            <h1 className="total">$ {invoice && invoice.total} DOP.</h1>
                        </div>
                        <IonButton className="orderButton" size="default" type="submit">Cancelar ticket</IonButton>

                    </form>
                </div>
            </IonContent>
        </IonPage>
    );
};

export default Invoice;
