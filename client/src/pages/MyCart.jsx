import './my-cart.css'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import api from '../api/api'

function MyCart() {
  const token = useSelector((state) => state.user.token)
  const [items, setItems] = useState([])
  const [totalAmount, setTotalAmount] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchCart = async () => {
      try {
        setLoading(true)
        const response = await api.get('api/orders/my-cart', {
          headers: { Authorization: `Bearer ${token}` },
        })
        setItems(response.data?.items || [])
        setTotalAmount(Number(response.data?.totalAmount || 0))
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load cart')
      } finally {
        setLoading(false)
      }
    }

    if (token) {
      fetchCart()
    }
  }, [token])

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <div className="my-cart">
      <div className="my-cart__header">
        <h1>My Cart</h1>
        <p>Review medicines added to your cart before placing your order.</p>
      </div>

      <div className="my-cart__content">
        <div className="my-cart__empty">
          {loading && <p>Loading cart...</p>}
          {error && <p>{error}</p>}
          {!loading && !error && items.length === 0 && (
            <>
              <h2>Your cart is empty</h2>
              <p>Add items from Medicine Inventory to start building your order.</p>
            </>
          )}
          {!loading && !error && items.length > 0 && (
            <>
              <h2>Items in your cart</h2>
              <div className="my-cart__items">
                {items.map((item) => (
                  <div key={item.item_id} className="my-cart__item">
                    <p className="my-cart__item-name">{item.name}</p>
                    <p className="my-cart__item-meta">Quantity: {item.quantity}</p>
                    <p className="my-cart__item-meta">
                      Unit Price: ${Number(item.unit_price || 0).toFixed(2)}
                    </p>
                    <p className="my-cart__item-meta">
                      Subtotal: ${(Number(item.unit_price || 0) * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        <div className="my-cart__summary">
          <h3>Order Summary</h3>
          <div className="my-cart__row">
            <span>Items</span>
            <span>{totalItems}</span>
          </div>
          <div className="my-cart__row">
            <span>Total</span>
            <span>${totalAmount.toFixed(2)}</span>
          </div>
          <button
            type="button"
            className="my-cart__checkout"
            disabled={items.length === 0}
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  )
}

export default MyCart
