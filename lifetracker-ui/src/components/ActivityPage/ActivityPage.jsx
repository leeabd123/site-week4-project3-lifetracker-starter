import './ActivityPage.css';
import {useState, useEffect} from 'react'
function ActivityPage({ isAuthenticated, excercises, setExercises, nutrition, setNutrition, sleep, setSleep }) {


  //Excercise 
  const [theform1, setTheForm1] = useState(false);
  const [exerciseData, setExerciseData] = useState({
    title: '',
    duration: '',
    intensity: '',
  });

  const onclick = () => {
    setTheForm1(true);
  };

  const handleFormSubmit = () => {
    event.preventDefault();
    console.log(exerciseData);
    const now = new Date();
    const timeString = now.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true });

    const newExercise = {
      ...exerciseData,
      time: timeString,
    };

    setExercises((prevExercises) => [...prevExercises, newExercise]);

    setExerciseData({
      title: '',
      duration: '',
      intensity: '',
    });
    setTheForm1(false);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setExerciseData((prevData) => ({ ...prevData, [name]: value }));
  };

  //Sleep
  const [theForm2, setTheForm2] = useState(false);
  const [sleepData, setSleepData] = useState({
    title: '',
    duration: '',
    quality: '',
  });

  const onClick2 = () => {
    setTheForm2(true);
  };

  const handleFormSubmit2 = () => {
    event.preventDefault();
    console.log(sleepData);

    const now = new Date();
    const timeString = now.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true });

    const newSleep = {
      ...sleepData,
      time: timeString,
    };

    setSleep((prevSleep) => [...prevSleep, newSleep]);

    setSleepData({
      title: '',
      duration: '',
      quality: '',
    });
    setTheForm2(false);
  };

  const handleInputChange2 = (event) => {
    const { name, value } = event.target;
    setSleepData((prevData) => ({ ...prevData, [name]: value }));
  };


  //nutrition
  const [theForm3, setTheForm3] = useState(false);
  const [nutritionData, setNutritionData] = useState({
    title: '',
    calories: '',
    macronutrients: '',
  });

  const onClick3 = () => {
    setTheForm3(true);
  };

  const handleFormSubmit3 = () => {
    event.preventDefault();
    console.log(nutritionData);
    const now = new Date();
    const timeString = now.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true });

    const newNutrition = {
      ...nutritionData,
      time: timeString,
    };

    setNutrition((prevNutrition) => [...prevNutrition, newNutrition]);

    setNutritionData({
      title: '',
      calories: '',
      macronutrients: '',
    });
    setTheForm3(false);
  };

  const handleInputChange3 = (event) => {
    const { name, value } = event.target;
    setNutritionData((prevData) => ({ ...prevData, [name]: value }));
  };


  // const calculateAverage = (dataArr) => {
  //   if (dataArr?.length === 0) return 0;

  //   const total = dataArr.reduce((sum, item) => sum + parseFloat(item), 0);
  //   return total / dataArr.length;
  // };
  // // if (excercises.length > 0 && nutrition.size > 0 && sleep.size > 0) {
  //   const averageExerciseDuration = calculateAverage(excercises?.map((exercise) => exercise.duration));
  //   const averageCalories = calculateAverage(nutrition?.map((food) => food.calories));
  //   const averageSleepDuration = calculateAverage(sleep?.map((item) => item.duration));

    
  // //}
 

  if (!isAuthenticated) {
    return <div className='Authenticated'>Authenticated Content</div>;
  } else {
    return (
      <div className="activity">
          {theform1 && (
            <form className='add-form' onSubmit={handleFormSubmit}>
              <h1>Add Excercise</h1>
              <input
                className='input-text-portion'
                type='text'
                name='title'
                value={exerciseData.title}
                onChange={handleInputChange}
                placeholder='Excercise Name'
              />
              <input
                className='input-text-portion'
                type='text'
                name='duration'
                value={exerciseData.duration}
                onChange={handleInputChange}
                placeholder='Duration'
              />
              <input
                className='input-text-portion'
                type='text'
                name='intensity'
                value={exerciseData.intensity}
                onChange={handleInputChange}
                placeholder='Intensity'
              />
              <button className='submit-button' type='submit'>
                Submit
              </button>
            </form>
          )}
          {theForm2 && (
            <form className='add-form' onSubmit={handleFormSubmit2}>
              <h1>Add Sleep</h1>
              <input
                className='input-text-portion'
                type='text'
                name='title'
                value={sleepData.title}
                onChange={handleInputChange2}
                placeholder='Sleep Title'
              />
              <input
                className='input-text-portion'
                type='text'
                name='duration'
                value={sleepData.duration}
                onChange={handleInputChange2}
                placeholder='Duration'
              />
              <input
                className='input-text-portion'
                type='text'
                name='quality'
                value={sleepData.quality}
                onChange={handleInputChange2}
                placeholder='Quality'
              />
              <button className='submit-button' type='submit'>
                Submit
              </button>
            </form>
          )}
          {theForm3 && (
            <form className='add-form' onSubmit={handleFormSubmit3}>
              <h1>Add Nutrition</h1>
              <input
                className='input-text-portion'
                type='text'
                name='title'
                value={nutritionData.title}
                onChange={handleInputChange3}
                placeholder='Food Item'
              />
              <input
                className='input-text-portion'
                type='text'
                name='calories'
                value={nutritionData.calories}
                onChange={handleInputChange3}
                placeholder='Calories'
              />
              <input
                className='input-text-portion'
                type='text'
                name='macronutrients'
                value={nutritionData.macronutrients}
                onChange={handleInputChange3}
                placeholder='Macronutrients'
              />
              <button className='submit-button' type='submit'>
                Submit
              </button>
            </form>
          )}
        <div className="everything">
          <h1 className="activity-header">Activity Feed</h1>
          <div className="activity-container" >
            <div className="left-container">
              <div className="excercise-container"  onClick={onclick}>
            
              </div>
              <div className="calories-container" onClick={onClick3}></div>
            </div>
            <div className="right-container">
              <div className="sleep-container"  onClick={onClick2}>
              {/* <h2>Average Duration: {averageSleepDuration} hours</h2> */}


              </div>
              <div className="info-container" ></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ActivityPage;
