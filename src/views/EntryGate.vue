<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import EntriesToday from "../components/EntriesToday.vue";
import ParkingCapacity from "../components/ParkingCapacity.vue";
import EntrySessionCard from "../components/EntrySessionCard.vue";

const drawer = ref(true);
const videoRef = ref(null);
const cameraConnected = ref(false);
const currentTime = ref("");

let stream = null;

const startCamera = async () => {
  try {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      stream = null;
    }

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
    stream = null;
  }

  //: release video element too
  if (videoRef.value) {
    videoRef.value.srcObject = null;
  }

  cameraConnected.value = false;
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
    <!-- Main Content Area -->
    <v-row
      no-gutters
      class="mt-2 mt-sm-4"
      :style="
        $vuetify.display.smAndDown ? '' : 'min-height: calc(100vh - 120px)'
      "
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
                <v-card-title
                  class="d-flex align-center gap-2 flex-wrap text-sm"
                >
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
