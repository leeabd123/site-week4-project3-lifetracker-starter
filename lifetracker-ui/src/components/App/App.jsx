import './App.css'
import { Navigate, BrowserRouter, Route, Routes } from "react-router-dom"
import Navbar from "../Navbar/Navbar"
import Home from "../Home/Home"
import ActivityPage from '../ActivityPage/ActivityPage'
import ExercisePage from '../ExercisePage/ExercisePage'
import SleepPage from '../SleepPage/SleepPage'
import NutritionPage from '../NutritionPage/NutritionPage'
import { useState, useEffect } from "react"
import apiClient from '../../../services/appClient'
import Login from '../Login/Login'
import Register from '../Register/Register'
import SleepDetail from '../SleepDetail/SleepDetail';
import ExerciseDetail from '../ExcerciseDetail/ExcerciseDetail'


function App() {
  const [appState, setAppState] = useState({
    user: null,
    isAuthenticated: false,
    email: ""
  });

  const [exercises, setExercises] = useState([]);
  const [nutrition, setNutrition] = useState([]);
  const [sleep, setSleep] = useState([]);
  const [avgCal, setAvgCal] = useState(0);
  const [totalE, setTotalE] = useState(0);
  const [maxSleep, setMaxSleep] = useState(0);
  const [error, setError] = useState(null); 
  
  function clearData() {
    setExercises([]);
    setNutrition([]);
    setSleep([]);
    setAvgCal(0);
    setTotalE(0);
    setMaxSleep(0);
  }

  useEffect(() => {

    const fetchData = async () => {
      try {
        const { data: exerciseData, error: exerciseError } = await apiClient.getExercises();
        if (exerciseData) {
          const exerciseArray = exerciseData.exercises.map((element) => ({
            title: element.title,
            duration: element.duration,
            intensity: element.intensity,
            date: element.date,
            id: element.id
          
          }));
          setExercises(exerciseArray);
        } else {
          console.error(exerciseError);
        }

        const { data: nutritionData, error: nutritionError } = await apiClient.getNutrition();
        if (nutritionData && Array.isArray(nutritionData.nutritions)) {
          const nutritionArray = nutritionData.nutritions.map((element) => ({
            category: element.category,
            calories: element.calories,
            macronutrients: element.nutrients,
            date: element.date,
            id: element.id
          }));
          setNutrition(nutritionArray);
        } else {
          console.error(nutritionError);
        }

        const { data: sleepData, error: sleepError } = await apiClient.getSleep();
        if (sleepData && Array.isArray(sleepData.sleeps)) {
          const sleepArray = sleepData.sleeps.map((element) => ({
            title: element.category,
            duration: element.start_time,
            quality: element.end_time,
            date: element.date,
            id: element.id
          }));
          setSleep(sleepArray);
        } else {
          console.error(sleepError);
        }
      } catch (error) {
        console.error(error);
      }
    };

    // const fetchActivityValues = async () => {
    //   const { data: maxSleep, error: maxSleepError } = await apiClient.getMaxSleep();
    //   if (maxSleep) {
    //     setMaxSleep(maxSleep);
    //   } else {
    //     console.error(maxSleepError)
    //   }
    //   const { data: totalE, error: totalEerror } = await apiClient.getTotalE();
    //   if (totalE) {
    //     setTotalE(totalE);
    //   } else {
    //     console.error(totalEerror)
    //   }
    //   const { data: avgcal, error: avgCalError } = await apiClient.getAvgCal();
    //   if (avgcal) {
    //     setAvgCal(avgcal);
    //   } else {
    //     console.error(avgCalError)
    //   }
    // };

    const fetchUser = async () => {
      const { data, error } = await apiClient.fetchUserFromToken();
      if (data) {
        setAppState((prevState) => ({
          ...prevState,
          user: data.user,
          isAuthenticated: true,
        }));
      }
      if (error) setError(error);
    };

    const token = localStorage.getItem("token");
    if (token) {
      apiClient.setToken(token);
      fetchUser();
      fetchData();
      // fetchActivityValues();
    } else {
      setAppState((prevState) => ({
        ...prevState,
        isAuthenticated: false,
      }));
      clearData();
    }
  }, []);



  return (
    <div className="app">
      <BrowserRouter>
        <Navbar isAuthenticated={appState.isAuthenticated} setAppState={setAppState} />
        <Routes>
          <Route path="/" element={<Home isAuthenticated={appState.isAuthenticated} />} />
          <Route
            path="/Activity"
            element={
              <ActivityPage
                isAuthenticated={appState.isAuthenticated}
                exercises={exercises}
                setExercises={setExercises}
                sleep={sleep}
                setSleep={setSleep}
                nutrition={nutrition}
                setNutrition={setNutrition}
              />
            }
          />
          <Route
            path="/Exercise"
            element={
              <ExercisePage
                isAuthenticated={appState.isAuthenticated}
                exercises={exercises}
                setExercises={setExercises}
                email={appState.email}
              />
            }
          />
          <Route
            path="/Nutrition"
            element={
              <NutritionPage
                isAuthenticated={appState.isAuthenticated}
                nutrition={nutrition}
                setNutrition={setNutrition}
                email={appState.email}
              />
            }
          />
          <Route
            path="/Sleep"
            element={
              <SleepPage
                isAuthenticated={appState.isAuthenticated}
                sleep={sleep}
                setSleep={setSleep}
                email={appState.email}
              />
            }
          />
          <Route
            path="/Login"
            element={<Login isAuthenticated={appState.isAuthenticated} setAppState={setAppState} />}
          />
          <Route
            path="/Register"
            element={<Register isAuthenticated={appState.isAuthenticated} setAppState={setAppState} />}
          />
          <Route 
          path="/sleep/detail/:id" 
          element={<SleepDetail           sleep={sleep}
          />} 
          
          />
            <Route
            path="/exercise/detail/:id"
            element={<ExerciseDetail exercises={exercises} />}
          />
            {/* <Route
            path="/nutrition/detail/:id"
            element={<ExerciseDetail exercises={exercises} />}
          /> */}

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
