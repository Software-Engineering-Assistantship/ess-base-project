import apiService from "../../../shared/services/api-service";
import { TestFormType } from "../forms/TestForm";
import TestModel from "../models/TestModel";

export async function createTest(testForm: TestFormType): Promise<TestModel> {
  return (await apiService.post("/tests", testForm)).data;
}

export async function getTests(): Promise<TestModel[]> {
  return (await apiService.get("/tests")).data;
}

export async function getTestById(id: string): Promise<TestModel> {
  return (await apiService.get(`/tests/${id}`)).data;
}

export async function deleteTest(id: string): Promise<void> {
  return (await apiService.delete(`/tests/${id}`)).data;
}

export async function updateTest(
  id: string,
  testForm: TestFormType
): Promise<TestModel> {
  return (await apiService.put(`/tests/${id}`, testForm)).data;
}
