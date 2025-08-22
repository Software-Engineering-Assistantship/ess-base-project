import bodyParser from 'body-parser';
import app from './app';

const PORT = process.env.PORT || 5001;

app.use(bodyParser.json());

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`)
});
