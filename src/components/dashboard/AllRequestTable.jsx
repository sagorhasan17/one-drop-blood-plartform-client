"use client";

import { Button, Chip, Pagination, Table } from "@heroui/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FiEdit, FiEye, FiMail, FiUser } from "react-icons/fi";
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

export default function AllRequestTable({ requests = [] }) {
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;
  const totalItems = requests.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Current page data
  const paginatedRequests = requests.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage,
  );

  // Summary
  const startItem = totalItems === 0 ? 0 : (page - 1) * itemsPerPage + 1;
  const endItem = Math.min(page * itemsPerPage, totalItems);

  // Generate page numbers
  const getPageNumbers = () => {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  };

  // Reset page if data changes
  useEffect(() => {
    if (page > totalPages && totalPages > 0) {
      setPage(1);
    }
  }, [page, totalPages]);

  return (
    <div className="overflow-hidden rounded-3xl border border-default-200 bg-black shadow-sm mb-3 py-4 px-4">
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
              items={paginatedRequests}
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
                      <div>
                        <p className="font-semibold text-default-900 flex items-center gap-2">
                          <FiUser
                            size={16}
                            className="text-red-500 font-bold"
                          />
                          {user?.recipientName}
                        </p>
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
                      <Link
                        href={`/dashboard/donation-request-details/${user._id}`}
                      >
                        <Button
                          isIconOnly
                          size="sm"
                          variant="ghost"
                          aria-label="View"
                        >
                          <FiEye size={16} />
                        </Button>
                      </Link>

                      <Link
                        href={`/dashboard/manage-donation-request/${user._id}`}
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
                        <BsThreeDotsVertical size={16} />
                      </Button>
                    </div>
                  </Table.Cell>
                </Table.Row>
              )}
            </Table.Body>
          </Table.Content>
        </Table.ScrollContainer>
      </Table>

      <Pagination>
        <Pagination.Summary>
          Showing {startItem}-{endItem} of {totalItems} results
        </Pagination.Summary>

        <Pagination.Content>
          <Pagination.Item>
            <Pagination.Previous
              isDisabled={page === 1}
              onPress={() => setPage((p) => p - 1)}
            >
              <Pagination.PreviousIcon />
              <span>Previous</span>
            </Pagination.Previous>
          </Pagination.Item>

          {getPageNumbers().map((p) => (
            <Pagination.Item key={p}>
              <Pagination.Link isActive={p === page} onPress={() => setPage(p)}>
                {p}
              </Pagination.Link>
            </Pagination.Item>
          ))}

          <Pagination.Item>
            <Pagination.Next
              isDisabled={page === totalPages || totalPages === 0}
              onPress={() => setPage((p) => p + 1)}
            >
              <span>Next</span>
              <Pagination.NextIcon />
            </Pagination.Next>
          </Pagination.Item>
        </Pagination.Content>
      </Pagination>
    </div>
  );
}
