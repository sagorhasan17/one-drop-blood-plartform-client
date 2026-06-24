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
