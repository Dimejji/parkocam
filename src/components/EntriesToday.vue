<script setup>
import { ref } from 'vue'


const recentEntries = ref([
  {
    plate: "L6 455 KJA",
    time: "09:25AM",
    slot: "A-91",
    method: "AUTO",
    status: "ACTIVE",
  },
  {
    plate: "L6 455 KJA",
    time: "09:25AM",
    slot: "C-11",
    method: "MANUAL",
    status: "ACTIVE",
  },
  {
    plate: "L6 455 KJA",
    time: "09:25AM",
    slot: "G-20",
    method: "QR-SCAN",
    status: "OVERSTAYED",
  },
  {
    plate: "L6 455 KJA",
    time: "09:25AM",
    slot: "2-78",
    method: "AUTO",
    status: "ACTIVE",
  },

]);

</script>
<template>
  <v-card 
  class="flex-grow mt-5" 
  variant="outlined"
  style="background-color: #0a1f3d; border-color: #334155;"
>
  <!-- Header -->
  <v-card-title class="text-white text-lg font-semibold text-center border-b border-gray-700 px-5 py-4">
  History 
  </v-card-title>

  <!-- Table -->
  <v-table 
    density="compact" 
    hover
    class="text-sm"
  >
    <thead>
      <tr class="border-b border-gray-700">
        <th class="text-left pl-5 pr-3 py-3 font-medium w-[28%] text-gray-300">PLATE NO</th>
        <th class="text-left pl-3 pr-3 py-3 font-medium w-[15%] text-gray-300">TIME</th>
        <th class="text-left pl-3 pr-3 py-3 font-medium w-[18%] text-gray-300">SLOT</th>
        <th class="text-left pl-3 pr-3 py-3 font-medium w-[18%] text-gray-300">METHOD</th>
        <th class="text-center pl-3 pr-5 py-3 font-medium w-[21%] text-gray-300">STATUS</th>
      </tr>
    </thead>

    <tbody>
      <tr 
        v-for="(entry, i) in recentEntries" 
        :key="i"
        class="border-b border-gray-700 last:border-b-0 hover:bg-white/5"
      >
        <td class="pl-5 pr-3 py-3 font-mono text-white whitespace-nowrap">
          {{ entry.plate }}
        </td>
        <td class="pl-3 pr-3 py-3 text-gray-300">{{ entry.time }}</td>
        <td class="pl-3 pr-3 py-3 text-gray-300">{{ entry.slot }}</td>
        <td class="pl-3 pr-3 py-3 text-gray-300">{{ entry.method }}</td>
        <td class="pl-3 pr-5 py-3 text-center">
          <v-chip
            :color="entry.status === 'ACTIVE' ? 'success' : 'warning'"
            variant="flat"
            label
            size="small"
            class="font-medium px-4"
          >
            {{ entry.status }}
          </v-chip>
        </td>
      </tr>
    </tbody>
  </v-table>
</v-card>
</template>