"use client";

import { Bell, CircleUserRound } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import Image from "next/image";
import useUser from "@/providers/UserProvider";
import useGetCreatorProjectsCollaborationRequests from "@/hooks/queries/use-get-creator-projects-collaboration-requests";
import { GetCreatorProjectCollaborationRequestsResponseDto } from "@/models/collaboration-dtos";
import { ScrollArea } from "../ui/scroll-area";
import { MutedText } from "../ui/typography/muted-text";
import { cn } from "@/lib/utils";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const UserButton = () => {
  const { user } = useUser();
  const { data, isLoading, error } =
    useGetCreatorProjectsCollaborationRequests();

  const NotificationAreaMobile = ({
    notifications,
  }: {
    notifications: GetCreatorProjectCollaborationRequestsResponseDto[];
  }) => {
    function getTotalNotificationsLength() {
      let total = 0;
      notifications.forEach((notification) => {
        total += notification.numberOfRequests;
      });
      return total;
    }

    const noNewNotifications = notifications.every(
      (notification) => notification.numberOfRequests === 0
    );

    return (
      <Drawer>
        <DrawerTrigger className="mr-1 flex lg:hidden">
          <span
            className={cn(
              "h-5 w-5 rounded-full flex items-center justify-center relative",
              !noNewNotifications && "bg-red-500 text-primary-foreground"
            )}
          >
            <Bell size={12} />
            <span
              className={cn(
                "absolute top-0 right-0 h-4 w-4 text-xs rounded-full flex items-center justify-center translate-x-1 -translate-y-1",
                noNewNotifications
                  ? "hidden"
                  : "bg-primary text-primary-foreground"
              )}
            >
              {`${getTotalNotificationsLength()}`}
            </span>
          </span>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Join Requests</DrawerTitle>
            <DrawerDescription>
              View join request for projects that you created.
            </DrawerDescription>
          </DrawerHeader>

          {/* Content */}
          <ScrollArea className="w-full max-h-56 px-4">
            <div className="w-full flex flex-col space-y-2 py-1">
              {notifications.map((notification) => {
                if (notification.numberOfRequests > 0) {
                  return (
                    <Link
                      href={`projects/${notification.projectId}`}
                      key={notification.projectId}
                      className="w-full"
                    >
                      <Button
                        asChild
                        variant={"outline"}
                        size={"sm"}
                        className="w-full flex flex-row items-center justify-start min-h-fit"
                      >
                        <div className="flex flex-row items-center justify-start space-x-1 py-2">
                          <span className="h-5 w-5 bg-red-500 text-primary-foreground rounded-full flex items-center justify-center">
                            {notification.numberOfRequests}
                          </span>
                          <span className="text-base font-normal">
                            {notification.projectName}
                          </span>
                        </div>
                      </Button>
                    </Link>
                  );
                }
              })}
              {noNewNotifications && <MutedText>No new requests</MutedText>}
            </div>
          </ScrollArea>

          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  };

  const NotificationAreaDesktop = ({
    notifications,
  }: {
    notifications: GetCreatorProjectCollaborationRequestsResponseDto[];
  }) => {
    function getTotalNotificationsLength() {
      let total = 0;
      notifications.forEach((notification) => {
        total += notification.numberOfRequests;
      });
      return total;
    }

    const noNewNotifications = notifications.every(
      (notification) => notification.numberOfRequests === 0
    );

    return (
      <Sheet>
        <SheetTrigger className="hover:cursor-pointer hidden lg:flex">
          <span
            className={cn(
              "h-6 w-6 rounded-full flex items-center justify-center relative",
              !noNewNotifications && "bg-red-500 text-primary-foreground"
            )}
          >
            <Bell size={16} />
            <span
              className={cn(
                "absolute top-0 right-0 h-4 w-4 text-xs rounded-full flex items-center justify-center translate-x-1 -translate-y-1",
                noNewNotifications
                  ? "hidden"
                  : "bg-primary text-primary-foreground"
              )}
            >
              {`${getTotalNotificationsLength()}`}
            </span>
          </span>
        </SheetTrigger>
        <SheetContent className="w-full">
          <SheetHeader>
            <SheetTitle>Join Requests</SheetTitle>
            <SheetDescription>
              <MutedText>
                View join request for projects that you created
              </MutedText>
            </SheetDescription>
          </SheetHeader>

          {/* Content */}
          <ScrollArea className="w-full max-h-72 px-4 pt-4">
            <div className="w-full flex flex-col space-y-2 py-1">
              {notifications.map((notification) => {
                if (notification.numberOfRequests > 0) {
                  return (
                    <Link
                      href={`projects/${notification.projectId}`}
                      key={notification.projectId}
                      className="w-full"
                    >
                      <Button
                        asChild
                        variant={"outline"}
                        size={"sm"}
                        className="w-full flex flex-row items-center justify-start min-h-fit"
                      >
                        <div className="w-full flex flex-row items-center justify-start space-x-1 py-2">
                          <span className="h-5 w-5 bg-red-500 text-primary-foreground rounded-full flex items-center justify-center">
                            {notification.numberOfRequests}
                          </span>
                          <span className="w-full text-base font-normal">
                            {notification.projectName}
                          </span>
                        </div>
                      </Button>
                    </Link>
                  );
                }
              })}
              {noNewNotifications && <MutedText>No new requests</MutedText>}
            </div>
          </ScrollArea>
        </SheetContent>
      </Sheet>
    );
  };

  return (
    <div className="flex flex-row items-center justify-center space-x-1 lg:space-x-4 mr-2">
      {user?.id && !isLoading && !error && data && (
        <NotificationAreaMobile notifications={data} />
      )}
      {user?.id && !isLoading && !error && data && (
        <NotificationAreaDesktop notifications={data} />
      )}

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
