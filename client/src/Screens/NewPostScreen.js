// In App.js in a new project
import {post} from "../Components/response";

import React, { useState, useRef } from "react";
import { Picker } from '@react-native-picker/picker';
import {
  TouchableOpacity,
  Image,
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView
} from "react-native";

// Icons
import { Ionicons } from "@expo/vector-icons";


function NewPostScreen({ navigation }) {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [keySearch, setKeySearch] = useState("Coffe");
  const [content, setContent] = useState("");
  const [uriImg, setUriImg] = useState("https://www.nguonduphong.com/wp-content/themes/hongtq_dev/img/no-image.jpeg");

  const pickerRef = useRef();

  function open() {
    pickerRef.current.focus();
  }

  function close() {
    pickerRef.current.blur();
  }

  function checkValidate() {
    if (title.length() > 2 || title.length() < 100) {
      if (content != '') {
        if (location != '' || location.length() < 100) {
          if (uriImg != '') {
            return true;
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

  }

  const addPostNew = () => {

    if (title  != '' || title < 100) {
      if (content != '') {
        if (location != '') {
          if (uriImg != '') {
           
      console.log("Post Bài viết")
      fetch('http://'+post+'/addPostNew/', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          idUserNewPost: 1,
          titleNewPost: title,
          contentNewPost: content,
          locationNewPost: location,
          keySearchNewPost: keySearch,
          uriImgNewPost: uriImg
        })

      }).then((response) => {
        console.log(JSON.stringify(response, null, 4))
        return response.json()
        if (response == "ok") {
          alert(" Đăng bài thành công")

        }
      });
      // Load lại trang khi thêm

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

    navigation.navigate('user')
  }


  // thêm sản phẩm

  return (
    // <ScrollView>
  
    <View style={Styles.container}>
    
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
              onPress={() => addPostNew() }
            >
              <Text>Đăng</Text>
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
              />
              <View style={{ flex: 1, padding: 5 }}>

                <Picker
                  style={{ borderWidth: 1, borderColor: 'gray' }}
                  ref={pickerRef}
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
            numberOfLines={4}
            onChangeText={setContent}
          />
        </View>
        <View style={{ flex: 1, flexDirection: "column" }}>
          <TextInput
            style={[{ borderLeftWidth: 1, borderLeftColor: 'gray', paddingLeft: 10, color: "black" }, Styles.h3]}
            placeholder={"Uri ảnh/"}
            onChangeText={setUriImg}
          />
          <Image source={{ uri: `${uriImg}` }} style={{ flex: 1, width: '100%' }} resizeMode={'cover'} />
        </View>
      </View>
   
    </View>
             
    // {/* </ScrollView> */}
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
export default NewPostScreen;
