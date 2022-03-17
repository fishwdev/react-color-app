import React, {Component} from "react";
import {ChromePicker} from "react-color";
import {TextValidator, ValidatorForm} from "react-material-ui-form-validator";
import {Button, withStyles} from "@material-ui/core";
import styles from './styles/ColorPickerFormStyle';

class ColorPickerForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            curColor: 'teal',
            inputColor: ''
        };
        this.handleColorChange = this.handleColorChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleTextInputChange = this.handleTextInputChange.bind(this);
    }

    componentDidMount() {
        ValidatorForm.addValidationRule('isColorNameUnique', (value) => (
            this.props.curPalette.every(
                ({name}) => (name.toLowerCase() !== value.toLowerCase())
            )
        ));
        ValidatorForm.addValidationRule('isColorUnique', () => (
            this.props.curPalette.every(
                ({color}) => (color !== this.state.curColor)
            )
        ));
    }

    handleColorChange(selectedColor) {
        // let {r, g, b, a} = selectedColor.rgb;
        // this.setState((prevProps) => ({
        //     curColor: `rgba(${r},${g},${b},${a})`
        // }));
        this.setState({
            curColor: selectedColor.hex,
            inputColor: ''
        });
    }

    handleSubmit() {
        const newColor = {
            name: this.state.inputColor,
            color: this.state.curColor
        };
        this.props.addColor(newColor);
        this.setState({inputColor: ''});
    }

    handleTextInputChange = (evt) => {
        this.setState({[evt.target.name]: evt.target.value});
    }

    render() {
        const {classes, isPaletteFull} = this.props;
        const {curColor, inputColor} = this.state;

        return (
            <div className={classes.root}>
                <ChromePicker
                    className={classes.colorPicker}
                    color={curColor}
                    onChangeComplete={this.handleColorChange}
                />
                <ValidatorForm onSubmit={this.handleSubmit}>
                    <TextValidator
                        className={classes.inputColor}
                        variant='filled'
                        value={inputColor}
                        name='inputColor'
                        placeholder='Color Name'
                        margin='normal'
                        validators={['required', 'isColorNameUnique', 'isColorUnique']}
                        errorMessages={[
                            'Field required',
                            'The color name has already existed',
                            'The color is already in the palette'
                        ]}
                        onChange={this.handleTextInputChange}
                    />
                    <Button
                        className={classes.addColorButton}
                        variant='contained'
                        type='submit'
                        color='primary'
                        disabled={isPaletteFull}
                        style={{backgroundColor: isPaletteFull ? 'grey' : curColor}}
                    >
                        {isPaletteFull ? 'Full' : 'Add Color'}
                    </Button>
                </ValidatorForm>
            </div>
        )
    };
}

export default withStyles(styles)(ColorPickerForm);