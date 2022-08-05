import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn
} from 'typeorm'

@Entity()
export default class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  username: string

  @Column()
  word: string

  @Column({
    default: 1
  })
  attempts: number

  @Column({
    default: false
  })
  wins: boolean

  @CreateDateColumn()
  createdAt: Date
}
