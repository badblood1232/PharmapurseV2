import Medicine from '../models/medicine.model.js';

const MedicineService = {
    getAll: async () => {
        const medicines = await Medicine.getAll();
        return medicines;
    },

    getById: async (id) => {
        const medicine = await Medicine.getById(id);
        return medicine;
    },
};

export default MedicineService;