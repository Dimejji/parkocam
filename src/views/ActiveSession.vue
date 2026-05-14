<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useSessionStore } from "@/stores/sessionStore";

const store = useSessionStore();

const currentTime = ref("");
const search = ref("");
let interval;

// table headers
const headers = [
  { title: "PLATE", key: "plate" },
  { title: "ENTRY TIME", key: "entryTime" },
  { title: "DURATION", key: "duration" },
  { title: "SLOT", key: "slot" },
  { title: "AMOUNT DUE", key: "amount" },
  { title: "STATUS", key: "status" },
  { title: "ACTION", key: "action", sortable: false },
];

// reactive mapped sessions (from Pinia store)
const sessions = computed(() =>
  store.sessions.map((s) => ({
    plate: s.plateNumber,
    entryTime: new Date(s.paidAt).toLocaleTimeString(),
    duration: "-",
    slot: "-",
    amount: "-",
    status: s.status,
    statusColor: s.status === "Paid" ? "success" : "warning",
  })),
);

// clock logic
const updateTime = () => {
  const now = new Date();

  let h = now.getHours();
  const m = now.getMinutes().toString().padStart(2, "0");
  const s = now.getSeconds().toString().padStart(2, "0");
  const ampm = h >= 12 ? "PM" : "AM";

  h = h % 12 || 12;

  currentTime.value = `${h}:${m}:${s} ${ampm}`;
};

// lifecycle
onMounted(() => {
  store.loadFromStorage();

  updateTime();
  interval = setInterval(updateTime, 1000);
});

onUnmounted(() => {
  clearInterval(interval);
});
</script>

<style scoped>
.stat-card {
  border-radius: 8px;
  border-top: 4px solid;
}

.stat-card.blue {
  border-color: #3b82f6;
}
.stat-card.green {
  border-color: #22c55e;
}
.stat-card.red {
  border-color: #ef4444;
}
.stat-card.yellow {
  border-color: #eab308;
}

.custom-table :deep(.v-data-table) {
  background-color: #1e2937;
}
</style>

<template>
  <div>
    <!-- Top Bar
    <v-app-bar flat color="#0f172a" class="border-b border-zinc-800">
      <v-toolbar-title class="text-lg font-semibold"
        >ACTIVE SESSIONS</v-toolbar-title
      >
      <v-spacer />
      <div class="d-flex align-center gap-4">
        <div class="text-h6 font-medium">{{ currentTime }}</div>
        <v-btn icon color="amber">
          <v-icon>mdi-bell</v-icon>
        </v-btn>
      </div>
    </v-app-bar> -->

    <v-container fluid class="pa-4 mt-15">
      <!-- Stats Cards -->
      <v-row class="mb-6 justify-center">
        <v-col cols="12" sm="6" md="3" lg="3" class="pa-2">
          <v-card class="stat-card blue" height="150">
            <v-card-text>
              <div class="text-caption text-blue-lighten-3">CARS INSIDE</div>
              <div class="text-h3 font-bold text-white">13</div>
              <div class="text-caption text-blue-lighten-2">2 IN LAST HOUR</div>
            </v-card-text>
          </v-card>
        </v-col>

        <v-col cols="12" sm="6" md="3" lg="3" class="pa-2">
          <v-card class="stat-card green" height="150">
            <v-card-text>
              <div class="text-caption text-green-lighten-3">
                AVAILABLE SLOT
              </div>
              <div class="text-h3 font-bold text-white">47</div>
              <div class="text-caption text-green-lighten-2">OF 70 TOTALS</div>
            </v-card-text>
          </v-card>
        </v-col>

        <v-col cols="12" sm="6" md="3" lg="3" class="pa-2">
          <v-card class="stat-card red" height="150">
            <v-card-text>
              <div class="text-caption text-red-lighten-3">OVERSTAYED</div>
              <div class="text-h3 font-bold text-white">3</div>
              <div class="text-caption text-red-lighten-2">
                REQUIRE ATTENTION
              </div>
            </v-card-text>
          </v-card>
        </v-col>

        <v-col cols="12" sm="6" md="3" lg="3" class="pa-2">
          <v-card class="stat-card yellow" height="150">
            <v-card-text>
              <div class="text-caption text-yellow-lighten-3">AVG DURATION</div>
              <div class="text-h3 font-bold text-white">1H 25M</div>
              <div class="text-caption text-yellow-lighten-2">
                TODAY'S AVERAGE
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <!-- Table Section -->
      <v-card class="bg-[#1e2937]">
        <v-card-title class="d-flex align-center justify-space-between py-4">
          <div class="d-flex align-center gap-3">
            <v-icon>mdi-parking</v-icon>
            <span class="text-lg font-semibold">ACTIVE PARKING SESSIONS</span>
          </div>

          <div class="d-flex align-center gap-3 ml-10">
            <v-text-field
              v-model="search"
              placeholder="SEARCH PLATE..."
              prepend-inner-icon="mdi-magnify"
              density="compact"
              variant="outlined"
              hide-details
              class="mr-4"
              style="max-width: 280px"
            ></v-text-field>

            <v-btn color="primary" class="px-5" variant="elevated">
              EXPORT CSV
            </v-btn>
          </div>
        </v-card-title>

        <v-divider />

        <!-- Data Table -->
        <v-data-table
          :headers="headers"
          :items="sessions"
          :search="search"
          density="comfortable"
          class="custom-table"
        >
          <!-- Custom Status Chip -->
          <!-- Status -->
          <template v-slot:item.status="{ item }">
            <v-chip
              :color="item.statusColor"
              variant="flat"
              size="small"
              class="font-medium text-uppercase"
            >
              {{ item.status }}
            </v-chip>
          </template>

          <!-- Action -->
          <template #item.action="{ item }">
            <v-btn
              color="primary"
              size="small"
              variant="outlined"
              @click="viewSession(item)"
            >
              VIEW
            </v-btn>
          </template>
        </v-data-table>
      </v-card>
    </v-container>
  </div>
</template>
