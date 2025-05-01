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
import AdminDetailUser from "@/components/btn/admin_detail_user";
import AdminDeleteUser from "@/components/btn/admin_delete_user";
import AdminEditUser from "@/components/btn/admin_edit_user";

interface User {
    user_id:string,
    username:string,
    password:string,
    displayname:string,
    role:string
}

export default function PostManager() {

  const [users, setUsers] = useState<User[]>([])

  async function fetchUsers() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users`)
    const data: User[] = await res.json()
    // console.log(data)
    setUsers(data)
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  const [page, setPage] = React.useState(1);
  const rowsPerPage = 9;

  const pages = Math.ceil(users.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return users.slice(start, end);
  }, [page, users]);

  const renderPostCell = React.useCallback((user: User, columnKey: React.Key) => {
    const cellValue = user[columnKey as keyof User];

    switch (columnKey) {
    //   case "post_header":
    //     return (
    //       <div className="truncate w-48">
    //         {post.post_header}
    //       </div>
    //     );
    //   case "post_img":
    //     return (
    //       <div className="truncate w-52">
    //         {post.post_img}
    //       </div>
    //     );
      // case "post_star":
      //   return (
      //     <Chip color="warning" size="sm" variant="flat">
      //       ⭐ {post.post_star}
      //     </Chip>
      //   );
      // case "post_date":
      //   return <p className="text-sm text-default-400">{new Date(post.post_date).toLocaleDateString()}</p>;
    //   case "post_des":
    //     return (
    //       <div className="truncate w-40">
    //         {post.post_des}
    //       </div>
    //     );
      case "actions":
        return (
          <div>
            <div className="relative flex items-center gap-2">
              <Tooltip content="Details">
                <AdminDetailUser user={user}/>
              </Tooltip>
              <Tooltip content="Edit user">
                <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                  <AdminEditUser user={user} onUpdate={fetchUsers}/>
                </span>
              </Tooltip>
              <Tooltip color="danger" content="Delete user">
                <span className="text-lg text-danger cursor-pointer active:opacity-50">
                  <AdminDeleteUser userID={Number(user.user_id)} onDelete={fetchUsers} />
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
    { uid: "user_id", name: "ไอดี" },
    { uid: "username", name: "ชื่อผู้ใช้" },
    { uid: "password", name: "พาสเวิร์ด" },
    { uid: "displayname", name: "ชื่อที่แสดง" },
    { uid: "role", name: "บทบาท" },
    { uid: "actions", name: "ดำเนินการ" },
  ];

  return (
    <div className="flex flex-col gap-4">

      <div className="div">
        <Card>
          <CardBody>
            <p>User Manager</p>
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
            <TableColumn className="text-sm" key={column.uid}>
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody
          items={items}
        >
          {(item) => (
            <TableRow key={item.user_id}>
              {(columnKey) => <TableCell className="py-4">{renderPostCell(item, columnKey)}</TableCell>}
            </TableRow>
          )}
        </TableBody>
      </Table>

    </div>
  )
}