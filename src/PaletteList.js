import React, {Component} from "react";
import MiniPalette from "./MiniPalette";
import {Link} from 'react-router-dom';
import {CSSTransition, TransitionGroup} from "react-transition-group";
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
                        <h1 className={classes.title}>React Colors</h1>
                        <Link to='/palette/new'>Create Palette</Link>
                    </nav>
                    <TransitionGroup className={classes.palettes}>
                        {palettes.map((palette) =>
                            <CSSTransition
                                key={palette.id}
                                classNames='fade'
                                timeout={500}
                            >
                                <MiniPalette
                                    deletePalette={deletePalette}
                                    {...palette}
                                    handleClick={() => this.handlePaletteClick(palette.id)}
                                    key={palette.id}
                                    id={palette.id}
                                />
                            </CSSTransition>
                        )}
                    </TransitionGroup>
                </div>
            </div>
        )
    };
}

export default withStyles(styles)(PaletteList);