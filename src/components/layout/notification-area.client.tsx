import useGetCreatorProjectsCollaborationRequests from "@/hooks/queries/use-get-creator-projects-collaboration-requests";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";
import { cn } from "@/lib/utils";
import { Bell } from "lucide-react";
import { ScrollArea } from "../ui/scroll-area";
import Link from "next/link";
import { Button } from "../ui/button";
import { GetCreatorProjectCollaborationRequestsResponseDto } from "@/models/collaboration-dtos";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { MutedText } from "../ui/typography/muted-text";

export const NotificationArea = ({ userId }: { userId: string }) => {
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
        <SheetTrigger asChild className="hover:cursor-pointer hidden lg:flex">
          <Button
            variant={"ghost"}
            size={"icon"}
            className="rounded-full group"
          >
            <span
              className={cn(
                "h-6 w-6 rounded-full flex items-center justify-center relative",
                !noNewNotifications &&
                  "group-hover:bg-red-500 group-hover:text-primary-foreground transition-colors"
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
          </Button>
        </SheetTrigger>
        <SheetContent className="w-full pr-4">
          <SheetHeader>
            <SheetTitle>Join Requests</SheetTitle>
            <SheetDescription>
              <MutedText>
                View join request for projects that you created
              </MutedText>
            </SheetDescription>
          </SheetHeader>

          {/* Content */}
          <ScrollArea className="w-full border py-2 px-1 rounded-lg">
            <div className="w-full flex flex-col space-y-2 max-h-96 min-h-56">
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
                        className="w-full flex flex-row items-center justify-start min-h-fit rounded-lg"
                      >
                        <div className="w-full flex flex-row items-center justify-start space-x-1 py-2">
                          <span className="h-5 w-5 bg-red-500 text-primary-foreground rounded-full flex items-center justify-center">
                            {notification.numberOfRequests}
                          </span>
                          <span className="w-full text-base font-normal">
                            {notification.projectName.length > 35
                              ? `${notification.projectName.substring(
                                  0,
                                  35
                                )}...`
                              : notification.projectName}
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

  if (!data) {
    return <></>;
  }

  return (
    <div>
      {userId && !isLoading && !error && data && (
        <NotificationAreaMobile notifications={data} />
      )}
      {userId && !isLoading && !error && data && (
        <NotificationAreaDesktop notifications={data} />
      )}
    </div>
  );
};

export default NotificationArea;
