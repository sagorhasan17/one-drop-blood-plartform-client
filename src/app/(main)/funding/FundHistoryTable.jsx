"use client";

import { Chip, Table, Tooltip } from "@heroui/react";
import { FiCalendar, FiDollarSign, FiHash, FiMail } from "react-icons/fi";

const paymentStatusColor = {
  paid: "success",
  unpaid: "danger",
  no_payment_required: "default",
};

const checkoutStatusColor = {
  complete: "success",
  open: "warning",
  expired: "danger",
};

const FundHistoryTable = ({ data = [] }) => {
  return (
    <Table className="mb-20">
      <Table.ScrollContainer>
        <Table.Content aria-label="Funding History" className="min-w-275">
          <Table.Header>
            <Table.Column>#</Table.Column>

            {/* Required by HeroUI */}
            <Table.Column isRowHeader>Amount</Table.Column>

            <Table.Column>Email</Table.Column>

            <Table.Column>Payment</Table.Column>

            <Table.Column>Checkout</Table.Column>

            <Table.Column>Transaction ID</Table.Column>

            <Table.Column>Date</Table.Column>
          </Table.Header>

          <Table.Body>
            {data.length === 0 ? (
              <Table.Row>
                <Table.Cell>No Data</Table.Cell>
                <Table.Cell>-</Table.Cell>
                <Table.Cell>-</Table.Cell>
                <Table.Cell>-</Table.Cell>
                <Table.Cell>-</Table.Cell>
                <Table.Cell>-</Table.Cell>
                <Table.Cell>-</Table.Cell>
              </Table.Row>
            ) : (
              data.map((item, index) => (
                <Table.Row key={item._id}>
                  {/* Serial */}
                  <Table.Cell>
                    <span className="font-semibold text-default-500">
                      #{index + 1}
                    </span>
                  </Table.Cell>

                  {/* Amount */}
                  <Table.Cell>
                    <div className="flex items-center gap-2 font-semibold text-success">
                      <FiDollarSign />
                      {item.currency} {item.amount}
                    </div>
                  </Table.Cell>

                  {/* Email */}
                  <Table.Cell>
                    <div className="flex items-center gap-2">
                      <FiMail className="text-primary" />

                      {item.customerEmail}
                    </div>
                  </Table.Cell>

                  {/* Payment */}
                  <Table.Cell>
                    <Chip
                      size="sm"
                      variant="flat"
                      color={
                        paymentStatusColor[item.paymentStatus] || "default"
                      }
                      className="capitalize"
                    >
                      {item.paymentStatus}
                    </Chip>
                  </Table.Cell>

                  {/* Checkout */}
                  <Table.Cell>
                    <Chip
                      size="sm"
                      variant="flat"
                      color={
                        checkoutStatusColor[item.checkoutStatus] || "default"
                      }
                      className="capitalize"
                    >
                      {item.checkoutStatus}
                    </Chip>
                  </Table.Cell>

                  {/* Transaction ID */}
                  <Table.Cell>
                    <Tooltip content={item.paymentIntentId}>
                      <div className="flex cursor-pointer items-center gap-2">
                        <FiHash />

                        <span className="font-mono text-xs">
                          {item.paymentIntentId.slice(0, 18)}...
                        </span>
                      </div>
                    </Tooltip>
                  </Table.Cell>

                  {/* Date */}
                  <Table.Cell>
                    <div className="flex items-center gap-2">
                      <FiCalendar />

                      {new Date(item.createdAt).toLocaleString()}
                    </div>
                  </Table.Cell>
                </Table.Row>
              ))
            )}
          </Table.Body>
        </Table.Content>
      </Table.ScrollContainer>

      <Table.Footer>
        <div className="flex items-center justify-between py-3 text-sm text-default-500">
          <span>Total Transactions: {data.length} </span>
        </div>
      </Table.Footer>
    </Table>
  );
};

export default FundHistoryTable;
