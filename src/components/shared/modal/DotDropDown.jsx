"use client";

import { Button, Dropdown, Label } from "@heroui/react";
import { HiDotsVertical } from "react-icons/hi";

export function DotDropDown() {
  return (
    <Dropdown>
      <Button isIconOnly aria-label="Menu" variant="secondary">
        <HiDotsVertical className="outline-none" />
      </Button>
      <Dropdown.Popover>
        <Dropdown.Menu onAction={(key) => console.log(`Selected: ${key}`)}>
          <Dropdown.Item id="new-file" textValue="New file">
            <Label>Make Volunteer</Label>
          </Dropdown.Item>
          <Dropdown.Item id="copy-link" textValue="Copy link">
            <Label>Block </Label>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown>
  );
}
