import React, { useState } from "react";
import { useMutation, gql } from "@apollo/client";

const CREATE_ACCOUNT = gql`
  mutation createAccount($input: AccountInput!) {
    createAccount(input: $input) {
      account_id
      full_name
      username
      address
      account_number
      balance
    }
  }
`;

interface Account {
  account_id: number;
  full_name: string;
  username: string;
  balance: number;
  account_number: number;
  address: string;
}

interface CreateAccountDetails {
  full_name: string;
  username: string;
  address: string;
}

export default function Header() {
  const [showModal, setShowModal] = React.useState(false);
  const [full_name, setFull_Name] = useState(" ");
  const [username, setUsername] = useState(" ");
  const [address, setAddress] = useState(" ");

  const [createAccount, { error, data }] = useMutation<
    { createAccount: Account },
    { input: CreateAccountDetails }
  >(CREATE_ACCOUNT, {
    variables: {
      input: { full_name, username, address },
    },
  });

  if (error) {
    console.log(error);
  }

  return (
    <div>
      <div className="w-screen flex flex-row items-center p-1 justify-between bg-white shadow-xs">
        <div className="ml-8 text-lg text-gray-700 hidden md:flex">
          Bank Space
        </div>
        <span className="w-screen md:w-1/3 h-10 bg-gray-200 cursor-pointer border border-gray-300 text-sm rounded-full flex">
          <input
            type="search"
            name="search"
            placeholder="Search"
            className="flex-grow px-4 rounded-l-full rounded-r-full text-sm focus:outline-none"
          />
          <i className="fas fa-search m-3 mr-5 text-lg text-gray-700 w-4 h-4"></i>
        </span>
        <div className="flex flex-row-reverse mr-4 ml-4 md:hidden">
          <i className="fas fa-bars"></i>
        </div>
        <>
          <button
            className="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            type="button"
            onClick={() => setShowModal(true)}
          >
            Create Account
          </button>
          {showModal ? (
            <>
              <div className="bg-grey-lighter min-h-screen flex flex-col justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
                  <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
                    <h1 className="mb-8 text-3xl text-center">
                      Create an account
                      {error ? <p> Oh no! {error.message}</p> : null}
                      {data && data.createAccount ? <p>Created!</p> : null}
                    </h1>
                    <form>
                      <input
                        type="text"
                        className="block border border-grey-light w-full p-3 rounded mb-4"
                        name="full_name"
                        placeholder="Full Name"
                        onChange={(e) => setFull_Name(e.target.value)}
                      />

                      <input
                        type="text"
                        className="block border border-grey-light w-full p-3 rounded mb-4"
                        name="username"
                        placeholder="username"
                        onChange={(e) => setUsername(e.target.value)}
                      />

                      <input
                        type="text"
                        className="block border border-grey-light w-full p-3 rounded mb-4"
                        name="address"
                        placeholder="address"
                        onChange={(e) => setAddress(e.target.value)}
                      />

                      <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                        <button
                          className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                          type="button"
                          onClick={() => setShowModal(false)}
                        >
                          Close
                        </button>
                        <button
                          className="bg-emerald-500 text-gray-800 active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                          type="button"
                          onClick={() =>
                            full_name && username && address && createAccount()
                          }
                        >
                          Create
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              ;
            </>
          ) : null}
        </>
      </div>
    </div>
  );
}

//  <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
//   <div className="relative w-auto my-6 mx-auto max-w-6xl">
//     {/*content*/}
//     <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
//       {/*header*/}
//       <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
//         <h3 className="text-3xl font-semibold">Modal Title</h3>
//         <button
//           className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
//           onClick={() => setShowModal(false)}
//         >
//           <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
//             ×
//           </span>
//         </button>
//       </div>
//       {/*body*/}
//       <div className="relative p-6 flex-auto">
//         <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
//           I always felt like I could do anything. That’s the main
//           thing people are controlled by! Thoughts- their
//           perception of themselves! They're slowed down by their
//           perception of themselves. If you're taught you can’t do
//           anything, you won’t do anything. I was taught I could do
//           everything.
//         </p>
//       </div>
//       {/*footer*/}
//       <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
//         <button
//           className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
//           type="button"
//           onClick={() => setShowModal(false)}
//         >
//           Close
//         </button>
//         <button
//           className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
//           type="button"
//           onClick={() => setShowModal(false)}
//         >
//           Save Changes
//         </button>
//       </div>
//     </div>
//   </div>
// </div>
// <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
