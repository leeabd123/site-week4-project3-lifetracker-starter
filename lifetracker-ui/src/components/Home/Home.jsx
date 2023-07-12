import './Home.css'

function Home() {

  return (
    <div className='Home-container'>
      <div className='Home'>
        <div className='header-text'>
              <h1 className='text1'>LifeTracker</h1>
              <h1 className='text2'>Helping you take back control of your world.</h1>
          </div>
          <div className='header-picture'>
              <img className="tracker" src='./src/assets/tracker.jpg'/>

          </div>
      </div>
      <div className='mini-box-items'>
        <div className='fitness'>
          <h2 className='mini-title'>
            Fitness
          </h2>
          <img className="mini-img" src="../src/assets/athlete.jpg"/>
        </div>
        <div className='food'>
        <h2 className='mini-title'>
            Food
          </h2>
          <img className="mini-img" src="../src/assets/food.jpg"/>

        </div>
        <div className='rest'>
        <h2 className='mini-title'>
            Rest
          </h2>
          <img className="mini-img" src="../src/assets/alarm.jpg"/>

        </div>
        <div className='planner'>
        <h2 className='mini-title'>
            Planner
          </h2>
          <img className="mini-img" src="../src/assets/calendar.jpg"/>

        </div>
      </div>
       
     
    </div>
  )

}

export default Home;