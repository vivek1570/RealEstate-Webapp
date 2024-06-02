import Listing from "../models/listing.model.js";

export const createListing = async (req, res, next) => {
  try {
    const listing = await Listing.create(req.body);
    return res.status(201).json(listing);
  } catch (error) {
    next(error);
  }
};

export const deleteListing = async (req, res, next) => {
  try {
    await Listing.findByIdAndDelete(req.params.id);
    return res.status(200).json({ message: "listing deleted successfully" });
  } catch (error) {
    next(error);
  }
};

export const getlist = async (req, res, next) => {
  try {
    const data = await Listing.findById(req.params.id);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

export const updateList = async (req, res, next) => {
  try {
    const updatedList = await Listing.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedList);
  } catch (error) {
    next(error);
  }
};
