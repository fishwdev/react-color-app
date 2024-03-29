import React, {Component} from "react";
import {Link} from "react-router-dom";
import {IconButton, MenuItem, Select, Snackbar, withStyles} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import styles from './styles/NavbarStyles';

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {isSnackbarOpen: false};
        this.handleFormatChange = this.handleFormatChange.bind(this);
        this.closeSnackbar = this.closeSnackbar.bind(this);
    }


    handleFormatChange(evt) {
        this.props.changeFormat(evt.target.value);
        this.setState({isSnackbarOpen: true});
    }


    closeSnackbar() {
        this.setState({isSnackbarOpen: false});
    }

    render() {
        const {isSnackbarOpen} = this.state;
        const {classes, level, changeLevel, curFormat, colorFormats, isSingleColor} = this.props;

        const colorFormatMenu = colorFormats.map(colorFormat => (
            <MenuItem
                value={colorFormat.format}
                key={colorFormat.format}
            >
                {colorFormat.description}
            </MenuItem>
        ))
        return (
            <header className={classes.Navbar}>
                <div className={classes.logo}>
                    <Link to='/'>Reactcolorpicker</Link>
                </div>

                {!isSingleColor
                    ? <div className='Navbar-slider-container'>
                        <span>Level: {level}</span>
                        <div className={classes.slider}>
                            <Slider
                                defaultValue={level}
                                min={100}
                                max={900}
                                step={100}
                                onAfterChange={changeLevel}
                            />
                        </div>
                    </div>
                : null}

                <div className={classes.selectContainer}>
                    <Select
                        value={curFormat}
                        onChange={this.handleFormatChange}
                    >
                        {colorFormatMenu}
                    </Select>
                </div>
                <Snackbar
                    anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}
                    open={isSnackbarOpen}
                    autoHideDuration={3000}
                    message={<span id='message-id'>{`Format changed to ${curFormat.toUpperCase()}!`}</span>}
                    ContentProps={{
                        'aria-describedby': 'message-id'
                    }}
                    onClose={this.closeSnackbar}
                    action={[
                        <IconButton
                            onClick={this.closeSnackbar}
                            color = 'inherit'
                            key='close'
                            aria-level='close'
                        >
                            <CloseIcon/>
                        </IconButton>
                    ]}
                />
            </header>
        );
    };
}

export default withStyles(styles)(Navbar);