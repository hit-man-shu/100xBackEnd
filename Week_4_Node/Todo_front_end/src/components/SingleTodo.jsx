import { useMutation, useQuery } from "@tanstack/react-query";
import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { deleteTodo, getSingleTodo } from "./utils/api";
import Loader from "../UI/Loader";
import { queryClient } from "../App";

const SingleTodo = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isPending } = useQuery({
    queryKey: ["todo", id],
    queryFn: ({ signal }) => getSingleTodo({ id, signal }),
  });

  const { mutate } = useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["todos"],
      });
      navigate("/");
    },
  });

  const onDelete = () => {
    mutate({ id });
  };

  let content;

  if (isPending) {
    content = <Loader />;
  }

  console.log(data);

  if (data) {
    const { title, description } = data;

    content = (
      <div className="mx-auto my-4 max-w-sm overflow-hidden rounded-lg bg-white shadow-lg">
        <div className="px-6 py-4">
          <div className="mb-2 text-xl font-bold">{title}</div>
          <p className="text-base text-gray-700">{description}</p>
          <p className="mt-2 text-sm text-gray-500">ID: {id}</p>
        </div>
        <div className="flex justify-between px-6 py-4">
          <Link to="edit">
            <button
              //   onClick={() => onEdit(id)}
              className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
            >
              Edit
            </button>
          </Link>
          <button
            onClick={() => onDelete()}
            className="rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    );
  }

  return <>{content}</>;
};

export default SingleTodo;
