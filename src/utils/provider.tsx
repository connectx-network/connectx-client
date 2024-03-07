"use client";

import React from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { MantineProvider } from "@mantine/core";
import { theme } from "./theme";
import { Notifications } from "@mantine/notifications";
import { GoogleOAuthProvider } from "@react-oauth/google";

const client = new QueryClient();
function Providers({ children }: React.PropsWithChildren) {
  return (
    <QueryClientProvider client={client}>
      <MantineProvider theme={theme} defaultColorScheme="dark">
        <Notifications containerWidth={400} />
        {children}
      </MantineProvider>
    </QueryClientProvider>
  );
}

export default Providers;
