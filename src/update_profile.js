import  React from "react";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";

export default class UpdateProfile extends React.Component
{
    constructor()
    {
        super();
        this.state = {
            username: '',
            password: '',
            new_password: '',
            email: '',
            phone_number: '',
            agency: '',
            image: null
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event)
    {
        const {name, value} = event.target;
        this.setState({[name]: value});
    }

    handleSubmit(event)
    {
        event.preventDefault();

    }

    render()
    {
        return(
            <Paper style={{paddingLeft: "10px", paddingRight: "10px", paddingBottom: "10px", textAlign: 'center'}}>
                <Typography variant="h6" gutterBottom>
                Details
                </Typography>
               <form onSubmit={this.handleSubmit}>
                    <TextField id="username" fullWidth variant="outlined" label="Username" style={{display: 'block', margin: '10px 0 0 0'}} onChange={this.handleChange}/>
                    <TextField id="password" fullWidth variant="outlined" label="Password" style={{display: 'block', margin: '10px 0 0 0'}} onChange={this.handleChange}/>
                    <TextField id="new_password" fullWidth variant="outlined" label="New Password" style={{display: 'block', margin: '10px 0 0 0'}} onChange={this.handleChange}/>
                    <TextField id="email" fullWidth variant="outlined" label="Email" style={{display: 'block', margin: '10px 0 0 0'}} onChange={this.handleChange}/>
                    <TextField id="phone_number" fullWidth variant="outlined" label="Phone Number" style={{display: 'block', margin: '10px 0 0 0'}} onChange={this.handleChange}/>
                    <TextField id="agency" fullWidth variant="outlined" label="Agency" style={{display: 'block', margin: '10px 0 0 0'}} onChange={this.handleChange}/>
                    <input id="image" type="file" style={{display: 'block', margin: '10px 0 0 0'}} onChange={this.handleChange}/>
                    <Button type="submit" variant="contained" color="primary" style={{display: 'block', margin: '10px 0 0 0'}}>
                    Update Profile
                    </Button>
                </form>
            </Paper>
        );
    }
}