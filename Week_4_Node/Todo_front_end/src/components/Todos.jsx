import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getAllTodos } from "./utils/api";
import { Link } from "react-router-dom";
import Loader from "../UI/Loader";

const Todos = () => {
  const { data, isPending } = useQuery({
    queryKey: ["todos"],
    queryFn: ({ signal }) => getAllTodos({ signal }),
  });

  let content;

  if (isPending) {
    content = <Loader />;
  }

  if (data) {
    content = (
      <ul className="container mx-auto my-10 grid min-h-full grid-cols-5 gap-7 bg-sky-100">
        {data.map((todo) => (
          <Link
            className="flex flex-col gap-4 rounded-md bg-purple-700 p-3 text-white duration-100 hover:bg-purple-900"
            to={`todo/${todo.id}`}
            key={todo.id}
          >
            <div>Id:{todo.id}</div>
            <div>Title:{todo.title}</div>
            <div>Description:{todo.description}</div>
          </Link>
        ))}
      </ul>
    );
  }

  return <div>{content}</div>;
};

export default Todos;
