export async function saveFunding(paymentData) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/save-funding`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
        body: JSON.stringify(paymentData),
      },
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to save funding.");
    }

    return data;
  } catch (error) {
    throw error;
  }
}

// get all Funding History
export async function getFundingHistory() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/get-funding`,
      {
        cache: "no-store",
      },
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to get funding history.");
    }

    return data;
  } catch (error) {
    throw error;
  }
}
