<template>
  <form @submit.prevent="handleSubmit">
    <Input
      type="input"
      label="Salary"
      validation="required|numeric"
      v-model="inputs.incomeValue"
      @input="input"
    />

    <Input
      type="dropdown"
      label="Personal Profile"
      validation="required"
      :options="options.ptkp"
      v-model="inputs.ptkp"
    />

    <button class="submit-btn" :disabled="!isEnabled" type="submit">
      Calculate!
    </button>
  </form>
</template>

<script>
import Input from './Input';

export default {
  name: 'InputForm',
  components: {
    Input
  },
  data() {
    return {
      inputs: {
        incomeValue: '',
        ptkp: ''
      },
      options: {
        ptkp: [
          { label: 'Single', value: 'single' },
          { label: 'Married', value: 'married' },
          { label: 'Married with 1 Dependant', value: 'married_with_1' },
          { label: 'Married with 2 Dependant', value: 'married_with_2' },
          { label: 'Married with 3 Dependant', value: 'married_with_3' }
        ]
      }
    };
  },

  computed: {
    isEnabled: function() {
      return !!Object.values(this.inputs).every(Boolean);
    }
  },
  methods: {
    input: function(input) {
      if (input.type === 'input') {
        this.incomeValue = input.value;
      }
    },
    handleSubmit: function() {
      const { ptkp } = this.inputs;
      const inputValues = {
        ...this.inputs,
        ptkp: ptkp.value
      };
      this.$emit('submitted', inputValues);
    }
  }
};
</script>
<style lang="scss" src="./../assets/styles/InputForm.scss" />
