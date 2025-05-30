import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../features/dashboard/Dashboard";
import Settings from "../features/settings/Settings";
import AccountantCopilot from "../features/accountant-copilot/AccountantCopilot";
import SubscriptionPlans from "../features/subscription/SubscriptionPlans";
import UserManagement from "../features/user-management/UserManagement";
import UserDetails from "../features/user-management/UserDetails";
import Purchase from "../features/purchase/Purchase";
import PurchaseOrders from "../features/purchase/PurchaseOrders";
import PurchaseOrderDetails from "../features/purchase/PurchaseOrderDetails";
import PurchaseDashboard from "../features/purchase/PurchaseDashboard";
import Sales from "../features/sales/Sales";
import CRM from "../features/crm/CRM";
import Tasks from "../features/crm/pages/Tasks";
import TasksDashboard from "../features/crm/pages/TasksDashboard";
import CRMDashboard from "../features/crm/pages/Dashboard";
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
import WorkflowConfig from "../features/settings/pages/WorkflowConfig";
import NewWorkflow from "../features/settings/pages/NewWorkflow";
import Layout from "../layout/Layout";
import SalesDashboard from '../features/sales/pages/Dashboard';
import Inventory from '../features/inventory/Inventory';
import InventoryDashboard from "../features/inventory/pages/InventoryDashboard";
import Invoices from '../features/invoices/Invoices';
import InvoicesDashboard from '../features/invoices/pages/Dashboard';

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
        path: "settings/workflows",
        element: <WorkflowConfig />,
      },
      {
        path: "settings/workflows/new",
        element: <NewWorkflow />,
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
      // Purchase routes
      {
        path: "buy",
        element: <Purchase />,
      },
      {
        path: "buy/dashboard",
        element: <PurchaseDashboard />,
      },
      {
        path: "buy/orders",
        element: <PurchaseOrders />,
      },
      {
        path: "buy/orders/:id",
        element: <PurchaseOrderDetails />,
      },
      {
        path: "buy/suppliers",
        element: <PurchaseOrders />, // TODO: Create Suppliers component
      },
      {
        path: "buy/receptions",
        element: <PurchaseOrders />, // TODO: Create Receptions component
      },
      {
        path: "buy/invoices",
        element: <PurchaseOrders />, // TODO: Create Invoices component
      },
      {
        path: "buy/returns",
        element: <PurchaseOrders />, // TODO: Create Returns component
      },
      {
        path: "buy/prices",
        element: <PurchaseOrders />, // TODO: Create Prices component
      },
      // End of Purchase routes
      {
        path: "sales",
        element: <Sales />,
      },
      {
        path: "crm",
        element: <CRM />,
      },
      {
        path: "crm/dashboard",
        element: <CRMDashboard />,
      },
      {
        path: "crm/tasks",
        element: <Tasks />,
      },
      {
        path: "crm/tasks/dashboard",
        element: <TasksDashboard />,
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
      {
        path: "sales/dashboard",
        element: <SalesDashboard />,
      },
      {
        path: "inventory",
        element: <Inventory />,
      },
      {
        path: "inventory/dashboard",
        element: <InventoryDashboard/>,
      },
      {
        path: '/invoices',
        element: <Invoices />,
      },
      {
        path: '/invoices/dashboard',
        element: <InvoicesDashboard />,
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
