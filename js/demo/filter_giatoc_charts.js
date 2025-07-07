function updateGiatocChart() {
  // Get the start and end dates for the time range
  const startDate = document.getElementById('start-date').value;
  const endDate = document.getElementById('end-date').value;

  async function fetchData() {
    const url = 'http://192.168.1.16:3000/tanthuan/ds';
    const response = await fetch(url);
    const data = await response.json();
    return data;
  }

  fetchData().then((data) => {
    const feeds = data;

    // Filter data based on the selected timestamp range
    const slicedData = feeds.filter((feed) => {
      const timestamp = new Date(feed.Timestamp);
      return (
        (!startDate || timestamp >= new Date(startDate)) &&
        (!endDate || timestamp <= new Date(endDate))
      );
    });

    // Create arrays for giatoc values (giatoc 1 to giatoc 4)
    const giatocValues = [];
    for (let i = 1; i <= 6; i++) {
      const fieldKey = `Giatoc${i}`;
      const giatocData = slicedData.map(feed => feed[fieldKey]);
      //giatocData.reverse();
      giatocValues.push(giatocData);
    }

    // Get time data and format it (HH:MM)
    const created_at = slicedData.map(feed => {
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
    //created_at.reverse();

    // Create an array of datasets for each giatoc
    const datasets = giatocValues.map((giatocData, index) => ({
      data: giatocData,
      label: `Gia tốc ${index + 1}`,
    }));

    // Set the labels of all datasets to "Gia tốc 1" to "Ứng suất 6"
    const datasetLabels = datasets.map((dataset, index) => `Gia tốc ${index + 1}`);
    datasets.forEach(dataset => (dataset.label = datasetLabels.shift()));

    const selectedDatasetIndex = parseInt(document.getElementById('dataset-select-giatoc').value);
    const selectedDataset = datasets[selectedDatasetIndex];

    const filteredGiatocData = {
      labels: created_at,
      datasets: [selectedDataset],
    };

    // Update the chart with the filtered giatoc data
    myGiatocChart.data = filteredGiatocData;
    myGiatocChart.update();
  });
}
// Add an event listener to the "Update Timestamp" button
const updateGiatocTimestampButton = document.getElementById('update-giatoc-timestamp-button');
updateGiatocTimestampButton.addEventListener('click', updateGiatocChart);

// // Add an event listener to the dropdown select to trigger the chart update
// const sliceSelect = document.getElementById('dataset-slice-select');
// sliceSelect.addEventListener('change', updateGiatocChart);



// automatic update chart
setInterval(function () {
  const now = new Date();
  const formattedDate = `${now.toLocaleDateString()} at ${now.toLocaleTimeString()}`;
  document.getElementById('giatoc-last-updated').innerHTML = `Updated ${formattedDate}`;
  updateGiatocChart();
}, 100000);
// setup 
const giatoc_data = {
  labels: ["8", "58", "48", "38", "28", "17", "7", "15", "16", "18", "12", "8", "58", "48", "38", "28", "17", "7", "15", "16", "18", "12"],
  datasets: [
    {
      label: 'Gia tốc 1',
      data: [30.24, 30.24, 30.24, 30.24, 30.23, 30.24, 30.24, 30.24, 30.24, 30, 24, 30.24, 30.24, 30.24, 30.24, 30.23, 30.24, 30.24, 30.24, 30.24, 30, 24],
      backgroundColor: [
        'rgba(255, 26, 104, 0.2)',
      ],
      borderColor: [
        'rgba(255, 26, 104, 1)',
      ],
      borderWidth: 1
    },
    {
      label: 'Gia tốc 2',
      data: [2.24, 2.24, 2.4, 2.3, 2.1, 2.15, 2.17, 2.17, 2.17, 2.17, 2.19, 2.19, 2.8, 2.1, 2.1, 2.2, 2.3, 2.4, 2.6, 2.9, 3.0, 2.1],
      backgroundColor: [
        'rgba(255, 26, 104, 0.2)',
      ],
      borderColor: [
        'rgba(255, 26, 104, 1)',
      ],
      borderWidth: 1
    },
    {
      label: 'Gia tốc 3',
      data: [2.6, 2.7, 2.8, 2.9, 2.13, 2.2, 2.3, 2.1, 2.17, 2.17, 2.0, 2.4, 2.3, 2.2, 2.7, 2.2, 2.1, 2.5, 2.1, 2.2, 3.1, 2.2],
      backgroundColor: [
        'rgba(54, 162, 235, 0.2)',
      ],
      borderColor: [
        'rgba(54, 162, 235, 1)',
      ],
      borderWidth: 1
    },
    {
      label: 'Gia tốc 4',
      data: [2.68, 2.26, 2.24, 2.15, 2.9, 2.94, 2.02, 2.20, 2.58, 2.20, 2.89, 2.03, 2.46, 2.31, 2.66, 2.74, 2.63, 2.6, 2.90, 2.77, 2.32, 2.97],
      backgroundColor: [
        'rgba(255, 206, 86, 0.2)',
      ],
      borderColor: [
        'rgba(255, 206, 86, 1)',
      ],
      borderWidth: 1
    }
  ]
};

// giatoc_config_filter 
const giatoc_config_filter = {
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
  giatoc_config_filter
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

// function exportgiatocData(chart) {
//   const data = chart.data.datasets[0].data;
//   const labels = chart.data.labels;
//   //let csvContent = "data:text/csv;charset=utf-8,";
//   csvContent += "Date,US#1\n";

//   data.forEach((giatoc, index) => {
//       csvContent += labels[index] + "," + giatoc + "\n";
//   });

//   const filename = "giatoc_data.csv";
//   downloadCSV(csvContent, filename);
// }
function getEnglishLabel(vietnameseLabel) {
  const labelNumber = vietnameseLabel.match(/\d+/);
  return labelNumber ? `giatoc${labelNumber}` : '';
}

function exportGiatocData(chart) {
  const selectedDataset = chart.data.datasets[0]; // Get the selected dataset
  const datasetLabel = selectedDataset.label; // Get the selected dataset label
  const englishLabel = getEnglishLabel(datasetLabel); // Map to the English label
  if (!englishLabel) {
    console.error('Invalid dataset label.');
    return;
  }

  const data = selectedDataset.data;
  const labels = chart.data.labels;
  let csvContent = `Date,${englishLabel}\n`;

  data.forEach((giatoc, index) => {
    csvContent += `${labels[index]},${giatoc}\n`;
  });

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const filename = "giatoc_data.csv";

  if (navigator.msSaveBlob) {
    // For Internet Explorer and Microsoft Edge
    navigator.msSaveBlob(blob, filename);
  } else {
    // For other browsers
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}


document.getElementById("exportGiatocData").addEventListener("click", function () {
  exportGiatocData(myGiatocChart); // Replace 'giatocChart' with the variable name of your giatocerature chart instance
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
document.getElementById("saveGiatocImage").addEventListener("click", function () {
  const now = new Date();
  const day = String(now.getDate()).padStart(2, '0');
  const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are 0-based, so we add 1
  const year = now.getFullYear();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');

  const formattedDate = `${day}${month}${year}_${hours}${minutes}${seconds}`;
  saveChartAsImage(myGiatocChart, `giatoc_chart_${formattedDate}.png`);

});

// Automatic log out
function setLoggedOut() {
  window.localStorage.setItem("loggedIn", "false");
}

// Check if the user is authenticated
if (!isAuthenticated()) {
  // redirectToLogin();
};