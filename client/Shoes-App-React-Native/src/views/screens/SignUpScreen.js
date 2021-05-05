import React, {useContext, useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  StyleSheet,
  ToastAndroid,
} from 'react-native';
import FormInput from '../../../components/FormInput';
import FormButton from '../../../components/FormButton';
import SocialButton from '../../../components/SocialButton';
import axios from 'axios';

const SignupScreen = ({navigation}) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [dataUsers, setDataUsers] = useState([]);
  // Remove object rồi lặp lại (Loading)
  // useEffect(() => {
  //   axios
  //     .get('http://10.0.2.2:3000/admin/client-send')
  //     .then((res) => {
  //       setDataUsers(res.data);
  //     })
  //     .catch((err) => console.log(err));
  // }, []);
  
  // -- fetch -- //

  useEffect(() => {
    fetch('http://10.0.2.2:3000/api/client-send')
      .then((res) => res.json())
      .then((json) => setDataUsers(json))
      .catch((err) => console.log(err));
  }, []);



  const Signup = (email, password) => {
    let dataparams = {user: email, pass: password};
      const findDataEmail = dataUsers.find((v) => v.user == email);
      if (email == null || password == null) {
        ToastAndroid.show('Vui lòng không để trống!', ToastAndroid.SHORT);
    }
      if (findDataEmail) {
        ToastAndroid.show('Email đã tồn tại!', ToastAndroid.SHORT);
      } else {
        axios
          .post('http://10.0.2.2:3000/client/add-client', dataparams)
          .then((res) => {
            navigation.navigate('Login');
            console.log('-----------data-----------', res.data);
            ToastAndroid.show('Đăng ký thành công!', ToastAndroid.SHORT);
          })
          .catch((err) => console.log(err));
      }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Create an account</Text>

      <FormInput
        placeholderText="Email"
        iconType="user"
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
        setValue={setEmail}
      />

      <FormInput
        placeholderText="Password"
        iconType="lock"
        secureTextEntry={true}
        setValue={setPassword}
      />

      {/* <FormInput
        labelValue={confirmPassword}
        onChangeText={(userPassword) => setPassword(userPassword)}
        placeholderText="Confirm Password"
        iconType="lock"
        secureTextEntry={true}
      /> */}

      <FormButton
        buttonTitle="Sign Up"
        onPress={() => {
          Signup(email, password);
        }}
      />

      <View style={styles.textPrivate}>
        <Text style={styles.color_textPrivate}>
          By registering, you confirm that you accept our{' '}
        </Text>
        <TouchableOpacity onPress={() => alert('Terms Clicked!')}>
          <Text style={[styles.color_textPrivate, {color: '#e88832'}]}>
            Terms of service
          </Text>
        </TouchableOpacity>
        <Text style={styles.color_textPrivate}> and </Text>
        <Text style={[styles.color_textPrivate, {color: '#e88832'}]}>
          Privacy Policy
        </Text>
      </View>

      <View>
        <SocialButton
          buttonTitle="Sign Up with Facebook"
          btnType="facebook"
          color="#4867aa"
          backgroundColor="#e6eaf4"
          onPress={() => {}}
        />

        <SocialButton
          buttonTitle="Sign Up with Google"
          btnType="google"
          color="#de4d41"
          backgroundColor="#f5e7ea"
          onPress={() => {}}
        />
      </View>

      <TouchableOpacity
        style={styles.navButton}
        onPress={() => navigation.navigate('Login')}>
        <Text style={styles.navButtonText}>Have an account? Sign In</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f9fafd',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
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
  navButtonText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#2e64e5',
    fontFamily: 'Lato-Regular',
  },
  textPrivate: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 35,
    justifyContent: 'center',
  },
  color_textPrivate: {
    fontSize: 13,
    fontWeight: '400',
    fontFamily: 'Lato-Regular',
    color: 'grey',
  },
});
