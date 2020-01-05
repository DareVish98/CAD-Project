import  React from "react";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import axios from "axios";

export default class UpdateProfile extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            username: props.details.username,
            password: '',
            confirm_password: '',
            email: props.details.email,
            phone_number: props.details.phone_number,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event)
    {
        const {name, value} = event.target;
        this.setState({[name]: value});
    }

    handleSubmit(event)
    {
        event.preventDefault();

        let updatedProfile = {};

        if(this.state.password !== '' && this.state.confirm_password === this.state.password)
        {
            updatedProfile = {
                username: this.state.username,
                password: this.state.password,
                email: this.state.email,
                phone_number: this.state.phone_number
            }
        }
        else
        {
            alert("Password not updated because of bad verification");
            updatedProfile = {
                username: this.state.username,
                password: localStorage.getItem("password"),
                email: this.state.email,
                phone_number: this.state.phone_number
            }
        }

        axios.put("http://localhost:8000/users/" + localStorage.getItem("username") + "/", {updatedProfile})
            .then(res => {
                alert("Profile updated successfully");
            }).catch( (error) => {
            if (error.response) {
                alert(error.response.status + ' request failed: ' + error.response.data);
            } else {
                alert('Request failed: ' + error.message);
            }
        });
    }

    render()
    {
        return(
            <Paper style={{paddingLeft: "10px", paddingRight: "10px", paddingBottom: "10px", textAlign: 'center', width: 630, height: 562}}>
                <Typography variant="h6" gutterBottom style={{paddingTop: 10}}>
                    Details
                </Typography>
                <form onSubmit={this.handleSubmit}>
                    <TextField id="username" fullWidth variant="outlined" name="username" label="Username" style={{display: 'block', margin: '20px 0 0 0'}} value={this.state.username} onChange={this.handleChange}/>
                    <TextField id="password" fullWidth variant="outlined" name="password" label="Password" style={{display: 'block', margin: '20px 0 0 0'}} value={this.state.password} onChange={this.handleChange}/>
                    <TextField id="confirm_password" fullWidth variant="outlined" name="confirm_password" label="Confirm Password" style={{display: 'block', margin: '20px 0 0 0'}} value={this.state.confirm_password} onChange={this.handleChange}/>
                    <TextField id="email" fullWidth variant="outlined" label="Email" name="email" style={{display: 'block', margin: '20px 0 0 0'}} value={this.state.email} onChange={this.handleChange}/>
                    <TextField id="phone_number" fullWidth variant="outlined" name="phone_number" label="Phone Number" style={{display: 'block', margin: '20px 0 0 0'}} value={this.state.phone_number} onChange={this.handleChange}/>
                    <Button type="submit" variant="contained" color="primary" style={{display: 'block', margin: '20px 0 0 0'}}>
                        Update Profile
                    </Button>

                </form>
            </Paper>
        );
    }
}