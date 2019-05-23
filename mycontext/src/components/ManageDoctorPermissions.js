import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {
    ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, ExpansionPanelActions,
    Divider, Chip, Typography, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
    InputLabel, Select, OutlinedInput, MenuItem, FormControl, LinearProgress
} from '@material-ui/core';
import { Redirect } from 'react-router-dom';
import { ExpandMore, AddCircle } from '@material-ui/icons';
import api from '../api/blockChainService';
class ManageDoctorPermissions extends Component {
    state = {}
    constructor(props) {
        super(props);
        this.state = {
            doctors: '',
            all_doctors: [],
            open: false,
            newDoctor: '',
            loaded: false,
            labelWidth: '',
            addDoctor: '',
            RecordsId: ''
        }
        this.handleDelete = this.handleDelete.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }

    handleSubmit() {
        // Make put api call here
        api.patient_doctor_permissions_update(this.state.RecordsId, this.state.doctors)
            .then(response => {
                console.log(JSON.stringify(response));
                alert("Submitted");
            })
            .catch((err) => {
                alert("Failed!");
            })
    };

    handleCancel() {
        if (sessionStorage.getItem('jwt')) {
            api.patient_vitals_get(this.props.email)
                .then((response) => {
                    this.setState({ doctors: response[0].doctors });
                })
                .catch((err) => {
                    console.log(err);
                })
        }
        else {
            this.setState({ redirect: true });
        }
    }

    handleClose() {
        this.setState({ open: false });
    };

    handleInputChange(event) {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            [name]: value
        })
    }

    handleDelete(doctor) {
        this.setState({
            doctors: ''
        })
    };

    handleAdd() {
        api.patient_get_alldoctors()
            .then(response => {
                this.setState({ all_doctors: response });
                this.setState({ open: true });
            })
            .catch(err => {
                console.log(JSON.stringify(err));
            })
    }

    handleFormSubmit(newDoctor) {
        this.setState({
            doctors: newDoctor
        })
        this.setState({ open: false });
    }

    componentDidMount() {
        if (sessionStorage.getItem('jwt')) {
            api.patient_vitals_get(this.props.email)
                .then((response) => {
                    console.log("Doctors : " + JSON.stringify(response));
                    this.setState({ doctors: response[0].doctors });
                    this.setState({ RecordsId: response[0].RecordsId });
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

        let menuItems = {}

        if (this.state.loaded) {
            menuItems =
                this.state.all_doctors.map((doctor, index) => {
                    return (
                        <MenuItem key={index} value={doctor.email} style={{ "fontSize": "13px" }}>{doctor.email}</MenuItem>
                    )
                });
        }

        return (
            <div>
                <Typography>MANAGE PERMISSIONS</Typography>
                <ExpansionPanel defaultExpanded>
                    <ExpansionPanelSummary expandIcon={<ExpandMore />}>
                        <div>
                            <Typography>Manage Patient Medications</Typography>
                        </div>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails style={{ "display": "block" }}>
                        {this.state.doctors !== "" &&
                            <Chip label={this.state.doctors}
                                color="primary"
                                onDelete={() => this.handleDelete()}
                                style={{ "margin": "5px" }} />}
                        <Chip label="Replace"
                            onDelete={this.handleAdd}
                            color="primary"
                            deleteIcon={<AddCircle />}
                            style={{ "margin": "5px" }} />
                    </ExpansionPanelDetails>
                    <Divider />
                    <Divider />
                    <ExpansionPanelActions>
                        <Button size="small" onClick={this.handleCancel} >Cancel</Button>
                        <Button size="small" color="primary" onClick={this.handleSubmit}>Submit</Button>
                    </ExpansionPanelActions>
                </ExpansionPanel>

                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Doctors</DialogTitle>
                    <DialogContent>
                        <DialogContentText>Please select a doctor to give READ access </DialogContentText>
                        <FormControl variant="outlined" style={{ "marginTop": "10px", "width": "100%", "float": "left", "marginBottom": "10px" }}>
                            <Select
                                value={this.state.addDoctor}
                                onChange={this.handleInputChange}
                                variant="filled"
                                input={
                                    <OutlinedInput
                                        name="addDoctor"
                                        id="select-transaction"
                                    />
                                }>>
                                {menuItems}
                            </Select>
                        </FormControl>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">Cancel</Button>
                        <Button onClick={() => this.handleFormSubmit(this.state.addDoctor)} color="primary">Add</Button>
                    </DialogActions>
                </Dialog>
            </div >);
    }
}

export default ManageDoctorPermissions;