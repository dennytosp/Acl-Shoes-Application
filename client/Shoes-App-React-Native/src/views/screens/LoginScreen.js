import React, {useContext, useState, useEffect} from 'react';
import {
  StyleSheet,
  Button,
  Text,
  View,
  Image,
  TouchableOpacity,
  Platform,
  StatusBar,
  ToastAndroid,
} from 'react-native';

import FormInput from '../../../components/FormInput';
import FormButton from '../../../components/FormButton';
import SocialButton from '../../../components/SocialButton';
import axios from 'axios';

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [dataUsers, setDataUsers] = useState([]);
  const [dataAuth, setDataAuth] = useState();

  // -- fetch -- //

  useEffect(() => {
    fetch('http://10.0.2.2:3000/api/client-send')
      .then((res) => res.json())
      .then((json) => setDataUsers(json))
      .catch((err) => console.log(err));
  }, [dataUsers]);


  // Remove object rồi lặp lại (Loading)

  // useEffect(() => {
  //   axios
  //     .get('http://10.0.2.2:3000/api/client-send')
  //     .then((res) => {
  //       setDataUsers(res.data);
  //     })
  //     .catch((err) => console.log(err));
  // }, [dataUsers]);

  const login = (email, password) => {
    const data = dataUsers.find((v) => v.user == email && v.pass == password);
    if (data) {
      navigation.navigate('HomeScreen');
      ToastAndroid.show('Đăng nhập thành công!', ToastAndroid.SHORT);
    } else {
      ToastAndroid.show('Đăng nhập thất bại!', ToastAndroid.SHORT);
    }
  };
  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent={true}
      />
      <Image
        source={require('../../assets/rn-social-logo.png')}
        style={styles.logo}
      />
      <Text style={styles.text}>Gillian</Text>

      <FormInput
        placeholderText="Email"
        iconType="user"
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
        setValue={(text) => setEmail(text)}
      />
      <FormInput
        placeholderText="Password"
        iconType="lock"
        secureTextEntry={true}
        setValue={(text) => setPassword(text)}
      />
      <FormButton
        buttonTitle="Sign In"
        onPress={() => login(email, password)}
      />

      <TouchableOpacity style={styles.forgotButton} onPress={() => {}}>
        <Text style={styles.navButtonText}>Forgot password?</Text>
      </TouchableOpacity>

      <SocialButton
        buttonTitle="Sign In with Facebook"
        btnType="facebook"
        color="#4867aa"
        backgroundColor="#e6eaf4"
        onPress={() => {}}
      />
      <SocialButton
        buttonTitle="Sign In with Google"
        btnType="google"
        color="#de4d41"
        backgroundColor="#f5e7ea"
        onPress={() => {}}
      />
      <TouchableOpacity
        style={styles.forgotButton}
        onPress={() => navigation.navigate('Signup')}>
        <Text style={styles.navButtonText}>
          Don't have an account? Create here
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    paddingTop: 50,
  },
  logo: {
    height: 150,
    width: 150,
    resizeMode: 'cover',
  },
  text: {
    fontFamily: 'Kufam-SemiBoldItalic',
    fontSize: 28,
    marginBottom: 10,
    color: '#051d5f',
  },
  navButton: {
    marginTop: 15,
  },
  forgotButton: {
    marginVertical: 35,
  },
  navButtonText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#2e64e5',
    fontFamily: 'Lato-Regular',
  },
});
