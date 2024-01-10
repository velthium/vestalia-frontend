import React from 'react';
import Swal from 'sweetalert2';

const SuccessAlert = ({ error }) => {
  const displayError = () => {
    let errorMessage = "An unexpected error occurred";

    console.log({ error })

    if (response.code === 0) {
      // Transaction réussie
      const successMessage = "Transaction réussie. Hash: " + response.transactionHash;
      // Afficher le message de succès ou le stocker dans l'état pour l'affichage
      console.log(successMessage);
      // Vous pouvez également explorer 'response.rawLog' pour extraire plus de détails si nécessaire
    }

    Swal.fire({
      icon: "success",
      title: errorMessage,
      showConfirmButton: false,
      timer: 1500
    });
  };

  React.useEffect(() => {
    if (error) {
      displayError();
    }
  }, [error]);

  return null;
};

export default SuccessAlert;
