const dataEntries = [
    ["11", "22", "PLÁSTICO", "https://s3.typebot.io/public/tmp/cm33b44ls0001uhwuytcr54el/DINHEIRO.jpg"],
    ["33", "55", "PAPEL MISTO", "https://s3.typebot.io/public/tmp/cm33b44ls0001uhwuytcr54el/chave%20binance.png"]
  ];
  
  const sendData = async (entries) => {
    for (const entry of entries) {
      const [valorPesado, quantidade, tipo, imagem] = entry;
  
      const payload = {
        FUNCIONARIO: "PEDRO",
        CLIENTE: "CLIENT01",
        DATA: "01/08/2024",
        UNIDADE: "CENTRO",
        QTD_SACOS: quantidade,
        VALOR_PESADO: valorPesado,
        TIPO: tipo,
        IMAGEM: imagem,
        IDPESAGEM: `ID-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`
      };
  
      try {
        const response = await fetch("https://testrey.tech/set_data", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "User-Agent": "insomnia/10.1.1"
          },
          body: JSON.stringify(payload)
        });
  
        if (response.ok) {
          const data = await response.json();
          console.log("Data sent successfully:", data);
        } else {
          console.error("Error sending data:", response.status, response.statusText);
        }
      } catch (error) {
        console.error("Error sending data:", error);
      }
    }
  };
  
  sendData(dataEntries);
  