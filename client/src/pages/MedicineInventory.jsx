import './medicine-inventory.css'
import Modal from '../Modal/Order'
import { useEffect, useState } from 'react'
import api from '../api/api'

function MedicineInventory() {
  const [medicines, setMedicines] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [selectedMedicine, setSelectedMedicine] = useState(null)

  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        const response = await api.get('api/medicines')
        setMedicines(response.data || [])
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load medicine inventory')
      } finally {
        setLoading(false)
      }
    }

    fetchMedicines()
  }, [])

  const handleShow = (medicine) =>{
    setSelectedMedicine(medicine)
    setShowModal(true)
  }

  

  return (
    <div className="medicine-inventory">
      <div className="inventory__header">
        <h1>Medicine Inventory</h1>
        <p>Browse available medicines in your pharmacy inventory</p>
      </div>
      <div className="inventory__content">
        {loading && <p>Loading medicines...</p>}
        {error && <p>{error}</p>}

        {!loading && !error && medicines.length === 0 && (
          <div className="inventory__placeholder">
            <p>No medicines found. Add entries directly in your database first.</p>
          </div>
        )}

        {!loading && !error && medicines.length > 0 && (
          <div className="inventory__list">
            {medicines.map((medicine) => (
              <div key={medicine.med_id} className="inventory__card">
                <img src= {`${api.defaults.baseURL}image/${medicine.image}`} />
                <h3>{medicine.name}</h3>
                <p>{medicine.details}</p>
                <p>Price: ${Number(medicine.price || 0).toFixed(2)}</p>
                <button onClick={() => handleShow(medicine)}>Order Now!</button>
              </div>
            ))}
           {showModal && (
            <Modal
              setShowModal={setShowModal}
              medicine={selectedMedicine}
              onAdded={() => window.alert('Added to cart')}
            />
           )}
          </div>
        )}
      </div>
    </div>
  )
}

export default MedicineInventory

