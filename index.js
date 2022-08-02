const express = require("express");
const app = express();
const { WebhookClient } = require("dialogflow-fulfillment");

const port = process.env.PORT || 3000;

app.get("/", function (req, res) {
  res.send("Hello World");
});

app.post("/webhook", express.json(), function (req, res) {
  const agent = new WebhookClient({ request: req, response: res });
  //console.log('Dialogflow Request headers: ' + JSON.stringify(req.headers));
  //console.log('Dialogflow req body: ' + JSON.stringify(req.body.queryResult.outputContexts[0].parameters));
  const promo = req.body.queryResult.outputContexts[0].parameters.promo[0];
  const nombre = req.body.queryResult.outputContexts[0].parameters.nombre[0];
  const direccion = req.body.queryResult.outputContexts[0].parameters.direccion[0];
  console.log({
    nombre: nombre,
    direccion: direccion,
    promo: `Oferta numero ${promo}`,
  });

  function welcome(agent) {
    agent.add(`Welcome to my agent!`);
  }

  function fallback(agent) {
    agent.add(`I didn't understand`);
    agent.add(`I'm sorry, can you try again?`);
  }
  function pedido(agent) {
    agent.add(`Muchas gracias por tu compra ${nombre}. Tu pedido sera enviado dentro de las siguientes 24hs, en el horario de 8 a 12hs`);
  }

  let intentMap = new Map();
  intentMap.set("Default Welcome Intent", welcome);
  intentMap.set("Default Fallback Intent", fallback);
  intentMap.set("pedido.cofirma.si", pedido);
  // intentMap.set('your intent name here', yourFunctionHandler);
  // intentMap.set('your intent name here', googleAssistantHandler);
  agent.handleRequest(intentMap);
});

app.listen(port, () =>
  console.log(`Servidor funcionado en http://localhost:${port}`)
);
