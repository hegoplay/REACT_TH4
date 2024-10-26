import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Alert,
  TextInput,
  FlatList,
} from 'react-native';
import axios from 'axios'
import {useLayoutEffect, useState} from 'react'
import Colors from './constants/Colors';



export default function App() {
  let category = [
    { "name": "Resort", "image": require("./assets/resort.png") },
    { "name": "Homestay", "image": require("./assets/homestay.png") },
    { "name": "Hotel", "image": require("./assets/hotel.png") },
    { "name": "Lodge", "image": require("./assets/lodge.png") },
    { "name": "Villa", "image": require("./assets/villa.png") },
    { "name": "Apartment", "image": require("./assets/apartment.png") },
    { "name": "Hostel", "image": require("./assets/hostel.png") },
    { "name": "See all", "image": require("./assets/seeall.png") },
  ];
  const [curCategory, setCurCategory] = useState([])
  const [curLocation, setCurlocation] = useState([])
  const location = [
    require('./assets/photo1.png'),
    require('./assets/photo2.png'),
    require('./assets/photo3.png'),
    require('./assets/photo4.png'),
    require('./assets/photo5.png'),
    require('./assets/photo1.png'),
  ];

  useLayoutEffect(() =>{
    const getData = async() =>{
      let res = await axios.get('https://670de03b073307b4ee44bda5.mockapi.io/api/v1/category');
      setCurCategory(res.data);
      res = await axios.get('https://670de03b073307b4ee44bda5.mockapi.io/api/v1/photos')
      setCurlocation(res.data);
    }
    getData();
  },[])


  return (
    <View style={styles.container}>
      <View style={styles.upperContainer}>
        <View style={styles.firstNav}>
          <Image
            source={require('./assets/logoicon.png')}
            style={styles.iconSize}
          />
          <View style={styles.inputOuter}>
            <TextInput />
            <Image
              source={require('./assets/findicon.png')}
              style={{ height: 20, width: 20 }}
            />
          </View>
        </View>
        <View style={styles.secondNav}>
          <View style={{ flexDirection: 'row', gap: 12 }}>
            <Image
              source={require('./assets/personicon.png')}
              style={[styles.iconSize, { borderRadius: '50%' }]}
            />
            <View>
              <Text style={{ fontWeight: 'bold', color: 'white' }}>
                Welcome!
              </Text>
              <Text style={{ color: 'white' }}>Donna Stroupe</Text>
            </View>
          </View>
          <View>
            <Image
              source={require('./assets/ringicon.png')}
              style={styles.iconSize}
            />
          </View>
        </View>
      </View>
      <View style={styles.midContainer}>
        <ScrollView>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: 12
            }}>
            <Text>Category</Text>
            <Image
              source={require('./assets/3gach.png')}
              style={styles.iconSmallSize}
            />
          </View>
          <View style = {{alignItems: 'center' ,flexDirection:'row'}}>
          <FlatList
            data={curCategory}
            numColumns={4}
            keyExtractor={(item) => item.name}
            renderItem = {({item}) =>(
              <View style = {{flexDirection:"column", alignItems:"center",marginTop: 12}}>
                <Image source = {{uri: item.image}} style= {{width: 64,height:64}} />
                <Text>{item.name}</Text>
              </View>
            )}
            gap={2}
            
          />
          </View>
           <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: 12,
            }}>
            <Text>Popular Destination</Text>
            <Image
              source={require('./assets/3gach.png')}
              style={styles.iconSmallSize}
            />
          </View>
          <FlatList 
            data= {curLocation}
            horizontal = {true}
            renderItem = {({item}) => <Image source = {{uri: item.image}} style = {styles.smallImgSize}/>}
            
          />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: 12,
            }}>
            <Text>Recommend</Text>
          </View>
          <FlatList 
            data= {curLocation}
            horizontal = {true}
            renderItem = {({item}) => <Image source = {{uri: item.image}} style = {styles.bigImgSize}/>}
            
          />
        </ScrollView>
      </View>
      <View style={styles.lowerContainer}>
        <View style={styles.outerLowerNav}>
          <View style = {{flexDirection:"column",alignItems:"center"}}>
            <Image
              source={require('./assets/homeicon.png')}
              style={styles.iconSize}
            />
            <Text style={styles.textWhite}>Home</Text>
          </View>
          <View style = {{flexDirection:"column",alignItems:"center"}}>
            <Image
              source={require('./assets/exploreicon.png')}
              style={styles.iconSize}
            />
            <Text style={styles.textWhite}>Explore</Text>
          </View>
          <View style = {{flexDirection:"column",alignItems:"center"}}>
            <Image
              source={require('./assets/searchicon.png')}
              style={styles.iconSize}
            />
            <Text style={styles.textWhite}>Search</Text>
          </View>
          <View style = {{flexDirection:"column",alignItems:"center"}}>
            <Image
              source={require('./assets/profileicon.png')}
              style={styles.iconSize}
            />
            <Text style={styles.textWhite}>Profile</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'flex-start',
    flexDirection: 'column',
  },
  upperContainer: {
    flexDirection: 'column',
    backgroundColor: Colors.primary,
    padding: 24,
    // flex: 1,
    gap: 12,
  },
  firstNav: {
    flexDirection: 'row',
    gap: 10,
  },
  iconSize: {
    width: 32,
    height: 32,
  },
  iconSmallSize:{
    width: 24,
    height: 24,
  },
  inputOuter: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  secondNav: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  midContainer: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 20,
  },
  lowerContainer: {
    backgroundColor: Colors.primary,
    padding: 24,
  },
  outerLowerNav: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textWhite: {
    color: 'white',
  },
  smallImgSize:{
    width: 84,
    height: 84,
    borderRadius: 24,
    marginRight: 12
  },
  bigImgSize:{
    width: 120,
    height: 120,
    borderRadius: 6,
    marginRight: 12
  },
});
