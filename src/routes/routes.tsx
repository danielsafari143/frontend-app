import React from 'react';
import { createBrowserRouter } from "react-router";
import Dashboard from "../features/dashboard/Dashboard";
import Login from "../features/auth/Login";
import Signup from "../features/auth/Signup";
import Forgotpassword from "../features/auth/Forgotpassword";
import NotFound from "../pages/NotFound";
import Settings from "../features/settings/Settings";
import Sales from "../features/sales/Sales";
import Buy from "../features/buy/Buy";
import SalesDashboard from "../features/sales/pages/SalesDashboard";
import BuyDashboard from "../features/buy/pages/BuyDashboard";
import Quotations from "../features/sales/pages/quotations/Quotations";
import QuotationsList from "../features/sales/pages/quotations/QuotationsList";
import NewQuotation from "../features/sales/components/NewQuotation";
import QuotationDetails from "../features/sales/pages/quotations/QuotationDetails";
import PurchaseOrders from "../features/buy/pages/purchase-orders/PurchaseOrders";
import NewPurchaseOrder from "../features/buy/components/NewPurchaseOrder";
import PurchaseOrderDetails from "../features/buy/pages/purchase-orders/PurchaseOrderDetails";
import PrintQuotation from '../features/sales/pages/quotations/PrintQuotation';

const routes = createBrowserRouter([
  {
    path: "/",
    Component: Dashboard,
    children: [
      {
        path: "settings",
        Component: Settings,
      },
      {
        path: "quotations/create",
        Component: NewQuotation,
      },
      {
        path: "quotations",
        Component: QuotationsList,
      },
      {
        path: "quotations/:id",
        Component: QuotationDetails,
      },
      {
        path: "quotations/:id/print",
        Component: PrintQuotation,
      },
      {
        path: "sales",
        Component: Sales,
        children: [
          // Quotations routes
        ],
      },
      {
        path: "buy",
        Component: Buy,
        children: [
          {
            index: true,
            Component: BuyDashboard,
          },
          // Purchase Orders routes
          {
            path: "purchase-orders",
            children: [
              {
                index: true,
                Component: PurchaseOrders,
              },
              {
                path: "create",
                Component: NewPurchaseOrder,
              },
              {
                path: ":id",
                Component: PurchaseOrderDetails,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: "auth",
    Component: Login,
    children: [
      {
        index: true,
        Component: Login,
      },
      {
        path: "login",
        Component: Login,
      },
      {
        path: "signup",
        Component: Signup,
      },
      {
        path: "forgot-password",
        Component: Forgotpassword,
      },
    ],
  },
  {
    path: "*",
    Component: NotFound,
  },
]);

export default routes;
