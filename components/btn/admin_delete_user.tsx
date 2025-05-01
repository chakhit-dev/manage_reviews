"use client"

import React, { SVGProps } from "react";

import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
} from "@heroui/react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
    size?: number;
};

export const DeleteIcon = (props: IconSvgProps) => {
    return (
        <svg
            aria-hidden="true"
            fill="none"
            focusable="false"
            height="1em"
            role="presentation"
            viewBox="0 0 20 20"
            width="1em"
            {...props}
        >
            <path
                d="M17.5 4.98332C14.725 4.70832 11.9333 4.56665 9.15 4.56665C7.5 4.56665 5.85 4.64998 4.2 4.81665L2.5 4.98332"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
            />
            <path
                d="M7.08331 4.14169L7.26665 3.05002C7.39998 2.25835 7.49998 1.66669 8.90831 1.66669H11.0916C12.5 1.66669 12.6083 2.29169 12.7333 3.05835L12.9166 4.14169"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
            />
            <path
                d="M15.7084 7.61664L15.1667 16.0083C15.075 17.3166 15 18.3333 12.675 18.3333H7.32502C5.00002 18.3333 4.92502 17.3166 4.83335 16.0083L4.29169 7.61664"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
            />
            <path
                d="M8.60834 13.75H11.3833"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
            />
            <path
                d="M7.91669 10.4167H12.0834"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
            />
        </svg>
    );
};

interface AdminDeleteProps {
    userID: number;
    onDelete?: () => void;
}

export default function AdminDeleteUser({ userID, onDelete }:AdminDeleteProps) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const handleDelete = async () => {
        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/${userID}`, {
            method: "DELETE",
          });
    
          if (res.ok) {
            alert("ลบโพสต์เรียบร้อยแล้ว");

            // แจ้ง callback เพื่ออัพเดต table
            if (onDelete) {
                onDelete();
            }
          } else {
            alert("เกิดข้อผิดพลาดในการลบ");
          }
        } catch (error) {
            console.error("Delete error:", error);
            alert("เกิดข้อผิดพลาด");
        }
    };

    return (
        <div>
            <span onClick={onOpen} className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <DeleteIcon />
            </span>
            <Modal
                backdrop="opaque"
                classNames={{
                    backdrop: "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20",
                }}
                isOpen={isOpen}
                onOpenChange={onOpenChange}
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Delete Action : {userID}</ModalHeader>
                            <ModalBody>
                                <p>คุณแน่ใจว่าจะลบ ?</p>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Close
                                </Button>
                                <Button className="font-bold" color="danger" onPress={handleDelete}>
                                    ลบ
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>

    )
}