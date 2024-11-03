import axios from 'axios';
import { useContext, createContext, useState } from 'react';

export const UserContext = createContext({
    value: {
        username: null,
        imgUri: null
    },
    getUser: async (username) => {},
    createUser: async (username, password, imgUri) => {},
    checkUser: async (username, password) => {}
});

const UserProvider = ({ children }) => {
    const [value, setValue] = useState({});

    const checkUser = async (username, password) => {
        
        try {
            const response = await axios.get(`http://localhost:8880/users`, {
                params:{"username": username, "password": password}
            })
            
            return response.data.message;        
     
        } catch (error) {
            console.error("Error in checkUser:", error);
            return false;
        }
    };

    const getUser = async (username) => {
        try {
            const response = await axios.get(`http://localhost:8880/users/${username}`);
            setValue({
                username: response.data.message.username,
                imgUri: response.data.message.imgUri
            });
            return response.data.message;
        } catch (error) {
            console.error("Error in getUser:", error);
            return null;
        }
    };

    const createUser = async (username, password, imgUri) => {
        let config = {
            headers: {
              "Content-Type": "application/json",
              'Access-Control-Allow-Origin': '*',
            }
            }
        try {
            const response = await axios.post(`http://localhost:8880/users`, {
                username,
                password,
                imgUri
            },config);
            return response.data;
        } catch (error) {
            console.error("Error in createUser:", error);
            return null;
        }
    };

    return (
        <UserContext.Provider
            value={{
                value: value,
                getUser: getUser,
                checkUser: checkUser,
                createUser: createUser
            }}
        >
            {children}
        </UserContext.Provider>
    );  
};

export default UserProvider;
