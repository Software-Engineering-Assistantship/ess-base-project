"use client";
import React, { useState, useEffect } from "react";
import { CategoriesStyles } from "./styles";
import {
  BlacLine,
  Previous,
  Next,
  Add,
} from "./assets";
import { ApiCategories } from "@/services/categories";
  import { CategoryModal } from '@/components/categories/modals';// Import the Modal component

export default function Categories() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [categoriesData, setCategoriesData] = useState<{ id: number, name: string, description: string }[]>([]);
  
  interface createCategory {
    id: number,
    name: string,
    description: string,
  };

  const [selectedCategory, setSelectedCategory] = useState<createCategory | null>(null);
  const [newCategory, setNewCategory] = useState<createCategory | null>(null);

  const handlePreviousClick = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, categoriesData.length - 4));
  };

  const getCategories = async () => {
    try {
      const fetchedCategories = await ApiCategories.getCategories();
      setCategoriesData(fetchedCategories);
    } catch (error) {
      console.error("Erro ao obter categorias:", error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  const handleItemClick = (categoryId: number) => {
    const category = categoriesData.find(category => category.id === categoryId);
    if (category) {
      setSelectedCategory(category);
    } else {
      setSelectedCategory(null);
    }
    setNewCategory(null);
  };
  

  const handleAddClick = () => {
    setNewCategory({ id: Date.now(), name: '', description: '' }); // Create a new category with empty name and description
    setSelectedCategory(null);
  };

  return (
    <div style={CategoriesStyles.container}>
      <img
        src={BlacLine.src}
        alt="Linha preta"
        style={{ width: "318px", height: "27px" }}
      />
      <div style={{display:'flex', justifyContent:'space-between', padding:'0 25px 0 20px'}}>
        <text style={CategoriesStyles.title}>Adicionar Categorias</text>
        <img
          src={Add.src}
          alt="Adicionar"
          style={{ width: "50px", height: "68px", cursor: "pointer" }}
          onClick={handleAddClick}
        />
      </div>
      <img
        src={Previous.src}
        alt="Anterior"
        style={{ cursor: "pointer" }}
        onClick={handlePreviousClick}
      />
      {categoriesData.slice(currentIndex, currentIndex + 4).map((category, index) => (
        <div key={index} onClick={() => handleItemClick(category.id)}>
          <h2>{category.name}</h2>
          <p>{category.description}</p>
        </div>
      ))}
      <img
        src={Next.src}
        alt="Próximo"
        style={{ cursor: "pointer" }}
        onClick={handleNextClick}
      />
      {selectedCategory && <CategoryModal category={selectedCategory} />}
      {newCategory && <CategoryModal category={newCategory} />}
    </div>
  );
}