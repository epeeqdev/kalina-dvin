import {Typography} from "@/app/main/components/controls/typography";
import {NavigationItems} from "@/app/main/components/header/constants";
import {useLanguage} from "@/app/main/hooks/useLanguage";


export const MobileNavigation = () => {
    const {getLanguage} = useLanguage()
    return(
        <div>
            <div className='py-3 border-b border-primary cursor-pointer select-none' >
                {Object.values(NavigationItems).map((el) => (
                    <div key={el.id} className='flex flex-col pl-6 py-2 bg-white group hover:bg-primary hover:text-white'>
                        <Typography title={getLanguage(el.title)} fontSize='text-xs' fontWeight='font-semibold' className='group-hover:text-white'/>
                    </div>
                ))}
            </div>
        </div>
    )
}