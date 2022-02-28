import React, {Component} from "react";
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import {IconButton, MenuItem, Select, Snackbar} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import './Navbar.css';
import {Link} from "react-router-dom";

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
        const {level, changeLevel, curFormat, colorFormats} = this.props;

        const colorFormatMenu = colorFormats.map(colorFormat => (
            <MenuItem
                value={colorFormat.format}
                key={colorFormat.format}
            >
                {colorFormat.description}
            </MenuItem>
        ))
        return (
            <header className='Navbar'>
                <div className='Navbar-logo'>
                    <Link to='/'>Reactcolorpicker</Link>
                </div>
                <div className='Navbar-slider-container'>
                    <span>Level: {level}</span>
                    <div className='Navbar-slider'>
                        <Slider
                            defaultValue={level}
                            min={100}
                            max={900}
                            step={100}
                            onAfterChange={changeLevel}
                        />
                    </div>
                </div>
                <div className='Navbar-select-container'>
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

export default Navbar;