import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/Home';
import Tickets from './pages/Tickets'
import Tabs from './Tabs'
import Movie from './pages/Movie'
import Login from './pages/Login';
import React from 'react';
import { ellipse, images, square, home } from 'ionicons/icons';
import Signup from './pages/SignUp';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute'
import ForgotPassword from './pages/ForgotPassword';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import { Show } from './pages/Show';
import Invoice from './pages/Invoice';

const App: React.FC = () => (
  <AuthProvider>
  <IonApp>
    <IonReactRouter>
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
      <Route path="/reset-password" component={ForgotPassword} />
      <Route exact path="/" component={Tabs} />
      <Route exact path="/show" component={Show} />
      <Route path="/tickets">
        <Tickets />
      </Route>
      <Route exact path="/home" component={Tabs} />
      <Route path="/movie/:id" component={Movie} />
      <Route path="/invoice/:id" component={Invoice} />
    </IonReactRouter>
  </IonApp>
  </AuthProvider>
);

export default App;
