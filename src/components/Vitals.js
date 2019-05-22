import React, { Component } from 'react';
import {
    Button, Card, Typography, TextField, LinearProgress
} from '@material-ui/core';
import { EditOutlined, SaveOutlined } from '@material-ui/icons';
import { Redirect } from 'react-router-dom';
import api from "../api/blockChainService";
class Vitals extends Component {

    constructor(props) {
        super(props);
        this.state = {
            RecordsId: '',
            vitals: {},
            disabled: true,
            loaded: false
        }
        this.handleEdit = this.handleEdit.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleEdit() {
        if (!this.state.disabled) {
            console.log("Make api call here");
            if (sessionStorage.getItem('jwt')) {
                api.patient_vitals_update(this.state.RecordsId, this.state.vitals)
                    .then(response => {
                        console.log(JSON.stringify(response));
                        this.setState({ disabled: true })
                    })
                    .catch((err) => {
                        console.log(JSON.stringify(err));
                    })
            }
        } else {
            this.setState({ disabled: false });
            this.setState({ label: 'SAVE' });
        }

    }

    handleCancel() {
        if (sessionStorage.getItem('jwt')) {
            console.log("props email : " + this.props.email)
            api.patient_vitals_get(this.props.email)
                .then((response) => {
                    this.setState(
                        { vitals: response[0].vitals });
                    this.setState(
                        {
                            RecordsId: response[0].RecordsId
                        })
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
            vitals: {
                ...prevState.vitals,
                [name]: value
            }
        }))
    };

    componentDidMount() {
        if (sessionStorage.getItem('jwt')) {
            api.patient_vitals_get(this.props.email)
                .then((response) => {
                    this.setState(
                        { vitals: response[0].vitals });
                    this.setState(
                        {
                            RecordsId: response[0].RecordsId
                        })
                    this.setState({ loaded: true });
                }).catch((err) => {
                    console.log(err);
                });
            this.setState({ disabled: true });
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
                <div style={{ "width": "100%", "display": "inline-block" }}>
                    <Typography>MY VITALS</Typography>
                    <Button variant="contained"
                        color="primary"
                        style={{ "margin": "10px", "float": "right", "marginRight": "0px" }}
                        onClick={this.handleCancel} >CANCEL</Button>
                    <Button variant="contained"
                        color="primary"
                        style={{ "margin": "10px", "float": "right", "marginRight": "0px" }}
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
                </div>
                <div style={{ "width": "100%" }}>
                    <Card style={{ "float": "left", "width": "49%" }}>
                        <div style={{ "margin": "10px" }}>
                            <TextField
                                id="outlined-read-only-input"
                                label="General Appearance"
                                name="GeneralAppearance"
                                value={this.state.vitals.GeneralAppearance}
                                defaultValue="General Apperance"
                                InputProps={{
                                    readOnly: this.state.disabled,
                                }}
                                margin="normal"
                                fullWidth
                                onChange={this.handleInputChange}
                                variant="outlined"
                            />
                            <br />
                            <TextField
                                id="outlined-read-only-input"
                                label="Height"
                                name="Height"
                                value={this.state.vitals.Height}
                                defaultValue="Height"
                                margin="normal"
                                fullWidth
                                InputProps={{
                                    readOnly: this.state.disabled,
                                }}
                                onChange={this.handleInputChange}
                                variant="outlined"
                            />
                            <br />
                            <TextField
                                id="outlined-read-only-input"
                                label="Weight"
                                name="Weight"
                                value={this.state.vitals.Weight}
                                defaultValue="Weight"
                                margin="normal"
                                fullWidth
                                InputProps={{
                                    readOnly: this.state.disabled,
                                }}
                                onChange={this.handleInputChange}
                                variant="outlined"
                            />
                            <br />
                            <TextField
                                id="outlined-read-only-input"
                                label="Temperature"
                                name="Temperature"
                                defaultValue="Temperature"
                                value={this.state.vitals.Temperature}
                                margin="normal"
                                fullWidth
                                InputProps={{
                                    readOnly: this.state.disabled
                                }}
                                onChange={this.handleInputChange}
                                variant="outlined"
                            />
                            <TextField
                                id="outlined-read-only-input"
                                label="Rythm"
                                name="Rythm"
                                defaultValue="Rythm"
                                value={this.state.vitals.Rythm}
                                margin="normal"
                                fullWidth
                                InputProps={{
                                    readOnly: this.state.disabled,
                                }}
                                onChange={this.handleInputChange}
                                variant="outlined"
                            />
                            <br />
                            <TextField
                                id="outlined-read-only-input"
                                label="BloodPressure"
                                name="BP"
                                defaultValue="BP"
                                value={this.state.vitals.BP}
                                margin="normal"
                                fullWidth
                                InputProps={{
                                    readOnly: this.state.disabled,
                                }}
                                onChange={this.handleInputChange}
                                variant="outlined"
                            />
                            <br />
                            <TextField
                                id="outlined-read-only-input"
                                label="Eyes"
                                name="Eyes"
                                defaultValue="Eyes"
                                value={this.state.vitals.Eyes}
                                margin="normal"
                                fullWidth
                                InputProps={{
                                    readOnly: this.state.disabled,
                                }}
                                onChange={this.handleInputChange}
                                variant="outlined"
                            />
                            <br />
                            <TextField
                                id="outlined-read-only-input"
                                label="Ear/Nose/Throat"
                                name="EarNoseThroat"
                                defaultValue="Ear/Nose/Throat"
                                value={this.state.vitals.EarNoseThroat}
                                margin="normal"
                                fullWidth
                                InputProps={{
                                    readOnly: this.state.disabled,
                                }}
                                onChange={this.handleInputChange}
                                variant="outlined"
                            />
                            <br />
                            <TextField
                                id="outlined-read-only-input"
                                label="CardioVascular"
                                name="CardioVascular"
                                defaultValue="CardioVascular"
                                value={this.state.vitals.CardioVascular}
                                margin="normal"
                                fullWidth
                                InputProps={{
                                    readOnly: this.state.disabled,
                                }}
                                onChange={this.handleInputChange}
                                variant="outlined"
                            />
                            <br />
                        </div>
                    </Card>
                    <Card style={{ "float": "right", "width": "49%", "marginLeft": "10px" }}>
                        <div style={{ "margin": "10px" }}>
                            <TextField
                                id="outlined-read-only-input"
                                label="Respiratory"
                                name="Respiratory"
                                defaultValue="Respiratory"
                                value={this.state.vitals.Respiratory}
                                margin="normal"
                                fullWidth
                                InputProps={{
                                    readOnly: this.state.disabled,
                                }}
                                onChange={this.handleInputChange}
                                variant="outlined"
                            />
                            <br />
                            <TextField
                                id="outlined-read-only-input"
                                label="Gastrointestinal"
                                name="Gastrointestinal"
                                defaultValue="Gastrointestinal"
                                value={this.state.vitals.Gastrointestinal}
                                margin="normal"
                                fullWidth
                                InputProps={{
                                    readOnly: this.state.disabled,
                                }}
                                onChange={this.handleInputChange}
                                variant="outlined"
                            />
                            <br />
                            <TextField
                                id="outlined-read-only-input"
                                label="Genitourinary"
                                name="Genitourinary"
                                defaultValue="Genitourinary"
                                value={this.state.vitals.Genitourinary}
                                margin="normal"
                                fullWidth
                                InputProps={{
                                    readOnly: this.state.disabled,
                                }}
                                onChange={this.handleInputChange}
                                variant="outlined"
                            />
                            <br />
                            <TextField
                                id="outlined-read-only-input"
                                label="MusculoSkeletal"
                                name="MusculoSkeletal"
                                defaultValue="MusculoSkeletal"
                                value={this.state.vitals.MusculoSkeletal}
                                margin="normal"
                                fullWidth
                                InputProps={{
                                    readOnly: this.state.disabled,
                                }}
                                onChange={this.handleInputChange}
                                variant="outlined"
                            />
                            <TextField
                                id="outlined-read-only-input"
                                label="Skin"
                                name="Skin"
                                defaultValue="Skin"
                                value={this.state.vitals.Skin}
                                margin="normal"
                                fullWidth
                                InputProps={{
                                    readOnly: this.state.disabled,
                                }}
                                onChange={this.handleInputChange}
                                variant="outlined"
                            />
                            <br />
                            <TextField
                                id="outlined-read-only-input"
                                label="NeuroLogic"
                                name="NeuroLogic"
                                defaultValue="NeuroLogic"
                                value={this.state.vitals.NeuroLogic}
                                margin="normal"
                                fullWidth
                                InputProps={{
                                    readOnly: this.state.disabled,
                                }}
                                onChange={this.handleInputChange}
                                variant="outlined"
                            />
                            <br />
                            <TextField
                                id="outlined-read-only-input"
                                label="Pyschiatric"
                                name="Pyschiatric"
                                defaultValue="Pyschiatric"
                                value={this.state.vitals.Pyschiatric}
                                margin="normal"
                                fullWidth
                                InputProps={{
                                    readOnly: this.state.disabled,
                                }}
                                onChange={this.handleInputChange}
                                variant="outlined"
                            />
                            <br />
                            <TextField
                                id="outlined-read-only-input"
                                label="Endocrine"
                                name="Endocrine"
                                defaultValue="Endocrine"
                                value={this.state.vitals.Endocrine}
                                margin="normal"
                                fullWidth
                                InputProps={{
                                    readOnly: this.state.disabled,
                                }}
                                onChange={this.handleInputChange}
                                variant="outlined"
                            />
                            <br />
                            <TextField
                                id="outlined-read-only-input"
                                label="Vital Problems Summary"
                                name="problemsVital"
                                multiline
                                rows="3"
                                defaultValue="Problem Vitals"
                                value={this.state.vitals.problemsVital}
                                margin="normal"
                                fullWidth
                                InputProps={{
                                    readOnly: this.state.disabled,
                                }}
                                onChange={this.handleInputChange}
                                variant="outlined"
                            />
                            <br />
                        </div>
                    </Card>
                </div>
            </div>
        );
    }
}

export default Vitals;