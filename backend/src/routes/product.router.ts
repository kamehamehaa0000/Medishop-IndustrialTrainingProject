import express from 'express'
import {
  createProduct,
  updateProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  searchProducts,
  getProducts,
  getAllCategories,
} from '../controllers/product.controller'
import authenticate from '../middlewares/userAuth.middleware'
import upload from '../config/multer'
import authenticateAdmin from '../middlewares/adminAuth.middleware'

const router = express.Router()
router.get('/products/filter', getProducts)
router.get('/categories', getAllCategories)
router.get('/products', getAllProducts)
router.get('/search', searchProducts)
router.get('/:id', getProductById)
router.post(
  '/create',
  authenticateAdmin,
  upload.single('productImage'),
  createProduct
)
router.put(
  '/update/:productId',
  authenticateAdmin,
  upload.single('productImage'),
  updateProduct
)
router.delete('/delete/:productId', authenticateAdmin, deleteProduct)

export { router as productRouter }
