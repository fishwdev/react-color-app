import React, {Component} from "react";
import {CopyToClipboard} from "react-copy-to-clipboard/src";
import {Link} from 'react-router-dom';
import {withStyles} from "@material-ui/styles";
import styles from './styles/ColorBoxStyles';
import classNames from "classnames";

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
        const {background, classes, name, paletteId, colorId, fullPalette} = this.props;
        const {isCopying} = this.state;

        return(
            <CopyToClipboard text={background} onCopy={this.changeCopyState}>
                <div className={classes.ColorBox} style={{background: background}}>
                    <div
                        className={classNames(classes.copyOverlay, {
                            [classes.showOverlay]: isCopying
                        })}
                        style={{background: background}}
                    />
                    <div className={classNames(classes.copyMsg, {
                        [classes.showCopyMsg]: isCopying
                    })}
                    >
                        <h1>copied</h1>
                        <p className={classes.copyText}>{background}</p>
                    </div>
                    <div className='ColorBox-copy-container copy-container'>
                        <div className={classes.boxContent}>
                            <span className={classes.colorName}>{name}</span>
                        </div>
                        <button className={classes.copyButton}>Copy</button>
                    </div>
                    {fullPalette ?
                        <Link to={`/palette/${paletteId}/${colorId}`} onClick={(evt) => evt.stopPropagation()}>
                            <span className={classes.viewMore}>More</span>
                        </Link> :
                        null
                    }
                </div>
            </CopyToClipboard>
        )
    };
}

export default withStyles(styles)(ColorBox);