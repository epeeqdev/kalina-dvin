import {useState} from "react";
import {DroppableArgs} from "@/app/admin/main/drag-and-drop/types";

interface Props extends React.PropsWithChildren {
    /** Required field, should be as item ID as in the list */
    id: string | number;
    dropDisabled?: boolean;
    onDrop?: (args:DroppableArgs) => void;
}

export const Droppable = ({id, onDrop, children}: Props) => {
    const [overTargetId, setOverTargetId] = useState(null);
    const handleDragOver = (e) => {
        e.preventDefault();
        setOverTargetId(e.currentTarget.id);
    };

    const handleDragLeave = () => {
        setOverTargetId(null);
    };
    const overStyles = "border-2 border-dashed border-gray-400 transition ease-out duration-200";

    const handleDrop = (e) => {
        e.preventDefault();
        const draggedItemId = e.dataTransfer.getData("text/plain");
        const targetId = e.currentTarget.id;
        setOverTargetId(null);
        onDrop?.({draggedItemId, targetId})
    };

    return <div className={overTargetId === id ? overStyles : ""} key={id} id={id.toString()}
                onDragOver={handleDragOver} onDrop={handleDrop} onDragLeave={handleDragLeave}>
        {children}
    </div>
}