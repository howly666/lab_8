import { Box, Container, Paper, Typography } from '@mui/material'
import Quiz from './features/Quiz'

function Testing() {
  return (
    <Box>
      <Container maxWidth="md" sx={{ pt: 4 }}>
        <Paper
          variant="outlined"
          sx={{
            p: { xs: 2.5, md: 4 },
            textAlign: 'center',
            bgcolor: '#f8f9fa',
            borderRadius: 3,
          }}
        >
          <Typography variant="h3" component="h1" sx={{ fontWeight: 900, mb: 1 }}>
            Проверь себя
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Выполните задания по материалам сайта о героях Dota 2. Ответы можно перетаскивать мышью.
          </Typography>
        </Paper>
      </Container>

      <Quiz />
    </Box>
  )
}

export default Testing
