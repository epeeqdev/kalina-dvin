import {Schema, model, models} from 'mongoose';
import {ImageFragment, TextFragment} from "@/backend/fragments";

const AboutUsPage = new Schema(
    {
        image: {...ImageFragment},
        homePageDescription: {...TextFragment},
        aboutUsPageDescriptionTop: {...TextFragment},
        aboutUsPageDescriptionBottom: {...TextFragment},
        assortmentCount: Number!,
        brandsCount: Number!,
        partnersCount: Number!
    }
);

export default models.AboutUsPage || model("AboutUsPage", AboutUsPage);
