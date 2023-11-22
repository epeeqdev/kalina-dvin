import {useState} from "react";
import toast from 'react-hot-toast';

export const useMutation = <MutationFunction extends (...args: any[]) => any, ArgTypes>(mutation: MutationFunction, args?:ArgTypes[]) => {
	const [data, setData] = useState(null);
	const [error, setError] = useState<Error | null>(null);
	const [isLoading, setLoading] = useState<boolean>(false);

	const mutate = async (...newArgs: ArgTypes[]) => {
		const currentArgs = newArgs || args;
		try {
			setLoading(true)
			const result = await mutation(...currentArgs);
			setData(result?.data);
			toast.success('Успешно')
			return result.data;
		} catch (err) {
			setError(err);
			toast.error(err?.response?.data?.error || err?.message || 'Что то пошло не так.');
			throw err;
		} finally {
			setLoading(false);
		}
	};

	return {isLoading, error, data, mutate}
}
