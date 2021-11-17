import {
  Entity,
  BaseEntity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from "typeorm";
import { ObjectType, Field, Int } from "type-graphql";

import { Account } from "./Account";

@ObjectType()
@Entity("transactions") // <-- table name
export class Transaction extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Account, (account) => account.transactions)
  account: Account;

  @Field()
  @Column()
  transactionType: string;

  @Field()
  @Column()
  bankName: string;

  @Field()
  @Column({ type: "numeric" })
  amount: number;

  @Field()
  @Column()
  note: string;

  @Field()
  @Column({ type: "bigint" }) // maximum int value is 10 digits, therefore bigint is used
  transactionAccountNumber: number;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;
}

// create an entity class with type of deposit or withdrawal, and update account balance
