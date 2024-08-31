import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import RootLayout from "./components/RootLayout";
import Todos from "./components/Todos";
import SingleTodo from "./components/SingleTodo";
import UpdateTodo from "./components/UpdateTodo";
import NewTodo from "./components/NewTodo";

export const queryClient = new QueryClient();

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        {
          index: true,
          element: <Todos />,
        },
        {
          path: "todo",
          children: [
            {
              path: "create",
              element: <NewTodo />,
            },
            {
              path: ":id",
              children: [
                { index: true, element: <SingleTodo /> },
                {
                  path: "edit",
                  element: <UpdateTodo />,
                },
              ],
            },
          ],
        },
      ],
    },
  ]);

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
};

export default App;
