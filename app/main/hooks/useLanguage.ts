import {LanguageType} from "@/components/controls/dropdown";
import {useMainContext} from "@/app/main/hooks/useMainContext";

export const useLanguage = () => {
    const [language] = useMainContext()
    const getLanguage = (title: LanguageType) => {
        const selectLng: string = language || 'arm'
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