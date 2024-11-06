import { StyleSheet, TextInput, View,Text, Alert, Button } from "react-native";
import Colors from "../constants/Colors.js";
import CustomTextInput from "../components/CustomTextInput.js";
import { useContext, useState } from "react";
import { UserContext } from "../stores/UserContext.js";

const Register = ({navigation}) => {
    const context = useContext(UserContext);
    const [username,setUsername] = useState(context.value.username);
    const [password, setPassword] = useState("");
    const [imgUri,setImgUri] = useState("")
    
    const deleteEvent = async () =>{
        const res = await context.deleteUser(username);
        if (res == true){
            navigation.navigate("LoginScreen");
        }
        else{
            console.log("user ko ton tai")
        }
    }

    const update = async () =>{
        const res = await context.updateUser(username,password);
        if (res == true){
            navigation.goBack()
        }
        else{
            console.log("cap nhat ko thanh cong")
        }
    
    }

    return (
        <View style = {styles.container}>
            <View style = {styles.form}>
                <Text style= {[{textAlign:"center", fontWeight:"bold"},styles.textColor]}>Cap nhat tai khoan</Text>
                {/* tai khoan */}
                <View>
                    <Text style={styles.textColor}>Tài khoản</Text>
                    <CustomTextInput
                        inputTxt={username}
                        setInputTxt={setUsername}
                        iconName="person"
                        isPassword={false}
                        editable = {false}
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
                
                <View style = {{marginTop:12, flexDirection: "row", gap: 12,justifyContent:"center"}}>
                    <Button onPress={deleteEvent} title="Xoa"/>
                    <Button onPress={update} title="Sua"/>
                    <Button onPress={() =>{navigation.navigate("LoginScreen")}} title="Log out"/>
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
        justifyContent:"blue",
        borderRadius: 8,
        gap: 8,
    
    },
    textColor:{
        color:'white'
    }
})