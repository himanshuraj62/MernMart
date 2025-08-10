import React from 'react';
import { useSelector } from 'react-redux';
import NoData from '../Components/NoData'; // Assuming NoData is a component you have

const MyOrder = () => {
  const orders = useSelector(state => state.orders.order);

  console.log("order Items", orders);

  // Helper to get a placeholder date if not available, for UI consistency
  const getOrderDate = () => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date().toLocaleDateString(undefined, options);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      {/* Page Header */}
      <div className="bg-white shadow-sm rounded-xl p-6 mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">My Orders</h1>
        <p className="text-gray-500 mt-1 text-sm sm:text-base">View your order history and status.</p>
      </div>

      {/* Conditional Rendering for Orders */}
      {!orders || orders.length === 0 ? (
        // Enhanced "No Orders" state
        <div className="text-center mt-16 p-8 bg-white rounded-xl shadow-sm">
           <NoData /> {/* Your existing NoData component */}
           <a
            href="/shop" // Link to your shopping page
            className="mt-6 inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-transform transform hover:-translate-y-1"
           >
            Browse Products
           </a>
        </div>
      ) : (
        // Orders list
        <div className="space-y-6">
          {orders.map((order, index) => (
            <div
              key={order._id + index + "order"}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 ease-in-out border border-gray-200/80 overflow-hidden"
            >
              {/* Card Header with Order Number and Date */}
              <div className="bg-gray-50 p-4 sm:p-5 border-b border-gray-200 flex justify-between items-center">
                <div>
                  <p className="font-semibold text-gray-800 text-sm">
                    Order No: <span className="text-blue-600 font-bold">{order?.orderId}</span>
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Date: {getOrderDate()}
                  </p>
                </div>
                <span className="px-3 py-1 text-xs font-medium text-green-700 bg-green-100 rounded-full">
                  Completed
                </span>
              </div>

              {/* Product details section */}
              <div className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row gap-5 items-start sm:items-center">
                  <img
                    src={order.product_details.image[0]}
                    alt={order.product_details.name}
                    className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-lg border border-gray-200 flex-shrink-0"
                  />
                  <div className="flex-grow">
                    <p className="font-bold text-lg text-gray-800">{order.product_details.name}</p>
                    <p className="text-sm text-gray-500 mt-1">A brief description of the product could go here if available.</p>
                  </div>
                  <a
                    href="#" // Link to the order details page
                    className="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors mt-2 sm:mt-0 ml-auto"
                  >
                    View Details
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrder;