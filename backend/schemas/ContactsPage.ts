import {Schema, model, models} from "mongoose";
import {TextFragment} from "@/backend/fragments";

const ContactsPageSchema = new Schema({
    phone: String!,
    email: String!,
    address: {...TextFragment},
    socialLinks: {
        instagram: String,
        facebook: String,
    }
});

export const ContactsPage = models.ContactsPage || model('ContactsPage', ContactsPageSchema, 'ContactsPage');

