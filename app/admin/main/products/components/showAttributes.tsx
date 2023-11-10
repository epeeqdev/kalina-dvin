import {ProductAttribute} from "@/app/admin/main/products/types";
import DeleteButton from "@/app/admin/main/components/controls/delete-button";
import {AttributesResponseDTO, ProductAttributeResponseDTO} from "@/backend/types";
import {ProductForm} from "@/app/admin/main/products/helpers/useProductForm";

interface Props {
    attributes: ProductForm['attributes'];
    removeItem : (id:string) => void;
    onAddClick: () => void;
}

export default function ShowAttributes({attributes, removeItem, onAddClick} : Props){
    return (
        <div className="mb-5">
            <div>
                <div className="my-5 text-dark-grey flex gap-4">
                    <div>Аттрибуты</div>
                    <button
                        onClick={onAddClick}
                        className='text-[24px] w-[30px] h-[30px] bg-green-600 rounded-full border-none transition hover:bg-green-700 text-white flex justify-center leading-[29px]'>
                        <span>+</span>
                    </button>
                </div>

                <div>
                    {
                        attributes?.map(({id, value, attribute}) => {
                            return <div className="my-5 flex capitalize items-center text-dark-grey border-[1px] border-[#e5e7eb] justify-between w-[400px] bg-white rounded pl-[10px]" key={id}>
                                {`${attribute.label} : AM - ${value.am} | RU - ${value.ru}`}
                                <DeleteButton remove={() => removeItem(id!)}/>
                            </div>
                        })
                    }
                </div>
            </div>
        </div>
    )
}