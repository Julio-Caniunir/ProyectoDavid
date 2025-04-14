const { io } = require("socket.io-client");

exports.handler = async function (event, context) {
  return new Promise((resolve, reject) => {
    const socket = io("http://bc-api.estelarbet.net", {
      transports: ["polling"], // importante para evitar problemas con WebSocket en serverless
    });

    socket.on("connect", () => {
      console.log("🔌 Conectado al servidor original");
    });

    // Escuchamos el evento con los datos que necesitás
    socket.on("campaign-1", (members) => {
      console.log("🎁 Recibidos miembros desde campaña");
      socket.disconnect();

      return resolve({
        statusCode: 200,
        body: JSON.stringify(members),
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      });
    });

    // Manejo de error
    socket.on("connect_error", (err) => {
      console.error("❌ Error de conexión:", err.message);
      socket.disconnect();

      return resolve({
        statusCode: 500,
        body: JSON.stringify({ error: "Error al conectar al backend" }),
      });
    });

    // Timeout de seguridad (10s)
    setTimeout(() => {
      console.error("⏰ Timeout esperando data de Socket.io");
      socket.disconnect();

      return resolve({
        statusCode: 504,
        body: JSON.stringify({ error: "Timeout al conectar al backend" }),
      });
    }, 10000);
  });
};
