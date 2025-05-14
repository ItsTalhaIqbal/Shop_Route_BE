import { Category } from "../models/Category.model";

// Create Category
export const CreateCategory = async (req: any, res: any) => {
  const data = req.body;
console.log(data)
  try {
    const categories = await Category.find();
    const matchData = categories.find((c: any) => c.name == data.name);
    console.log(matchData)
    if (matchData) {
      res.status(400).send({ message: "Same Category Already Exist" });
      return;
    }
    const response = await Category.create(data);
    res
      .status(200)
      .send({ message: "Category Created Successfully", response });
  } catch (error) {
    res.status(400).send({ message: "Failed to create Category", error });
  }
};

// Update Category
export const UpdateCategory = async (req: any, res: any) => {
  const { id } = req.params;
  const data = req.body;

  try {
    const categories = await Category.find();
    const matchData = categories.find((c: any) => c.name == data.name && c._id.toString() !== id);
    if (matchData) {
      res.status(400).send({ message: "Same Category Already Exist" });
      return;
    }
    const response = await Category.findByIdAndUpdate(id, data, { new: true });
    res
      .status(200)
      .send({ message: "Category updated Successfully", response });
  } catch (error) {
    res.status(400).send({ message: "Failed to update Category", error });
  }
};

// Delete Category
export const DeleteCategory = async (req: any, res: any) => {
  const { id } = req.params;

  try {
    await Category.findByIdAndDelete(id);
    res.status(200).send({ message: "Category deleted Successfully" });
  } catch (error) {
    res.status(400).send({ message: "Failed to delete Category", error });
  }
};

// Get All Areas
export const GetAllCategories = async (req: any, res: any) => {
  try {
    const response = await Category.find();
    res
      .status(200)
      .send({ message: "All Areas Retrieved Successfully", response });
  } catch (error) {
    res.status(400).send({ message: "Failed to find any Category", error });
  }
};

// Get Single Cateory
export const GetCategory = async (req: any, res: any) => {
  const { id } = req.params;

  try {
    const response = await Category.findById(id);
    res.status(200).send({ message: "Category found Successfully", response });
  } catch (error) {
    res.status(400).send({ message: "Failed to find Category", error });
  }
};
