'use client'

import { useSession, signIn, signOut } from "next-auth/react"
import { redirect } from 'next/navigation'

import React,{use, useEffect, useState} from "react";

import {
    Card,
    CardHeader,
    CardBody, Image,
    ScrollShadow,
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
    Input
} from "@heroui/react";

import {
    DocumentPlus,
    AdjustmentsHorizontal
} from "@/components/icons";
import CreatePost from "@/components/btn/createpost";
import DetailCardPost from "@/components/card/detailcardpost";

interface Post {
    post_id:number,
    post_by:string,
    post_header:string,
    post_des:string,
    post_img:string,
    post_star:number,
    post_date:string,
    post_category:string
}

interface CategoryList {
    type_id:string,
    type_name:string
}

export default function DesignDashboard() {

    const { data: session } = useSession()

    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const [categoryData, setCategoryData] = useState<CategoryList[]>([]);

    // const handleClick = (e:any) => {
    //     e.preventDefault();
    //     onOpen()
    // }

    const [selectedKeys, setSelectedKeys] = React.useState<Selection>(new Set(["text"]));

    const selectedValue = React.useMemo(
        () => Array.from(selectedKeys).join(", ").replace(/_/g, ""),
        [selectedKeys],
    );

    const initialFruits = ["Apple", "Banana", "Cherry", "Watermelon", "Orange"];

    const [fruits, setFruits] = React.useState(initialFruits);

    const handleClose = (fruitToRemove:any) => {
        setFruits(fruits.filter((fruit) => fruit !== fruitToRemove));
        if (fruits.length === 1) {
          setFruits(initialFruits);
        }
    };

    const [posts, setPosts] = useState<Post[]>([])

    async function fetchPosts() {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/post`)
        const data: Post[] = await res.json()

        // console.log(data)

        setPosts(data)
      }

    useEffect(() => {
      fetchPosts()
    }, [])

    async function fetchCategory() {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/category`)
        const data: CategoryList[] = await res.json()

        // console.log(data)

        setCategoryData(data)
      }

    useEffect(() => {
        fetchCategory()
    }, [])


    if (session) {
        return (

            <div className="">
    
                <div className="flex gap-4">
                    <div className="w-72 flex flex-col gap-4 bg-zinc-950 rounded-lg p-4">
    
                        {/* <div className="">
                            <Input label="ค้นหา" size="sm" type="text" placeholder="ต้องการค้นหาอะไร.." />
                        </div> */}
    
                        {/* <div className="">
                            <Dropdown>
                                <DropdownTrigger>
                                    <Button className="capitalize w-full bg-purple-950" variant="solid">
                                        <AdjustmentsHorizontal /> {selectedValue}
                                    </Button>
                                </DropdownTrigger>
                                <DropdownMenu
                                    disallowEmptySelection
                                    aria-label="Single selection example"
                                    selectedKeys={selectedKeys}
                                    selectionMode="single"
                                    variant="flat"
                                    onSelectionChange={setSelectedKeys}
                                >
                                    
                                    {categoryData.map((catego) => (
                                    <DropdownItem key={catego.type_id}>{catego.type_name}</DropdownItem>
                                    ))}
                                    
                                </DropdownMenu>
                            </Dropdown>
                        </div> */}
    
                        {/* <div className="">
                            <div className="flex flex-wrap gap-2">
                                {fruits.map((fruit, index) => (
                                    <Chip key={index} variant="flat" onClose={() => handleClose(fruit)}>
                                    {fruit}
                                    </Chip>
                                ))}
                            </div>
                        </div> */}
    
    
                    </div>
                    <div className="w-full flex flex-col gap-4 bg-zinc-950 rounded-lg p-4">
                        <div className="">
                            <CreatePost id={session.user?.username} onCreate={fetchPosts} />
                        </div>
    
                        <div className="">
                            <ScrollShadow className="w-full h-[72vh]">
                                <div className="grid grid-cols-3 gap-4 p-4">
                                {posts.map(poster => (
                                    <DetailCardPost key={poster.post_id} post={poster} />
                                ))}
                                </div>
                            </ScrollShadow>
                        </div>
                    </div>
                </div>
    
    
    
    
            </div>
        )
    }
    else {
        redirect('/login')
    }
}