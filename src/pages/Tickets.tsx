import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonImg, IonCol, IonRow } from '@ionic/react';
import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router';
import Header from '../components/Header/Header';
import TicketsList from '../components/Home/tickets/tickets'
import { useAuth } from '../context/AuthContext'
import { db } from '../firebase'
import './Tickets.css';

const Tickets: React.FC = () => {
  const { currentUser } = useAuth()
  const [tickets, setTickets]: any = useState([])
  const history = useHistory()


  useEffect((): any => {
    const fetchTickets = async () => {
      const data = await db.collection('invoices').get();
      setTickets(data.docs.map(doc => ({...doc.data(), id: doc.id})))
    }
    return fetchTickets()

  }, [])
  return (
    <IonPage>
      <Header />
      {currentUser &&
        <IonContent>
          {tickets.length !== 0 && tickets.map((ticket: any) => (
            <div className="ticketsContainer"  key={ticket.id} onClick={()=>{
              history.push(`/invoice/${ticket.id}`)
              history.go(0)
              }}>
                { currentUser.email === ticket.client &&
                  <div className="ticket">
                  <IonRow className="row">
                    <IonCol size="3"> <img src="assets/images/003-tickets.png" alt="" /></IonCol>
                    <IonCol>
                      <p className="movieTitle fs-3">{ticket.movie}</p>
                      <p className="movieTitle fs-5 ">{`${ticket.hour}`}</p>
                    </IonCol>
                  </IonRow>
                   </div>}
            </div>
          ))}
        </IonContent>
      }
    </IonPage>
  );
};

export default Tickets;
