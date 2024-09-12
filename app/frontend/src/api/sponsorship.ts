import { AddSponsorship, Sponsorship } from "@/types/sponsorship";
import { request } from "./request";
import { PaginatedResponse } from "@/types";

const fetchKeys = {
  list: (filter?: string) => `sponsorship/?${filter}`,
  manage: (filter?: string) => `sponsorship/manage/?${filter}`,
  create: "sponsorship"
};

export async function getSponsorships(
  filter: string
): Promise<PaginatedResponse<Sponsorship>> {
  try {
    const response = await request<PaginatedResponse<Sponsorship>>(
      fetchKeys.list(filter)
    );
    return await response.json();
  } catch {
    console.warn("Failed to fetch data.");
    return { count: 0, list: [] };
  }
}

export async function getUserSponsorships(
  filter: string
): Promise<PaginatedResponse<Sponsorship>> {
  try {
    const response = await request<PaginatedResponse<Sponsorship>>(
      fetchKeys.manage(filter)
    );
    return await response.json();
  } catch {
    console.warn("Failed to fetch data.");
    return { count: 0, list: [] };
  }
}

export async function addSponsorship(formData: AddSponsorship) {
  return await request<AddSponsorship>(fetchKeys.create, {
    method: "POST",
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify(formData)
  });
}
