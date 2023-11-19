import {DroppableArgs, ListItemBase} from "@/app/admin/main/drag-and-drop/types";

export const getReorderedItems = <ListItem extends ListItemBase>(list:ListItem[], {draggedItemId, targetId}: DroppableArgs, idKey:string = '_id') => {
        const draggedIndex = list.findIndex(item => item[idKey] === draggedItemId);
        const targetIndex = list.findIndex(item => item[idKey] === targetId);
        if (draggedIndex === targetIndex) return list;
        const reorderedImages = [...list];
        const [removed] = reorderedImages.splice(draggedIndex, 1);
        reorderedImages.splice(targetIndex, 0, removed);
        return reorderedImages
}