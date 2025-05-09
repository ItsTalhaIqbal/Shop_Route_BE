import { Area } from "../models/Area.model";

// Create Area 
export const CreateArea = async (req: any, res: any) => {
  const data = req.body;

  try {
   
    const newArea = await Area.create(data);
    res.status(200).send({ message: "Area Created Successfully", response: newArea });
  } catch (error) {
    res.status(400).send({ message: "Failed to create Area", error });
  }
};

// Update Area
export const UpdateArea = async (req: any, res: any) => {
  const { id } = req.params;
  const data = req.body; 

  try {
   
    const updateArea = await Area.findByIdAndUpdate(id, data, { new: true });
    if (!updateArea) {
      return res.status(404).send({ message: "Area not found" });
    }
    res.status(200).send({ message: "Area updated Successfully", response: updateArea });
  } catch (error) {
    res.status(400).send({ message: "Failed to update Area", error });
  }
};

// Delete Area
export const DeleteArea = async (req: any, res: any) => {
  const { id } = req.params;

  try {
    const deleteArea = await Area.findByIdAndDelete(id);
    if (!deleteArea) {
      return res.status(404).send({ message: "Area not found" });
    }
    res.status(200).send({ message: "Area deleted Successfully" });
  } catch (error) {
    res.status(400).send({ message: "Failed to delete Area", error });
  }
};

// Get All Cities
export const GetAllAreas = async (req: any, res: any) => {
  try {
    const areas = await Area.find();
    if (areas.length === 0) {
      return res.status(404).send({ message: "No areas found" });
    }
    res.status(200).send({ message: "All Cities Retrieved Successfully", response: areas });
  } catch (error) {
    res.status(400).send({ message: "Failed to retrieve areas", error });
  }
};

// Get Single Area
export const GetArea = async (req: any, res: any) => {
  const { id } = req.params;

  try {
    const area = await Area.findById(id);
    if (!area) {
      return res.status(404).send({ message: "Area not found" });
    }
    res.status(200).send({ message: "Area found Successfully", response: area });
  } catch (error) {
    res.status(400).send({ message: "Failed to find Area", error });
  }
};
