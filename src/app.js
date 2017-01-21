import React, { Component } from 'react';
import firebase from 'firebase';
import { View } from 'react-native';
import { Header, Button, CardSection } from './components/common';
import LoginForm from './components/LoginForm';

class App extends Component {
  state = { loggedIn: false }

  componentWillMount() {
    firebase.initializeApp({
      apiKey: 'AIzaSyDBGsD79n3V1KNSvqSYMhK_cFt0m-dKdCs',
      authDomain: 'personalvitalsigns.firebaseapp.com',
      databaseURL: 'https://personalvitalsigns.firebaseio.com',
      storageBucket: 'personalvitalsigns.appspot.com',
      messagingSenderId: '447978014897'
    });

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ loggedIn: true });
      } else {
        this.setState({ loggedIn: false });
      }

      console.log(this.state, user);
    });
  }

  renderContent() {
    if (this.state.loggedIn) {
      return (
        <CardSection>
          <Button>
            Log In
          </Button>
        </CardSection>
      );
    }

    return <LoginForm />;
  }

  render() {
    return (
      <View>
        <Header headerText="Personal Vital Signs" />
        {this.renderContent()}
      </View>
    );
  }
}

export default App;
