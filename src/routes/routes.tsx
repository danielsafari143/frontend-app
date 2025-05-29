import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../features/dashboard/Dashboard";
import Settings from "../features/settings/Settings";
import AccountantCopilot from "../features/accountant-copilot/AccountantCopilot";
import SubscriptionPlans from "../features/subscription/SubscriptionPlans";
import UserManagement from "../features/user-management/UserManagement";
import UserDetails from "../features/user-management/UserDetails";
import PurchaseOrders from "../features/purchase/PurchaseOrders";
import PurchaseOrderDetails from "../features/purchase/PurchaseOrderDetails";
import Sales from "../features/sales/Sales";
import CRM from "../features/crm/CRM";
import Accounting from "../features/accounting/Accounting";
import HRDashboard from "../features/hr/pages/HRDashboard";
import EmployeeList from "../features/hr/pages/EmployeeList";
import LeaveManagement from "../features/hr/pages/LeaveManagement";
import Login from "../features/auth/Login";
import NewUser from "../features/auth/NewUser";
import PrintQuotation from "../features/sales/pages/quotations/PrintQuotation";
import ChartOfAccountsConfig from "../features/accounting/pages/ChartOfAccountsConfig";
import NotFound from "../features/error/NotFound";
import Quotations from "../features/sales/pages/quotations/Quotations";
import QuotationsList from "../features/sales/pages/quotations/QuotationsList";
import QuotationDetails from "../features/sales/pages/quotations/QuotationDetails";
import PermissionsAndRoles from "../features/settings/pages/PermissionsAndRoles";
import MyBusiness from "../features/settings/pages/MyBusiness";
import Layout from "../layout/Layout";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "quotations",
        element: <Quotations />
      },
      {
        path: "quotations/:id",
        element: <QuotationDetails />
      },
      {
        path: "settings",
        element: <Settings />,
      },
      {
        path: "accountant-copilot",
        element: <AccountantCopilot />,
      },
      {
        path: "subscription",
        element: <SubscriptionPlans />,
      },
      {
        path: "company/settings",
        element:<MyBusiness/>
      },
      {
        path: "company/users",  
        element:<PermissionsAndRoles/>
      },
      {
        path: "user-management",
        element: <UserManagement />,
      },
      {
        path: "user-management/:id",
        element: <UserDetails />,
      },
      {
        path: "buy",
        element: <PurchaseOrders />,
      },
      {
        path: "buy/:id",
        element: <PurchaseOrderDetails />,
      },
      {
        path: "sales",
        element: <Sales />,
      },
      {
        path: "crm",
        element: <CRM />,
      },
      {
        path: "accounting",
        element: <Accounting />,
      },
      {
        path: "accounting/chart-of-accounts",
        element: <ChartOfAccountsConfig />,
      },
      {
        path: "hr",
        element: <HRDashboard />,
      },
      {
        path: "hr/employees",
        element: <EmployeeList />,
      },
      {
        path: "hr/leaves",
        element: <LeaveManagement />,
      },
      {
        path: "quotations/:id/print",
        element: <PrintQuotation />,
      },
    ],
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "new-user",
    element: <NewUser />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
