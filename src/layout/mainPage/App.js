import React, { Component } from 'react';
import SimpleMap from '../../components/map/map';
import SearchField from '../../components/searchBar/search';
import Login_Reg_Button from '../../components/login/login_register';
import Button from "@material-ui/core/Button";
import {Link} from "react-router-dom";
import New_Listing_Button from "../../components/addListing/addListing";
import axios from "axios";

//TODO: Add Filter
class App extends Component {

	constructor(props) {
		super(props);
		if (localStorage.getItem("username") && localStorage.getItem("password")) {
			this.state = { username: localStorage.getItem("username"), password: localStorage.getItem("password"), listings: []};
		} else {
			this.state = { username: '', password: '', listings: []};
		}
		this.getListings();
	}

	async getListings() {
		await axios.get('http://localhost:8000/api/listings/')
			.then((response) => {
				this.setState({listings: response.data});
			}).catch( (error) => {
				if (error.response) {
					alert(error.response.status + ' request failed: ' + error.response.data);
				} else {
					alert('Request failed: ' + error.message);
				}
			});
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

	render() {
		if (this.state.username === '' && this.state.password === '') {
			return (
				<div id="map_search">
					<SimpleMap mapType={'MAIN'} routes={this.state.listings}/>
					<SearchField listings={this.state.listings}/>
					<Login_Reg_Button onLoginRegister={this.handleLogin}/>
				</div>
			);
		} else {
			return (
				<div id="map_search">
					<SimpleMap mapType={'MAIN'} routes={this.state.listings}/>
					<SearchField listings={this.state.listings}/>
					<New_Listing_Button/>
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
