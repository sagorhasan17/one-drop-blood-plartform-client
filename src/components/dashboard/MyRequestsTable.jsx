"use client";

import { Button, Chip, Table } from "@heroui/react";
import Link from "next/link";
import { FiEdit, FiEye, FiMail, FiTrash2, FiUser } from "react-icons/fi";
import { MdOutlineLocationOn } from "react-icons/md";

const statusColorMap = {
  Active: "success",
  Inactive: "danger",
  "On Leave": "warning",
  pending: "warning",
  inprogress: "primary",
  done: "success",
  cancelled: "danger",
};

export default function MyRequestsTable({ users = [] }) {
  return (
    <div className="overflow-hidden rounded-3xl border border-default-200 bg-white shadow-sm">
      <Table>
        <Table.ScrollContainer>
          <Table.Content
            aria-label="My Donation Requests"
            className="min-w-275"
          >
            <Table.Header>
              <Table.Column>ID</Table.Column>

              <Table.Column isRowHeader>Recipient</Table.Column>

              <Table.Column>Email</Table.Column>
              <Table.Column>Location</Table.Column>

              <Table.Column>Blood Group</Table.Column>

              <Table.Column>Status</Table.Column>

              <Table.Column className="text-end">Actions</Table.Column>
            </Table.Header>

            <Table.Body
              items={users}
              emptyContent={
                <div className="py-10 text-center text-default-500">
                  No donation requests found
                </div>
              }
            >
              {(user) => (
                <Table.Row key={user._id || user.id} id={user._id || user.id}>
                  <Table.Cell>
                    <span className="font-medium text-default-500">
                      #{String(user._id || user.id).slice(-3)}
                    </span>
                  </Table.Cell>

                  <Table.Cell>
                    <div className="flex items-center gap-3">
                      {/* <Avatar
                        size="sm"
                        name={user?.recipientName || user?.name}
                      /> */}

                      <div>
                        <p className="font-semibold text-default-900 flex items-center gap-2">
                          <FiUser
                            size={16}
                            className="text-red-500 font-bold"
                          />
                          {user?.recipientName}
                        </p>
                        {/* <p className="text-xs text-default-500">Recipient</p> */}
                      </div>
                    </div>
                  </Table.Cell>

                  <Table.Cell>
                    <span className="text-sm text-default-700 flex items-center gap-2">
                      <FiMail size={16} className="text-red-500 font-bold" />
                      {user?.requesterEmail}
                    </span>
                  </Table.Cell>

                  <Table.Cell>
                    <span className="text-sm text-default-700 flex items-center gap-1">
                      <MdOutlineLocationOn
                        size={16}
                        className="text-red-500 font-bold"
                      />
                      {user?.districtName}
                    </span>
                  </Table.Cell>

                  <Table.Cell>
                    <Chip
                      color="danger"
                      variant="soft"
                      size="lg"
                      className="font-semibold"
                    >
                      {user.bloodGroup}
                    </Chip>
                  </Table.Cell>

                  <Table.Cell>
                    <Chip
                      size="sm"
                      variant="soft"
                      color={
                        statusColorMap[user.donationStatus || user.status] ||
                        "default"
                      }
                      className="capitalize"
                    >
                      {user.donationStatus || user.status}
                    </Chip>
                  </Table.Cell>

                  <Table.Cell>
                    <div className="flex justify-end gap-2">
                      <Button
                        isIconOnly
                        size="sm"
                        variant="ghost"
                        aria-label="View"
                      >
                        <FiEye size={16} />
                      </Button>

                      <Link
                        href={`/dashboard/donor/request-donor/my-requests/${user._id}`}
                      >
                        <Button
                          isIconOnly
                          size="sm"
                          variant="ghost"
                          aria-label="Edit"
                        >
                          <FiEdit size={16} />
                        </Button>
                      </Link>

                      <Button
                        isIconOnly
                        size="sm"
                        color="danger"
                        variant="light"
                        aria-label="Delete"
                      >
                        <FiTrash2 size={16} />
                      </Button>
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
