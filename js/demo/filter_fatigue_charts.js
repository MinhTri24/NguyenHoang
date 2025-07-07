function updateFatigueChart() {
  // Get the start and end dates for the time range
  const startDate = document.getElementById('start-date').value;
  const endDate = document.getElementById('end-date').value;

  async function fetchData() {
    const url = 'http://192.168.1.16:3000/tanthuan/ft';
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

    // Create arrays for strain values (Fatigue 1 to Fatigue 6)
    const fatigueValues = [];
    for (let i = 1; i <= 6; i++) {
      const fieldKey = `Fatigue${i}`;
      const fatigueData = slicedData.map(feed => feed[fieldKey]);
      //strainData.reverse();
      fatigueValues.push(fatigueData);
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

    // Create an array of datasets for each strain
    const datasets = fatigueValues.map((fatigueData, index) => ({
      data: fatigueData,
      label: `Fatigue ${index + 1}`,
    }));

    // Set the labels of all datasets to "Fatigue 1" to "Ứng suất 6"
    const datasetLabels = datasets.map((dataset, index) => `Fatigue ${index + 1}`);
    datasets.forEach(dataset => (dataset.label = datasetLabels.shift()));

    const selectedDatasetIndex = parseInt(document.getElementById('dataset-select-fatigue').value);
    const selectedDataset = datasets[selectedDatasetIndex];

    const filteredFatigueData = {
      labels: created_at,
      datasets: [selectedDataset],
    };

    // Update the chart with the filtered strain data
    myFatigueChart.data = filteredFatigueData;
    myFatigueChart.update();
  });
}
// Add an event listener to the "Update Timestamp" button
const updateFatigueTimestampButton = document.getElementById('update-fatigue-timestamp-button');
updateFatigueTimestampButton.addEventListener('click', updateFatigueChart);

// // Add an event listener to the dropdown select to trigger the chart update
// const sliceSelect = document.getElementById('dataset-slice-select');
// sliceSelect.addEventListener('change', updateFatigueChart);



// automatic update chart
setInterval(function () {
  const now = new Date();
  const formattedDate = `${now.toLocaleDateString()} at ${now.toLocaleTimeString()}`;
  document.getElementById('strain-last-updated').innerHTML = `Updated ${formattedDate}`;
  updateFatigueChart();
}, 100000);
// setup 
const fatigue_data = {
  labels: ["8", "58", "48", "38", "28", "17", "7", "15", "16", "18", "12", "8", "58", "48", "38", "28", "17", "7", "15", "16", "18", "12"],
  datasets: [
    {
      label: 'Fatigue 1',
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
      label: 'Fatigue 2',
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
      label: 'Fatigue 3',
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
      label: 'Fatigue 4',
      data: [2.68, 2.26, 2.24, 2.15, 2.9, 2.94, 2.02, 2.20, 2.58, 2.20, 2.89, 2.03, 2.46, 2.31, 2.66, 2.74, 2.63, 2.6, 2.90, 2.77, 2.32, 2.97],
      backgroundColor: [
        'rgba(255, 206, 86, 0.2)',
      ],
      borderColor: [
        'rgba(255, 206, 86, 1)',
      ],
      borderWidth: 1
    },
    {
      label: 'Fatigue 5',
      data: [2.43, 2.91, 2.85, 2.80, 2.81, 2.97, 2.13, 2.51, 2.14, 2.89, 2.50, 2.56, 2.22, 2.54, 2.66, 2.24, 2.70, 2.99, 2.54, 2.29, 2.63, 2.96],
      backgroundColor: [
        'rgba(75, 192, 192, 0.2)',
      ],
      borderColor: [
        'rgba(75, 192, 192, 1)',
      ],
      borderWidth: 1
    },
    {
      label: 'Fatigue 6',
      data: [2.85, 2.80, 2.14, 2.65, 2.81, 2.51, 2.57, 2.97, 2.74, 2.11, 2.08, 2.38, 2.49, 2.63, 2.13, 2.49, 2.98, 2.29, 2.78, 2.43, 2.65, 2.09],
      backgroundColor: [
        'rgba(153, 102, 255, 0.2)',
      ],
      borderColor: [
        'rgba(153, 102, 255, 1)',
      ],
      borderWidth: 1
    }
  ]
};

// fatigue_config_filter 
const fatigue_config_filter = {
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
  document.getElementById('myFatigueChart'),
  fatigue_config_filter
);

updateFatigueChart()

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

// function exportStrainData(chart) {
//   const data = chart.data.datasets[0].data;
//   const labels = chart.data.labels;
//   //let csvContent = "data:text/csv;charset=utf-8,";
//   csvContent += "Date,US#1\n";

//   data.forEach((temp, index) => {
//       csvContent += labels[index] + "," + temp + "\n";
//   });

//   const filename = "fatigue_data.csv";
//   downloadCSV(csvContent, filename);
// }
function getEnglishLabel(vietnameseLabel) {
  const labelNumber = vietnameseLabel.match(/\d+/);
  return labelNumber ? `Fatigue${labelNumber}` : '';
}

function exportStrainData(chart) {
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

  data.forEach((temp, index) => {
    csvContent += `${labels[index]},${temp}\n`;
  });

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const filename = "fatigue_data.csv";

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


document.getElementById("exportStrainData").addEventListener("click", function () {
  exportStrainData(myFatigueChart); // Replace 'tempChart' with the variable name of your temperature chart instance
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
document.getElementById("saveStrainImage").addEventListener("click", function () {
  const now = new Date();
  const day = String(now.getDate()).padStart(2, '0');
  const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are 0-based, so we add 1
  const year = now.getFullYear();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');

  const formattedDate = `${day}${month}${year}_${hours}${minutes}${seconds}`;
  saveChartAsImage(myFatigueChart, `temp_chart_${formattedDate}.png`);

});

// Automatic log out
function setLoggedOut() {
  window.localStorage.setItem("loggedIn", "false");
}

// Check if the user is authenticated
if (!isAuthenticated()) {
  // redirectToLogin();
};
