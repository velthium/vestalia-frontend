async function Add(content) {
  const jsonData = {
    content
  };

  const formData = new FormData();
  formData.append("json_data", JSON.stringify(jsonData));
  try {
    const params = new URLSearchParams({
      recursive: true, // Example: add directory paths recursively
      chunker: "size-262144", // Example: chunking algorithm
      cidVersion: 1, // Example: CID version
      hash: "sha2-256", // Example: hash function to use
      pin: true, // Example: pinning locally
      quiet: true
    });

    const response = await fetch(`https://ipfs.desmos.network/api/v0/add?${params.toString()}`, {
      method: "POST",
      body: formData
    });

    if (!response.ok) {
      throw new Error(`Erreur lors de la demande: ${response.statusText}`);
    }

    const responseData = await response.json();

    return responseData;
  } catch (error) {
    console.error("Erreur lors du téléchargement du fichier :", error);
  }
};

export default Add;
