import './ExercisePage.css';
import { useState } from 'react';
import apiClient from '../../../services/appClient';

 function ExercisePage({ isAuthenticated, exercises, setExercises, email }) {
  const [theform, setTheForm] = useState(false);
  const [exerciseData, setExerciseData] = useState({
    title: '',
    duration: '',
    intensity: '',
    date: ''
  });

  const onclick = () => {
    setTheForm(true);
  };

  const handleFormSubmit = async () => {
    event.preventDefault();
    console.log(exerciseData);
    const now = new Date();
    const timeString = now.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true });

    const newExercise = {
      ...exerciseData,
      time: timeString,
    };

    setExercises((prevExercises) => [...prevExercises, newExercise]);
    console.log(email);

    const { data, error } = await apiClient.addEx({
      user_email: email,
      title: exerciseData.title,
      duration: exerciseData.duration,
      intensity: exerciseData.intensity
    });
    

    setExerciseData({
      title: '',
      duration: '',
      intensity: '',
    });
    setTheForm(false);

    
   
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setExerciseData((prevData) => ({ ...prevData, [name]: value }));
  };

  if (!isAuthenticated) {
    return <div className='Authenticated'>Authenticated Content</div>;
  } else {
    return (
      <div className='excercisepage'>
        <div className='excercise-title'>
          <div className='text-c'>
            <h1 className='excercise-text'>Exercise</h1>
          </div>
          {!theform && (
            <button className='add-excercise' onClick={onclick}>
              <strong>Add Exercise</strong>
            </button>
          )}
          {theform && (
            <form className='add-form' onSubmit={handleFormSubmit}>
              <h1>Add Excercise </h1>
              <input
                className='input-text-portion'
                type='text'
                name='title'
                value={exerciseData.title}
                onChange={handleInputChange}
                placeholder='Category/Title'
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

          <div className='added-excercises'>
            {exercises.map((exercise, index) => (
              <div className='an-excercise' key={index}>
                <h3 className='added-time'>Today at {exercise.date}</h3>
                <h1 className='added-title'>{exercise.title}</h1>
                <div className='sub-exercise-info'>
                  <div className='left-exercise'>
                    <h3 className='duration'>
                      Duration <br />
                      <br />
                      {exercise.duration}
                    </h3>
                  </div>
                  <div className='right-exercise'>
                    <h3 className='duration'>
                      Intensity <br />
                      <br />
                      {exercise.intensity}
                    </h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default ExercisePage;
