import React, { Component } from 'react';
import SimpleMap from '../../components/map/map';
import SearchField from '../../components/searchBar/search';
import Login_Reg_Button from '../../components/login/login_register';
import Button from "@material-ui/core/Button";
import {Link} from "react-router-dom";
import New_Listing_Button from "../../components/addListing/addListing";

class App extends Component {

	constructor(props) {
		super(props);
		if (localStorage.getItem("username") && localStorage.getItem("password")) {
			this.state = { username: localStorage.getItem("username"), password: localStorage.getItem("password")};
		} else {
			this.state = { username: '', password: ''};
		}
	}

	handleLogin = (username, password) => {
		this.setState({username: username, password: password});
		localStorage.setItem("username", username);
		localStorage.setItem("password", password);
	};

	handleLogout = () => {
		localStorage.setItem("username", '');
		localStorage.setItem("password", '');
		this.setState({username: '', password: ''});
	};

	//TODO: See bellow
	//TODO: Add Filter
	//TODO: Load listings from backend and pass them to map and serach bar

	render() {
		if (this.state.username === '' && this.state.password === '') {
			return (
				<div id="map_search">
					<SimpleMap mapType={'MAIN'}/>
					<SearchField/>
					<Login_Reg_Button onLoginRegister={this.handleLogin}/>
				</div>
			);
		} else {
			return (
				<div id="map_search">
					<SimpleMap mapType={'MAIN'}/>
					<SearchField/>
					<New_Listing_Button/>
					{/* TODO: change link to profile page when done (can find username and password in local storage no need to pass)*/}
					<Link to={"/profile"}>
						<Button variant="contained" color="primary" style={{ position: 'fixed', right: '10%', top: '5%', float: 'right' }}>
							View Profile
						</Button>
					</Link>
					<Button variant="contained" color="primary" onClick={this.handleLogout}
							style={{ position: 'fixed', right: '3%', top: '5%', float: 'right', backgroundColor: '#404040', color: '#FFFFFF' }}>
						Log Out
					</Button>
				</div>
			);
		}
	}
}
export default App;
