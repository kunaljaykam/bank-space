import { Resolver, Query, Arg, Mutation } from "type-graphql";
import { Transaction } from "../entities/Transaction";
import { InputType, Field, ObjectType, Float } from "type-graphql";
import { Account } from "../entities/Account";

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

// account object type
@ObjectType()
class TransactionResponse {
  @Field(() => Account)
  account: Account;
}

@Resolver()
export class TransactionResolver {
  @Query(() => [Transaction])
  async transactions() {
    return await Transaction.find();
  }

  // query transactions by account_id
  @Query(() => TransactionResponse)
  async transaction(@Arg("account_id") account_id: number) {
    const account = await Account.findOne(account_id);
    return { account };
  }
}

//   // laguage: typescript
//   // create transaction with type deposit or withdrawal, and update account balance in typescript
// //   @Mutation(() => Transaction)
// //   async createTransaction(
// //     @Arg("data")
// //     { bank_name, account_number, amount, note, type }: CreateTransactionInput
// //   ) {
// //     const transaction = Transaction.create({
// //       bank_name,
// //       account_number,
// //       amount,
// //       note,
// //       type,
// //     });
// //     await transaction.save();
// //     const account: Account | undefined = await Account.findOne({
// //       where: { account_number },
// //     });

// //     if (account) {
// //       let balance = account.balance;

// //       if (type == TransactionType.CREDIT) {
// //         account.balance = account.balance + amount;
// //         account.transactions = [transaction];
// //       } else if (type == TransactionType.DEBIT) {
// //         account.balance = account.balance - amount;
// //         account.transactions = [transaction];
// //       }
// //       await account.save();
// //     }
// //     return transaction;
// //   }
// // }

// // mutation for creating a new transaction with type deposit or withdrawal and update account balance

//   @Mutation(() => Transaction)
//   async createTransaction(
//     @Arg("data") { bankName, transactionAccountNumber, amount, note, type }: CreateTransactionInput
//   ) {
//     const account : Account | undefined = await Account.findOne({ where: { accountId: transactionId } })

//     if (account) {

//       let balance = account.balance;

//       if (type == TransactionType.CREDIT) {
//         account.balance = account.balance + amount;
//         account.transactions = [transaction];
//       } else if (type == TransactionType.DEBIT) {
//         account.balance = account.balance - amount;
//         account.transactions = [transaction];
//       }
//       await account.save();
//     }
