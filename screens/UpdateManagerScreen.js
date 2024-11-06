import { StyleSheet, TextInput, View, Text, Alert, Button } from "react-native";
import Colors from "../constants/Colors.js";
import CustomTextInput from "../components/CustomTextInput.js";
import { useContext, useLayoutEffect, useState } from "react";
import { UserContext } from "../stores/UserContext.js";
import { useRoute } from "@react-navigation/native";

const UpdateManagerScreen = ({ navigation, route }) => {
  const [user, setUser] = useState({});
  const context = useContext(UserContext);
  const initUsername = route.params.username;

  useLayoutEffect(() => {
    const InitUser = async () => {
      const res = await context.getUserByName(initUsername);
      console.log(res);
      setUser(res);
    };
    InitUser();
  }, []);

  const editPassword = (pwd) =>{
    setUser((x)=>{
        return {...x, password: pwd}
    })
  }

  const update = async () => {
    const res = await context.updateUser(user.username, user.password, user.imgUri, user.typeUser);
    if (res == true) {
      navigation.navigate("ManagerScreen");
    } else {
      console.log("cap nhat ko thanh cong");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <Text
          style={[
            { textAlign: "center", fontWeight: "bold" },
            styles.textColor,
          ]}
        >
          Cap nhat tai khoan
        </Text>
        {/* tai khoan */}
        <View>
          <Text style={styles.textColor}>Tài khoản</Text>
          <CustomTextInput
            inputTxt={user.username}
            iconName="person"
            isPassword={false}
            editable={false}
          />
        </View>
        {/* mat khau */}
        <View>
          <Text style={styles.textColor}>Mat khau</Text>
          <CustomTextInput
            inputTxt={user.password}
            setInputTxt={editPassword}
            iconName="person"
            isPassword={true}
          />
        </View>
        {/* imgUrl */}
        <View>
          <Text style={styles.textColor}>Img Uri</Text>
          <CustomTextInput
            inputTxt={user.imgUri}
            setInputTxt={ (uri) => setUser((x)=>{
                return {...x, imgUri: uri}
            })}
            iconName="person"
            isPassword={false}
            editable={false}
          />
        </View>
        {/* type*/}
        <View>
          <Text style={styles.textColor}>Kieu user</Text>
          <CustomTextInput
            inputTxt={user.typeUser}
            setInputTxt={ (type) => setUser((x)=>{
                return {...x, typeUser: type}
            })}
            iconName="person"
            isPassword={false}
            editable={false}
            placeholder="user|admin"
          />
        </View>

        <View
          style={{
            marginTop: 12,
            flexDirection: "row",
            gap: 12,
            justifyContent: "center",
          }}
        >
          <Button onPress={update} title="Sua" />
          <Button
            onPress={() => {
              navigation.navigate("LoginScreen");
              context.value = {}
            }}
            title="Log out"
          />
        </View>
      </View>
    </View>
  );
};

export default UpdateManagerScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  form: {
    width: 300,
    padding: 12,
    height: 500,
    backgroundColor: Colors.primary,
    shadowColor: "#171717",
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.7,
    shadowRadius: 3,
    flexDirection: "column",
    justifyContent: "blue",
    borderRadius: 8,
    gap: 8,
  },
  textColor: {
    color: "white",
  },
});
