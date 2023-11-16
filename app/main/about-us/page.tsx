import {getAboutUsPage} from "@/app/main/api-helpers/getAboutUsPage";
import {AboutPageContent} from "@/app/main/about-us/about-page-content";

export default async function AboutUs() {
	const aboutUsData = await getAboutUsPage()
	return (
		<AboutPageContent aboutUsData={aboutUsData}/>
	)
}
