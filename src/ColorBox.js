import React, {Component} from "react";
import {CopyToClipboard} from "react-copy-to-clipboard/src";
import './ColorBox.css';

class ColorBox extends Component {
    render() {
        const {background, name} = this.props;
        return(
            <CopyToClipboard text={background}>
                <div className='ColorBox' style={{background: background}}>
                    <div className='ColorBox-copy-container copy-container'>
                        <div className='ColorBox-box-content box-content'>
                            <span>{name}</span>
                        </div>
                        <button className='ColorBox-copy-button copy-button'>Copy</button>
                    </div>
                    <span className='ColorBox-view-more'>More</span>
                </div>
            </CopyToClipboard>
        )
    };
}

export default ColorBox;