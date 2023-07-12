import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import apiClient from '../../../services/appClient';
import './SleepDetail.css'

function SleepDetailPage({ sleep }) {
  console.log(sleep);
  const { id } = useParams();
  const [sleepData, setSleepData] = useState(null);

  useEffect(() => {
    const fetchSleep = async () => {
      try {
        const response = await apiClient.getSleepById(id);

        if (response.data) {
        //   console.log(response.data); // Log the received data
          setSleepData(response.data);
        } else {
          console.error(response.error);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchSleep();


  }, [id]);

  const selectedSleep = sleep.find((element) => element.id == id);

  if (!sleep) {
    return <p>Loading sleep data...</p>;
  }

  
  if (!selectedSleep) {
    return <p>Sleep not found</p>;
  }

//   setSleepData(selectedSleep)
  console.log(selectedSleep)

  return (
    <div className='sleep-detail'>
      <h2>Sleep Details</h2>
      <p>Sleep Id: {selectedSleep.id}</p>
      <p>Title: {selectedSleep.title}</p>
      <p>Start Time: {selectedSleep.duration}</p>
      <p>End Time: {selectedSleep.quality}</p>
      <p>Date: {selectedSleep.date}</p>
    </div>
  );
}

export default SleepDetailPage;
