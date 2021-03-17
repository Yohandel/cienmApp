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
import {Toast} from '../components/Alerts/Toast'

const Movie: React.FC = () => {
    ///ESTADOS
    const { currentUser } = useAuth();
    const [movie, setMovie]: any = useState()
    const [snacks, setSnacks]: any = useState();
    const [ticketsNumber, setTicketsNumber] = useState(0)
    const [show, setShow] = useState(false)
    const [message, setMessage] = useState('')
    //CONSTANTES
    const history = useHistory()
    const numbers: any = []
    const { id }: any = useParams()

    useEffect((): any => {
        const fetchData = async () => {
            await db.collection("tickets").doc(`${id}`).get().then(movie => {
                if (movie.exists) {
                    setMovie(movie.data())
                }
            })
            const data = await db.collection("snacks").get()
            setSnacks(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
        }
        return fetchData()
    }, [])

    const addInvoice = async (e: any) => {
        e.preventDefault()
        const data = {
            movie: movie && movie.movieName,
            hour: movie && `${movie.timeStart} - ${movie.timeEnd}`,
            ticketsAmount: ticketsNumber,
            total: (150 + 150) + (movie && movie.price * ticketsNumber),
            snacks: snacks,
            client: currentUser.email,
        }
        await db.collection('invoices').doc().set(data).then((e) => {
            setMessage('Su factura esta en sus tickets');
            history.push('/')
        }).catch((error) => {
            console.log(error)
        })
    }

    for (let index = 1; index <= (movie && movie.amount); index++) {
        numbers.push(<IonSelectOption key={index} value={index}>{index}</IonSelectOption>)
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
            <Toast show={show} close={()=>setShow(false)} message={message}/>
            <IonContent >
                <div className="movieContainer">
                    <div className="movieImage" style={{ backgroundImage: "url(/assets/images/hipertextual-ver-avengers-endgame-4k-2019810743.jpeg)" }}>
                        <div className="bg">

                            <div className="text m-3">
                                <h1 className='fs-1 text-start'>{movie && movie.movieName}</h1>
                                <h4 className="text-start">{movie && `${movie.timeStart} - ${movie.timeEnd}`}</h4>
                                Dias a emitir:
                                <h4 className="text-start">{movie && movie.days.map((day: any) => `${day} `)}</h4>
                            </div>
                        </div>
                    </div>
                    <form onSubmit={addInvoice}>

                        <IonItem>
                            <IonLabel position="floating">No. de tickets</IonLabel>
                            <IonSelect className="orderSelect" mode="md" interface="action-sheet" value={ticketsNumber} onIonChange={(e: any) => {
                                setTicketsNumber(e.detail.value)
                            }}>
                                {numbers}
                            </IonSelect>
                        </IonItem>
                        <div className="details">
                            <h4 className="detailText">Detalles de la orden:</h4>
                            <IonRow style={{ marginBottom: "-15px" }}>
                                <IonCol size="8"><p className="item" >Ticket(s): </p></IonCol>
                                <IonCol><p className="prize">$ {movie && movie.price * ticketsNumber}</p></IonCol>
                            </IonRow>
                            {snacks && snacks.map((snack: any) => (
                                <IonRow key={snack.id} style={{ marginBottom: "-15px" }}>
                                    <IonCol size="8"><p className="item" >{`${snack.amount} ${snack.snack}`}</p></IonCol>
                                    <IonCol><p className="prize">$ 150</p></IonCol>
                                </IonRow>
                            ))
                            }
                        </div>

                        <IonItem>
                            <IonLabel className="labelSelect" position="floating">Metodo de pago</IonLabel>
                            <IonSelect interface="action-sheet" name="selectFood">
                                <IonSelectOption value="1">Tarjeta</IonSelectOption>
                                <IonSelectOption value="2">Efectivo</IonSelectOption>
                            </IonSelect>
                        </IonItem>

                        <div className="totalContainer text-center">
                            <h1 className="total">$ {(150 + 150) + (movie && movie.price * ticketsNumber)} DOP.</h1>
                        </div>
                        {currentUser ?
                            <IonButton disabled={ticketsNumber <= 0} className="orderButton" size="default" type="submit">Realizar pago</IonButton> :
                            <IonButton className="orderButton" size="default" href="/login" >Accede para confirmar tu orden</IonButton>
                        }
                    </form>
                </div>
            </IonContent>
        </IonPage>
    );
};

export default Movie;
