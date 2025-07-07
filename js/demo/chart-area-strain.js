function updateStrainChart() {
  async function fetchData() {
    const url = 'http://192.168.1.16:3000/tanthuan/ss';
    const response = await fetch(url);
    const data = await response.json();
    return data;
  }

  fetchData().then((data) => {
    const feeds = data;
    
    const sortedData = feeds.sort((a, b) => new Date(b.Timestamp) - new Date(a.Timestamp));
    const last22Entries = sortedData.slice(0, 22); // Select the first 22 entries (most recent)

    // Create arrays for fatigue values (Fatigue1 to Fatigue6)
    const strainValues = [];
    for (let i = 1; i <= 6; i++) {
      const fieldKey = `Ungsuat${i}`;
      const strainData = last22Entries.map(feed => feed[fieldKey]);
      strainData.reverse();
      strainValues.push(strainData);
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
    for (let i = 0; i < strainValues.length; i++) {
      myChart.config.data.datasets[i].data = strainValues[i];
      myChart.config.data.datasets[i].label = `Ứng suất ${i + 1}`;
    }
    myChart.config.data.labels = created_at;
    
    myChart.update();
  });
}

  
// automatic update chart
setInterval(function() {
  const now = new Date();
  const formattedDate = `${now.toLocaleDateString()} at ${now.toLocaleTimeString()}`;
  document.getElementById('temp-last-updated').innerHTML = `Updated ${formattedDate}`;
  updateStrainChart();
}, 10000);
// setup 
const temp_data = {
  labels: ["8", "58", "48", "38", "28", "17", "7", "15", "16" , "18" , "12", "8", "58", "48", "38", "28", "17", "7", "15", "16" , "18" , "12"],
  datasets: [
    {label: 'US 1',
    data: [30.24, 30.24, 30.24, 30.24, 30.23, 30.24, 30.24, 30.24, 30.24, 30,24, 30.24, 30.24, 30.24, 30.24, 30.23, 30.24, 30.24, 30.24, 30.24, 30,24 ],
    backgroundColor: [
      'rgba(255, 26, 104, 0.2)',
     // 'rgba(54, 162, 235, 0.2)',
     // 'rgba(255, 206, 86, 0.2)',
     // 'rgba(75, 192, 192, 0.2)',
     // 'rgba(153, 102, 255, 0.2)',
     // 'rgba(255, 159, 64, 0.2)',
     // 'rgba(0, 0, 0, 0.2)'
    ],
    borderColor: [
      'rgba(255, 26, 104, 1)',
     // 'rgba(54, 162, 235, 1)',
     // 'rgba(255, 206, 86, 1)',
     // 'rgba(75, 192, 192, 1)',
     // 'rgba(153, 102, 255, 1)',
     // 'rgba(255, 159, 64, 1)',
     // 'rgba(0, 0, 0, 1)'
    ],
    borderWidth: 1
  },
  {label: 'US 2',
    data: [2.24, 2.24, 2.4, 2.3, 2.1, 2.15, 2.17, 2.17, 2.17, 2.17, 2.19, 2.19, 2.8, 2.1, 2.1, 2.2, 2.3, 2.4, 2.6, 2.9, 3.0, 2.1 ],
    backgroundColor: [
      'rgba(255, 30, 104, 1)',
      //'rgba(54, 162, 235, 0.2)',
      //'rgba(255, 206, 86, 0.2)',
      //'rgba(75, 192, 192, 0.2)',
      //'rgba(153, 102, 255, 0.2)',
      //'rgba(255, 159, 64, 0.2)',
      //'rgba(0, 0, 0, 0.2)'
    ],
    borderColor: [
      'rgba(255, 30, 104, 0.6)',
      //'rgba(54, 162, 235, 1)',
      //'rgba(255, 206, 86, 1)',
      //'rgba(75, 192, 192, 1)',
      //'rgba(153, 102, 255, 1)',
      //'rgba(255, 159, 64, 1)',
      //'rgba(0, 0, 0, 1)'
    ],
    borderWidth: 1
  },
  {label: 'US 3',
    data: [2.6, 2.7, 2.8, 2.9, 2.13, 2.2, 2.3, 2.1, 2.17, 2.17, 2.0, 2.4, 2.3, 2.2, 2.7, 2.2, 2.1, 2.5, 2.1, 2.2, 3.1, 2.2  ],
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
  {label: 'US 4',
    data: [2.68, 2.26, 2.24, 2.15, 2.9, 2.94, 2.02, 2.20, 2.58, 2.20, 2.89, 2.03, 2.46, 2.31, 2.66, 2.74, 2.63, 2.6, 2.90, 2.77, 2.32, 2.97  ],
    backgroundColor: [
      //'rgba(255, 26, 104, 0.2)',
      //'rgba(54, 162, 235, 0.2)',
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
  {label: 'US 5',
    data: [2.43, 2.91, 2.85, 2.80, 2.81, 2.97, 2.13, 2.51, 2.14, 2.89, 2.50, 2.56, 2.22, 2.54, 2.66, 2.24, 2.70, 2.99, 2.54, 2.29, 2.63, 2.96],
    backgroundColor: [
      //'rgba(255, 26, 104, 0.2)',
      //'rgba(54, 162, 235, 0.2)',
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
  {label: 'US 6',
    data: [2.85, 2.80, 2.14, 2.65, 2.81, 2.51, 2.57, 2.97, 2.74, 2.11, 2.08, 2.38, 2.49, 2.63, 2.13, 2.49, 2.98, 2.29, 2.78, 2.43, 2.65, 2.09],
    backgroundColor: [
      //'rgba(255, 26, 104, 0.2)',
      //'rgba(54, 162, 235, 0.2)',
      //'rgba(255, 206, 86, 0.2)',
      //'rgba(75, 192, 192, 0.2)',
      'rgba(153, 102, 255, 0.2)',
      //'rgba(255, 159, 64, 0.2)',
      //'rgba(0, 0, 0, 0.2)'
    ],
    borderColor: [
      //'rgba(255, 26, 104, 1)',
      //'rgba(54, 162, 235, 1)',
      //'rgba(255, 206, 86, 1)',
      //'rgba(75, 192, 192, 1)',
      'rgba(153, 102, 255, 1)',
      //'rgba(255, 159, 64, 1)',
      //'rgba(0, 0, 0, 1)'
    ],
    borderWidth: 1,
  }
]
};

// config 
const config = {
  type: 'line',
  data: temp_data,
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
const myChart = new Chart(
  document.getElementById('myTempChart'),
  config
);   

updateStrainChart()

//// Instantly assign Chart.js version
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

function exportTempData(chart) {
  const data = chart.data.datasets[0].data;
  const labels = chart.data.labels;
  let csvContent = "data:text/csv;charset=utf-8,";
  csvContent += "Date,US#1\n";

  data.forEach((temp, index) => {
      csvContent += labels[index] + "," + temp + "\n";
  });

  const filename = "temperature_data.csv";
  downloadCSV(csvContent, filename);
}
document.getElementById("exportTempData").addEventListener("click", function () {
  exportTempData(myChart); // Replace 'tempChart' with the variable name of your temperature chart instance
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
document.getElementById("saveTempImage").addEventListener("click", function () {
  const now = new Date();
  const day = String(now.getDate()).padStart(2, '0');
  const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are 0-based, so we add 1
  const year = now.getFullYear();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  
  const formattedDate = `${day}${month}${year}_${hours}${minutes}${seconds}`;
  saveChartAsImage(myChart, `temp_chart_${formattedDate}.png`);
  
});

