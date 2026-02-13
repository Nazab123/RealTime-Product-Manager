const socket = io()

console.log("JS cargado")

window.addEventListener("beforeunload", () => {
  socket.disconnect()
})

socket.on("products", (products) => {
  const tablebody = document.getElementById("ProductsTable")
  tablebody.innerHTML = ""

  products.forEach(p => {
    let imagennueva = ""

    if (p.thumbnail !== "") {
      imagennueva = `<img src="${p.thumbnail}" width="50">`
    } else {imagennueva = "Sin imagen"
    }
        tablebody.innerHTML += `
            <tr>
                <td> ${p.name} </td>
                <td> ${p.description} </td>
                <td> ${p.price} </td>
                <td> ${p.stock} </td>
                <td> ${imagennueva} </td>
                <td> ${p.code} </td>
                <td> <button onclick="deleteProduct(${p.id})">
              Eliminar
              </button> </td>        
            </tr>
        `
    })
})

//Mando fetch(info para server con la direcion, el id y el metodo delete), espero a que responda, se puede eliminar correctamente, que no exista el producto o que no llegue respuesta
async function deleteProduct(id){
  try{
  const response = await fetch (`/products/${id}`,{
    method: "DELETE"
  })

  let data = await response.json()

  if(response.status > 199 && response.status<300){
    console.log ("eliminado correctamente", data.status)
   } else {
     console.error("Error del servidor:", data.error)
  }
  } catch (error){
    console.error("Error del conexion")
  }
 }