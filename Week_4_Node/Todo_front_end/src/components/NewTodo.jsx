import React from "react";
import Input from "../UI/Input";
import Button from "../UI/Button";
import { useMutation } from "@tanstack/react-query";
import { createTodos } from "./utils/api";
import { queryClient } from "../App";
import { useNavigate } from "react-router-dom";

const NewTodo = () => {
  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationFn: createTodos,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["todos"],
      });
      navigate("/");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const fd = new FormData(e.target);
    const data = Object.fromEntries(fd.entries());
    data.id = Date.now();

    mutate({ todos: data });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Input label={"Enter  todo title"} id={"title"} type="text" />
        <Input
          label={"Enter  todo description"}
          id={"description"}
          type="text"
        />

        <Button>Submit</Button>
      </form>
    </div>
  );
};

export default NewTodo;
