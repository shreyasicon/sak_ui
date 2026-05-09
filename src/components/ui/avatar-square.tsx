"use client";

import React from "react";

interface AvatarWithBadgeProps {
  src: string;
  alt: string;
  badgeCount?: number;
  badgeColor?: string;
  shape?: "square" | "circle";
  size?: string;
}

function AvatarWithBadge({
  src,
  alt,
  badgeCount,
  badgeColor = "bg-blue-500",
  shape = "square",
  size = "h-20 w-20",
}: AvatarWithBadgeProps) {
  return (
    <div className="relative">
      <img
        className={`${size} ${shape === "circle" ? "rounded-full" : "rounded"} object-cover`}
        src={src}
        alt={alt}
      />
      {badgeCount !== undefined && (
        <div className={`absolute -top-2 -right-1 flex h-5 w-5 items-center justify-center rounded-full ${badgeColor}`}>
          <p className="text-xs text-white">{badgeCount}</p>
        </div>
      )}
    </div>
  );
}

interface StatusAvatarProps {
  src: string;
  alt: string;
  status?: "online" | "offline" | "away";
  size?: string;
}

function StatusAvatar({ src, alt, status = "online", size = "h-20 w-20" }: StatusAvatarProps) {
  const statusColor = {
    online: "bg-green-500",
    offline: "bg-red-500",
    away: "bg-yellow-500",
  }[status];

  return (
    <div className="relative">
      <img
        className={`${size} rounded-full object-cover`}
        src={src}
        alt={alt}
      />
      <div className={`absolute bottom-2 right-0 h-3.5 w-3.5 rounded-full ${statusColor}`} />
    </div>
  );
}

function AvatarSquareDemo() {
  return (
    <div className="flex flex-wrap justify-center gap-12">
      <AvatarWithBadge
        src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200"
        alt="User 1"
        badgeCount={9}
        badgeColor="bg-blue-500"
        shape="square"
      />
      <AvatarWithBadge
        src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200"
        alt="User 2"
        badgeCount={9}
        badgeColor="bg-red-500"
        shape="square"
      />
      <AvatarWithBadge
        src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&h=200&auto=format&fit=crop"
        alt="User 3"
        badgeCount={9}
        badgeColor="bg-yellow-500"
        shape="square"
      />
    </div>
  );
}

function StatusAvatarDemo() {
  return (
    <div className="flex flex-wrap justify-center gap-12">
      <StatusAvatar
        src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200"
        alt="User 1"
        status="online"
      />
      <StatusAvatar
        src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200"
        alt="User 2"
        status="offline"
      />
      <StatusAvatar
        src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&h=200&auto=format&fit=crop"
        alt="User 3"
        status="away"
      />
    </div>
  );
}

export { AvatarWithBadge, StatusAvatar, AvatarSquareDemo, StatusAvatarDemo };
