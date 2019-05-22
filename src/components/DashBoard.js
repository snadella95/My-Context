import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import {
    Button,
    AppBar,
    Toolbar,
    Typography,
    CssBaseline,
    Drawer,
    Divider,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    IconButton,
    Hidden,
    withStyles,
    LinearProgress
} from '@material-ui/core';
import {
    MenuOutlined,
    AccountCircleRounded, TimelineRounded, ErrorOutlineRounded
    , SubjectRounded, CompareArrows, ReceiptRounded, HowToRegTwoTone
} from '@material-ui/icons';
import { Redirect } from 'react-router-dom';
import api from '../api/mongoService';
import MyProfile from './MyProfile';
import Vitals from './Vitals';
import Problems from './Problems';
import Medications from './Medications';
import Allergies from './Allergies';
import Transactions from './Transactions';
import ManageDoctorPermissions from './ManageDoctorPermissions';
import ViewRecords from './ViewRecords';
const drawerWidth = 240;

const styles = theme => ({
    root: {
        display: 'flex',
    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
    menuButton: {
        marginRight: 20,
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3,
    },
});
class dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
            username: '',
            email: '',
            mobileOpen: false,
            selectedIndex: 0,
            role: ''
        }
        this.handleLogOut = this.handleLogOut.bind(this);
        this.handleSeletedIndex = this.handleSeletedIndex.bind(this);
    }

    handleSeletedIndex(value) {

        console.log(value);
        this.setState({ selectedIndex: value });

    }

    componentDidMount() {
        if (sessionStorage.getItem('jwt')) {
            console.log('Load user feed');
            const auth_token = sessionStorage.getItem('jwt');
            api.dashboard_user(auth_token)
                .then((response) => {
                    console.log("Dashboard error : " + JSON.stringify(response));
                    this.setState({ role: response.user.role });
                    this.setState({ username: response.user.username });
                    this.setState({ email: response.user.email });
                })
                .catch((err) => {
                    console.log(err);
                })
        }
        else {
            this.setState({ redirect: true });
        }
    }

    handleDrawerToggle = () => {
        this.setState(state => ({ mobileOpen: !state.mobileOpen }));
    };

    handleLogOut(event) {

        sessionStorage.removeItem('jwt');
        this.setState({ redirect: true });

    }


    render() {
        if (this.state.redirect) {
            return (<Redirect to="/" />);
        }

        if (this.state.email === "" && this.state.role === "") {
            return (<LinearProgress color="primary" />);
        }
        const { classes } = this.props;
        const { mobileOpen } = this.state;

        const drawer = (

            <div>
                <div className={classes.toolbar} />
                <Divider />
                <List>
                    <ListItem button onClick={() => this.handleSeletedIndex(1)}>
                        <ListItemIcon><AccountCircleRounded /></ListItemIcon>
                        <ListItemText primary="My Profile" />
                    </ListItem>

                    {this.state.role === 'Patient' && (<ListItem button onClick={() => this.handleSeletedIndex(2)}>
                        <ListItemIcon ><TimelineRounded /></ListItemIcon>
                        <ListItemText primary="Vitals" />
                    </ListItem>)}

                    {this.state.role === 'Patient' && (
                        <ListItem button onClick={() => this.handleSeletedIndex(3)}>
                            <ListItemIcon ><ErrorOutlineRounded /></ListItemIcon>
                            <ListItemText primary="Problems" />
                        </ListItem>
                    )}

                    {this.state.role === 'Patient' && (<ListItem button onClick={() => this.handleSeletedIndex(4)}>
                        <ListItemIcon ><ReceiptRounded /></ListItemIcon>
                        <ListItemText primary="Medications" />
                    </ListItem>)}

                    {this.state.role === 'Patient' && (<ListItem button onClick={() => this.handleSeletedIndex(5)}>
                        <ListItemIcon><ErrorOutlineRounded /></ListItemIcon>
                        <ListItemText primary="Allergies" />
                    </ListItem>)}

                </List>
                <Divider />
                <List>
                    {this.state.role === 'Patient' && (<ListItem button onClick={() => this.handleSeletedIndex(6)}>
                        <ListItemIcon><CompareArrows /></ListItemIcon>
                        <ListItemText primary="My Transactions" />
                    </ListItem>)}
                </List>
                <List style={{ "paddingTop": "0px" }}>
                    {this.state.role === 'Patient' && (<ListItem button onClick={() => this.handleSeletedIndex(8)}>
                        <ListItemIcon><HowToRegTwoTone /></ListItemIcon>
                        <ListItemText primary="Manage Doctor Permissions" />
                    </ListItem>)}
                    {this.state.role === 'Doctor' && (<ListItem button onClick={() => this.handleSeletedIndex(7)}>
                        <ListItemIcon ><TimelineRounded /></ListItemIcon>
                        <ListItemText primary="View Patient Records" />
                    </ListItem>)}
                </List>
            </div >
        );

        return (
            <div>
                {/* <p>DashBoard</p> */}
                <div className={classes.root}>
                    <CssBaseline />
                    <AppBar position="absolute" className={classes.appBar}>
                        <Toolbar>
                            <IconButton
                                color="inherit"
                                aria-label="Open drawer"
                                onClick={this.handleDrawerToggle}
                                className={classes.menuButton}
                            >
                                <MenuOutlined />
                            </IconButton>
                            <Typography color="inherit" noWrap style={{ "width": "100%" }}>
                                <p style={{ "float": "left", "fontSize": "18px" }}>MYCONTEXT
                                            <span style={{ "fontSize": "10px" }}>  {this.state.role.toUpperCase()} : {this.state.username.toUpperCase()}</span></p>
                                <Button onClick={this.handleLogOut} style={{ "float": "right", "marginTop": "10px" }} variant="contained">LOGOUT</Button>
                            </Typography>
                        </Toolbar>
                    </AppBar>
                    <nav className={classes.drawer}>
                        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                        <Hidden smUp implementation="css">
                            <Drawer
                                container={this.props.container}
                                variant="temporary"
                                open={this.state.mobileOpen}
                                onClose={this.handleDrawerToggle}
                                classes={{
                                    paper: classes.drawerPaper,
                                }}
                            >
                                {drawer}
                            </Drawer>
                        </Hidden>
                        <Hidden xsDown implementation="css">
                            <Drawer
                                classes={{
                                    paper: classes.drawerPaper,
                                }}
                                variant="permanent"
                                open
                            >
                                {drawer}
                            </Drawer>
                        </Hidden>
                    </nav>
                    <main className={classes.content}>
                        <div className={classes.toolbar} />
                        {this.state.selectedIndex === 0 && <div>View Biddings Summary</div>}
                        {this.state.selectedIndex === 1 &&
                            this.state.role !== '' && this.state.role !== '' && (<MyProfile email={this.state.email} role={this.state.role} />)}
                        {this.state && this.state.selectedIndex === 2 && (<Vitals email={this.state.email} />)}
                        {this.state.selectedIndex === 3 && (<Problems email={this.state.email} />)}
                        {this.state.selectedIndex === 4 && (<Medications email={this.state.email} />)}
                        {this.state.selectedIndex === 5 && (<Allergies email={this.state.email} />)}
                        {this.state.selectedIndex === 6 && (<Transactions email={this.state.email} />)}
                        {this.state.selectedIndex === 7 && (<ViewRecords email={this.state.email} />)}
                        {this.state.selectedIndex === 8 && (<ManageDoctorPermissions email={this.state.email} />)}
                    </main>
                </div>
            </div >
        );
    }
}

export default withStyles(styles)(dashboard);