import DesmosProfilCreator from "../components/Desmos/ProfilCreator.jsx";
import PageTitle from "../components/Design/PageTitle.jsx";
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