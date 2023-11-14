import {LanguageType} from "@/app/main/components/controls/dropdown";
import {IconNameOptions} from "@/components/icon/icons";

export interface NavigationItemsType {
    id: string | number,
    title: {am: string, ru: string},
    isSelect?: boolean,
    link?: string,
    dropdownClassname?: {container: string, items: string}
}
type DropdownOptionsType = {
    id: string;
    title: LanguageType;
    icon?: IconNameOptions;
    isChanged?: boolean;
    link?: string
}
export type ContactsType = {
    options: DropdownOptionsType[];
}