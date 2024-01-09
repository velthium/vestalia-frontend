import DesmosProfilCreator from "../components/DesmosProfilCreator.jsx";
import PageTitle from "../components/PageTitle.jsx";
import React from "react"

function ConnectPage() {
    return(
        <div>
            <PageTitle title="Profil page" />
            <DesmosProfilCreator />
        </div>
    );
}

export default ConnectPage;