import clsx from "clsx";
import IconComponent from "@/app/admin/main/components/icon";

interface Props {
    className?: string
    remove: () => void
}

export default function DeleteButton({remove, className}: Props) {
    return (
        <button onClick={(e) => {
            remove()
        }}
                className={clsx(className , "text-red-600 w-[25px] m-2 active:text-red-600 active:bg-white")}>
            <IconComponent name={"trash"}/>
        </button>
    )
}