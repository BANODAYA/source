import React from 'react';
import './HouseCards.css';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';

function HouseCards(props) {
  return (
    <Grid item xs={12} md={12}>
      {/* <h1>House Info!</h1> */}
      <div className='house-cards__container'>
        <div className='house-cards__wrapper'>
          <Link className='house-cards__item__link'>
            <figure className='house-cards__item__pic-wrap' data-category={props.price + '$'}>
              <img
                className='house-cards__item__img'
                alt='Rental Image'
                src={props.image}
              />
            </figure>
            <div className='house-cards__item__info'>
              <h5 className='house-cards__item__text'>{props.type}</h5>
              <h5 className='house-cards__item__text'>{props.bedrooms + 'bed'}</h5>
              <h5 className='house-cards__item__text'>{props.bathrooms + 'bath'}</h5>
              <h5 className='house-cards__item__text'>{props.wide}</h5>
              <h5 className='house-cards__item__text'>{props.totalwide}</h5>
            </div>
          </Link>
        </div>
      </div>
    </Grid>
  );
}

export default HouseCards;