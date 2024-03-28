import PropTypes from "prop-types";
import Swal from "sweetalert2";
import React from "react";

const SuccessAlert = ({ success }) => {
  const displaySuccess = () => {
    let successMessage = "";

    if (success.code === 0) {
      successMessage = "Successful transaction. Hash: " + success.transactionHash;
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

SuccessAlert.propTypes = {
  success: PropTypes.object.isRequired
};

export default SuccessAlert;
