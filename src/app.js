import React, { Component } from 'react';
import firebase from 'firebase';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { View } from 'react-native';
import { Header, Button, CardSection, Spinner } from './components/common';
import LoginForm from './components/LoginForm';
import reducers from './reducers';

class App extends Component {
  state = { loggedIn: null }

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
    console.log(this.state.loggedIn);

    switch (this.state.loggedIn) {
      case true:
        return (
          <CardSection>
            <Button onPress={() => firebase.auth().signOut()}>
              Log Out
            </Button>
          </CardSection>
        );
      case false:
        return <LoginForm />;
      default:
        return <Spinner size="large" />;
    }
  }

  render() {
    const store = createStore(reducers);

    return (
      <Provider store={store}>
        <View>
          <Header headerText="Personal Vital Signs" />
          {this.renderContent()}
        </View>
      </Provider>
    );
  }
}

export default App;
