import { Resolver, Query, Arg, Mutation } from "type-graphql";
import { Account } from "../entities/Account";
import { Transaction } from "../entities/Transaction";
import { InputType, Field } from "type-graphql";

// generate 12 digit unique random number with time stamp

// const uniqueAccNum = Math.floor(new Date().valueOf() * Math.random());

// const randomAccountNumber = Math.floor(Math.random() * 99999999999);

@InputType()
export class CreateAccountInput {
  @Field()
  fullName: string;

  @Field()
  username: string;

  @Field()
  address: string;
}

@InputType()
export class CreateTransactionInput {
  @Field()
  bankName: string;

  @Field()
  transactionAccountNumber: number;

  @Field()
  amount: number;

  @Field()
  note: string;

  @Field()
  type: string;
}

// @ObjectType()
// class AccountResponse {
//   @Field(() => Account)
//   account: Account;
// }

@Resolver()
export class AccountResolver {
  @Query(() => [Account])
  accounts() {
    return Account.find();
  }
  // view accounts by searching username

  @Query(() => Account)
  async account(@Arg("username") username: string) {
    return await Account.findOne({ where: { username } });
  }

  //   @Mutation(() => Account)
  //   async createAccount(
  //     @Arg("data") { full_name, username, address }: CreateAccountInput
  //   ) {
  //     const account = Account.create({
  //       full_name,
  //       username,
  //       address,
  //       balance: 40000,
  //       account_number: Date.now() + Math.floor(Math.random()),
  //     });

  //     await account.save();

  //     return account;
  //   }
  // }

  // create an account and throw an error if username already exists
  @Mutation(() => Account)
  async createAccount(
    @Arg("input") input: CreateAccountInput
  ): Promise<Account> {
    const username: Account | undefined = await Account.findOne({
      where: { username: input.username },
    });
    if (username) {
      throw new Error("Username already exists");
    } else {
      try {
        const account = await Account.create({
          fullName: input.fullName,
          username: input.username,
          address: input.address,
          balance: 1000000,
          accountNumber: Math.floor(Math.random() * 999999999999),
        }).save();
        return account;
      } catch (err) {
        throw new Error(err);
      }
    }
  }

  // create a transaction of type credit or debit, which takes in the input from the user and creates a transaction of type credit or debit, and update it to the account
  // @Mutation(() => Transaction)
  // async createTransaction(
  //   @Arg("data")
  //   {
  //     bankName,
  //     transactionAccountNumber,
  //     amount,
  //     note,
  //     type,
  //   }: CreateTransactionInput
  // ) {
  //   const account = await Account.findOne({
  //     where: { accountNumber: transactionAccountNumber },
  //   });
  //   if (!account) {
  //     throw new Error("Account does not exist");
  //   }
  //   const transaction = Transaction.create({
  //     bankName,
  //     accountNumber: transactionAccountNumber,
  //     amount,
  //     note,
  //     type,
  //   });
  //   await transaction.save();
  //   if (type === "debit") {
  //     account.balance = account.balance - amount;
  //   } else if (type === "credit") {
  //     account.balance = account.balance + amount;
  //   }
  //   await account.save();
  //   return transaction;
  // }
  // async createTransaction(
  //   @Arg("input") input: CreateTransactionInput
  // ): Promise<Transaction> {
  //   const account: Account | undefined = await Account.findOne({
  //     where: { accountNumber: input.transactionAccountNumber },
  //   });
  //   if (!account) {
  //     throw new Error("Account number does not exist");
  //   } else {
  //     try {
  //       const transaction = await Transaction.create({
  //         bankName: input.bankName,
  //         accountNumber: input.transactionAccountNumber,
  //         amount: input.amount,
  //         note: input.note,
  //         type: input.type,
  //       }).save();
  //       return transaction;
  //     } catch (err) {
  //       throw new Error(err);
  //     }
  //   }
  // }
}
