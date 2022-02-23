import React, {Component} from "react";
import {CopyToClipboard} from "react-copy-to-clipboard/src";
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
        const {background, name} = this.props;
        const {isCopying} = this.state;

        return(
            <CopyToClipboard text={background} onCopy={this.changeCopyState}>
                <div className='ColorBox' style={{background: background}}>
                    <div
                        className={`ColorBox-copy-overlay ${isCopying && 'show'}`}
                        style={{background: background}}
                    />
                    <div className={`ColorBox-copy-msg ${isCopying && 'show'}`}>
                        <h1>copied</h1>
                        <p>{background}</p>
                    </div>
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