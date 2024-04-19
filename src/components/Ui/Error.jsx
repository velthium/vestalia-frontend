import AlexandriaLibrary from "@/assets/images/AlexandriaLibrary.webp";
import PropTypes from "prop-types";
import React from "react";

function Error(props) {
  return (
    <div className="h-100 d-flex flex-column align-items-center justify-content-center">
    <div className="">
      <p className="h2 p-5">{ props.message} </p>
      <img src={AlexandriaLibrary} alt="Library of Alexandria" />
    </div>
  </div>
  );
}

Error.propTypes = {
  message: PropTypes.string.isRequired
};

export default Error;
