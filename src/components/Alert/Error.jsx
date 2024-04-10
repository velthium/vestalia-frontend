import PropTypes from "prop-types";
import Swal from "sweetalert2";
import React from "react";

const Error = (props) => {
  const displayError = () => {
    let errorMessage = "An unexpected error occurred";

    if (typeof props.error.message === "string") {
      if (props.error.message.includes("has already been created")) {
        errorMessage = "Account with this DTag already exists";
      } else if (props.error.message.includes("it should match the following regEx")) {
        errorMessage = "Please enter valid characters";
      } else if (props.error.message.includes("cannot be less")) {
        errorMessage = "Profile dtag cannot be less than 6 characters";
      } else if (props.error.message.includes("Request rejected")) {
        errorMessage = "Error: Request rejected by the user";
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
    if (props.error) {
      displayError();
    }
  }, [props.error]);

  return null;
};

Error.propTypes = {
  error: PropTypes.object.isRequired
};

export default Error;
