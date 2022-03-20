import React from "react";
import DraggableColorBox from "./DraggableColorBox";
import {SortableContainer} from "react-sortable-hoc";

const DraggableColorList = SortableContainer((props) => {
    const {palette, removeColorBox} = props;
    return (
        <div style={{height: '100%'}}>
            {palette.map((color, idx) => (
                <DraggableColorBox
                    index={idx}
                    key={color.name}
                    color={color.color}
                    name={color.name}
                    handleDelete={() => removeColorBox(color.name)}
                />
            ))}
        </div>
    );
})

export default DraggableColorList;