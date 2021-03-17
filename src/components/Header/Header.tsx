import { IonButton, IonButtons, IonHeader, IonIcon, IonTitle, IonToolbar } from '@ionic/react'
import React, { useState } from 'react'
import { useAuth } from '../../context/AuthContext';
import { logOutOutline, logInOutline } from 'ionicons/icons';
import { useHistory } from 'react-router-dom'
import Alert from '../Alerts/Alert';

function Header({ children }: any) {

    const { currentUser, logOut } = useAuth();
    const [error, setError] = useState('');
    const history = useHistory()
    const [show, setShow] = useState(false)

    async function handleLogOut() {

        setError('');

        try {
            await logOut();
            history.push("/")
        } catch (error) {
            setError(`No se pudo cerrar sesion ${error}`);
            setShow(true);
        }
    }
    return (
        <IonHeader>
            <Alert
                show={show}
                close={() => setShow(false)}
                cssClass="alertLogOut"
                header='Error'
                message={error}
            />
            <IonToolbar>
                {children}
                <IonTitle>
                    {currentUser ? currentUser.email:"Bienvenido"}
                </IonTitle>
                <IonButtons slot="primary">
                    {currentUser?
                    <IonButton onClick={handleLogOut}><IonIcon size="large" color="danger" icon={logOutOutline} /></IonButton>
                    :
                    <IonButton href="/login" onClick={handleLogOut}><IonIcon size="large" color="danger" icon={logInOutline} /></IonButton>
                    }
                </IonButtons>
            </IonToolbar>
        </IonHeader>
    );
}

export default Header
