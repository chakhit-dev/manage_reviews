"use client"

import React, { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  getKeyValue,
  Divider,
  Tooltip,
  Chip,
  Card,
  CardBody,
} from "@heroui/react";
import Action from "@/components/action/page";
import AdminDetail from "@/components/btn/admin_detail";
import AdminEdit from "@/components/btn/admin_edit";
import AdminDelete from "@/components/btn/admin_delete";

interface Post {
  post_id: number,
  post_by: string,
  post_header: string,
  post_des: string,
  post_img: string,
  post_star: number,
  post_date: string,
  post_category: string,
}

export default function PostManager() {

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

  const [page, setPage] = React.useState(1);
  const rowsPerPage = 9;

  const pages = Math.ceil(posts.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return posts.slice(start, end);
  }, [page, posts]);

  const renderPostCell = React.useCallback((post: Post, columnKey: React.Key) => {
    const cellValue = post[columnKey as keyof Post];

    switch (columnKey) {
      case "post_header":
        return (
          <div className="truncate w-48">
            {post.post_header}
          </div>
        );
      case "post_img":
        return (
          <div className="truncate w-52">
            {post.post_img}
          </div>
        );
      // case "post_star":
      //   return (
      //     <Chip color="warning" size="sm" variant="flat">
      //       ⭐ {post.post_star}
      //     </Chip>
      //   );
      // case "post_date":
      //   return <p className="text-sm text-default-400">{new Date(post.post_date).toLocaleDateString()}</p>;
      case "post_des":
        return (
          <div className="truncate w-40">
            {post.post_des}
          </div>
        );
      case "actions":
        return (
          <div>
            <div className="relative flex items-center gap-2">
              <Tooltip content="Details">
                <AdminDetail post={post}/>
              </Tooltip>
              <Tooltip content="Edit user">
                <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                  <AdminEdit post={post} onUpdate={fetchPosts}/>
                </span>
              </Tooltip>
              <Tooltip color="danger" content="Delete user">
                <span className="text-lg text-danger cursor-pointer active:opacity-50">
                  <AdminDelete postId={post.post_id} onDelete={fetchPosts} />
                </span>
              </Tooltip>
            </div>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  const columns = [
    { uid: "post_id", name: "ไอดี" },
    { uid: "post_by", name: "โพสโดย" },
    { uid: "post_header", name: "หัวเรื่อง" },
    { uid: "post_des", name: "คำอธิบาย" },
    { uid: "post_img", name: "รูปภาพ" },
    { uid: "post_star", name: "คะแนน" },
    { uid: "post_date", name: "วันที่" },
    { uid: "post_category", name: "หมวดหมู่" },
    { uid: "actions", name: "ตัวดำเนินการ" },
  ];

  return (
    <div className="flex flex-col gap-4">

      <div className="div">
        <Card>
          <CardBody>
            <p>PostManager</p>
          </CardBody>
        </Card>
      </div>

      <Table
        aria-label="Post table"
        isStriped
        bottomContent={
          <div className="flex w-full justify-center">
            <Pagination
              isCompact
              showControls
              showShadow
              color="secondary"
              page={page}
              total={pages}
              onChange={(page) => setPage(page)}
            />
          </div>
        }
        classNames={{
          wrapper: "h-[600px]",
        }}
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn className="text-sm" key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody
          items={items}
        >
          {(item) => (
            <TableRow key={item.post_id}>
              {(columnKey) => <TableCell className="py-4">{renderPostCell(item, columnKey)}</TableCell>}
            </TableRow>
          )}
        </TableBody>
      </Table>

    </div>
  )
}