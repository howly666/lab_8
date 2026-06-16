import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Matching from './Matching';
import Sorting from './Sorting';
import { quiz } from '../quizData';
import { RootState } from '../../store';
import { checkQuiz, restartQuiz } from './quizSlice';
import { createQuizLists, getCorrectAnswersCount } from './quizUtils';

function Quiz() {
  const dispatch = useDispatch();
  const lists = useSelector((state: RootState) => state.lists.lists);
  const checked = useSelector((state: RootState) => state.lists.checked);

  useEffect(() => {
    dispatch(restartQuiz(createQuizLists()));
  }, [dispatch]);

  const handleCheck = () => {
    dispatch(checkQuiz());
  };

  const handleRestart = () => {
    dispatch(restartQuiz(createQuizLists()));
  };

  return (
    <Container maxWidth="md" sx={{ mt: 3, mb: 4 }}>
      {quiz.map((item, index) => (
        <Box key={item.id} component="section" sx={{ m: 2, p: 2 }}>
          <Typography variant="h5" gutterBottom>
            {index + 1}. {item.title}
          </Typography>
          {item.type === 'M' ? (
            <Matching index={index} tasks={item.tasks} />
          ) : (
            <Sorting index={index} tasks={item.tasks} />
          )}
        </Box>
      ))}

      <Box sx={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: 2, mt: 3 }}>
        <Button variant="contained" color="info" onClick={handleCheck}>
          Проверить
        </Button>
        <Button variant="contained" color="info" onClick={handleRestart}>
          Начать снова
        </Button>
      </Box>

      {checked && (
        <Paper variant="outlined" sx={{ mt: 4, p: 3, textAlign: 'center' }}>
          <Typography variant="h5" gutterBottom>
            Результаты теста
          </Typography>
          <Stack spacing={1} sx={{ alignItems: 'center' }}>
            {quiz.map((item, index) => {
              const correct = getCorrectAnswersCount(item, lists[index]);
              const total = item.tasks.length;

              return (
                <Typography key={item.id} variant="body1">
                  Задание {index + 1}.{' '}
                  {correct === total
                    ? 'Все ответы верные.'
                    : `Верных ответов: ${correct} из ${total}.`}
                </Typography>
              );
            })}
          </Stack>
        </Paper>
      )}
    </Container>
  );
}

export default Quiz;
