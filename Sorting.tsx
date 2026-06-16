import { useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { tTasks } from '../quizData';
import SortableList from './SortableList';
import { addList } from './quizSlice';
import { shuffleArray } from './quizUtils';

interface ComponentProps {
  index: number;
  tasks: tTasks;
}

function Sorting({ index, tasks }: ComponentProps) {
  const dispatch = useDispatch();

  const items = useMemo(
    () => shuffleArray(tasks.map((item) => item.question)),
    [tasks],
  );

  useEffect(() => {
    dispatch(addList({ index, items }));
  }, [dispatch, index, items]);

  return (
    <Box sx={{ mt: 2, maxWidth: 620 }}>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
        Перетащите элементы так, чтобы первым было самое высокое сооружение.
      </Typography>
      <SortableList index={index} items={items} />
    </Box>
  );
}

export default Sorting;
