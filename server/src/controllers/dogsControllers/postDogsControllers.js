const {Dog, Temperaments} = require("../../db")

const postDogsControllers = async(data)=>{

//Creamos el modelo del perro extrayendo los datos que recibimos por body

    const perro = {
        image: data.image,
        name: data.name,
        height: data.height,
        weight: data.weight,
        life_span: data.life_span
    }

    //verificamos si temperamentos es un Array y si contiene algo
    
    const temperaments = Array.isArray(data.temperamentos) ? data.temperamentos : []

    //creamos el perro con los datos recibidos por body

    const dog = await Dog.create(perro)

    // Conseguimos todos los temperamentos de nuestro modelo Temnperament que coincidan con los que recibimos por body

    const temperamentos = await Promise.all(temperaments.map(async temperamento => {
        return await Temperament.findOne({where: {name: temperamento}})
    })) 


    //Ahora por cada temperamento que tengamos coincidentes los vinculamos con el perro que estamos creando

    await Promise.all(temperamentos.map(async temperament =>{
        await dog.setTemperaments([temperament])
    }))

    const dogAdded = await Dog.findAll({
        include: [{
            model:Temperaments,
            attributes:["name"],
            through:{attributes:[]}
        }]
    })

    return dogAdded
}

module.exports = postDogsControllers