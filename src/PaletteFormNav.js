import React, {Component} from "react";
import classNames from 'classnames';
import {AppBar, Button, IconButton, Toolbar, Typography, withStyles} from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import {Link} from "react-router-dom";
import PaletteMetaForm from "./PaletteMetaForm";
import styles from "./styles/PaletteFormNavStyle";

class PaletteFormNav extends Component {
    constructor(props) {
        super(props);
        this.state = {isSaveDialogShowing: false}
        this.handleTextInputChange = this.handleTextInputChange.bind(this);
        this.hideSaveDialog = this.hideSaveDialog.bind(this);
        this.showSaveDialog = this.showSaveDialog.bind(this);
    }

    handleTextInputChange = (evt) => {
        this.setState({[evt.target.name]: evt.target.value});
    }

    hideSaveDialog() {
        this.setState({isSaveDialogShowing: false});
    }

    showSaveDialog() {
        this.setState({isSaveDialogShowing: true});
    }

    render() {
        const {classes, handleDrawerOpen, handleSave, open, palettes} = this.props;
        const {isSaveDialogShowing} = this.state;

        return (
            <div className={classes.root}>
                {/*<CssBaseline/>*/}
                <AppBar
                    color='default'
                    position='fixed'
                    className={classNames(classes.appBar, {
                        [classes.appBarShift]: open
                    })}
                >
                    <Toolbar disableGutters={!open}>
                        <IconButton
                            color='inherit'
                            aria-label='Open drawer'
                            onClick={handleDrawerOpen}
                            className={classNames(classes.menuButton, {
                                [classes.hide]: open
                            })}
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Typography variant='h6' color='inherit' noWrap>
                            Create A Palette
                        </Typography>
                    </Toolbar>
                    <div className={classes.navButtons}>
                        <Link to='/'>
                            <Button
                                className={classes.button}
                                variant='contained'
                                color='secondary'
                            >
                                Back
                            </Button>
                        </Link>
                        <Button
                            className={classes.button}
                            variant='contained'
                            color='primary'
                            onClick={this.showSaveDialog}
                        >
                            Save
                        </Button>
                    </div>
                </AppBar>
                {isSaveDialogShowing &&
                    <PaletteMetaForm
                        palettes={palettes}
                        handleSave={handleSave}
                        hideSaveDialog={this.hideSaveDialog}
                    />
                }
            </div>
        );
    };
}

export default withStyles(styles, {withTheme: true})(PaletteFormNav);