import React from "react";
import Input from "../UI/Input";
import Button from "../UI/Button";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getSingleTodo, updateTodo } from "./utils/api";
import { useNavigate, useParams } from "react-router-dom";
import { queryClient } from "../App";
import Loader from "../UI/Loader";

const UpdateTodo = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isPending } = useQuery({
    queryKey: ["todo", id],
    queryFn: ({ signal }) => getSingleTodo({ id, signal }),
  });

  const { mutate } = useMutation({
    mutationFn: updateTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["todo", id],
      });
      navigate(`/todo/${id}`);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const fd = new FormData(e.target);
    const todoData = Object.fromEntries(fd.entries());

    mutate({ id, todo: todoData });
  };

  if (isPending) {
    return <Loader />;
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Input
          defaultValue={data.title}
          label={"Enter  todo title"}
          id={"title"}
          type="text"
        />
        <Input
          defaultValue={data.description}
          label={"Enter  todo description"}
          id={"description"}
          type="text"
        />

        <Button type="submit">Update</Button>
      </form>
    </div>
  );
};

export default UpdateTodo;
