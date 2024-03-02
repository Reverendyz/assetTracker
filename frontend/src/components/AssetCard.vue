<template>
  <div class='hello'>
    <v-card
      append-icont='mdi-open-in-new'
      class='mx-auto my-8'
      :title=name
      :subtitle=symbol
      :text=value
      link
      />
  </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'AssetCard',
  props: {
    name: String,
    symbol: String,
    value: Number
  },
});
</script> 
