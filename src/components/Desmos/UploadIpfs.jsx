import React, { useState } from 'react';

async function UploadIpfs(content) {

    const formData = new FormData();
    formData.append('file', content);

    try {

      const params = new URLSearchParams({
        quiet: true,
      });

      const response = await fetch(`https://ipfs.desmos.network/api/v0/add?${params.toString()}`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Erreur lors de la demande: ${response.statusText}`);
      }

      const responseData = await response.json();

      return responseData;

    } catch (error) {
      console.error('Erreur lors du téléchargement du fichier :', error);
    }

};

export default UploadIpfs;