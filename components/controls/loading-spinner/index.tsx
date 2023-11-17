"use client"

import ReactLoading from "react-loading";

export default function LoadingSpinner() {
    return (
        <div className="w-full fixed left-0 top-0 h-full z-[70] bg-black bg-opacity-50 text-white flex justify-center items-center text-lg">
            <ReactLoading type="spin" color="red" />
        </div>
    );
}
