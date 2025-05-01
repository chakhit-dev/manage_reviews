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

// Define actual Post object type
interface Post {
    post_id: number;
    post_by: string;
    post_header: string;
    post_des: string;
    post_img: string;
    post_star: number;
    post_date: string;
    post_category: string;
}

// Props interface for the component
interface DetailCardPostProps {
    post: Post;
    onUpdate?: () => void;
}

interface CategoryList {
    type_id: string;
    type_name: string;
}


export default function AdminEdit({ post, onUpdate }: DetailCardPostProps) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [category, setCategory] = useState<CategoryList[]>([]);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    useEffect(() => {
        async function fetchCatego() {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/category`)
            const data: CategoryList[] = await res.json()

            // console.log("Fetched data:", data);

            setCategory(data)
        }
        fetchCatego()
    }, [])

    const stars = [
        { key: "1", label: "1" },
        { key: "2", label: "2" },
        { key: "3", label: "3" },
        { key: "4", label: "4" },
        { key: "5", label: "5" },
    ];

    const [fileName, setFileName] = useState('');


    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setFileName(file.name);
            setSelectedFile(file); // <== ต้องใส่บรรทัดนี้
        }
    };

    const [postFrom, setPostFrom] = useState({
        post_id: post.post_id || 0,
        post_by: post.post_by || '',
        post_header: post.post_header || '',
        post_des: post.post_des || '',
        post_img: post.post_img || '',
        post_star: post.post_star || 1,
        post_date: post.post_date || '',
        post_category: post.post_category || ''
      });
      

      const handleSubmit = async (e: any) => {
        e.preventDefault();
    
        // สร้าง FormData ใหม่
        const formData = new FormData();
        
        // เพิ่มข้อมูลจาก state postFrom
        formData.append('post_id', postFrom.post_id.toString());
        formData.append('post_by', postFrom.post_by);
        formData.append('post_header', postFrom.post_header);
        formData.append('post_des', postFrom.post_des);
        formData.append('post_star', postFrom.post_star.toString());
        formData.append('post_category', postFrom.post_category);
        
        // ถ้ามีการอัปโหลดไฟล์
        if (selectedFile) {
            formData.append('file', selectedFile);
        }

        formData.forEach((value, key) => {
            console.log(key, value);
        });
        
    
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/post/${postFrom.post_id}`, {
                method: 'PUT',
                body: formData,
            });
    
            if (res.ok) {
                const data = await res.json();
                console.log("Post Updated:", data);
    
                if (onUpdate) onUpdate(); // เรียก callback เพื่ออัปเดตข้อมูลหลังจากอัปเดตโพสต์สำเร็จ
                onOpenChange(); // ปิด Modal หลังจากการอัปเดตสำเร็จ
            }
        } catch (error) {
            console.error("Error updating post:", error);
        }
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
                                        <Input label={`ไอดี : ${post.post_id}`} type="text" size="sm" disabled />
                                        <Input label={`โพสต์โดย : ${post.post_by}`} type="text" size="sm" disabled />
                                        <Input label="หัวเรื่อง" type="text" size="sm" defaultValue={post.post_header}
                                            onChange={(event)=>{
                                                setPostFrom((postdatafrom)=>({
                                                    ...postdatafrom,
                                                    post_header: event.target.value
                                                }))
                                            }}
                                        />
                                        <Textarea className="w-full" label="เนื้อหา" defaultValue={post.post_des}
                                            onChange={(event)=>{
                                                setPostFrom((postdatafrom)=>({
                                                    ...postdatafrom,
                                                    post_des: event.target.value
                                                }))
                                            }}
                                        />
                                        <Select className="w-full" label="เลือกหมวดหมู่" size="sm" defaultSelectedKeys={[post.post_category]}
                                            onChange={(event)=>{
                                                setPostFrom((postdatafrom)=>({
                                                    ...postdatafrom,
                                                    post_category: event.target.value
                                                }))
                                            }}
                                        >
                                            {category.map((item) => (
                                                <SelectItem key={item.type_id}>
                                                    {item.type_name}
                                                </SelectItem>
                                            ))}
                                        </Select>
                                        {/* <Input label="รูปภาพ" value={post.post_img} type="text" size="sm" /> */}
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
                                        <Select className="w-full" label="คะแนนความชอบ" size="sm" defaultSelectedKeys={post.post_star.toString()}
                                            onChange={(event)=>{
                                                setPostFrom((postdatafrom)=>({
                                                    ...postdatafrom,
                                                    post_star: Number(event.target.value)
                                                }))
                                            }}
                                        >
                                            {stars.map((star) => (
                                                <SelectItem key={star.key}>{star.label}</SelectItem>
                                            ))}
                                        </Select>
                                        <Input label="วันที่" value={post.post_date} type="text" size="sm" disabled />
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