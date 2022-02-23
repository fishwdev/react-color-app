import React, {Component} from "react";
import ColorBox from "./ColorBox";
import './Palette.css';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

class Palette extends Component {
    constructor(props) {
        super(props);
        this.state = {
            level: 500,
        };
        this.changeLevel = this.changeLevel.bind(this);
    }

    changeLevel(level) {
        this.setState({level});
    }

    render() {
        const {palette} = this.props;
        const {level} = this.state;
        const colorBoxes = palette.colors[level].map((color, idx) => (
            <ColorBox background={color.hex} name={color.name} key={idx}/>
        ));
        return(
            <div className='Palette'>
                {/* Navbar goes here */}
                <Slider
                    defaultValue={level}
                    min={100}
                    max={900}
                    step={100}
                    onAfterChange={this.changeLevel}
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