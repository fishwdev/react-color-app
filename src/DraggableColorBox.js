import React from "react";
import {SortableElement} from "react-sortable-hoc";
import {withStyles} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import styles from './styles/DraggableColorBoxStyle';

const DraggableColorBox = SortableElement((props) => {
    const {classes, color, name, handleDelete} = props;
    return (
        <div
            className={classes.root}
            style={{backgroundColor: color}}
        >
            <div className={classes.boxContent}>
                <span>{name}</span>
                <DeleteIcon
                    className={classes.deleteIcon}
                    onClick={handleDelete}
                />
            </div>
        </div>
    );
})

export default withStyles(styles)(DraggableColorBox);