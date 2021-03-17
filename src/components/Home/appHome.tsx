import { IonFab, IonFabButton, IonFabList, IonIcon } from '@ionic/react'
import React from 'react'
import './home.css'
import Food from './food/food'
import Tickets from './tickets/tickets'
import { add, settings, share, person, arrowForwardCircle, arrowBackCircle, arrowUpCircle, logoVimeo, logoFacebook, logoInstagram, logoTwitter } from 'ionicons/icons';

const AppHome = () => {
    return (
        <div className="homeContainer">
            <div className="homeImage" style={{ backgroundImage: "url(/assets/images/kilyan-sockalingum-nW1n9eNHOsc-unsplash.jpg)" }}>
                <div className="bg">
                    <div className="text m-3">
                        <h1 className='fs-1 text-start'>CinemApp</h1>
                        <h4 className="text-start">Agenda tus entradas en cualquier momento.</h4>
                    </div>
                </div>
            </div>
            <div className="bocao">
                <img src="assets/images/028-camera.png" style={{ marginRight: "10px" }} alt="" /> <h2>Peliculas disponibles</h2>
            </div>
            <Tickets />
            <div className="bocao">
                <img src="assets/images/008-popcorn.png" style={{ marginRight: "10px" }} alt="" /> <h2>Agrega un bocao</h2>
            </div>

            <div className="food">
                <Food />
            </div>
        </div>
    )
}

export default AppHome
