import { quiz, tQuiz } from '../quizData';

export function shuffleArray<T>(source: T[]): T[] {
  const result = [...source];

  for (let i = result.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }

  return result;
}

export function getInitialItems(item: tQuiz): string[] {
  if (item.type === 'S') {
    return shuffleArray(item.tasks.map((task) => task.question));
  }

  return shuffleArray(item.tasks.map((task) => task.answer));
}

export function createQuizLists(): string[][] {
  return quiz.map((item) => getInitialItems(item));
}

export function getCorrectAnswersCount(item: tQuiz, userItems: string[] = []): number {
  if (item.type === 'S') {
    const expected = [...item.tasks]
      .sort((a, b) => Number(a.answer) - Number(b.answer))
      .map((task) => task.question);

    return expected.reduce((count, expectedItem, index) => {
      return count + (userItems[index] === expectedItem ? 1 : 0);
    }, 0);
  }

  return item.tasks.reduce((count, task, index) => {
    return count + (userItems[index] === task.answer ? 1 : 0);
  }, 0);
}
