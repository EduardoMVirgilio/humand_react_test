import { createBrowserRouter, Outlet } from "react-router-dom";
import React, { lazy, Suspense } from "react";
import { FormProvider } from "./context/formContext";
import { PaginateProvider } from "./context/paginateContext";

const App = lazy(() => import("./pages/App"));
const Character = lazy(() => import("./pages/Character"));

const Layout: React.FC = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <Outlet />
  </Suspense>
);

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <FormProvider>
            <PaginateProvider>
              <App />
            </PaginateProvider>
          </FormProvider>
        ),
      },
      {
        path: ":id",
        element: <Character />,
      },
    ],
  },
]);
