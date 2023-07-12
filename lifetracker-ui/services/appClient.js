import axios from 'axios';

const PRODUCTION_API_BASE_URL = "postgres://lifetracker_zqfv_user:T9jmHqTow7TDnB0wSFpLnYx00Vo9ctZC@dpg-cim4ef59aq07cb0f47u0-a/lifetracker_zqfv";
const DEVELOPMENT_API_BASE_URL = "http://localhost:3001";
const API_BASE_URL = process.env.NODE_ENV === "production" ? PRODUCTION_API_BASE_URL : DEVELOPMENT_API_BASE_URL;

class ApiClient {
  constructor(remoteHostUrl) {
    this.remoteHostUrl = remoteHostUrl;
    this.token = null;
  }

  setToken(token) {
    this.token = token;
  }

  async request({ endpoint, method = 'GET', data = {} }) {
    const url = `${this.remoteHostUrl}/${endpoint}`;
    const headers = {
      "Content-Type": "application/json"
    };

    if (this.token) {
      headers["Authorization"] = `Bearer ${this.token}`;
      headers["User-ID"] = `${this.token.id}`;

    }

    try {
      const res = await axios({ url, method, data, headers });
      return { data: res.data, error: null };
    } catch (error) {
      console.error({ errorResponse: error.response });
      const message = error?.response?.data?.error?.message;
      return { data: null, error: message || String(error) };
    }
  }

  async loginUser(credentials) {
    return await this.request({ endpoint: 'auth/login', method: 'POST', data: credentials });
  }

  async signupUser(credentials) {
    return await this.request({ endpoint: 'auth/register', method: 'POST', data: credentials });
  }
  

  async fetchUserFromToken() {
    return await this.request({ endpoint: 'auth/me', method: 'GET' });
  }

  async addEx(credentials) {
    try {
      const response = await this.request({ endpoint: 'auth/addEx', method: 'POST', data: credentials });
      if (response.status === 200) {
        // Success: Handle the successful response
        console.log('Exercise added successfully!');
      } else {
        // Error: Handle the error response
        console.error('Failed to add exercise:', response.error);
      }
      return response;
    } catch (error) {
      console.error('Error:', error);
      return { data: null, error: 'An error occurred while adding the exercise.' };
    }
  }
  

  async addN(credentials) {
    try {
      const response = await this.request({ endpoint: 'auth/addN', method: 'POST', data: credentials });
      if (response.status === 200) {
        // Success: Handle the successful response
        console.log('Nutrition added successfully!');
      } else {
        // Error: Handle the error response
        console.error('Failed to add nutrtion:', response.error);
      }
      return response;
    } catch (error) {
      console.error('Error:', error);
      return { data: null, error: 'An error occurred while adding the nutrition.' };
    }
  }

  
  async addS(credentials) {
    try {
      const response = await this.request({ endpoint: 'auth/addS', method: 'POST', data: credentials });
      if (response.status === 200) {
        // Success: Handle the successful response
        console.log('Sleep added successfully!');
      } else {
        // Error: Handle the error response
        console.error('Failed to add sleep:', response.error);
      }
      return response;
    } catch (error) {
      console.error('Error:', error);
      return { data: null, error: 'An error occurred while adding the sleep.' };
    }
  }

  async getExercises() {
    console.log("entered the excercises")
    return await this.request({ endpoint: 'auth/exercises', method: 'GET' });
  }

  async getNutrition() {
    console.log("grabbing the nutritions")
    return await this.request({ endpoint: 'auth/nutritions', method: 'GET' });
  }

  async getSleep() {
    return await this.request({ endpoint: 'auth/sleeps', method: 'GET' });
  }

  async getMaxSleep() {
    return await this.request({ endpoint: 'auth/maxsleep', method: 'GET' });
  }

  async getAvgCal() {
    return await this.request({ endpoint: 'auth/avgcal', method: 'GET' });
  }

  async getTotalE() {
    return await this.request({ endpoint: 'auth/totalE', method: 'GET' });
  }
  
  async getExerciseById(id) {
    console.log("????bruhhhh")
    try {
      const response = await this.request({ endpoint: `auth/exercise/:${id}`, method: 'GET' });
      if (response.status === 200) {
        return { exercise: response.data.exercise };
      } else {
        throw new Error(response.error);
      }
    } catch (error) {
      throw new Error('An error occurred while fetching the exercise.');
    }
  }

  
  async getSleepById(id) {
    try {
      const response = await this.request({ endpoint: `auth/sleep/${id}`, method: 'GET' });
      if (response.data) {
        console.log(response.data.sleep)
        return { sleep: response.data.sleep };
      } else {
        throw new Error(response.error);
      }
    } catch (error) {
      throw new Error('An error occurred while fetching the sleep.');
    }
  }
  
}

export default new ApiClient(API_BASE_URL);
