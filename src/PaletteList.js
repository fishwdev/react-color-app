import React, {Component} from "react";
import {Link} from 'react-router-dom';
import {CSSTransition, TransitionGroup} from "react-transition-group";
import {Avatar, Dialog, DialogTitle, List, ListItem, ListItemAvatar, ListItemText} from "@material-ui/core";
import {blue} from "@material-ui/core/colors";
import {red} from "@material-ui/core/colors";
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import {withStyles} from "@material-ui/styles";
import MiniPalette from "./MiniPalette";
import styles from './styles/PaletteListStyles';

class PaletteList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isDeletePaletteDialogOpen: false,
            paletteIdToBeDeleted: ''
        };
        this.handleDelete = this.handleDelete.bind(this);
        this.handlePaletteClick = this.handlePaletteClick.bind(this);
        this.toggleDeletePaletteDialog = this.toggleDeletePaletteDialog.bind(this);
    }

    handleDelete() {
        this.props.deletePalette(this.state.paletteIdToBeDeleted);
        this.toggleDeletePaletteDialog();
    }

    handlePaletteClick(id) {
        this.props.history.push(`/palette/${id}`);
    }

    toggleDeletePaletteDialog(paletteId) {
        this.setState((prevState) => ({
            isDeletePaletteDialogOpen: !prevState.isDeletePaletteDialogOpen,
            paletteIdToBeDeleted: prevState.isDeletePaletteDialogOpen ? '' : paletteId
        }));
    }

    render() {
        const {classes, palettes} = this.props;
        const {isDeletePaletteDialogOpen} = this.state;
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
                                    {...palette}
                                    handlePaletteClick={this.handlePaletteClick}
                                    openDeleteDialog={this.toggleDeletePaletteDialog}
                                    key={palette.id}
                                    id={palette.id}
                                />
                            </CSSTransition>
                        )}
                    </TransitionGroup>
                </div>
                <Dialog
                    open={isDeletePaletteDialogOpen}
                    onClose={this.toggleDeletePaletteDialog}
                    aria-labelledby='delete-palette-dialog-title'
                >
                    <DialogTitle id='delete-palette-dialog-title'>Delete the palette?</DialogTitle>
                    <List>
                        <ListItem button onClick={this.handleDelete}>
                            <ListItemAvatar>
                                <Avatar style={{backgroundColor: blue[100], color: blue[600]}}>
                                    <CheckIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary='Delete' />
                        </ListItem>
                        <ListItem button onClick={this.toggleDeletePaletteDialog}>
                            <ListItemAvatar>
                                <Avatar style={{backgroundColor: red[100], color: red[600]}}>
                                    <CloseIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary='Cancel' />
                        </ListItem>
                    </List>
                </Dialog>
            </div>
        )
    };
}

export default withStyles(styles)(PaletteList);