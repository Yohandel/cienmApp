import { IonContent, IonPage, IonButton, IonIcon, IonLabel, IonInput, IonItem } from '@ionic/react';
import { star } from 'ionicons/icons';
import { useAuth } from '../context/AuthContext'
import React, { useState } from 'react';
import {Link, useHistory} from 'react-router-dom'
import './ForgotPassword.css';
import Alert from '../components/Alerts/Alert';
import {Toast} from '../components/Alerts/Toast'

const ForgotPassword: React.FC = () => {
    const { resetPassword } = useAuth()
    const [emailRef, setEmailRef] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const [showEr, setShowEr] = useState(false)
    const [showMess, setShowMess] = useState(false)
    const [message, setMessage] = useState("")

    async function handleSubmit(e: any) {
        e.preventDefault()

        try {
            setLoading(true)
            setError('')
            setShowMess(true)
            await resetPassword(emailRef)
            setMessage('Revisa tu email')
        } catch (error) {
            setError(`No se pudo acceder a la cuenta ${error}`)
            setShowEr(true)
            setShowMess(false)
        }
        setLoading(false)
        setEmailRef("")
    }

    return (
        <IonPage>
            <IonContent>
                <Alert
                    show={showEr}
                    close={() => setShowEr(false)}
                    cssClass="alertforgotPass"
                    header='Error'
                    message={error}
                />

                <Toast
                show={showMess}
                close={()=> setShowMess(false)}
                message={message}
                />
                <div className="forgotPassContainer">
                    <div className="forgotPassImage">
                        <img src="/assets/images/029-cinema.png" alt="" height="100" />
                    </div>
                    <h2 className="text-center">CinemApp</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form">
                            <IonItem className="forgotPassForm">
                                <IonLabel position="floating" className="inputLabel" color="danger">Correo electronico</IonLabel>
                                <IonInput autocomplete="off" type="text" placeholder="email" value={emailRef} onIonChange={(e: any) => setEmailRef(e.detail.value)} ></IonInput>
                            </IonItem>
                        </div>

                        <IonButton disabled={loading} type="submit" className="forgotPassButton" size="default">Iniciar sesión</IonButton>
                        <p className="text-center registLink">
                        <Link to="login">Log in</Link>
                        </p>
                    </form>
                </div>
            </IonContent>
        </IonPage>
    );
};

export default ForgotPassword;
