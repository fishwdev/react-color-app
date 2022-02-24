import React, {Component} from "react";
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import {MenuItem, Select} from "@material-ui/core";
import './Navbar.css';

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {curFormat: 'hex'};
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(evt) {
        this.setState({curFormat: evt.target.value},
            this.props.changeFormat(evt.target.value))
    }

    render() {
        const {curFormat} = this.state;
        const {level, changeLevel, colorFormats} = this.props;

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
                    <a href='/'>Reactcolorpicker</a>
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
                        onChange={this.handleChange}
                    >
                        {colorFormatMenu}
                    </Select>
                </div>
            </header>
        );
    };
}

export default Navbar;