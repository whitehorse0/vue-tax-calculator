<template>
  <div id="app">
    <main>
      <Panel class="calculator-panel" headline="Income Tax Calculator">
        <template>
          <transition
            name="alert-in"
            mode="out-in"
            enter-active-class="animated fadeIn"
            leave-active-class="animated fadeOut"
          >
            <InputForm v-if="!resultsCalculated" @submitted="submitted" />
            <Result
              v-if="resultsCalculated"
              @clearCalculations="clearCalculations"
              :results="calculations"
            />
          </transition>
        </template>
      </Panel>
    </main>

    <!-- <img alt="Vue logo" src="./assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" /> -->
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue';
import Panel from './components/Panel.vue';
import InputForm from './components/InputForm';
import Result from './components/Result';
import { calcTaxes } from './calculate';

export default {
  name: 'app',
  components: {
    Panel,
    InputForm,
    Result
  },
  data() {
    return {
      calculations: {}
    };
  },
  computed: {
    resultsCalculated: function() {
      return Object.keys(this.calculations).length !== 0;
    }
  },
  methods: {
    submitted: function(input) {
      const calcValues = calcTaxes(input);

      this.calculations = {
        detail: {
          grossIncome: {
            label: 'Gross Salary',
            value: calcValues.gaji_per_bulan
          },
          salaryPerYear: {
            label: 'Gaji/Tahun',
            value: calcValues.gaji_per_tahun
          },
          ptkp: { label: 'Tanggungan', value: calcValues.ptkp }
        },
        schema: {
          taxPerTahun: {
            label: 'PPh Pasal 21 Terutang Pajak/Tahun',
            value: calcValues.tax_per_tahun
          },
          taxPerBulan: {
            label: 'PPh Pasal 21 Terutang Pajak/Bulan',
            value: calcValues.tax_per_bulan
          },
          totalGaji: {
            label: 'Gaji setalah PPH/Tahun',
            value: calcValues.total_gaji
          },
          totalGajiPerbulan: {
            label: 'Gaji setalah PPH/Bulan',
            value: calcValues.total_gaji_perbulan
          },
          ratio: { label: 'Ratio (pajak : gaji)', value: calcValues.ratio }
        },
        calculation: {
          bruto: { label: 'Penghasilan Bruto Setahun', value: calcValues.bruto },
          biayaJabatan: {
            label: 'Biaya Jabatan Setahun',
            value: calcValues.biayaJabatan
          },
          netto: { label: 'Penghasilan Neto Setahun/Disetahunkan', value: calcValues.netto },
          ptkp: { label: 'Penghasilan Tidak Kena Pajak', value: calcValues.ptkp },
          pkp: { label: 'PKP atas Penghasilan Teratur Setahun', value: calcValues.pkp }
        },
        pph: calcValues.test
      };
    },
    clearCalculations: function() {
      this.calculations = {};
    }
  }
};
</script>
<style lang="scss" src="./assets/styles/App.scss" />
