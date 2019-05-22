import React, { Component, Fragment } from 'react';
import { Button, Card, Typography, TextField, LinearProgress } from '@material-ui/core';
import { EditOutlined, SaveOutlined } from "@material-ui/icons";
import { Redirect } from 'react-router-dom';
import api from '../api/blockChainService';
class MyProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            myprofile: {},
            redirect: false,
            disabled: true,
            loaded: false
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }

    componentDidMount() {
        if (sessionStorage.getItem('jwt')) {
            console.log("MY PROFILE " + this.props.email);
            api.patient_myprofile_request(this.props.email, this.props.role)
                .then((response) => {
                    console.log(response[0].Phone);
                    this.setState({ myprofile: response[0] });
                    this.setState({ loaded: true });
                })
                .catch((err) => {
                    console.log(err);
                })
        }
        else {
            this.setState({ redirect: true });
        }
    }

    handleEdit() {
        if (!this.state.disabled) {
            console.log("Make api call here");
            if (sessionStorage.getItem('jwt')) {
                this.setState({loaded : false});
                if (this.props.role === 'Doctor') {
                    api.doctor_myprofile_update(this.state.myprofile)
                        .then((response) => {
                            console.log(JSON.stringify(response));
                            this.setState({ disabled: true });
                            this.setState({ loaded: true });
                        })
                        .catch((err) => {
                            console.log(JSON.stringify(err));
                        })
                }
                else if(this.props.role === 'Patient'){
                    api.patient_myprofile_update(this.state.myprofile)
                    .then((response) => {
                        console.log(JSON.stringify(response));
                        this.setState({ disabled: true });
                        this.setState({ loaded: true });
                    })
                    .catch((err) => {
                        console.log(JSON.stringify(err));
                    })
                }
            }
            else {
                this.setState({ redirect: true });
            }
        }
        else {
            this.setState({ disabled: false });
            this.setState({ label: 'SAVE' });
        }
    }

    handleCancel() {
        if (sessionStorage.getItem('jwt')) {
            api.patient_myprofile_request(this.props.email, this.props.role)
                .then((response) => {
                    console.log(response[0].Phone);
                    this.setState({ myprofile: response[0] });
                    this.setState({ disabled: true });
                })
                .catch((err) => {
                    console.log(err);
                })
        }
        else {
            this.setState({ redirect: true });
        }
    }

    handleInputChange(event) {
        const target = event.target;
        const name = target.name;
        const value = target.value;
        this.setState(prevState => ({
            ...prevState,
            myprofile: {
                ...prevState.myprofile,
                [name]: value
            }
        }));
    }


    render() {

        if (this.state.redirect) {
            return (
                <Redirect to='/' />
            )
        };

        if (!this.state.loaded) {
            return (
                <LinearProgress style={{ "align": "center" }} />
            )
        }

        return (
            <div>
                <Typography style={{ "marginBottom": "20px" }}>MY PROFILE</Typography>
                <div style={{ "width": "100%" }}>
                    <Card style={{ "float": "left", "width": "49%" }}>
                        <div style={{ "margin": "10px" }}>
                            <TextField
                                id="outlined-read-only-input"
                                label="Email"
                                name="email"
                                defaultValue="Email ID"
                                value={this.state.myprofile.email}
                                onChange={this.handleInputChange}
                                InputProps={{
                                    readOnly: this.state.disabled,
                                }}
                                margin="normal"
                                fullWidth
                                variant="outlined"
                            />
                            <br />
                            <TextField
                                id="outlined-read-only-input"
                                label="First Name"
                                name="firstName"
                                defaultValue="First Name"
                                value={this.state.myprofile.firstName}
                                onChange={this.handleInputChange}
                                margin="normal"
                                fullWidth
                                InputProps={{
                                    readOnly: this.state.disabled,
                                }}
                                variant="outlined"
                            />
                            <br />
                            <TextField
                                id="outlined-read-only-input"
                                label="Last Name"
                                name="lastName"
                                defaultValue="Last Name"
                                value={this.state.myprofile.lastName}
                                onChange={this.handleInputChange}
                                margin="normal"
                                fullWidth
                                InputProps={{
                                    readOnly: this.state.disabled,
                                }}
                                variant="outlined"
                            />
                            <br />
                            <TextField
                                id="outlined-read-only-input"
                                label="Phone"
                                name="Phone"
                                defaultValue="Phone"
                                value={this.state.myprofile.Phone}
                                onChange={this.handleInputChange}
                                margin="normal"
                                fullWidth
                                InputProps={{
                                    readOnly: this.state.disabled,
                                }}
                                variant="outlined"
                            />
                            <br />
                            {this.props.role === 'Doctor' &&
                                <TextField
                                    id="outlined-read-only-input"
                                    label="Gender"
                                    name="Gender"
                                    defaultValue="Gender"
                                    value={this.state.myprofile.Gender}
                                    onChange={this.handleInputChange}
                                    margin="normal"
                                    fullWidth
                                    InputProps={{
                                        readOnly: this.state.disabled,
                                    }}
                                    variant="outlined"
                                />}
                        </div>
                    </Card>
                    {this.props.role === 'Patient' && <Card style={{ "float": "left", "width": "49%", "marginLeft": "10px" }}>
                        <div style={{ "margin": "10px" }}>
                            {this.props.role === 'Patient' &&
                                <React.Fragment>
                                    <TextField
                                        id="outlined-read-only-input"
                                        label="Address"
                                        name="Address"
                                        defaultValue="Address"
                                        value={this.state.myprofile.Address}
                                        onChange={this.handleInputChange}
                                        margin="normal"
                                        fullWidth
                                        InputProps={{
                                            readOnly: this.state.disabled,
                                        }}
                                        variant="outlined"
                                    /><br /></React.Fragment>}

                            {this.props.role === 'Patient' &&
                                <React.Fragment>
                                    <TextField
                                        id="outlined-read-only-input"
                                        label="Date Of Birth"
                                        name="DOB"
                                        defaultValue="DOB"
                                        value={this.state.myprofile.DOB}
                                        onChange={this.handleInputChange}
                                        margin="normal"
                                        fullWidth
                                        InputProps={{
                                            readOnly: this.state.disabled,
                                        }}
                                        variant="outlined"
                                    /><br /></React.Fragment>}

                            {this.props.role === 'Patient' && <React.Fragment><TextField
                                id="outlined-read-only-input"
                                label="Status"
                                name="status"
                                defaultValue="Status"
                                value={this.state.myprofile.status}
                                onChange={this.handleInputChange}
                                margin="normal"
                                fullWidth
                                InputProps={{
                                    readOnly: this.state.disabled,
                                }}
                                variant="outlined"
                            /><br /></React.Fragment>}

                            {this.props.role === 'Patient' &&
                                <TextField
                                    id="outlined-read-only-input"
                                    label="Gender"
                                    name="Gender"
                                    defaultValue="Gender"
                                    value={this.state.myprofile.Gender}
                                    onChange={this.handleInputChange}
                                    margin="normal"
                                    fullWidth
                                    InputProps={{
                                        readOnly: this.state.disabled,
                                    }}
                                    variant="outlined"
                                />}

                        </div>
                    </Card>}
                    <Button variant="contained" color="primary" style={{ "margin": "20px" }}
                        onClick={this.handleEdit}>
                        {
                            this.state.disabled && <div>EDIT</div>
                        }
                        {
                            !this.state.disabled && <div>SAVE</div>
                        }
                        {
                            this.state.disabled && <EditOutlined />
                        }
                        {
                            !this.state.disabled && <SaveOutlined />
                        }
                    </Button>
                    <Button variant="contained" color="primary" style={{ "margin": "10px" }}
                        onClick={this.handleCancel}>CANCEL</Button>
                </div>
            </div>
        );
    }
}

export default MyProfile;