import { Box, Typography } from '@mui/material'
import type { QuizTask } from '../quizData'
import SortableList from './SortableList'

type SortingProps = {
  index: number
  tasks: QuizTask[]
}

function Sorting({ index, tasks }: SortingProps) {
  const items = tasks.map(item => item.question)

  return (
    <Box sx={{ maxWidth: 560, mx: 'auto' }}>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
        Перетащите героев так, чтобы сверху оказался герой с самым высоким показателем.
      </Typography>
      <SortableList index={index} answers={items} />
    </Box>
  )
}

export default Sorting
