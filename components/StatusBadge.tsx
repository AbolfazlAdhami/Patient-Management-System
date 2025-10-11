import React from "react";
import Image from "next/image";
import clsx from "clsx";

import { Status } from "@/types";
import { StatusIcon } from "@/constant";

const statusClasses: Record<Status, string> = {
  scheduled: "bg-green-600",
  pending: "bg-blue-600",
  cancelled: "bg-red-600",
};

const statusTextColors: Record<Status, string> = {
  scheduled: "text-green-500",
  pending: "text-blue-500",
  cancelled: "text-red-500",
};

export const StatusBadge = ({ status }: { status: Status }) => {
  return (
    <div className={clsx("status-badge", statusClasses[status])}>
      <Image src={StatusIcon[status]} alt="doctor" width={24} height={24} className="h-fit w-3" />
      <p className={clsx("text-12-semibold capitalize", statusTextColors[status])}>{status}</p>
    </div>
  );
};
