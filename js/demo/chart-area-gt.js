function updateGiatocChart() {
  async function fetchData() {
    const url = 'http://192.168.1.16:3000/tanthuan/ds';
    const response = await fetch(url);
    const data = await response.json();
    return data;
  }

  fetchData().then((data) => {
    const feeds = data;
    
    const sortedData = feeds.sort((a, b) => new Date(b.Timestamp) - new Date(a.Timestamp));
    const last22Entries = sortedData.slice(0, 22); // Select the first 22 entries (most recent)

    // Create arrays for giatoc values (Fatigue1 to Fatigue6)
    const giatocValues = [];
    for (let i = 1; i <= 4; i++) {
      const fieldKey = `Giatoc${i}`;
      const giatocData = last22Entries.map(feed => feed[fieldKey]);
      giatocData.reverse();
      giatocValues.push(giatocData);
    }

    // Get time data and format it (HH:MM)
    const created_at = last22Entries.map(feed => {
      const timestamp = new Date(feed.Timestamp);
      const day = timestamp.getUTCDate();
      const month = timestamp.getUTCMonth() + 1; // Adding 1 because months are zero-based
      const year = timestamp.getUTCFullYear();
      const hours = timestamp.getUTCHours();
      const minutes = timestamp.getUTCMinutes();
      const time = `${year}-${month}-${day} ${hours}:${minutes.toString().padStart(2, '0')} ${day}/${month} `;
      return time;
    });
    // Reverse the order of created_at labels
    created_at.reverse();
    // Update chart data for each giatoc value
    for (let i = 0; i < giatocValues.length; i++) {
      myGiatocChart.config.data.datasets[i].data = giatocValues[i];
      myGiatocChart.config.data.datasets[i].label = `Gia tốc ${i + 1}`;
    }
    myGiatocChart.config.data.labels = created_at;
    
    myGiatocChart.update();
  });
}

  
// automatic update chart
setInterval(function() {
  const now = new Date();
  const formattedDate = `${now.toLocaleDateString()} at ${now.toLocaleTimeString()}`;
  document.getElementById('giatoc-last-updated').innerHTML = `Updated ${formattedDate}`;
  updateGiatocChart();
}, 10000);
// setup 
const giatoc_data = {
  labels: ["8", "58", "48", "38", "28", "17", "7", "15", "16" , "18" , "12", "8", "58", "48", "38", "28", "17", "7", "15", "16" , "18" , "12"],
  datasets: [
    {label: 'Gia tốc 1',
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
  {label: 'Gia tốc 2',
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
  {label: 'Gia tốc 3',
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
  {label: 'Gia tốc 4',
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
  }
]
};

// config 
const gt_config = {
  type: 'line',
  data: giatoc_data,
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
const myGiatocChart = new Chart(
  document.getElementById('myGiatocChart'),
  gt_config
);   

updateGiatocChart()

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

function exportGiatocpData(chart) {
  const data = chart.data.datasets[0].data;
  const labels = chart.data.labels;
  let csvContent = "data:text/csv;charset=utf-8,";
  csvContent += "Date,US#1\n";

  data.forEach((giatoc, index) => {
      csvContent += labels[index] + "," + giatoc + "\n";
  });

  const filename = "giatoc_data.csv";
  downloadCSV(csvContent, filename);
}
// document.getElementById("exportGiatocData").addEventListener("click", function () {
//   exportGiatocData(myGiatocChart); // Replace 'giatocChart' with the variable name of your giatocerature chart instance
// });

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
// document.getElementById("saveGiatocImage").addEventListener("click", function () {
//   const now = new Date();
//   const day = String(now.getDate()).padStart(2, '0');
//   const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are 0-based, so we add 1
//   const year = now.getFullYear();
//   const hours = String(now.getHours()).padStart(2, '0');
//   const minutes = String(now.getMinutes()).padStart(2, '0');
//   const seconds = String(now.getSeconds()).padStart(2, '0');
  
//   const formattedDate = `${day}${month}${year}_${hours}${minutes}${seconds}`;
//   saveChartAsImage(myGiatocChart, `giatoc_chart_${formattedDate}.png`);
  
// });

