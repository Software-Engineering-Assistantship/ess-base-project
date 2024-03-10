import React, { useState } from "react";
import { CategoryModalStyles } from "./styles";
import {
  Pencil,
  Trash,
  Check,
} from "./assets";
import { ApiCategories } from "@/services/categories";
import { useForm, SubmitHandler } from 'react-hook-form';

interface createCategory {
  id: number,
  name: string,
  description: string,
};

const CategoryModal = ({ category }: { category: createCategory }) => {
  const [isEditing, setIsEditing] = useState(false);
  const { register, handleSubmit, setValue } = useForm<createCategory>({
    defaultValues: {
      id: category.id,
      name: category.name,
      description: category.description,
    },
  });

  const handleConfirm: SubmitHandler<createCategory> = async (data: createCategory) => {
    setValue('id', category.id);
    try {
      await ApiCategories.updateCategory(data.id, data);
      alert("Categoria atualizada com sucesso!");
      window.location.reload();
    } catch (error) {
      console.error("Erro ao enviar informações para o backend:", error);
    }
  };

  return (
    <div style={CategoryModalStyles.inputContainer}>
      <form onSubmit={handleSubmit(handleConfirm)}>
        <div style={CategoryModalStyles.inputCategories}>
          <p style={CategoryModalStyles.extra}>Nome da Categoria:</p>
          <input {...register("name")}
            placeholder={category.name}
            style={CategoryModalStyles.inputBox}
            disabled={!isEditing}
          ></input>
        </div>
        <div style={CategoryModalStyles.inputCategories}>
          <p style={CategoryModalStyles.extra}>Descrição:</p>
          <textarea {...register("description")}
            placeholder={category.description}
            style={{
              ...CategoryModalStyles.inputBox,
              width: "70%",
              height: '80px',
              wordWrap: 'break-word',
            }}
            disabled={!isEditing}
          ></textarea>
        </div>
        <div style={{
          display: "flex",
          justifyContent: "flex-end",
          gap: "2%",
          padding: "3%",
        }}>
          <button type="submit">
            <img
              src={Check.src}
              style={{ width: "102px", height: "43px", cursor: "pointer" }}
            />
          </button>
        </div>
      </form>
    </div>
  );
};

export { CategoryModal };
