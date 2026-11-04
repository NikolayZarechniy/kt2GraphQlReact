import { gql } from "@apollo/client";

export const CREATE_TASK = gql`
  mutation CreateTask($title: String!) {
    createTask(title: $title) {
      id
      title
      isCompleted
    }
  }
`;
export const COMPLETE_TASK = gql`
mutation CompleteTask($id: ID!) {
completeTask(id: $id) {
id
isCompleted
}
}
`;
