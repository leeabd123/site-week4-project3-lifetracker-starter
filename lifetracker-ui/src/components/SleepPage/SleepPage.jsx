import React, { useState } from 'react';
import './SleepPage.css';
import apiClient from '../../../services/appClient'

function SleepPage({ isAuthenticated, sleep, setSleep, email }) {
  const [theForm, setTheForm] = useState(false);
  const [sleepData, setSleepData] = useState({
    title: '',
    duration: '',
    quality: '',
  });

  const onClick = () => {
    setTheForm(true);
  };

  const handleFormSubmit = async () => {
    event.preventDefault();
    console.log(sleepData);

    const now = new Date();
    const timeString = now.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true });

    const newSleep = {
      ...sleepData,
      time: timeString,
    };

    setSleep((prevSleep) => [...prevSleep, newSleep]);

    const { data, error } = await apiClient.addS({
      user_email: email,
      category: sleepData.title,
      start_time: sleepData.duration,
      end_time: sleepData.quality
    });
    

    setSleepData({
      title: '',
      duration: '',
      quality: '',
    });
    setTheForm(false);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setSleepData((prevData) => ({ ...prevData, [name]: value }));
  };

  if (!isAuthenticated) {
    return <div className='Authenticated'>Authenticated Content</div>;
  } else {
    return (
      <div className='sleep-page'>
        <div className='sleep-title'>
          <div className='text-c-sleep'>
            <h1 className='sleep-text'>Sleep</h1>
          </div>
          {!theForm && (
            <button className='add-sleep' onClick={onClick}>
              <strong>Add Sleep</strong>
            </button>
          )}
          {theForm && (
            <form className='add-form' onSubmit={handleFormSubmit}>
              <h1>Add Sleep</h1>
              <input
                className='input-text-portion-sleep'
                type='text'
                name='title'
                value={sleepData.title}
                onChange={handleInputChange}
                placeholder='Sleep Title'
              />
              <input
                className='input-text-portion-sleep'
                type='text'
                name='duration'
                value={sleepData.duration}
                onChange={handleInputChange}
                placeholder='Start Time'
              />
              <input
                className='input-text-portion-sleep'
                type='text'
                name='quality'
                value={sleepData.quality}
                onChange={handleInputChange}
                placeholder='End Time'
              />
              <button className='sleep-submit-button' type='submit'>
                Submit
              </button>
            </form>
          )}

          <div className='added-sleep'>
            {sleep.map((item, index) => (
              <div className='sleep-item' key={index}>
                <h3 className='added-time-sleep'>Today at {item.date}</h3>
                <h1 className='added-title-sleep'>{item.title}</h1>
                <div className='sub-sleep-info'>
                  <div className='left-sleep'>
                    <h3 className='duration'>Start Time</h3>
                    <input
                      className='input-text-portion'
                      type='text'
                      name='duration'
                      value={item.duration}
                      onChange={handleInputChange}
                      placeholder='Start Time'
                    />
                  </div>
                  <div className='right-sleep'>
                    <h3 className='quality'>End Time</h3>
                    <input
                      className='input-text-portion'
                      type='text'
                      name='quality'
                      value={item.quality}
                      onChange={handleInputChange}
                      placeholder='End Time'
                    />
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

export default SleepPage;
