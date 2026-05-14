import { createRouter, createWebHistory } from "vue-router";
import { components } from "vuetify/dist/vuetify.js";

import Dashboard from "../views/Dashboard.vue";
import EntryGate from "../views/EntryGate.vue";
import createsession from "../components/createsession.vue";
import ActiveSession from "../views/ActiveSession.vue";
import ExitGate from "../views/ExitGate.vue";
import SessionDetails from "../views/SessionDetails.vue";
import PaymentBilling from "../views/PaymentBilling.vue";
import AdminDashboard from "../views/AdminDashboard.vue";
import SpaceMaps from "../views/SpaceMaps.vue";
import QrBackup from "../views/QrBackup.vue";
import Alert from "../views/Alert.vue";
import Settings from "../views/Settings.vue";

const routes = [
  {
    path: "/",
    component: Dashboard,

    children: [
      {
        path: "",
        redirect: "/entrygate",
      },
      {
        path: "entrygate", // ← This was missing
        name: "EntryGate",
        component: EntryGate,
      },
      {
        path: "/create-session",
        name: "CreateSession",
        component: createsession,
      },
      {
        path: "/activesession",
        component: ActiveSession,
      },

      {
        path: "/exitgate",
        component: ExitGate,
      },

      {
        path: "/sessiondetails",
        component: SessionDetails,
      },

      {
        path: "/paymentbilling",
        component: PaymentBilling,
      },

      {
        path: "/admindashboard",
        component: AdminDashboard,
      },

      {
        path: "/spacemaps",
        component: SpaceMaps,
      },

      {
        path: "/qrbackup",
        component: QrBackup,
      },

      {
        path: "/alert",
        component: Alert,
      },

      {
        path: "/settings",
        component: Settings,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
