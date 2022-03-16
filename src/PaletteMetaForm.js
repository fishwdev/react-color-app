import React, {Component} from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle
} from "@material-ui/core";
import {TextValidator, ValidatorForm} from "react-material-ui-form-validator";

class PaletteMetaForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            paletteName: ''
        }
        this.handleClickOpen = this.handleClickOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleTextInputChange = this.handleTextInputChange.bind(this);
    }

    componentDidMount() {
        ValidatorForm.addValidationRule('isPaletteNameUnique', (value) => (
            this.props.palettes.every(
                ({paletteName}) => (paletteName.toLowerCase() !== value.toLowerCase())
            )
        ));
    }

    handleClickOpen() {
        this.setState({open: true});
    }

    handleClose() {
        this.setState({open: false});
    }

    handleTextInputChange = (evt) => {
        this.setState({[evt.target.name]: evt.target.value});
    }

    render() {
        const {handleSave} = this.props;
        const {open, paletteName} = this.state;

        return (
            <div>
                <Button
                    variant='outlined'
                    color='primary'
                    onClick={this.handleClickOpen}
                >
                    Open form dialog
                </Button>
                <Dialog
                    open={open}
                    onClose={this.handleClose}
                    aria-labelledby='form-dialog-title'
                >
                    <DialogTitle id='form-dialog-title'>Subscribe</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            test
                        </DialogContentText>
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
                        </ValidatorForm>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color='primary'>
                            Cancel
                        </Button>
                        <Button onClick={this.handleClose} color='primary'>
                            Subscribe
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    };
}

export default PaletteMetaForm;