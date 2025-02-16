"use client";

import { useState, useEffect } from "react";
import { dateTransform } from "@/utils/dateTransform";

export default function HomePage() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("/api/users")
      .then((res) => res.json())
      .then((data) => setUsers(data.users))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  return (
    <main className="p-4">
      <div className="overflow-x-auto">
        <table className="min-w-full text-left border text-sm font-light">
          <thead className="border-b bg-white font-medium dark:border-neutral-500 dark:bg-neutral-600">
            <tr className="border-b text-center">
              <th scope="col" className="px-6 py-4">Tabla de usuarios</th>
            </tr>
            <tr>
              <th scope="col" className="px-6 py-4">#</th>
              <th scope="col" className="px-6 py-4">Id</th>
              <th scope="col" className="px-6 py-4">Email</th>
              <th scope="col" className="px-6 py-4">Creado</th>
            </tr>
          </thead>

          <tbody>
            {users?.map((user: any, index: number) => {
              const isEven = index % 2 === 0;
              const bg = isEven
                ? "bg-white dark:bg-neutral-700"
                : "bg-neutral-100 dark:bg-neutral-700";

              return (
                <tr key={user._id} className={`${bg} border-b font-medium dark:border-neutral-500`}>
                  <td className="whitespace-nowrap px-6 py-4 font-medium">{index + 1}</td>
                  <td className="whitespace-normal px-6 py-4">{user._id}</td>
                  <td className="whitespace-normal px-6 py-4">{user.email}</td>
                  <td className="whitespace-normal px-6 py-4">
                    {dateTransform(user.createdAt)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </main>
  );
}
