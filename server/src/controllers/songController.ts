import { NextFunction, Request, Response } from "express";
import { Song } from "../models/songModel";

export const getAllSongs = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // -1 Descending newest to oldest
    // 1 Ascending oldest to newest
    const songs = await Song.find().sort({ createdAt: -1 });
    res.status(200).json(songs);
  } catch (error) {
    next(error);
  }
};

export const getFeaturedSongs = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // fetch 6 random songs using mongo aggregation pipeline
    const songs = await Song.aggregate([
      {
        $sample: { size: 6 },
      },
      // display these in the UI
      {
        $project: {
          _id: 1,
          title: 1,
          artist: 1,
          imageUrl: 1, 
          audioUrl: 1,
        },
      },
    ]);
    res.status(200).json(songs);
  } catch (error) {
    next(error);
  }
};

export const getMadeForYouSongs = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // fetch 4 random songs using mongo aggregation pipeline
    const songs = await Song.aggregate([
      {
        $sample: { size: 4 },
      },
      // display these in the UI
      {
        $project: {
          _id: 1,
          title: 1,
          artist: 1,
          imageUrl: 1,
          audioUrl: 1,
        },
      },
    ]);
    res.status(200).json(songs);
  } catch (error) {
    next(error);
  }
};

export const getTrendingSongs = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // fetch 4 random songs using mongo aggregation pipeline
    const songs = await Song.aggregate([
      {
        $sample: { size: 4 },
      },
      // display these in the UI
      {
        $project: {
          _id: 1,
          title: 1,
          artist: 1,
          imageUrl: 1,
          audioUrl: 1,
        },
      },
    ]);
    res.status(200).json(songs);
  } catch (error) {
    next(error);
  }
};
