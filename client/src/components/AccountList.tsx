//  list accounts in a table format typescript / apollo graphql
import React, { useState, useEffect } from "react";
import { useQuery, gql } from "@apollo/client";

interface Account {
  fullName: string;
  username: string;
  balance: number;
  accountNumber: number;
  address: string;
}

const GET_ACCOUNTS = gql`
  query {
    accounts {
      fullName
      username
      balance
      accountNumber
      address
    }
  }
`;

const AccountList = () => {
  const { loading, error, data } = useQuery(GET_ACCOUNTS);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;
  return (
    // <table>
    //   <thead>
    //     <tr>
    //       <th>Full Name</th>
    //       <th>Username</th>
    //       <th>Balance</th>
    //       <th>Account Number</th>
    //       <th>Address</th>
    //     </tr>
    //   </thead>
    //   <tbody>
    //     {data.accounts.map((account: any) => (
    //       <tr key={account.account_number}>
    //         <td>{account.full_name}</td>
    //         <td>{account.username}</td>
    //         <td>{account.balance}</td>
    //         <td>{account.account_number}</td>
    //         <td>{account.address}</td>
    //       </tr>
    //     ))}
    //   </tbody>
    // </table>

    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Account Number
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Balance
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Address
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Make A Transaction</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {data.accounts.map((account: Account) => (
                  <tr key={account.accountNumber}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <img
                            className="h-10 w-10 rounded-full"
                            src="https://avatars.dicebear.com/api/male/john.svg?background=%230000ff"
                            alt=""
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {account.fullName}
                          </div>
                          <div className="text-sm text-gray-500">
                            {account.username}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {account.accountNumber}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        ${account.balance}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {account.address}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <a
                        href="#"
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        Make A Transaction
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountList;
