import { useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import { tTasks } from '../quizData';
import SortableList from './SortableList';
import { addList } from './quizSlice';
import { shuffleArray } from './quizUtils';

interface ComponentProps {
  index: number;
  tasks: tTasks;
}

function Matching({ index, tasks }: ComponentProps) {
  const dispatch = useDispatch();

  const answers = useMemo(
    () => shuffleArray(tasks.map((item) => item.answer)),
    [tasks],
  );

  useEffect(() => {
    dispatch(addList({ index, items: answers }));
  }, [answers, dispatch, index]);

  return (
    <Grid container spacing={2} sx={{ mt: 1 }}>
      <Grid item xs={12} md={6}>
        <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
          Вопросы
        </Typography>
        <List>
          {tasks.map((item, taskIndex) => (
            <ListItem key={item.question} disablePadding sx={{ mb: 1 }}>
              <ListItemButton
                sx={{
                  border: '1px solid gray',
                  borderRadius: '5px',
                  textAlign: 'right',
                }}
              >
                <ListItemText primary={`${taskIndex + 1}. ${item.question}`} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Grid>

      <Grid item xs={12} md={6}>
        <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
          Ответы. Перетащите их напротив подходящих вопросов
        </Typography>
        <SortableList index={index} items={answers} />
      </Grid>
    </Grid>
  );
}

export default Matching;
