import React, {Component} from "react";
import ColorBox from "./ColorBox";
import Navbar from "./Navbar";
import PaletteFooter from "./PaletteFooter";
import {withStyles} from "@material-ui/core";
import styles from './styles/PaletteStyles';

class Palette extends Component {
    constructor(props) {
        super(props);
        this.state = {
            level: 500,
            curFormat: 'hex'
        };
        this.changeLevel = this.changeLevel.bind(this);
        this.changeFormat = this.changeFormat.bind(this);
    }

    changeLevel(level) {
        this.setState({level});
    }

    changeFormat(newFormat) {
        this.setState({curFormat: newFormat});
    }

    render() {
        const {classes, palette} = this.props;
        const {curFormat, level} = this.state;
        const colorBoxes = palette.colors[level].map((color) => (
            <ColorBox
                background={color[curFormat]}
                name={color.name}
                key={color.id}
                colorId={color.id}
                paletteId={palette.id}
                fullPalette={true}
            />
        ));
        return(
            <div className={classes.Palette}>
                {/* Navbar goes here */}
                <Navbar
                    level={level}
                    changeLevel={this.changeLevel}
                    changeFormat={this.changeFormat}
                    curFormat = {curFormat}
                    colorFormats={palette.colorFormats}
                    isSingleColor={false}
                />
                <div className={classes.paletteColors}>
                    {/* displays the color boxes */}
                    {colorBoxes}
                </div>
                {/* footer at the end */}
                <PaletteFooter name={palette.name} emoji={palette.emoji} />
            </div>
        )
    };
}

export default withStyles(styles)(Palette);