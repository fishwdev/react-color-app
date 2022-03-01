import React, {Component} from "react";
import {CopyToClipboard} from "react-copy-to-clipboard/src";
import {Link} from 'react-router-dom';
import chroma from "chroma-js";
import './ColorBox.css';

class ColorBox extends Component {
    constructor(props) {
        super(props);
        this.state = {isCopying: false};
        this.changeCopyState = this.changeCopyState.bind(this);
    }

    changeCopyState() {
        this.setState({isCopying: true}, () => {
            setTimeout(() => {
                this.setState({isCopying: false})
            }, 800);
        });
    }

    render() {
        const {background, name, paletteId, colorId, displayMore} = this.props;
        const {isCopying} = this.state;

        const isDarkColor = chroma(background).luminance() <= 0.6;
        const isLightColor = chroma(background).luminance() >= 0.6;

        return(
            <CopyToClipboard text={background} onCopy={this.changeCopyState}>
                <div className='ColorBox' style={{background: background}}>
                    <div
                        className={`ColorBox-copy-overlay ${isCopying && 'show'}`}
                        style={{background: background}}
                    />
                    <div className={`ColorBox-copy-msg ${isCopying && 'show'}`}>
                        <h1>copied</h1>
                        <p className={isLightColor ? 'dark-text' : ''}>{background}</p>
                    </div>
                    <div className='ColorBox-copy-container copy-container'>
                        <div className='ColorBox-box-content box-content'>
                            <span className={isDarkColor ? 'light-text' : ''}>{name}</span>
                        </div>
                        <button className={`ColorBox-copy-button copy-button ${isLightColor ? 'dark-text' : ''}`}>Copy</button>
                    </div>
                    {displayMore ?
                        <Link to={`/palette/${paletteId}/${colorId}`} onClick={(evt) => evt.stopPropagation()}>
                            <span className={`ColorBox-view-more ${isLightColor ? 'dark-text' : ''}`}>More</span>
                        </Link> :
                        null
                    }
                </div>
            </CopyToClipboard>
        )
    };
}

export default ColorBox;