import React from "react";
import {SortableElement} from "react-sortable-hoc";
import {withStyles} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";

const styles = {
    root: {
        width: '20%',
        height: '25%',
        margin: '0 auto',
        display: 'inline-block',
        position: 'relative',
        cursor: 'pointer',
        marginBottom: '-4px',
        '&:hover svg': {
            color: 'white',
            transform: 'scale(1.5)'
        }
    },
    boxContent: {
        width: '90%',
        position: 'absolute',
        left: '0',
        bottom: '0',
        padding: '10px',
        color: 'rgba(0, 0, 0, 0.7)',
        letterSpacing: '1px',
        textTransform: 'uppercase',
        fontSize: '12px',
        display: 'flex',
        justifyContent: 'space-between'
    },
    deleteIcon: {
        transition: 'all 0.3s ease-in-out'
    }
}

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