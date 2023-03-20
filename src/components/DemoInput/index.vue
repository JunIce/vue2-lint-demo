<template>
  <div class="demo-input">
    <label :for="label">{{ label }}</label>
    <input type="text" :id="label" v-model="value" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api";
export default defineComponent({
  name: "DemoInput",
  props: {
    label: {
      type: String,
    },
  },
  data() {
    return {
      value: "",
    };
  },
});
</script>
