"use client";

import { updateUserRole } from "@/lib/api/users";
import { Avatar, Chip, Table } from "@heroui/react";
import { useState } from "react";
import { FiMail, FiUser } from "react-icons/fi";
import { DotDropDown } from "../shared/modal/DotDropDown";

const statusColorMap = {
  active: "success",
  blocked: "danger",
};

export default function UsersTable({ users = [] }) {
  const [userList, setUserList] = useState(users);

  const handleRoleChange = async (userId, role) => {
    try {
      await updateUserRole(userId, role);

      setUserList((prev) =>
        prev.map((user) =>
          user._id === userId
            ? {
                ...user,
                role,
              }
            : user,
        ),
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="overflow-hidden rounded-3xl border border-default-200 bg-white shadow-sm">
      <Table>
        <Table.ScrollContainer>
          <Table.Content aria-label="All Users" className="min-w-225">
            <Table.Header>
              <Table.Column>ID</Table.Column>
              <Table.Column isRowHeader>User Profile</Table.Column>
              <Table.Column>Email</Table.Column>
              <Table.Column>Current Role</Table.Column>
              <Table.Column>Status</Table.Column>
              <Table.Column className="text-end">Actions</Table.Column>
            </Table.Header>

            <Table.Body
              items={userList}
              emptyContent={
                <div className="py-10 text-center text-default-500">
                  No users found
                </div>
              }
            >
              {(user) => (
                <Table.Row key={user._id}>
                  {/* ID */}
                  <Table.Cell>
                    <span className="font-medium text-default-500">
                      #{String(user._id).slice(-5)}
                    </span>
                  </Table.Cell>

                  {/* User */}
                  <Table.Cell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <Avatar.Image
                          src={user?.image || user?.profilePhoto}
                          alt={user?.name}
                          referrerPolicy="no-referrer"
                        />
                        <Avatar.Fallback>
                          {user?.name?.charAt(0) || "U"}
                        </Avatar.Fallback>
                      </Avatar>

                      <div>
                        <p className="flex items-center gap-2 font-semibold">
                          <FiUser className="text-primary" />
                          {user?.name}
                        </p>
                      </div>
                    </div>
                  </Table.Cell>

                  {/* Email */}
                  <Table.Cell>
                    <div className="flex items-center gap-2">
                      <FiMail className="text-primary" />
                      {user?.email}
                    </div>
                  </Table.Cell>

                  {/* Role */}
                  <Table.Cell>
                    <Chip
                      size="sm"
                      variant="flat"
                      color={
                        user?.role === "admin"
                          ? "danger"
                          : user?.role === "volunteer"
                            ? "warning"
                            : "primary"
                      }
                      className="capitalize"
                    >
                      {user?.role}
                    </Chip>
                  </Table.Cell>

                  {/* Status */}
                  <Table.Cell>
                    <Chip
                      size="sm"
                      variant="flat"
                      color={statusColorMap[user?.status] || "default"}
                      className="capitalize"
                    >
                      {user?.status}
                    </Chip>
                  </Table.Cell>

                  {/* Actions */}
                  <Table.Cell>
                    <div className="flex justify-end">
                      <DotDropDown
                        userId={user._id}
                        onRoleChange={handleRoleChange}
                      />
                    </div>
                  </Table.Cell>
                </Table.Row>
              )}
            </Table.Body>
          </Table.Content>
        </Table.ScrollContainer>
      </Table>
    </div>
  );
}
