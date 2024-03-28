import PropTypes from "prop-types";
import React from "react";

function PageTitle(props) {
    return (
        <h1 className="ms-3 h4 my-3 text-success">{props.title}</h1>
    );
}

PageTitle.propTypes = {
    title: PropTypes.object.isRequired
};

export default PageTitle;
