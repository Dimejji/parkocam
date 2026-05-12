<script setup>
import { ref } from 'vue'

const drawer = ref(true)
</script>

<template>
  <v-app theme="dark">
    <v-layout class="h-screen overflow-hidden">
      
      <!-- Sidebar -->
      <v-navigation-drawer
        v-model="drawer"
        color="zinc-900"
        width="260"
        class="border-r border-zinc-700"
        app
      >
        <!-- Sidebar Header -->
        <div class="pa-4">
          <div class="d-flex align-center justify-space-between mb-8">
            <v-avatar color="primary" size="56">
              <span class="text-4xl font-bold text-white">P</span>
            </v-avatar>
            <v-btn 
              icon 
              @click="drawer = false"
              class="hidden-md-and-up"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </div>

          <div>
            <div class="text-2xl font-bold tracking-tight">Park-O-cam</div>
            <div class="text-xs text-zinc-500">Entry Management</div>
          </div>
        </div>

       <v-list nav density="comfortable" class="px-2">
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

  <v-list-item
    title="Session Details"
    prepend-icon="mdi-file-document-outline"
    to="/sessiondetails"
  />

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

  <v-list-item
    title="Settings"
    prepend-icon="mdi-cog"
    to="/settings"
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

      <!-- Top App Bar -->
      <v-app-bar color="zinc-900" flat class="border-b border-zinc-700">
        <v-btn 
          v-if="!drawer"
          icon 
          @click="drawer = true"
          class="ml-2"
        >
          <v-icon>mdi-menu</v-icon>
        </v-btn>
      </v-app-bar>

      <!-- Main Content Area -->
      <v-main class="bg-zinc-950 overflow-auto">
        <router-view />   <!-- ← This is the most important line -->
      </v-main>

    </v-layout>
  </v-app>
</template>