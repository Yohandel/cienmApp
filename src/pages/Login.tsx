import { IonContent, IonPage, IonButton, IonIcon, IonLabel, IonInput, IonItem } from '@ionic/react';
import { star } from 'ionicons/icons';
import { useAuth } from '../context/AuthContext'
import React, { useState } from 'react';
import {Link, useHistory} from 'react-router-dom'
import './Login.css';
import Alert from '../components/Alerts/Alert';

const Login: React.FC = () => {
    const { logIn } = useAuth()
    const [emailRef, setEmailRef] = useState("")
    const [passwordRef, setpasswordRef] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const [show, setShow] = useState(false)
    const history = useHistory();

    async function handleSubmit(e: any) {
        e.preventDefault()
        try {
            setLoading(true)
            setError('')
            await logIn(emailRef, passwordRef)
            setEmailRef("")
            setpasswordRef("")
            history.push('/')
        } catch (error) {
            setError(`No se pudo acceder a la cuenta ${error}`)
            setShow(true)
        }
        setLoading(false)
    }

    return (
        <IonPage>
            <IonContent>
                <Alert
                    show={show}
                    close={() => setShow(false)}
                    cssClass="alertLogin"
                    header='Error'
                    message={error}
                />
                <div className="loginContainer">
                    <div className="loginImage">
                        <img src="/assets/images/029-cinema.png" alt="" height="100" />
                    </div>
                    <h2 className="text-center">CinemApp</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form">
                            <IonItem className="loginForm">
                                <IonLabel position="floating" className="inputLabel" color="danger">Correo electronico</IonLabel>
                                <IonInput autocomplete="off" type="text" placeholder="email" value={emailRef} onIonChange={(e: any) => setEmailRef(e.detail.value)} ></IonInput>
                            </IonItem>
                            <IonItem className="loginForm">
                                <IonLabel className="inputLabel" position="floating" color="danger">Contraseña</IonLabel>
                                <IonInput autocomplete="off" type="password" placeholder="contraseña" value={passwordRef} onIonChange={(e: any) => setpasswordRef(e.detail.value)} ></IonInput>
                            </IonItem>
                        </div>
                        <p className="text-center mt-5">
                            <Link to="/reset-password">¿Olvidaste tu contraseña?</Link>
                        </p>
                        <IonButton disabled={loading} type="submit" className="loginButton" size="default">Iniciar sesión</IonButton>
                        <p className="text-center registLink">
                            <Link to="/signup">¿No tienes cuenta? regístrate</Link>
                        </p>
                    </form>
                </div>
            </IonContent>
        </IonPage>
    );
};

export default Login;
