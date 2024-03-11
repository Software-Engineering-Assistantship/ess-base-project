import React, { use, useState } from "react";
import { CategoryModalStyles } from "./styles";
import {
  Pencil,
  Trash,
  Check,
} from "./assets";

import { ApiCategories } from "@/services/categories";
import { useForm, SubmitHandler, Form } from 'react-hook-form';

const ModalCreateCategory = () => {

  type FormData = {
      name: string;
      description: string;
    }

  const { register, handleSubmit, formState:{errors} } = useForm<FormData>();

  const handleConfirmYes: SubmitHandler<FormData> = async (data) => {
    console.log(data);
  
    try {
      // Call the createExample function of ApiItens to send the data to the backend
      await ApiCategories.createCategory(data);
      console.log("Informações enviadas com sucesso!");
      alert("Item cadastrado com sucesso!");
      window.location.reload();

    } catch (error) {
      console.error("Erro ao enviar informações para o backend:", error);
    }
  };
  

  return (
      <>
      <div id="criar" style={{ display: "flex", justifyContent: "center" }}>
      <div style={CategoryModalStyles.inputContainer}>
      <form onSubmit={handleSubmit(handleConfirmYes)}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "2%",
            marginRight: "3%",
            marginTop: "3%",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              width: "100%",
            }}
          >
            <p style={CategoryModalStyles.extra}>Nome da Categoria:</p>
            <input {...register("name", {required: true})}
              placeholder="escreva aqui"
              style={{
                ...CategoryModalStyles.inputBox,
              }}
            ></input>
            {errors.name && <p style={{color: 'red'}}>Campo obrigatório</p>}
          </div>
        </div>
    
        <div style={CategoryModalStyles.inputCategories}>
          <p style={CategoryModalStyles.extra}>Descrição:</p>
          <textarea {...register("description", {required: true})}
        placeholder="escreva aqui"
        style={{
          ...CategoryModalStyles.inputBox,
          width: "70%",
          height: '80px',
          wordWrap: 'break-word', // or 'break-all'
        }}
      ></textarea>
      {errors.description && <p style={{color: 'red'}}>Campo obrigatório</p>}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: "2%",
            padding: "3%",
          }}
        >
          <button type="submit">
          <img
            src={Check.src}
            style={{ width: "102px", height: "43px", cursor: "pointer" }}
          /></button>

        </div> </form>
      </div>
    </div>
    </>
  );
  }

  const ModalDeleteCategory = () => { };

  export{ ModalCreateCategory, ModalDeleteCategory };