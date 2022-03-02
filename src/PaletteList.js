import React, {Component} from "react";
import {withStyles} from "@material-ui/styles";
import MiniPalette from "./MiniPalette";
import styles from './styles/PaletteListStyles';

class PaletteList extends Component {
    
    handlePaletteClick(id) {
        this.props.history.push(`/palette/${id}`);
    }

    render() {
        const {classes, palettes} = this.props;
        return (
            <div className={classes.root}>
                <div className={classes.container}>
                    <nav className={classes.nav}>
                        <h1>React Colors</h1>
                    </nav>
                    <div className={classes.palettes}>
                        {palettes.map((palette) =>
                            <MiniPalette
                                {...palette}
                                handleClick={() => this.handlePaletteClick(palette.id)}
                                key={palette.id}
                            />
                        )}
                    </div>
                </div>
            </div>
        )
    };
}

export default withStyles(styles)(PaletteList);