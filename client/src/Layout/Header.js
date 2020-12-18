import React, { useState, useEffect } from 'react';
// import { Button } from './Button';
import { Link } from 'react-router-dom';
import './Navbar.css';
import Landing from "../components/layout/Landing"
import Register from "../components/auth/Register"

import Axios from "axios";
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import './Header.css';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import clsx from 'clsx';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import InfoIcon from '@material-ui/icons/Info';
import PeopleIcon from '@material-ui/icons/People';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

// import Rc from "../../../Backend/rentalcalculator";
// import PropTypes from "prop-types";
// import { connect } from "react-redux";
// import { rentalCalculator } from "../../actions/authActions";
const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

function Navbar() {
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

  //   componentDidMount() {
  //     // If logged in and user navigates to Login page, should redirect them to dashboard
  //     if (this.props.auth.isAuthenticated) {
  //       this.props.history.push("/rentalCalculator");
  //     }
  //   }

  // componentWillReceiveProps(nextProps) {
  //     if (nextProps.auth.isAuthenticated) {
  //       this.props.history.push("/rentalCalculator"); // push user to dashboard when they login
  //     }
  // if (nextProps.errors) {
  //       this.setState({
  //         errors: nextProps.errors
  //       });
  //     }
  //   }

  // onChange = e => {
  //     this.setState({[e.target.id]: e.target.value});
  // };
  // onSubmit = e => {
  //     e.preventDefault();



  //     this.props.loginUser(userData);
  // };

  const openTemp = async () => {
    console.log("open temp")
    Axios({
      method: "GET",
      url: "http://localhost:5000/api/users/rentalCalculator",
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res => {
      console.log(res.data);
    });
    // const res = await axios.get('http://localhost:5000/api/users/rentalCalulator');
    // console.log(Rc);
  }
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  



  return (
    <>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h4" >
            <Link to='/'>
            Adeborna Rentals
            </Link>
          </Typography>
        
      
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          {['Rental Calculator', 'Rehab Calculator', 'Fix N Flip Calculator', 'Wholesaling Calculator'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <ArrowRightIcon  /> : <ArrowRightIcon  />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {['Terms & Conditions ', 'Need Help', 'Contact Us', 'My Account', 'SignUp/Login'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <InfoIcon /> : <PeopleIcon />}
              {index == 2 }
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <ul className={click ? 'nav-menu active' : 'nav-menu'}>

        <li className='nav-item' onClick={handleClick}>
          <Link
            to='/dashboard'
            className='nav-links'
          >
            Dashboard
          </Link>
        </li>
        <li className='nav-item' onClick={handleClick}>
          <Link
            to='/Rc'
            className='nav-links'
            onClick={openTemp}
          >
            RentalCalculator
              </Link>
        </li>
        <li className='nav-item'>
          <Link
            to='/cal2'
            className='nav-links'
            onClick={closeMobileMenu}
          >
            Rehab Calculator
              </Link>
        </li>
        <li className='nav-item'>
          <Link
            to='/cal3'
            className='nav-links'
            onClick={closeMobileMenu}
          >
            Fix N Flip Calculator
              </Link>
        </li>
        <li className='nav-item'>
          <Link
            to='/cal4'
            className='nav-links'
            onClick={closeMobileMenu}
          >
            Wholesale Calculator
              </Link>
        </li>
        <li>
          <Link
            to='/sign-up'
            className='nav-links'
            onClick={Landing}
          >
            Sign Up
              </Link>
        </li>
      </ul>
    </Toolbar>
  </AppBar >
    </>
  );
}

export default Navbar;


// Navbar.propTypes = {
//   loginUser: PropTypes.func.isRequired,
//   auth: PropTypes.object.isRequired,
//   errors: PropTypes.object.isRequired
// };
// const mapStateToProps = state => ({
//   auth: state.auth,
//   errors: state.errors
// });
// export default connect(
//   mapStateToProps,
//   { rentalCalculator }
// )(Navbar);
