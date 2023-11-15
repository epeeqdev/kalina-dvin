import {useMainContext} from "@/app/main/hooks/useMainContext";
import {TextStructure} from "@/backend/types";

export const useLanguage = () => {
    const [language] = useMainContext()
    const getLanguage = (title?: TextStructure) => {
        if(!title) return ''
        const selectLng: string = language || 'am'
        const result = Object.keys(title).find((item) => {
            return item === selectLng
        });
        if(result) {
            return title[result as keyof typeof title]
        }
        const keys = Object.keys(title)
        return title[keys[0] as keyof typeof title]
    }
    return {getLanguage}
}