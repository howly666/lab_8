import { Button, Container, Divider, Paper, Stack, Typography } from '@mui/material'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState } from '../../store'
import { quiz, type QuizItem } from '../quizData'
import Matching from './Matching'
import { resetLists } from './quizSlice'
import Sorting from './Sorting'

type ResultRow = {
  id: number
  title: string
  correct: number
  total: number
}

function countMatchingCorrect(item: QuizItem, currentItems: string[]) {
  return item.tasks.reduce((sum, task, index) => {
    return sum + (currentItems[index] === task.answer ? 1 : 0)
  }, 0)
}

function countSortingCorrect(item: QuizItem, currentItems: string[]) {
  const correctOrder = [...item.tasks]
    .sort((a, b) => Number(a.answer) - Number(b.answer))
    .map(task => task.question)

  return correctOrder.reduce((sum, correctItem, index) => {
    return sum + (currentItems[index] === correctItem ? 1 : 0)
  }, 0)
}

function Quiz() {
  const dispatch = useDispatch()
  const lists = useSelector((state: RootState) => state.quiz.lists)
  const [results, setResults] = useState<ResultRow[] | null>(null)

  const checkQuiz = () => {
    const nextResults = quiz.map((item, index) => {
      const currentItems = lists[index] ?? []
      const correct = item.type === 'M'
        ? countMatchingCorrect(item, currentItems)
        : countSortingCorrect(item, currentItems)

      return {
        id: item.id,
        title: item.title,
        correct,
        total: item.tasks.length,
      }
    })

    setResults(nextResults)
  }

  const restartQuiz = () => {
    dispatch(resetLists())
    setResults(null)
  }

  return (
    <Container maxWidth="md" sx={{ py: 3 }}>
      {quiz.map((item, index) => (
        <Paper key={item.id} component="section" variant="outlined" sx={{ mb: 3, p: { xs: 2, md: 3 } }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 800 }}>
            {index + 1}. {item.title}
          </Typography>

          {item.type === 'M' ? (
            <Matching index={index} tasks={item.tasks} />
          ) : (
            <Sorting index={index} tasks={item.tasks} />
          )}
        </Paper>
      ))}

      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ my: 3, justifyContent: 'center' }}>
        <Button variant="contained" size="large" onClick={checkQuiz}>
          Проверить
        </Button>
        <Button variant="contained" color="secondary" size="large" onClick={restartQuiz}>
          Начать снова
        </Button>
      </Stack>

      {results && (
        <Paper variant="outlined" sx={{ p: { xs: 2, md: 3 }, textAlign: 'center' }}>
          <Typography variant="h5" sx={{ fontWeight: 900, mb: 2 }}>
            Результаты тестирования
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Stack spacing={1.2}>
            {results.map((row, index) => (
              <Typography key={row.id} variant="body1">
                Задание {index + 1}. {row.correct === row.total
                  ? 'Все ответы верные.'
                  : `Верных ответов: ${row.correct} из ${row.total}.`}
              </Typography>
            ))}
          </Stack>
        </Paper>
      )}
    </Container>
  )
}

export default Quiz
