import {post} from "../Components/response";

import React, { useEffect, useState } from 'react';
import "react-native-gesture-handler";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  FastImage,
  FlatList,
  Button
} from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SliderBox } from "react-native-image-slider-box";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
//Img
const imgCoffe = require("../img/coffee.png");
const imgTea = require("../img/bubble-tea.png");
const restaurant = require("../img/restaurant.png");
const building = require("../img/building.png");
const mountains = require("../img/mountains.png");
const ImageBackgrounds = require("../img/Backgroud2.jpg");


// iCon
import { FontAwesome5 } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
//Screens
import DetailScreen from "./DetailScreen";
import UserScreen from "./UserScreen";
import FavouriteScreen from './ListFavouriteScreen'
import { createDrawerNavigator } from "@react-navigation/drawer";

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const images = [
  "https://source.unsplash.com/1024x768/?nature",
  "https://source.unsplash.com/1024x768/?water",
  "https://source.unsplash.com/1024x768/?girl",
  "https://source.unsplash.com/1024x768/?tree", // Network image
  // require('../img/'),          // Local image
];
function Home({ navigation }) {
  // const [loading,setLoading] = useState() 
  const [dataPost, setDataPost] = useState([]);
  const [dataPost2, setDataPos2] = useState([]);

  const [pageNumber, setPagetNumber] = useState(1);

  function onPressLearnMore  (getPage){
    console.log(getPage)
    setPagetNumber(getPage);
    getData();
    getDataPost();
  }
  // *********************Server MySQL******************//
  // lấy data Bài đăng and data userAccout
  const getDataPost = async () => {
    try {
      const response = await fetch('http://'+post+'/post/');

      const json = await response.json();
      console.log("json")
 
      setDataPost(json);

    } catch (error) {
      // console.error(error);
    } finally {
      setLoading(false);
    }
  }

  // khi chạy xong giao diện thì bắt đầu load dữ liệu Bài đăng
  useEffect(() => {
    getDataPost();

    
  }, []);
  const getData = async () => {
    try {
      const response = await fetch('http://'+post+'/trang/' + pageNumber);
      const json = await response.json();
      setDataPos2(json);
   
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getData();
    console.log(dataPost.length+"ádf");
  }, []);
  return (
    <View style={Styles.container}>
      <ImageBackground
        source={ImageBackgrounds}
        resizeMode="cover"
        style={{ flex: 1 }}
      >
        <ScrollView>
          {/* Container Top */}

          <View style={Styles.containerTop}>
            <View style={Styles.ContainerNav}>
              <View style={{ flex: 3 }}>
                <Text
                  style={[
                    Styles.h0,
                    Styles.fontWeightBold,
                    { color: "gray", marginLeft: 15 },
                  ]}
                >
                  Hi Trung{" "}
                </Text>
                <Text style={[Styles.h3, { color: "black", marginLeft: 15 }]}>
                  Khám phá các địa điểm đẹp tại Việt Nam
                </Text>
              </View>
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <FontAwesome5 name="user-circle" size={30} color="black" />
              </View>
            </View>
            <View style={Styles.SlideShow}>
              <SliderBox
                ImageComponent={FastImage}
                images={images}
                sliderBoxHeight={180}
                onCurrentImagePressed={(index) =>
                  console.warn(`image ${index} pressed`)
                }
                dotColor="#FFEE58"
                inactiveDotColor="#90A4AE"
                paginationBoxVerticalPadding={20}
                autoplay
                circleLoop
                resizeMethod={"resize"}
                resizeMode={"cover"}
                paginationBoxStyle={{
                  position: "absolute",
                  bottom: 0,
                  padding: 0,
                  alignItems: "center",
                  alignSelf: "center",
                  justifyContent: "center",
                  paddingVertical: 10,
                }}
                dotStyle={{
                  width: 10,
                  height: 10,
                  borderRadius: 5,
                  marginHorizontal: 0,
                  padding: 0,
                  margin: 0,
                  backgroundColor: "rgba(128, 128, 128, 0.92)",
                }}
                ImageComponentStyle={{
                  borderRadius: 15,
                  width: "97%",
                  marginTop: 5,
                }}
                imageLoadingColor="#2196F3"
              />
            </View>
            <Text style={[Styles.h2, { marginLeft: 15, marginBottom: 5 }]}>
              Các địa điểm nổi bật
            </Text>
            <View
              style={{
                marginBottom: 10,
                height: "auto",
                width: "100%",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <TouchableOpacity style={Styles.itemNavTop}>
                <Image
                  source={imgCoffe}
                  resizeMode="stretch"
                  style={{ margin: 5, width: 30, height: 30 }}
                />
              </TouchableOpacity>
              <TouchableOpacity style={Styles.itemNavTop}>
                <Image
                  source={imgTea}
                  resizeMode="stretch"
                  style={{ margin: 5, width: 30, height: 30 }}
                />
              </TouchableOpacity>
              <TouchableOpacity style={Styles.itemNavTop}>
                <Image
                  source={restaurant}
                  resizeMode="stretch"
                  style={{ margin: 5, width: 30, height: 30 }}
                />
              </TouchableOpacity>
              <TouchableOpacity style={Styles.itemNavTop}>
                <Image
                  source={building}
                  resizeMode="stretch"
                  style={{ margin: 5, width: 30, height: 30 }}
                />
              </TouchableOpacity>
              <TouchableOpacity style={Styles.itemNavTop}>
                <Image
                  source={mountains}
                  resizeMode="stretch"
                  style={{ margin: 5, width: 30, height: 30 }}
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Container Content */}
          <View style={Styles.containerContent}>
            <View style={Styles.ListPostHorizontal}>
              <FlatList
                horizontal
                data={dataPost}
                keyExtractor={({ id }, index) => id}
                renderItem={({ item }) => (
                  <View style={Styles.containerItemListPost}>
                    <View style={Styles.itemImgPost}>
                      <Image
                        source={{
                          uri: `${item.imgPost}`,
                        }}
                        style={{
                          borderTopLeftRadius: 13,
                          borderTopRightRadius: 13,
                          height: "100%",
                          width: "100%",
                        }}
                      />
                    </View>
                    <View style={Styles.itemInfor}>
                      <View style={Styles.itemTitle}>
                        <View
                          style={{
                            flex: 2,
                            flexDirection: "row",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <View
                            style={{ flex: 2.5, paddingLeft: 5, paddingRight: 5 }}
                          >
                            <Text style={[Styles.h2, Styles.fontWeightBold]}>
                              {item.title}
                            </Text>
                          </View>
                          <View
                            style={{
                              flex: 1,
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <TouchableOpacity>
                              <Ionicons
                                name="ios-bookmark-outline"
                                size={24}
                                color="black"
                              />
                            </TouchableOpacity>
                          </View>
                        </View>
                        <View
                          style={{
                            flex: 1,
                            flexDirection: "row",
                            paddingLeft: 5,
                            paddingRight: 5,
                          }}
                        >
                          <View style={{ flex: 2, alignSelf: "center" }}>
                            <Text style={[Styles.h4, { color: "gray" }]}>
                              {item.location}- {item.keySearch}
                            </Text>
                          </View>
                          <View
                            style={{
                              flexDirection: "row",
                              flex: 1,
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <AntDesign name="star" size={15} color="red" />
                            <Text style={[Styles.h4, { marginLeft: 2 }]}>
                              4.7
                            </Text>
                          </View>
                          <View
                            style={{
                              flexDirection: "row",
                              flex: 1,
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <FontAwesome5
                              name="location-arrow"
                              size={14}
                              color="gray"
                            />

                            <Text
                              style={[
                                Styles.h4,
                                { marginLeft: 2, color: "gray" },
                              ]}
                            >
                              30 km
                            </Text>
                          </View>
                        </View>
                      </View>
                      <View style={Styles.itemActive}>
                        <TouchableOpacity
                          style={{
                            flex: 1,
                            flexDirection: "row",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <AntDesign
                            name="heart"
                            size={15}
                            color="black"
                            style={{ marginRight: 3 }}
                          />
                          <Text style={[Styles.h3]}>Thích</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={{
                            flex: 1,
                            flexDirection: "row",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <MaterialCommunityIcons
                            name="comment"
                            size={15}
                            color="black"
                            style={{ marginRight: 3 }}
                          />
                          <Text style={[Styles.h3]}>Bình luận</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={{
                            flex: 1,
                            flexDirection: "row",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <Ionicons
                            name="share-social-sharp"
                            size={15}
                            color="black"
                            style={{ marginRight: 3 }}
                          />
                          <Text style={[Styles.h3]}>Chia sẻ</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                )} />

            </View>
            <Text style={[Styles.h2, { marginLeft: 15, marginTop: 5 }]}>
              Top Review
            </Text>
            <View style={Styles.ListPostHorizontal}>
              <FlatList
                horizontal
                data={dataPost}
                keyExtractor={({ id }, index) => id}
                renderItem={({ item }) => (
                  <View style={Styles.containerItemListPost}>
                    <View style={Styles.itemImgPost}>
                      <Image
                        source={{
                          uri: `${item.imgPost}`,
                        }}
                        style={{
                          borderTopLeftRadius: 13,
                          borderTopRightRadius: 13,
                          height: "100%",
                          width: "100%",
                        }}
                      />
                    </View>
                    <View style={Styles.itemInfor}>
                      <View style={Styles.itemTitle}>
                        <View
                          style={{
                            flex: 2,
                            flexDirection: "row",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <View
                            style={{ flex: 2.5, paddingLeft: 5, paddingRight: 5 }}
                          >
                            <Text style={[Styles.h2, Styles.fontWeightBold]}>
                              {item.title}
                            </Text>
                          </View>
                          <View
                            style={{
                              flex: 1,
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <TouchableOpacity>
                              <Ionicons
                                name="ios-bookmark-outline"
                                size={24}
                                color="black"
                              />
                            </TouchableOpacity>
                          </View>
                        </View>
                        <View
                          style={{
                            flex: 1,
                            flexDirection: "row",
                            paddingLeft: 5,
                            paddingRight: 5,
                          }}
                        >
                          <View style={{ flex: 2, alignSelf: "center" }}>
                            <Text style={[Styles.h4, { color: "gray" }]}>
                              {item.location}- {item.keySearch}
                            </Text>
                          </View>
                          <View
                            style={{
                              flexDirection: "row",
                              flex: 1,
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <AntDesign name="star" size={15} color="red" />
                            <Text style={[Styles.h4, { marginLeft: 2 }]}>
                              4.7
                            </Text>
                          </View>
                          <View
                            style={{
                              flexDirection: "row",
                              flex: 1,
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <FontAwesome5
                              name="location-arrow"
                              size={14}
                              color="gray"
                            />

                            <Text
                              style={[
                                Styles.h4,
                                { marginLeft: 2, color: "gray" },
                              ]}
                            >
                              30 km
                            </Text>
                          </View>
                        </View>
                      </View>
                      <View style={Styles.itemActive}>
                        <TouchableOpacity
                          style={{
                            flex: 1,
                            flexDirection: "row",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <AntDesign
                            name="heart"
                            size={15}
                            color="black"
                            style={{ marginRight: 3 }}
                          />
                          <Text style={[Styles.h3]}>Thích</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={{
                            flex: 1,
                            flexDirection: "row",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <MaterialCommunityIcons
                            name="comment"
                            size={15}
                            color="black"
                            style={{ marginRight: 3 }}
                          />
                          <Text style={[Styles.h3]}>Bình luận</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={{
                            flex: 1,
                            flexDirection: "row",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <Ionicons
                            name="share-social-sharp"
                            size={15}
                            color="black"
                            style={{ marginRight: 3 }}
                          />
                          <Text style={[Styles.h3]}>Chia sẻ</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                )} />
            </View>

            <View style={Styles.ListPostVertical}>
              <FlatList
                data={dataPost2}
                keyExtractor={({ id }, index) => id}
                renderItem={({ item }) => (

                  <View View style={Styles.containerItemListPostVertical}>
                    <View style={Styles.itemImgPostVertical}>
                      <Image
                        source={{
                          uri: `${item.imgPost}`,
                        }}
                        style={{
                          borderTopLeftRadius: 13,
                          borderTopRightRadius: 13,
                          height: "100%",
                          width: "100%",
                        }}
                      />
                      <View
                        style={{
                          padding: 10,
                          alignSelf: "flex-end",
                          position: "absolute",
                        }}
                      >
                        <TouchableOpacity
                          style={{
                            margin: 5,
                            borderRadius: 100,
                            padding: 5,
                            opacity: 0.5,
                          }}
                        >
                          <MaterialCommunityIcons
                            name="dots-vertical"
                            size={24}
                            color="white"
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                    <View style={Styles.itemInfor}>
                      <View style={Styles.itemTitleVertical}>
                        <View
                          style={{
                            flex: 3,
                            flexDirection: "row",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <View
                            style={{
                              flexDirection: "row",
                              borderRadius: 100,
                              alignItems: "center",
                              flex: 1,
                              paddingLeft: 5,
                              paddingRight: 5,
                            }}
                          >
                            <Image
                              style={{
                                borderColor: "gray",
                                borderWidth: 1,
                                borderRadius: 100,
                                height: 40,
                                width: 50,
                              }}
                              resizeMode="cover"
                              source={{
                                uri:
                                  "https://www.malemodelscene.net/wp-content/uploads/2022/01/Simon-Nessman-Massimo-Dutti-Winter-2022-00-364x205.jpg",
                              }}
                            />
                            <View
                              style={{ flexDirection: "column", marginLeft: 5 }}
                            >
                              <Text>Hiếu Trung</Text>
                              <View
                                style={{
                                  alignItems: "center",
                                  flexDirection: "row",
                                }}
                              >
                                <Text>1 giờ .</Text>
                                <Ionicons
                                  name="ios-earth"
                                  size={17}
                                  color="black"
                                />
                              </View>
                            </View>
                          </View>
                        </View>
                        <View
                          style={{
                            flex: 2,
                            flexDirection: "row",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <View
                            style={{ flex: 4, paddingLeft: 5, paddingRight: 5 }}
                          >
                            <Text style={[Styles.h2, Styles.fontWeightBold]}>
                              {item.title}
                            </Text>
                          </View>
                          <View
                            style={{
                              flex: 1,
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <TouchableOpacity>
                              <Ionicons
                                name="ios-bookmark-outline"
                                size={24}
                                color="black"
                              />
                            </TouchableOpacity>
                          </View>
                        </View>
                        <View
                          style={{
                            flex: 1,
                            flexDirection: "row",
                            paddingLeft: 5,
                            paddingRight: 5,
                          }}
                        >
                          <View style={{ flex: 3, alignSelf: "center" }}>
                            <Text style={[Styles.h4, { color: "gray" }]}>
                              {item.location}- {item.keySearch}
                            </Text>
                          </View>
                          <View
                            style={{
                              flexDirection: "row",
                              flex: 1,
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <AntDesign name="star" size={15} color="red" />
                            <Text style={[Styles.h4, { marginLeft: 2 }]}>4.7</Text>
                          </View>
                          <View
                            style={{
                              flexDirection: "row",
                              flex: 1,
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <FontAwesome5
                              name="location-arrow"
                              size={14}
                              color="gray"
                            />

                            <Text
                              style={[Styles.h4, { marginLeft: 2, color: "gray" }]}
                            >
                              30 km
                            </Text>
                          </View>
                        </View>
                      </View>
                      <View style={Styles.itemActive}>
                        <TouchableOpacity
                          style={{
                            flex: 1,
                            flexDirection: "row",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <AntDesign
                            name="heart"
                            size={15}
                            color="black"
                            style={{ marginRight: 3 }}
                          />
                          <Text style={[Styles.h3]}>Thích</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={{
                            flex: 1,
                            flexDirection: "row",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <MaterialCommunityIcons
                            name="comment"
                            size={15}
                            color="black"
                            style={{ marginRight: 3 }}
                          />
                          <Text style={[Styles.h3]}>Bình luận</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={{
                            flex: 1,
                            flexDirection: "row",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <Ionicons
                            name="share-social-sharp"
                            size={15}
                            color="black"
                            style={{ marginRight: 3 }}
                          />
                          <Text style={[Styles.h3]}>Chia sẻ</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                )} />


            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: "center" }}>
              <TouchableOpacity
                style={{ height: 30, width: 30, margin: 10, padding: 3, borderRadius: 10, borderWidth: 1, backgroundColor: "white", justifyContent: "center", alignItems: "center", }}
                onPress={() => onPressLearnMore(1)}
                title="Trang 1"
                backgroundColor="#841584"
    
              >
                <Text>1</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ height: 30, width: 30, margin: 10, padding: 3, borderRadius: 10, borderWidth: 1, backgroundColor: "white", justifyContent: "center", alignItems: "center", }}
                onPress={() => onPressLearnMore(2)}
                title="Trang 2"
                backgroundColor="#841584"

              >
                <Text>2</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ height: 30, width: 30, margin: 10, padding: 3, borderRadius: 10, borderWidth: 1, backgroundColor: "white", justifyContent: "center", alignItems: "center", }}
                onPress={() => onPressLearnMore(3)}
            
                backgroundColor="#841584"

              >
                <Text>3</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ height: 30, width: 30, margin: 10, padding: 3, borderRadius: 10, borderWidth: 1, backgroundColor: "white", justifyContent: "center", alignItems: "center", }}
                onPress={() => onPressLearnMore(4)}    
                backgroundColor="#841584"
              >
                <Text>4</Text>
              </TouchableOpacity>
            </View>
          </View>


        </ScrollView>
      </ImageBackground>
    </View >
  );
}
function HomeScreenDawer() {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Detail" component={DetailScreen} />
    </Drawer.Navigator>
  );
}
function HomeScreenTab() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarStyle: {
          height: 50,
          paddingHorizontal: 5,
          paddingTop: 0,
          backgroundColor: "white",
          position: "absolute",
          borderTopWidth: 0,
        },

        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            if (focused == true) {
              return <AntDesign name="home" size={24} color="red" />;
            } else {
              return <AntDesign name="home" size={24} color="black" />;
            }
          } else if (route.name === "Favourite") {
            if (focused == true) {
              return <Ionicons
                name="ios-bookmark-outline"
                size={24}
                color="red"
              />
            } else {
              return <Ionicons
                name="ios-bookmark-outline"
                size={24}
                color="black"
              />
            }
          }
          else if (route.name === "User") {
            if (focused == true) {
              return <FontAwesome name="user-o" size={24} color="red" />;
            } else {
              return <FontAwesome name="user-o" size={24} color="black" />;
            }
          }
        },
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreenDawer}
        options={{ headerShown: false }}
      />
      <Tab.Screen name="Favourite" component={FavouriteScreen} />

      <Tab.Screen name="User" component={UserScreen} />
    </Tab.Navigator>
  );
}
const Styles = StyleSheet.create({
  fontWeightBold: { fontWeight: "bold" },
  h0: { fontSize: 36 },
  h1: { fontSize: 24 },
  h2: { fontSize: 18 },
  h3: { fontSize: 13 },
  h4: { fontSize: 12 },
  h5: { fontSize: 9.7 },
  container: {
    flex: 1,
    flexDirection: "column",
  },
  containerTop: {
    height: 380,
    width: "100%",
  },
  ContainerNav: {
    flexDirection: "row",
  },
  SlideShow: {
    flex: 1,
    paddingBottom: 10


  },
  itemNavTop: {
    backgroundColor: "white",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderRadius: 13,
    elevation: 3,
    marginLeft: 10,
    marginRight: 10,
    paddingLeft: 5,
    paddingRight: 5
  },
  containerContent: {
    marginBottom: 50,
    height: "auto",
  },
  ListPostHorizontal: {
    height: 300,
    width: "auto",
  },
  ListPostVertical: {
    height: "auto",
    width: "auto",
  },
  containerItemListPost: {
    margin: 10,
    flex: 1,
    borderRadius: 13,
    backgroundColor: "white",
    height: "auto",
    width: 250,
    marginLeft: 10,
    marginRight: 10,
    elevation: 5,
  },
  containerItemListPostVertical: {
    margin: 15,
    flex: 1,
    borderRadius: 13,
    backgroundColor: "white",
    height: 400,
    width: "auto",
    elevation: 5,
    flexDirection: "column",
  },
  itemImgPost: {
    borderTopLeftRadius: 13,
    borderTopRightRadius: 13,
    flex: 1.3,
  },
  itemImgPostVertical: {
    borderTopLeftRadius: 13,
    borderTopRightRadius: 13,
    flex: 1.5,
  },
  itemInfor: {
    flex: 1,
  },
  itemTitle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 5,
  },
  itemTitleVertical: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 5,
  },
  itemActive: {
    flex: 1,
    borderBottomLeftRadius: 13,
    borderBottomRightRadius: 13,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 5,
    paddingRight: 5,
  },

  containerFooter: {
    height: 200,
    width: "100%",
    backgroundColor: "gray",
  },
  absolute: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});

export default HomeScreenTab;
