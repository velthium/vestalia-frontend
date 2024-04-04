import PropTypes from "prop-types";
import Swal from "sweetalert2";
import React from "react";

const Success = (props) => {
  const displaySuccess = () => {
    let successMessage = "";

    if (props.success.code === 0) {
      successMessage = "Successful transaction. Hash: " + props.success.transactionHash;
    }

    Swal.fire({
      icon: "success",
      title: successMessage,
      showConfirmButton: true,
      timer: 1500
    });
  };

  React.useEffect(() => {
    if (props.success) {
      displaySuccess();
    }
  }, [props.success]);

  return null;
};

Success.propTypes = {
  success: PropTypes.object.isRequired
};

export default Success;
