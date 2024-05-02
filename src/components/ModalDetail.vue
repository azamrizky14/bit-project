<template>
  <div>
    <bv-modal v-model="modalVisible" title="Modal Title">
      <p>Modal Content</p>
      <p>Received Data: {{ dataFromParent }}</p>
      <button @click="hideModal">Close</button>
    </bv-modal>
    
  </div>
</template>

<script>
export default {
  props: {
    showModal: {
      type: Boolean,
      required: true,
    },
    dataFromParent: {
      type: String, // Change the type according to the data type you are passing
      required: true,
    },
  },
  data() {
    return {
      modalVisible: false,
    };
  },
  watch: {
    showModal(newValue) {
      this.modalVisible = newValue;
    },
    dataFromParent(newValue) {
      // Update the data from parent whenever it changes
      console.log('Data from parent updated:', newValue);
    },
  },
  methods: {
    hideModal() {
      this.modalVisible = false;
    },
  },
};
</script>
