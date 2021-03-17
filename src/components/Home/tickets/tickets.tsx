import { IonButton, IonCol, IonRow } from '@ionic/react'
import React, { useEffect, useState } from 'react'
import './tickets.css'
import { db } from '../../../firebase'
import { Link, useHistory } from 'react-router-dom'

const Tickets = () => {
    const [tickets, setTickets]:any = useState([])
    const history = useHistory()
    

    useEffect(():any => {
        const fetchTickets = async () => {
        const data = await db.collection('tickets').get();
        setTickets(data.docs.map(doc=> ({...doc.data(), id: doc.id})))
        }
        return fetchTickets()
        
    }, [])

    return (
        <div className="ticketsContainer">
            {tickets.length !== 0 && tickets.map((ticket:any)=>(
                <div className="ticket" key={ticket.id} onClick={()=>{
                    history.push(`movie/${ticket.id}`);
                    history.go(0)
                    }}>
                <IonRow className="row">
                    <IonCol size="3"> <img src="assets/images/003-tickets.png" alt="" /></IonCol>
                    <IonCol>
                        <p className="movieTitle fs-3">{ticket.movieName}</p>
                        <p className="movieTitle fs-5 ">{`${ticket.timeStart} - ${ticket.timeEnd}`}</p>
                    </IonCol>
                </IonRow>

            </div>
            ))}
        </div>
    )
}

export default Tickets
