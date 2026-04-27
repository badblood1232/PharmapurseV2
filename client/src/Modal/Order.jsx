import './order.css'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import api from '../api/api'

function OrderModal({ setShowModal, medicine, onAdded }) {
  const token = useSelector((state) => state.user.token)
  const [quantity, setQuantity] = useState(1)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const unitPrice = Number(medicine?.price || 0)
  const previewTotal = unitPrice * quantity

  const handleAddToCart = async () => {
    try {
      setSubmitting(true)
      setError('')
      await api.post(
        'api/orders/cart/items',
        { med_id: medicine.med_id, quantity },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      if (typeof onAdded === 'function') {
        onAdded()
      }
      setShowModal(false)
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add item to cart')
    } finally {
      setSubmitting(false)
    }
  }

  return (
  <div className="order-modal__overlay" onClick={() => setShowModal(false)}>
      <div className="order-modal" onClick={(event) => event.stopPropagation()}>
        <button
          type="button"
          className="order-modal__close"
          onClick={() => setShowModal(false)}
          aria-label="Close modal"
        >
          x
        </button>
        <h1>Select Quantity</h1>
        <p>
          {medicine?.name
            ? `Choose quantity for ${medicine.name}.`
            : 'Choose how many items you want to order.'}
        </p>
        <p>Unit price: ${unitPrice.toFixed(2)}</p>
        <div className="order-modal__controls">
          <button
            type="button"
            onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
            disabled={submitting}
          >
            -
          </button>
          <span>{quantity}</span>
          <button
            type="button"
            onClick={() => setQuantity((prev) => prev + 1)}
            disabled={submitting}
          >
            +
          </button>
        </div>
        <p>Subtotal: ${previewTotal.toFixed(2)}</p>
        {error && <p className="order-modal__error">{error}</p>}
        <button
          type="button"
          className="order-modal__submit"
          onClick={handleAddToCart}
          disabled={submitting}
        >
          {submitting ? 'Adding...' : 'Add to Cart'}
        </button>
      </div>
    </div>


  )
}
export default OrderModal
