"use client";

import getQueryClient from "@/utils/query-client";
import { QueryClientProvider } from "@tanstack/react-query";
// import { persistQueryClient,  } from "@tanstack/react-query-persist-client";
// import { createWebStoragePersistor } from "@tanstack/react-query-persist-client"

export default function QueryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = getQueryClient();
  // const localStoragePersistor = createWebStoragePersistor({
  //   storage: window.localStorage,
  // });

  // persistQueryClient({
  //   queryClient,
  //   persister: localStoragePersistor,
  // });

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
