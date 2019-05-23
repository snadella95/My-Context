import React, { Component } from 'react';
import {
    ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, ExpansionPanelActions,
    Divider, Chip, Typography, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
    TextField, LinearProgress
} from '@material-ui/core';
import { Redirect } from 'react-router-dom';
import api from '../api/blockChainService';
import { ExpandMore, AddCircle } from '@material-ui/icons';
class Allergies extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allergies: [],
            open: false,
            newAllergies: '',
            RecordsId: '',
            loaded: false
        }
        this.handleDelete = this.handleDelete.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    };

    handleSubmit() {
        // Make put api call here
        api.patient_allergies_update(this.state.RecordsId, this.state.allergies)
            .then(response => {
                console.log(JSON.stringify(response));
                alert("Submitted Successfully");
            })
            .catch(err => {
                console.log(JSON.stringify(err));
            })
    };

    handleCancel() {
        if (sessionStorage.getItem('jwt')) {
            api.patient_medications_get(this.props.email)
                .then((response) => {
                    this.setState({ allergies: response[0].Allergies });
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

    handleDelete(allergy) {
        this.setState(prevState => {
            const allergies = [...prevState.allergies];
            const ChipToDelete = allergies.indexOf(allergy);
            allergies.splice(ChipToDelete, 1);
            return { allergies };
        })
    };

    handleAdd() {
        this.setState({ open: true });
    }

    handleFormSubmit(newAllergies) {
        this.setState(prevState => ({
            allergies: [...prevState.allergies, newAllergies]
        }));
        this.setState({ newAllergies: '' });
        this.setState({ open: false });
    }

    componentDidMount() {
        if (sessionStorage.getItem('jwt')) {
            api.patient_vitals_get(this.props.email)
                .then((response) => {
                    console.log(JSON.stringify(response[0].Allergies));
                    this.setState({ RecordsId: response[0].RecordsId });
                    this.setState({ allergies: response[0].Allergies });
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
        return (
            <div>
                <Typography>ALLERGIES RECORDS</Typography>
                <ExpansionPanel defaultExpanded>
                    <ExpansionPanelSummary expandIcon={<ExpandMore />}>
                        <div>
                            <Typography>Manage Patient allergies</Typography>
                        </div>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails style={{ "display": "block" }}>
                        {this.state.allergies.map((problem, id) => {
                            return (
                                <Chip label={problem}
                                    color="primary"
                                    onDelete={() => this.handleDelete(problem)}
                                    style={{ "margin": "5px" }}
                                    key={id}
                                />
                            )
                        })}
                        <Chip label="Add"
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
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">Add Patient Problem</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Please mention complete details to log this into patient medical records.
            </DialogContentText>
                        <TextField
                            id="outlined-read-only-input"
                            label="Enter details"
                            name="newAllergies"
                            value={this.state.newAllergies}
                            onChange={this.handleInputChange}
                            margin="normal"
                            fullWidth
                            variant="outlined"
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Cancel
            </Button>
                        <Button onClick={() => this.handleFormSubmit(this.state.newAllergies
                        )} color="primary">
                            Add
            </Button>
                    </DialogActions>
                </Dialog>

            </div>
        );
    }
}

export default Allergies;