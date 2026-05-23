import './orders.css'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import api from '../api/api'

const statuses = ['placed', 'approved', 'rejected', 'completed']

function AdminOrders() {
  const token = useSelector((state) => state.user.token)
  const [orders, setOrders] = useState([])
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [loading, setLoading] = useState(true)
  const [detailLoading, setDetailLoading] = useState(false)
  const [error, setError] = useState('')

  const authHeaders = useMemo(() => ({ Authorization: `Bearer ${token}` }), [token])

  const loadOrders = useCallback(async () => {
    try {
      setLoading(true)
      setError('')
      const response = await api.get('api/admin/orders', { headers: authHeaders })
      setOrders(response.data?.orders || [])
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load admin orders')
    } finally {
      setLoading(false)
    }
  }, [authHeaders])

  useEffect(() => {
    if (token) {
      loadOrders()
    }
  }, [loadOrders, token])

  const loadOrderDetail = async (orderId) => {
    try {
      setDetailLoading(true)
      const response = await api.get(`api/admin/orders/${orderId}`, { headers: authHeaders })
      setSelectedOrder(response.data?.order || null)
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load order detail')
    } finally {
      setDetailLoading(false)
    }
  }

  const updateStatus = async (orderId, status) => {
    try {
      await api.patch(
        `api/admin/orders/${orderId}/status`,
        { status },
        { headers: authHeaders }
      )
      setOrders((current) =>
        current.map((order) => (order.order_id === orderId ? { ...order, status } : order))
      )
      if (selectedOrder?.order_id === orderId) {
        setSelectedOrder({ ...selectedOrder, status })
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update order status')
    }
  }

  return (
    <div className="orders-page">
      <div className="orders-page__header">
        <h1>Admin Orders</h1>
        <p>Review submitted customer orders and update fulfillment status.</p>
      </div>

      <div className="admin-orders">
        <div className="orders-panel">
          {loading && <p>Loading orders...</p>}
          {error && <p className="orders-error">{error}</p>}
          {!loading && !error && orders.length === 0 && <p>No submitted orders yet.</p>}
          {!loading && orders.length > 0 && (
            <div className="orders-table">
              <div className="orders-table__head admin-orders__head">
                <span>Order</span>
                <span>Customer</span>
                <span>Status</span>
                <span>Total</span>
              </div>
              {orders.map((order) => (
                <button
                  type="button"
                  className="orders-table__row admin-orders__row"
                  key={order.order_id}
                  onClick={() => loadOrderDetail(order.order_id)}
                >
                  <span>#{order.order_id}</span>
                  <span>{order.user?.username || 'Unknown'}</span>
                  <span className="orders-status">{order.status}</span>
                  <span>${Number(order.total_amount || 0).toFixed(2)}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="orders-panel admin-orders__detail">
          {detailLoading && <p>Loading detail...</p>}
          {!detailLoading && !selectedOrder && <p>Select an order to view items.</p>}
          {!detailLoading && selectedOrder && (
            <>
              <div className="admin-orders__detail-header">
                <div>
                  <h2>Order #{selectedOrder.order_id}</h2>
                  <p>
                    {selectedOrder.user?.username} - {selectedOrder.user?.email}
                  </p>
                </div>
                <select
                  value={selectedOrder.status}
                  onChange={(event) => updateStatus(selectedOrder.order_id, event.target.value)}
                >
                  {statuses.map((status) => (
                    <option value={status} key={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>
              <div className="admin-orders__items">
                {selectedOrder.items.map((item) => (
                  <div className="admin-orders__item" key={item.item_id}>
                    <div>
                      <strong>{item.name}</strong>
                      <p>Quantity: {item.quantity}</p>
                    </div>
                    <span>${(Number(item.unit_price || 0) * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="admin-orders__total">
                <span>Total</span>
                <strong>${Number(selectedOrder.total_amount || 0).toFixed(2)}</strong>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default AdminOrders
