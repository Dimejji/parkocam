<script setup>
import { useRouter } from "vue-router";
import { useSessionStore } from "../stores/SessionStore";

const router = useRouter();
const store = useSessionStore();

const payWithCash = () => {
  const newSession = {
    plateNumber: "KSJ 990 BH",
    paymentMethod: "Cash",
    status: "Paid",
    paidAt: new Date(),
  };

  store.addSession(newSession);

  router.push("/activesession");
};
</script>

<template>
  <v-card class="bg-[#0f172a] rounded-2xl" flat>
    <!-- Header -->
    <v-card-title
      class="d-flex align-center border-b border-zinc-700 px-6 py-4"
    >
      <v-icon color="primary" class="mr-3">mdi-cash-multiple</v-icon>
      <span class="text-lg font-semibold">BILLING ENGINE</span>
    </v-card-title>

    <v-card-text class="pa-6">
      <!-- Session Duration -->
      <div class="text-center mb-8">
        <div class="text-xs uppercase tracking-widest text-zinc-400 mb-1">
          SESSION DURATION
        </div>
        <div class="text-5xl font-bold text-white">3H 18M</div>
        <div class="text-sm text-zinc-500 mt-1">SESSION DURATION</div>
      </div>

      <!-- Billing Breakdown -->
      <v-card class="bg-[#1a2338] mb-6" flat>
        <div
          class="px-6 py-4 border-b border-zinc-700 text-sm font-medium text-zinc-300"
        >
          GRACE PERIOD (FIRST 15 MIN)
        </div>

        <div class="divide-y divide-zinc-700">
          <div class="px-6 py-4 text-sm flex justify-between items-center">
            <span class="text-zinc-300">HOUR 1 (15 MIN - 1HR 15MIN)</span>
          </div>
          <div class="px-6 py-4 text-sm flex justify-between items-center">
            <span class="text-zinc-300">HOUR 2 (1HR 15 MIN - 2HR 15MIN)</span>
          </div>
          <div class="px-6 py-4 text-sm flex justify-between items-center">
            <span class="text-zinc-300">HOUR 3 (2HR 15 MIN - 3HR 15MIN)</span>
          </div>
          <div
            class="px-6 py-4 text-sm flex justify-between items-center text-amber-400"
          >
            <span>+3 EXTRA MIN → ROUNDED UP</span>
          </div>
        </div>
      </v-card>

      <!-- Total Amount -->
      <div class="bg-[#1a2338] rounded-xl p-6 mb-6">
        <div class="flex justify-between items-end">
          <div class="text-sm font-medium text-zinc-400">TOTAL AMOUNT DUE</div>
          <div class="text-right">
            <div class="text-4xl font-bold text-white">₦4,500</div>
            <div class="text-xs text-emerald-400">FULLY CALCULATED</div>
          </div>
        </div>
      </div>

      <!-- Billing Rule -->
      <div
        class="bg-[#1e2937] text-xs text-zinc-400 p-4 rounded-xl leading-relaxed mb-8"
      >
        BILLING RULE : ANY EXTRA TIME BEYOND A FULL HOUR = NEW BILLING CYCLE.
        ROUND UP ALWAYS.
      </div>

      <!-- Payment Methods -->
      <div class="text-xs uppercase tracking-widest text-zinc-400 mb-4">
        SELECT PAYMENT METHOD
      </div>

      <div class="d-flex gap-4">
        <!-- Cash -->
        <v-btn
          variant="outlined"
          color="white"
          size="large"
          class="flex-1 h-14 text-base font-medium border-2 mr-10"
          @click="payWithCash"
        >
          <v-icon left>mdi-cash</v-icon>
          CASH
        </v-btn>

        <!-- Quidly -->
        <v-btn
          color="#00ff9d"
          size="large"
          class="flex-1 h-14 text-base font-semibold text-black"
          variant="flat"
        >
          <span class="font-bold tracking-wider">quidly</span>
        </v-btn>
      </div>
    </v-card-text>
  </v-card>
</template>
