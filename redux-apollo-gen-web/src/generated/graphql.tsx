import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string | number; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type LoginResponse = {
  __typename?: 'LoginResponse';
  access_token: Scalars['String']['output'];
  refresh_token: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addNote: Note;
  deleteNote: Scalars['Boolean']['output'];
  login: LoginResponse;
  revokeUserSession: Scalars['Boolean']['output'];
  signUp: Scalars['Boolean']['output'];
  updateNote: Note;
};


export type MutationAddNoteArgs = {
  content: Scalars['String']['input'];
  title: Scalars['String']['input'];
};


export type MutationDeleteNoteArgs = {
  noteId: Scalars['String']['input'];
};


export type MutationLoginArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationRevokeUserSessionArgs = {
  userId: Scalars['String']['input'];
};


export type MutationSignUpArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationUpdateNoteArgs = {
  content: Scalars['String']['input'];
  noteId: Scalars['String']['input'];
  title: Scalars['String']['input'];
};

export type Note = {
  __typename?: 'Note';
  content: Scalars['String']['output'];
  created_at: Scalars['String']['output'];
  created_by: User;
  id: Scalars['String']['output'];
  title: Scalars['String']['output'];
  updated_at: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  hello: Scalars['String']['output'];
  listNotes: Array<Note>;
  me: User;
};

export type User = {
  __typename?: 'User';
  email: Scalars['String']['output'];
  id: Scalars['String']['output'];
  token_version: Scalars['Int']['output'];
  username: Scalars['String']['output'];
};

export type LoginSiniMutationVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type LoginSiniMutation = { __typename?: 'Mutation', login: { __typename?: 'LoginResponse', access_token: string, refresh_token: string } };

export type DaftarSiniMutationVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type DaftarSiniMutation = { __typename?: 'Mutation', signUp: boolean };


export const LoginSiniDocument = gql`
    mutation LoginSini($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    access_token
    refresh_token
  }
}
    `;
export type LoginSiniMutationFn = Apollo.MutationFunction<LoginSiniMutation, LoginSiniMutationVariables>;

/**
 * __useLoginSiniMutation__
 *
 * To run a mutation, you first call `useLoginSiniMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginSiniMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginSiniMutation, { data, loading, error }] = useLoginSiniMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginSiniMutation(baseOptions?: Apollo.MutationHookOptions<LoginSiniMutation, LoginSiniMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginSiniMutation, LoginSiniMutationVariables>(LoginSiniDocument, options);
      }
export type LoginSiniMutationHookResult = ReturnType<typeof useLoginSiniMutation>;
export type LoginSiniMutationResult = Apollo.MutationResult<LoginSiniMutation>;
export type LoginSiniMutationOptions = Apollo.BaseMutationOptions<LoginSiniMutation, LoginSiniMutationVariables>;
export const DaftarSiniDocument = gql`
    mutation DaftarSini($email: String!, $password: String!) {
  signUp(email: $email, password: $password)
}
    `;
export type DaftarSiniMutationFn = Apollo.MutationFunction<DaftarSiniMutation, DaftarSiniMutationVariables>;

/**
 * __useDaftarSiniMutation__
 *
 * To run a mutation, you first call `useDaftarSiniMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDaftarSiniMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [daftarSiniMutation, { data, loading, error }] = useDaftarSiniMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useDaftarSiniMutation(baseOptions?: Apollo.MutationHookOptions<DaftarSiniMutation, DaftarSiniMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DaftarSiniMutation, DaftarSiniMutationVariables>(DaftarSiniDocument, options);
      }
export type DaftarSiniMutationHookResult = ReturnType<typeof useDaftarSiniMutation>;
export type DaftarSiniMutationResult = Apollo.MutationResult<DaftarSiniMutation>;
export type DaftarSiniMutationOptions = Apollo.BaseMutationOptions<DaftarSiniMutation, DaftarSiniMutationVariables>;