const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Middleware per gestire il parsing dei dati del form
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware per gestire i file statici
app.use(express.static(path.join(__dirname, 'public')));

// Definizione dei valori iniziali per ogni sala
let initialValue1 = 0;
let initialValue2 = 0;
let initialValue3 = 0;
let initialValue4 = 0;

// Impostazione del motore di rendering EJS
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Percorso per il rendering della pagina index.ejs
app.get('/', (req, res) => {
  res.render('index', {
    initialValue1: initialValue1,
    initialValue2: initialValue2,
    initialValue3: initialValue3,
    initialValue4: initialValue4
  });
});

// Percorso per il rendering della pagina remote.ejs
app.get('/remote', (req, res) => {
  res.render('remote', {
    initialValue1: initialValue1,
    initialValue2: initialValue2,
    initialValue3: initialValue3,
    initialValue4: initialValue4
  });
});

// Gestione delle richieste POST per ogni form su /remote
app.post('/remote', (req, res) => {
  const action = req.body.action;
  const value1 = parseInt(req.body.value1, 10) || initialValue1;
  const value2 = parseInt(req.body.value2, 10) || initialValue2;
  const value3 = parseInt(req.body.value3, 10) || initialValue3;
  const value4 = parseInt(req.body.value4, 10) || initialValue4;

  switch (action) {
    case 'increase1':
      initialValue1++;
      break;
    case 'decrease1':
      initialValue1--;
      break;
    case 'set1':
      initialValue1 = value1;
      break;
    case 'increase2':
      initialValue2++;
      break;
    case 'decrease2':
      initialValue2--;
      break;
    case 'set2':
      initialValue2 = value2;
      break;
    case 'increase3':
      initialValue3++;
      break;
    case 'decrease3':
      initialValue3--;
      break;
    case 'set3':
      initialValue3 = value3;
      break;
    case 'increase4':
      initialValue4++;
      break;
    case 'decrease4':
      initialValue4--;
      break;
    case 'set4':
      initialValue4 = value4;
      break;
    default:
      break;
  }

  io.emit('updateValues', {
    initialValue1: initialValue1,
    initialValue2: initialValue2,
    initialValue3: initialValue3,
    initialValue4: initialValue4
  });

  res.redirect('/remote');
});

// Avvio del server sulla porta 3000
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
