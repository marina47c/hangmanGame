import axios from 'axios';
import { GetHighscoreData, PostHighscoreData, Quote } from 'src/types/globalTypes';

const getQuoteEndpoint: string = 'https://api.quotable.io/random';
const highscoresEndpoint: string = 'https://my-json-server.typicode.com/stanko-ingemark/hang_the_wise_man_frontend_task/highscores';
                           

export const getQuote = async (): Promise<Quote | null> => {
  try {
    const response = await axios.get(getQuoteEndpoint);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching the quote', error);
    return null;
  }
};

export const postHighscore = async (data: PostHighscoreData):  Promise<any> => {
  try {
    const response = await axios.post(highscoresEndpoint, data, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error while posting the result', error);
    return null;
  }
}

export const getHighscores = async (): Promise<GetHighscoreData | null> => {
  try {
    const response = await axios.get(highscoresEndpoint);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error while getting highscore data', error);
    return null;
  }
}



