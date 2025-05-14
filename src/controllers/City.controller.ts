import { City } from "../models/City.model";

export const CreateCity = async (req: any, res: any) => {
  const data = req.body;

  try {
    const exixtingCities = await City.find();
    const matchData = exixtingCities.find((city) => city.name == data.name);
    if (matchData) {
      res.status(400).send({ message: "Same City name Already Exist." });
      return;
    }
    const newCity = await City.create(data);
    res
      .status(200)
      .send({ message: "City Created Successfully", response: newCity });
  } catch (error) {
    res.status(400).send({ message: "Failed to create City", error });
  }
};

export const UpdateCity = async (req: any, res: any) => {
  const { id } = req.params;
  const data = req.body;
  const existingCities = await City.find();
  const matchData = existingCities.find(
    (city) => city.name == data.name && city._id.toString() !== id
  );
  console.log(matchData);
  if (matchData) {
    res.status(400).send({ message: "Same City name Already Exist." });
    return;
  } else {
    const updatedCity = await City.findByIdAndUpdate(id, data, { new: true });
    if (!updatedCity) {
      return res.status(404).send({ message: "City not found" });
    }
    res
      .status(200)
      .send({ message: "City updated Successfully", response: updatedCity });
    res.status(400).send({ message: "Failed to update City" });
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
    res
      .status(200)
      .send({ message: "All Cities Retrieved Successfully", response: cities });
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
    res
      .status(200)
      .send({ message: "City found Successfully", response: city });
  } catch (error) {
    res.status(400).send({ message: "Failed to find City", error });
  }
};
