import { StyleSheet, TextInput, View,Text, Alert, Button } from "react-native";
import Colors from "../constants/Colors.js";
import CustomTextInput from "../components/CustomTextInput.js";
import { useContext, useState } from "react";
import { UserContext } from "../stores/UserContext.js";

const Register = ({navigation}) => {
    const [username,setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [imgUri,setImgUri] = useState("")
    const context = useContext(UserContext);
    
    const login = () =>{
        
        navigation.goBack();
    }

    const register = async () =>{
        const res = await context.createUser(username,password,imgUri);
        if (res.message == true){
            navigation.navigate("LoginScreen")
            Alert.alert("Dang ki thanh cong")
        }
        else{
            Alert.alert(res.message)
        }
    }

    return (
        <View style = {styles.container}>
            <View style = {styles.form}>
                <Text style= {[{textAlign:"center", fontWeight:"bold"},styles.textColor]}>Đăng ký</Text>
                {/* tai khoan */}
                <View>
                    <Text style={styles.textColor}>Tài khoản</Text>
                    <CustomTextInput
                        inputTxt={username}
                        setInputTxt={setUsername}
                        iconName="person"
                        isPassword={false}
                    />
                </View>
                {/* mat khau */}
                <View>
                    <Text style={styles.textColor}>Mat khau</Text>
                    <CustomTextInput
                        inputTxt={password}
                        setInputTxt={setPassword}
                        iconName="person"
                        isPassword={true}
                    />
                </View>
                {/* imgUri */}
                <View>
                    <Text style={styles.textColor}>ImgUri</Text>
                    <CustomTextInput
                        inputTxt={imgUri}
                        setInputTxt={setImgUri}
                        iconName="image-outline"
                        isPassword={false}
                        placeholder="give image uri"
                    />
                </View>
                
                <View style = {{marginTop:12, flexDirection: "row", gap: 12,justifyContent:"center"}}>
                    <Button onPress={login} title="Dang nhap"/>
                    <Button onPress={register} title="Dang ky"/>
                </View>
            </View>
        </View>
    )
}

export default Register;

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems:"center",
        justifyContent:"center",
        backgroundColor:"white"
    },
    form:{
        width: 300,
        padding:12,
        height: 500,
        backgroundColor: Colors.primary,
        shadowColor:"#171717",
        shadowOffset:{width: 2, height: 4},
        shadowOpacity: 0.7,
        shadowRadius: 3,
        flexDirection: "column",
        justifyContent:"center",
        borderRadius: 8,
        gap: 8,
    
    },
    textColor:{
        color:'white'
    }
})