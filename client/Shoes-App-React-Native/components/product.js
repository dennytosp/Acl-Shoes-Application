import React from 'react';
import {useState, useEffect} from 'react';
import {StyleSheet, Text, View, SafeAreaView, FlatList} from 'react-native';

const Item = ({navigation, item}) => {
  const onPress = (item) => {
    navigation.navigate('DetailsComponent', {item: item});
    // console.log('>AA>>>>>>>>>>>>>',item.name)
  };
  return (
    <View>
      <Text
        style={{justifyContent: 'center', alignContent: 'center'}}
        onPress={() => onPress(item)}>
        {item.name}
      </Text>
      {/* <Text>ABC</Text> */}
    </View>
  );
};

const product = ({navigation}) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch('http://10.0.2.2:3000/api/admin')
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error('>>>>>>>', error));
  }, []);
//   console.log(data);
  const renderItem = ({item}) => <Item item={item} navigation={navigation} />;
  return (
    <SafeAreaView>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
      />
    </SafeAreaView>
  );
};

export default product;

const styles = StyleSheet.create({});
