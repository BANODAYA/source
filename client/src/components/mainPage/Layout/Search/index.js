
import React, { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Container, Icon, Input,Image } from 'semantic-ui-react';
import Grid from '@material-ui/core/Grid';
import { IconButton } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import GoogleMapReact from 'google-map-react';

import './SearchPage.css';
import HouseCards from "../HouseCards"

const styles = {
	rootCounterFull: {
		marginTop: 0,
    marginBottom: 4,
    marginLeft: 1,
    marginRight: 2,
	}
};


const houseInformation = [
  {
    price: 525000,
    type: 'Single Family Home',
    bedrooms: 3,
    bathrooms: 1.5,
    wide: '1,525sqft',
    totalwide: '3,200sqft lot',
		image: '../../images/house1.png',
		latitude: 42.2715001,
		longtitude: -71.1115988,
  },
  {
    price: 499000,
    type: 'Single Family Home',
    bedrooms: 3,
    bathrooms: 2,
    wide: '1,942sqft',
    totalwide: '0.23acre lot',
    image: '../../images/house2.png',
		latitude: 42.2858007,
		longtitude: -71.08255594,
  },
  {
    price: 375000,
    type: 'Single Family Home',
    bedrooms: 5,
    bathrooms: 4,
    wide: '3.784sqft',
    totalwide: '0.23acre lot',
    image: '../../images/house3.png',
		latitude: 33.6409591,
		longtitude: -84.5790024,
  },
  {
    price: 149900,
    type: 'Single Family Home',
    bedrooms: 3,
    bathrooms: 1,
    wide: '5,000sqft',
    totalwide: '5,001sqft lot',
    image: '../../images/house4.png',
		latitude: 41.6602114,
		longtitude: -87.5568579,
  },
  {
    price: 350000,
    type: 'Condo',
    bedrooms: 3,
    bathrooms: 2.5,
    wide: '1,769sqft',
    totalwide: '4,021sqft lot',
    image: '../../images/house5.png',
		latitude: 43.541682,
		longtitude: -96.7261572,
  }
];

class SearchPage extends React.Component {

	constructor(props) {
    super(props);
    this.state = {
			cardInformation: [],
			searchText: ''
    };
	}
	
	componentDidMount() {
		const { match: { params }} = this.props;
		if (params) {
			this._isMounted = true;
			console.log('params.token', params.token);
			this.setState({searchText: params.token});
			const index = Math.floor(Math.random() * houseInformation.length);
			const cardInfo = this.state.cardInformation;
			cardInfo.push(houseInformation[index]);
			this.setState({cardInformation: cardInfo});
    }
  }

	drawCardInformation() {
		const {cardInformation} = this.state;
		return (
			cardInformation.map((info, index) => (
				<HouseCards price={info.price} image={info.image} type={info.type} bedrooms={info.bedrooms} bathrooms={info.bathrooms} wide={info.wide} totalwide={info.totalwide}/>
			))
		);
	}

	renderMarkers(map, maps) {
		const {cardInformation} = this.state;
		let marker = new maps.Marker({
			position: {lat: cardInformation[0].latitude, lng: cardInformation[0].longtitude},
			map,
			title: 'New Marker!'
		});
	}

	render() {
		
		const { classes } = this.props;
		const { searchText, cardInformation} = this.state;
		var background = { backgroundSize: 'cover' };

		return (
			<div>
				<Grid container spacing={3} item xs={12} md={12} className={classes.rootCounterFull}>
					<Grid item xs={12} md={12}>
						<div style={{ width:450, marginLeft: 50 }}>
							<label className="search-label" htmlFor="search-input">
								<input
									className="searchbar-text"
									style={{border: 'solid darkgray 1px'}}
									// ref={autoCompleteRef}
									// onChange={event => setQuery(event.target.value)}
									placeholder="Enter a City"
									value={searchText}
								/>
								<IconButton 
									style={{paddingBottom: '8px', paddingTop: '15px', marginTop: '5px', marginBottom: '12px', height: '47px', borderRadius: '0 25px 25px 0', background: '#b93535', color: 'white'}}
									// onClick={ event => handleSearch(autoCompleteRef)}
								>
									<SearchIcon  />
								</IconButton>
								{/* <i className="fa fa-search search-icon" /> */}
							</label>
						</div>
					</Grid>
				</Grid>
				<Grid container spacing={3} item xs={12} md={12} className={classes.rootCounterFull}>
					<Grid item xs={12} md={6}>
						<Grid container spacing={1} item xs={12} md={12}>
							<Grid item xs={12} md={12} style={{marginLeft: 45}}>
								<h4>{searchText}</h4>
							</Grid>
							{ this.drawCardInformation() }
						</Grid>
					</Grid>
					<Grid item xs={12} md={6}>
						<div style={{height: '700px'}}>
							{cardInformation.length > 0 &&
								<GoogleMapReact
									bootstrapURLKeys={{ key: `${process.env.REACT_APP_GOOGLE_API_KEY}` }}
									defaultCenter={{ lat: cardInformation[0].latitude, lng: cardInformation[0].longtitude }}
									defaultZoom={11}
									yesIWantToUseGoogleMapApiInternals
									onGoogleApiLoaded={({ map, maps }) => this.renderMarkers(map, maps)}
								>
								</GoogleMapReact>
							}	
						</div>
					</Grid>
				</Grid>
			</div>
		);
	}
}
export default withStyles(styles)(SearchPage);