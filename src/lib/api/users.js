export const getAllUsers = async (token) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/get-users`,
      {
        cache: "no-store",
        headers: {
          ...(token && {
            Authorization: `Bearer ${token}`,
          }),
        },
      },
    );
    const result = await response.json();
    if (!response.ok) {
      throw new Error(result?.message || "Failed to fetch users");
    }
    return result;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

//update user
export const updateProfile = async (profileData, token) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/update-profile`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(profileData),
      },
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to update profile");
    }

    return data;
  } catch (error) {
    console.error("Update Profile API Error:", error);
    throw error;
  }
};

//update role
export const updateUserRole = async (id, role) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/users/${id}/role`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ role }),
    },
  );

  return res.json();
};
