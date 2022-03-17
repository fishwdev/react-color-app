import React, {Component} from "react";
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@material-ui/core";
import {TextValidator, ValidatorForm} from "react-material-ui-form-validator";
import {Picker} from "emoji-mart";
import 'emoji-mart/css/emoji-mart.css';

class PaletteMetaForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: 'paletteName',
            paletteName: ''
        }
        this.handleClickOpen = this.handleClickOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.handleTextInputChange = this.handleTextInputChange.bind(this);
        this.showEmojiPicker = this.showEmojiPicker.bind(this);
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

    handleSelect(emoji) {
        const newPaletteInfo = {
            paletteName: this.state.paletteName,
            emoji: emoji.native
        };
        this.props.handleSave(newPaletteInfo);
    }

    handleTextInputChange = (evt) => {
        this.setState({[evt.target.name]: evt.target.value});
    }

    showEmojiPicker() {
        this.setState({open: 'emoji'});
    }

    render() {
        const {hideSaveDialog} = this.props;
        const {open, paletteName} = this.state;

        return (
            <div>
                <Dialog
                    open={open === 'emoji'}
                    onClose={hideSaveDialog}
                >
                    <DialogTitle id='form-dialog-title'>Emoji</DialogTitle>
                    <Picker title='Pick a emoji' onSelect={this.handleSelect}/>
                </Dialog>

                <Dialog
                    open={open === 'paletteName'}
                    onClose={hideSaveDialog}
                    aria-labelledby='form-dialog-title'
                >
                    <DialogTitle id='form-dialog-title'>Save</DialogTitle>
                    <ValidatorForm onSubmit={this.showEmojiPicker}>
                        <DialogContent>
                            <DialogContentText>
                                Please input the name of the new palette:
                            </DialogContentText>
                            <TextValidator
                                label='Palette Name'
                                value={paletteName}
                                name='paletteName'
                                onChange={this.handleTextInputChange}
                                fullWidth
                                margin='normal'
                                validators={['required', 'isPaletteNameUnique']}
                                errorMessages={['Field required', 'The palette name is already used']}
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={hideSaveDialog} color='primary'>
                                Cancel
                            </Button>
                            <Button
                                variant='contained'
                                color='primary'
                                type='submit'
                            >
                                Save
                            </Button>
                        </DialogActions>
                    </ValidatorForm>
                </Dialog>
            </div>
        );
    };
}

export default PaletteMetaForm;