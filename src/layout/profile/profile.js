import React from "react";
import Grid from '@material-ui/core/Grid';
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import ListingList from "../../components/profileDetails/listingList";
import UpdateProfile from "../../components/profileDetails/updateProfile";
import {Link} from "react-router-dom";
import axios from "axios";

export default class ProfilePage extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            username: localStorage.getItem("username"),
            password: '',
            email: '',
            phone: '',
            listings: []
        };
    }

    handleLogout = () => {
        localStorage.setItem("username", '');
        localStorage.setItem("password", '');
    };

    componentDidMount() {
        axios.get("http://localhost:8000/users/" + localStorage.getItem("username") + "/")
            .then(res => {
                this.setState({email: res.data.email, phone: res.data.phone});
            }).catch((error) => {
            if (error.response) {
                alert(error.response.status + ' request failed: ' + error.response.data);
            } else {
                alert('Request failed: ' + error.message);
            }
        });

        axios.get("http://localhost:8000/listings/" + localStorage.getItem("username") + "/")
            .then(res => {
                this.setState({listings: res.data});
            }).catch((error) => {
            if (error.response) {
                alert(error.response.status + ' request failed: ' + error.response.data);
            } else {
                alert('Request failed: ' + error.message);
            }
        });
    }

    render() {
        return (
            <Grid container style={{backgroundColor: '#404040', color: '#FFFFFF', paddingTop: 22, paddingBottom: 15}}>
                <Grid item xs={12}>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h4" gutterBottom style={{float: 'left', paddingLeft: 50}}>
                        Profile
                    </Typography>
                    <Link to={"/"}>
                        <Button variant="contained" color="secondary" style={{float: 'right', marginRight: "5%"}} onClick={this.handleLogout}>
                            Log out
                        </Button>
                    </Link>
                    <Link to={"/"}>
                        <Button variant="contained" color="primary" style={{float: 'right', marginRight: "2%"}}>
                            Main Page
                        </Button>
                    </Link>
                </Grid>
                <Grid item xs={6} style={{paddingLeft: 50, paddingTop: 40}}>
                    <UpdateProfile details={this.state}/>
                    <br/>
                </Grid>
                <Grid item xs={6} style={{paddingLeft: 40, paddingTop: 40}}>
                    <ListingList list={this.state.listings} />
                </Grid>
            </Grid>
        );
    }
}