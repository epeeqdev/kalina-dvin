"use client"
import {Button} from "@/app/admin/main/components/controls/button";
import React, {useState} from "react";
import SliderForm from "@/app/admin/main/components/forms/slider-form";
import Modal from "@/app/admin/main/products/helpers/modal";
import {useQuery} from "@/utils/hooks/useQuery";
import {useMutation} from "@/utils/hooks/useMutation";
import {getSliderData} from "@/app/admin/main/pages/slider/api/getSliderData";
import {Controller, useForm} from "react-hook-form";
import {addSlider} from "@/app/admin/main/pages/slider/api/addSlider";
import LoadingSpinner from "@/components/controls/loading-spinner";
import {MainPageSliderDTO, SlideDTO} from "@/backend/types";
import Alert from "@/app/admin/main/products/helpers/alert";
import {Draggable} from "@/app/admin/main/drag-and-drop/draggable";
import {Droppable} from "@/app/admin/main/drag-and-drop/droppable";
import {DroppableArgs} from "@/app/admin/main/drag-and-drop/types";
import {getReorderedItems} from "@/app/admin/main/drag-and-drop/utils/getReorderedItems";
import IconComponent from "@/app/admin/main/components/icon";
import {PageLayout} from "@/app/admin/main/components/page-layout";
import {useRouter} from "next/navigation";
import ToItemPageButton from "@/app/admin/main/components/controls/toItemPageButton";

export default function Slider() {
    const {data: sliderData, isLoading: isSliderLoading} = useQuery<MainPageSliderDTO>(getSliderData);
    const {mutate: editSlider, isLoading: addSliderLoading} = useMutation(addSlider);
    const [editingItem, setEditingItem] = useState<SlideDTO>()
    const [deletingItemId, setDeletingItemId] = useState("")
    const [editingItemId, setEditingItemId] = useState("")

    const [alertModal, setAlertModal] = useState(false)

    const isLoading = addSliderLoading || isSliderLoading


    const {
        control: localFormControl,
        formState: { isDirty},
        getValues,
        setValue
    } = useForm<MainPageSliderDTO>({
        values: sliderData!
    });

    const onDelete = (id: string) => {
        const filteredSlides = getValues().slides.filter((item) => (item._id || item.id) !== id)
        setValue("slides", filteredSlides, {
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
        if (item) {
            setEditingItem(item)
        }
    }

    const handleDrop = (args: DroppableArgs) => {
        setValue("slides", getReorderedItems(getValues().slides as SlideDTO[], args))
    }


    const [isModalOpen, setIsModalOpen] = useState(false)
    return (
        <Controller control={localFormControl} render={({field}) => (
            <div>
                {
                    isModalOpen
                        ? <Modal classname="min-w-[50%] h-[90%]" title={"Добавить Слайды"} onClose={() => {
                            setEditingItem(null)
                            setIsModalOpen(false)
                        }} isOpen={isModalOpen}>
                            <SliderForm className="xl:w-[90%]" onSubmit={(value) => {
                                if (editingItem) {
                                    setIsModalOpen(false)
                                    const newData = field.value.map((item) => {
                                        if (item._id === editingItemId || item.id === editingItemId) {
                                            return value
                                        } else {
                                            return item
                                        }
                                    })
                                    field.onChange(newData)
                                    setEditingItem(null);
                                } else {
                                    setIsModalOpen(false)
                                    const oldFieldValue = field.value || [];
                                    field.onChange([...oldFieldValue, value])
                                }
                            }} name="slides" editingSlideData={editingItem}/>
                        </Modal>
                        : <div></div>
                }
                <PageLayout headerButtons={
                    <>
                        {
                            isDirty && !isLoading && <Button
                            variant="primary"
                            onClick={() => {
                                onAdd()
                                setEditingItem(null)
                            }}>
                            Сохранить
                        </Button>}
                        <ToItemPageButton link='/main'/>
                    </>


                } headerTitle={"Слайдеры"}>
                    <div
                        className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-[50px] pl-5 pr-5">
                        {
                            getValues()?.slides?.map((item) => {
                                return (
                                    <Droppable key={item.id || item._id} id={item.id || item._id}
                                               onDrop={handleDrop}>
                                        <Draggable id={item.id || item._id}>
                                            <div key={item?._id}
                                                 className="border-2 border-gray-300 relative overflow-hidden">
                                                <div className='justify-center items-start relative'>
                                                    <div>
                                                        <img src={item?.image?.src} alt='swiper'
                                                             className=' w-full h-[200px] min-w-[300px] object-cover bg-gray-200'/>
                                                    </div>
                                                    <div className="absolute z-30 top-2 right-2">
                                                        <IconComponent
                                                            name='edit'
                                                            className="bg-[#1f2937] rounded-[50%] p-2 w-8 h-8 text-white cursor-pointer mb-2 hover:bg-blue-900"
                                                            onClick={() => {
                                                                editItem(item?._id ?? item.id ?? '')
                                                                setEditingItemId(item._id ?? item.id ?? "")
                                                                setIsModalOpen(true)
                                                            }}/>
                                                        <IconComponent
                                                            className="bg-red-900 rounded-[50%] p-2 w-8 h-8 text-white cursor-pointer hover:bg-red-700"
                                                            name='trash'
                                                            onClick={() => {
                                                                setAlertModal(true)
                                                                setDeletingItemId(item._id ?? item.id ?? "")
                                                            }}/>
                                                    </div>

                                                    <div className="absolute top-[30%] left-0 pl-[30px] z-20">
                                                        <div
                                                            className='text-[15px] text-red-600 mb-[5px] font-bold'>{item?.title?.ru}</div>
                                                        <div className='text-[5px] text-white mb-[5px] w-[60%]'
                                                        >{item?.description?.ru}</div>
                                                        {(!!item?.buttonText?.ru || !!item?.buttonText?.am) &&
                                                            <Button variant="alert"
                                                                    className="p-[2px] z-10 bg-red-700 text-white overflow-hidden top-0 h-[15px] text-[5px] rounded-none flex justify-center items-center cursor-grab"
                                                            >
                                                                {item?.buttonText?.ru}
                                                            </Button>}
                                                    </div>
                                                    <div
                                                        className=" w-full h-full absolute bg-zinc-600 top-0 right-0 left-0 bottom-0 opacity-40"></div>
                                                </div>
                                                <div className="flex justify-end gap-2 relative">
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
                                                        <p className="text-2xl font-bold">Вы уверены, что хотите удалить
                                                            данный Слайд?</p>
                                                        <p className="text-gray-700">После удаления Слайд не возможно
                                                            восстановить!</p>
                                                    </Alert>
                                                </div>

                                            </div>
                                        </Draggable>
                                    </Droppable>

                                )
                            })
                        }
                        <div
                            onClick={() => {
                                setEditingItem(null)
                                setIsModalOpen(true)
                            }}
                            className="border-2 border-gray-300 overflow-hidden text-5xl cursor-pointer hover:bg-gray-200 text-gray-400 p-[20%] items-center justify-center flex">
                            <span>+</span>
                        </div>
                    </div>
                </PageLayout>
                {isLoading && <LoadingSpinner/>}
            </div>
        )} name="slides"/>
    )
}