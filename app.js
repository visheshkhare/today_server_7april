const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const axios = require('axios');
const path = require('path'); 
const app = express();

app.use(session({
  secret: 'your-secret-key', // Change this to a secure random key
  resave: false,
  saveUninitialized: true,
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.use(express.static(path.join(__dirname, '..', 'public')));
// app.use(express.static(path.join(__dirname, 'public')));


// const apiUrl = 'http://127.0.0.1:5000/api/scheme-data';
const apiUrl = 'http://54.224.21.233:8001/api/scheme-data';

// Middleware to check if the user is logged in
function requireLogin(req, res, next) {
  if (req.session.userId) {
    return next();
  } else {
    res.redirect('/login');
  }
}

// app.get('/login', (req, res) => {
//   res.send(`
//     <center>
//       <br>
//       <br>
//       <h3>Welcome to Digital Government Scheme Plus</h3>
//       <form action="/login" method="post">
//         <label for="username">Username:</label>
//         <input type="text" id="username" name="username" required>
//         <br>
//         <br>
//         <label for="password">Password:</label>
//         <input type="password" id="password" name="password" required>
//         <br>
//         <br>
//         <button type="submit">Login</button>
//       </form>
//     <center>
//   `);
// });
// app.get('/login', (req, res) => {
//   res.send(`
//     <html>
//       <head>
//         <style>
//           body {
//             font-family: Arial, sans-serif;
//             background-color: #f0f0f0;
//             margin: 0;
//             padding: 0;
//             display: flex;
//             justify-content: center;
//             align-items: center;
//             height: 100vh;
//           }

//           .card {
//             background-color: #fff;
//             border-radius: 8px;
//             box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
//             padding: 20px;
//             text-align: center;
//           }

//           h3 {
//             color: #4CAF50;
//           }

//           label {
//             font-weight: bold;
//           }

//           input[type="text"],
//           input[type="password"] {
//             width: 250px;
//             padding: 10px;
//             margin-bottom: 20px;
//             border: 1px solid #ccc;
//             border-radius: 4px;
//             box-sizing: border-box;
//           }

//           button {
//             background-color: #4CAF50;
//             color: white;
//             padding: 10px 20px;
//             border: none;
//             border-radius: 4px;
//             cursor: pointer;
//           }

//           button:hover {
//             background-color: #45A049;
//           }
//         </style>
//       </head>
//       <body>
//         <div class="card">
//           <h1>Welcome to Digital Government Scheme Plus</h1>
//           <form action="/login" method="post">
//             <label for="username">Username:</label><br>
//             <input type="text" id="username" name="username" required><br>
//             <label for="password">Password:</label><br>
//             <input type="password" id="password" name="password" required><br>
//             <button type="submit">Login</button>
//           </form>
//         </div>
//       </body>
//     </html>
//   `);
// });
app.get('/login', (req, res) => {
  res.send(`
    <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f0f0f0;
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
          }

          .card {
            background-color: #fff;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            padding: 20px;
            text-align: center;
          }

          h1 {
            color: #4CAF50;
          }

          label {
            font-weight: bold;
            display: inline-block;
            text-align: left;
          }

          input[type="text"],
          input[type="password"] {
            width: 250px;
            padding: 10px;
            margin-bottom: 20px;
            border: 1px solid #ccc;
            border-radius: 4px;
            box-sizing: border-box;
          }

          button {
            background-color: #4CAF50;
            color: white;
            padding: 10px 20px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
          }

          button:hover {
            background-color: #45A049;
          }
        </style>
      </head>
      <body>
        <div class="card">
          <h1>Welcome to Digital Government Scheme Plus</h1>
          <form action="/login" method="post">
            <label for="username">Username:</label><br>
            <input type="text" id="username" name="username" required><br>
            <label for="password">Password:</label><br>
            <input type="password" id="password" name="password" required><br>
            <button type="submit">Login</button>
          </form>
        </div>
      </body>
    </html>
  `);
});


app.post('/login', (req, res) => {
  // For simplicity, you can use a hardcoded username and password
  const username = req.body.username;
  const password = req.body.password;

  if (username === 'admin' && password === 'admin') {
    req.session.userId = 1; // Use a unique user ID
    res.redirect('/');
  } else {
    res.send('Invalid username or password');
  }
});

// app.get('/', requireLogin, async (req, res) => {
//   try {
//     const data = await fetchData();
//     const formattedData = formatData(data);
    
//     // Display the "Logout" button
//     res.send(`
//       <h1>Details Of The Eligible Scheme</h1>
//       ${formattedData}
//       <br>
//       <br>
      
//       <form action="/new-page" method="get">
//         <button type="submit">Apply </button>
//       </form>
//     `);
//   } catch (error) {
//     res.status(500).send('Internal Server Error');
//   }
// });

app.get('/', requireLogin, async (req, res) => {
  try {
      const data = await fetchData();
      let formattedData = formatData(data);

      // Ensure formattedData is an array
      if (typeof formattedData === 'string') {
          formattedData = [formattedData];
      }

      // Display the "Logout" button
      res.send(`
           <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              background-color: #f0f0f0;
              margin: 0;
              padding: 0;
              display: flex;
              justify-content: center;
              align-items: center;
              height: 100vh;
            }

            .container {
              width: 80%;
              margin: auto;
            }

            .card {
              background-color: #fff;
              border-radius: 8px;
              box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
              padding: 20px;
              margin-bottom: 20px;
            }

            h1 {
              color: #4CAF50;
              cursor: pointer;
            }

            .details {
              display: none;
            }

            .steps {
              margin-bottom: 10px;
              text-align: justify;
            }

            .steps ul,
            .steps ol {
              padding-left: 20px;
              margin: 0;
            }

            .steps li {
              margin-bottom: 5px;
            }

            button {
              background-color: #4CAF50;
              color: white;
              padding: 10px 20px;
              border: none;
              border-radius: 4px;
              cursor: pointer;
              margin-bottom: 10px; /* Add margin to separate buttons */
            }

            button:hover {
              background-color: #45A049;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>Details Of Eligible Schemes</h1>
            ${formattedData.map(item => `
              <div class="card">
                <h1 onclick="toggleDetails(this)">Scheme ${item.schemeIndex}</h1>
                <div class="details">
                  <h2>Eligibility Criteria:</h2>
                  <div class="steps">
                    <ul>
                      ${item.eligibilityCriteria.split('\n').map(criteria => <li>${criteria}</li>).join('')}
                    </ul>
                  </div>
                  <h2>Application Process:</h2>
                  <div class="steps">
                    <ol>
                      ${item.applicationProcess.split('\n').map(step => <li>${step}</li>).join('')}
                    </ol>
                  </div>
                  <form action="/new-page" method="get">
                    <input type="hidden" name="schemeIndex" value="${item.schemeIndex}">
                    <button type="submit">Apply</button>
                  </form>
                </div>
              </div>
            `).join('')}
          </div>

          <script>
            function toggleDetails(element) {
              const details = element.nextElementSibling;
              details.style.display = details.style.display === 'none' ? 'block' : 'none';
            }
          </script>
        </body>
      </html>
      `);
  } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
  }
});

 




app.get('/new-page', requireLogin, (req, res) => {
  res.redirect('https://final-sever7april-1.onrender.com/');
});
app.post('/logout', (req, res) => {
  // Destroy the session on logout
  req.session.destroy((err) => {
    if (err) {
      console.error(err);
    }
    res.redirect('/login');
  });
});

function formatData(data) {
  return data.map((item, index) => {
    const eligibilityCriteriaText = extractTextFromStructure(item.eligibilityCriteria.eligibilityDescription);
    const applicationProcessText = extractTextFromStructure(item.applicationProcess[0].process);

    return `
      Scheme ${index + 1}:
      Eligibility Criteria:
      ${eligibilityCriteriaText.trim()}

      Application Process:
      ${applicationProcessText.trim()}

      \n
    `;
  }).join('\n');
}

async function fetchData() {
  try {
    const response = await axios.get(apiUrl);
    const data = response.data;
    return data;
  } catch (error) {
    throw error;
  }
}

function extractTextFromStructure(structure) {
  if (!structure) {
    return '';
  }

  if (Array.isArray(structure)) {
    return structure.map((item) => extractTextFromStructure(item)).join('\n');
  }

  if (typeof structure === 'object') {
    if (structure.text) {
      return structure.text;
    } else if (structure.children) {
      return extractTextFromStructure(structure.children);
    }
  }

  return '';
}

const port = 6023;

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}0`);
});
