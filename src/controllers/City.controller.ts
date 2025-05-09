import { City } from "../models/City.model";

export const CreateCity = async (req: any, res: any) => {
  const data = req.body;

  try {
   
    const newCity = await City.create(data);
    res.status(200).send({ message: "City Created Successfully", response: newCity });
  } catch (error) {
    res.status(400).send({ message: "Failed to create City", error });
  }
};

export const UpdateCity = async (req: any, res: any) => {
  const { id } = req.params;
  const data = req.body; 

  try {
   
    const updatedCity = await City.findByIdAndUpdate(id, data, { new: true });
    if (!updatedCity) {
      return res.status(404).send({ message: "City not found" });
    }
    res.status(200).send({ message: "City updated Successfully", response: updatedCity });
  } catch (error) {
    res.status(400).send({ message: "Failed to update City", error });
  }
};

export const DeleteCity = async (req: any, res: any) => {
  const { id } = req.params;

  try {
    const deletedCity = await City.findByIdAndDelete(id);
    if (!deletedCity) {
      return res.status(404).send({ message: "City not found" });
    }
    res.status(200).send({ message: "City deleted Successfully" });
  } catch (error) {
    res.status(400).send({ message: "Failed to delete City", error });
  }
};

export const GetAllCities = async (req: any, res: any) => {
  try {
    const cities = await City.find();
    if (cities.length === 0) {
      return res.status(404).send({ message: "No cities found" });
    }
    res.status(200).send({ message: "All Cities Retrieved Successfully", response: cities });
  } catch (error) {
    res.status(400).send({ message: "Failed to retrieve cities", error });
  }
};

export const GetCity = async (req: any, res: any) => {
  const { id } = req.params;

  try {
    const city = await City.findById(id);
    if (!city) {
      return res.status(404).send({ message: "City not found" });
    }
    res.status(200).send({ message: "City found Successfully", response: city });
  } catch (error) {
    res.status(400).send({ message: "Failed to find City", error });
  }
};
