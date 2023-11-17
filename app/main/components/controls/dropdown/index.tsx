import {Children, cloneElement, useEffect, useRef, useState} from "react";
import IconComponent from "@/components/icon";
import clsx from "clsx";
import {Typography} from "@/app/main/components/controls/typography";
interface Props {
    title: string;
    size?: { width: string | number; height: string | number };
    className?: string;
    onChange?: any;
    dropdownClassName?: string;
    children?: React.ReactNode;
}

type DropdownProps = Props;

export const Dropdown = ({ title, className, onChange, dropdownClassName, children }: DropdownProps) => {
    const [isShow, setIsShow] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const closeDropdownOnOutsideClick = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setIsShow(false);
        }
    };

    useEffect(() => {
        document.addEventListener("click", closeDropdownOnOutsideClick);

        return () => {
            document.removeEventListener("click", closeDropdownOnOutsideClick);
        };
    }, []);

    const toggleView = () => {
        setIsShow((prevState) => !prevState);
    };

    const handleChange = (lng?: string, isChanged?: boolean) => {
        if (isChanged) {
            onChange(lng);
        }
        setIsShow(false);
    };

    return (
        <div className="relative inline-block text-left" ref={dropdownRef}>
            <div>
                <button
                    type="button"
                    className={clsx([
                        "inline-flex w-full items-center justify-center gap-x-1.5 bg-white",
                        { "text-primary": !isShow, "text-secondary": isShow },
                        className,
                    ])}
                    id="menu-button"
                    aria-expanded="true"
                    aria-haspopup="true"
                    onClick={toggleView}
                >
                    {<Typography fontWeight={400} size="md" color="inherit">{title}</Typography>}
                    {<IconComponent name={isShow ? "chevronUp" : "chevronDown"} size="md" color="inherit" />}
                </button>
            </div>
            <div
                className={clsx([
                    "absolute right-0 z-10 mt-[23px]  origin-top-right rounded-none bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none transition-[opacity]",
                    {
                        "opacity-0 pointer-events-none": !isShow,
                        "opacity-100 pointer-events-all": isShow,
                    },
                    dropdownClassName,
                ])}
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="menu-button"
            >
                <div className="flex flex-col w-full" role="none">
                    {Children.map(children, (child: any) => (
                            cloneElement(child, {
                                onClick: () => handleChange(child.props.id, child.props.isChanged),
                            })
                    ))}
                </div>
            </div>
        </div>
    );
};
