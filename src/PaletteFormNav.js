import React, {Component} from "react";
import classNames from 'classnames';
import {TextValidator, ValidatorForm} from "react-material-ui-form-validator";
import {AppBar, Button, IconButton, Toolbar, Typography} from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import {Link} from "react-router-dom";

class PaletteFormNav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            paletteName: ''
        }
        this.handleTextInputChange = this.handleTextInputChange.bind(this);
    }

    componentDidMount() {
        ValidatorForm.addValidationRule('isPaletteNameUnique', (value) => (
            this.props.palettes.every(
                ({paletteName}) => (paletteName.toLowerCase() !== value.toLowerCase())
            )
        ));
    }

    handleTextInputChange = (evt) => {
        this.setState({[evt.target.name]: evt.target.value});
    }

    render() {
        const {classes, handleDrawerOpen, handleSave, open} = this.props;
        const {paletteName} = this.state;
        return (
            <div>
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
                            onClick={handleDrawerOpen}
                            className={classNames(classes.menuButton, open && classes.hide)}
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Typography variant='h6' color='inherit' noWrap>
                            Persistent drawer
                        </Typography>
                        <ValidatorForm onSubmit={() => handleSave(paletteName)}>
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
                            <Link to='/'>
                                <Button variant='contained' color='secondary'>Back</Button>
                            </Link>
                        </ValidatorForm>
                    </Toolbar>
                </AppBar>
            </div>
        );
    };
}

export default PaletteFormNav;