import React from "react";
import Image from "next/image";
import clsx from "clsx";

type StatCardProps = {
  type: "appointments" | "pending" | "cancelled";
  count: number;
  label: string;
  icon: string;
};

export const StatCard = ({ count = 0, type, label, icon }: StatCardProps) => {
  const cardStyle = {
    cancelled: "bg-cancelled",
    pending: "bg-pending",
    appointments: "bg-appointments",
  };

  return (
    <div className={clsx("stat-card", cardStyle[type])}>
      <div className="flex items-center gap-4">
        <Image src={icon} height={32} width={32} alt="appointments" className="size-8 w-fit" />
        <h2 className="text-32-bold text-white">{count}</h2>
      </div>
      <p className="text-14-regular">{label}</p>
    </div>
  );
};
