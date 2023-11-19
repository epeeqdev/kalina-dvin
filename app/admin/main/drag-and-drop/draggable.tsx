import {DragEventHandler, useState} from "react";
import clsx from "clsx";

interface Props extends React.PropsWithChildren{
    /** Required field, should be as item ID as in the list */
    id: string;
    dragDisabled?: boolean;
}
export const Draggable = ({id, dragDisabled = false, children}:Props) => {
    const [isDragging, setIsDragging] = useState(false);
    const handleDragStart:DragEventHandler<HTMLDivElement> = (e) => {
        e.dataTransfer.setData("text/plain", id);
        setIsDragging(true);
    };
    const handleDragEnd = () => {
        setIsDragging(false);
    };
    const draggingStyles = "opacity-50 scale-110 transition ease-out duration-200";
    const blockStyles = isDragging ? draggingStyles : "";

    return <div className={clsx(blockStyles, 'cursor-grab')} draggable={!dragDisabled} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        {children}
    </div>
}