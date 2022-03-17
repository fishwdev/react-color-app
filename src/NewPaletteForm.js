import React, {Component} from "react";
import ColorPickerForm from "./ColorPickerForm";
import PaletteFormNav from "./PaletteFormNav";
import classNames from 'classnames';
import {Button, Divider, Drawer, IconButton, Typography, withStyles} from "@material-ui/core";
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import DraggableColorList from "./DraggableColorList";
import {arrayMove} from "react-sortable-hoc";
import styles from "./styles/NewPaletteFormStyle";

class NewPaletteForm extends Component {
    static defaultProps = {
        maxColors: 20
    };

    constructor(props) {
        super(props);
        this.state = {
            open: true,
            // curPalette: [
            //     {color: 'red', name: 'red'},
            //     {color: 'orange', name: 'orange'},
            //     {color: 'yellow', name: 'yellow'},
            //     {color: 'green', name: 'green'},
            //     {color: 'blue', name: 'blue'},
            //     {color: 'purple', name: 'purple'}
            // ],
            curPalette: this.props.palettes[0].colors
        }
        this.addColor = this.addColor.bind(this);
        this.clearPalette = this.clearPalette.bind(this);
        this.generateRandomColor = this.generateRandomColor.bind(this);
        this.handleTextInputChange = this.handleTextInputChange.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.removeColorBox = this.removeColorBox.bind(this);
    }

    addColor(newColor) {
        this.setState((prevState) => ({
            curPalette: [...prevState.curPalette, newColor]
        }));
    }

    clearPalette() {
        this.setState({curPalette: []});
    }

    generateRandomColor() {
        // pick random color from existing palettes
        const allColors = this.props.palettes.map(palette => palette.colors).flat();
        let rand = Math.floor(Math.random() * allColors.length);
        const randomColor = allColors[rand];
        this.setState((prevState) => ({
            curPalette: [...prevState.curPalette, randomColor]
        }));
    }

    handleDrawerOpen = () => {
        this.setState({open: true});
    };

    handleDrawerClose = () => {
        this.setState({open: false});
    };

    handleTextInputChange = (evt) => {
        this.setState({[evt.target.name]: evt.target.value});
    }

     handleSave(newPaletteInfo) {
        const newPalette = {
            paletteName: newPaletteInfo.paletteName,
            id: newPaletteInfo.paletteName.toLowerCase().replace(/ /g, '-'),
            emoji: newPaletteInfo.emoji,
            colors: this.state.curPalette
        };
        this.props.savePalette(newPalette);
        this.props.history.push('/');
    }

    removeColorBox(colorName) {
        this.setState({
            curPalette: this.state.curPalette.filter(color => color.name !== colorName)
        });
    }

    onSortEnd = ({oldIndex, newIndex}) => {
        this.setState(({curPalette}) => ({
            curPalette: arrayMove(curPalette, oldIndex, newIndex),
        }));
    }

    render() {
        const {classes, maxColors, palettes, theme} = this.props;
        const {curPalette, open} = this.state;
        const isPaletteFull = curPalette.length >= maxColors;

        return (
            <div className={classes.root}>
                <PaletteFormNav
                    open={open}
                    palettes={palettes}
                    handleDrawerOpen={this.handleDrawerOpen}
                    handleSave={this.handleSave}
                />
                <Drawer
                    className={classes.drawer}
                    variant='persistent'
                    anchor='left'
                    open={open}
                    classes={{
                        paper: classes.drawerPaper
                    }}
                >
                    <div className={classes.drawerHeader}>
                        <IconButton onClick={this.handleDrawerClose}>
                            <ChevronLeftIcon/>
                        </IconButton>
                    </div>
                    <Divider/>
                    <div className={classes.container}>
                        <Typography variant='h4' gutterBottom>Design your palette</Typography>
                        <div className={classes.buttonContainer}>
                            <Button
                                className={classes.button}
                                variant='contained'
                                color='secondary'
                                onClick={this.clearPalette}
                            >
                                Clear Palette
                            </Button>
                            <Button
                                className={classes.button}
                                variant='contained'
                                color='primary'
                                disabled={isPaletteFull}
                                onClick={this.generateRandomColor}
                            >
                                Random Color
                            </Button>
                        </div>
                        <ColorPickerForm
                            addColor={this.addColor}
                            curPalette={curPalette}
                            isPaletteFull={isPaletteFull}
                        />
                    </div>
                </Drawer>
                <main
                    className={classNames(classes.content, {
                        [classes.contentShift]: open
                    })}
                >
                    <div className={classes.drawerHeader}/>
                    <DraggableColorList
                        palette={curPalette}
                        removeColorBox={this.removeColorBox}
                        axis='xy'
                        onSortEnd={this.onSortEnd}
                    />
                </main>
            </div>
        );
    }
}

export default withStyles(styles, {withTheme: true})(NewPaletteForm);