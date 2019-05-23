import React, { Component } from 'react';
import {
    ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, ExpansionPanelActions,
    Divider, Chip, Typography, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
    TextField, LinearProgress
} from '@material-ui/core';
import { Redirect } from 'react-router-dom';
import api from '../api/blockChainService';
import { ExpandMore, AddCircle } from '@material-ui/icons';
class Medications extends Component {
    constructor(props) {
        super(props);
        this.state = {
            medications: [],
            open: false,
            RecordsId: '',
            newMedication: '',
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
        api.patient_medications_update(this.state.RecordsId, this.state.medications)
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
                    this.setState({ medications: response[0].Medications });
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

    handleDelete(medication) {
        this.setState(prevState => {
            const medications = [...prevState.medications];
            const ChipToDelete = medications.indexOf(medication);
            medications.splice(ChipToDelete, 1);
            return { medications };
        })
    };

    handleAdd() {
        this.setState({ open: true });
    }

    handleFormSubmit(newMedication) {
        this.setState(prevState => ({
            medications: [...prevState.medications, newMedication]
        }));
        this.setState({ newMedication: '' });
        this.setState({ open: false });
    }

    componentDidMount() {
        if (sessionStorage.getItem('jwt')) {
            api.patient_vitals_get(this.props.email)
                .then((response) => {
                    console.log(JSON.stringify(response[0].Medications));
                    this.setState({ RecordsId: response[0].RecordsId });
                    this.setState({ medications: response[0].Medications });
                    this.setState({loaded : true});
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
                <Typography>MEDICATIONS RECORDS</Typography>
                <ExpansionPanel defaultExpanded>
                    <ExpansionPanelSummary expandIcon={<ExpandMore />}>
                        <div>
                            <Typography>Manage Patient Medications</Typography>
                        </div>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails style={{ "display": "block" }}>
                        {this.state.medications.map((problem, id) => {
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
                            name="newMedication"
                            value={this.state.newMedication}
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
                        <Button onClick={() => this.handleFormSubmit(this.state.newMedication)} color="primary">
                            Add
            </Button>
                    </DialogActions>
                </Dialog>

            </div>
        );
    }
}

export default Medications;