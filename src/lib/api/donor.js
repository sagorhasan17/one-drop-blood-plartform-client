import { serverMutation } from "../core/server";

export const createDonor = (donorData, token) => {
  return serverMutation("/api/create-donor", donorData, "POST", token);
};

//get all DonationRequests
export const getAllDonorsRequest = async (token) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/get-donors-requests`,
      {
        cache: "no-store",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    if (!res.ok) {
      throw new Error("Failed to fetch donors");
    }
    const resData = await res.json();
    return resData.data;
  } catch (error) {
    console.log("Error fetching donors:", error);
    return [];
  }
};

//get all filters donors request
export const getFilteredDonorsRequest = async (queryString) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/get-filter-donors-requests?${queryString}`,
      {
        cache: "no-store",
        // headers: {
        //   Authorization: `Bearer ${token}`,
        // },
      },
    );
    if (!res.ok) {
      throw new Error("Failed to fetch donors");
    }
    const resData = await res.json();
    return resData.data;
  } catch (error) {
    console.log("Error fetching donors:", error);
    return [];
  }
};

//get DonationRequest by Id
export const getDonorById = async (id, token) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/get-donors/${id}`,
      {
        cache: "no-store",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (!res.ok) {
      throw new Error("Failed to fetch donor");
    }

    const resData = await res.json();
    return resData.data;
  } catch (error) {
    console.error("Error fetching donor:", error);
    return null;
  }
};

//donor request successfull or donate now button clicked
