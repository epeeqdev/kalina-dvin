export interface ListItemBase {
    id: string;
    [key: string]: any;
}

export interface DroppableArgs {
    draggedItemId: string,
    targetId: string
}