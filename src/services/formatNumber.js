// // main.js or where you configure your Vue app
import Vue from 'vue';

Vue.directive('format-number', {
  bind(el) {
    el.addEventListener('input', function (event) {
      const inputValue = event.target.value;

      // Check if the input is empty
      if (inputValue === '') {
        event.target.value = ''; // Set it to an empty string
        event.target.dispatchEvent(new Event('input')); // Update the v-model value
        return;
      }

      // Remove any non-numeric and non-decimal characters
      const numericValue = parseFloat(inputValue.replace(/[^0-9.]/g, ''));

      // Check if parsing resulted in NaN (e.g., when input contains only non-numeric characters)
      if (isNaN(numericValue) || numericValue === 0) {
        event.target.value = ''; // Set it to an empty string
      } else {
        // Format the numeric value with thousand separators
        const formattedValue = numericValue.toLocaleString('en-US');
        event.target.value = formattedValue;
      }
      // Update the v-model value with the numeric value
      event.target.dispatchEvent(new Event('input'));
    });
  },
});
