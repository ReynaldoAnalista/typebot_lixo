const dataEntries = [
  ["33,44,PLÁSTICO,https://s3.typebot.io/public/tmp/cm33b44ls0001uhwuytcr54el/golias.jpg,FUNCIONARIO 01,EMPRESA RED,BETA ,06/11/2024 13:15,ID-151917"]
  ];
  

const sendData = async (entries) => {
    for (const entry of entries) {
      const [valorPesado, quantidade, tipo, imagem, funcionario, unidade, cliente, data, idpesagem] = entry;
  
      const payload = {
        FUNCIONARIO: funcionario,
        CLIENTE: cliente,
        DATA: data,
        UNIDADE: unidade,
        QTD_SACOS: quantidade,
        VALOR_PESADO: valorPesado,
        TIPO: tipo,
        IMAGEM: imagem,
        IDPESAGEM: idpesagem
      };
  
      try {
        const response = await fetch("https://testrey.tech/set_data", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(payload)
        });
  
        if (response.ok) {
          // Tenta analisar como JSON, caso contrário, captura o texto
          let data;
          try {
            data = await response.json();
          } catch (error) {
            data = await response.text(); // Captura como texto se não for JSON válido
          }
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
  