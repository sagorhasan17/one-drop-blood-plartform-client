export const getAllStats = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/stats`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to fetch stats");
  }

  return data;
};
