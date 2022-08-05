import { Request, Response } from 'express'
import UserService from '../Services/user.service'
import User from '../entities/user'
import { JSON } from '../types'
import WordService from '../Services/word.service'

export const createUser = async (req: Request, res: Response): Promise<any> => {
  try {
    const { username, word } = req.body
    if (word?.length === 5) {
      const userSearch = new UserService()
      let session = await userSearch.findWordBySession(username)
      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
      if (!session) {
        const newWord = new WordService()
        const lastWord = await userSearch.findWordByLast()
        const rndWord = await newWord.playWord(newWord.getWords(lastWord))
        const user = new User()
        user.username = username
        user.word = rndWord
        const UserSave = new UserService()
        session = await UserSave.saveUser(user)
      }
      session = session as User
      const newWord = new WordService()
      const result = await newWord.tourLetter(word, session.word)
      const won = !result.some(x => x.value !== 1)
      const savedItem = await userSearch.saveAttempt(session, won)
      if (savedItem?.wins) {
        return res.status(200).json(`Winner! You did it in ${savedItem.attempts}. The word was ${savedItem.word}`)
      } else if (savedItem.attempts >= 5) {
        return res.status(200).json('You reached the max allowed attempts (5). Good luck next time!')
      } else {
        return res.status(200).json(result)
      }
    } else {
      return res.status(400).json('Word must contain 5 letters')
    }
  } catch (err) {
    return res.status(500).json(err)
  }
}

export const getStatistics = async (req: Request, res: Response): Promise<Response<JSON, Record<string, any>>> => {
  try {
    const UserStatics = new UserService()
    const user = await UserStatics.getStatisticsUser(req.params.username)
    return res.json({ username: user.username, totalMatches: user.totalMatches, totalWins: user.totalWins })
  } catch (err) {
    return res.status(500).json(err)
  }
}

export const getTopUsers = async (_req: Request, res: Response): Promise<Response<JSON, Record<string, any>>> => {
  try {
    const TopUsers = new UserService()
    const users: any[] = await TopUsers.getBestUsers()
    const result = users.map((user) => ({
      username: user.username,
      totalWins: user.totalWins
    }))
    return res.json(result)
  } catch (err) {
    return res.status(500).json(err)
  }
}

export const getTopWords = async (req: Request, res: Response): Promise<Response<JSON, Record<string, any>>> => {
  try {
    const TopUsers = new UserService()
    const words: any[] = await TopUsers.getEasyWords(+(req.query.count ?? 10))
    const result = words.map((word) => ({
      username: word.word,
      total: word.total
    }))
    return res.json(result)
  } catch (err) {
    return res.status(500).json(err)
  }
}
