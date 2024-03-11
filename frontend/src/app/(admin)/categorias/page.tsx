"use client";
import React, { useState, useEffect } from "react";
import { CategoriesStyles } from "./styles";
import {
  BlacLine,
  Add,
  Pencil,
  Trash,
  Check
} from "./assets";
import { ApiCategories } from "@/services/categories";
import { ModalCreateCategory, ModalDeleteCategory } from "@/components/categories/modals";

export default function Itens() {
  const [currentIndex, setCurrentIndex] = useState(0);

  interface createCategory {
    name: string,
    description: string
}
  const [selectedCategory, setSelectedCategory] = useState<{ id: number } | null>(null);
  const [createdCategory, setCreateCategory] = useState(null);
  const [deletedCategory, setDeletedCategory] = useState(null);
  
  const [categories, setCategories] = useState<createCategory[]>([]); // Specify the type for items
  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = async () => {
    try {
      const fetchedCategories: createCategory[] = await ApiCategories.getCategories();
      console.log("Fetched Items:", fetchedCategories);
      // Set the categories state
      setCategories(fetchedCategories);
    } catch (error) {
      console.error("Erro ao obter informações:", error);
    }
  };

  const handleCategoryClick = (categoryId: number) => {
    setSelectedCategory((prevSelectedCategory) =>
      prevSelectedCategory && prevSelectedCategory.id === categoryId ? null : { id: categoryId }
    );
    setCreateCategory(null); 
 };

  const handleAddClick = (categoryIndex: any) => {
    setCreateCategory((prevCreateCategory) =>
      prevCreateCategory === categoryIndex ? null : categoryIndex
    );
    setSelectedCategory(null);
  };

  const handleDeleteClick = async (categoryId: number) => {
    try {
      // Assuming you have an API endpoint for deleting a category
      await ApiCategories.deleteCategory(categoryId);

      setSelectedCategory(null);
    } catch (error) {
      console.error("Error deleting category:", error);
      // Handle error (e.g., show an error message to the user)
    }
  };

  return (
    <div style={CategoriesStyles.container}>

      <div style={CategoriesStyles.header}>
        <img
          src={BlacLine.src}
          alt="Linha preta"
          style={{ width: "318px", height: "27px" }}
        />
        <div style={{display:'flex', justifyContent:'space-between', padding:'0 25px 0 20px'}}>
        <text style={CategoriesStyles.title}>Categorias</text>
        </div>
      </div>

        <div style={CategoriesStyles.categoriesContainer}>
          {categories.map((category) => (
            <div style={CategoriesStyles.categoryBox}>
              <span style={CategoriesStyles.categoryName}>{category.name}</span>
              <img src={Pencil.src} alt="Editar" style={CategoriesStyles.editIcon} onClick={() => handleCategoryClick} />
            </div>
          ))}

        </div>

          <div style={CategoriesStyles.buttonsContainer}>
          <img
                  src={Add.src}
                  alt="Adicionar"
                  style={{ width: "50px", height: "68px", cursor: "pointer" }}
                  onClick={() => handleAddClick(1)}
                />     

        <img
                  src={Trash.src}
                  alt="Adicionar"
                  style={{ width: "50px", height: "50px", cursor: "pointer" }}
                  onClick={() => handleDeleteClick(1)}
                /> 

        </div>     
        {createdCategory !== null && (<ModalCreateCategory />)}
        {deletedCategory !== null && (<ModalDeleteCategory />)}
    </div>
  );
}