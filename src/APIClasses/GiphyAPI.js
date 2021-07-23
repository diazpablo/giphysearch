import http from "../services/httpsService";

const gifApiHost = "https://api.giphy.com/v1/gifs/";
// const stickersApiHost = "https://api.giphy.com/v1/stickers/";

const apiKey = "dc6zaTOxFJmzC";

class GiphyAPI {

  static searchGifs = async data => {
    // console.log("GiphyAPI/searchGifs", data)
    try {
      const response = await http.get(`${gifApiHost}search`, {
        params: {
          api_key: apiKey,
          ...data
        }
      });
      return response.data;
    } catch (error) {
      if (error.response) {
        console.error("GiphyAPI/searchGifs Response ERROR Response", error.response.data);
        throw new Error(error.response.data);
      } else if (error.request) {
        console.log("GiphyAPI/searchGifs Response ERROR Request", error.request);
        return null;
      } else {
        console.log("GiphyAPI/searchGifs Response ERROR", error);
        return null;
      }
    }

  };

}

export default GiphyAPI;