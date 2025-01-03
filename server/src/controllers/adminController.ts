import { Request, Response, NextFunction } from "express";
import { Song } from "../models/songModel";
import { Album } from "../models/albumModel";
import cloudinary from "../lib/cloudinary";

type UploadedFile = {
  tempFilePath?: string;
};

// helper function for cloudinary uploads
const uploadToCloudinary = async (file: UploadedFile) => {
  try {
    if (!file.tempFilePath) {
      throw new Error("File path is undefined");
    }
    const result = await cloudinary.uploader.upload(file.tempFilePath, {
      resource_type: "auto",
    });
    return result.secure_url;
  } catch (error) {
    console.log("Error in uploadToCloudinary", error);
    throw new Error("Error uploading to cloudinary");
  }
};

export const createSong = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (!req.files || !req.files.audioFile || !req.files.imageFile) {
      res.status(400).json({ message: "Please upload all files" });
      return;
    }

    const { title, artist, albumId, duration } = req.body;
    const audioFile = req.files.audioFile;
    const imageFile = req.files.imageFile;

    const singleImageFile = Array.isArray(imageFile) ? imageFile[0] : imageFile;
    const singleAudioUrl = Array.isArray(audioFile) ? audioFile[0] : audioFile;

    const audioUrl = await uploadToCloudinary(singleAudioUrl);
    const imageUrl = await uploadToCloudinary(singleImageFile);

    const song = new Song({
      title,
      artist,
      audioUrl,
      imageUrl,
      duration,
      albumId: albumId || null,
    });

    await song.save();

    // if song belongs to an album, update the album's songs array
    if (albumId) {
      await Album.findByIdAndUpdate(albumId, {
        $push: { songs: song._id },
      });
    }
    res.status(201).json(song);
  } catch (error) {
    console.log("Error in createSong", error);
    next(error);
  }
};

export const deleteSong = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;

    const song = await Song.findById(id);

    if (song?.albumId) {
      await Album.findByIdAndUpdate(song.albumId, {
        $pull: { songs: song._id },
      });
    }

    await Song.findByIdAndDelete(id);

    res.status(200).json({ message: "Song deleted successfully" });
  } catch (error) {
    console.log("Error deleting song", error);
    next(error);
  }
};

export const createAlbum = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (!req.files || !req.files.imageFile) {
      res.status(400).json({ message: "Please upload an image file" });
      return;
    }

    const { title, artist, releaseYear } = req.body;
    const imageFile = req.files.imageFile;

    const singleImageFile = Array.isArray(imageFile) ? imageFile[0] : imageFile;
    const imageUrl = await uploadToCloudinary(singleImageFile);

    const album = new Album({
      title,
      artist,
      imageUrl,
      releaseYear,
    });

    await album.save();
    res.status(201).json(album);
  } catch (error) {
    console.log("Error creating album", error);
    next(error);
  }
};

export const deleteAlbum = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    await Song.deleteMany({ albumId: id });
    await Album.findByIdAndDelete(id);

    res.status(200).json({ message: "Album deleted successfully" });
  } catch (error) {
    console.log("Error deleting Album", error);
    next(error);
  }
};

export const checkAdmin = async (
  req: Request,
  res: Response
): Promise<void> => {
  res.status(200).json({ admin: true });
};
