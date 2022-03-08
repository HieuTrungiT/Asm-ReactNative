import {post} from "../Components/response";
import React, { useEffect, useState, useRef } from 'react';
import { Picker } from '@react-native-picker/picker';
import { Animated } from 'react-native';

import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
  FlatList,
  Modal,
  Pressable,
  Alert,
  TextInput,
} from "react-native";

// iCon
import { FontAwesome5 } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as Animatable from 'react-native-animatable';
// MyCustomComponent = Animatable.createAnimatableComponent(MyCustomComponent);
function DetailsScreen({ navigation }) {
  const [dataPost, setDataPost] = useState([]);
  const [dataUser, setDataUser] = useState([])
  const [modalVisible, setModalVisible] = useState(false);
  const [idDeletePost, setIdDeletePost] = useState()

  const [idPost, setIdPost] = useState();
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [keySearch, setKeySearch] = useState("Coffe");
  const [content, setContent] = useState("");
  const [uriImg, setUriImg] = useState("");
  // Icons


  const [height, setHeight] = useState("0%")

  const [maginTopFix, setMaginTopFix] = useState("200%")
  // *********************Server MySQL******************//
  // lấy data Bài đăng and data userAccout
  const getDataPost = async () => {
    try {
      const response = await fetch('http://'+post+'/post/');
      const json = await response.json();
      console.log("json")
      setDataPost(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  // khi chạy xong giao diện thì bắt đầu load dữ liệu Bài đăng
  useEffect(() => {
    getDataPost();
  }, []);


  // xóa sản phẩmco
  const showModel = (item) => {
    setModalVisible(!modalVisible)
    setIdDeletePost(item.idPost)
    showUpdatePost(item)
  }
  const showDeletePost = () => {
    setModalVisible(!modalVisible)

    Alert.alert(
      "Xóa",
      "Bạn có muốn xóa bỏ bài viết này!!",
      [
        {
          text: "Hủy",
          onPress: () => console.log("Hủy"),
        },
        { text: "Đồng ý", onPress: () => xoaPost() }
      ]
    );
  }

  const xoaPost = () => {
    console.log(idDeletePost, "os")
    console.log("Xoa San Pham")
    fetch('http://'+post+'/deletePost/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        idXoa: idDeletePost
      })

    }).then((response) => {
      console.log(JSON.stringify(response, null, 4))
      return response.json()
      if (response == "ok") {
        alert(" Xóa thành công")
        getDataPost();
      }
    });
    getDataPost();
  }

  const showUpdatePost = (item) => {


    // setIdDeletePost(item.idPost)
    setIdPost(item.idPost)
    setTitle(item.title)
    setLocation(item.location)
    setKeySearch(item.keySearch)
    setContent(item.content)
    setUriImg(item.imgPost)

  }
  const showDialog = () => {
    setHeight('100%');
    setMaginTopFix('0%')
    setModalVisible(!modalVisible)
  }

  const hinderFrom = () => {
    setHeight('0%');
    setMaginTopFix('200%')

  }





  const pickerRef = useRef();

  function open() {
    pickerRef.current.focus();
  }

  function close() {
    pickerRef.current.blur();
  }



  const addPostNew = () => {

    if (title != '' || title < 100) {
      if (content != '') {
        if (location != '') {
          if (uriImg != '') {

            console.log("Post Bài viết")
            fetch('http://'+post+'/updatePost/', {
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                idPostUpdatePost: idPost,
                titleUpdatePost: title,
                contentUpdatePost: content,
                locationUpdatePost: location,
                keySearchUpdatePost: keySearch,
                uriImgUpdatePost: uriImg
              })

            }).then((response) => {
              console.log(JSON.stringify(response, null, 4))
              return response.json()
              if (response == "ok") {
                alert(" Đăng bài thành công")

              }
              getDataPost();
            });
            // Load lại trang khi thêm
            getDataPost();
          } else {
            alert("Link ảnh không được bỏ trống")
            return false;
          }
        } else {
          alert("Vị trí không được bỏ rỗng, và không được lớn hơn 100 kí tự")
          return false;
        }
      } else {
        alert("Nội dung không được bỏ rỗng")
        return false;
      }
    } else {
      alert("Tiêu đề không được nhỏ hơn 2 kí tự và lớn hơn 100 kí tự")
      return false;
    }

    getDataPost();
    hinderFrom()
  }


  return (
    <View style={Styles.container}>
      <ScrollView nestedScrollEnabled={true}>
        {/* container infor user */}
        <View style={Styles.Container_InforUser}>
          <View style={[, Styles.inforTop]}>
            <View style={Styles.inforTop_ImgAvata}>
              <Image
                style={{
                  height: 100,
                  width: 100,
                  borderRadius: 100,
                }}
                source={{
                  uri:
                    "https://www.malemodelscene.net/wp-content/uploads/2022/01/Simon-Nessman-Massimo-Dutti-Winter-2022-00-364x205.jpg",
                }}
              />
            </View>
            <View style={Styles.inforTop_Content}>
              <View
                style={{
                  flex: 1,
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text style={[Styles.h1, Styles.fontWeightBold]}>8</Text>
                <Text style={(Styles.h3, { color: "gray" })}>Bài viết</Text>
              </View>
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <Text style={[Styles.h1, Styles.fontWeightBold]}>11</Text>
                <Text style={(Styles.h3, { color: "gray" })}>
                  Người theo..
                </Text>
              </View>
              <View
                style={{
                  flex: 1,
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text style={[Styles.h1, Styles.fontWeightBold]}>1</Text>
                <Text style={(Styles.h3, { color: "gray" })}>
                  Đang theo..
                </Text>
              </View>
            </View>
          </View>
          <View style={Styles.inforBottom}>
            <View style={{ flexDirection: "row" }}>
              <View style={{ flex: 1 }}>
                <Text style={Styles.h3}>Vũ Hiếu Trung (Sứa)</Text>
                <Text style={[Styles.h3, { color: "gray" }]}>05/10/2001</Text>
              </View>
              <View style={{ flex: 1,justifyContent: "center",alignItems: "flex-end",marginRight:20}}>
                <Animated.View animation="zoomInUp">
                  <TouchableOpacity onPress={() => getDataPost()}>
                    <Ionicons name="ios-reload-sharp" size={24} color="red" />
                  </TouchableOpacity>
                </Animated.View>

              </View>
            </View>

            {/* acti Button */}
            <TouchableOpacity
              style={{
                marginTop: 15,
                borderColor: "gray",
                borderWidth: 1,
                padding: 10,
                alignItems: "center",
              }}
              onPress={() => navigation.navigate('Post')}
            >
              <Text style={[Styles.h3, Styles.fontWeightBold]}>
                Thêm bài viết
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* container view post */}
        <View style={Styles.Container_ViewPost}>
          <View style={Styles.ListPostVertical}>
            {/* items */}
            <FlatList

              data={dataPost}
              keyExtractor={({ id }, index) => id}
              renderItem={({ item }) => (
                <View style={Styles.containerItemListPostVertical}>
                  <Modal
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                      setModalVisible(!modalVisible);
                    }}
                  >
                    <View style={Styles.centeredView}>
                      <View style={Styles.modalView}>
                        <Pressable
                          style={[Styles.button, Styles.buttonClose, { backgroundColor: "white" }]}
                          onPress={() => setModalVisible(!modalVisible)}
                        >
                          <Text style={Styles.textStyle, { color: "black" }}>Hủy </Text>
                        </Pressable>
                        <Pressable
                          style={[Styles.button, Styles.buttonClose, { backgroundColor: "white" }]}
                          onPress={() => showDialog()}
                        >
                          <Text style={Styles.textStyle, { color: "black" }}>Sửa bài viết </Text>
                        </Pressable>
                        <Pressable
                          style={[Styles.button, Styles.buttonClose, { backgroundColor: "red" }]}
                          onPress={() => showDeletePost()}
                        >
                          <Text style={Styles.textStyle}>Xóa bài viết</Text>
                        </Pressable>
                      </View>
                    </View>
                  </Modal>

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
                        onPress={() => showModel(item)}

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
                          <View style={{ flexDirection: "column", marginLeft: 5 }}>
                            <Text>Hiếu Trung</Text>
                            <View
                              style={{
                                alignItems: "center",
                                flexDirection: "row",
                              }}
                            >
                              <Text>1 giờ .</Text>
                              <Ionicons name="ios-earth" size={17} color="black" />
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
                        <View style={{ flex: 4, paddingLeft: 5, paddingRight: 5 }}>
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
              )}
            />

          </View>
        </View>
      </ScrollView>
      <Animatable.View animation="zoomInUp" style={{ display: "none", height: `${height}`, width: "100%", position: "absolute", backgroundColor: 'transparent', opacity: 1 }}>

        <TouchableOpacity style={{ flex: 1, width: "auto", marginBottom: 10 }} onPress={() => hinderFrom()} />
        <View style={{ marginTop: `${maginTopFix}`, flex: 7, elevation: 5, borderTopRightRadius: 43, borderTopLeftRadius: 43, height: "100%", width: "100%", backgroundColor: 'white' }} >


          <View style={{ flexDirection: "row" }}>
            <View style={Styles.containerInforUser}>
              <Image
                style={{
                  borderRadius: 50,
                  height: 55,
                  width: 55,
                  resizeMode: "cover",
                }}
                source={{
                  uri:
                    "https://www.malemodelscene.net/wp-content/uploads/2022/01/Simon-Nessman-Massimo-Dutti-Winter-2022-00-364x205.jpg",
                }}
              />
              <View
                style={{
                  flexDirection: "column",
                  height: "100%",
                  paddingTop: 15,
                  marginLeft: 5,
                }}
              >
                <Text style={Styles.h3}>Vũ Hiếu Trung (sứa)</Text>
                <View>
                  <View
                    style={{
                      flexDirection: "row",
                      borderRadius: 13,
                      borderColor: "gray",
                      borderWidth: 1,
                      width: 100,
                      padding: 2,
                    }}
                  >
                    <Ionicons name="ios-earth" size={17} color="black" />
                    <Text>Công khai</Text>
                  </View>
                </View>
              </View>
              <View
                style={{
                  flex: 1,
                  justifyContent: "flex-end",
                  alignItems: "flex-end",
                }}
              >
                <TouchableOpacity
                  style={{
                    padding: 10,
                    borderRadius: 13,
                    borderColor: "gray",
                    borderWidth: 1,
                    flexDirection: "row",
                    justifyContent: "center",
                    margin: 15,
                    width: 80,
                  }}
                  onPress={() => addPostNew()}
                >
                  <Text>Sửa</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={Styles.containerPost}>
            <View style={{ flex: 1 }}>
              <View style={{ flexDirection: "row" }}>
                <TextInput
                  style={[{ color: "black", flex: 1 }, Styles.h1]}
                  placeholder={"Tiêu đề"}
                  multiline
                  numberOfLines={3}
                  onChangeText={setTitle}
                  value={title}
                />
                <View style={{
                  flex: 1, flexDirection: 'column', borderLeftColor: "black",
                  borderLeftWidth: 1,
                }}>
                  <TextInput
                    style={[
                      {
                        flex: 1,
                        paddingLeft: 15,
                        color: "gray",
                      },
                      Styles.h3,
                    ]}
                    placeholder={"Từ khóa VD: Việt nam - coffe"}
                    multiline
                    numberOfLines={4}
                    onChangeText={setLocation}
                    value={location}
                  />
                  <View style={{ flex: 1, padding: 5 }}>

                    <Picker
                      style={{ borderWidth: 1, borderColor: 'gray' }}
                      ref={pickerRef}
                      value={keySearch}
                      selectedValue={keySearch}
                      onValueChange={(itemValue, itemIndex) =>
                        setKeySearch(itemValue)
                      }>
                      <Picker.Item label="Coffe" value="Coffe" />
                      <Picker.Item label="Tea" value="Tea" />
                      <Picker.Item label="Nhà hàng" value="Nhà hàng" />
                      <Picker.Item label="Đô thị" value="Đô thị" />
                      <Picker.Item label="Cảnh vật" value="Cảnh vật" />

                    </Picker></View>
                </View>
              </View>
              <TextInput
                style={[{ color: "black" }, Styles.h3]}
                placeholder={"Nội dung"}
                multiline
                numberOfLines={1}
                onChangeText={setContent}
                value={content}
              />
            </View>
            <View style={{ flex: 1, flexDirection: "column", borderLeftColor: 'red' }}>
              <TextInput
                style={[{ borderLeftWidth: 1, borderLeftColor: 'gray', paddingLeft: 10, color: "black" }, Styles.h3]}
                placeholder={"Uri ảnh/"}
                onChangeText={setUriImg}
                value={uriImg}
              />
              <Image source={{ uri: `${uriImg}` }} style={{ flex: 1, width: '100%' }} resizeMode={'cover'} />
            </View>
          </View>


        </View>


      </Animatable.View>
    </View>
  );
}
const Styles = StyleSheet.create({
  centerView: { justifyContent: "center", alignItems: "center" },
  color: { color: "white" },
  fontWeightBold: { fontWeight: "bold" },
  h0: { fontSize: 36 },
  h1: { fontSize: 24 },
  h2: { fontSize: 18 },
  h3: { fontSize: 15 },
  h4: { fontSize: 12 },
  h5: { fontSize: 9.7 },
  container: { flex: 1 },
  Container_InforUser: { height: "auto", width: "100%", paddingBottom: 15 },

  inforTop: {

    flexDirection: "row",
    flex: 1,
    height: 120,
    justifyContent: "center",
    padding: 15,
  },
  inforTop_ImgAvata: {
    justifyContent: "center",
    flex: 1,
  },
  inforTop_Content: {
    flex: 3,
    marginLeft: 10,
    flexDirection: "row",
  },
  inforBottom: {
    paddingLeft: 15,
    paddingRight: 15,
    flex: 1.5,
  },
  Container_ViewPost: {
    flex: 1,

    marginBottom: 50,
    width: "100%",

  },
  ListPostVertical: {
    height: "auto",
    width: "auto",
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
  itemImgPostVertical: {
    borderTopLeftRadius: 13,
    borderTopRightRadius: 13,
    flex: 1.5,
  },
  itemInfor: {
    flex: 1,
  },
  itemTitleVertical: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 5,
  }, itemActive: {
    flex: 1,
    borderBottomLeftRadius: 13,
    borderBottomRightRadius: 13,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 5,
    paddingRight: 5,
  }, modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 13,
    paddingLeft: 30,
    paddingRight: 30,
    paddingBottom: 10,
    paddingTop: 10,
    elevation: 2,
    margin: 10
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },

  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  containerInforUser: {
    flex: 3,
    height: 80,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    borderBottomColor: "gray",
    borderBottomWidth: 0.5,
    marginLeft: 15,
    marginRight: 15,
  },
  containerPost: {
    height: "100%",
    padding: 15,
  },
});
export default DetailsScreen;
