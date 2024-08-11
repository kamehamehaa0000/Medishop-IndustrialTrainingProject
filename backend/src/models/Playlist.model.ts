import { Schema, model, Document } from 'mongoose'

export interface IPlaylist extends Document {
  name: string
  image: string
  offer: string
  bgColor: string
  products: string[] // Array of product IDs
}

const playlistSchema = new Schema<IPlaylist>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String,
      required: true,
    },
    offer: {
      type: String,
      required: true,
      min: 0,
      max: 100,
    },
    bgColor: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

export const Playlist = model<IPlaylist>('Playlist', playlistSchema)
