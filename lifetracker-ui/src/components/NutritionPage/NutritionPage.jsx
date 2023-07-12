import './NutritionPage.css';
import { useState } from 'react';
import React from 'react';
import * as Letters from 'react-icons/tb';
import apiClient from '../../../services/appClient'
import { Link } from 'react-router-dom'


function NutritionPage({ isAuthenticated, nutrition, setNutrition, email }) {

  const [theForm, setTheForm] = useState(false);
  const [nutritionData, setNutritionData] = useState({
    category: '',
    calories: '',
    macronutrients: '',
    date: '',
    id: ''
  });

  console.log(nutrition)

  const onClick = () => {
    setTheForm(true);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setTheForm(false);

    console.log(nutritionData);
    const now = new Date();
    const timeString = now.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true });

    const newNutrition = {
      ...nutritionData,
      time: timeString,
    };

    setNutrition((prevNutrition) => [...prevNutrition, newNutrition]);

    const { data, error } = await apiClient.addN({
      user_email: email,
      category: nutritionData.category,
      calories: nutritionData.calories,
      nutrients: nutritionData.macronutrients,
      img: `https://i.ibb.co/8d6Dhbr/${nutritionData.title.charAt(0)}.png`
    });
    

    setNutritionData({
      category: '',
      calories: '',
      macronutrients: '',
      date: '',
      id: ''
    });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNutritionData((prevData) => ({ ...prevData, [name]: value }));
  };

  if (!isAuthenticated) {
    return <div className='Authenticated'>Authenticated Content</div>;
  } else {

    return (
      <div className='nutrition-page'>
        <div className='nutrition-title'>
          <div className='text-c-nutrients'>
            <h1 className='nutrition-text'>Nutrition
            </h1>
          </div>
          {!theForm && (
            <button className='add-nutrition' type='button'onClick={onClick}>
              <strong>Record Nutrition</strong>
            </button>
          )}
          {theForm && (
            <form className='add-form' onSubmit={handleFormSubmit}>
              <h1>Add Nutrition</h1>
              <input
                className='input-text-portion'
                type='text'
                name='title'
                value={nutritionData.cateogry}
                onChange={handleInputChange}
                placeholder='Food Item/Category'
              />
              <input
                className='input-text-portion'
                type='text'
                name='calories'
                value={nutritionData.calories}
                onChange={handleInputChange}
                placeholder='Calories'
              />
              <input
                className='input-text-portion'
                type='text'
                name='macronutrients'
                value={nutritionData.macronutrients}
                onChange={handleInputChange}
                placeholder='Macronutrients'
              />
              <button className='nutrition-submit-button' type='submit'>
                Submit
              </button>
            </form>
          )}

          <div className='added-nutrition'>
            {nutrition.map((item, index) => (
              <div className='nutrition-item' key={index}>
                <h3 className='added-time'>Today at {item.date}</h3>
                <h1 className='added-title-nutrients'>
                {/* <Link to={`/nutrition/detail/${item.id}`} className='nutrition-link'> */}
                {item.category}
                {/* </Link> */}
                  <AlphabetIcons letter={item.category ? item.category.charAt(0).toUpperCase() : ''} />

                </h1>
                <div className='sub-nutrition-info'>
                  <div className='left-nutrition'>
                    <h3>Calories</h3>
                    <h3 className='calories'>{item.calories}</h3>
                  </div>
                  <div className='right-nutrition'>
                    <h3>Macronutrients</h3>
                    <h3 className='macronutrients'>{item.macronutrients}</h3>
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

function AlphabetIcons({ letter }) {
  const renderIcon = () => {
    switch (letter) {
      case 'A':
        return '\u24B6';
      case 'B':
        return '\u24B7';
      case 'C':
        return '\u24B8';
      case 'D':
        return '\u24B9';
      case 'E':
        return '\u24BA';
      case 'F':
        return '\u24BB';
      case 'G':
        return '\u24BC';
      case 'H':
        return '\u24BD';
      case 'I':
        return '\u24BE';
      case 'J':
        return '\u24BF';
      case 'K':
        return '\u24C0';
      case 'L':
        return '\u24C1';
      case 'M':
        return '\u24C2';
      case 'N':
        return '\u24C3';
      case 'O':
        return '\u24C4';
      case 'P':
        return '\u24C5';
      case 'Q':
        return '\u24C6';
      case 'R':
        return '\u24C7';
      case 'S':
        return '\u24C8';
      case 'T':
        return '\u24C9';
      case 'U':
        return '\u24CA';
      case 'V':
        return '\u24CB';
      case 'W':
        return '\u24CC';
      case 'X':
        return '\u24CD';
      case 'Y':
        return '\u24CE';
      case 'Z':
        return '\u24CF';
      default:
        return null;
    }
  };

  return <div className="alphabet-icons">{renderIcon()}</div>;
}



export default NutritionPage;
