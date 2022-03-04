import React, {Component} from "react";
import classNames from 'classnames';
import {ChromePicker} from "react-color";
import DraggableColorBox from "./DraggableColorBox";
import {TextValidator, ValidatorForm} from "react-material-ui-form-validator";
import {AppBar, Button, Divider, Drawer, IconButton, Toolbar, Typography, withStyles} from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

const drawerWidth = 400;

const styles = theme => ({
    root: {
        display: 'flex'
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        })
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen
        })
    },
    menuButton: {
        marginLeft: 12,
        marginRight: 20
    },
    hide: {
        display: 'none'
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0
    },
    drawerPaper: {
        width: drawerWidth
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: '0 8px',
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end'
    },
    content: {
        flexGrow: 1,
        height: 'calc(100vh - 64px)',
        padding: theme.spacing.unit * 3,
        transition: theme.transitions.create(['margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        }),
        marginLeft: -drawerWidth
    },
    contentShift: {
        transition: theme.transitions.create(['margin'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen
        }),
        marginLeft: 0
    }
});

class NewPaletteForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: true,
            curColor: 'teal',
            curPalette: [
                {color: 'red', name: 'red'},
                {color: 'orange', name: 'orange'},
                {color: 'yellow', name: 'yellow'},
                {color: 'green', name: 'green'},
                {color: 'blue', name: 'blue'},
                {color: 'purple', name: 'purple'}
            ],
            inputColor: '',
            paletteName: ''
        }
        this.handleColorChange = this.handleColorChange.bind(this);
        this.addColor = this.addColor.bind(this);
        this.handleTextInputChange = this.handleTextInputChange.bind(this);
        this.handleSave = this.handleSave.bind(this);
    }

    componentDidMount() {
        ValidatorForm.addValidationRule('isColorNameUnique', (value) => (
            this.state.curPalette.every(
                ({name}) => (name.toLowerCase() !== value.toLowerCase())
            )
        ));
        ValidatorForm.addValidationRule('isColorUnique', () => (
            this.state.curPalette.every(
                ({color}) => (color !== this.state.curColor)
            )
        ));
        ValidatorForm.addValidationRule('isPaletteNameUnique', (value) => (
            this.props.palettes.every(
                ({paletteName}) => (paletteName.toLowerCase() !== value.toLowerCase())
            )
        ));
    }

    addColor() {
        const newColor = {
            name: this.state.inputColor,
            color: this.state.curColor
        };
        this.setState((prevState) => ({
            curPalette: [...prevState.curPalette, newColor],
            inputColor: ''
        }));
    }

    handleColorChange(selectedColor) {
        // let {r, g, b, a} = selectedColor.rgb;
        // this.setState((prevProps) => ({
        //     curColor: `rgba(${r},${g},${b},${a})`
        // }));
        this.setState((prevProps) => ({
            curColor: selectedColor.hex
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

    handleSave() {
        let newPalletName = this.state.paletteName;
        const newPalette = {
            paletteName: newPalletName,
            id: newPalletName.toLowerCase().replace(/ /g, '-'),
            emoji: 'test',
            colors: this.state.curPalette
        };
        this.props.savePalette(newPalette);
        this.props.history.push('/');
    }

    render() {
        const {classes, theme} = this.props;
        const {curColor, curPalette, open, inputColor, paletteName} = this.state;

        return (
            <div className={classes.root}>
                {/*<CssBaseline/>*/}
                <AppBar
                    color='default'
                    position='fixed'
                    className={classNames(classes.appBar, {
                        [classes.appBarShift]: open
                    })}
                >
                    <Toolbar disableGutters={!open}>
                        <IconButton
                            color='inherit'
                            aria-label='Open drawer'
                            onClick={this.handleDrawerOpen}
                            className={classNames(classes.menuButton, open && classes.hide)}
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Typography variant='h6' color='inherit' noWrap>
                            Persistent drawer
                        </Typography>
                        <ValidatorForm onSubmit={this.handleSave}>
                            <TextValidator
                                label='Palette Name'
                                value={paletteName}
                                name='paletteName'
                                onChange={this.handleTextInputChange}
                                validators={['required', 'isPaletteNameUnique']}
                                errorMessages={['Field required', 'The palette name is already used']}
                            />
                            <Button
                                variant='contained'
                                color='primary'
                                type='submit'
                            >
                                Save
                            </Button>
                        </ValidatorForm>
                    </Toolbar>
                </AppBar>
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
                    <Typography variant='h4'>Design your palette</Typography>
                    <div>
                        <Button variant='contained' color='secondary'>Clear Palette</Button>
                        <Button variant='contained' color='primary'>Random Color</Button>
                    </div>
                    <ChromePicker
                        color={curColor}
                        onChangeComplete={this.handleColorChange}
                    />
                    <ValidatorForm onSubmit={this.addColor}>
                        <TextValidator
                            value={inputColor}
                            name='inputColor'
                            validators={['required', 'isColorNameUnique', 'isColorUnique']}
                            errorMessages={[
                                'Field required',
                                'The color name has already existed',
                                'The color is already in the palette'
                            ]}
                            onChange={this.handleTextInputChange}
                        />
                        <Button
                            variant='contained'
                            type='submit'
                            color='primary'
                            style={{backgroundColor: curColor}}
                        >
                            Add Color
                        </Button>
                    </ValidatorForm>
                </Drawer>
                <main
                    className={classNames(classes.content, {
                        [classes.contentShift]: open
                    })}
                >
                    <div className={classes.drawerHeader}/>
                    {curPalette.map(color => (
                        <DraggableColorBox color={color.color} name={color.name}/>
                    ))}
                </main>
            </div>
        );
    }
}

export default withStyles(styles, {withTheme: true})(NewPaletteForm);