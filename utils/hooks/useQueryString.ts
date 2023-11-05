import {useCallback} from "react";
import {ReadonlyURLSearchParams, usePathname, useSearchParams} from "next/navigation";

export const useQueryString = () => {
	const searchParams = useSearchParams();
	const pathName = usePathname();

	const pushQueryString = useCallback(
		(name: string, value: string) => {
			const params = new URLSearchParams(searchParams)
			if(value){
				params.set(name, value)
			}else {
				params.delete(name)
			}

			history.pushState({}, '', `${pathName}${params.toString() ? '?': ''}${params}`);
			return params as ReadonlyURLSearchParams
		},
		[searchParams, pathName]
	);

	return {pushQueryString, searchParams}
}
