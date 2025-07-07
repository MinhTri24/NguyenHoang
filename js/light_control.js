const ESP_IP = "192.168.1.2";

function getRelayStatus() {
    //fetch(`http://${ESP_IP}:5000/relayStatus`)
    fetch(`https://api.thingspeak.com/channels/2198101/feeds.json?api_key=4JRD7XX30PDM69FW&results=10000000`)
      .then(response => response.json())
      .then(data => {
        document.getElementById("toggle-d1").checked = data.relay0;
        document.getElementById("toggle-d2").checked = data.relay1;
        document.getElementById("toggle-d3").checked = data.relay2;
        document.getElementById("toggle-d4").checked = data.relay3;
      })
      .catch(error => console.error(error));
  }
  
// Fetch the relay status initially
getRelayStatus();

function controlRelay(relay, state) {
    fetch(`http://${ESP_IP}:5000/relay?relay=${relay}&state=${state}`)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.error(error));
}

document.getElementById("toggle-d1").addEventListener("change", (e) => {
    const state = e.target.checked;
    controlRelay(0, state ? "off" : "on");
});

document.getElementById("toggle-d2").addEventListener("change", (e) => {
    const state = e.target.checked;
    controlRelay(1, state ? "off" : "on");
});

document.getElementById("toggle-d3").addEventListener("change", (e) => {
    const state = e.target.checked;
    controlRelay(2, state ? "off" : "on");
});

document.getElementById("toggle-d4").addEventListener("change", (e) => {
    const state = e.target.checked;
    controlRelay(3, state ? "off" : "on");
});
