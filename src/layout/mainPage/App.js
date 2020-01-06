import React, { Component } from 'react';
import SimpleMap from '../../components/map/map';
import SearchField from '../../components/searchBar/search';
import Login_Reg_Button from '../../components/login/login_register';
import Button from "@material-ui/core/Button";
import {Link} from "react-router-dom";
import New_Listing_Button from "../../components/addListing/addListing";
import axios from "axios";
import Filter from "../../components/filter/filter";

class App extends Component {

	constructor(props) {
		super(props);
		if (localStorage.getItem("username") && localStorage.getItem("password")) {
			this.state = { username: localStorage.getItem("username"), password: localStorage.getItem("password"), listings: [], filtered: []};
		} else {
			this.state = { username: '', password: '', listings: [], filtered: []};
		}
		this.getListings();
	}

	async getListings() {
		await axios.get('http://localhost:8000/api/listings/')
			.then((response) => {
				this.setState({listings: response.data});
				this.setState({filtered: response.data});
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

	handleFilter = (filter) => {
	    console.log(filter);
		let matrix = [[],[],[],[],[],[],[],[],[]];
		let arrays = [];
		for (let i = 0; i < this.state.listings.length; i++) {
			if (filter.address !== '') {
				if (this.state.listings[i].address.includes(filter.address))
					matrix[0].push(this.state.listings[i]);
				if (!arrays.includes(0)) arrays.push(0);
			} else {
				matrix[0].push(this.state.listings[i]);
			}
			if (filter.energy === true) {
				if (this.state.listings[i].energy === true)
					matrix[1].push(this.state.listings[i]);
				if (!arrays.includes(1)) arrays.push(1);
			} else {
				matrix[1].push(this.state.listings[i]);
			}
			if (filter.water === true) {
				if (this.state.listings[i].water === true)
					matrix[2].push(this.state.listings[i]);
				if (!arrays.includes(2)) arrays.push(2);
			} else {
				matrix[2].push(this.state.listings[i]);
			}
			if (filter.gas === true) {
				if (this.state.listings[i].gas === true)
					matrix[3].push(this.state.listings[i]);
				if (!arrays.includes(3)) arrays.push(3);
			} else {
				matrix[3].push(this.state.listings[i]);
			}
			if (filter.internet === true) {
				if (this.state.listings[i].internet === true)
					matrix[4].push(this.state.listings[i]);
				if (!arrays.includes(4)) arrays.push(4);
			} else {
				matrix[4].push(this.state.listings[i]);
			}
			if (filter.dateSet === true) {
				if (this.state.listings[i].valid_from >= filter.validFrom)
					matrix[5].push(this.state.listings[i]);
				if (!arrays.includes(5)) arrays.push(5);
			} else {
				matrix[5].push(this.state.listings[i]);
			}
			if (filter.price.min !== '') {
				if (this.state.listings[i].price >= filter.price.min && this.state.listings[i].price <= filter.price.max)
					matrix[6].push(this.state.listings[i]);
				if (!arrays.includes(6)) arrays.push(6);
			} else {
				matrix[6].push(this.state.listings[i]);
			}
			if (filter.bed.min !== '') {
				if (this.state.listings[i].bedrooms >= filter.bed.min && this.state.listings[i].bedrooms <= filter.bed.max)
					matrix[7].push(this.state.listings[i]);
				if (!arrays.includes(7)) arrays.push(7);
			} else {
				matrix[7].push(this.state.listings[i]);
			}
			if (filter.contract.min !== '') {
				if (this.state.listings[i].contract_length >= filter.contract.min && this.state.listings[i].contract_length <= filter.contract.max)
					matrix[8].push(this.state.listings[i]);
				if (!arrays.includes(8)) arrays.push(8);
			} else {
				matrix[8].push(this.state.listings[i]);
			}
		}
		console.log(matrix);
		console.log(arrays);
		let result = matrix[arrays[0]];
		for (let j = 1; j < arrays.length; j++) {
			result.filter(value => matrix[arrays[j]].includes(value));
		}
		this.setState({filtered: result});
	};

	render() {
		if (this.state.username === '' && this.state.password === '') {
			return (
				<div id="map_search">
					<SimpleMap mapType={'MAIN'} routes={this.state.filtered}/>
					<SearchField listings={this.state.filtered}/>
					<Filter onFilter={this.handleFilter}/>
					<Login_Reg_Button onLoginRegister={this.handleLogin}/>
				</div>
			);
		} else {
			return (
				<div id="map_search">
					<SimpleMap mapType={'MAIN'} routes={this.state.filtered}/>
					<SearchField listings={this.state.filtered}/>
					<Filter onFilter={this.handleFilter}/>
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
