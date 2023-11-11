import {Options} from "@/app/main/components/controls/dropdown";

export interface NavigationItemsType {
    id: string,
    title: {am: string, ru: string},
    isSelect?: boolean,
    link?: string,
    options?: Options[],
    dropdownClassname?: {container: string, items: string}
}