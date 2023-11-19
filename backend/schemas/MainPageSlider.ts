import {Schema, model, models} from 'mongoose';
import {TextFragment} from "@/backend/fragments";

const MainPageSliderSchema = new Schema(
    {
        slides: {
            type: [
                {
                    title: {...TextFragment},
                    description: {...TextFragment},
                    buttonLink: String,
                    buttonText: {...TextFragment},
                    image: { type: Schema.Types.ObjectId ,ref: 'Image' },
                }], required: true
        },
    }
);

export default models.MainPageSlider || model("MainPageSlider", MainPageSliderSchema);
