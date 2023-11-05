import {useEffect, useState} from "react";
import {useRef} from "react";

export const useDebouncedState = <StateValue>(defaultValue?: StateValue, timeoutMS: number = 300) => {
	console.log('defauuult', defaultValue)
	const [value, setValue] = useState<StateValue>(defaultValue);
	const changeTimeout = useRef<ReturnType<NodeJS.Timeout>>()

	const onChange = (value: StateValue) => {
		clearTimeout(changeTimeout.current);
		changeTimeout.current = setTimeout(() => {
			setValue(value)
		}, timeoutMS)
	}

	useEffect(() => {
		return () => clearTimeout(changeTimeout.current)
	}, [])

	return [value, onChange]
}
