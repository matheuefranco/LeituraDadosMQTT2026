const mqtt_server = "56b1021e9fab48e28a4ef8a453d81e18.s1.eu.hivemq.cloud";
const mqtt_port = 8884;
const mqtt_user = "matheusefranco";
const mqtt_password = "IFMachado2026*";
const topic = "ifsuldeminas/dht11/temperatura";

const client = mqtt.connect(`wss://${mqtt_server}:${mqtt_port}/mqtt`, {
    username: mqtt_user,
    password: mqtt_password
});

client.on("connect", () => {
    console.log("Conectado ao broker MQTT");
    document.getElementById("status").innerText = "Conectado";
    document.getElementById("status").className = "badge bg-success";
    // Inscreve no tópico
    client.subscribe(topic, (erro) => {
        if (erro) {
            console.log("Erro ao inscrever no tópico" , erro);
        } else {
            console.log("Inscrito no tópico:", topic);
        }
    });
});

client.on("message", (topic, message) => {
    const texto = message.toString();
    console.log("Mensagem recebida:", texto);
    const dataHora = new Date().toLocaleString();
    document.getElementById("mensagem").innerText = `${texto} (${dataHora})`;
});


