"use client";

import ConvexTable from "@/components/elements/table/ConvexTable";
import DashboardHeading from "@/components/elements/text/DashboardHeading";
import { api } from "@/convex/_generated/api";
import { Role } from "@/models/role";

const UsersPage = () => {
  return (
    <DashboardHeading title="users">
      <ConvexTable
        query={api.tables.users.getPaginated}
        pagination={10}
        searchable={true}
        headers={[
          { label: "Name", key: "name" },
          { label: "Email", key: "email" },
          {
            label: "Role",
            key: "role",
            parse: (value: Role | null | undefined) => {
              return value?.name;
            },
          },
        ]}
      />
    </DashboardHeading>
  );
};

export default UsersPage;
