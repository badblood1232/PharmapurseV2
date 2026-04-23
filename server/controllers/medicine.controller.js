import Service from '../service/medicine.service.js';

const MedController = {
    getAll: async (req, res) => {
        try {
            const medicines = await Service.getAll();
            res.status(200).json(medicines);
        } catch (error) {
            console.log('GET MEDICINES ERROR:', error);
            res.status(500).json({ message: 'Failed to fetch medicines' });
        }
    },

    getById: async (req, res) => {
        try {
            const { id } = req.params;
            const medicine = await Service.getById(id);

            if (!medicine) {
                return res.status(404).json({ message: 'Medicine not found' });
            }

            return res.status(200).json(medicine);
        } catch (error) {
            console.log('GET MEDICINE BY ID ERROR:', error);
            return res.status(500).json({ message: 'Failed to fetch medicine' });
        }
    },
};

export default MedController;