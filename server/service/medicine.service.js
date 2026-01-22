import Medicine from "../models/medicine.model";


    const MedicineService = {
         create: async (name, details, image) => {
                const medicine = await Medicine.Create(name, details, image);
                return medicine;
            
        },

        getall: async () => {
            const medicine = await Medicine.getall();
            return medicine;
        },

        GetbyId: async (id) => {
            const medicine = await Medicine.GetbyId(id);
            return medicine;
        },

        Update: async (id, name, details, image) =>{
            const medicine = await Medicine.Update(id, name, details, image);
            return medicine;
        }




    }

    export default MedicineService