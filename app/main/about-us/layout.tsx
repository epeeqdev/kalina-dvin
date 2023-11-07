import {PropsWithChildren} from "react";

interface Props extends PropsWithChildren{
}

export default function Layout({children}:Props){
	return <div>
		<span>Layout</span>
		{children}
	</div>
}
