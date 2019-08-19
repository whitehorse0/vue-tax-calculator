<template>
  <div>
    <table>
      <tr class="table-head">
        <th class="name">Name</th>
        <th class="value">Value</th>
      </tr>
      <tr v-for="result in results.detail" :key="result.label">
        <td style="float: left;">{{ result.label }}</td>
        <td class="value">
          {{ result.value }}
        </td>
      </tr>
      <tr class="table-head">
        <th class="name">Kesimpulan</th>
      </tr>
      <tr v-for="result in results.schema" :key="result.label">
        <td style="float: left;">{{ result.label }}</td>
        <td class="value">
          {{ result.value }}
        </td>
      </tr>
      <tr class="table-head">
        <th class="name">Penghitungan PPh Pasal 21</th>
      </tr>
      <tr v-for="result in results.calculation" :key="result.label">
        <td style="float: left;">{{ result.label }}</td>
        <td class="value">
          {{ result.value }}
        </td>
      </tr>
      <tr class="table-head">
        <th class="name">PPH Terhutang</th>
      </tr>
      <tr v-for="(item, index) in results.pph" :key="index">
        <td style="float: left;">{{ item.label }} %</td>
        <td class="value">
          {{ item.value }}
        </td>
      </tr>
    </table>
    

    <button v-on:click="handleBackClick" class="btn-back">
      Back
    </button>
  </div>
</template>

<script>
export default {
  name: 'Result',
  props: {
    results: Object
  },
  methods: {
    handleBackClick: function() {
      this.$emit('clearCalculations');
    }
  }
};
</script>

<style lang="scss" src="./../assets/styles/Result.scss" />
