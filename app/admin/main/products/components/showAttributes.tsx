import DeleteButton from "@/app/admin/main/components/controls/delete-button";
import {ProductForm} from "@/app/admin/main/products/helpers/useProductForm";
import IconComponent from "@/app/admin/main/components/icon";
import clsx from "clsx";
import { useLanguage } from "@/app/main/hooks/useLanguage";
import {ATTRIBUTES} from "../../costants";

interface Props {
    attributes: ProductForm['attributes'];
    removeItem : (id:string) => void;
    onAddClick: () => void;
    isOpen?: boolean
    onEdit?: (id: string) => void
}

export default function  ShowAttributes({attributes, removeItem, onAddClick, isOpen, onEdit} : Props){
    const { getLanguage } = useLanguage()
    return (
        <div className="mb-5">
            <div>
                <div className="my-5 text-dark-grey flex gap-4">
                    <div>{getLanguage(ATTRIBUTES)}</div>
                </div>
                <div>
                    {
                        attributes?.map(({id, value, attribute}) => {
                            return <div className={clsx("my-1 py-1 flex capitalize items-center text-dark-grey border-[1px] border-[#e5e7eb] justify-between w-full bg-white whitespace-normal pl-[10px]")} key={id}>
                                <div>
                                    <span>{attribute?.label?.am ? getLanguage({am: attribute?.label.am, ru: attribute.label.ru}) : `${attribute?.label}`}</span>
                                    <span className="font-bold m-0 mx-2">{getLanguage({am: "ՀԱՅ -", ru: "АРМ -"})}</span>{value.am}
                                    <span className="font-bold m-0 mx-2">{getLanguage({am: "ՌՈՒՍ -", ru: "РУС -"})}</span>{value.ru}
                                </div>
                                <div className="flex items-center justify-center">
                                    <IconComponent name="edit" className="cursor-pointer hover:opacity-50" onClick={() => {
                                        onEdit(id)
                                        onAddClick()
                                    }}/>
                                    <DeleteButton remove={() => removeItem(id!)} className='hover:opacity-50'/>
                                </div>
                            </div>
                        })
                    }
                    <div className="flex justify-center mt-2">
                        {
                            !isOpen && <button
                                onClick={onAddClick}
                                className='w-full h-[40px] border-green-700 border-[1px] transition hover:border-green-500 hover:text-green-500 text-green-700 flex justify-center items-center'>
                                <IconComponent name="plus"/>
                            </button>
                        }
                    </div>

                </div>
            </div>
        </div>
    )
}