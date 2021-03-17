import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonImg,IonButton, IonTabs, IonRouterOutlet, IonTabBar, IonTabButton, IonLabel } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import React from 'react';
import { Redirect, Route } from 'react-router';
import Home from './pages/Home';
import Tickets from './pages/Tickets';
import Movie from './pages/Movie'

const Tabs: React.FC = () => {
  return (
    <IonReactRouter>
    <IonTabs>
    <IonRouterOutlet>
      <Route exact path="/home">
        <Home />
      </Route>
      <Route path="/tickets">
        <Tickets />
      </Route>
      <Route exact path="/">
        <Redirect to="/home" />
      </Route>
    </IonRouterOutlet>
    <IonTabBar style={{background:" #c40404", color:"#fff"}}   slot="bottom">
        <IonTabButton style={{background:" #c40404", color:"#fff"}} tab="tab1" href="/home">
          <img src="/assets/images/home.png" alt="" height="30"/>
          <IonLabel>Home</IonLabel>
        </IonTabButton>
        <IonTabButton style={{background:" #c40404", color:"#fff"}} tab="tab2" href="/tickets">
        <img src="/assets/images/interface.png" alt="" height="30"/>
          <IonLabel>Mis tickets</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
    </IonReactRouter>
  );
};

export default Tabs;
