import './orders.css'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import api from '../api/api'

function MyOrders() {
  const token = useSelector((state) => state.user.token)
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const loadOrders = async () => {
      try {
        setLoading(true)
        setError('')
        const response = await api.get('api/orders/my-orders', {
          headers: { Authorization: `Bearer ${token}` },
        })
        setOrders(response.data?.orders || [])
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load orders')
      } finally {
        setLoading(false)
      }
    }

    if (token) {
      loadOrders()
    }
  }, [token])

  return (
    <div className="orders-page">
      <div className="orders-page__header">
        <h1>My Orders</h1>
        <p>Track orders you have submitted for admin review.</p>
      </div>

      <div className="orders-panel">
        {loading && <p>Loading orders...</p>}
        {error && <p className="orders-error">{error}</p>}
        {!loading && !error && orders.length === 0 && <p>No submitted orders yet.</p>}
        {!loading && !error && orders.length > 0 && (
          <div className="orders-table">
            <div className="orders-table__head">
              <span>Order</span>
              <span>Status</span>
              <span>Total</span>
              <span>Date</span>
            </div>
            {orders.map((order) => (
              <div className="orders-table__row" key={order.order_id}>
                <span>#{order.order_id}</span>
                <span className="orders-status">{order.status}</span>
                <span>${Number(order.total_amount || 0).toFixed(2)}</span>
                <span>{new Date(order.created_at).toLocaleString()}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default MyOrders
