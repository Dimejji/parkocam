<script setup>
import { ref, onMounted } from "vue";

const drawer = ref(true);
const currentTime = ref("");

import { computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const currentRouteTitle = computed(() => {
  const path = route.path.toLowerCase();

  if (path === "/entrygate" || path.includes("entrygate")) {
    return "ENTRY GATE";
  }
  if (path === "/activesession" || path.includes("activesession")) {
    return "ACTIVE SESSIONS";
  }
  if (path === "/exitgate" || path.includes("exitgate")) {
    return "EXIT GATE";
  }
  // Add more pages as needed
  return "Park-O-cam"; // fallback
});

// ================== TIME LOGIC ==================
const updateTime = () => {
  const now = new Date();
  let hours = now.getHours();
  const minutes = now.getMinutes().toString().padStart(2, "0");
  const seconds = now.getSeconds().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";

  hours = hours % 12 || 12;

  currentTime.value = `${hours}:${minutes} : ${seconds} ${ampm}`;
};

onMounted(() => {
  updateTime();
  setInterval(updateTime, 1000);
});
</script>

<style scoped>
.custom-sidebar {
  background-color: #111827 !important;
}

.custom-topbar {
  background-color: #111827 !important;
}
</style>

<template>
  <v-app>
    <v-layout class="h-screen overflow-hidden">
      <!-- Sidebar -->
      <v-navigation-drawer
        v-model="drawer"
        width="260"
        class="custom-sidebar border-r border-zinc-700"
        app
      >
        <!-- Sidebar Header -->
        <div class="pa-4">
          <div class="d-flex align-center justify-space-between mb-8">
            <v-avatar color="primary" size="56">
              <span class="text-4xl font-bold text-white">P</span>
            </v-avatar>
            <v-btn icon @click="drawer = false" class="hidden-md-and-up">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </div>

          <div>
            <div class="text-2xl font-bold tracking-tight">Park-O-cam</div>
            <div class="text-xs text-zinc-500">Entry Management</div>
          </div>
        </div>

        <v-list nav density="comfortable" class="px-2" bg-color="#111827">
          <v-list-item
            title="ENTRY GATE"
            prepend-icon="mdi-gate-arrow-right"
            to="/entrygate"
          />

          <v-list-item
            title="Active Session"
            prepend-icon="mdi-timer-play"
            to="/activesession"
          />

          <v-list-item
            title="Exit Gate"
            prepend-icon="mdi-gate-arrow-left"
            to="/exitgate"
          />

          <!-- <v-list-item
            title="Session Details"
            prepend-icon="mdi-file-document-outline"
            to="/sessiondetails"
          /> -->

          <v-list-item
            title="Payment & Billing"
            prepend-icon="mdi-cash-multiple"
            to="/paymentbilling"
          />

          <v-list-item
            title="Admin Dashboard"
            prepend-icon="mdi-view-dashboard"
            to="/admindashboard"
          />

          <v-list-item
            title="Space Maps"
            prepend-icon="mdi-map"
            to="/spacemaps"
          />

          <v-list-item
            title="QR Back UP"
            prepend-icon="mdi-qrcode"
            to="/qrbackup"
          />

          <v-list-item
            title="Alert"
            prepend-icon="mdi-bell-alert"
            to="/alert"
          />

          <v-list-item title="Settings" prepend-icon="mdi-cog" to="/settings" />
        </v-list>

        <template #append>
          <div class="pa-4">
            <v-divider class="mb-4" />
            <div class="text-xs text-zinc-500 px-4">
              Powered by Teinnovate capital
            </div>
          </div>
        </template>
      </v-navigation-drawer>

      <!-- Top App Bar -->
      <v-app-bar
        flat
        background-color="#111827"
        class="custom-topbar border-b border-zinc-700"
      >
        <div class="d-flex align-center w-100 px-2 px-sm-4">
          <!-- LEFT: Menu Button -->
          <v-btn v-if="!drawer" icon @click="drawer = true" class="ml-2">
            <v-icon>mdi-menu</v-icon>
          </v-btn>

          <!-- CENTER: Dynamic Title -->
          <div
            class="flex-grow-1 d-flex flex-column align-center justify-center text-center"
          >
            <div class="font-bold text-lg md:text-2xl">
              {{ currentRouteTitle }}
            </div>

            <div
              class="font-mono text-primary tabular-nums"
              :class="$vuetify.display.smAndDown ? 'text-sm' : 'text-base'"
            >
              {{ currentTime }}
            </div>
          </div>

          <!-- RIGHT: Notification -->
          <div class="d-flex align-center">
            <v-btn icon variant="text" color="amber" size="large">
              <v-icon>mdi-bell</v-icon>
            </v-btn>
          </div>
        </div>
      </v-app-bar>

      <!-- Main Content Area -->
      <v-main class="bg-zinc-950 overflow-auto">
        <router-view />
        <!-- ← This is the most important line -->
      </v-main>
    </v-layout>
  </v-app>
</template>
