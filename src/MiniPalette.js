import React, {PureComponent} from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import {withStyles} from "@material-ui/styles";
import styles from './styles/MiniPaletteStyles';

class MiniPalette extends PureComponent {
    constructor(props) {
        super(props);
        this.deletePalette = this.deletePalette.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    deletePalette(evt) {
        evt.stopPropagation();
        this.props.openDeleteDialog(this.props.id);
    }

    handleClick() {
        this.props.handlePaletteClick(this.props.id);
    }

    render() {
        const {classes, colors, emoji, paletteName} = this.props;
        const miniColorBoxes = colors.map((color) => (
            <div
                className={classes.miniboxColor}
                style={{backgroundColor: color.color}}
                key={color.name}
            />
        ))
        return (
            <div
                className={classes.root}
                onClick={this.handleClick}
            >
                <DeleteIcon
                    className={classes.deleteIcon}
                    style={{transition: 'all 0.3s ease-in-out'}}
                    onClick={this.deletePalette}
                />
                <div className={classes.colors}>
                    {miniColorBoxes}
                </div>
                <h5 className={classes.title}>
                    {paletteName}
                    <span className={classes.emoji}>{emoji}</span>
                </h5>
            </div>
        );
    }
}

export default withStyles(styles)(MiniPalette);