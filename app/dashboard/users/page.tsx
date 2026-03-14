"use client";

import BaseTable from "@/components/elements/table/BaseTable";
import DashboardHeading from "@/components/elements/text/DashboardHeading";
import { api } from "@/convex/_generated/api";
import { Role } from "@/models/role";
import { useQuery } from "convex/react";

const UsersPage = () => {
  const users = useQuery(api.tables.users.get);

  return (
    <DashboardHeading title="users">
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
    </DashboardHeading>
  );
};

export default UsersPage;
