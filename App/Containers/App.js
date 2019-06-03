import '../Config';
import React, { Component } from 'react';
import SplashScreen from 'react-native-splash-screen';
import { Provider } from 'react-redux';
import RootContainer from './RootContainer';
import createStore from '../Redux';
import getTheme from '../../native-base-theme/components';  
import { StyleProvider } from 'native-base';
import { SafeAreaView } from 'react-navigation';
import { Colors } from '../Themes';
import { retrieveToken, retrieveUserInfo } from '../Services/AsyncStorage';

// create our store
const store = createStore()

/**
 * Provides an entry point into our application.  Both index.ios.js and index.android.js
 * call this component first.
 *
 * We create our Redux store here, put it into a provider and then bring in our
 * RootContainer.
 *
 * We separate like this to play nice with React Native's hot reloading.
 */
class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      token: undefined
    };
  }

  UNSAFE_componentWillMount() {
    this.loadStorage();
  }

  componentDidMount() {
    SplashScreen.hide()
  }

  loadStorage = async () => {
    try {
      const token = await retrieveToken();
      this.setState({ token });
    } catch (error) {
      console.log(error);
    }
  }

  render () {
    const { token } = this.state;
    return (
      <Provider store={store}>
        <StyleProvider style={getTheme()}>
          <SafeAreaView
            style={{ flex: 1, backgroundColor: Colors.primary.base }}
          >
            <RootContainer token={token}/>
          </SafeAreaView>
        </StyleProvider>
      </Provider>
    )
  }
}

export default App
