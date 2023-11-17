"use client"
import {Button} from "@/app/admin/main/components/controls/button";
import {useState} from "react";
import SliderForm from "@/app/admin/helpers/forms/slider-form";
import Modal from "@/app/admin/main/products/helpers/modal";
import {useQuery} from "@/utils/hooks/useQuery";
import {useMutation} from "@/utils/hooks/useMutation";
import {getSliderData} from "@/app/admin/main/slider/api/getSliderData";
import {Controller, useForm} from "react-hook-form";
import {addSlider} from "@/app/admin/main/slider/api/addSlider";
import LoadingSpinner from "@/components/controls/loading-spinner";
import {MainPageSliderDTO, SlideDTO} from "@/backend/types";
import Alert from "@/app/admin/main/products/helpers/alert";

export default function Slider() {
    const {data: sliderData, isLoading: isSliderLoading} = useQuery<MainPageSliderDTO>(getSliderData);
    const {mutate: editSlider, isLoading: addSliderLoading} = useMutation(addSlider);
    const [editingItem , setEditingItem] = useState<SlideDTO>()
    const [deletingItemId, setDeletingItemId] = useState("")
    const [editingItemId, setEditingItemId] = useState("")

    const [alertModal, setAlertModal] = useState(false)

    const isLoading = addSliderLoading || isSliderLoading


    const {
        control: localFormControl,
        formState: {errors},
        getValues,
        setValue
    } = useForm<MainPageSliderDTO>({
        values: sliderData!
    });

    const onDelete = (id: string) => {
        const filteredSlides = getValues().slides.filter((item) => (item._id || item.id) !== id)
        setValue("slides" ,filteredSlides , {
            shouldValidate: true,
            shouldDirty: true
        })
        setAlertModal(false)
    }



    const onAdd = async () => {
        await editSlider(getValues())
    }

    const editItem = (id: string) => {
        const item = getValues().slides.find((item) => (item._id || item.id) === id)
        if(item){
            setEditingItem(item)
        }
    }


    const [isModalOpen, setIsModalOpen] = useState(false)
    return (
        <Controller control={localFormControl} render={({field}) => (
            <div>
                {
                    isModalOpen
                        ? <Modal classname="min-w-[50%] h-[90%]" onClose={() => {
                            setEditingItem(null)
                            setIsModalOpen(false)
                        }} isOpen={isModalOpen}>
                            <SliderForm className="xl:w-[90%]" onSubmit={(value) => {
                                if(editingItem){
                                    setIsModalOpen(false)
                                    const newData = field.value.map((item) => {
                                        if(item._id === editingItemId || item.id === editingItemId){
                                            return value
                                        }else{
                                            return item
                                        }
                                    })
                                    field.onChange(newData)
                                    setEditingItem(null);
                                }else{
                                    setIsModalOpen(false)
                                    const oldFieldValue = field.value || [];
                                    field.onChange([...oldFieldValue, value])
                                }
                            }} name="slides" editingSlideData={editingItem}/>
                        </Modal>
                        : <div></div>
                }
                <div className="bg-white text-white w-full h-16 flex items-center z-30 fixed top-0">
                    <Button variant="primary" className="fixed right-5 top-3" onClick={() => {
                        onAdd()
                        setEditingItem(null)
                    }}>
                        Сохранить
                    </Button>
                </div>
                <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-[50px]">
                    {
                        getValues()?.slides?.map((item) => {
                            return (
                                <div  key={item?._id} className="mb-5 border-2 border-gray-300 relative overflow-hidden">
                                    <div className='justify-center items-start relative'>
                                        <div>
                                            <img src={item?.image?.src} alt='swiper' className=' w-full h-[200px] min-w-[300px] object-cover bg-gray-200'/>
                                        </div>
                                        <div className="absolute top-[30%] left-0 pl-[30px] z-20">
                                            <div className='text-[15px] text-red-600 mb-[5px] font-bold'>{item?.title?.ru}</div>
                                            <div className='text-[5px] text-white mb-[5px] w-[60%]'
                                            >{item?.description?.ru}</div>
                                            <Button variant="alert" className="p-[2px] z-10 overflow-hidden top-0 h-[15px] text-[5px] flex justify-center items-center" onClick={() => {
                                            }}>
                                                {item?.buttonText?.ru}
                                            </Button>
                                        </div>
                                        <div className=" w-full h-full absolute bg-zinc-600 top-0 right-0 left-0 bottom-0 opacity-40"></div>
                                    </div>
                                    <div className="flex justify-end gap-2 m-4">
                                        <Button variant="secondary" onClick={() => {
                                            editItem(item?._id ?? item.id ?? '')
                                            setEditingItemId(item._id ?? item.id ?? "")
                                            setIsModalOpen(true)
                                        }}>Изменить</Button>
                                        <Button
                                            variant="alert"
                                            onClick={() => {
                                                setAlertModal(true)
                                                setDeletingItemId(item._id ?? item.id ?? "")
                                            }}
                                        >Удалить</Button>
                                        <Alert
                                            isOpen={alertModal}
                                            onAccept={() => {
                                                onDelete(deletingItemId)
                                                setDeletingItemId("")
                                            }}
                                            onClose={() => {
                                                setDeletingItemId("")
                                                setAlertModal(false)
                                            }}
                                            onCancel={() => {
                                                setDeletingItemId("")
                                                setAlertModal(false)
                                            }}
                                        >
                                            <p className="text-2xl font-bold">Вы уверены, что хотите удалить данный Слайд?</p>
                                            <p className="text-gray-700">После удаления Слайд не возможно восстановить!</p>
                                        </Alert>
                                    </div>

                                </div>

                            )
                        })
                    }
                <div
                    onClick={() => {
                        setEditingItem(null)
                        setIsModalOpen(true)
                    } }
                    className="mb-5 border-2 border-gray-300 overflow-hidden text-5xl cursor-pointer hover:bg-gray-200 text-gray-400 p-[25%] items-center justify-center flex">
                    <span>+</span>
                </div>
                </div>
                {isLoading && <LoadingSpinner/>}
            </div>
        )} name="slides"/>

    )
}