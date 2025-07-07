const sql = require('mssql/msnodesqlv8');
const express = require('express');
const cors = require('cors'); // Add the cors middleware
const app = express();
const port = 3000;

const sql_config = {
  server :"DESKTOP-S4HN36D\\HUNGN",
  database:"Tanthuan",
  driver:"msnodesqlv8",
  user : "sa",
  password: "Jecc74h3",
  options:{
          trustedConnection:true
  }
};

app.use(cors());

app.get('/tanthuan/users', async (req,res) => {
  try {
    const pool = await sql.connect(sql_config);
    const result = await pool.request().query('SELECT * FROM Users');


    res.json(result.recordset);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
})
// get DynamicSensor
app.get('/tanthuan/ds', async (req,res) => {
  try {
    const pool = await sql.connect(sql_config);
    const result = await pool.request().query('SELECT * FROM DynamicSensor');
    
    res.json(result.recordset);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
})
// get FatigueSensor
app.get('/tanthuan/ft', async (req,res) => {
  try {
    const pool = await sql.connect(sql_config);
    const result = await pool.request().query('SELECT * FROM FatigueTable');

    res.json(result.recordset);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
})
// get FFT table
app.get('/tanthuan/fft', async (req,res) => {
  try {
    const pool = await sql.connect(sql_config);
    const result = await pool.request().query('SELECT * FROM FFTTable');
    
    res.json(result.recordset);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
})
// get StaticSensor
app.get('/tanthuan/ss', async (req,res) => {
  try {
    const pool = await sql.connect(sql_config);
    const result = await pool.request().query('SELECT * FROM StaticSensor');
    
    res.json(result.recordset);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
})
// get Table_general
app.get('/tanthuan/tg', async (req,res) => {
  try {
    const pool = await sql.connect(sql_config);
    const result = await pool.request().query('SELECT * FROM Table_General');

    res.json(result.recordset);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
})

// GET LAST DATA order by Timestamp
// get last DynamicSensor
app.get('/tanthuan/lds', async (req,res) => {
  try {
    const pool = await sql.connect(sql_config);
    const result = await pool.request().query('SELECT TOP 1 * FROM DynamicSensor ORDER BY Timestamp DESC');


    res.json(result.recordset);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
})
// get last FatigueTable
app.get('/tanthuan/lft', async (req,res) => {
  try {
    const pool = await sql.connect(sql_config);
    const result = await pool.request().query('SELECT TOP 1 * FROM FatigueTable ORDER BY Timestamp DESC');
    

    res.json(result.recordset);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
})
// get last FFT table
app.get('/tanthuan/lfft', async (req,res) => {
  try {
    const pool = await sql.connect(sql_config);
    const result = await pool.request().query('SELECT TOP 1 * FROM FFTTable ORDER BY Timestamp DESC');
    

    res.json(result.recordset);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
})
// get last StaticSensor
app.get('/tanthuan/lss', async (req,res) => {
  try {
    const pool = await sql.connect(sql_config);
    const result = await pool.request().query('SELECT TOP 1 * FROM StaticSensor ORDER BY Timestamp DESC');

    res.json(result.recordset);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
})

app.listen(port, () => {
  console.log(`API server is running on port ${port}`);
});

// sql.connect(sql_config,function(err){
//   if(err)console.log(err);
//   var request = new sql.Request();
//   request.query("select TOP 1 * from DynamicSensor ORDER BY Timestamp DESC",function(err,records){
//       if(err)console.log(err)
//       else {
//         if (records.recordset.length > 0) {
//           const fullname = records.recordset.map(row => row.Timestamp);
//           console.log(fullname);
//         } else {
//           console.log("No records found.")
//         }
//       }
//   })
// })
// connectToSQLServer();


// app.get('/api/data', async (req, res) => {
//   try {
//     const pool = await sql.connect(sql_config);
//     const result = await pool.request().query('SELECT * FROM YourTable');
//     

//     res.json(result.recordset);
//   } catch (error) {
//     console.error('Error:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// app.listen(port, () => {
//   console.log(`API server is running on port ${port}`);
// });
