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
import NewEmployee from "../features/hr/pages/NewEmployee";
import EditEmployee from "../features/hr/pages/EditEmployee";
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
import ChartOfAccounts from '../features/accounting/pages/ChartOfAccounts';
import JournalEntries from '../features/accounting/pages/JournalEntries';
import FinancialStatements from '../features/accounting/pages/FinancialStatements';
import GeneralLedger from '../features/accounting/pages/GeneralLedger';
import AccountsPayable from '../features/accounting/pages/AccountsPayable';
import AccountsReceivable from '../features/accounting/pages/AccountsReceivable';
import CashBank from '../features/accounting/pages/CashBank';
import FixedAssets from '../features/accounting/pages/FixedAssets';
import AnalyticalAccounting from '../features/accounting/pages/AnalyticalAccounting';
import Budgeting from '../features/accounting/pages/Budgeting';
import Tax from '../features/accounting/pages/Tax';
import Payroll from "../features/accounting/pages/Payroll";
import Documents from '../features/accounting/pages/Documents';
import Reports from '../features/reports/pages/Reports';
import AccountingSettings from '../features/accounting/pages/Settings';
import Customers from "../features/crm/pages/Customers";
import Suppliers from "../features/crm/pages/Suppliers";
import Contacts from "../features/crm/pages/Contacts";
import Calls from "../features/crm/pages/Calls";
import Emails from "../features/crm/pages/Emails";
import CRMDocuments from "../features/crm/pages/Documents";
import NewCall from "../features/crm/pages/NewCall";
import CallDetails from "../features/crm/pages/CallDetails";
import NewContact from "../features/crm/pages/NewContact";
import ContactDetails from "../features/crm/pages/ContactDetails";
import EditContact from "../features/crm/pages/EditContact";
import NewSupplier from "../features/crm/pages/NewSupplier";
import SupplierDetails from "../features/crm/pages/SupplierDetails";
import EditSupplier from "../features/crm/pages/EditSupplier";
import NewEmail from '../features/crm/pages/NewEmail';
import EmailDetails from '../features/crm/pages/EmailDetails';
import NewDocument from '../features/crm/pages/NewDocument';
import DocumentDetails from '../features/crm/pages/DocumentDetails';
import NewCustomer from "../features/crm/pages/NewCustomer";
import CustomerDetails from "../features/crm/pages/CustomerDetails";
import EditCustomer from "../features/crm/pages/EditCustomer";
import DisciplinaryManagement from '../features/hr/pages/DisciplinaryManagement';
import NewDisciplinaryCase from '../features/hr/pages/NewDisciplinaryCase';
import DisciplinaryCaseDetails from '../features/hr/pages/DisciplinaryCaseDetails';
import EditDisciplinaryCase from '../features/hr/pages/EditDisciplinaryCase';
import HR from '../features/hr/pages/HR';
import TrainingManagement from '../features/hr/pages/TrainingManagement';
import NewTraining from '../features/hr/pages/NewTraining';
import TrainingDetails from '../features/hr/pages/TrainingDetails';
import EditTraining from '../features/hr/pages/EditTraining';
import EvaluationManagement from '../features/hr/pages/EvaluationManagement';
import NewEvaluation from '../features/hr/pages/NewEvaluation';
import EvaluationDetails from '../features/hr/pages/EvaluationDetails';
import EditEvaluation from '../features/hr/pages/EditEvaluation';
import Recruitment from '../features/hr/pages/Recruitment';
import NewCandidate from '../features/hr/pages/NewCandidate';
import CandidateDetails from '../features/hr/pages/CandidateDetails';
import EditCandidate from '../features/hr/pages/EditCandidate';
import HRPayroll from '../features/hr/pages/Payroll';
import NewPayroll from '../features/hr/pages/NewPayroll';
import PayrollDetails from '../features/hr/pages/PayrollDetails';
import EditPayroll from '../features/hr/pages/EditPayroll';
import Scheduling from '../features/hr/pages/Scheduling';
import NewScheduling from '../features/hr/pages/NewScheduling';
import SchedulingDetails from '../features/hr/pages/SchedulingDetails';
import EditScheduling from '../features/hr/pages/EditScheduling';
import FinanceDashboard from "../features/finance/pages/FinanceDashboard";
import Treasury from "../features/finance/pages/Treasury";
import CashFlow from "../features/finance/pages/CashFlow";
import BankRelations from '../features/finance/pages/bank-relations/BankRelations';
import BankDetails from '../features/finance/pages/bank-relations/BankDetails';
import BankDocuments from '../features/finance/pages/bank-relations/BankDocuments';
import BankDocumentDetails from '../features/finance/pages/bank-relations/DocumentDetails';
import BankContactDetails from '../features/finance/pages/bank-relations/BankContactDetails';
import NewBank from '../features/finance/pages/bank-relations/NewBank';
import NewAccount from '../features/finance/pages/bank-relations/NewAccount';
import Forex from '../features/finance/pages/forex/Forex';
import NewForexTransaction from '../features/finance/pages/forex/NewForexTransaction';
import ForexTransactionDetails from '../features/finance/pages/forex/ForexTransactionDetails';
import EditForexTransaction from '../features/finance/pages/forex/EditForexTransaction';
import Loans from '../features/finance/pages/loans/Loans';
import NewLoan from '../features/finance/pages/loans/NewLoan';
import LoanDetails from '../features/finance/pages/loans/LoanDetails';
import EditLoan from '../features/finance/pages/loans/EditLoan';
import TreasuryReport from '../features/finance/pages/reports/TreasuryReport';
import ExpensesReport from '../features/finance/pages/reports/ExpensesReport';
import FinancialReport from "../features/reports/pages/FinancialReport";
import NewReport from "../features/reports/pages/NewReport";
import InventoryReport from '../features/reports/pages/InventoryReport';
import SalesReport from '../features/reports/pages/SalesReport';
import HRReport from '../features/reports/pages/HRReport';
import CRMReport from '../features/reports/pages/CRMReport';
import ProductionReport from '../features/reports/pages/ProductionReport';
import Export from "../features/export/pages/Export";
import AccountingExport from "../features/export/pages/AccountingExport";
import CustomersExport from "../features/export/pages/CustomersExport";
import ProductsExport from '../features/export/pages/ProductsExport';
import HRExport from '../features/export/pages/HRExport';
import SubscriptionManagement from '../features/subscription/pages/SubscriptionManagement';
import BillingManagement from '../features/subscription/pages/BillingManagement';
import SubscriptionUserManagement from '../features/subscription/pages/UserManagement';
import SubscriptionHistory from '../features/subscription/pages/SubscriptionHistory';
import SubscriptionSettings from '../features/subscription/pages/SubscriptionSettings';
import PlanComparison from '../features/subscription/pages/PlanComparison';
import PaymentManagement from "../features/subscription/pages/PaymentManagement";
import NewSubscription from "../features/subscription/pages/NewSubscription";
import FiscalitesDashboard from "../features/fiscalites/pages/Dashboard";
import TaxDeclaration from "../features/fiscalites/pages/TaxDeclaration";
import TaxPayments from "../features/fiscalites/pages/TaxPayments";
import TaxCalendar from "../features/fiscalites/pages/TaxCalendar";
import TaxReports from "../features/fiscalites/pages/TaxReports";
import TaxSettings from "../features/fiscalites/pages/TaxSettings";
import NewDeclaration from "../features/fiscalites/pages/NewDeclaration";
import DeclarationDetails from "../features/fiscalites/pages/DeclarationDetails";
import NewPayment from "../features/fiscalites/pages/NewPayment";
import PaymentDetails from "../features/fiscalites/pages/PaymentDetails";
import TaxReminders from "../features/fiscalites/pages/TaxReminders";
import TaxCompliance from "../features/fiscalites/pages/TaxCompliance";
import ForgotPassword from "../features/auth/pages/ForgotPassword";

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
        path: "subscription/plans",
        element: <NewSubscription />,
      },
      {
        path: "subscription",
        element: <SubscriptionManagement />,
      },
      {
        path: "subscription/billing",
        element: <PaymentManagement />,
      },
      {
        path: "subscription/users",
        element: <SubscriptionUserManagement />,
      },
      {
        path: "subscription/history",
        element: <SubscriptionHistory />,
      },
      {
        path: "subscription/settings",
        element: <SubscriptionSettings />,
      },
      {
        path: "subscription/new",
        element: <NewSubscription />,
      },
      {
        path: "subscription/comparison",
        element: <PlanComparison />,
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
        path: "crm/customers",
        element: <Customers />,
      },
      {
        path: "crm/customers/new",
        element: <NewCustomer />,
      },
      {
        path: "crm/customers/:id",
        element: <CustomerDetails />,
      },
      {
        path: "crm/customers/:id/edit",
        element: <EditCustomer />,
      },
      {
        path: "crm/suppliers",
        element: <Suppliers />,
      },
      {
        path: "crm/suppliers/new",
        element: <NewSupplier />,
      },
      {
        path: "crm/suppliers/:id",
        element: <SupplierDetails />,
      },
      {
        path: "crm/suppliers/:id/edit",
        element: <EditSupplier />,
      },
      {
        path: "crm/contacts",
        element: <Contacts />,
      },
      {
        path: "crm/contacts/new",
        element: <NewContact />,
      },
      {
        path: "crm/contacts/:id",
        element: <ContactDetails />,
      },
      {
        path: "crm/contacts/:id/edit",
        element: <EditContact />,
      },
      {
        path: "crm/calls",
        element: <Calls />,
      },
      {
        path: "crm/calls/new",
        element: <NewCall />,
      },
      {
        path: "crm/calls/:id",
        element: <CallDetails />,
      },
      {
        path: "crm/emails",
        element: <Emails />,
      },
      {
        path: "crm/emails/new",
        element: <NewEmail />,
      },
      {
        path: "crm/emails/:id",
        element: <EmailDetails />,
      },
      {
        path: "crm/emails/:id/reply",
        element: <NewEmail />,
      },
      {
        path: "crm/emails/:id/forward",
        element: <NewEmail />,
      },
      {
        path: "crm/documents",
        element: <CRMDocuments />,
      },
      {
        path: "crm/documents/new",
        element: <NewDocument />,
      },
      {
        path: "crm/documents/:id",
        element: <DocumentDetails />,
      },
      {
        path: "crm/documents/:id/edit",
        element: <NewDocument />,
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
        element: <ChartOfAccounts />,
      },
      {
        path: "accounting/journal-entries",
        element: <JournalEntries />,
      },
      {
        path: "accounting/financial-statements",
        element: <FinancialStatements />,
      },
      {
        path: "accounting/general-ledger",
        element: <GeneralLedger />,
      },
      {
        path: "accounting/accounts-payable",
        element: <AccountsPayable />,
      },
      {
        path: "accounting/accounts-receivable",
        element: <AccountsReceivable />,
      },
      {
        path: "accounting/cash-bank",
        element: <CashBank />,
      },
      {
        path: "accounting/fixed-assets",
        element: <FixedAssets />,
      },
      {
        path: "accounting/analytical",
        element: <AnalyticalAccounting />,
      },
      {
        path: "accounting/budgeting",
        element: <Budgeting />,
      },
      {
        path: "accounting/tax",
        element: <Tax />,
      },
      {
        path: "accounting/payroll",
        element: <Payroll />,
      },
      {
        path: "accounting/documents",
        element: <Documents />,
      },
      {
        path: "accounting/reports",
        element: <Reports />,
      },
      {
        path: "accounting/settings",
        element: <AccountingSettings />,
      },
      {
        path: "hr",
        element: <HR />,
      },
      {
        path: "hr/employees",
        element: <EmployeeList />,
      },
      {
        path: "hr/employees/new",
        element: <NewEmployee />,
      },
      {
        path: "hr/employees/:id/edit",
        element: <EditEmployee />,
      },
      {
        path: "hr/leaves",
        element: <LeaveManagement />,
      },
      {
        path: "hr/disciplinary",
        element: <DisciplinaryManagement />,
      },
      {
        path: "hr/disciplinary/new",
        element: <NewDisciplinaryCase />,
      },
      {
        path: "hr/disciplinary/:id",
        element: <DisciplinaryCaseDetails />,
      },
      {
        path: "hr/disciplinary/:id/edit",
        element: <EditDisciplinaryCase />,
      },
      {
        path: "hr/training",
        element: <TrainingManagement />,
      },
      {
        path: "hr/training/new",
        element: <NewTraining />,
      },
      {
        path: "hr/training/:id",
        element: <TrainingDetails />,
      },
      {
        path: "hr/training/:id/edit",
        element: <EditTraining />,
      },
      {
        path: "hr/evaluation",
        element: <EvaluationManagement />,
      },
      {
        path: "hr/evaluation/new",
        element: <NewEvaluation />,
      },
      {
        path: "hr/evaluation/:id",
        element: <EvaluationDetails />,
      },
      {
        path: "hr/evaluation/:id/edit",
        element: <EditEvaluation />,
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
      {
        path: 'hr/dashboard',
        element: <HRDashboard />,
      },
      {
        path: 'hr/recruitment',
        element: <Recruitment />,
      },
      {
        path: 'hr/recruitment/new',
        element: <NewCandidate />,
      },
      {
        path: 'hr/recruitment/:id',
        element: <CandidateDetails />,
      },
      {
        path: 'hr/recruitment/:id/edit',
        element: <EditCandidate />,
      },
      {
        path: 'hr/payroll',
        element: <HRPayroll />
      },
      {
        path: 'hr/payroll/new',
        element: <NewPayroll />
      },
      {
        path: 'hr/payroll/:id',
        element: <PayrollDetails />
      },
      {
        path: 'hr/payroll/:id/edit',
        element: <EditPayroll />
      },
      {
        path: 'hr/scheduling',
        element: <Scheduling />,
      },
      {
        path: 'hr/scheduling/new',
        element: <NewScheduling />,
      },
      {
        path: 'hr/scheduling/:id',
        element: <SchedulingDetails />,
      },
      {
        path: 'hr/scheduling/:id/edit',
        element: <EditScheduling />,
      },
      {
        path: 'finance',
        children: [
          {
            path: '',
            element: <FinanceDashboard />,
          },
          {
            path: 'reports',
            element: <Reports />,
          },
          {
            path: 'reports/treasury',
            element: <TreasuryReport />,
          },
          {
            path: 'reports/expenses',
            element: <ExpensesReport />,
          },
          {
            path: 'treasury',
            element: <Treasury />,
          },
          {
            path: 'cash-flow',
            element: <CashFlow />,
          },
          {
            path: 'budgeting',
            element: <Budgeting />,
          },
          {
            path: 'analysis',
            element: <FinanceDashboard />,
          },
          {
            path: 'bank-relations',
            element: <BankRelations />,
          },
          {
            path: 'bank-relations/:id',
            element: <BankDetails />,
          },
          {
            path: 'bank-relations/:id/documents',
            element: <BankDocuments />,
          },
          {
            path: 'bank-relations/:id/documents/:documentId',
            element: <BankDocumentDetails />,
          },
          {
            path: 'bank-relations/:id/contacts/:contactId',
            element: <BankContactDetails />
          },
          {
            path: 'forex',
            element: <Forex />,
          },
          {
            path: 'forex/new',
            element: <NewForexTransaction />,
          },
          {
            path: 'forex/:id',
            element: <ForexTransactionDetails />,
          },
          {
            path: 'forex/:id/edit',
            element: <EditForexTransaction />,
          },
          {
            path: 'loans',
            element: <Loans />
          },
          {
            path: 'loans/new',
            element: <NewLoan />
          },
          {
            path: 'loans/:id',
            element: <LoanDetails />
          },
          {
            path: 'loans/:id/edit',
            element: <EditLoan />
          },
          {
            path: 'investments',
            element: <FinanceDashboard />,
          },
          {
            path: 'bank-relations/new',
            element: <NewBank />,
          },
        ],
      },
      {
        path: "reports",
        element: <Reports />,
      },
      {
        path: "reports/new",
        element: <NewReport />,
      },
      {
        path: "reports/financial",
        element: <FinancialReport />,
      },
      {
        path: 'reports/inventory',
        element: <InventoryReport />,
      },
      {
        path: '/reports/sales',
        element: <SalesReport />,
      },
      {
        path: '/reports/hr',
        element: <HRReport />,
      },
      {
        path: '/reports/crm',
        element: <CRMReport />,
      },
      {
        path: '/reports/production',
        element: <ProductionReport />,
      },
      {
        path: "export",
        element: <Export />,
      },
      {
        path: "export/accounting",
        element: <AccountingExport />,
      },
      {
        path: "export/customers",
        element: <CustomersExport />,
      },
      {
        path: '/export/products',
        element: <ProductsExport />,
      },
      {
        path: '/export/hr',
        element: <HRExport />,
      },
      {
        path: "fiscalites",
        children: [
          {
            path: "",
            element: <FiscalitesDashboard />,
          },
          {
            path: "declarations",
            element: <TaxDeclaration />,
          },
          {
            path: "declarations/new",
            element: <NewDeclaration />,
          },
          {
            path: "declarations/:id",
            element: <DeclarationDetails />,
          },
          {
            path: "paiements",
            element: <TaxPayments />,
          },
          {
            path: "paiements/new",
            element: <NewPayment />,
          },
          {
            path: "paiements/:id",
            element: <PaymentDetails />,
          },
          {
            path: "calendrier",
            element: <TaxCalendar />,
          },
          {
            path: "rapports",
            element: <TaxReports />,
          },
          {
            path: "rappels",
            element: <TaxReminders />,
          },
          {
            path: "conformite",
            element: <TaxCompliance />,
          },
          {
            path: "parametres",
            element: <TaxSettings />,
          },
        ],
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
