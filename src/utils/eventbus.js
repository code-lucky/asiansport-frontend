// eventBus.js
import { ref } from 'vue';

const bus = ref(new Map());

export const on = (event, handler) => {
  if (!bus.value.has(event)) {
    bus.value.set(event, []);
  }
  bus.value.get(event).push(handler);
};

export const off = (event, handler) => {
  if (!bus.value.has(event)) return;
  const handlers = bus.value.get(event);
  const index = handlers.indexOf(handler);
  if (index > -1) {
    handlers.splice(index, 1);
  }
};

export const emit = (event, ...args) => {
  if (!bus.value.has(event)) return;
  const handlers = bus.value.get(event);
  handlers.forEach(handler => handler(...args));
};
