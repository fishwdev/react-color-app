import React, {Component} from "react";
import ColorBox from "./ColorBox";
import './Palette.css';

class Palette extends Component {
    render() {
        const colorBoxes = this.props.colors.map((color, idx) => (
            <ColorBox background={color.color} name={color.name} key={idx}/>
        ));
        return(
            <div className='Palette'>
                {/* Navbar goes here */}
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