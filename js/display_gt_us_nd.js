// Get Nhietdo1
async function fetchTemperature() {
    async function fetchData() {
      //const url = "http://192.168.1.3:5000/actempdust";
      const url = "http://192.168.1.16:3000/tanthuan/lss";
      const response = await fetch(url);
      const data = await response.json();
      return data;
    }  
    fetchData()
      .then((data) => {
        const feeds = data; // Data contains the entire JSON response
//        const nhietdo = feeds[feeds.length - 1]; // Assuming the data is sorted by timestamp in descending order
        const nhietdo = feeds[0];
        if (nhietdo && nhietdo.Nhietdo1 !== undefined) {
          const temperatureElement = document.getElementById("Nhietdo1");
          temperatureElement.innerHTML = `${nhietdo.Nhietdo1} ℃`
        }

      })
      .catch((error) => {
        console.error(error);
      });
  }

// Get Giatoc 1->4
async function fetchDynamicSensor() {
  async function fetchData() {
    //const url = "http://192.168.1.3:5000/actempdust";
    const url = "http://192.168.1.16:3000/tanthuan/lds";
    const response = await fetch(url);
    const data = await response.json();
    return data;
  }  
  fetchData()
    .then((data) => {
      const feeds = data; // Data contains the entire JSON response
      const gt1 = feeds[0]; 
      const gt2 = feeds[0];
      const gt3 = feeds[0];
      const gt4 = feeds[0];
      if (gt1 && gt1.Giatoc1 !== undefined) {
        const gtElement1 = document.getElementById("Giatoc1");
        gtElement1.innerHTML = `${gt1.Giatoc1} g`
      }
      if (gt2 && gt2.Giatoc2 !== undefined) {
        const gtElement2 = document.getElementById("Giatoc2");
        gtElement2.innerHTML = `${gt2.Giatoc2} g`
      }
      if (gt3 && gt3.Giatoc3 !== undefined) {
        const gtElement3 = document.getElementById("Giatoc3");
        gtElement3.innerHTML = `${gt3.Giatoc3} g`
      }
      if (gt4 && gt4.Giatoc4 !== undefined) {
        const gtElement4 = document.getElementById("Giatoc4");
        gtElement4.innerHTML = `${gt4.Giatoc4} g`
      }

    })
    .catch((error) => {
      console.error(error);
    });
}

// Get strain 1->6
async function fetchStrain() {
    async function fetchData() {
      //const url = "http://192.168.1.3:5000/actempdust";
      const url = "http://192.168.1.16:3000/tanthuan/lss";
      const response = await fetch(url);
      const data = await response.json();
      return data;
    }  
    fetchData()
      .then((data) => {
        const feeds = data;
        const us1 = feeds[0];
        const us2 = feeds[0];
        const us3 = feeds[0];
        const us4 = feeds[0];
        const us5 = feeds[0];
        const us6 = feeds[0];
        if (us1 && us1.Ungsuat1 !== undefined) {
          const strainElement1 = document.getElementById("strain_id1");
          strainElement1.innerHTML = `${us1.Ungsuat1} MPa`
        }
        if (us2 && us2.Ungsuat2 !== undefined) {
          const strainElement2 = document.getElementById("strain_id2");
          strainElement2.innerHTML = `${us2.Ungsuat2} MPa`
        }
        if (us3 && us3.Ungsuat3 !== undefined) {
          const strainElement3 = document.getElementById("strain_id3");
          strainElement3.innerHTML = `${us3.Ungsuat3} MPa`
        }
        if (us4 && us4.Ungsuat4 !== undefined) {
          const strainElement4 = document.getElementById("strain_id4");
          strainElement4.innerHTML = `${us4.Ungsuat4} MPa`
        }
        if (us5 && us5.Ungsuat5 !== undefined) {
          const strainElement5 = document.getElementById("strain_id5");
          strainElement5.innerHTML = `${us5.Ungsuat5} MPa`
        }
        if (us6 && us6.Ungsuat6 !== undefined) {
          const strainElement6 = document.getElementById("strain_id6");
          strainElement6.innerHTML = `${us6.Ungsuat6} MPa`
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }
  fetchStrain();
  fetchTemperature();
  fetchDynamicSensor();
  
  setInterval(() => {
    fetchStrain();
    fetchTemperature();
    fetchDynamicSensor();
  }, 2000);