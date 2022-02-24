import React, {Component} from "react";
import ColorBox from "./ColorBox";
import Navbar from "./Navbar";
import './Palette.css';

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
        const {palette} = this.props;
        const {curFormat, level} = this.state;
        const colorBoxes = palette.colors[level].map((color, idx) => (
            <ColorBox background={color[curFormat]} name={color.name} key={idx}/>
        ));
        return(
            <div className='Palette'>
                {/* Navbar goes here */}
                <Navbar
                    level={level}
                    changeLevel={this.changeLevel}
                    changeFormat={this.changeFormat}
                    colorFormats={palette.colorFormats}
                />
                <div className='Palette-colors'>
                    {/* displays the color boxes */}
                    {colorBoxes}
                </div>
                {/* footer at the end */}
            </div>
        )
    };
}

export default Palette;