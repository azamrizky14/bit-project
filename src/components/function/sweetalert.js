import Swal from 'sweetalert2';

// Define the function to show a success alert
export const alertRouter = async (routes) => {
  const swalInstance = Swal.mixin({
    allowOutsideClick: false, // Disable closing on overlay click
    allowEscapeKey: false,    // Disable closing with Esc key
    showCancelButton: true,   // Show cancel button
    cancelButtonText: 'Cancel',
    showConfirmButton: true,
    confirmButtonText: 'Ok'
  });

  const result = await swalInstance.fire({
    title: 'Berhasil!',
    text: 'Data berhasil ditambahkan',
    icon: 'success',
  });

  // Check if the dialog was confirmed (Ok button clicked)
  if (result.isConfirmed) {
    // Perform your desired action when the Ok button is clicked
    alert('Ok button was clicked.');
  } else if (result.dismiss === Swal.DismissReason.cancel) {
    // Perform your desired action when the cancel button is clicked
    alert('Cancel button was clicked.');
  }
};
