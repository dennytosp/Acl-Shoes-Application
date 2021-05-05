import React, {useState, useEffect} from 'react';
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Dimensions,
} from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import Feather from 'react-native-vector-icons/Feather';

const {width} = Dimensions.get('window');

const Cart = ({navigation}) => {

  const RenderRight = () => {
    // console.log(progress);
    return (
      <TouchableOpacity>
        <View style={styles.rightAction}>
          <Feather name="trash-2" size={30} color="#fff" />
        </View>
      </TouchableOpacity>
    );
  };
  const RenderLeft = () => {
    return (
      <TouchableOpacity>
        <View style={styles.leftAction}>
          <Feather name="bell" size={30} color="#fff" />
        </View>
      </TouchableOpacity>
    );
  };

  const Item = ({item}) => {
    return (
      <View style={styles.itemWrapper}>
        {/* renderRightActions={(dragX, progress) => (
            <RenderRight progress={progress} /> */}
        <Swipeable
          renderRightActions={RenderRight}
          renderLeftActions={RenderLeft}>
          <View style={styles.item}>
            <View>
              <Image source={{uri:'http://10.0.2.2:3000/assets/images/'+item.image}} style={styles.itemImage} />
            </View>
            <View
              style={{
                alignItems: 'flex-start',
                width: width / 2,
              }}>
              <Text style={styles.itemTitle}>{item.name}</Text>
              <View style={styles.qtyWrapper}>
                <View style={styles.qtyButton}>
                  <Feather name="minus" size={18} />
                </View>
                <Text style={styles.qtyText}>1</Text>
                <View style={styles.qtyButton}>
                  <Feather name="plus" size={18} />
                </View>
              </View>
            </View>
          </View>
        </Swipeable>
      </View>
    );
  };
  return (
    <View style={{backgroundColor: '#fff', flex: 1, marginTop: 0}}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#fff"
        translucent={true}
      />
      <SafeAreaView>
        <View style={styles.wrapper}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}>
            <Feather name="chevron-left" size={24} />
          </TouchableOpacity>
          <View>
            <Text style={styles.headerText}>Cart Items</Text>
          </View>
          <View style={{width: 20}} />
        </View>
      </SafeAreaView>
      <View>
        <FlatList
          data={data}
          keyExtractor={(item) => item._id}
          showsVerticalScrollIndicator={false}
          renderItem={Item}
        />
      </View>
      <View style={styles.bottomAction}>
        <View>
          <Text style={styles.totalText}>Total Price</Text>
          <Text style={styles.totalAmountText}>$19.5</Text>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate('Home')}
          style={styles.orderButton}>
          <Text style={styles.orderButtonText}>Order Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Cart;

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 20,
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 70,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f8f8f7',
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 0,
    },
    shadowRadius: 2,
    shadowOpacity: 0.08,
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 15,
    color: '#616161',
  },
  itemWrapper: {
    marginTop: 20,
    backgroundColor: '#f8f8f7',
    borderRadius: 20,
    marginHorizontal: 20,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  itemImage: {
    width: 80,
    height: 120,
    resizeMode: 'contain',
  },
  itemTitle: {
    fontWeight: 'bold',
    color: '#555',
    fontSize: 16,
    marginBottom: 10,
  },
  qtyWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f8f7',
    borderColor: '#d2d2d1',
    borderWidth: 1,
    borderRadius: 10,
  },
  qtyButton: {
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#d2d2d1',
    borderWidth: 1,
    borderRadius: 10,
    width: 30,
    height: 30,
  },
  qtyText: {
    color: '#555',
    marginHorizontal: 10,
    fontWeight: 'bold',
  },
  rightAction: {
    backgroundColor: '#509473',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    flex: 1,
    width: 60,
  },
  leftAction: {
    backgroundColor: '#509473',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    flex: 1,
    width: 60,
  },
  bottomAction: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 60,
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  totalText: {
    color: '#227551',
    fontWeight: 'bold',
    fontSize: 18,
  },
  totalAmountText: {
    color: '#2e2e2e',
    fontWeight: 'bold',
    fontSize: 24,
  },
  orderButton: {
    backgroundColor: '#1d724d',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderColor: '#d2d2d1',
    borderWidth: 1,
    borderRadius: 10,
  },
  orderButtonText: {
    color: '#fff',
  },
});
