import {getCategories} from "@/app/main/api-helpers/getCategories";

import {PageContent} from "@/app/main/categories/page-content";
import {getCategoriesPage} from "@/app/main/api-helpers/getCategoriesPage";

export default async function Categories() {
	const categoriesData = await getCategories();
	const categoriesPage=await getCategoriesPage();
	return <PageContent data={categoriesData} imageData={categoriesPage}/>
}
