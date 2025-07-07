document.addEventListener("DOMContentLoaded", function () {
  // Fetch data from your main API
  fetch('http://192.168.1.16:3000/tanthuan/tg')
    .then(response => response.json())
    .then(data => {
      // Fetch data for "Giá trị hiện tại" from the secondary API
      fetch('http://192.168.1.16:3000/tanthuan/lss')
        .then(response => response.json())
        .then(lssData => {
          fetch('http://192.168.1.16:3000/tanthuan/lds')
            .then(response => response.json())
            .then(ldsData => {

              const table = $('#data-table');

              // Create the table body
              const tbody = $('<tbody>');
              data.forEach(item => {
                const row = $('<tr>');
                // Map data to specific columns based on column order
                row.append($('<td>').text(item['IDCambien']));
                row.append($('<td>').text(item['Kyhieu']));
                row.append($('<td>').text(item['Sohieucambien']));
                row.append($('<td>').text(item['Loaicambien']));
                row.append($('<td>').text(item['Vitrilapdat']));
                row.append($('<td>').text(item['Donvido']));


                // Access the "Giá trị hiện tại" value directly from the first object in lssData
                let giaTriHienTai

                const sensors = ["Ungsuat1", "Ungsuat2", "Ungsuat3", "Ungsuat4", "Ungsuat5", "Ungsuat6", "Nhietdo1"];
                lssData.forEach(dataItem => {
                  sensors.forEach(sensor => {
                    const A = item['Kyhieu'].trim(); // remove space in Kyhieu
                    const B = sensor;
                    //console.log("The length of the string is: " + A.length);
                    if (A === B) {
                      giaTriHienTai = dataItem[sensor];
                      return;
                    }
                  });
                });
                const sensors1 = ["Giatoc1", "Giatoc2", "Giatoc3", "Giatoc4"];
                ldsData.forEach(dataItem => {
                  sensors1.forEach(sensor => {
                    const kyhieu = item['Kyhieu'].trim(); // remove space in Kyhieu
                    //console.log("The length of the string is: " + A.length);
                    if (kyhieu === sensor) {
                      giaTriHienTai = dataItem[sensor];
                      return;
                    }
                  });
                });

                if (giaTriHienTai !== undefined) {
                  row.append($('<td>').text(giaTriHienTai));
                } else {
                  row.append($('<td>').text('N/A')); // Handle the case where there's no matching value
                }

                row.append($('<td>').text(item['Gioihanduoi']).addClass('middle-align'));
                row.append($('<td>').text(item['Gioihantren']).addClass('middle-align'));

                const Gioihanduoi = item['Gioihanduoi']; // Replace with your text string
                const Gioihantren = item['Gioihantren'];
                const min = parseFloat(Gioihanduoi);
                const max = parseFloat(Gioihantren);
                giaTriHienTai = parseFloat(giaTriHienTai);

                function sendAlertEmail(sensor, giaTriHienTai, Gioihantren, Gioihanduoi) {
                    const now = new Date();
                    const formattedTime = `${String(now.getDate()).padStart(2, '0')}/${String(now.getMonth() + 1).padStart(2, '0')}/${now.getFullYear()} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;
                
                    const templateParams = {
                        sensor: sensor,
                        giaTriHienTai: giaTriHienTai,
                        Gioihantren: Gioihantren,
                        Gioihanduoi: Gioihanduoi,
                        time: formattedTime
                    };
                
                    emailjs.send("service_mrrdhq7", "template_zdistzc", templateParams)
                    .then(function(response) {
                        console.log('SUCCESS!', response.status, response.text);
                    }, function(error) {
                        console.log('FAILED...', error);
                    });
                }

                if (giaTriHienTai >= min && giaTriHienTai <= max) {
                  console.log(`${giaTriHienTai} is within the range [${min}, ${max}]`);
                  row.append($('<td>').html('<span style="color: green;">Bình thường</span>'));
                } else {
                  console.log(`${giaTriHienTai} is out of the range [${min}, ${max}]`);
                  sendAlertEmail(sensor, giaTriHienTai, Gioihantren, Gioihanduoi);
                  row.append($('<td>').html('<span style="color: red;">Vượt ngưỡng</span>'));
                }
                tbody.append(row);
              });
              table.append(tbody);

              // Initialize DataTables
              // table.DataTable();
            });
        });
    });
});

// Automatic log out
function setLoggedOut() {
  window.localStorage.setItem("loggedIn", "false");
}

// Check if the user is authenticated
if (!isAuthenticated()) {
  // redirectToLogin();
};