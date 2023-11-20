import {BrandResponseDTO, CategoryResponseDTO} from "@/backend/types";
import clsx from "clsx";
import {useLanguage} from "@/app/main/hooks/useLanguage";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {Accordion} from "@/components/accordion";
import IconComponent from "@/components/icon";
import {Typography} from "@/app/main/components/controls/typography";

interface Props {
    categories: CategoryResponseDTO[];
    brands: BrandResponseDTO[];
    isOpen?: boolean;
    onClose?: () => void
}

const translates = {
    titles: {
        categories: {am: 'Կատեգորիաներ', ru: 'Категории'},
        brands: {am: 'Բրենդեր', ru: 'Бренды'}
    }
}
export const Filter = ({categories, brands, isOpen, onClose= () => null}: Props) => {
    const {getLanguage} = useLanguage()
    return <div className={clsx('bg-white transition-[width] overflow-x-hidden', {
        'md:w-[270px] md:h-auto md:pointer-all fixed md:static top-0 left-0 w-full h-screen md:h-auto z-30 pt-12 md:pt-0 md:static': isOpen,
        'md:w-0 hidden md:block pointer-none': !isOpen,
    })}>
        <div className='absolute right-0 top-0 block md:hidden p-2 bg-white hover:bg-gray-lighter transition cursor-pointer' onClick={onClose}>
            <IconComponent name='close'/>
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