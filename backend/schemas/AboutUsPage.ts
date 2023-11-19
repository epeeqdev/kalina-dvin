import {Schema, model, models} from 'mongoose';
import {TextFragment} from "@/backend/fragments";

const AboutUsPage = new Schema(
    {
        image: { type: Schema.Types.ObjectId,ref: 'Image'},
        homePageDescription: {...TextFragment},
        aboutUsPageDescriptionTop: {...TextFragment},
        aboutUsPageDescriptionBottom: {...TextFragment},
        assortmentCount: Number!,
        brandsCount: Number!,
        partnersCount: Number!
    }
);

export default models.AboutUsPage || model("AboutUsPage", AboutUsPage);
