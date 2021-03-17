import { IonContent, IonPage, IonButton, IonIcon, IonLabel, IonInput, IonItem } from '@ionic/react';
import { star } from 'ionicons/icons';
import React, { useRef, useState } from 'react';
import Alert from '../components/Alerts/Alert'
import './SignUp.css';
import { useAuth } from '../context/AuthContext'
import {Link, useHistory} from 'react-router-dom'

const Signup: React.FC = () => {
    const { signUp } = useAuth()
    const [emailRef, setEmailRef] = useState("")
    const [passwordRef, setpasswordRef] = useState("")
    const [name, setName] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const [show, setShow] = useState(false)
    const history = useHistory();

    async function handleSubmit(e: any) {
        e.preventDefault()
        try {
            setLoading(true)
            setError('')
            await signUp(emailRef, passwordRef)
            history.push('/login')
        } catch (error) {
            setError(`No se pudo crear la cuenta ${error}`)
            setShow(true)
        }
        setLoading(false)
        setName("")
        setEmailRef("")
        setpasswordRef("")
    }

    return (
            <IonPage>
                <IonContent>
                        <Alert
                         show = {show}
                         close ={()=> setShow(false)}
                         cssClass = "alertSign"
                         header='Error'
                         message = {error}
                         />
                    <div className="SignupContainer">
                        <form onSubmit={handleSubmit}>
                        <div className="SignupImage">
                            <img src="/assets/images/029-cinema.png" alt="" height="100" />
                        </div>
                        <h2 className="text-center">CinemApp</h2>
                        <div className="form">
                            <IonItem className="SignupForm">
                                <IonLabel position="floating" className="inputLabel" color="danger">Nombre y apellido</IonLabel>
                                <IonInput autocomplete="off" type="text" placeholder="Nombre completo" value={name} onIonChange={(e:any) => setName(e.detail.value)} ></IonInput>
                            </IonItem>
                            <IonItem className="SignupForm">
                                <IonLabel position="floating" className="inputLabel" color="danger">Correo electronico</IonLabel>
                                <IonInput autocomplete="off" type="text" placeholder="email" value={emailRef} onIonChange={(e:any) => setEmailRef(e.detail.value)} ></IonInput>
                            </IonItem>
                            <IonItem className="SignupForm">
                                <IonLabel className="inputLabel" position="floating" color="danger">Contraseña</IonLabel>
                                <IonInput autocomplete="off" type="password" placeholder="contraseña" value={passwordRef} onIonChange={(e:any) => setpasswordRef(e.detail.value)} ></IonInput>
                            </IonItem>
                        </div>
                        <IonButton type="submit" disabled={loading} className="SignupButton" size="default">Registrarme</IonButton>
                        <p className="text-center loginLink">
                            <Link to ="/login">¿Ya tienes cuenta? inicia sesión</Link>
                        </p>
                        </form>
                    </div>
                </IonContent>
            </IonPage>
    );
};

export default Signup;
