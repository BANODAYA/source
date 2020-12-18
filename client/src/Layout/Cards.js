import React from 'react';
import './Cards.css';
import CardItem from './CardItem';

function Cards() {
  return (
    <div className='cards'>
      <h1>Recommended Properties!</h1>
      
      <div className='cards__container'>
        <div className='cards__wrapper'>
          <ul className='cards__items'>
           
            <CardItem
              src='images/agent1.png'
              text='Find your best investment'
                path='/services'
            />
            <CardItem
              src='images/2.jpg'
              text='Recomended listings'
                path='/services'
            />
             <CardItem
              src='images/3.jpg'
              text='Dont miss these homes!
              Recommended based on your recent activity'
                path='/services'
            />
             <CardItem
              src='images/4.jpg'
              text='Rent a home'
                path='/services'
            />
          </ul>
        
        </div>
      </div>
    </div>
  );
}

export default Cards;