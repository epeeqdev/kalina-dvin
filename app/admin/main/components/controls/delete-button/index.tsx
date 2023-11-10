import clsx from "clsx";

interface Props {
    className?: string
    remove: () => void
}

export default function DeleteButton({remove, className}: Props) {
    return (
        <button onClick={(e) => {
            remove()
        }}
                className={clsx(className , "bg-red-700 text-white w-[25px] h-[25px] m-2 rounded-3xl flex justify-center items-center")}>
            X
        </button>
    )
}