import User from '../entities/user'

export default class UserService {
  saveUser = async (user: User): Promise<User | null> => {
    const result = await User.save(user)
    return result
  }

  StaticsUser = async (id: number): Promise <User | null> => {
    const result = await User.findOneBy({ id })
    return result
  }

  findByData = async (data: any): Promise<boolean> => {
    await User.findOneBy(data)
    return true
  }

  findWordBySession = async (user: string): Promise<User | null> => {
    const session = await User.getRepository()
      .createQueryBuilder('user')
      .select('user.word')
      .addSelect('user.wins')
      .addSelect('user.id')
      .where('user.username = :user1', { user1: user })
      .andWhere("user.createdAt > now()::timestamp-'5min'::interval")
      .andWhere('user.attempts < 5')
      .andWhere('user.wins = false')
      .orderBy('user.createdAt', 'DESC')
      .getOne()
    return session
  }

  findWordByLast = async (): Promise<string | null> => {
    const session = await User.getRepository()
      .createQueryBuilder('user')
      .select('user.word')
      .orderBy('user.createdAt', 'DESC')
      .limit(1)
      .getOne()
    return session?.word ?? null
  }

  saveAttempt = async (session: User, won: boolean): Promise<User> => {
    const update = await User.getRepository()
      .createQueryBuilder()
      .update(session)
      .set({ wins: won, attempts: () => 'attempts + 1' })
      .where('id = :id', { id: session.id })
      .returning('*')
      .execute()
    return update.raw[0]
  }

  getBestUsers = async (): Promise<any> => {
    const topTen = await User.getRepository()
      .createQueryBuilder('user')
      .select('COUNT(*)', 'totalWins')
      .addSelect('username')
      .where('wins = true')
      .groupBy('user.username')
      .orderBy('"totalWins"', 'DESC')
      .limit(10)
      .getRawMany()
    return topTen
  }

  getEasyWords = async (count: number): Promise<any> => {
    const topTen = await User.getRepository()
      .createQueryBuilder('user')
      .select('COUNT(*)', 'total')
      .addSelect('word')
      .groupBy('user.word')
      .orderBy('"total"', 'DESC')
      .limit(count)
      .getRawMany()
    return topTen
  }

  getStatisticsUser = async (user: string): Promise<any> => {
    const staUser = await User.getRepository()
      .createQueryBuilder('user')
      .select('SUM(CASE WHEN WINS = TRUE THEN 1 ELSE 0 END)', 'totalWins')
      .addSelect('COUNT(*)', 'totalMatches')
      .addSelect('username')
      .where('user.username = :user1', { user1: user })
      .groupBy('user.username')
      .limit(1)
      .getRawOne()
    return staUser
  }
}
