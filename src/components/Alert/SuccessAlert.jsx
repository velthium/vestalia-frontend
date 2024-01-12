import React from 'react';
import Swal from 'sweetalert2';

const SuccessAlert = ({ success }) => {
  const displaySuccess = () => {
    let successMessage = "";

    if (success.code === 0) {
      successMessage = "Transaction réussie. Hash: " + success.transactionHash;
    }

    Swal.fire({
      icon: "success",
      title: successMessage,
      showConfirmButton: true,
      timer: 1500
    });
  };

  React.useEffect(() => {
    if (success) {
      displaySuccess();
    }
  }, [success]);

  return null;
};

export default SuccessAlert;
