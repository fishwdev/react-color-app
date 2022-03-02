import React, {Component} from "react";
import ColorBox from './ColorBox';
import Navbar from "./Navbar";
import PaletteFooter from "./PaletteFooter";
import {Link} from "react-router-dom";
import {withStyles} from "@material-ui/core";
import styles from './styles/PaletteStyles';

class SingleColorPalette extends Component {
    constructor(props) {
        super(props);
        this.state = {curFormat: 'hex'};
        this._shades = this.getAllShades(this.props.palette, this.props.colorId);
        this.changeFormat = this.changeFormat.bind(this);
    }

    getAllShades(palette, colorId) {
        let shades = [];
        let allColors = palette.colors;
        for (let key in allColors) {
            shades = shades.concat(
                allColors[key].filter((color) => color.id === colorId)
            );
        }
        return shades.slice(1);
    }

    changeFormat(newFormat) {
        this.setState({curFormat: newFormat});
    }

    render() {
        const {classes, palette} = this.props;
        const {curFormat} = this.state;
        const colorBoxes = this._shades.map(color => (
            <ColorBox
                key={color.name}
                name={color.name}
                background={color[curFormat]}
                fullPalette={false}
            />
        ));

        return (
            <div className={classes.Palette}>
                <Navbar
                    changeFormat={this.changeFormat}
                    curFormat={curFormat}
                    colorFormats={palette.colorFormats}
                    isSingleColor={true}
                />
                <div className={classes.paletteColors}>
                    {colorBoxes}
                    <div className={classes.goBack}>
                        <Link to={`/palette/${palette.id}`} className='SingleColorPalette-back-button'>Back</Link>
                    </div>
                </div>
                <PaletteFooter name={palette.name} emoji={palette.emoji}/>
            </div>
        );
    };
}

export default withStyles(styles)(SingleColorPalette);