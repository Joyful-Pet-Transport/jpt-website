"use client";

import BoxedContainer from "@/components/containers/BoxedContainer";
import BaseTable from "@/components/elements/table/BaseTable";
import Heading from "@/components/elements/text/Heading";
import { api } from "@/convex/_generated/api";
import { Role } from "@/models/role";
import { useQuery } from "convex/react";

const UsersPage = () => {
  const users = useQuery(api.tables.users.get);

  return (
    <BoxedContainer>
      <Heading size="medium">Users</Heading>
      <BaseTable
        headers={[
          { label: "Name", key: "name" },
          { label: "Email", key: "email" },
          {
            label: "Role",
            key: "role",
            parse: (value: Role) => {
              return value.name;
            },
          },
        ]}
        hasActions={false}
        data={users}
      />
    </BoxedContainer>
  );
};

export default UsersPage;
