import { useContext, useLayoutEffect, useState } from "react";
import { Button, FlatList, Image, StyleSheet, Text, View } from "react-native";
import { UserContext } from "../stores/UserContext";
import { ScrollView } from "react-native-web";

const ManagerScreen = ({ navigation }) => {
  const context = useContext(UserContext);

  const [userList, setUserList] = useState([]);

  const deleteUser = async (username) => {
    const res = await context.deleteUser(username);
    if (res == true) {
      alert("xoa thanh cong");
      navigation.navigate("ManagerScreen");
    }
    // console.log(username)
  };
  const update = (username) => {
    navigation.navigate("UpdateManagerScreen", { username: username });
  };
  useLayoutEffect(() => {
    const getUsers = async () => {
      const users = await context.getUsers();
      setUserList(users);
    };
    getUsers();
  }, [deleteUser]);

  const TagItem = (item) => {
    return (
      <View
        style={[styles.itemStyle, item.typeUser == "admin" && styles.isRoot]}
      >
        <Image
          source={{ uri: item.imgUri }}
          style={{ width: 36, height: 36, borderRadius: "50%" }}
        />
        <Text style={{ fontSize: 12, flex: 1 }}>{item.username}</Text>
        <Button title="Sua" onPress={update.bind(this, item.username)} />
        <Button title="Xoa" onPress={deleteUser.bind(this, item.username)} />
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <FlatList
        data={userList}
        renderItem={({ item }) => {
          return TagItem(item);
        }}
      />
      <Button
        onPress={() => {
          navigation.navigate("LoginScreen");
        }}
        title="Log out"
      />
    </ScrollView>
  );
};

export default ManagerScreen;

const styles = StyleSheet.create({
  itemStyle: {
    flexDirection: "row",
    padding: 6,
    borderColor: "gray",
    borderWidth: 2,
    borderRadius: 6,
    gap: 12,
    alignItems: "center",
    marginBottom: 8,
  },
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "white",
    paddingHorizontal: 12,
    gap: 8,
  },
  isRoot: {
    backgroundColor: "hotpink",
  },
});
