import React, {Component} from "react";
import ColorBox from './ColorBox';

class SingleColorPalette extends Component {
    constructor(props) {
        super(props);
        this._shades = this.getAllShades(this.props.palette, this.props.colorId);
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

    render() {
        const {palette} = this.props;
        const colorBoxes = this._shades.map(color => (
            <ColorBox
                key={color.name}
                name={color.name}
                background={color.hex}
                displayMore={false}
            />
        ));

        return (
            <div className='Palette'>
                <div className='Palette-colors'>
                    {colorBoxes}
                </div>
            </div>
        );
    };
}

export default SingleColorPalette;