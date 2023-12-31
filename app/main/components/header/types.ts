import {IconNameOptions} from "@/components/icon/icons";
import {TextStructure} from "@/backend/types";

export interface NavigationItemsType {
    id: string | number,
    title: {am: string, ru: string},
    isSelect?: boolean,
    link?: string,
    dropdownClassname?: {container: string, items: string}
}
type DropdownOptionsType = {
    id: string;
    title: TextStructure;
    icon?: IconNameOptions;
    isChanged?: boolean;
    link?: string
}
export type ContactsType = {
    options: DropdownOptionsType[];
}