<script setup>
import EntryGate from './EntryGate.vue';
</script>

<template>
  <v-app theme="dark">
    <v-layout class="h-screen overflow-hidden">
      <!-- Sidebar -->
      <v-navigation-drawer
        color="zinc-900"
        permanent
        width="260"
        class="border-r border-zinc-700"
      >
        <div class="pa-4">
          <div class="flex items-center gap-3 mb-8 px-2">
            <v-avatar color="primary" size="56">
              <span class="text-4xl font-bold text-white">P</span>
            </v-avatar>
            <div>
              <div class="text-2xl font-bold tracking-tight">Park-O-cam</div>
              <div class="text-xs text-zinc-500">Entry Management</div>
            </div>
          </div>
        </div>

        <v-list nav density="comfortable" class="px-2">
          <v-list-item
            title="ENTRY GATE"
            prepend-icon="mdi-gate-arrow-right"
            active
            color="primary"
          />
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

      <!-- Main Content -->
      <v-main class="bg-zinc-950 overflow-auto">
        <EntryGate />
      </v-main>
    </v-layout>
  </v-app>
</template>