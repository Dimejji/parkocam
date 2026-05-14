<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import CreateSession from "../components/createsession.vue";

const router = useRouter();
const plateNumber = ref("");
const createSession = () => {
  router.push("/create-session");
};
</script>

<style scoped>
.custom-card {
  background-color: #111827 !important;
}
.custom-primary-btn {
  background-color: rgb(59 130 246) !important; /* Light Primary (blue-500) */
  color: white;
  transition: background-color 0.2s ease;
}

.custom-primary-btn:hover {
  background-color: rgb(37 99 235);
}
</style>

<template>
  <v-col
    cols="12"
    md="6"
    :class="$vuetify.display.mdAndUp ? 'pl-3 ml-16' : 'px-0'"
  >
    <v-card class="h-full custom-card" variant="elevated">
      <v-card-title
        :class="$vuetify.display.smAndDown ? 'text-xl py-3' : 'text-3xl py-4'"
        class="text-center font-bold text-gray-100"
      >
        ENTRY SESSION
      </v-card-title>

      <v-card-text :class="$vuetify.display.smAndDown ? 'pt-2 px-3' : 'pt-8'">
        <v-row density="compact">
          <v-col cols="12">
            <label class="text-zinc-400 text-sm mb-2 block"
              >DETECTED PLATE NUMBER</label
            >
            <v-text-field
              v-model="plateNumber"
              variant="outlined"
              :class="$vuetify.display.smAndDown ? 'text-2xl' : 'text-4xl'"
              class="text-center font-mono tracking-widest"
              density="comfortable"
              hide-details
              placeholder="L6 455 KJA"
              bg-color="#111827"
            />
          </v-col>

          <v-col cols="12" sm="6">
            <label class="text-zinc-400 text-sm mb-2 block">ENTRY TIME</label>
            <v-text-field
              v-model="entryTime"
              variant="outlined"
              class="text-center font-mono"
              density="comfortable"
              hide-details
              placeholder="09/12/2026 02:30 PM"
              bg-color="#111827"
            />
          </v-col>

          <v-col cols="12" sm="6">
            <label class="text-zinc-400 text-sm mb-2 block">ENTRY METHOD</label>
            <v-card
              class="bg-zinc-900 d-flex align-center gap-2 gap-sm-4"
              :class="
                $vuetify.display.smAndDown ? 'pa-3 text-base' : 'py-6 text-xl'
              "
            >
              <v-icon
                icon="mdi-camera"
                color="success"
                :size="$vuetify.display.smAndDown ? 'default' : 'large'"
              />
              <span>AUTO - CAMERA OCR</span>
            </v-card>
          </v-col>

          <v-col cols="12">
            <label class="text-zinc-400 text-sm mb-2 block">ASSIGN SLOT</label>
            <v-text-field
              v-model="assignedSlot"
              variant="outlined"
              :class="$vuetify.display.smAndDown ? 'text-2xl' : 'text-4xl'"
              class="text-center font-mono tracking-widest"
              density="comfortable"
              hide-details
              placeholder="B-12"
              bg-color="#111827"
            />
          </v-col>

          <v-col cols="12">
            <label class="text-zinc-400 text-sm mb-2 block"
              >NOTE (OPTIONAL)</label
            >
            <v-textarea
              v-model="note"
              variant="outlined"
              placeholder="VIP, Staff override reason..."
              :rows="$vuetify.display.smAndDown ? 3 : 4"
            />
          </v-col>
        </v-row>
      </v-card-text>

      <v-card-actions
        :class="$vuetify.display.smAndDown ? 'pa-3 pt-0' : 'pa-6 pt-0'"
      >
        <v-row>
          <!-- CREATE SESSION BUTTON -->
          <v-col cols="12">
            <v-btn
              color="primary"
              size="x-large"
              block
              variant="elevated"
              class="custom-primary-btn"
              :class="
                $vuetify.display.smAndDown
                  ? 'text-base py-5'
                  : 'text-lg font-semibold py-8'
              "
              @click="createSession"
            >
              CREATE SESSION
            </v-btn>
          </v-col>

          <v-col cols="6">
            <v-btn
              variant="outlined"
              :size="$vuetify.display.smAndDown ? 'default' : 'large'"
              block
              :class="
                $vuetify.display.smAndDown ? 'py-4 text-sm' : 'text-base py-6'
              "
            >
              <v-icon icon="mdi-refresh" class="mr-1 mr-sm-2" />
              <span :class="$vuetify.display.smAndDown ? 'text-xs' : ''"
                >RE-SCAN</span
              >
            </v-btn>
          </v-col>

          <v-col cols="6">
            <v-btn
              color="amber"
              :size="$vuetify.display.smAndDown ? 'default' : 'large'"
              block
              :class="
                $vuetify.display.smAndDown ? 'py-4 text-sm' : 'text-base py-6'
              "
            >
              <v-icon icon="mdi-shield-account" class="mr-1 mr-sm-2" />
              <span :class="$vuetify.display.smAndDown ? 'text-xs' : ''"
                >OVERRIDE</span
              >
            </v-btn>
          </v-col>
        </v-row>
      </v-card-actions>
    </v-card>
  </v-col>
</template>
