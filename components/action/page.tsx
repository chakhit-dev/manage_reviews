import React, { SVGProps } from "react";

import {
  Tooltip,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@heroui/react"
import AdminDetail from "../btn/admin_detail";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};



export default function Action() {

  return (
    <div>
      <div className="relative flex items-center gap-2">
        <Tooltip content="Details">
          <AdminDetail />
        </Tooltip>
        <Tooltip content="Edit user">
          <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
            <EditIcon />
          </span>
        </Tooltip>
        <Tooltip color="danger" content="Delete user">
          <span className="text-lg text-danger cursor-pointer active:opacity-50">
            <DeleteIcon />
          </span>
        </Tooltip>
      </div>
    </div>
  )
}