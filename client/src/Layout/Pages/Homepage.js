import React from 'react';
import '../../App.css';
import Cards from '../Cards';
import SearchLocationInput from "../../components/mainPage/Layout/Search/SearchLocationInput";
//import Header from "../../components/Application/Header/Header";
import Header from "../Header";
import Footer from '../Footer';

function Homepage() {
  return (
    <>
    <Header />
    <div className="app">
      <SearchLocationInput
        onChange={() => null}
      />
      <Cards />
      <Footer />
    </div>
    </>
  );
}

export default Homepage;