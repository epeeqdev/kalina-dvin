import {Schema, model, models} from 'mongoose';
import {ImageFragment, TextFragment} from "@/backend/fragments";

const MainPageSliderSchema = new Schema(
    {
        slides: {
            type: [
                {
                    title: {...TextFragment},
                    description: {...TextFragment},
                    buttonLink: String,
                    buttonText: {...TextFragment},
                    image: {...ImageFragment},
                }], required: true
        },
    }
);

export default models.MainPageSlider || model("MainPageSliderSchema", MainPageSliderSchema);
