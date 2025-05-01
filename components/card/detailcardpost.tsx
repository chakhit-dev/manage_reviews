"use client"

import {
  Card, CardHeader, CardBody, Image, ScrollShadow,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Selection,
  Chip,
  Input,
  User,
  CardFooter,
  Badge,
  Avatar
} from "@heroui/react";

import {
  Sparkles,
  Tag
} from "@/components/icons";

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

export default function DetailCardPost({ post }: DetailCardPostProps) {

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <div>
      <div className="div" onClick={onOpen}>
        <Card className="py-4 cursor-pointer h-80">
          {/* <Chip className="absolute right-3 bg-yellow-400/30">
            <div className="flex items-center gap-1">
              <Sparkles className="text-yellow-300" />
              <div className="font-bold">
                20
              </div>
            </div>
          </Chip> */}
          <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
            {/* <p className="text-tiny uppercase font-bold">Daily Mix</p>
            <small className="text-default-500">12 Tracks</small> */}
            <h4 className="font-bold text-large truncate w-52">{post.post_header}</h4>
            <small className="text-default-500 truncate w-56">{post.post_des}</small>

          </CardHeader>
          <CardBody className="overflow-visible py-2">
            <Image
              alt="Card background"
              className="object-cover rounded-xl"
              src={`storage/imgs/${post.post_img}`}
              width={270}
              height={190}
            />
          </CardBody>
          <CardFooter>

            <div className="flex gap-2">
              <Chip className="bg-yellow-400/30">
                <div className="flex items-center gap-1">
                  <Sparkles className="text-yellow-300" />
                  <div className="font-bold text-xs text-yellow-300">
                    {post.post_star}
                  </div>
                </div>
              </Chip>

              <Chip className="bg-purple-900/30">
                <div className="flex items-center gap-1">
                  <Tag className="text-purple-600" />
                  <div className="font-bold text-xs text-purple-500">
                    {post.post_category}
                  </div>
                </div>
              </Chip>
            </div>

          </CardFooter>
        </Card>

      </div>

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
              <ModalHeader className="flex flex-col gap-1">
                <div className="flex items-center gap-3">
                  <Avatar isBordered color="default" name="JS" />
                  <div className="text-xs">
                    <div className="">
                      {post.post_by}
                    </div>
                    {/* <div className="font-normal text-zinc-300">
                      @jonathan1214
                    </div> */}
                  </div>
                </div>
              </ModalHeader>
              <ModalBody>
                <h4 className="text-xl">{post.post_header}</h4>
                <p>
                  {post.post_des}
                </p>
                <Image
                  alt="Card background"
                  className="object-cover rounded-xl"
                  src={`storage/imgs/${post.post_img}`}
                  width={400}
                />
              </ModalBody>
              <ModalFooter>
                {/* <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Action
                </Button> */}
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  )
}