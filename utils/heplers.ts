import {headers} from "next/headers";

export const isNull = (value: any) => typeof value === 'object' && !value

export const getCurrentUrl = () => {
    const headersList = headers();
    const header_url = headersList.get('x-url') || "";
    const url = new URL(header_url);
    return url.origin;
}
