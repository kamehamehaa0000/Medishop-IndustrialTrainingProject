import express from 'express'
import {
  createPlaylist,
  updatePlaylist,
  deletePlaylist,
  getAllPlaylists,
} from '../controllers/playlist.controller'
import upload from '../config/multer'
import authenticateAdmin from '../middlewares/adminAuth.middleware'

const router = express.Router()

router.get('/getall', getAllPlaylists)

router.post(
  '/create',
  authenticateAdmin,
  upload.single('playlistImage'),
  createPlaylist
)
router.put(
  '/update/:id',
  authenticateAdmin,
  upload.single('playlistImage'),
  updatePlaylist
)
router.delete('/delete/:id', authenticateAdmin, deletePlaylist) // Delete a playlist

export { router as playlistRouter }
