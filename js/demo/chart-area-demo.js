// function updateFilterChart() {
//   // Get the start and end dates for the time range
//   const startDate = document.getElementById('start-date').value;
//   const endDate = document.getElementById('end-date').value;

//   async function fetchData() {
//     const url = 'http://192.168.1.16:3000/tanthuan/ss';
//     const response = await fetch(url);
//     const data = await response.json();
//     return data;
//   }

//   fetchData().then((data) => {
//     const feeds = data;

//     // Filter data based on the selected timestamp range
//     const slicedData = feeds.filter((feed) => {
//       const timestamp = new Date(feed.Timestamp);
//       return (
//         (!startDate || timestamp >= new Date(startDate)) &&
//         (!endDate || timestamp <= new Date(endDate))
//       );
//     });

//     // Create arrays for strain values (Ứng suất 1 to Ứng suất 6)
//     const strainValues = [];
//     for (let i = 1; i <= 6; i++) {
//       const fieldKey = `Ungsuat${i}`;
//       const strainData = slicedData.map(feed => feed[fieldKey]);
//       //strainData.reverse();
//       strainValues.push(strainData);
//     }

//     // Get time data and format it (HH:MM)
//     const created_at = slicedData.map(feed => {
//       const timestamp = new Date(feed.Timestamp);
//       const day = timestamp.getUTCDate();
//       const month = timestamp.getUTCMonth() + 1; // Adding 1 because months are zero-based
//       const year = timestamp.getUTCFullYear();
//       const hours = timestamp.getUTCHours();
//       const minutes = timestamp.getUTCMinutes();
//       const time = `${year}-${month}-${day} ${hours}:${minutes.toString().padStart(2, '0')} ${day}/${month} `;
//       return time;
//     });

//     // Combine strain data and timestamps into a single array
//     const strainData = slicedData.map(feed => ({
//       sensor: feed.Sensor,
//       value: feed.Value,
//       timestamp: feed.Timestamp
//     }));

//     // Export the data to a Word document
//     exportStrainDataToWord(strainData);

//     // Reverse the order of created_at labels
//     //created_at.reverse();

//     // Create an array of datasets for each strain
//     const datasets = strainValues.map((strainData, index) => ({
//       data: strainData,
//       label: `Ứng suất ${index + 1}`,
//     }));

//     // Set the labels of all datasets to "Ứng suất 1" to "Ứng suất 6"
//     const datasetLabels = datasets.map((dataset, index) => `Ứng suất ${index + 1}`);
//     datasets.forEach(dataset => (dataset.label = datasetLabels.shift()));

//     const selectedDatasetIndex = parseInt(document.getElementById('dataset-select-strain').value);
//     const selectedDataset = datasets[selectedDatasetIndex];

//     const filteredStrainData = {
//       labels: created_at,
//       datasets: [selectedDataset],
//     };

//     // Update the chart with the filtered strain data
//     myFilterChart.data = filteredStrainData;
//     myFilterChart.update();
//   });
// }
// Add an event listener to the "Update Timestamp" button
// const updateTimestampButton = document.getElementById('update-timestamp-button');
// updateTimestampButton.addEventListener('click', updateFilterChart);

// // Add an event listener to the dropdown select to trigger the chart update
// const sliceSelect = document.getElementById('dataset-slice-select');
// sliceSelect.addEventListener('change', updateFilterChart);



// automatic update chart
// setInterval(function () {
//   const now = new Date();
//   const formattedDate = `${now.toLocaleDateString()} at ${now.toLocaleTimeString()}`;
//   document.getElementById('strain-last-updated').innerHTML = `Updated ${formattedDate}`;
//   updateFilterChart();
// }, 100000);

// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#858796';

function number_format(number, decimals, dec_point, thousands_sep) {
  // *     example: number_format(1234.56, 2, ',', ' ');
  // *     return: '1 234,56'
  number = (number + '').replace(',', '').replace(' ', '');
  var n = !isFinite(+number) ? 0 : +number,
    prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
    sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
    dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
    s = '',
    toFixedFix = function(n, prec) {
      var k = Math.pow(10, prec);
      return '' + Math.round(n * k) / k;
    };
  // Fix for IE parseFloat(0.55).toFixed(0) = 0;
  s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
  if (s[0].length > 3) {
    s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
  }
  if ((s[1] || '').length < prec) {
    s[1] = s[1] || '';
    s[1] += new Array(prec - s[1].length + 1).join('0');
  }
  return s.join(dec);
}

// Area Chart Example
var ctx = document.getElementById("myAreaChart");
var myLineChart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: ["8", "58", "48", "38", "28", "17", "7", "15", "16", "18", "12", "8", "58", "48", "38", "28", "17", "7", "15", "16", "18", "12"],
    datasets: [
    {
      label: "US1",
      lineTension: 0.3,
      backgroundColor: "rgba(78, 115, 223, 0.05)",
      borderColor: "rgba(78, 115, 223, 1)",
      pointRadius: 3,
      pointBackgroundColor: "rgba(78, 115, 223, 1)",
      pointBorderColor: "rgba(78, 115, 223, 1)",
      pointHoverRadius: 3,
      pointHoverBackgroundColor: "rgba(78, 115, 223, 1)",
      pointHoverBorderColor: "rgba(78, 115, 223, 1)",
      pointHitRadius: 10,
      pointBorderWidth: 2,
      data: [30.24, 30.24, 30.24, 30.24, 30.23, 30.24, 30.24, 30.24, 30.24, 30, 24, 30.24, 30.24, 30.24, 30.24, 30.23, 30.24, 30.24, 30.24, 30.24, 30, 24],
    },
    {
      label: "US2",
      lineTension: 0.3,
      backgroundColor: "rgba(255, 99, 132, 0.05)",
      borderColor: "rgba(255, 99, 132, 1)",
      pointRadius: 3,
      pointBackgroundColor: "rgba(255, 99, 132, 1)",
      pointBorderColor: "rgba(255, 99, 132, 1)",
      pointHoverRadius: 3,
      pointHoverBackgroundColor: "rgba(255, 99, 132, 1)",
      pointHoverBorderColor: "rgba(255, 99, 132, 1)",
      pointHitRadius: 10,
      pointBorderWidth: 2,
      data: [20, 22, 21, 19, 18, 20, 21, 22, 23, 19, 18, 20, 22, 21, 19, 18, 20, 21, 22, 23, 19, 18],
    },
    {
      label: "US3",
      lineTension: 0.3,
      backgroundColor: "rgba(54, 162, 235, 0.05)",
      borderColor: "rgba(54, 162, 235, 1)",
      pointRadius: 3,
      pointBackgroundColor: "rgba(54, 162, 235, 1)",
      pointBorderColor: "rgba(54, 162, 235, 1)",
      pointHoverRadius: 3,
      pointHoverBackgroundColor: "rgba(54, 162, 235, 1)",
      pointHoverBorderColor: "rgba(54, 162, 235, 1)",
      pointHitRadius: 10,
      pointBorderWidth: 2,
      data: [10, 8, 9, 11, 12, 10, 9, 8, 7, 11, 12, 10, 8, 9, 11, 12, 10, 9, 8, 7, 11, 12],
    },
    {
      label: "US4",
      lineTension: 0.3,
      backgroundColor: "rgba(255, 206, 86, 0.05)",
      borderColor: "rgba(255, 206, 86, 1)",
      pointRadius: 3,
      pointBackgroundColor: "rgba(255, 206, 86, 1)",
      pointBorderColor: "rgba(255, 206, 86, 1)",
      pointHoverRadius: 3,
      pointHoverBackgroundColor: "rgba(255, 206, 86, 1)",
      pointHoverBorderColor: "rgba(255, 206, 86, 1)",
      pointHitRadius: 10,
      pointBorderWidth: 2,
      data: [15, 16, 15, 17, 18, 15, 16, 15, 17, 18, 15, 16, 15, 17, 18, 15, 16, 15, 17, 18, 15, 16],
    },
    {
      label: "US5",
      lineTension: 0.3,
      backgroundColor: "rgba(75, 192, 192, 0.05)",
      borderColor: "rgba(75, 192, 192, 1)",
      pointRadius: 3,
      pointBackgroundColor: "rgba(75, 192, 192, 1)",
      pointBorderColor: "rgba(75, 192, 192, 1)",
      pointHoverRadius: 3,
      pointHoverBackgroundColor: "rgba(75, 192, 192, 1)",
      pointHoverBorderColor: "rgba(75, 192, 192, 1)",
      pointHitRadius: 10,
      pointBorderWidth: 2,
      data: [12, 14, 13, 15, 16, 12, 14, 13, 15, 16, 12, 14, 13, 15, 16, 12, 14, 13, 15, 16, 12, 14],
    },
    {
      label: "US6",
      lineTension: 0.3,
      backgroundColor: "rgba(153, 102, 255, 0.05)",
      borderColor: "rgba(153, 102, 255, 1)",
      pointRadius: 3,
      pointBackgroundColor: "rgba(153, 102, 255, 1)",
      pointBorderColor: "rgba(153, 102, 255, 1)",
      pointHoverRadius: 3,
      pointHoverBackgroundColor: "rgba(153, 102, 255, 1)",
      pointHoverBorderColor: "rgba(153, 102, 255, 1)",
      pointHitRadius: 10,
      pointBorderWidth: 2,
      data: [18, 19, 18, 20, 21, 18, 19, 18, 20, 21, 18, 19, 18, 20, 21, 18, 19, 18, 20, 21, 18, 19],
    },
    {
      label: "US7",
      lineTension: 0.3,
      backgroundColor: "rgba(255, 159, 64, 0.05)",
      borderColor: "rgba(255, 159, 64, 1)",
      pointRadius: 3,
      pointBackgroundColor: "rgba(255, 159, 64, 1)",
      pointBorderColor: "rgba(255, 159, 64, 1)",
      pointHoverRadius: 3,
      pointHoverBackgroundColor: "rgba(255, 159, 64, 1)",
      pointHoverBorderColor: "rgba(255, 159, 64, 1)",
      pointHitRadius: 10,
      pointBorderWidth: 2,
      data: [22, 21, 23, 24, 22, 21, 23, 24, 22, 21, 23, 24, 22, 21, 23, 24, 22, 21, 23, 24, 22, 21],
    },
    {
      label: "US8",
      lineTension: 0.3,
      backgroundColor: "rgba(199, 199, 199, 0.05)",
      borderColor: "rgba(199, 199, 199, 1)",
      pointRadius: 3,
      pointBackgroundColor: "rgba(199, 199, 199, 1)",
      pointBorderColor: "rgba(199, 199, 199, 1)",
      pointHoverRadius: 3,
      pointHoverBackgroundColor: "rgba(199, 199, 199, 1)",
      pointHoverBorderColor: "rgba(199, 199, 199, 1)",
      pointHitRadius: 10,
      pointBorderWidth: 2,
      data: [25, 24, 26, 27, 25, 24, 26, 27, 25, 24, 26, 27, 25, 24, 26, 27, 25, 24, 26, 27, 25, 24],
    },
    {
      label: "US9",
      lineTension: 0.3,
      backgroundColor: "rgba(255, 99, 71, 0.05)",
      borderColor: "rgba(255, 99, 71, 1)",
      pointRadius: 3,
      pointBackgroundColor: "rgba(255, 99, 71, 1)",
      pointBorderColor: "rgba(255, 99, 71, 1)",
      pointHoverRadius: 3,
      pointHoverBackgroundColor: "rgba(255, 99, 71, 1)",
      pointHoverBorderColor: "rgba(255, 99, 71, 1)",
      pointHitRadius: 10,
      pointBorderWidth: 2,
      data: [28, 27, 29, 30, 28, 27, 29, 30, 28, 27, 29, 30, 28, 27, 29, 30, 28, 27, 29, 30, 28, 27],
    },
    {
      label: "US10",
      lineTension: 0.3,
      backgroundColor: "rgba(0, 191, 255, 0.05)",
      borderColor: "rgba(0, 191, 255, 1)",
      pointRadius: 3,
      pointBackgroundColor: "rgba(0, 191, 255, 1)",
      pointBorderColor: "rgba(0, 191, 255, 1)",
      pointHoverRadius: 3,
      pointHoverBackgroundColor: "rgba(0, 191, 255, 1)",
      pointHoverBorderColor: "rgba(0, 191, 255, 1)",
      pointHitRadius: 10,
      pointBorderWidth: 2,
      data: [31, 30, 32, 33, 31, 30, 32, 33, 31, 30, 32, 33, 31, 30, 32, 33, 31, 30, 32, 33, 31, 30],
    },
    {
      label: "US11",
      lineTension: 0.3,
      backgroundColor: "rgba(46, 204, 113, 0.05)",
      borderColor: "rgba(46, 204, 113, 1)",
      pointRadius: 3,
      pointBackgroundColor: "rgba(46, 204, 113, 1)",
      pointBorderColor: "rgba(46, 204, 113, 1)",
      pointHoverRadius: 3,
      pointHoverBackgroundColor: "rgba(46, 204, 113, 1)",
      pointHoverBorderColor: "rgba(46, 204, 113, 1)",
      pointHitRadius: 10,
      pointBorderWidth: 2,
      data: [34, 33, 35, 36, 34, 33, 35, 36, 34, 33, 35, 36, 34, 33, 35, 36, 34, 33, 35, 36, 34, 33],
    },
    {
      label: "US12",
      lineTension: 0.3,
      backgroundColor: "rgba(241, 196, 15, 0.05)",
      borderColor: "rgba(241, 196, 15, 1)",
      pointRadius: 3,
      pointBackgroundColor: "rgba(241, 196, 15, 1)",
      pointBorderColor: "rgba(241, 196, 15, 1)",
      pointHoverRadius: 3,
      pointHoverBackgroundColor: "rgba(241, 196, 15, 1)",
      pointHoverBorderColor: "rgba(241, 196, 15, 1)",
      pointHitRadius: 10,
      pointBorderWidth: 2,
      data: [37, 36, 38, 39, 37, 36, 38, 39, 37, 36, 38, 39, 37, 36, 38, 39, 37, 36, 38, 39, 37, 36],
    },
    {
      label: "US13",
      lineTension: 0.3,
      backgroundColor: "rgba(230, 126, 34, 0.05)",
      borderColor: "rgba(230, 126, 34, 1)",
      pointRadius: 3,
      pointBackgroundColor: "rgba(230, 126, 34, 1)",
      pointBorderColor: "rgba(230, 126, 34, 1)",
      pointHoverRadius: 3,
      pointHoverBackgroundColor: "rgba(230, 126, 34, 1)",
      pointHoverBorderColor: "rgba(230, 126, 34, 1)",
      pointHitRadius: 10,
      pointBorderWidth: 2,
      data: [40, 39, 41, 42, 40, 39, 41, 42, 40, 39, 41, 42, 40, 39, 41, 42, 40, 39, 41, 42, 40, 39],
    },
    {
      label: "US14",
      lineTension: 0.3,
      backgroundColor: "rgba(52, 73, 94, 0.05)",
      borderColor: "rgba(52, 73, 94, 1)",
      pointRadius: 3,
      pointBackgroundColor: "rgba(52, 73, 94, 1)",
      pointBorderColor: "rgba(52, 73, 94, 1)",
      pointHoverRadius: 3,
      pointHoverBackgroundColor: "rgba(52, 73, 94, 1)",
      pointHoverBorderColor: "rgba(52, 73, 94, 1)",
      pointHitRadius: 10,
      pointBorderWidth: 2,
      data: [43, 42, 44, 45, 43, 42, 44, 45, 43, 42, 44, 45, 43, 42, 44, 45, 43, 42, 44, 45, 43, 42],
    },
    {
      label: "US15",
      lineTension: 0.3,
      backgroundColor: "rgba(155, 89, 182, 0.05)",
      borderColor: "rgba(155, 89, 182, 1)",
      pointRadius: 3,
      pointBackgroundColor: "rgba(155, 89, 182, 1)",
      pointBorderColor: "rgba(155, 89, 182, 1)",
      pointHoverRadius: 3,
      pointHoverBackgroundColor: "rgba(155, 89, 182, 1)",
      pointHoverBorderColor: "rgba(155, 89, 182, 1)",
      pointHitRadius: 10,
      pointBorderWidth: 2,
      data: [46, 45, 47, 48, 46, 45, 47, 48, 46, 45, 47, 48, 46, 45, 47, 48, 46, 45, 47, 48, 46, 45],
    },
    {
      label: "US16",
      lineTension: 0.3,
      backgroundColor: "rgba(26, 188, 156, 0.05)",
      borderColor: "rgba(26, 188, 156, 1)",
      pointRadius: 3,
      pointBackgroundColor: "rgba(26, 188, 156, 1)",
      pointBorderColor: "rgba(26, 188, 156, 1)",
      pointHoverRadius: 3,
      pointHoverBackgroundColor: "rgba(26, 188, 156, 1)",
      pointHoverBorderColor: "rgba(26, 188, 156, 1)",
      pointHitRadius: 10,
      pointBorderWidth: 2,
      data: [49, 48, 50, 51, 49, 48, 50, 51, 49, 48, 50, 51, 49, 48, 50, 51, 49, 48, 50, 51, 49, 48],
    },
    {
      label: "US17",
      lineTension: 0.3,
      backgroundColor: "rgba(241, 52, 52, 0.05)",
      borderColor: "rgba(241, 52, 52, 1)",
      pointRadius: 3,
      pointBackgroundColor: "rgba(241, 52, 52, 1)",
      pointBorderColor: "rgba(241, 52, 52, 1)",
      pointHoverRadius: 3,
      pointHoverBackgroundColor: "rgba(241, 52, 52, 1)",
      pointHoverBorderColor: "rgba(241, 52, 52, 1)",
      pointHitRadius: 10,
      pointBorderWidth: 2,
      data: [52, 51, 53, 54, 52, 51, 53, 54, 52, 51, 53, 54, 52, 51, 53, 54, 52, 51, 53, 54, 52, 51],
    },
    {
      label: "US18",
      lineTension: 0.3,
      backgroundColor: "rgba(52, 152, 219, 0.05)",
      borderColor: "rgba(52, 152, 219, 1)",
      pointRadius: 3,
      pointBackgroundColor: "rgba(52, 152, 219, 1)",
      pointBorderColor: "rgba(52, 152, 219, 1)",
      pointHoverRadius: 3,
      pointHoverBackgroundColor: "rgba(52, 152, 219, 1)",
      pointHoverBorderColor: "rgba(52, 152, 219, 1)",
      pointHitRadius: 10,
      pointBorderWidth: 2,
      data: [55, 54, 56, 57, 55, 54, 56, 57, 55, 54, 56, 57, 55, 54, 56, 57, 55, 54, 56, 57, 55, 54],
    },
    {
      label: "US19",
      lineTension: 0.3,
      backgroundColor: "rgba(127, 140, 141, 0.05)",
      borderColor: "rgba(127, 140, 141, 1)",
      pointRadius: 3,
      pointBackgroundColor: "rgba(127, 140, 141, 1)",
      pointBorderColor: "rgba(127, 140, 141, 1)",
      pointHoverRadius: 3,
      pointHoverBackgroundColor: "rgba(127, 140, 141, 1)",
      pointHoverBorderColor: "rgba(127, 140, 141, 1)",
      pointHitRadius: 10,
      pointBorderWidth: 2,
      data: [58, 57, 59, 60, 58, 57, 59, 60, 58, 57, 59, 60, 58, 57, 59, 60, 58, 57, 59, 60, 58, 57],
    }
  ],
    
  },
  options: {
    maintainAspectRatio: false,
    layout: {
      padding: {
        left: 10,
        right: 25,
        top: 25,
        bottom: 0
      }
    },
    scales: {
      xAxes: [{
        time: {
          unit: 'date'
        },
        gridLines: {
          display: false,
          drawBorder: false
        },
        ticks: {
          maxTicksLimit: 7
        }
      }],
      yAxes: [{
        ticks: {
          min: 0,
          max: 60,
          maxTicksLimit: 7,
          padding: 10,
          // Include a dollar sign in the ticks
          callback: function(value, index, values) {
            return number_format(value);
          }
        },
        gridLines: {
          color: "rgb(234, 236, 244)",
          zeroLineColor: "rgb(234, 236, 244)",
          drawBorder: false,
          borderDash: [2],
          zeroLineBorderDash: [2]
        }
      }],
    },
    legend: {
      display: true
    },
    tooltips: {
      backgroundColor: "rgb(255,255,255)",
      bodyFontColor: "#858796",
      titleMarginBottom: 10,
      titleFontColor: '#6e707e',
      titleFontSize: 14,
      borderColor: '#dddfeb',
      borderWidth: 1,
      xPadding: 15,
      yPadding: 15,
      displayColors: false,
      intersect: true,
      mode: 'nearest',
      caretPadding: 10,
      callbacks: {
        label: function(tooltipItem, chart) {
          var datasetLabel = chart.datasets[tooltipItem.datasetIndex].label || '';
          return datasetLabel + number_format(tooltipItem.yLabel,2);
        }
      }
    }
  }
});

// console.log('Dropdown script loaded');
// document.getElementById('lineSelector').addEventListener('change', function(e) {
  
//   var selected = Array.from(this.selectedOptions).map(opt => opt.value);
//   var showAll = selected.includes('all');
//   myLineChart.data.datasets.forEach((ds, idx) => {
//     ds.hidden = false; // reset
//   });
//   if (!showAll) {
//     myLineChart.data.datasets.forEach((ds, idx) => {
//       if (!selected.includes(idx.toString())) ds.hidden = true;
//     });
//   }
//   myLineChart.update();
//   console.log('Dropdown changed', e.target.value);
// });
