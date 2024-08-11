import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Loader from '../../components/shared/Loader'
import { useAllOrder } from '../../hooks/useOrder'
import ShowProducts from '../../components/Admin/ShowProduct'
import { IoIosAdd } from 'react-icons/io'
import { IoIosRemove } from 'react-icons/io'
import { useMutation, useQueryClient } from 'react-query'
import { toast } from 'react-toastify'
import ShowPlaylist from '../../components/Admin/ShowPlaylist'
const Dashboard = () => {
  const [currentTab, setCurrentTab] = useState('')
  let element = ''
  switch (currentTab) {
    case 'admin': {
      element = <ShowAdmin />
      break
    }
    case 'orders': {
      element = <ShowOrders />
      break
    }

    case 'products': {
      element = <ShowProducts />
      break
    }
    case 'offers': {
      element = <ShowPlaylist />
      break
    }

    default: {
      element = <div>Please select a tab</div>
    }
  }

  return (
    <div className="w-full  bg-gray-100 rounded-3xl p-4">
      <h1 className="font-semibold text-2xl my-3">Admin Dashboard</h1>
      <div className="w-full rounded-xl bg-white p-2 text-lg font-medium gap-2 flex-wrap flex">
        <ButtonDash
          name={'Admin Profile'}
          tab="admin"
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
        />
        <ButtonDash
          name={'Order History'}
          tab="orders"
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
        />

        <ButtonDash
          name={'Products'}
          tab="products"
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
        />
        <ButtonDash
          name={'offers'}
          tab="offers"
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
        />
      </div>
      <div>{element}</div>
    </div>
  )
}
export default Dashboard
const ButtonDash = ({ name, tab, currentTab, setCurrentTab }) => {
  return (
    <button
      onClick={() => setCurrentTab(tab)}
      className={`${
        currentTab === tab ? 'bg-zinc-800 text-white' : 'bg-gray-100'
      } rounded-full text-base px-4 py-1`}
    >
      {name}
    </button>
  )
}

const ShowOrders = () => {
  const { data: orders, isLoading, error } = useAllOrder()
  console.log(orders)
  if (isLoading) {
    return <Loader />
  }

  return (
    <div className="w-full text-sm py-6 px-4">
      <h2 className="text-2xl font-bold mb-4">Orders</h2>
      <div className="bg-white p-2 rounded-lg shadow-lg">
        {orders?.data?.map((order, index) => (
          <div
            key={index}
            className="bg-gray-50 p-4 rounded-lg mb-6 shadow-sm border border-gray-200"
          >
            <h3 className="text-sm font-semibold my-2">
              Order ID: {order._id}
            </h3>

            <div className="my-2 *:text-base">
              <h4 className="text-base font-medium my-2">Items:</h4>
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm text-left">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="py-2 px-2 font-medium">Product</th>
                      <th className="py-2 px-2 font-medium">Quantity</th>
                      <th className="py-2 px-2 font-medium">
                        Price (per unit)
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.items.map((item, idx) => (
                      <tr
                        key={idx}
                        className="border-b text-sm border-gray-200"
                      >
                        <td className="py-2 px-2">{item.product.name}</td>
                        <td className="py-2 px-2">{item.quantity}</td>
                        <td className="py-2 px-2">
                          Rs.{' '}
                          {(
                            item.product.price -
                            (item.product.offerPercentage / 100) *
                              item.product.price
                          ).toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="mt-2">
              <h4 className="text-base font-medium">
                Total Amount:{' '}
                <span className="font-semibold text-green-600">
                  Rs. {order.totalPrice.toFixed(2)}
                </span>
              </h4>
              <h4 className="text-sm font-medium">
                Payment Status:{' '}
                <span
                  className={`font-medium ${
                    order.status === 'Completed'
                      ? 'text-green-600'
                      : 'text-red-600'
                  }`}
                >
                  {order.status}
                </span>
              </h4>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

const ShowAdmin = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  })

  const mutation = useMutation(
    async (newData) => {
      return axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/admin/update`,
        newData,
        {
          withCredentials: true,
        }
      )
    },
    {
      onSuccess: (response) => {
        toast.success(response.data.message || 'Admin updated successfully')
      },
      onError: (error) => {
        toast.error(error.response?.data?.message || 'Failed to update admin')
      },
    }
  )

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    mutation.mutate(formData)
  }

  return (
    <div className="max-w-lg px-4 py-6 my-6 rounded-md">
      <h2 className="text-2xl font-bold mb-4 ">Update Admin</h2>
      <form className="text-base" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="username"
            className=" text-base font-medium text-gray-700"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="mt-1 px-2 w-full border border-gray-300 rounded-md"
            placeholder="Enter new username"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-base font-medium text-gray-700"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="mt-1 px-2 w-full border border-gray-300 rounded-md"
            placeholder="Enter new password"
          />
        </div>
        <button
          type="submit"
          className=" bg-zinc-900 font-semibold text-white px-2 py-1 w-fit rounded-md hover:bg-white hover:text-black transition duration-300"
          disabled={mutation.isLoading}
        >
          {mutation.isLoading ? 'Updating...' : 'Update Admin'}
        </button>
      </form>
    </div>
  )
}
