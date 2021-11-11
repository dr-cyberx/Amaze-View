import React from "react";
import { useQuery, gql, OperationVariables } from "@apollo/client";

const getUser = gql`
  query GetUser {
    getUser {
      id
      lastName
      firstName
      userName
      email
      age
      gender
      phoneNumber
    }
  }
`;

const Users: React.FC = () => {
  const { error, loading, data } = useQuery<any, OperationVariables>(getUser);
  if (loading) return <h3>Loading...</h3>;
  if (error) return <h3>failed to fetch</h3>;
  return (
    <div>
      {data?.getUser?.map((d) => (
        <h3 key={d.id}>{d.firstName}</h3>
      ))}
    </div>
  );
};

export default Users;
