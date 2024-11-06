import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Pressable, View } from "react-native";
import { StyleSheet, TextInput } from "react-native";

const CustomTextInput = ({
  isPassword = false,
  iconName = "lock",
  inputTxt = "",
  placeholder = "input text",
  setInputTxt = () =>{},
  editable = true
}) => {
  const [isHiding, setIsHiding] = useState(isPassword);
  return (
    <View style={styles.outerContainer}>
      <Ionicons name={isPassword ? "lock-closed" :iconName} />
      <TextInput
        style={styles.textInputContainer}
        onChangeText={setInputTxt}
        value={inputTxt}
        secureTextEntry = {isHiding}
        placeholder={placeholder}
        placeholderTextColor={"gray"}
        editable = {editable}
      />
      {isPassword && (
        <Pressable onPress={() =>{setIsHiding(x=> !x)}}>
          <Ionicons name = {isHiding ? "eye" : "eye-off"}/>
        </Pressable>
      )}
    </View>
  );
};

export default CustomTextInput;

const styles = StyleSheet.create({
  outerContainer: {
    padding: 5,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 4,
    flexDirection:"row",
    justifyContent:"center",
    alignItems:"center",
    backgroundColor:"white",
    gap:8,
  },
  textInputContainer: {
    flex: 1,

  },
});
