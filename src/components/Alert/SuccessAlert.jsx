import React from 'react';
import Swal from 'sweetalert2';

const SuccessAlert = ({ success }) => {
  const displaySuccess = () => {
    let successMessage = "Profile created/updated";

    if (success.code === 0) {
      // Transaction réussie
      const successMessage = "Transaction réussie. Hash: " + success.transactionHash;
      // Afficher le message de succès ou le stocker dans l'état pour l'affichage
      console.log(successMessage);
      // Vous pouvez également explorer 'response.rawLog' pour extraire plus de détails si nécessaire
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
