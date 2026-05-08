<script setup>
import { ref, onMounted } from 'vue'

const currentTime = ref('')
const note = ref('')

const recentEntries = ref([
  { plate: "L6 455 KJA", time: "09:25AM", slot: "A-91", method: "AUTO", status: "ACTIVE" },
  { plate: "L6 455 KJA", time: "09:25AM", slot: "C-11", method: "MANUAL", status: "ACTIVE" },
  { plate: "L6 455 KJA", time: "09:25AM", slot: "G-20", method: "QR-SCAN", status: "OVERSTAYED" },
  { plate: "L6 455 KJA", time: "09:25AM", slot: "2-78", method: "AUTO", status: "ACTIVE" },
])

const createSession = () => {
  alert('✅ Entry Session Created Successfully!\n\nPlate: L6 455 KJA\nSlot: B-12')
}

onMounted(() => {
  setInterval(() => {
    const now = new Date()
    let h = now.getHours()
    const m = String(now.getMinutes()).padStart(2, '0')
    const s = String(now.getSeconds()).padStart(2, '0')
    const ampm = h >= 12 ? 'PM' : 'AM'
    h = h % 12 || 12
    currentTime.value = `${h}:${m}:${s} ${ampm}`
  }, 1000)
})
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
  <v-container fluid class="pa-6 h-full">
    <!-- Top Bar -->
    <v-app-bar color="surface" elevation="4" class="border-b border-zinc-700 mb-4">
      <div class="flex items-center gap-3 px-4 w-full">
        <v-avatar color="primary" size="48">
          <span class="text-3xl font-bold">P</span>
        </v-avatar>
        <v-toolbar-title class="text-3xl font-bold tracking-tight">
          ENTRY GATE
        </v-toolbar-title>

        <v-spacer />

        <div class="text-2xl font-mono tabular-nums text-primary">
          {{ currentTime }}
        </div>

        <v-btn icon variant="text" size="large">
          <v-icon icon="mdi-bell" color="warning" />
        </v-btn>
      </div>
    </v-app-bar>

    <!-- Main Content Area - Centered & Better Proportion -->
    <v-row no-gutters class="h-[calc(100vh-120px)]">
      <v-col cols="12" class="d-flex">
        <div class="flex-1 max-w-[1450px] mx-auto w-full">
          <v-row no-gutters class="h-full">
            <!-- Left Panel -->
            <v-col cols="12" md="5" class="d-flex flex-column pr-3">
              <!-- Live Camera -->
              <v-card class="mb-4" variant="outlined">
                <v-card-title class="d-flex align-center gap-2">
                  <v-icon icon="mdi-video" />
                  LIVE CAMERA FEED
                  <v-spacer />
                  <v-chip color="success" variant="outlined" label>CONNECTED</v-chip>
                </v-card-title>
                <v-card-text class="pa-0">
                  <div class="relative bg-zinc-900 aspect-video flex items-center justify-center overflow-hidden camera-feed">
                    <div class="text-center">
                      <v-icon icon="mdi-car" size="110" color="grey-darken-3" />
                      <p class="text-zinc-400 mt-4 text-lg">Waiting for vehicle...</p>
                    </div>
                    <div class="absolute inset-0 border-2 border-dashed border-white/30" />
                    <div class="absolute top-4 left-4 bg-black/70 px-3 py-1 rounded text-xs font-mono">LIVE</div>
                  </div>
                </v-card-text>
              </v-card>

              <!-- Parking Capacity -->
              <v-card class="mb-4" variant="outlined">
                <v-card-title>Parking Capacity</v-card-title>
                <v-card-text>
                  <div class="flex justify-between items-end mb-6">
                    <div>
                      <span class="text-6xl font-bold">48</span>
                      <span class="text-3xl text-zinc-500">/76</span>
                    </div>
                    <div class="text-right">
                      <div class="text-success text-lg font-medium">ENTRY ALLOWED</div>
                      <div class="text-zinc-500">22% Occupied</div>
                    </div>
                  </div>
                  <v-progress-linear :model-value="22" color="primary" height="18" rounded />
                </v-card-text>
              </v-card>

              <!-- Recent Entries -->
              <v-card class="flex-grow" variant="outlined">
                <v-card-title>Recent Entries Today</v-card-title>
                <v-card-text class="pa-0">
                  <div class="overflow-auto" style="max-height: calc(100vh - 480px);">
                    <v-table>
                      <thead>
                        <tr>
                          <th>PLATE NO</th>
                          <th>TIME</th>
                          <th>SLOT</th>
                          <th>METHOD</th>
                          <th class="text-center">STATUS</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="(entry, i) in recentEntries" :key="i">
                          <td class="font-mono">{{ entry.plate }}</td>
                          <td>{{ entry.time }}</td>
                          <td>{{ entry.slot }}</td>
                          <td>{{ entry.method }}</td>
                          <td class="text-center">
                            <v-chip :color="entry.status === 'ACTIVE' ? 'success' : 'amber'" variant="flat" size="small">
                              {{ entry.status }}
                            </v-chip>
                          </td>
                        </tr>
                      </tbody>
                    </v-table>
                  </div>
                </v-card-text>
              </v-card>
            </v-col>

            <!-- Right Panel -->
            <v-col cols="12" md="7" class="pl-3">
              <v-card class="h-full" variant="elevated">
                <!-- ... (Right panel content remains same) ... -->
                <v-card-title class="text-3xl font-bold">ENTRY SESSION</v-card-title>
                <v-card-text class="pt-8">
                  <v-row dense>
                    <v-col cols="12">
                      <label class="text-zinc-400 text-sm mb-2 block">DETECTED PLATE NUMBER</label>
                      <v-card class="bg-zinc-900 text-center py-8 text-4xl font-mono tracking-widest">
                        L6 455 KJA
                      </v-card>
                    </v-col>

                    <v-col cols="12" md="6">
                      <label class="text-zinc-400 text-sm mb-2 block">ENTRY TIME</label>
                      <v-card class="bg-zinc-900 py-6 text-2xl">09/12/2026 02:30 PM</v-card>
                    </v-col>

                    <v-col cols="12" md="6">
                      <label class="text-zinc-400 text-sm mb-2 block">ENTRY METHOD</label>
                      <v-card class="bg-zinc-900 py-6 flex items-center gap-4 text-xl">
                        <v-icon icon="mdi-camera" color="success" size="large" />
                        AUTO - CAMERA OCR
                      </v-card>
                    </v-col>

                    <v-col cols="12">
                      <label class="text-zinc-400 text-sm mb-2 block">ASSIGN SLOT</label>
                      <v-card class="bg-zinc-900 py-8 text-4xl font-semibold text-center">
                        B-12
                      </v-card>
                    </v-col>

                    <v-col cols="12">
                      <label class="text-zinc-400 text-sm mb-2 block">NOTE (OPTIONAL)</label>
                      <v-textarea
                        v-model="note"
                        variant="outlined"
                        placeholder="VIP, Staff override reason..."
                        rows="4"
                      />
                    </v-col>
                  </v-row>
                </v-card-text>

                <v-card-actions class="pa-6 pt-0">
                  <v-row>
                    <v-col cols="12">
                      <v-btn color="primary" size="x-large" block class="text-lg font-semibold py-8" @click="createSession">
                        CREATE SESSION
                      </v-btn>
                    </v-col>
                    <v-col cols="6">
                      <v-btn variant="outlined" size="large" block class="text-base py-6">
                        <v-icon icon="mdi-refresh" class="mr-2" /> RE-SCAN PLATE
                      </v-btn>
                    </v-col>
                    <v-col cols="6">
                      <v-btn color="amber" size="large" block class="text-base py-6">
                        <v-icon icon="mdi-shield-account" class="mr-2" /> MANUAL OVERRIDE
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

