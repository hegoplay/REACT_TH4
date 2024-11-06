import axios from "axios";
import { useContext, createContext, useState } from "react";
import dotenv from "dotenv";

export const UserContext = createContext({
  value: { username: null, imgUri: null, typeUser: null },
  getUser: async (username) => {},
  getUserByName: async (username) => {},
  createUser: async (username, password, imgUri) => {},
  checkUser: async (username, password) => {},
  updateUser: async (username, password, imgUri,typeUser) => {},
  deleteUser: async (username) => {},
  getUsers: async () => {},
});

const SERVER_URL = "http://localhost:8880/api/users";

const UserProvider = ({ children }) => {
  const [value, setValue] = useState({
    username: null,
    imgUri: null,
    typeUser: null,
  });

  const checkUser = async (username, password) => {
    try {
      const response = await axios.get(`${SERVER_URL}/check`, {
        params: { username: username, password: password },
      });

      return true;
    } catch (error) {
      console.error("Error in checkUser:", error);
      return false;
    }
  };

  const getUser = async (username) => {
    try {
      const response = await axios.get(`${SERVER_URL}/${username}`);
      setValue({
        username: response.data.username,
        imgUri: response.data.imgUri,
        typeUser: response.data.typeUser,
      });
      return true;
    } catch (error) {
      console.error("Error in getUser:", error);
      return null;
    }
  };

  const getUserByName = async (username) => {
    try {
      const response = await axios.get(`${SERVER_URL}/${username}`);
      return response.data;
    } catch (error) {
      console.error("Error in getUser:", error);
      return null;
    }
  };

  const createUser = async (username, password, imgUri) => {
    let config = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    };
    try {
      console.log("YES");
      const response = await axios.post(
        `${SERVER_URL}`,
        {
          username,
          password,
          imgUri,
        },
        config
      );
      if (response.message != null) {
        return { message: response.message };
      }
      return { message: true };
    } catch (error) {
      console.error("Error in createUser:", error);
      return null;
    }
  };

  const updateUser = async (
    username,
    password,
    imgUri = value.imgUri,
    typeUser = "user"
  ) => {
    try {
      const response = await axios.put(`${SERVER_URL}/${username}`, {
        password,
        imgUri,
        typeUser,
      });
      return true;
    } catch (error) {
      console.error("Error in getUser:", error);
      return null;
    }
  };
  const deleteUser = async (username) => {
    try {
      const response = await axios.delete(`${SERVER_URL}/${username}`);
      return true;
    } catch (error) {
      console.error("Error in getUser:", error);
      return null;
    }
  };

  const getUsers = async () => {
    try {
      const response = await axios.get(`${SERVER_URL}`);
      return response.data;
    } catch (error) {
      console.error("Error in getUser:", error);
      return null;
    }
  };

  return (
    <UserContext.Provider
      value={{
        value: value,
        getUser: getUser,
        checkUser: checkUser,
        createUser: createUser,
        deleteUser: deleteUser,
        updateUser,
        getUsers,
        getUserByName
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
