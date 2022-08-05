import fs from 'fs'
import { ResultInterface } from '../types'

let words: string[]
export default class WordsService {
  getWords = (usedWord): string[] => {
    if (words == null) {
      const data = fs.readFileSync('words.txt', 'utf8')
      words = data.split('\n').filter(word => word.length === 5 && (word !== usedWord))
      return words
    }
    return words
  }

  playWord = async (arr): Promise<string> => {
    const word = arr[Math.floor(Math.random() * arr.length)]
    return word
  }

  tourLetter = async (userWord: any, currentWord: string): Promise<ResultInterface[]> => {
    const response: ResultInterface[] = []
    const letters: string[] = [...userWord]
    letters.forEach((letter, index) => {
      if (letter === currentWord[index]) {
        response.push({
          letter: userWord[index],
          value: 1
        })
      } else if (currentWord.includes(letter)) {
        response.push({
          letter: userWord[index],
          value: 2
        })
      } else {
        response.push({
          letter: userWord[index],
          value: 3
        })
      }
    })
    return response
  }
}
