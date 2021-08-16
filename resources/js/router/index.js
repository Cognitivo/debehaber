
import CreditForm from "../views/commercials/creditForm.json";
import DebitForm from "../views/commercials/debitForm.json";
import SalesForm from "../views/commercials/salesForm.json";
import SalesView from "../views/commercials/salesView.json";
import ReceivableForm from "../views/commercials/receivableForm.json";
import PayableForm from "../views/commercials/payableForm.json";
import PurchaseForm from "../views/commercials/purchaseForm.json";
import InventoryForm from "../views/commercials/inventoryForm.json";
import FixedAssetForm from "../views/commercials/fixedAssetForm.json";
import ImpexForm from "../views/commercials/impexForm.json";

import CycleForm from "../views/configs/cycleForm.json";
import DocumentForm from "../views/configs/documentForm.json";
import RateForm from "../views/configs/rateForm.json";
import MoneyTransfer from "../views/commercials/moneyTransfer.json";
import MoneyPayment from "../views/commercials/moneyPayment.json";
import JournalForm from "../views/accounts/journalForm.json";
import JournalTemplateForm from "../views/accounts/templateForm.json";
import openingBalanceForm from "../views/accounts/openingBalanceForm.json";
import closingBalanceForm from "../views/accounts/closingBalanceForm.json";
import budgetForm from "../views/accounts/budgetForm.json";

import FourZeroFour from "../views/404";
import FourZeroOne from "../views/401";

import DashBoard from "../views/Index";
import SearchResult from "../views/searchResult";
import Form from "../views/form";
import View from "../views/view";
import FormList from "../views/formList";
import List from "../views/list";
import ChartList from "../views/accounts/chartList";
import Import from "../views/import";

// Clean up
//const JournalForm = () => import("../components/journalForm");

const VersionList = () => import("../views/configs/versionList");
const VersionForm = () => import("../views/configs/versionForm");
const user = Spark;
// / Clean up

const ChartForm = () => import("../views/accounts/chartForm");

const Config = () => import("../views/configs/index");
const CommercialReports = () => import("../views/commercials/reports");
const AccountingReports = () => import("../views/accounts/reports");

export default [
    //This will cause 404 Errors to be redirected to proper site.
    {
        path: "/404",
        component: FourZeroFour
    },
    {
        path: "/401",
        component: FourZeroOne
    },
    {
        path: "/:taxPayer/:cycle/",
        component: DashBoard,
        name: "taxPayer",
        meta: {
            url: "index",
            title: "Dashboard",
            description: "Some description",
            img: "/img/apps/dashboard.svg"
        }
       
    
    },
    {
        path: "/:taxPayer/:cycle/search/q={q}",
        component: SearchResult,
        name: "searchResult",
        meta: {
            url: "search",
            title: "Search",
            description: "",
            img: "/img/apps/search.svg"
        }
    },
    {
        path: "/:taxPayer/:cycle/commercial/sales",
        component: List,
        name: "salesList",
        meta: {
            title: "commercial.salesBook",
            img: "/img/apps/sales.svg",
            components: [{
                    type: "invoices-this-month-kpi"
                },
                {
                    type: "links",
                    links: [{
                            label: "general.manual",
                            icon: "help_outline",
                            url: "/docs/:lang/transactions/sales"
                        },
                        {
                            label: "general.report",
                            icon: "insert_chart_outlined",
                            type: "lastMonth",
                            url: "/:taxPayer/:cycle/commercial/reports/sales/:startDate/:endDate"
                        }
                    ]
                }
            ],
            columns: [{
                    key: "date",
                    label: "commercial.date",
                    formatter: (value, key, item) => {
                        return new Date(item.date).toLocaleDateString();
                    },
                    sortable: true,
                    searchable: false
                },
                {
                    key: "partner_name",
                    label: "commercial.customer",
                    formatter: (value, key, item) => {
                        return item.partner_name != null ? item.partner_name.substring(0, 32) + "..." : "";
                    },
                    sortable: true,
                    searchable: true
                },
                {
                    key: "number",
                    label: "commercial.number",
                    sortable: true,
                    searchable: true
                },
                {
                    key: "total",
                    label: "general.total",
                    formatter: (value, key, item) => {
                        return new Number(
                            item.details.reduce(function (sum, row) {
                                return sum + new Number(row["value"]);
                            }, 0)
                        ).toLocaleString();
                    },
                    sortable: true,
                    searchable: false
                },
                {
                    key: "actions",
                    label: "",
                    sortable: false,
                    searchable: false
                }
            ]
        },
        children: [{
                name: "salesForm",
                path: "f/:id",
                component: Form,
                meta: SalesForm,

                label: "general.create",
                url: "sales/f/0",
                icon: "add",
                variant: "dark"
            },
            {
                name: "salesView",
                path: "v/:id",
                url: "sales/v/0",
                component: View,
                meta: SalesView,

               
            },
            {
                name: "salesUpload",
                path: "upload",
                component: Import,
                meta: {
                    title: "commercial.salesInvoice"
                },

                label: "general.upload",
                url: "sales/upload",
                icon: "cloud_upload",
                variant: "dark"
            }
        ]     
        
    },
    {
        path: "/:taxPayer/:cycle/commercial/credit-notes",
        component: List,
        name: "creditList",
        meta: {
            title: "commercial.creditBook",
            img: "/img/apps/credit-note.svg",
            components: [{
                    type: "invoices-this-month-kpi"
                },
                {
                    type: "links",
                    links: [{
                            label: "general.manual",
                            icon: "help_outline",
                            url: "/docs/en/transactions/credit-notes"
                        },
                        {
                            label: "general.report",
                            icon: "insert_chart_outlined",
                            url: "/:taxPayer/:cycle/commercial/reports/credit-notes/2019-03-01/2019-03-31"
                        }
                    ]
                }
            ],
            columns: [{
                    key: "date",
                    label: "commercial.date",
                    formatter: (value, key, item) => {
                        return new Date(item.date).toLocaleDateString();
                    },
                    sortable: true,
                    searchable: false
                },
                {
                    key: "partner_name",
                    label: "commercial.customer",
                    formatter: (value, key, item) => {
                        return item.partner_name != null ?
                            item.partner_name.substring(0, 15) + "..." :
                            "";
                    },
                    sortable: true,
                    searchable: true
                },
                {
                    key: "number",
                    label: "commercial.number",
                    sortable: true
                },
                {
                    key: "total",
                    label: "general.total",
                    formatter: (value, key, item) => {
                        return new Number(
                            item.details.reduce(function (sum, row) {
                                return sum + new Number(row["value"]);
                            }, 0)
                        ).toLocaleString();
                    },
                    sortable: true,
                    searchable: true
                },
                {
                    key: "actions",
                    label: "",
                    sortable: false,
                    searchable: false
                }
            ]
        },
        children: [{
                name: "creditForm",
                path: "f/:id",
                component: Form,
                meta: CreditForm,

                label: "general.create",
                url: "credit-notes/f/0",
                icon: "add",
                variant: "dark"
            },
            {
                name: "creditUpload",
                path: "upload",
                component: Import,
                meta: {
                    title: "commercial.creditNotes"
                },
                url: "credit-notes/upload",
                label: "general.upload",
                icon: "cloud_upload",
                variant: "dark"
            }
        ]
    },
    {
        path: "/:taxPayer/:cycle/commercial/purchases",
        component: List,
        name: "purchaseList",
        meta: {
            title: "commercial.purchaseBook",
            img: "/img/apps/purchase-v1.svg",
            components: [{
                    type: "invoices-this-month-kpi"
                },
                {
                    type: "links",
                    links: [{
                            label: "general.manual",
                            icon: "help_outline",
                            url: "/docs/en/transactions/purchases"
                        },
                        {
                            label: "general.report",
                            icon: "insert_chart_outlined",
                            url: "/:taxPayer/:cycle/commercial/reports/purchases/2019-03-01/2019-03-31"
                        }
                    ]
                }
            ],
            columns: [{
                    key: "date",
                    label: "commercial.date",
                    formatter: (value, key, item) => {
                        return new Date(item.date).toLocaleDateString();
                    },
                    sortable: true
                },
                {
                    key: "partner_name",
                    label: "commercial.supplier",
                    sortable: true,
                    searchable: true
                },
                {
                    key: "number",
                    label: "commercial.number",
                    sortable: true,
                    searchable: true
                },
                {
                    key: "total",
                    label: "general.total",
                    formatter: (value, key, item) => {
                        return new Number(
                            item.details.reduce(function (sum, row) {
                                return sum + new Number(row["value"]);
                            }, 0)
                        ).toLocaleString();
                    },
                    sortable: true
                },
                {
                    key: "actions",
                    label: "",
                    sortable: false
                }
            ]
        },
        children: [
            {
                name: "purchaseUpload",
                path: "upload",
                component: Import,
                meta: {
                    title: "commercial.purchaseBooks"
                },
                url: "purchases/upload",
                label: "general.upload",
                icon: "cloud_upload",
                variant: "dark"
            },
            {
                name: "purchaseForm",
                path: ":id",
                component: Form,
                meta: PurchaseForm,

                label: "general.create",
                url: "purchases/0",
                icon: "add",
                variant: "dark"
            }
        ]
    },
    {
        path: "/:taxPayer/:cycle/commercial/debit-notes",
        component: List,
        name: "debitList",
        meta: {
            title: "commercial.debitBook",
            img: "/img/apps/credit-note.svg",
            components: [{
                    type: "invoices-this-month-kpi"
                },
                {
                    type: "links",
                    links: [{
                            label: "general.manual",
                            icon: "help_outline",
                            url: "/docs/en/transactions/debit-notes"
                        },
                        {
                            label: "general.report",
                            icon: "insert_chart_outlined",
                            url: "/:taxPayer/:cycle/commercial/reports/debit-notes/2019-03-01/2019-03-31"
                        }
                    ]
                }
            ],
            columns: [{
                    key: "date",
                    label: "commercial.date",
                    formatter: (value, key, item) => {
                        return new Date(item.date).toLocaleDateString();
                    },
                    sortable: true
                },
                {
                    key: "partner_name",
                    label: "commercial.customer",
                    sortable: true
                },
                {
                    key: "number",
                    label: "commercial.number",
                    sortable: true
                },
                {
                    key: "total",
                    label: "general.total",
                    formatter: (value, key, item) => {
                        return new Number(
                            item.details.reduce(function (sum, row) {
                                return sum + new Number(row["value"]);
                            }, 0)
                        ).toLocaleString();
                    },
                    sortable: true
                },
                {
                    key: "actions",
                    label: "",
                    sortable: false
                }
            ]
        },
        children: [{
                path: ":id",
                component: Form,
                name: "debitForm",
                meta: DebitForm,

                label: "general.create",
                url: "debit-notes/0",
                icon: "add",
                variant: "dark"
            },
           
            {
                name: "debitUpload",
                path: "upload",
                component: Import,
                meta: {
                    title: "commercial.debitNotes"
                },
                url: "debit-notes/upload",
                label: "general.upload",
                icon: "cloud_upload",
                variant: "dark"
            }
        ]
    },
    {
        path: "/:taxPayer/:cycle/commercial/fixed-assets",
        component: List,
        name: "fixedAssetList",
        meta: {
            title: "commercial.fixedAssets",
            img: "/img/apps/fixed-asset.svg",
            components: [{
                    type: "invoices-this-month-kpi"
                },
                {
                    type: "links",
                    links: [{
                            label: "general.manual",
                            icon: "help_outline",
                            url: "/docs/en/transactions/fixed-assets"
                        },
                        {
                            label: "general.report",
                            icon: "insert_chart_outlined",
                            url: "/:taxPayer/:cycle/commercial/reports/fixed-assets/2019-03-01/2019-03-31"
                        }
                    ]
                }
            ],
            columns: [{
                    key: "purchase_date",
                    label: "commercial.date",
                    formatter: (value, key, item) => {
                        return new Date(
                            item.purchase_date
                        ).toLocaleDateString();
                    },
                    sortable: true
                },
                {
                    key: "serial",
                    label: "commercial.serial",
                    sortable: true
                },
                {
                    key: "name",
                    label: "commercial.name",
                    sortable: true
                },
                {
                    key: "current_value",
                    label: "commercial.value",
                    formatter: (value, key, item) => {
                        return new Number(item.current_value).toLocaleString();
                    },
                    sortable: true
                },
                {
                    key: "actions",
                    label: "",
                    sortable: false
                }
            ]
        },
        children: [{
            path: ":id",
            component: Form,
            name: "fixedAssetForm",
            meta: FixedAssetForm,

            label: "general.create",
            url: "fixed-assets/0",
            icon: "add",
            variant: "dark"
        }]
    },
    {
        path: "/:taxPayer/:cycle/commercial/money",
        component: List,
        name: "moneyMovementList",
        meta: {
            title: "commercial.moneyMovements",
            img: "/img/apps/money-flow.svg",
            components: [{
                type: "links",
                links: [{
                        label: "general.manual",
                        icon: "help_outline",
                        url: "/docs/en/transactions/sales"
                    },
                    {
                        label: "general.report",
                        icon: "insert_chart_outlined",
                        url: "/:taxPayer/:cycle/commercial/reports/sales/2019-03-01/2019-03-31"
                    }
                ]
            }],
            columns: [{
                    key: "date",
                    label: "commercial.date",
                    formatter: (value, key, item) => {
                        return new Date(item.date).toLocaleDateString();
                    },
                    sortable: true
                },
                {
                    key: "chart.name",
                    label: "accounting.chartOfAccounts",
                    searchable: true,
                    sortable: true
                },
                {
                    key: "comment",
                    label: "general.comment",
                    searchable: true,
                    sortable: true
                },
                {
                    key: "currency",
                    label: "",
                    sortable: true
                },
                {
                    key: "credit",
                    label: "general.credit",
                    formatter: (value, key, item) => {
                        return new Number(item.credit).toLocaleString();
                    },
                    searchable: true,
                    sortable: true
                },
                {
                    key: "debit",
                    label: "general.debit",
                    formatter: (value, key, item) => {
                        return new Number(item.debit).toLocaleString();
                    },
                    searchable: true,
                    sortable: true
                },
                {
                    key: "actions",
                    label: "",
                    sortable: false
                }
            ]
        },
        children: [{
                path: ":id",
                component: Form,
                name: "moneyMovementForm",
                meta: MoneyPayment,

                label: "general.create",
                url: "money/0",
                icon: "add",
                variant: "dark"
            },
            {
                path: "transfer/:id",
                component: Form,
                name: "moneyTransferForm",
                img: "/img/apps/money-transfer.svg",
                meta: MoneyTransfer,

                label: "general.transfer",
                url: "money/transfer/0",
                icon: "compare_arrows",
                variant: "dark"
            }
        ]
    },
    {
        path: "/:taxPayer/:cycle/commercial/inventories",
        component: List,
        name: "inventoryList",
        meta: {
            title: "commercial.inventories",
            img: "/img/apps/inventory.svg",
            components: [{
                    type: "invoices-this-month-kpi"
                },
                {
                    type: "links",
                    links: [{
                            label: "general.manual",
                            icon: "help_outline",
                            url: "/docs/:lang/transactions/inventory"
                        },
                        {
                            label: "general.report",
                            icon: "insert_chart_outlined",
                            url: "/:taxPayer/:cycle/commercial/reports/inventory/2019-03-01/2019-03-31"
                        }
                    ]
                }
            ],
            columns: [{
                    key: "date",
                    label: "commercial.date",
                    formatter: (value, key, item) => {
                        return new Date(item.date).toLocaleDateString();
                    },
                    sortable: true
                },
                {
                    key: "start_date",
                    label: "commercial.startDate",
                    formatter: (value, key, item) => {
                        return new Date(item.start_date).toLocaleDateString();
                    },
                    sortable: true
                },
                {
                    key: "end_date",
                    label: "commercial.endDate",
                    formatter: (value, key, item) => {
                        return new Date(item.end_date).toLocaleDateString();
                    },
                    sortable: true
                },
                {
                    key: "inventory_value",
                    label: "commercial.value",
                    sortable: true
                },
                {
                    key: "comments",
                    label: "general.comment",
                    sortable: true
                },
                {
                    key: "actions",
                    label: "",
                    sortable: false
                }
            ]
        },
        children: [{
            name: "inventoryForm",
            path: ":id",
            component: Form,
            meta: InventoryForm,

            label: "general.create",
            url: "inventories/0",
            icon: "add",
            variant: "dark"
        }]
    },
    {
        path: "/:taxPayer/:cycle/commercial/accounts-receivable",
        component: List,
        name: "receivableList",
        meta: {
            title: "commercial.accountReceivables",
            img: "/img/apps/account-receivable.svg",
            components: [{
                    type: "invoices-this-month-kpi"
                },
                {
                    type: "links",
                    links: [{
                            label: "general.manual",
                            icon: "help_outline",
                            url: "/docs/:lang/transactions/receivable"
                        },
                        {
                            label: "general.report",
                            icon: "insert_chart_outlined",
                            url: "/:taxPayer/:cycle/commercial/reports/receivable/2019-03-01/2019-03-31"
                        }
                    ]
                }
            ],
            columns: [{
                    key: "date",
                    format: "date",
                    label: "commercial.date",
                    formatter: (value, key, item) => {
                        return new Date(item.date).toLocaleDateString();
                    },
                    sortable: true
                },
                {
                    key: "partner",
                    label: "commercial.customer",
                    formatter: (value, key, item) => {
                        return item.partner_name != null ?
                            item.partner_name.substring(0, 15) + "..." :
                            "";
                    },
                    sortable: true
                },
                {
                    key: "number",
                    label: "commercial.number",
                    sortable: true
                },
                {
                    key: "credit",
                    label: "commercial.payment",
                    formatter: (value, key, item) => {
                        return new Number(item.credit).toLocaleString();
                    },
                    sortable: true
                },
                {
                    key: "balance",
                    format: "numeric",
                    label: "commercial.balance",
                    formatter: (value, key, item) => {
                        return new Number(item.balance).toLocaleString();
                    },
                    sortable: true
                },
                {
                    key: "actions",
                    label: "",
                    sortable: false
                }
            ]
        },
        children: [{
            path: ":id",
            component: Form,
            name: "receivableForm",
            meta: ReceivableForm
        }]
    },
    //Accounts Payable
    {
        path: "/:taxPayer/:cycle/commercial/accounts-payable",
        component: List,
        name: "payableList",
        meta: {
            title: "commercial.accountPayables",
            img: "/img/apps/account-payable.svg",
            components: [{
                    type: "invoices-this-month-kpi"
                },
                {
                    type: "links",
                    links: [{
                            label: "general.manual",
                            icon: "help_outline",
                            url: "/docs/:lang/payable/sales"
                        },
                        {
                            label: "general.report",
                            icon: "insert_chart_outlined",
                            url: "/:taxPayer/:cycle/commercial/reports/payable/2019-03-01/2019-03-31"
                        }
                    ]
                }
            ],
            columns: [{
                    key: "date",
                    format: "date",
                    label: "commercial.date",
                    formatter: (value, key, item) => {
                        return new Date(item.date).toLocaleDateString();
                    },
                    sortable: true
                },
                {
                    key: "partner",
                    label: "commercial.supplier",
                    formatter: (value, key, item) => {
                        return item.partner_name != null ?
                            item.partner_name.substring(0, 15) + "..." :
                            "";
                    },
                    sortable: true
                },
                {
                    key: "number",
                    label: "commercial.number",
                    sortable: true
                },
                {
                    key: "payment",
                    label: "commercial.payment",
                    formatter: (value, key, item) => {
                        return new Number(item.payment).toLocaleString();
                    },
                    sortable: true
                },
                {
                    key: "balance",
                    label: "commercial.balance",
                    formatter: (value, key, item) => {
                        return new Number(item.balance).toLocaleString();
                    },
                    sortable: true
                },
                {
                    key: "actions",
                    label: "",
                    sortable: false
                }
            ]
        },
        children: [{
            path: ":id",
            component: Form,
            name: "payableForm",
            meta: PayableForm
        }]
    },
    //Impexes
    {
        path: "/:taxPayer/:cycle/commercial/impexes",
        component: List,
        name: "impexList",
        meta: {
            title: "commercial.impex",
            img: "/img/apps/impex.svg",
            components: [{
                    type: "invoices-this-month-kpi"
                },
                {
                    type: "links",
                    links: [{
                            label: "general.manual",
                            icon: "help_outline",
                            url: "/docs/:lang/impex/sales"
                        },
                        {
                            label: "general.report",
                            icon: "insert_chart_outlined",
                            url: "/:taxPayer/:cycle/commercial/reports/impex/2019-03-01/2019-03-31"
                        }
                    ]
                }
            ],
            columns: [{
                    key: "date",
                    format: "date",
                    label: "commercial.date",
                    formatter: (value, key, item) => {
                        return new Date(item.date).toLocaleDateString();
                    },
                    sortable: true
                },
                {
                    key: "partner",
                    label: "commercial.supplier",
                    formatter: (value, key, item) => {
                        return item.partner_name != null ?
                            item.partner_name.substring(0, 15) + "..." :
                            "";
                    },
                    sortable: true
                },
                {
                    key: "code",
                    label: "commercial.code",
                    sortable: true
                },
                {
                    key: "actions",
                    label: "",
                    sortable: false
                }
            ]
        },
        children: [{
            path: ":id",
            component: Form,
            name: "impexForm",
            meta: ImpexForm,

            label: "general.create",
            url: "impexes/0",
            icon: "add",
            variant: "dark"
        }]
    },
    //Journal Templates
    {
        path: "/:taxPayer/:cycle/accounting/journal-templates",
        component: List,
        name: "journalTemplateList",
        meta: {
            title: "accounting.template",
            img: "/img/apps/journal-template.svg",
            components: [{
                    type: "invoices-this-month-kpi"
                },
                {
                    type: "links",
                    links: [{
                            label: "general.manual",
                            icon: "help_outline",
                            url: "/docs/:lang/journaltemplate/sales"
                        },
                        {
                            label: "general.report",
                            icon: "insert_chart_outlined",
                            url: "/:taxPayer/:cycle/commercial/reports/journaltemplate/2019-03-01/2019-03-31"
                        }
                    ]
                }
            ],
            columns: [{
                    key: "name",
                    sortable: true
                },
                {
                    key: "actions",
                    label: "",
                    sortable: false
                }
            ]
        },
        children: [{
            path: ":id",
            component: Form,
            name: "journalTemplateForm",
            meta: JournalTemplateForm,

            label: "general.create",
            url: "journal-templates/0",
            icon: "add",
            variant: "dark"
        }],
        beforeEnter: (to, from, next) => {
            if(user.userType == 'data-entry')
            {
              
                return next({ path: '/401'});

            }
            next();
          }
    },
    //Journals
    {
        path: "/:taxPayer/:cycle/accounting/journals",
        component: List,
        name: "journalList",
        meta: {
            details: 1,
            title: "accounting.journal",
            img: "/img/apps/journals.svg",
            components: [{
                type: "links",
                links: [{
                    label: "accounting.generateJournal",
                    icon: "refresh",
                    url: "/api/:taxPayer/:cycle/generate-journals/:startDate/:endDate",
                    type: "dateRange"
                }]
            }],
            columns: [{
                    key: "date",
                    label: "commercial.date",
                    formatter: (value, key, item) => {
                        return new Date(item.date).toLocaleDateString();
                    },
                    sortable: true,
                    searchable: false
                },
                {
                    key: "comment",
                    label: "commercial.comment",
                    sortable: true,
                    searchable: true
                },
                {
                    key: "value",
                    formatter: (value, key, item) => {
                        return new Number(
                            item.details.reduce(function (sum, row) {
                                return sum + new Number(row["debit"]);
                            }, 0)
                        ).toLocaleString();
                    },
                    label: "commercial.number",
                    sortable: true,
                    searchable: true
                },
                {
                    key: "hasDetails",
                    label: "",
                    sortable: false
                },
                {
                    key: "actions",
                    label: "",
                    sortable: false,
                    searchable: false
                }
            ]
        },
        children: [{
            name: "journalForm",
            path: ":id",
            component: Form,
            meta: JournalForm,
            label: "general.create",
            url: "journals/0",
            icon: "add",
            variant: "dark"
        }],
        beforeEnter: (to, from, next) => {
            if(user.userType == 'data-entry')
            {
              return next({ path: '/401'});

            }
            next();
          }
    },
    //Opening Balance
    {
        path: "/:taxPayer/:cycle/accounting/opening-balance",
        component: FormList,
        name: "openingBalanceForm",
        meta: openingBalanceForm,
        beforeEnter: (to, from, next) => {
            if(user.userType == 'data-entry')
            {
              return next({ path: '/401'});

            }
            next();
          }
    },
    //Closing Balance
    {
        path: "/:taxPayer/:cycle/accounting/closing-balance",
        component: FormList,
        name: "closingBalanceForm",
        meta: closingBalanceForm,
        beforeEnter: (to, from, next) => {
            if(user.userType == 'data-entry')
            {
              return next({ path: '/401'});

            }
            next();
          }
    },
    //Budget
    {
        path: "/:taxPayer/:cycle/accounting/budget",
        component: FormList,
        name: "budgetForm",
        meta: budgetForm,
        beforeEnter: (to, from, next) => {
            if(user.userType == 'data-entry')
            {
              return next({ path: '/401'});

            }
            next();
          }
    },
    {
        path: "/:taxPayer/:cycle/accounting/charts",
        component: ChartList,
        name: "chartList",
        meta: {
            title: "accounting.chartOfAccounts",
            img: "/img/apps/chart-of-accounts.svg",
            components: [],
            columns: [{
                    key: "code",
                    label: "commercial.code",
                    sortable: true,
                    searchable: true
                },
                {
                    key: "name",
                    label: "commercial.account",
                    sortable: true,
                    searchable: true
                },
                {
                    key: "type",
                    label: ""
                },
                {
                    key: "actions",
                    label: ""
                }
            ]
        },
        children: [{
            name: "chartForm",
            path: ":id",
            component: ChartForm,
            meta: {
                title: "Chart Form",
                img: "/img/apps/chart-of-accounts.svg"
            },

            label: "general.create",
            url: "charts/0",
            icon: "add",
            variant: "dark"
        }],
        beforeEnter: (to, from, next) => {
            if(user.userType == 'data-entry')
            {
              return next({ path: '/401'});

            }
            next();
          }
    },
    {
        path: "/:taxPayer/:cycle/config/chart-versions",
        component: VersionList,
        name: "versionList",
        meta: {
            ttitle: "accounting.chartVersion",
            img: "/img/apps/sales.svg",
            components: [],
            columns: [{
                key: "name",
                sortable: true
            }]
        },
        children: [{
            name: "versionForm",
            path: ":id",
            component: VersionForm,
            meta: {
                title: "Version Form"
            },

            label: "general.create",
            url: "chart-versions/0",
            icon: "add",
            variant: "dark"
        }],
        beforeEnter: (to, from, next) => {
            if(user.userType == 'data-entry')
            {
              return next({ path: '/401'});

            }
            next();
          }
    },

    {
        path: "/:taxPayer/:cycle/config/cycles",
        component: List,
        name: "cycleList",
        meta: {
            title: "accounting.accountingCycle",
            img: "/img/apps/cycle.svg",
            components: [],
            columns: [{
                    key: "chart_version.name",
                    sortable: true
                },
                {
                    key: "year",
                    sortable: false
                },
                {
                    key: "actions",
                    label: "",
                    sortable: false
                }
            ]
        },
        children: [{
            name: "cycleForm",
            path: ":id",
            component: Form,
            meta: CycleForm,

            label: "general.create",
            url: "cycles/0",
            icon: "add",
            variant: "dark"
        }],
        beforeEnter: (to, from, next) => {
            if(user.userType == 'data-entry')
            {
              return next({ path: '/401'});

            }
            next();
          }
    },
    {
        path: "/:taxPayer/:cycle/config/documents",
        component: List,
        name: "documentList",
        meta: {
            title: "commercial.documents",
            img: "/img/apps/sales.svg",
            components: [],
            columns: [{
                key: "name",
                sortable: true
            }]
        },
        children: [{
            name: "documentForm",
            path: ":id",
            component: Form,
            meta: DocumentForm,

            label: "general.create",
            url: "documents/0",
            icon: "add",
            variant: "dark"
        }],
        beforeEnter: (to, from, next) => {
            if(user.userType == 'data-entry')
            {
              return next({ path: '/401'});

            }
            next();
          }
    },
    {
        path: "/:taxPayer/:cycle/config/rates",
        component: List,
        name: "rateList",
        meta: {
            title: "commercial.exchangeRates",
            img: "/img/apps/sales.svg",
            components: [],
            columns: [{
                    key: "currency.name",
                    label: "commercial.currency",
                    searchable: true,
                    sortable: true
                },
                {
                    key: "buy_rate",
                    label: "commercial.buyRate",
                    searchable: true,
                    sortable: true
                },
                {
                    key: "sell_rate",
                    label: "commercial.sellRate",
                    searchable: true,
                    sortable: true
                },
                {
                    key: "actions",
                    label: "",
                    sortable: false
                }
            ]
        },
        children: [{
            name: "rateForm",
            path: ":id",
            component: Form,
            meta: RateForm,

            label: "general.create",
            url: "rates/0",
            icon: "add",
            variant: "dark"
        }],
        beforeEnter: (to, from, next) => {
            if(user.userType == 'data-entry')
            {
              return next({ path: '/401'});

            }
            next();
          }
    },
    {
        path: "/:taxPayer/:cycle/commercial/reports",
        component: CommercialReports,
        name: "commercialReports",
        meta: {
            title: "Commercial Reports",
            description: "All your accounting data is here",
            img: "/img/apps/sales.svg"
        }
        
    },
    {
        path: "/:taxPayer/:cycle/accounting/reports",
        component: AccountingReports,
        name: "accountingReports",
        meta: {
            title: "Accounting Reports",
            description: "All your accounting data is here",
            img: "/img/apps/sales.svg"
        },
        beforeEnter: (to, from, next) => {
            if(user.userType == 'data-entry')
            {
              return next({ path: '/401'});

            }
            next();
          }
    }
];
