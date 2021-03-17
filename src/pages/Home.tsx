import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonImg,IonButton } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import AppHome from '../components/Home/appHome'
import Header from '../components/Header/Header'
import './Home.css';

const Home: React.FC = () => {
  return (
    <IonPage>
      <Header/>
      <IonContent >
      <AppHome/>
        <ExploreContainer />
      </IonContent>
    </IonPage>
  );
};

export default Home;
