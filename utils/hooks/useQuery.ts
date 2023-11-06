import {useEffect, useState} from "react";
import {QueryHookOptions} from "@/types";

export const useQuery = <ReturnValue, QueryFunction extends (...args: any[]) => any = () => void, ArgTypes = any[]>(query: QueryFunction, args?:ArgTypes[], options?:QueryHookOptions) => {
	const [data, setData] = useState<ReturnValue | null>(null);
	const [error, setError] = useState<Error | null>(null);
	const [isLoading, setLoading] = useState<boolean>(false);

	const fetchData = async (...newArgs:ArgTypes[]) => {
		try {
			setLoading(true)
			const result = await query(...newArgs);
			setData(result.data);
		} catch (err) {
			setError(err);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		if(options?.fetchOnMount === undefined || options.fetchOnMount){
			fetchData(args);
		}
	}, []);

	const refetch = (...newArgs:ArgTypes[]) => {
		const currentArgs = newArgs || args;
		fetchData(...currentArgs);
	}

	return {isLoading, refetch, error, data}
}

