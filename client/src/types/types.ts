export type Song = {
  _id: string;
  title: string;
  artist: string;
  albumId: string | null;
  imageUrl: string;
  audioUrl: string;
  duration: number;
  createdAt: string;
  updatedAt: string;
};

export type Album = {
  _id: string;
  title: string;
  artist: string;
  imageUrl: string;
  releaseYear: number;
  songs: Song[];
};

export type Stats = {
  totalSongs: number;
  totalAlbums: number;
  totalUsers: number;
  totalArtists: number;
};
