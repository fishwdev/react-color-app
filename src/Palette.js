import React, {Component} from "react";
import ColorBox from "./ColorBox";
import Navbar from "./Navbar";
import './Palette.css';

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
                <Navbar level={level} changeLevel={this.changeLevel} />
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