import Swal from 'sweetalert2';
import React from 'react';

const ErrorAlert = ({ error }) => {
  const displayError = () => {
    let errorMessage = "An unexpected error occurred";

    console.log({ error })

    if (typeof error == 'string') {
      if (error.includes("has already been created")) {
        errorMessage = "Account with this DTag already exists";
      }
      else if (error.includes("it should match the following regEx")) {
        errorMessage = "Please enter valid characters";
      }
      else if (error.includes("cannot be less")) {
        errorMessage = "Profile dtag cannot be less than 6 characters";
      }
    }

    Swal.fire({
      icon: "error",
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

export default ErrorAlert;
