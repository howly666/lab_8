import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Quiz from './features/Quiz';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function Testing() {
  return (
    <div>
      <Navbar active="4" />
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h4" gutterBottom>
            Проверь себя
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Выполните задания на сопоставление и сортировку по материалам сайта.
            Ответы можно перемещать мышью с помощью Drag-and-Drop.
          </Typography>
        </Box>
      </Container>
      <Quiz />
      <Footer />
    </div>
  );
}

export default Testing;
