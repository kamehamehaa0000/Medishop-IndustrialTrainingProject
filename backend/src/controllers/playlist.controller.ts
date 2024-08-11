import asyncHandler from '../utilities/AsyncHandler'
import ApiError from '../utilities/ErrorHandler'
import ApiResponse from '../utilities/ResponseHandler'
import { Request, Response } from 'express'
import { z } from 'zod'
import { uploadToCloudinary } from '../utilities/cloudinaryUtils'
import { Product } from '../models/product.model'
import { Playlist } from '../models/Playlist.model'

const playlistSchema = z.object({
  name: z.string().min(3).max(100),
  image: z.string().optional(),
  offer: z.string().min(0).max(100),
  bgColor: z.string(),
})

const createPlaylist = asyncHandler(async (req: Request, res: Response) => {
  const { name, offer, bgColor } = playlistSchema.parse(req.body)

  let imageUrl: string | undefined
  const file = (req.file as Express.Multer.File) || undefined
  if (file) {
    const imageLocalPath = file.path
    imageUrl = (await uploadToCloudinary(imageLocalPath))?.url
    if (!imageUrl) {
      throw new ApiError(500, 'Image upload failed')
    }
  }

  const playlist = new Playlist({
    name,
    image: imageUrl,
    offer,
    bgColor,
  })
  await playlist.save()
  res
    .status(201)
    .json(new ApiResponse(201, playlist, 'Playlist created successfully'))
})

const updatePlaylist = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params
  const updates = playlistSchema.partial().parse(req.body)

  let imageUrl: string | undefined
  const file = (req.file as Express.Multer.File) || undefined
  if (file) {
    const imageLocalPath = file.path
    imageUrl = (await uploadToCloudinary(imageLocalPath))?.url
    if (!imageUrl) {
      throw new ApiError(500, 'Image upload failed')
    }
    updates.image = imageUrl
  }

  const playlist = await Playlist.findByIdAndUpdate(id, updates, {
    new: true,
  })

  if (!playlist) {
    throw new ApiError(404, 'Playlist not found')
  }
  res
    .status(200)
    .json(new ApiResponse(200, playlist, 'Playlist updated successfully'))
})

const getAllPlaylists = asyncHandler(async (req: Request, res: Response) => {
  const playlists = await Playlist.find()
  if (!playlists) {
    throw new ApiError(404, 'No playlists found')
  }
  res
    .status(200)
    .json(new ApiResponse(200, playlists, 'Playlists fetched successfully'))
})

const deletePlaylist = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params
  const playlist = await Playlist.findByIdAndDelete(id)

  if (!playlist) {
    throw new ApiError(404, 'Playlist not found')
  }

  res
    .status(200)
    .json(new ApiResponse(200, null, 'Playlist deleted successfully'))
})

export { createPlaylist, updatePlaylist, getAllPlaylists, deletePlaylist }
