import { defineStore } from "pinia";

export const useSessionStore = defineStore("sessionStore", {
  state: () => ({
    sessions: [],
  }),

  actions: {
    loadFromStorage() {
      const stored = JSON.parse(localStorage.getItem("activeSessions")) || [];

      this.sessions = stored;
    },

    addSession(session) {
      this.sessions.push(session);
      this.saveToStorage();
    },

    saveToStorage() {
      localStorage.setItem("activeSessions", JSON.stringify(this.sessions));
    },
  },
});
