import axios from "axios";

const text = async () => {  
    try {
        const response = await axios.get(`http://localhost:8880/users`, {
            params:{"username": "hegoplay4", "password": "abdsc"}
        });
        return response.data;
    } catch (error) {   
        console.error("Error in checkUser:", error);
        return null;            
    }
}



const res = await text();

console.log(res)