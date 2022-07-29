const express = require('express');
const app = express();
const {WebhookClient} = require('dialogflow-fulfillment');


const port = process.env.PORT || 3000

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.post('/webhook', express.json(),  function (req, res) {
    const agent = new WebhookClient({ request:req, response:res });
    console.log('Dialogflow Request headers: ' + JSON.stringify(request.headers));
    console.log('Dialogflow Request body: ' + JSON.stringify(request.body));
   
    function welcome(agent) {
      agent.add(`Welcome to my agent!`);
    }
   
    function fallback(agent) {
      agent.add(`I didn't understand`);
      agent.add(`I'm sorry, can you try again?`);
    }
    function pedido(agent) {
      agent.add(`Respuesta enviado desde el webhook`);
     
    }
  
    
    let intentMap = new Map();
    intentMap.set('Default Welcome Intent', welcome);
    intentMap.set('Default Fallback Intent', fallback);
    intentMap.set('pedido', pedido);
    // intentMap.set('your intent name here', yourFunctionHandler);
    // intentMap.set('your intent name here', googleAssistantHandler);
    agent.handleRequest(intentMap);
})

app.listen(port, ()=> console.log(`Servidor funcionado en http://localhost:${port}`));