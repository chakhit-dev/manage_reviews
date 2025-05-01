"use client"

import React, { useEffect, useState } from "react";

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
    Textarea,
    Select,
    SelectItem
} from "@heroui/react";

import {
    DocumentPlus,
    AdjustmentsHorizontal
} from "@/components/icons";

interface CategoryList {
    type_id: string;
    type_name: string;
}

interface sessionID {
    id: string,
    onCreate?: () => void;
}

export default function CreatePost({ id, onCreate }: sessionID) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [fileName, setFileName] = useState('');

    const [postHeader, setPostHeader] = useState('');
    const [postDes, setPostDes] = useState('');
    const [postStar, setPostStar] = useState(1);
    const [postCategory, setPostCategory] = useState('');
    const [message, setMessage] = useState('');

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setFileName(file.name);
            setSelectedFile(file); // <== ต้องใส่บรรทัดนี้
        }
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('post_by', id);
        formData.append('post_header', postHeader);
        formData.append('post_des', postDes);
        formData.append('post_star', postStar.toString());
        formData.append('post_category', postCategory);
        if (selectedFile) formData.append('file', selectedFile); // รูปภาพ

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/post`, {
            method: 'POST',
            body: formData,
        });

        if (res.ok) {
            const data = await res.json();
            console.log("Post created:", data);

            if (onCreate) onCreate(); // ✅ เรียก callback เพื่ออัปเดต dashboard
        }

        onOpenChange(); // ✅ ปิด Modal
    };

    const stars = [
        { key: "1", label: "1" },
        { key: "2", label: "2" },
        { key: "3", label: "3" },
        { key: "4", label: "4" },
        { key: "5", label: "5" },
    ];

    const [category, setCategory] = useState<CategoryList[]>([]);

    useEffect(() => {
        async function fetchCatego() {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/category`)
            const data: CategoryList[] = await res.json()

            // console.log("Fetched data:", data);

            setCategory(data)
        }
        fetchCatego()
    }, [])

    return (
        <div>
            <Button onPress={onOpen} className="w-full bg-purple-950">
                <div className="">
                    <DocumentPlus />
                </div>
                <div className="">
                    สร้างรีวิวของคุณ
                </div>
            </Button>
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
                                <ModalHeader className="flex flex-col gap-1">เขียนรีวิวของคุณ</ModalHeader>
                                <ModalBody>
                                    <Input label="หัวเรื่อง" type="text" size="sm" onChange={(e) => setPostHeader(e.target.value)} />

                                    <Textarea label="รายละเอียด" size="sm" onChange={(e) => setPostDes(e.target.value)} />

                                    {/* <Select className="w-full" label="เลือกหมวดหมู่" size="sm">
                                        {category.map((categorys, index) => (
                                        <SelectItem key={index}>{categorys.cate_type}</SelectItem>
                                        ))}
                                    </Select> */}

                                    <Select className="w-full" label="เลือกหมวดหมู่" size="sm"
                                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                                            console.log(e.target.value)
                                            setPostCategory(e.target.value);
                                          }}
                                        >
                                        {category.map((item) => (
                                            <SelectItem key={item.type_id}>
                                                {item.type_name}
                                            </SelectItem>
                                        ))}
                                    </Select>

                                    <Select
                                        className="w-full"
                                        label="คะแนนความชอบ"
                                        size="sm"
                                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                                            console.log(Number(e.target.value))
                                            setPostStar(Number(e.target.value));
                                          }}
                                    >
                                        {stars.map((star) => (
                                            <SelectItem key={star.key}>
                                                {star.label}
                                            </SelectItem>
                                        ))}
                                    </Select>

                                    <div className="flex items-center justify-center w-full">

                                        <div className="flex items-center justify-center w-full">
                                            <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-48 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-zinc-800 dark:bg-zinc-800 hover:bg-gray-100 dark:border-zinc-700 dark:hover:border-zinc-500 dark:hover:bg-zinc-600">
                                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                    <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                                    </svg>
                                                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">กดเพื่ออัพโหลดรูปหน้าปก</span> หรือลากวาง</p>
                                                    <p className="text-xs text-gray-500 dark:text-gray-400">PNG (MAX. 800x400px)</p>
                                                    <p className="text-xs text-gray-500 dark:text-gray-400">File Name : {fileName || 'ยังไม่ได้เลือกไฟล์'}</p>
                                                </div>
                                                <input id="dropzone-file" type="file" className="hidden" onChange={handleFileChange} />
                                            </label>
                                        </div>

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