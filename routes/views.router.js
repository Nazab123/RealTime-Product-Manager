import { Router } from "express"
import { Productosarray } from "../manager/ProductManager.js"

const router = Router()

//Vista home (HTTP normal)
router.get("/", async (req, res) => {
  const products = await Productosarray()
  res.render("home", { products })
})

//Vista con WebSocket
router.get("/realtimeproducts", async (req, res) => {
  const products = await Productosarray()
  res.render("RealTimeProducts", { products })
})

export default router
