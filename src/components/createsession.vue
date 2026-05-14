<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import SessionPayment from "./SessionPayment.vue";

const router = useRouter();
const emit = defineEmits(["close"]);

const plateNumber = ref("KSJ 990 BH");
const entryTime = ref("09/11/2026 12:09:30");
const exitTime = ref("09/11/2026 12:09:30");
const slot = ref("A-09");
const overrideReason = ref("");

const auditTrail = ref([
  {
    icon: "mdi-car",
    color: "blue",
    time: "12:09:30 AM",
    title: "SESSION CREATED - AUTO OCR",
    subtitle: "ATTENDANT: EMMANUEL .O • METHOD: CAMERA",
  },
  {
    icon: "mdi-pencil",
    color: "amber",
    time: "12:09:30 AM",
    title: "ENTRY TIME ADJUSTED",
    subtitle: "SUPERVISOR: DANIEL .E • 12:09 → 12:09",
  },
  {
    icon: "mdi-alert-circle",
    color: "red",
    time: "12:09:30 AM",
    title: "OVERSTAY ALERT TRIGGERED",
    subtitle: "SYSTEM AUTO • DURATION → 2H",
  },
  {
    icon: "mdi-credit-card",
    color: "teal",
    time: "12:09:30 AM",
    title: "PAYMENT PENDING",
    subtitle: "AWAITING EXIT CONFIRMATION",
  },
]);

const paymentDialog = ref(false);

const saveChanges = () => {
  // your save logic here

  // open payment modal
  paymentDialog.value = true;
};

const voidSession = () => {
  if (confirm("Are you sure you want to void this session?")) {
    alert("🗑️ Session has been voided.");
    emit("close");
  }
};

const goBack = () => {
  router.back();
};
</script>
<style scoped>
.audit-timeline :deep(.v-timeline-item__body) {
  padding-bottom: 28px;
}
</style>

<template>
  <v-container fluid class="pa-4 pa-md-6 bg-zinc-950">
    <v-row class="max-w-[1400px] mx-auto">
      <!-- Left Column: Session Record -->
      <v-col cols="12" lg="7" class="pr-lg-6">
        <v-card class="bg-[#1a2338] rounded-xl" flat>
          <v-card-title
            class="text-xl font-semibold text-white border-b border-zinc-700"
          >
            SESSION RECORD
          </v-card-title>

          <v-card-text class="pa-6">
            <v-row dense>
              <!-- Session ID -->
              <v-col cols="12" md="6" class="mb-4">
                <div class="text-xs text-zinc-400 mb-1">SESSION ID</div>
                <v-text-field
                  model-value="SESS-20261109-7842"
                  readonly
                  variant="outlined"
                  density="compact"
                  color="primary"
                  bg-color="#0f172a"
                />
              </v-col>

              <!-- Plate Number -->
              <v-col cols="12" md="6" class="mb-4">
                <div class="text-xs text-zinc-400 mb-1">PLATE NUMBER</div>
                <v-text-field
                  v-model="plateNumber"
                  variant="outlined"
                  density="compact"
                  color="primary"
                  bg-color="#0f172a"
                />
              </v-col>

              <!-- Entry Time -->
              <v-col cols="12" md="6" class="mb-4">
                <div class="text-xs text-zinc-400 mb-1">ENTRY TIME</div>
                <v-text-field
                  v-model="entryTime"
                  variant="outlined"
                  density="compact"
                  color="primary"
                  bg-color="#0f172a"
                />
              </v-col>

              <!-- Exit Time -->
              <v-col cols="12" md="6" class="mb-4">
                <div class="text-xs text-zinc-400 mb-1">EXIT TIME</div>
                <v-text-field
                  v-model="exitTime"
                  variant="outlined"
                  density="compact"
                  color="primary"
                  bg-color="#0f172a"
                />
              </v-col>

              <!-- Slot -->
              <v-col cols="12" md="6" class="mb-4">
                <div class="text-xs text-zinc-400 mb-1">SLOT</div>
                <v-text-field
                  v-model="slot"
                  variant="outlined"
                  density="compact"
                  color="primary"
                  bg-color="#0f172a"
                />
              </v-col>
            </v-row>

            <!-- Override Reason -->
            <div class="mt-6">
              <div class="text-xs text-zinc-400 mb-2">
                OVERRIDE REASON (REQUIRED)
              </div>
              <v-textarea
                v-model="overrideReason"
                placeholder="Explain reason for override..."
                variant="outlined"
                density="comfortable"
                bg-color="#0f172a"
                rows="3"
              />
            </div>

            <!-- Action Buttons -->
            <div class="d-flex gap-4 mt-8">
              <v-btn
                color="primary"
                size="large"
                class="flex-1 text-base font-medium mr-5"
                @click="saveChanges"
              >
                <v-icon left>mdi-content-save</v-icon>
                SAVE CHANGES
              </v-btn>
              <!-- Payment Popup Modal -->
              <v-dialog v-model="paymentDialog" max-width="700">
                <v-card class="rounded-xl">
                  <v-card-text class="pa-0">
                    <SessionPayment />
                  </v-card-text>

                  <v-card-actions class="justify-end pa-4">
                    <v-btn variant="text" @click="paymentDialog = false">
                      Close
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>

              <v-btn
                color="error"
                variant="outlined"
                size="large"
                class="flex-1 text-base font-medium"
                @click="voidSession"
              >
                <v-icon left>mdi-delete</v-icon>
                VOID SESSION
              </v-btn>
            </div>
          </v-card-text>
        </v-card>

        <!-- Images Section -->
        <v-card class="mt-6 bg-[#1a2338]" flat>
          <v-card-title class="text-lg font-semibold border-b border-zinc-700">
            IMAGES
          </v-card-title>
          <v-card-text class="pa-6">
            <v-row>
              <v-col cols="12" sm="6">
                <div class="text-xs text-zinc-400 mb-2">ENTRY IMAGE</div>
                <div
                  class="border border-zinc-700 rounded-xl overflow-hidden bg-black aspect-video relative"
                >
                  <div
                    class="absolute inset-0 flex items-center justify-center"
                  >
                    <div class="text-center">
                      <v-icon size="48" color="grey">mdi-image</v-icon>
                      <div class="text-xs text-zinc-500 mt-2">
                        12 : 09 : 30 AM
                      </div>
                    </div>
                  </div>
                </div>
              </v-col>

              <v-col cols="12" sm="6">
                <div class="text-xs text-zinc-400 mb-2">EXIT IMAGE</div>
                <div
                  class="border border-zinc-700 rounded-xl overflow-hidden bg-black aspect-video relative flex items-center justify-center"
                >
                  <div class="text-center">
                    <v-icon size="48" color="grey">mdi-timer-sand</v-icon>
                    <div class="text-sm text-amber-400 mt-2 font-medium">
                      PENDING EXIT
                    </div>
                  </div>
                </div>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Right Column: Audit Trail -->
      <v-col cols="12" lg="5">
        <v-card class="bg-[#1a2338] h-full rounded-xl" flat>
          <v-card-title class="text-xl font-semibold border-b border-zinc-700">
            AUDIT TRAIL
          </v-card-title>

          <v-card-text class="pa-6">
            <v-timeline side="right" density="compact" class="audit-timeline">
              <v-timeline-item
                v-for="(event, i) in auditTrail"
                :key="i"
                :color="event.color"
                :icon="event.icon"
                size="small"
              >
                <template #opposite>
                  <div class="text-xs text-zinc-500 font-mono">
                    {{ event.time }}
                  </div>
                </template>
                <div class="text-sm">
                  <div class="font-medium text-white">{{ event.title }}</div>
                  <div class="text-xs text-zinc-400">{{ event.subtitle }}</div>
                </div>
              </v-timeline-item>
            </v-timeline>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
