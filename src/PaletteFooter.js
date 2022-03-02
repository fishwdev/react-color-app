import React from "react";
import {withStyles} from "@material-ui/core";
import styles from './styles/PaletteFooterStyles';

function PaletteFooter(props) {
    const {classes, name, emoji} = props;
    return (
        <footer className={classes.PaletteFooter}>
            {name}
            <span className={classes.emoji}>{emoji}</span>
        </footer>
    )
}

export default withStyles(styles)(PaletteFooter);