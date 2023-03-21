import axios from "axios";

async function fetchData(url) {
    try{
    console.log("AXIOS URL", url);
    const response = await axios.get(url)
    return response;
    } catch (error) {
        console.log(error);
        return null;
    }
  }  
  export default fetchData;