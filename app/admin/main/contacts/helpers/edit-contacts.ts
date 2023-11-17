import axios from "@/axios";
import {ContactsPageDTO} from "@/backend/types";

export const editContacts = (body: ContactsPageDTO) => axios.put(`/api/pages/contacts`, body);