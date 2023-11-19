import {Control, Controller, Path} from "react-hook-form";
import {
    ImageUploader as ImageUploaderControl,
    ImageUploaderProps
} from "@/app/admin/main/components/controls/image-uploader";
import {ImageDTO} from "@/backend/types";

interface Props<Field> extends Omit<ImageUploaderProps, 'defaultUploadedImages' | 'onUploadComplete'> {
    control: Control<Field>;
    name: Path<Field>;
}

export const ImageUploader = <Field,>({name, control, ...props}:Props<Field>) => {
    return <Controller control={control} render={({field}) => {
        return <ImageUploaderControl {...props} defaultUploadedImages={(Array.isArray(field.value) ? field.value : field.value ? [field.value] : []) as ImageDTO[]} onUploadComplete={(v:ImageDTO[] | ImageDTO) => {
            field.onChange(v)
        }} />
    }} name={name}/>
}