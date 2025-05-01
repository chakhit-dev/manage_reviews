import React, { SVGProps } from "react";

import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
    Input,
    Image,
    Chip
} from "@heroui/react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
    size?: number;
};

export const EyeIcon = (props: IconSvgProps) => {
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
                d="M12.9833 10C12.9833 11.65 11.65 12.9833 10 12.9833C8.35 12.9833 7.01666 11.65 7.01666 10C7.01666 8.35 8.35 7.01666 10 7.01666C11.65 7.01666 12.9833 8.35 12.9833 10Z"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
            />
            <path
                d="M9.99999 16.8916C12.9417 16.8916 15.6833 15.1583 17.5917 12.1583C18.3417 10.9833 18.3417 9.00831 17.5917 7.83331C15.6833 4.83331 12.9417 3.09998 9.99999 3.09998C7.05833 3.09998 4.31666 4.83331 2.40833 7.83331C1.65833 9.00831 1.65833 10.9833 2.40833 12.1583C4.31666 15.1583 7.05833 16.8916 9.99999 16.8916Z"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
            />
        </svg>
    );
};

// Define actual Post object type
interface Post {
    post_id: number;
    post_by: string;
    post_header: string;
    post_des: string;
    post_img: string;
    post_star: number;
    post_date: string;
    post_category:string;
  }
  
  // Props interface for the component
  interface DetailCardPostProps {
    post: Post;
  }

export default function AdminDetail({ post }: DetailCardPostProps) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    return (
        <div>
            <span onClick={onOpen} className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <EyeIcon />
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
                            <ModalHeader className="flex gap-1">โพสต์ที่ {post.post_id} | โดย {post.post_by}</ModalHeader>
                            <ModalBody>
                                <h4 className="text-xl">{post.post_header}</h4>
                                <p>
                                    {post.post_des}
                                </p>
                                <Image
                                    alt="Card background"
                                    className="object-cover rounded-xl"
                                    src={`/storage/imgs/${post.post_img}`}
                                    width={400}
                                />
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Close
                                </Button>
                                <Button color="primary" onPress={onClose}>
                                    Action
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>

    )
}