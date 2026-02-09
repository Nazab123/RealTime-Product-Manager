process.on("uncaughtException", (err) => {
  console.error("❌ uncaughtException:", err)
})

process.on("unhandledRejection", (reason) => {
  console.error("❌ unhandledRejection:", reason)
})

import express from "express"
import handlebars, { engine } from "express-handlebars"
import {__dirname} from "./utils.js"
import { Server } from "socket.io"
import multer from "multer"
import path from "path"
import fs from "fs"

const app = express()

const rutarchivo = __dirname

app.use (express.json())
app.use(express.urlencoded({ extended: true }))

app.use(express.static(path.join(rutarchivo, "public")))

app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", path.join(rutarchivo, "views"));

const CarpetaImagenes = path.join(rutarchivo, "data", "imagenes")
if (!fs.existsSync(CarpetaImagenes)) {
  fs.mkdirSync(CarpetaImagenes, { recursive: true })
}
app.use("/imagenes", express.static(CarpetaImagenes))


const ProductosGuardados = path.join(rutarchivo, "data", "products.json")
console.log("GUARDANDO EN:", ProductosGuardados)


const ProductosAGuardar = () => {
    if (fs.existsSync(ProductosGuardados)){
        return JSON.parse(fs.readFileSync(ProductosGuardados,"utf-8" ))
    }
    return[]
}

let products = ProductosAGuardar()

function ProxId(){
    let idmax = 0

    for (let i=0; i<products.length; i++){
        if (products[i].id > idmax){
            idmax = products[i].id
        } 
    }
    return idmax + 1
}

console.log("Productos cargados:", products)

console.log("DIR BASE:", __dirname)
console.log("CARPETA IMAGENES:", CarpetaImagenes)
console.log("EXISTE?:", fs.existsSync(CarpetaImagenes))


const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, CarpetaImagenes)},

    filename: function(req, file, cb){
        const NombreImagen = Date.now() + "-" + file.originalname
        cb(null, NombreImagen)
    }
})

//muestro productos
const upload = multer({storage: storage})

app.get(`/RealTimeProducts`,(req, res)=>{
    res.render("RealTimeProducts", { products })
})


const httpServer = app.listen (8081, ()=> {
    console.log("Escuchando al puerto 8081")
})

const socketServer = new Server(httpServer)

socketServer.on(`connection`,(socket)=>{
    console.log(`se conecto el cliente`, socket.id)
    socket.emit("products", products)


    socket.on(`disconnect`, ()=>{
        console.log(`cliente desconectado`, socket.id)
    })

    socket.emit(`Saludo`, `Bienvenido`)
})

app.post("/products", upload.single("thumbnail"), (req, res) => {
    console.log(req.body)
    console.log(req.file)
    const{name, description, price, stock, code} = req.body
    const thumbnail = req.file ? "/imagenes/" + req.file.filename : ""
    }

app.delete ("/products/:id")

    function BuscarIdDel (){
        let IdBuscado = 1

        for (i=0; i < products[i].id.length; i++){
            if (roducts[i].id = IdBuscado){

            }
        })
    }

    let product = { 
        name,
        description, 
        price, 
        stock,
        thumbnail,
        code,
        id: ProxId()
    }
    products.push(product)

    fs.writeFileSync(ProductosGuardados, JSON.stringify(products, null, 2))

    socketServer.emit("products", products)

    res.redirect("/RealTimeProducts")
})
