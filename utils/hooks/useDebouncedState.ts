import {useEffect, useState} from "react";
import {useRef} from "react";

export const useDebouncedState = <StateValue>(defaultValue?: StateValue, timeoutMS: number = 300) => {
	const [value, setValue] = useState<StateValue | undefined>(defaultValue);
	const changeTimeout = useRef<ReturnType<typeof setTimeout>>()

	const onChange = (value: StateValue) => {
		clearTimeout(changeTimeout.current);
		changeTimeout.current = setTimeout(() => {
			setValue(value)
		}, timeoutMS)
	}

	useEffect(() => {
		return () => clearTimeout(changeTimeout.current)
	}, [])

	return [value, onChange] as [StateValue, (value: StateValue) => void]
}
