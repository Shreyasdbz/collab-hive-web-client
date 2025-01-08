"use client";

import { Button } from "../ui/button";
import Link from "next/link";
import Image from "next/image";
import useUser from "@/providers/UserProvider";

import NotificationArea from "./notification-area.client";
import { CircleUserRound } from "lucide-react";

const UserButton = () => {
  const { user } = useUser();

  return (
    <div className="flex flex-row items-center justify-center space-x-1 lg:space-x-4 mr-2">
      {user?.id && <NotificationArea userId={user.id} />}

      <Link href="/profile" className="mr-2 lg:mr-0">
        <Button variant={"ghost"} size={"icon"} className="rounded-full">
          {user ? (
            <>
              {user.user_metadata.avatar_url?.length > 0 ? (
                <>
                  <Image
                    src={user.user_metadata.avatar_url}
                    alt="User profile image"
                    width={20}
                    height={20}
                    className="rounded-full ring ring-accent lg:hidden"
                  />
                  <Image
                    src={user.user_metadata.avatar_url}
                    alt="User profile image"
                    width={24}
                    height={24}
                    className="rounded-full ring ring-accent hidden lg:block"
                  />
                </>
              ) : (
                <CircleUserRound
                  size={10}
                  className="rounded-full h-10 w-10 bg-primary text-primary-foreground ring ring-accent"
                />
              )}
            </>
          ) : (
            <CircleUserRound size={10} className="rounded-full h-10 w-10" />
          )}
        </Button>
      </Link>
    </div>
  );
};

export default UserButton;
