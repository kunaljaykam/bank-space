import { gql } from "@apollo/client";

interface CreateAccountInput {
  variables: {
    input: {
      fullName: string;
      username: string;
      address: string;
    };
  };
}

const CREATE_ACCOUNT = gql`
  mutation createAccount($input: CreateAccountInput!) {
    createAccount(input: $input) {
      accountId
      fullName
      username
      address
      balance
      accountNumber
    }
  }
`;

// export const useCreateAccount = () : ((
//     createAccountInput: CreateAccountInput,
// ) => any) => {
//     const [ createAccount] = useMutation
// ))
