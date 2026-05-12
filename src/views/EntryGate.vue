<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import EntriesToday from "../components/EntriesToday.vue";
import ParkingCapacity from "../components/ParkingCapacity.vue";
import EntrySessionCard from "../components/EntrySessionCard.vue";

const currentTime = ref("");
const drawer = ref(true)
const videoRef = ref(null);
const cameraConnected = ref(false);

let stream = null;

const startCamera = async () => {
  try {
    stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: false,
    });

    if (videoRef.value) {
      videoRef.value.srcObject = stream;
    }

    cameraConnected.value = true;
  } catch (error) {
    console.error("Camera access denied:", error);
    cameraConnected.value = false;
  }
};

const stopCamera = () => {
  if (stream) {
    stream.getTracks().forEach((track) => track.stop());
  }
};

onMounted(() => {
  startCamera();
});

onBeforeUnmount(() => {
  stopCamera();
});

onMounted(() => {
  setInterval(() => {
    const now = new Date();
    let h = now.getHours();
    const m = String(now.getMinutes()).padStart(2, "0");
    const s = String(now.getSeconds()).padStart(2, "0");
    const ampm = h >= 12 ? "PM" : "AM";
    h = h % 12 || 12;
    currentTime.value = `${h}:${m}:${s} ${ampm}`;
  }, 1000);
});
</script>

<style scoped>
.camera-feed {
  background: repeating-linear-gradient(
    45deg,
    #18181b 0px,
    #18181b 20px,
    #27272a 20px,
    #27272a 40px
  );
}
</style>

<template>
  <v-container fluid class="pa-0 pa-sm-4 pa-md-6 h-full">
    <!-- Top Bar -->
    <v-app-bar
      color="surface"
      elevation="4"
      class="border-b border-zinc-700"
      :height="$vuetify.display.smAndDown ? 56 : 64"
    >
      <div class="flex items-center gap-3 px-2 px-sm-4 w-full">

        <!-- Logo -->
        <v-avatar color="primary" :size="$vuetify.display.smAndDown ? 36 : 48">
          <span
            :class="$vuetify.display.smAndDown ? 'text-xl' : 'text-3xl'"
            class="font-bold text-white"
          >
            P
          </span>
        </v-avatar>

        <!-- Menu Button -->
        <v-btn
          v-if="!drawer"
          icon
          @click="drawer = true"
        >
          <v-icon>mdi-menu</v-icon>
        </v-btn>

        <!-- Spacer -->
        <v-spacer />

        <!-- Title -->
        <v-toolbar-title
          class="font-bold tracking-tight text-center"
          :class="$vuetify.display.smAndDown ? 'text-lg' : 'text-3xl'"
        >
          ENTRY GATE
        </v-toolbar-title>

        <!-- Spacer -->
        <v-spacer />

        <!-- Time + Notification -->
        <div class="flex items-center gap-4">
          <div
            :class="$vuetify.display.smAndDown ? 'text-sm' : 'text-2xl'"
            class="font-mono tabular-nums text-primary"
          >
            {{ currentTime }}
          </div>

          <v-btn
            icon
            variant="text"
            :size="$vuetify.display.smAndDown ? 'small' : 'large'"
          >
            <v-icon icon="mdi-bell" color="warning" />
          </v-btn>
        </div>

      </div>
    </v-app-bar>

    <!-- Main Content Area -->
    <v-row
      no-gutters
      class="mt-2 mt-sm-4"
      :style="$vuetify.display.smAndDown ? '' : 'min-height: calc(100vh - 120px)'"
    >
      <v-col cols="12">
        <div class="max-w-[1460px] mx-auto w-full px-2 px-sm-0">
          <v-row :no-gutters="$vuetify.display.smAndDown">

            <!-- Left Panel -->
            <v-col
              cols="12"
              md="5"
              class="d-flex flex-column"
              :class="$vuetify.display.mdAndUp ? 'pr-3' : 'mb-4'"
            >
              <!-- Live Camera -->
              <v-card
                class="mb-4 w-full"
                variant="outlined"
                :max-width="$vuetify.display.smAndDown ? '100%' : 400"
              >
                <v-card-title class="d-flex align-center gap-2 flex-wrap text-sm">
                  <v-icon icon="mdi-video" />
                  <span>LIVE CAMERA FEED</span>
                  <v-spacer />
                  <v-chip
                    :color="cameraConnected ? 'success' : 'error'"
                    variant="outlined"
                    label
                    size="small"
                  >
                    {{ cameraConnected ? "CONNECTED" : "DISCONNECTED" }}
                  </v-chip>
                </v-card-title>

                <v-card-text class="pa-2 pa-sm-4">
                  <video
                    ref="videoRef"
                    autoplay
                    playsinline
                    muted
                    class="w-full rounded-lg"
                    :style="`height: ${$vuetify.display.smAndDown ? '180px' : '200px'}; object-fit: cover`"
                  />
                </v-card-text>
              </v-card>

              <!-- Parking Capacity -->
              <ParkingCapacity />

              <!-- Recent Entries - Desktop Only -->
              <div v-if="$vuetify.display.mdAndUp">
                <EntriesToday />
              </div>
            </v-col>

            <!-- Right Panel (Entry Form) -->
            <EntrySessionCard />

            <!-- Recent Entries - Mobile Only -->
            <v-col
              cols="12"
              v-if="$vuetify.display.smAndDown"
              class="mt-4 px-0"
            >
              <EntriesToday />
            </v-col>

          </v-row>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>
