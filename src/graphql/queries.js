import { gql } from "@apollo/client";

export const GET_ALL_TASKS = gql`
  query GetALLTasks {
    allTasks {
      id
      title
      isCompleted
      category {
        name
      }
    }
  }
`;
