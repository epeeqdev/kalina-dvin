"use client"
import {Button} from "@/app/admin/main/components/controls/button";
import {useEffect, useState} from "react";
import SliderForm from "@/app/admin/helpers/forms/slider-form";
import Modal from "@/app/admin/main/products/helpers/modal";
import {useQuery} from "@/utils/hooks/useQuery";
import {useMutation} from "@/utils/hooks/useMutation";
import {getSliderData} from "@/app/admin/main/slider/api/getSliderData";
import {Controller, useForm} from "react-hook-form";
import {addSlider} from "@/app/admin/main/slider/api/addSlider";
import {Typography} from "@/app/main/components/controls/typography";
import LoadingSpinner from "@/components/controls/loading-spinner";
import {MainPageSliderDTO} from "@/backend/types";
import Alert from "@/app/admin/main/products/helpers/alert";

export default function Slider() {
    const {data: sliderData, isLoading: isSliderLoading} = useQuery<MainPageSliderDTO>(getSliderData);
    const {mutate: editSlider, isLoading: addSliderLoading} = useMutation(addSlider);
    const [editingItem , setEditingItem] = useState({})

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


    console.log(getValues(), "GetValues")

    const onDelete = async (id: string) => {
        const filteredSlides = getValues().slides.filter((item) => item._id !== id)
        setValue("slides",filteredSlides , {
            shouldValidate: true,
            shouldDirty: true
        })
    }

    const onAdd = async () => {
        editSlider(getValues())
    }

    const editItem = (id: string) => {
        const item = getValues().slides.filter((item) => item._id === id)
        setEditingItem(item)
    }

    const [isModalOpen, setIsModalOpen] = useState(false)
    return (
        <Controller control={localFormControl} render={({field}) => (
            <div>
                {
                    isModalOpen
                        ? <Modal classname="min-w-[50%] h-[90%]" onClose={() => {
                            setEditingItem({})
                            setIsModalOpen(false)
                        }} isOpen={isModalOpen}>
                            <SliderForm className="xl:w-[90%]" onSubmit={(value) => {
                                if(editingItem[0]){
                                    setIsModalOpen(false)
                                    const newData = field.value.map((item) => {
                                        if(item._id === value?._id){
                                            return value
                                        }else{
                                            return item
                                        }
                                    })
                                    console.log("value", value)
                                    console.log("field.value", field.value)
                                    console.log("editingItem", editingItem)
                                    console.log("getValues()", getValues())
                                    console.log("newData", newData )
                                    field.onChange(newData)
                                }else{
                                    setIsModalOpen(false)
                                    const oldFieldValue = field.value || [];
                                    field.onChange([...oldFieldValue, value])
                                    console.log("[...oldFieldValue, value]",[...oldFieldValue, value])
                                }
                            }} name="slides" editingSlideData={editingItem}/>
                        </Modal>
                        : <div></div>
                }
                <div className="fixed right-4 top-4 flex gap-2 z-30">
                    <Button variant="primary" onClick={() => {
                        setEditingItem({})
                        setIsModalOpen(true)
                    } }>Добавить Слайд</Button>
                    <Button variant="secondary" onClick={() => {
                        onAdd()
                        setEditingItem({})
                    }}>
                        Сохранить
                    </Button>
                </div>
                <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {
                        getValues()?.slides?.map((item) => {
                            return (
                                <div  key={item?._id} className="mb-5 border-2 border-gray-300 relative  overflow-hidden">
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
                                            editItem(item?._id)
                                            setIsModalOpen(true)
                                            console.log(editingItem, "editingItem")
                                        }}>Изменить</Button>
                                        <Button
                                            variant="alert"
                                            onClick={() => setAlertModal(true)}
                                        >Удалить</Button>
                                    </div>
                                    <Alert
                                        isOpen={alertModal}
                                        onAccept={() => {
                                            setAlertModal(false)
                                            onDelete(item._id)
                                        }}
                                        onClose={() => setAlertModal(false)}
                                        onCancel={() => setAlertModal(false)}
                                    >
                                        <p className="text-2xl font-bold">Вы уверены, что хотите удалить данный Слайд?</p>
                                        <p className="text-gray-700">После удаления Слайд не возможно восстановить!</p>
                                    </Alert>
                                </div>

                            )
                        })
                    }
                </div>
                {isLoading && <LoadingSpinner/>}
            </div>
        )} name="slides"/>

    )
}