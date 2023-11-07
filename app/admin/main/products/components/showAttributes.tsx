import DeleteButton from "@/components/controls/delete-button/page";
import {ProductAttribute} from "@/app/admin/main/products/types";

interface Props {
    attributes: ProductAttribute[];
    removeItem : (id:string) => void;
    onAddClick: () => void;
}

export default function ShowAttributes({attributes, removeItem, onAddClick} : Props){
    return (
        <div className="mb-5">
            <div>
                <div className="my-5 text-dark-grey flex gap-4">
                    <div>Attributes</div>
                    <button
                        onClick={onAddClick}
                        className='text-[24px] w-[30px] h-[30px] bg-green-600 rounded-full border-none transition hover:bg-green-700 text-white flex justify-center leading-[29px]'>
                        <span>+</span>
                    </button>
                </div>

                <div>
                    {
                        attributes?.map(({id, am, ru, attribute}) => {
                            return <div className="my-5 flex capitalize items-center text-dark-grey border-[1px] border-[#e5e7eb] justify-between w-[400px] bg-white rounded pl-[10px]" key={id}>
                                {`${attribute?.label} : AM - ${am} | RU - ${ru}`}
                                <DeleteButton remove={() => removeItem(id)}/>
                            </div>
                        })
                    }
                </div>
            </div>
        </div>
    )
}