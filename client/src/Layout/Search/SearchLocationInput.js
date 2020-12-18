import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Carousel from "react-bootstrap/Carousel";
import './SearchPage.css';

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

function handleScriptLoad(updateQuery, autoCompleteRef) {
  autoComplete = new window.google.maps.places.Autocomplete(
    autoCompleteRef.current,
    { componentRestrictions: { country: "us" } }
  );
  autoComplete.setFields(["address_components", "formatted_address"]);
  autoComplete.addListener("place_changed", () =>
    handlePlaceSelect(updateQuery)
  );
}

async function handlePlaceSelect(updateQuery) {
  
  const addressObject = autoComplete.getPlace();
  const query = addressObject.formatted_address;

  updateQuery(query);
  var componentMap = {    
    locality: 'locality',
    street_address: 'street_address',
    administrative_area_level_1 : 'administrative_area_level_1',
  };
  const addressComponent = addressObject.address_components;
  console.log(addressComponent);
  let requestBody = {city:"", addressLine:"",stateCode:"",formatedAddress:""};

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
//  var addressLine = query.split(", ");
  console.log(addressLine);
  requestBody.addressLine=addressLine;
  requestBody.city=city;

//  var streetAddress = (requestBody.formatedAddress[0].text).toString();
  
  // requestBody.addressLine = (query.text).toString();
  //              var addressLine = requestBody.addressLine.split(", ").pop();
  //              console.log(addressLine);
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
}

function SearchLocationInput() {
  const [query, setQuery] = useState("");
  const autoCompleteRef = useRef(null);
  const [result, setResult] = useState(""); 


  useEffect(() => {
  
    loadScript(
      `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_API_KEY}&libraries=places`,
      () => handleScriptLoad(setQuery, autoCompleteRef)
    );
  }, []);



  
  return (
    <div className="container">
      <h2 className="heading">Play Smart in Searching Home</h2>
      { <img src="../images/background.jpg" alt=""/> }
      <label className="search-label" htmlFor="search-input">
      <input
        ref={autoCompleteRef}
        onChange={event => setQuery(event.target.value)}
        placeholder="Enter a City"
        
        value={query}
      />
      <i className="fa fa-search search-icon" />
      </label>
    </div>
    
  );
  }


export default SearchLocationInput;

// import React from "react";
// import Carousel from "react-bootstrap/Carousel";
// import Slide1 from "../../assets/img/carousal/slide1.webp";
// import Slide2 from "../../assets/img/carousal/slide2.webp";
// import Slide3 from "../../assets/img/carousal/slide3.webp";
// import Slide4 from "../../assets/img/carousal/slide4.webp";
// import ScrollDown from "../scroll-down/scroll-down.component";
// import "./my-carousal.styles.css";
// 

// const MyCarousal = () => {
//   return (
//     <div id="home">
//       <Carousel controls={false} indicators interval={2500} pauseOnHover={false}>
//         <Carousel.Item>
//           <img className="d-block w-100 custom-img" src={Slide2} alt="First slide" />
//         </Carousel.Item>
//         <Carousel.Item>
//           <img className="d-block w-100 custom-img" src={Slide3} alt="Third slide" />
//         </Carousel.Item>
//         <Carousel.Item>
//           <img className="d-block w-100 custom-img" src={Slide1} alt="Third slide" />
//         </Carousel.Item>
//         <Carousel.Item>
//           <img className="d-block w-100 custom-img" src={Slide4} alt="Fourth slide" />
//         </Carousel.Item>
//       </Carousel>

//     </div>
//   );
// };ﴀ