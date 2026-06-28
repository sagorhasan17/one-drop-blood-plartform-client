const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:8000";

export const serverMutation = async (
  path,
  data,
  method = "POST",
  token = null,
) => {
  const res = await fetch(`${baseUrl}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token && {
        Authorization: `Bearer ${token}`,
      }),
    },
    body: JSON.stringify(data),
  });

  const result = await res.json();

  if (!res.ok) {
    throw new Error(result?.message || `Request failed: ${res.status}`);
  }

  return result;
};

// export const protectedFetch = async () => {
//   const res = await fetch(`${baseUrl}/api/auth/session`);
//   const result = await res.json();
//   if (!res.ok) {
//     throw new Error(result?.message || `Request failed: ${res.status}`);
//   }

//   return result;
// };
