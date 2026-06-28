"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const RequestFilter = ({ filters }) => {
  const [selection, setSelection] = useState(filters?.status || "all");
  const route = useRouter();

  useEffect(() => {
    const sp = new URLSearchParams(window.location.search);

    if (selection === "all") {
      sp.delete("status");
    } else {
      sp.set("status", selection);
    }

    route.push(`?${sp.toString()}`);
  }, [route, selection]);

  return (
    <div className="flex items-center gap-5">
      <select
        name="selection"
        onChange={(e) => setSelection(e.target.value)}
        required
        className="h-14 w-full bg-black/40 text-white rounded-xl border border-default-200 px-4 outline-none cursor-pointer"
      >
        <option value="all">All Requests</option>
        <option value="done">Done</option>
        <option value="inprogress">In Progress</option>
        <option value="cancel">Cancelled</option>
      </select>
    </div>
  );
};

export default RequestFilter;
