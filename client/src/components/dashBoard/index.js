import React from 'react';
import axios from "axios";
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import CardItem from './Layout/CardItem'
import { Link } from 'react-router-dom';
import { PieChart } from 'react-minimal-pie-chart';

class DashboardPage extends React.Component {
    
  constructor(props){
      super(props)
      this.state = {            
        properties:[],
        err: null,
        isLoading: false,
        selected: 0,
        hovered: null,
      };
    }

    async componentDidMount() {
      this.setState({ isLoading: true })
      fetch("http://localhost:5000/api/rentals/dashboard", {
        headers: {
          "Authorization" : localStorage.getItem("jwtToken")
        }
      })
      .then(response => {
        return response.json();
      })
      .then(properties => {
        this.setState({                
          properties,
          isLoading: false
        })
        console.log(properties);
      },
      err => {
        this.setState({
          err,
          isLoading: false
        })
      })
      await new Promise(r => setTimeout(r, 200));
    } 

    render() {
      let {properties, err, isLoading, selected} = this.state;
      if (err) {
        return (<div> { err.message } </div>)
      }
  
      if (isLoading) {
        return (<div> Loading.... </div>)
      }
      return (
        <Container>
          <Grid container item spacing={0}>
            <Grid item xs={12} sm={4} md={4} lg={4}>
              <div className='cards' style={{padding: '0'}}>
                <div className='cards__container'>
                  <div className='cards__wrapper' style={{width: '200%'}}>
                    <ul className='dashboard_cards__item'>
                      {properties.map(property => (     
                        <li key = {property._id} className='cards__item' style={{ margin: '2rem 1rem' }}>
                          <div className='cards__item__link'  style={{ padding: '1rem 1rem' }}>
                            <div className='cards__item__info' style={{padding: '1px 20px 1px'}}>
                              <h5 className='cards__item__text' style={{fontSize: 15, lineHeight: '6px'}}>"Email" + {property.UserEmail}</h5>
                            </div>
                            <div className='cards__item__info' style={{padding: '1px 20px 1px'}}>
                              <h5 className='cards__item__text' style={{fontSize: 15, lineHeight: '6px'}}>{property.Address}</h5>
                            </div>
                            <div className='cards__item__info' style={{padding: '1px 20px 1px'}}>
                              <h5 className='cards__item__text' style={{fontSize: 15, lineHeight: '6px'}}>{property.RealPurchasePrice}</h5>
                            </div>
                            <div className='cards__item__info' style={{padding: '1px 20px 1px'}}>
                              <h5 className='cards__item__text' style={{fontSize: 15, lineHeight: '6px'}}>{property.MortgageMonthlyPayment}</h5>
                            </div>
                            <div className='cards__item__info' style={{padding: '1px 20px 1px'}}>
                              <h5 className='cards__item__text' style={{fontSize: 15, lineHeight: '6px'}}>{property.CashRequiredToCloseAfterFinancing}</h5>
                            </div>
                            <div className='cards__item__info' style={{padding: '1px 20px 1px'}}>
                              <h5 className='cards__item__text' style={{fontSize: 15, lineHeight: '6px'}}>{property.NetOperatingIncome}</h5>
                            </div>
                            <div className='cards__item__info' style={{padding: '1px 20px 1px'}}>
                              <h5 className='cards__item__text' style={{fontSize: 15, lineHeight: '6px'}}>{property.TotalROIAfterOneYear}</h5>
                            </div>
                            <div className='cards__item__info' style={{padding: '1px 20px 1px'}}>
                              <h5 className='cards__item__text' style={{fontSize: 15, lineHeight: '6px'}}>{property.AnnualProfitOrLoss}</h5>
                            </div>
                            <div className='cards__item__info' style={{padding: '1px 20px 1px'}}>
                              <Link to= {"/propertyDetails2/" + property._id}>{"View More Details "}</Link>
                            </div>
                          </div>
                        </li>           
                      ))}
                     
                    </ul>
                  </div>
                </div>
              </div>
            </Grid>
            <Grid item xs={12} sm={4} md={8} lg={8}>
              <div className='cards' style={{padding: '1rem'}}>
                <div className='cards__container'>
                  <div className='cards__wrapper' style={{width: '100%', boxShadow: '0 6px 20px rgba(56, 125, 255, 0.17)'}}>
                    <ul className='dashboard_cards__item'>
                      <li className='cards__item' style={{ margin: '2rem 1rem' }}>
                        <div className='cards__item__info' style={{width: '40%'}}>
                          <PieChart
                            label={({ dataEntry }) =>
                            `${Math.round(dataEntry.percentage)} %`
                            }
                            animate
                            onClick={(_, index) => {
                              this.setState({selected: index === selected ? undefined : index});
                            }}
                            onMouseOver={(_, index) => {
                              this.setState({hovered: index});
                            }}
                            onMouseOut={() => {
                              this.setState({hovered: false});
                            }}
                            segmentsStyle={{ transition: 'stroke .3s', cursor: 'pointer' }}
                            segmentsShift={(index) => (index === selected ? 6 : 1)}
                            data={[
                              { title: 'One', value: 10, color: '#E38627' },
                              { title: 'Two', value: 15, color: '#C13C37' },
                              { title: 'Three', value: 20, color: '#6A2135' },
                            ]}
                          />;
                        </div>
                      </li>
                    </ul>
                    {/* <div className='cards__item__link'>
                    </div> */}
                  </div>
                </div>
              </div>
            </Grid>
          </Grid>
        </Container>
      );

    }
}

DashboardPage.propTypes = {

};

export default DashboardPage;