import { AddOrEditSponsorship, Sponsorship } from "@/types/sponsorship";
import { request } from "./request";
import { PaginatedResponse } from "@/types";

const fetchKeys = {
  create: "sponsorship",
  get: (id: string) => `sponsorship/${id}`,
  edit: (id: string) => `sponsorship/${id}`,
  delete: (id: string) => `sponsorship/${id}`,
  list: (filter?: string) => `sponsorship/?${filter}`,
  approve: (id: string) => `sponsorship/approve/${id}`,
  manage: (filter?: string) => `sponsorship/manage/?${filter}`,
  favourite: (filter?: string) => `sponsorship/favourite/?${filter}`,
  addFavourite: (id: string) => `sponsorship/favourite/${id}`,
  removeFavourite: (id: string) => `sponsorship/favourite/${id}`
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

export async function getSponsorship(id: string): Promise<Sponsorship> {
  try {
    const response = await request<PaginatedResponse<Sponsorship>>(
      fetchKeys.get(id)
    );
    return await response.json();
  } catch {
    console.warn("Failed to fetch data.");
    return {
      id: "",
      sex: "",
      nationality: "",
      company: undefined,
      country: "",
      city: "",
      industry: "",
      jobTitle: "",
      experience: "",
      salary: "",
      currency: "",
      education: "",
      countryOfQualification: "",
      month: "",
      year: "",
      jobBoard: undefined,
      isApproved: false
    };
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

export async function getUserFavouriteSponsorships(
  filter: string
): Promise<PaginatedResponse<Sponsorship>> {
  try {
    const response = await request<PaginatedResponse<Sponsorship>>(
      fetchKeys.favourite(filter)
    );
    return await response.json();
  } catch {
    console.warn("Failed to fetch data.");
    return { count: 0, list: [] };
  }
}

export async function deleteSponsorship(id: string) {
  return await request(fetchKeys.delete(id), {
    method: "DELETE",
    headers: {
      "Content-type": "application/json"
    }
  });
}

export async function addSponsorship(formData: AddOrEditSponsorship) {
  return await request<AddOrEditSponsorship>(fetchKeys.create, {
    method: "POST",
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify(formData)
  });
}

export async function updateSponsorship(
  formData: AddOrEditSponsorship,
  id: string
) {
  return await request<AddOrEditSponsorship>(fetchKeys.edit(id), {
    method: "PATCH",
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify(formData)
  });
}

export async function addFavourite(id: string) {
  return await request(fetchKeys.addFavourite(id), {
    method: "POST",
    headers: {
      "Content-type": "application/json"
    }
  });
}

export async function removeFavourite(id: string) {
  return await request(fetchKeys.removeFavourite(id), {
    method: "DELETE",
    headers: {
      "Content-type": "application/json"
    }
  });
}

export async function approveOrDisable(id: string) {
  return await request(fetchKeys.approve(id), {
    method: "PATCH",
    headers: {
      "Content-type": "application/json"
    }
  });
}
