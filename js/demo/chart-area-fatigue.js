//function updateFatigueChart() {
//  async function fetchData() {
//      const url = 'https://api.thingspeak.com/channels/2198101/feeds.json?api_key=4JRD7XX30PDM69FW&results=10000000';
//      const response = await fetch(url);
      // wait until the request has been completed
//      const datapoints = await response.json();
      //console.log(datapoints);
//      return datapoints
//  };    
//  fetchData().then(datapoints => {
//    const filteredData = datapoints.filter(datapoint => datapoint.times && datapoint.dust); // filters out null data
    
//    const datetime = filteredData.map(datapoint => datapoint.times);
//    const dust = filteredData.map(datapoint => datapoint.dust);
    
    // console.log(datetime)
    // console.log(temp)
    
//    fatigue_config.data.labels = datetime;
//    fatigue_config.data.datasets[0].data = dust;
//    myFatigueChart.update();
//  });
  
//}
// Get Nhietdo1
// async function fetchTemperature() {
//   async function fetchData() {
//     //const url = "http://192.168.1.3:5000/actempdust";
//     const url = "http://192.168.1.16:3000/tanthuan/lss";
//     const response = await fetch(url);
//     const data = await response.json();
//     return data;
//   }  
//   fetchData()
//     .then((data) => {
//       const feeds = data; // Data contains the entire JSON response
// //        const nhietdo = feeds[feeds.length - 1]; // Assuming the data is sorted by timestamp in descending order
//       const nhietdo = feeds[0];
//       if (nhietdo && nhietdo.Nhietdo1 !== undefined) {
//         const temperatureElement = document.getElementById("Nhietdo1");
//         temperatureElement.innerHTML = `${nhietdo.Nhietdo1} ℃`
//       }

//     })
//     .catch((error) => {
//       console.error(error);
//     });
// }

// function updateFatigueChart() {
//   async function fetchData() {
//     const url = 'http://192.168.1.16:3000/tanthuan/ft';
//     const response = await fetch(url);
//     const data = await response.json();
//     return data;
//   }

//   fetchData().then((data) => {
//     // get strain1 data
//     const feeds = data;
    
//     const filteredData = feeds.filter(feed => feed.Fatigue1 && feed.Timestamp);
//     const sortedData = filteredData.sort((a, b) => a.Record - b.Record);
//     const last22Entries = sortedData.slice(-22);


//     const fatigueValues = [];
//     for (let i = 1; i <= 6; i++) {
//       const fieldKey = `fatigue${i}`;
//       const fatigueData = last22Entries.map(feed => feed[fieldKey]);
//       fatigueValues.push(fatigueData);
//     }

//     //const field5 = last22Entries.map(feed => feed.Fatigue1);
//     // Get time data and shift in to %m:%s
//     const ts_on_chart = last22Entries.map(feed => {
//       const timestamp = new Date(feed.Timestamp);
//       const hours = timestamp.getHours();
//       const minutes = timestamp.getMinutes();
//       const seconds = timestamp.getSeconds();
//       //const time = `${hours}:${minutes}:${seconds.toString().padStart(2, '0')}`;
//       const time = `${hours}:${minutes}`;
//     return time;
//     });
//      // Update chart data
//      for (let i = 0; i < fatigueValues.length; i++) {
//       myFatigueChart.config.data.datasets[i].data = fatigueValues[i];
//     }
//     myFatigueChart.config.data.labels = ts_on_chart;
//     //myFatigueChart.config.data.datasets[0].data = field5;
    
//     myFatigueChart.update();
//   });
// }
function updateFatigueChart() {
  async function fetchData() {
    const url = 'http://192.168.1.16:3000/tanthuan/ft';
    const response = await fetch(url);
    const data = await response.json();
    return data;
  }

  fetchData().then((data) => {
    const feeds = data;
    
    const sortedData = feeds.sort((a, b) => new Date(b.Timestamp) - new Date(a.Timestamp));
    const last22Entries = sortedData.slice(0, 22); // Select the first 22 entries (most recent)

    // Create arrays for fatigue values (Fatigue1 to Fatigue6)
    const fatigueValues = [];
    for (let i = 1; i <= 6; i++) {
      const fieldKey = `Fatigue${i}`;
      const fatigueData = last22Entries.map(feed => feed[fieldKey]);
      fatigueData.reverse();
      fatigueValues.push(fatigueData);
    }

    // Get time data and format it (HH:MM)
    const created_at = last22Entries.map(feed => {
      const timestamp = new Date(feed.Timestamp);
      const hours = timestamp.getUTCHours();
      const minutes = timestamp.getUTCMinutes();
      const time = `${hours}:${minutes.toString().padStart(2, '0')}`;
      return time;
    });
    // Reverse the order of created_at labels
    created_at.reverse();
    // Update chart data for each fatigue value
    for (let i = 0; i < fatigueValues.length; i++) {
      myFatigueChart.config.data.datasets[i].data = fatigueValues[i];
      myFatigueChart.config.data.datasets[i].label = `Fatigue ${i + 1}`;
    }
    myFatigueChart.config.data.labels = created_at;
    
    myFatigueChart.update();
  });
}



// automatic update chart
setInterval(function() {
  const now = new Date();
  const formattedDate = `${now.toLocaleDateString()} at ${now.toLocaleTimeString()}`;
  document.getElementById('dust-last-updated').innerHTML = `Updated ${formattedDate}`;
  updateFatigueChart()
}, 10000);
// setup 
const fatigue_data = {
  labels: ["8", "58", "48", "38", "28", "17", "7", "15", "16" , "18" , "12", "8", "58", "48", "38", "28", "17", "7", "15", "16" , "18" , "12"],
  datasets: [{
    label: 'Độ mỏi 1',
    data: [30.24, 30.24, 30.24, 30.24, 30.23, 30.24, 30.24, 30.24, 30.24, 30,24, 30.24, 30.24, 30.24, 30.24, 30.23, 30.24, 30.24, 30.24, 30.24, 30,24 ],
    backgroundColor: [
      'rgba(255, 26, 104, 0.2)',
      //'rgba(54, 162, 235, 0.2)',
      //'rgba(255, 206, 86, 0.2)',
      //'rgba(75, 192, 192, 0.2)',
      //'rgba(153, 102, 255, 0.2)',
      //'rgba(255, 159, 64, 0.2)',
      //'rgba(0, 0, 0, 0.2)'
    ],
    borderColor: [
      'rgba(255, 26, 104, 1)',
      //'rgba(54, 162, 235, 1)',
      //'rgba(255, 206, 86, 1)',
      //'rgba(75, 192, 192, 1)',
      //'rgba(153, 102, 255, 1)',
      //'rgba(255, 159, 64, 1)',
      //'rgba(0, 0, 0, 1)'
    ],
    borderWidth: 1
  },
  {
    label: 'Độ mỏi 2',
    data: [39.85, 36.64, 29.41, 34.39, 33.67, 39.19, 35.36, 33.34, 37.88, 26.27, 35.45, 29.82, 33.73, 26.02, 34.34, 39.28, 39.50, 33.71, 26.57, 26.49, 34.95, 28.18 ],
    backgroundColor: [
      //'rgba(255, 26, 104, 0.2)',
      'rgba(54, 162, 235, 0.2)',
      //'rgba(255, 206, 86, 0.2)',
      //'rgba(75, 192, 192, 0.2)',
      //'rgba(153, 102, 255, 0.2)',
      //'rgba(255, 159, 64, 0.2)',
      //'rgba(0, 0, 0, 0.2)'
    ],
    borderColor: [
      //'rgba(255, 26, 104, 1)',
      'rgba(54, 162, 235, 1)',
      //'rgba(255, 206, 86, 1)',
      //'rgba(75, 192, 192, 1)',
      //'rgba(153, 102, 255, 1)',
      //'rgba(255, 159, 64, 1)',
      //'rgba(0, 0, 0, 1)'
    ],
    borderWidth: 1
  },
  {
    label: 'Độ mỏi 3',
    data: [39.85, 36.64, 29.41, 34.39, 33.67, 39.19, 35.36, 33.34, 37.88, 26.27, 35.45, 29.82, 33.73, 26.02, 34.34, 39.28, 39.50, 33.71, 26.57, 26.49, 34.95, 28.18 ],
    backgroundColor: [
      //'rgba(255, 26, 104, 0.2)',
      //'rgba(54, 162, 235, 7)',
      'rgba(255, 206, 86, 0.2)',
      //'rgba(75, 192, 192, 0.2)',
      //'rgba(153, 102, 255, 0.2)',
      //'rgba(255, 159, 64, 0.2)',
      //'rgba(0, 0, 0, 0.2)'
    ],
    borderColor: [
      //'rgba(255, 26, 104, 1)',
      //'rgba(54, 162, 235, 1)',
      'rgba(255, 206, 86, 1)',
      //'rgba(75, 192, 192, 1)',
      //'rgba(153, 102, 255, 1)',
      //'rgba(255, 159, 64, 1)',
      //'rgba(0, 0, 0, 1)'
    ],
    borderWidth: 1
  },
  {
    label: 'Độ mỏi 4',
    data: [39.85, 36.64, 29.41, 34.39, 33.67, 39.19, 35.36, 33.34, 37.88, 26.27, 35.45, 29.82, 33.73, 26.02, 34.34, 39.28, 39.50, 33.71, 26.57, 26.49, 34.95, 28.18 ],
    backgroundColor: [
      //'rgba(255, 26, 104, 0.2)',
      //'rgba(54, 162, 235, 4)',
      //'rgba(255, 206, 86, 0.2)',
      'rgba(75, 192, 192, 0.2)',
      //'rgba(153, 102, 255, 0.2)',
      //'rgba(255, 159, 64, 0.2)',
      //'rgba(0, 0, 0, 0.2)'
    ],
    borderColor: [
      //'rgba(255, 26, 104, 1)',
      //'rgba(54, 162, 235, 1)',
      //'rgba(255, 206, 86, 1)',
      'rgba(75, 192, 192, 1)',
      //'rgba(153, 102, 255, 1)',
      //'rgba(255, 159, 64, 1)',
      //'rgba(0, 0, 0, 1)'
    ],
    borderWidth: 1
  },
  {
    label: 'Độ mỏi 5',
    data: [39.85, 36.64, 29.41, 34.39, 33.67, 39.19, 35.36, 33.34, 37.88, 26.27, 35.45, 29.82, 33.73, 26.02, 34.34, 39.28, 39.50, 33.71, 26.57, 26.49, 34.95, 28.18 ],
    backgroundColor: [
      //'rgba(255, 26, 104, 0.2)',
      //'rgba(54, 162, 235, 5)',
      //'rgba(255, 206, 86, 0.2)',
      //'rgba(75, 192, 192, 0.2)',
      'rgba(153, 102, 255, 0.2)',
      //'rgba(255, 159, 64, 0.2)',
      //'rgba(0, 0, 0, 0.2)'
    ],
    borderColor: [
      //'rgba(255, 26, 104, 1)',
      //'rgba(54, 162, 235, 6)',
      //'rgba(255, 206, 86, 1)',
      //'rgba(75, 192, 192, 1)',
      'rgba(153, 102, 255, 1)',
      //'rgba(255, 159, 64, 1)',
      //'rgba(0, 0, 0, 1)'
    ],
    borderWidth: 1
  },
  {
    label: 'Độ mỏi 6',
    data: [39.85, 36.64, 29.41, 34.39, 33.67, 39.19, 35.36, 33.34, 37.88, 26.27, 35.45, 29.82, 33.73, 26.02, 34.34, 39.28, 39.50, 33.71, 26.57, 26.49, 34.95, 28.18 ],
    backgroundColor: [
      //'rgba(255, 26, 104, 0.2)',
      //'rgba(54, 162, 235, 0.2)',
      //'rgba(255, 206, 86, 0.2)',
      //'rgba(75, 192, 192, 0.2)',
      //'rgba(153, 102, 255, 0.2)',
      'rgba(255, 159, 64, 0.2)',
      //'rgba(0, 0, 0, 0.2)'
    ],
    borderColor: [
      //'rgba(255, 26, 104, 1)',
      //'rgba(54, 162, 235, 1)',
      //'rgba(255, 206, 86, 1)',
      //'rgba(75, 192, 192, 1)',
      //'rgba(153, 102, 255, 1)',
      'rgba(255, 159, 64, 1)',
      //'rgba(0, 0, 0, 1)'
    ],
    borderWidth: 1
  }
]
};

// config 
const fatigue_config = {
  type: 'line',
  data: fatigue_data,
  options: {
    scales: {
      y: {
        beginAtZero: true
      }
    },
    plugins: {
      backgroundColor: {
        color: 'white'
      }
    }
  },
  plugins: [
    {
      id: 'backgroundColor',
      beforeDraw: (chart, args, options) => {
        const ctx = chart.ctx;
        ctx.save();
        ctx.fillStyle = options.color;
        ctx.fillRect(0, 0, chart.width, chart.height);
        ctx.restore();
      }
    }
  ]
};



// render init block
const myFatigueChart = new Chart(
  document.getElementById('FatigueChart'),
  fatigue_config
);   

// update code when open index.html
updateFatigueChart()

// Instantly assign Chart.js version
//const chartVersion = document.getElementById('chartVersion');
//chartVersion.innerText = Chart.version;

// Export data to csv
function downloadCSV(csv, filename) {
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  link.setAttribute("href", url);
  link.setAttribute("download", filename);
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function exportFatigueData(chart) {
  const data = chart.data.datasets[0].data;
  const labels = chart.data.labels;
  let csvContent = "data:text/csv;charset=utf-8,";
  csvContent += "Date,Fatigue\n";

  data.forEach((fatigue, index) => {
      csvContent += labels[index] + "," + fatigue + "\n";
  });

  const filename = "fatigue_data.csv";
  downloadCSV(csvContent, filename);
}

document.getElementById("exportFatigueData").addEventListener("click", function () {
  exportFatigueData(myFatigueChart); // Replace 'myFatigueChart' with the variable name of your dust chart instance
});


// Export chart to png
function saveChartAsImage(chart, filename) {
  const link = document.createElement("a");
  link.href = chart.toBase64Image();
  link.download = filename;
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
document.getElementById("saveFatigueImage").addEventListener("click", function () {
  const now = new Date();
  const formattedDate = `${now.getDate().toString().padStart(2, '0')}${(now.getMonth() + 1).toString().padStart(2, '0')}${now.getFullYear()}_${now.getHours().toString().padStart(2, '0')}${now.getMinutes().toString().padStart(2, '0')}${now.getSeconds().toString().padStart(2, '0')}`;
  console.log(`Attempting to save fatigue chart as fatigue_chart_${formattedDate}.png`); // Add this line to see if the function is being executed
  saveChartAsImage(myFatigueChart, `fatigue_chart_${formattedDate}.png`); // Replace 'myFatigueChart' with the variable name of your dust chart instance
});


