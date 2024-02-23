"use client";

import React from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { MantineProvider } from "@mantine/core";
import { theme } from "./theme";

const client = new QueryClient();
function Providers({ children }: React.PropsWithChildren) {
  return (
    <QueryClientProvider client={client}>
      <MantineProvider theme={theme}>{children}</MantineProvider>
    </QueryClientProvider>
  );
}

export default Providers;
