<template>
    <v-card
                max-width="520"
                class="pa-4 rounded-lg elevation-8"
                style="
                  background: #050b1f;
                  border: 1px solid #1e3a8a;
                  color: white;
                "
              >
                <!-- Header -->
                <div class="d-flex align-center mb-4" style="gap: 8px">
                  <div
                    style="
                      width: 4px;
                      height: 16px;
                      background: #3b82f6;
                      border-radius: 2px;
                    "
                  ></div>

                  <span
                    style="
                      text-transform: uppercase;
                      letter-spacing: 2px;
                      font-size: 11px;
                      font-weight: 600;
                      color: #93c5fd;
                    "
                  >
                    Parking Capacity
                  </span>
                </div>

                <!-- Capacity -->
                <div class="d-flex align-end mb-3" style="gap: 8px">
                  <span
                    style="font-size: 28px; font-weight: 800; line-height: 1"
                  >
                    40
                  </span>

                  <span
                    style="
                      font-size: 11px;
                      font-weight: 700;
                      color: #4ade80;
                      margin-bottom: 2px;
                    "
                  >
                    /70 SLOT
                  </span>
                </div>

                <!-- Progress -->
                <v-progress-linear
                  :model-value="57"
                  height="8"
                  rounded
                  color="green"
                  bg-color="black"
                  class="mb-3"
                ></v-progress-linear>

                <!-- Footer -->
                <div
                  class="d-flex justify-space-between"
                  style="
                    font-size: 10px;
                    letter-spacing: 1px;
                    text-transform: uppercase;
                  "
                >
                  <span style="color: #a1a1aa">22 % Occupied</span>

                  <span style="color: #4ade80; font-weight: 600">
                    Entry Allowed
                  </span>
                </div>
              </v-card>
</template>