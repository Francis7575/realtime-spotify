import { Request, Response, NextFunction } from "express";
import { Album } from "../models/albumModel";

export const getAllAlbums = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const albums = await Album.find();
    res.status(200).json(albums);
  } catch (error) {
    next(error);
  }
};

export const getAlbumById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { albumId } = req.params;

    const album = await Album.findById(albumId).populate("songs");

    if (!album) {
      res.status(404).json({ message: "Album not found" });
      return;
    }
    
    res.status(200).json(album);
  } catch (error) {
    next;
  }
};
