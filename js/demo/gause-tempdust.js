document.addEventListener("DOMContentLoaded", function () {
    // Set up options for the temperature gauge
    var temperatureGaugeOptions = {
        value: 0,
        min: 0,
        max: 100,
        title: "Temperature",
        label: "°C",
        decimals: 4, // Specify the number of decimal places
//        width: 200,
//        height: 200,
        customSectors: [
        {
            color: "#000000",
            lo: 0,
            hi: 50,
        },
        ],
        relativeGaugeSize: true,
    };

    // Initialize the temperature gauge with the options
    var temperatureGauge = new JustGage({
        id: "temperature-gauge",
        options: temperatureGaugeOptions,
    });

    // Set up options for the dust gauge
    var dustGaugeOptions = {
        value: 0,
        min: 0,
        max: 100,
        title: "Dust",
        label: "µg/m³",
        customSectors: [
        {
            color: "#000000",
            lo: 0,
            hi: 100,
        },
        ],
        relativeGaugeSize: true,
    };
    // Initialize the dust gauge with the options
    var dustGauge = new JustGage({
        id: "dust-gauge",
        options: dustGaugeOptions,
    });
    var tempPi4Options = {
        value: 0,
        min: 0,
        max: 100,
        title: "Dust",
        label: "µg/m³",
        customSectors: [
        {
            color: "#000000",
            lo: 0,
            hi: 100,
        },
        ],
        relativeGaugeSize: true,
    };
    // Initialize the Pi4 gauge gauge with the options
    var temp1 = new JustGage({
        id: "temppi4-gauge",
        options: tempPi4Options,
    });
    function updateTemp1() {
        async function fetchData() {
          const url = "http://192.168.1.16:3000/tanthuan/lss";
          const response = await fetch(url);
          const data = await response.json();          
          return data;
        }   
        fetchData()
          .then((data) => {
            const feeds = data;
            const nhietdo = feeds[0];
            if (nhietdo && nhietdo.Nhietdo1 !== undefined) {
                temp1.refresh(nhietdo.Nhietdo1);
            }
            // const filteredDataPi4 = feeds.filter(feed => feed.field1);
            // const Pi4Temp         = filteredDataPi4.map(feed => feed.field4);
            // temppi4Gauge.refresh(Pi4Temp);
          })
          .catch((error) => {
            console.error(error);
          });
      }
    updateTemp1();
    setInterval(() => {
        updateTemp1();
      }, 2000);
      
  });
  