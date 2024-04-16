import AlexandriaLibrary from "@/assets/images/AlexandriaLibrary.webp";
import React from "react";

function NotFound() {
  return (
    <div className="h-100 d-flex flex-column align-items-center justify-content-center">
      <div className="post-buttons">
        <h1 className="h1">404 - Page not found.</h1>
        <img src={AlexandriaLibrary} alt="Library of Alexandria" />
      </div>
    </div>
  );
}

export default NotFound;
