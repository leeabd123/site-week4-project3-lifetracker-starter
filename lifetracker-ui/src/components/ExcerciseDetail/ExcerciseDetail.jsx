import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import apiClient from '../../../services/appClient';
import './ExcerciseDetail.css';

function ExerciseDetail({ exercises }) {
  console.log(exercises);
  const { id } = useParams();
  const [exerciseData, setExerciseData] = useState(null);

  useEffect(() => {
    const fetchExercise = async () => {
      try {
        const response = await apiClient.getExerciseById(id);

        if (response.data) {
          setExerciseData(response.data);
        } else {
          console.error(response.error);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchExercise();
  }, [id]);

  const selectedExercise = exercises.find((element) => element.id == id);

  if (!exercises) {
    return <p>Loading exercise data...</p>;
  }

  if (!selectedExercise) {
    return <p>Exercise not found</p>;
  }

  return (
    <div className="exercise-detail">
      <h2>Exercise Details</h2>
      <p>Exercise Id: {selectedExercise.id}</p>
      <p>Title: {selectedExercise.title}</p>
      <p>Duration: {selectedExercise.duration}</p>
      <p>Intensity: {selectedExercise.intensity}</p>
    </div>
  );
}

export default ExerciseDetail;
