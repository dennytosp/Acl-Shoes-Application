import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  Image,
  ToastAndroid,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../../consts/colors1';
import STYLES from '../../consts/styles';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import axios from 'axios';

const SignUpScreen = ({navigation}) => {
  const [fullname, setFullname] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [dataUsers, setDataUsers] = useState([]);

  function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

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

  const Signup = (fullname, email, password) => {
    let dataparams = {fullname: fullname, email: email, pass: password};
    const findDataEmail = dataUsers.find((v) => v.email == email);
    if (fullname == null || email == null || password == null) {
      ToastAndroid.show('Vui lòng không để trống', ToastAndroid.SHORT);
    } else if (fullname.charAt(0) == ' ' || email.charAt(0) == ' ' || password.charAt(0) == ' ') {
      ToastAndroid.show('Không thể bắt đầu với khoảng trống', ToastAndroid.SHORT,);
    } else if (fullname.length < 10 || fullname > 50) {
      ToastAndroid.show('Vui lòng nhập đúng họ tên', ToastAndroid.SHORT);
    } else if (!validateEmail(email)) {
      ToastAndroid.show('Sai định dạng email', ToastAndroid.SHORT);
    } else if (password.length < 6) {
      ToastAndroid.show('Mật khẩu quá ngắn', ToastAndroid.SHORT);
    } else if (findDataEmail) {
      ToastAndroid.show('Email đã tồn tại', ToastAndroid.SHORT);
    } else {
      axios
        .post('http://10.0.2.2:3000/client/add-client', dataparams)
        .then((res) => {
          navigation.navigate('Login');
          console.log('-----------DATA-----------', res.data);
          ToastAndroid.show('Đăng ký thành công!', ToastAndroid.SHORT);
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <SafeAreaView
      style={{paddingHorizontal: 20, flex: 1, backgroundColor: COLORS.white}}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{flexDirection: 'row', marginTop: 40}}>
          <Text style={{fontWeight: 'bold', fontSize: 22, color: COLORS.dark}}>
            RUN
          </Text>
          <Text
            style={{fontWeight: 'bold', fontSize: 22, color: COLORS.secondary}}>
            NING
          </Text>
        </View>
        <View style={{marginTop: 70}}>
          <Text style={{fontSize: 27, fontWeight: 'bold', color: COLORS.dark}}>
            Welcome Back
          </Text>
          <Text style={{fontSize: 19, fontWeight: 'bold', color: COLORS.light}}>
            Sign up to continue
          </Text>
        </View>
        <View style={{marginTop: 20}}>
          <View style={STYLES.inputContainer}>
            <Icon
              name="person-outline"
              color={COLORS.light}
              size={20}
              style={STYLES.inputIcon}
            />
            <TextInput
              placeholder="Name"
              onChangeText={(text) => setFullname(text)}
              style={STYLES.input}
            />
          </View>
          <View style={STYLES.inputContainer}>
            <Icon
              name="mail-outline"
              color={COLORS.light}
              size={20}
              style={STYLES.inputIcon}
            />
            <TextInput
              placeholder="Email"
              onChangeText={(text) => setEmail(text)}
              style={STYLES.input}
            />
          </View>
          <View style={STYLES.inputContainer}>
            <Icon
              name="lock-outline"
              color={COLORS.light}
              size={20}
              style={STYLES.inputIcon}
            />
            <TextInput
              placeholder="Password"
              onChangeText={(text) => setPassword(text)}
              style={STYLES.input}
              secureTextEntry
            />
          </View>
          <TouchableOpacity
            onPress={() => {
              Signup(fullname, email, password);
            }}>
            <View style={STYLES.btnPrimary}>
              <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 18}}>
                Sign Up
              </Text>
            </View>
          </TouchableOpacity>

          <View
            style={{
              marginVertical: 20,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {/* <View style={STYLES.line}></View>
            <Text style={{marginHorizontal: 5, fontWeight: 'bold'}}>OR</Text>
            <View style={STYLES.line}></View> */}
          </View>
          {/* <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View style={STYLES.btnSecondary}>
              <Text style={{fontWeight: 'bold', fontSize: 16}}>
                Sign up with
              </Text>
              <Image
                style={STYLES.btnImage}
                source={require('../../assests/facebook.png')}
              />
            </View>
            <View style={{width: 10}}></View>
            <View style={STYLES.btnSecondary}>
              <Text style={{fontWeight: 'bold', fontSize: 16}}>
                Sign up with
              </Text>
              <Image
                style={STYLES.btnImage}
                source={require('../../assests/google.png')}
              />
            </View>
          </View> */}
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'flex-end',
            justifyContent: 'center',
            marginTop: 5,
            marginBottom: 20,
          }}>
          <Text style={{color: COLORS.light, fontWeight: 'bold'}}>
            Already have an account?
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={{color: COLORS.pink, fontWeight: 'bold'}}>
              {''} Sign in
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUpScreen;
