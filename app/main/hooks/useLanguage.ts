import {useMainContext} from "@/app/main/hooks/useMainContext";
import {LanguageType} from "@/app/main/components/controls/dropdown";

export const useLanguage = () => {
    const [language] = useMainContext()
    const getLanguage = (title: LanguageType) => {
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