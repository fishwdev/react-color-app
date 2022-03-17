import React, {Component} from "react";
import MiniPalette from "./MiniPalette";
import {Link} from 'react-router-dom';
import {withStyles} from "@material-ui/styles";
import styles from './styles/PaletteListStyles';

class PaletteList extends Component {
    
    handlePaletteClick(id) {
        this.props.history.push(`/palette/${id}`);
    }

    render() {
        const {classes, deletePalette, palettes} = this.props;
        return (
            <div className={classes.root}>
                <div className={classes.container}>
                    <nav className={classes.nav}>
                        <h1>React Colors</h1>
                        <Link to='/palette/new'>Create Palette</Link>
                    </nav>
                    <div className={classes.palettes}>
                        {palettes.map((palette) =>
                            <MiniPalette
                                deletePalette={deletePalette}
                                {...palette}
                                handleClick={() => this.handlePaletteClick(palette.id)}
                                key={palette.id}
                                id={palette.id}
                            />
                        )}
                    </div>
                </div>
            </div>
        )
    };
}

export default withStyles(styles)(PaletteList);