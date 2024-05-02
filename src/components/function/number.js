
export const formatNumber = (value) => {
    const floatValue = parseFloat(value);
    if (isNaN(floatValue)) {
      return value; // Return the original string value if it's not a valid number
    }
    const parts = floatValue.toFixed(2).toString().split(',');
    const wholePart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')

    if (parts.length > 1) {
      return `${wholePart},${parts[1]}`;
    } else {
      return wholePart;
    }
}
export const formatNumberInt = (value) => {
  const floatValue = value.toString();
  if (isNaN(floatValue)) {
    return value; // Return the original string value if it's not a valid number
  }
  const wholePart = floatValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',')

  return wholePart;
}
export const inputNumberOnly = (value) => {
  // Get a reference to the input element

          // Remove any characters that are not numeric or periods
          this.ipAddress = this.ipAddress.replace(/[^0-9.]/g, '');

          // Ensure that there are no consecutive periods
          this.ipAddress = this.ipAddress.replace(/(\.\.)+/g, '');
}