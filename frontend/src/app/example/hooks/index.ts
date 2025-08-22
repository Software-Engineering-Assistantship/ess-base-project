import { useMutation, useQuery } from "@tanstack/react-query";
import { createTest, deleteTest, getTestById, getTests } from "../services";

export const useCreateTest = () => {
  return useMutation({
    mutationFn: createTest,
  });
};

export const useTests = () => {
  return useQuery({
    queryFn: getTests,
    queryKey: ["tests"],
  });
};

export const useTestById = (id: string) => {
  return useQuery({
    queryFn: () => getTestById(id),
    queryKey: ["test", id],
  });
};

export const useDeleteTest = () => {
  return useMutation({
    mutationFn: deleteTest,
  });
};
