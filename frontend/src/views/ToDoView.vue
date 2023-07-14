<template>
  <div class="todo-container">
    <h2>To Do List</h2>

    <div class="add-task">
      <input v-model="newTask" placeholder="Enter a task">
      <button @click="addTask">Add</button>
    </div>

    <ul class="task-list">
      <li v-for="(task, index) in tasks" :key="index" class="task-item">
        <span class="task-name">{{ task }}</span>
        <button @click="removeTask(index)">X</button>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { ref, onMounted } from 'vue';
import { useApiService } from '../services/apiService';

export default {
  setup() {
    const { fetchData } = useApiService();
    const newTask = ref<string>('');
    const tasks = ref<string[]>([]);

    const addTask = () => {
      if (newTask.value !== '') {
        tasks.value.push(newTask.value);
        newTask.value = '';
      }
    };

    const removeTask = (index: number) => {
      tasks.value.splice(index, 1);
    };

    onMounted(async () => {
      try {
        const user = await fetchData();
        user.name = user.name +"'s birthday" 
        tasks.value.push(user.name);
      } catch (error) {
        console.error('Erro ao buscar usuário:', error);
      }
    });

    return {
      newTask,
      tasks,
      addTask,
      removeTask,
    };
  },
};
</script>

<style scoped>
.todo-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  box-sizing: border-box;
  height: 100vh;
  background-color: #f2f2f200;
}

.add-task {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
}

input {
  padding: 12px;
  font-size: 18px;
  border: none;
  border-radius: 6px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

button {
  padding: 12px 24px;
  font-size: 18px;
  border: none;
  border-radius: 6px;
  background-color: #54ca7b;
  color: #fff;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #2b695f;
}

.task-list {
  list-style: none;
  padding: 0;
  width: 100%;
  max-width: 400px;
}

.task-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px;
  font-size: 18px;
  background-color: #fff;
  border-radius: 6px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 10px;
  color: black;
}

.task-name {
  flex: 1;
}

.task-item button {
  padding: 8px;
  font-size: 16px;
  background-color: #ff3d00;
  color: #fff;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.task-item button:hover {
  background-color: #c62800;
}
</style>
