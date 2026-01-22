import Service from '../service/medicine.service';


 const MedController = {

        create: async (req, res) => {
            try {
                const {name, details, image} = req.body;
                const medicine = await Service.create (name, details, image);
                res.status(201).json({message: "Medicine Successfully added!"})
            }
            catch(error){
                console.log(`error${error}`)
                res.status(400).json({message: error.message})
            }
        } 











 }