import PropTypes from "prop-types";
import React from "react";

function Title(props) {
  return (
      <h1 className="ms-3 h4 my-3 custom-orange">{props.title}</h1>
  );
}

Title.propTypes = {
  title: PropTypes.string.isRequired
};

export default Title;
