"use client";

import { Button, Dropdown } from "@heroui/react";
import { HiDotsVertical } from "react-icons/hi";

export function DotDropDown({ userId, onRoleChange }) {
  return (
    <Dropdown>
      <Button isIconOnly variant="secondary">
        <HiDotsVertical />
      </Button>

      <Dropdown.Popover>
        <Dropdown.Menu>
          <Dropdown.Item
            key="admin"
            onPress={() => onRoleChange(userId, "admin")}
          >
            Make Admin
          </Dropdown.Item>
          <Dropdown.Item
            key="volunteer"
            onPress={() => onRoleChange(userId, "volunteer")}
          >
            Make Volunteer
          </Dropdown.Item>
          <Dropdown.Item
            key="donor"
            onPress={() => onRoleChange(userId, "donor")}
          >
            Make Donor
          </Dropdown.Item>

          <Dropdown.Item
            key="blocked"
            color="danger"
            className="text-danger"
            onPress={() => onRoleChange(userId, "blocked")}
          >
            Block User
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown>
  );
}
