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
            </tr>
        `
    })
})