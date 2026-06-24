import { serverMutation } from "../core/server";

export const createDonor = (donorData) => {
  return serverMutation("/api/create-donor", donorData, "POST");
};

//get all DonationRequests
export const getAllDonorsRequest = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/get-donors`,
      {
        cache: "no-store",
      },
    );
    if (!res.ok) {
      throw new Error("Failed to fetch donors");
    }
    const resData = await res.json();
    return resData.data;
  } catch (error) {
    console.log("Error fetching donors:", error);
    return {
      success: false,
      data: [],
    };
  }
};

//get DonationRequest by Id
export const getDonorById = async (id) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/get-donors/${id}`,
      {
        cache: "no-store",
      },
    );
    if (!res.ok) {
      throw new Error("Failed to fetch donors");
    }
    const resData = await res.json();
    return resData.data;
  } catch (error) {
    console.log("Error fetching donors:", error);
    return {
      success: false,
      data: [],
    };
  }
};

//donor request successfull or donate now button clicked


