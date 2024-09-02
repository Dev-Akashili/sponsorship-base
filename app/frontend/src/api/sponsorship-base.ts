import { AddSponsorship } from "@/types/sponsorship-base";
import { request } from "./request";

const fetchKeys = {
  create: "sponsorship"
};

export async function addSponsorship(formData: AddSponsorship) {
  return await request<AddSponsorship>(fetchKeys.create, {
    method: "POST",
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify(formData)
  });
}
