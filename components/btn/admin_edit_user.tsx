"use client"

import React, { SVGProps, useEffect, useState } from "react";

import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
    Input,
    Textarea,
    Select,
    SelectItem
} from "@heroui/react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
    size?: number;
};

export const EditIcon = (props: IconSvgProps) => {
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
                d="M11.05 3.00002L4.20835 10.2417C3.95002 10.5167 3.70002 11.0584 3.65002 11.4334L3.34169 14.1334C3.23335 15.1084 3.93335 15.775 4.90002 15.6084L7.58335 15.15C7.95835 15.0834 8.48335 14.8084 8.74168 14.525L15.5834 7.28335C16.7667 6.03335 17.3 4.60835 15.4583 2.86668C13.625 1.14168 12.2334 1.75002 11.05 3.00002Z"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeMiterlimit={10}
                strokeWidth={1.5}
            />
            <path
                d="M9.90833 4.20831C10.2667 6.50831 12.1333 8.26665 14.45 8.49998"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeMiterlimit={10}
                strokeWidth={1.5}
            />
            <path
                d="M2.5 18.3333H17.5"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeMiterlimit={10}
                strokeWidth={1.5}
            />
        </svg>
    );
};

interface User {
    user_id: string,
    username: string,
    password: string,
    displayname: string,
    role: string
}

interface DetailCardPostProps {
    user: User;
    onUpdate?: () => void;
}

interface RoleList {
    role_name: string;
    role_label: string;
}


export default function AdminEditUser({ user, onUpdate }: DetailCardPostProps) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [roleData, setRoleData] = useState<RoleList[]>([]);

    // const [fromUserId, setFromUserId] = useState('');
    // const [fromUsername, setFromUsername] = useState('');
    // const [fromPassword, setFromPassword] = useState('');
    // const [fromDisplayName, setFromDisplayName] = useState('');
    // const [fromRole, setFromRole] = useState('');

    const [userFrom, setUserFrom] = useState({
        username: user.username,
        password: user.password,
        displayname: user.displayname,
        role: user.role,
    });


    useEffect(() => {
        async function fetchRole() {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/role`)
            const data: RoleList[] = await res.json()

            // console.log("Fetched data:", data);

            setRoleData(data)
        }
        fetchRole()
    }, [])

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/${user.user_id}`, {
            method: 'PUT',
            body: JSON.stringify(userFrom),
        });

        if (res.ok) {
            const data = await res.json();
            console.log("Post Updated:", data);

            if (onUpdate) onUpdate();
        }

        onOpenChange();
    };

    return (
        <div>
            <span onClick={onOpen} className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <EditIcon />
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
                            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                                <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
                                <ModalBody>
                                    <div className="flex flex-col gap-2">
                                        <Input color="danger" label="ไอดี" size="sm" type="text" disabled defaultValue={user.user_id} />
                                        <Input label="ชื่อผู้ใช้" size="sm" type="text" defaultValue={user.username} name="iusername"
                                            onChange={(event)=>{
                                                setUserFrom((user)=>({
                                                    ...user,
                                                    username: event.target.value
                                                }))
                                            }}
                                         />
                                        <Input label="พาสเวิร์ด" size="sm" type="text" defaultValue={user.password} name="ipassword"
                                            onChange={(event)=>{
                                                setUserFrom((user)=>({
                                                    ...user,
                                                    password: event.target.value
                                                }))
                                            }}
                                         />
                                        <Input label="ชื่อที่แสดง" size="sm" type="text" defaultValue={user.displayname}
                                            onChange={(event)=>{
                                                console.log(event.target.value)
                                                setUserFrom((user)=>({
                                                    ...user,
                                                    displayname: event.target.value
                                                }))
                                            }}
                                         />
                                        <Select className="w-full" label="บทบาท" size="sm" defaultSelectedKeys={[user.role]} name="irole"
                                            onChange={(event)=>{
                                                console.log(event.target.value)
                                                setUserFrom((user)=>({
                                                    ...user,
                                                    role: event.target.value
                                                }))
                                            }}
                                        >
                                            {roleData.map((item) => (
                                                <SelectItem key={item.role_name}>
                                                    {item.role_label}
                                                </SelectItem>
                                            ))}
                                        </Select>
                                    </div>
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="danger" variant="light" onPress={onClose}>
                                        Close
                                    </Button>
                                    <Button color="primary" type="submit">
                                        Action
                                    </Button>
                                </ModalFooter>
                            </form>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>

    )
}