import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import { IconButton, Container } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import axios from "axios";
import Carousel from "react-bootstrap/Carousel";
import './SearchPage.css';
import { Link } from 'react-router-dom';

let autoComplete;

const loadScript = (url, callback) => {
  let script = document.createElement("script");
  script.type = "text/javascript";

  if (script.readyState) {
    script.onreadystatechange = function() {
      if (script.readyState === "loaded" || script.readyState === "complete") {
        script.onreadystatechange = null;
        callback();
      }
    };
  } else {
    script.onload = () => callback();
  }

  script.src = url;
  document.getElementsByTagName("head")[0].appendChild(script);
};


function SearchLocationInput() {
  const [query, setQuery] = useState("");
  const autoCompleteRef = useRef(null);
  const [result, setResult] = useState(""); 
  const history = useHistory();
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);
  const [temp, setTemp] = useState();

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
  }, []);

  window.addEventListener('resize', showButton);
  
  useEffect(() => {
    loadScript(
      `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_API_KEY}&libraries=places`,
      () => handleScriptLoad(setQuery, autoCompleteRef)
    );
  }, []);

  
  const handleScriptLoad = (updateQuery, autoCompleteRef) => {
    console.log('handleScriptLoad', updateQuery);
    autoComplete = new window.google.maps.places.Autocomplete(
      autoCompleteRef.current,
      { componentRestrictions: { country: "us" } }
    );
    autoComplete.setFields(["address_components", "formatted_address"]);
    autoComplete.addListener("place_changed", () =>
      handlePlaceSelect(updateQuery)
    );
  }

  const handlePlaceSelect = (updateQuery) => {
  
    const addressObject = autoComplete.getPlace();
    const query = addressObject.formatted_address;
    console.log('handlePlaceSelect', query);
  
    updateQuery(query);
  
    var componentMap = {    
      locality: 'locality',
      street_address: 'street_address',
      administrative_area_level_1 : 'administrative_area_level_1',
    };
    const addressComponent = addressObject.address_components;
    console.log('addressComponent', addressComponent);
    let requestBody = {city: "", addressLine: "", stateCode: "", formatedAddress: ""};
  
    for(var i = 0; i < addressComponent.length; i++){
      var types = addressComponent[i].types; // get types array of each component 
      for(var j = 0; j < types.length; j++){ // loop through the types array of each component as types is an array and same thing can be indicated by different name.As you can see in the json object above 
        var component_type = types[j];
        
        // check if this type is in your component map.If so that means you want this component
        if(componentMap.hasOwnProperty(component_type)){        
          if(component_type === 'sublocality' && requestBody.city ===''){
            requestBody.city=addressComponent[i]['long_name'];
          } 
  
          if(component_type === 'locality'){
            requestBody.city=addressComponent[i]['long_name'];
          }
          if(component_type === 'street_address'){
            requestBody.addressLine=addressComponent[i]['long_name'];
          }
      
          if(component_type === 'administrative_area_level_1'){
            requestBody.stateCode=addressComponent[i]['short_name'];
          }
        }
      }
    }
  
    requestBody.formatedAddress=query;
     const [addressLine, city, zip, country] = query.split(',');
    console.log('addressLine', addressLine);
    requestBody.addressLine = addressLine;
    requestBody.city = city;
  
  
    axios
    .post("/api/rentals/rentalCalculator", requestBody)
    .then(res => {
      console.log(res);
    })
    .catch(err =>
      {
        console.log(err);
      }
    );
  
    console.log(addressObject);
  
    const index = Math.floor(Math.random() * 5);
    history.push(`/mainPage/search/${query}`);
  }

  return (
    <div className="container">
      <h2 className="heading">Play Smart in Searching Home</h2>
      
      <ul className={click ? 'nav-menu active' : 'nav-menu'}>

            <li className='nav-item' onClick={handleClick}>
              <Link
                to='/Rc'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                BUY
                    </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/cal2'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                SELL
                    </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/cal2'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                JUST SOLD
                    </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/cal2'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                HOME VALUE
                    </Link>
            </li>
            
            </ul>
            
      { <img src="../images/background.jpg" alt=""/> }
      <div style={{ width:450 }}>
        <label className="search-label" htmlFor="search-input">
          <input
            className="searchbar-text"
            ref={autoCompleteRef}
            onChange={event => setQuery(event.target.value)}
            placeholder="Enter a City"
            value={query}
          />
          <IconButton 
            style={{paddingBottom: '8px', paddingTop: '15px', marginTop: '4px', marginBottom: '11px', height: '45px', borderRadius: '0 25px 25px 0', background: 'white'}}
            onClick={ event => setQuery(autoCompleteRef.current.value)}
          >
            <SearchIcon  />
          </IconButton>
        </label>
      </div>
    </div>
  );
}

export default SearchLocationInput;
