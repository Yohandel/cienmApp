import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonImg, IonBackButton, IonButtons } from '@ionic/react';
import React from 'react';
import './Movie.css';

const Movie: React.FC = () => {
    return (
        <IonPage>
            <IonContent >
                <IonHeader>
                    <IonToolbar>
                        <IonTitle>
                            <button className="btn btn-success">Something</button>
                        </IonTitle>
                    </IonToolbar>
                </IonHeader>
            </IonContent>
        </IonPage>
    );
};

export default Movie;
