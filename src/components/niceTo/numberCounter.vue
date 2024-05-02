<template>
    <div class="counter">{{ currentFormattedNumber }}</div>
  </template>
  
  <script>
  export default {
    props: {
      targetNumber: {
        type: Number,
        required: true,
      },
      animationDuration: {
        type: Number,
        default: 1000,
      },
    },
    computed: {
      currentFormattedNumber() {
        return this.currentNumber.toLocaleString('en-US', {
          useGrouping: true, // Enables thousands separators
          minimumFractionDigits: 0, // Minimum number of decimal places
          maximumFractionDigits: 2, // Maximum number of decimal places
        decimalSeparator: '.', // Use dot as the decimal separator
        groupingSeparator: ',', // Use comma as the thousands separator
        });
      },
    },
    watch: {
      targetNumber: {
        handler(newValue) {
          this.startAnimation(newValue);
        },
        immediate: true,
      },
    },
    methods: {
      startAnimation(target) {
        let startTime;
        const animate = (timestamp) => {
          if (!startTime) startTime = timestamp;
  
          const progress = timestamp - startTime;
          const increment = (target * (progress / this.animationDuration)).toFixed(0);
  
          if (increment >= target) {
            this.currentNumber = target;
          } else {
            this.currentNumber = increment;
            requestAnimationFrame(animate);
          }
        };
  
        requestAnimationFrame(animate);
      },
    },
    data() {
      return {
        currentNumber: 0,
      };
    },
  };
  </script>
  
  <style>
  </style>
  