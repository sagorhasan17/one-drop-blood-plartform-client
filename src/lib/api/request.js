export const getMyRequestsById = async (id) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/get-my-requests/${id}`,
      {
        cache: "no-store",
      },
    );
    if (!res.ok) {
      throw new Error("Failed to fetch my requests");
    }
    const resData = await res.json();
    return resData.data;
  } catch (error) {
    console.log("Error fetching my requests:", error);
    return {
      success: false,
      data: [],
    };
  }
};

//my request update
export const updateMyRequest = async (id, data) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/update-my-request/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      },
    );

    const result = await res.json();

    if (!res.ok) {
      throw new Error(result.message || "Failed to update request");
    }

    return result;
  } catch (error) {
    console.error("Error updating request:", error);

    return {
      success: false,
      message: error.message,
      data: null,
    };
  }
};


