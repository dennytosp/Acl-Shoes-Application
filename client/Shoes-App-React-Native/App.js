import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import OnBoardScreen from './src/views/screens/OnBoardScreen';
import HomeScreen from './src/views/screens/HomeScreen';
import DetailsScreen from './src/views/screens/DetailsScreen';
import DetailsComponent from './components/details';
import productComponent from './components/product';
import Logins from './src/views/screens/LoginScreen';
import Signup from './src/views/screens/SignUpScreen';
import Login from './src/views/screens/Login';
import Register from './src/views/screens/Register';
import Cart from './src/views/screens/Cart';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}
      initialRouteName="OnBoardScreen"
      >
        <Stack.Screen name="OnBoardScreen" component={OnBoardScreen} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="DetailsScreen" component={DetailsScreen} />
        <Stack.Screen name="DetailsComponent" component={DetailsComponent} />
        <Stack.Screen name="productComponent" component={productComponent} />
        {/* <Stack.Screen name="Login" component={Logins} />
        <Stack.Screen name="Signup" component={Signup} /> */}
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Cart" component={Cart} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
