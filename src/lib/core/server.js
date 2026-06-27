const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:8000";

export const serverMutation = async (path, data, method = "POST") => {
  const res = await fetch(`${baseUrl}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const result = await res.json();
  if (!res.ok) {
    throw new Error(result?.message || `Request failed: ${res.status}`);
  }

  return result;
};

// export const authHeaders = async () => {
//   const session = await getSession();
//   if (!session) {
//     return {};
//   }
//   const token = session?.token;
//   return {
//     "Content-Type": "application/json",
//     Authorization: `Bearer ${token}`,
//   };
// };
// console.log(authHeaders());

export const protectedFetch = async () => {
  const res = await fetch(`${baseUrl}/api/auth/session`);
  const result = await res.json();
  if (!res.ok) {
    throw new Error(result?.message || `Request failed: ${res.status}`);
  }

  return result;
};
