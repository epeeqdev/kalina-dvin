import {BrandResponseDTO, CategoryResponseDTO} from "@/backend/types";
import clsx from "clsx";
import {useLanguage} from "@/app/main/hooks/useLanguage";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {Accordion} from "@/components/accordion";
import IconComponent from "@/components/icon";
import {Typography} from "@/app/main/components/controls/typography";
import {useMatchMedia} from "@/utils/hooks/useMatchMedia";
import {useEffect} from "react";

interface Props {
    categories: CategoryResponseDTO[];
    brands: BrandResponseDTO[];
    isOpen?: boolean;
    onClose?: () => void
    onOpen?: () => void
}

const translates = {
    titles: {
        categories: {am: 'Կատեգորիաներ', ru: 'Категории'},
        brands: {am: 'Բրենդեր', ru: 'Бренды'},
        header: {am: 'Ֆիլտր', ru: 'Фильтр'}
    },

}
export const Filter = ({categories, brands, isOpen, onOpen = () => null, onClose= () => null}: Props) => {
    const isTablet = useMatchMedia('(max-width:767.98px)');
    const isXL = useMatchMedia('(min-width:1440px)');
    const searchParams = useSearchParams();
    const filtersCount = searchParams?.toString()?.split('&')?.filter(Boolean)?.length ?? 0;

    useEffect(() => {
        if(isTablet && isOpen) {
            document.documentElement.style.overflow = 'hidden';
        }
        return () => {
            document.documentElement.style.overflow = 'unset';
        }
    }, [isTablet, isOpen]);

    useEffect(() => {
        if(isXL){
            onOpen();
        }else if(isOpen) {
            onClose()
        }
    }, [isXL]);

    const isOpenInside = isOpen || isXL;
    const {getLanguage} = useLanguage()
    return <div className={clsx('bg-white transition-[width] overflow-x-hidden', {
        'md:w-[270px] md:h-auto md:pointer-all fixed md:static top-0 left-0 w-full h-screen overflow-y-auto md:h-auto z-50 md:static mr-5': isOpenInside,
        'md:w-0 hidden md:block pointer-none': !isOpenInside,
    })}>
        <div className='flex pl-4 items-center bg-white md:hidden sticky z-40 top-0 left-0 w-full mb-2 shadow'>
            <Typography size='2xl' className='bg-white flex-1'>
                {getLanguage(translates.titles.header)} ({filtersCount})
            </Typography>
            <div className='p-2 bg-white hover:bg-gray-lighter transition cursor-pointer flex-0' onClick={onClose}>
                <IconComponent name='close'/>
            </div>
        </div>
        <Accordion isDefaultOpen title={getLanguage(translates.titles.categories)}>
            {categories.map(item => <FilterToggle key={item._id} text={getLanguage(item.name)} destination='category' id={item._id}/>)}
        </Accordion>

        <Accordion title={getLanguage(translates.titles.brands)}>
            {brands.map(item => <FilterToggle key={item._id} text={getLanguage(item.name)} destination='brand' id={item._id}/>)}
        </Accordion>

    </div>
}

interface FilterToggleProps {
    text: string;
    destination: 'brand' | 'category';
    id: string
}

const FilterToggle = ({text, destination, id}:FilterToggleProps) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const isActive = searchParams.get(destination) === id;
    const onItemClick = () => {
        const params = new URLSearchParams(searchParams.toString());
        if(isActive){
            params.delete(destination);
        }else {
            params.set(destination, id);
        }

        router.push(`${pathname}/?${params.toString()}`, {scroll: false}, );
    }

    return <div className={clsx('w-full flex justify-between py-2 px-4 transition cursor-pointer', {
        'bg-gray hover:bg-gray-darker':isActive,
        'bg-white hover:bg-gray-lighter':!isActive
    })} onClick={onItemClick}>
        <Typography size='lg' fontWeight={isActive ? 500 : 400}>
            {text}
        </Typography>
        <IconComponent className={clsx({'hidden': !isActive})} name='check'/>
    </div>
}