import { useState, useEffect } from 'react';
import { usePathname, redirect } from 'next/navigation';
import {useUserContext} from "@/app/admin/userContext";

export { RouteGuard };

function RouteGuard({ children }) {
	const [authorized, setAuthorized] = useState(false);
	const pathName = usePathname();
	const {data} = useUserContext();

	useEffect(() => {
		authCheck(pathName);
	}, []);

	function authCheck(url) {
		const publicPaths = ['/admin/login'];
		const path = url.split('?')[0];
		if (!data && !publicPaths.includes(path)) {
			setAuthorized(false);
			redirect('/admin/login');
		} else {
			setAuthorized(true);
		}
	}

	return (authorized && children);
}
