// importing decorators "BaseEntity is not a decorator"

import { ObjectType, Field, Int } from "type-graphql";

import {
  Entity,
  BaseEntity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";

import { Transaction } from "./Transaction";

@ObjectType()
@Entity("accounts") // name of the table 'account'

// BaseEntity to perform CRUD operations
export class Account extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String)
  @Column()
  fullName: string;

  @Field(() => String)
  @Column({ unique: true })
  username: string;

  @Field(() => String)
  @Column()
  address: string;

  @Field(() => Int)
  @Column({ type: "numeric" })
  balance: number;

  @Field()
  @Column({ type: "bigint" }) // maximum int value is 10 digits, therefore bigint is used
  accountNumber: number;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Transaction, (transaction) => transaction.account)
  transactions: Transaction[];
}
