import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useNavigate } from "react-router-dom";
import { newRequest } from "../../utils/newRequest";
import "./Orders.scss";
const Orders = () => {
  const nav = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const { isLoading, error, data } = useQuery({
    queryKey: ["orders"],
    queryFn: () =>
      newRequest.get(`/order/getOrder`).then((res) => {
        return res.data;
      }),
  });
  const handleContact = async (order) => {
    //if theres alreadyconversation thaen get the conversation otherwise post
    const sellerId = order.sellerId;
    const buyerId = order.buyerId;
    const id = sellerId + buyerId;
    try {
      const res = await newRequest.get(
        `/conversation/singleConversation/${id}`
      );
      nav(`/message/${res.data.id}`);
    } catch (error) {
      if (error.response.status === 404) {
        const res = await newRequest.post(`/conversation/createConversation`, {
          to: currentUser.isSeller ? buyerId : sellerId,
        });
        nav(`/message/${res.data.id}`);
      }
    }
  };
  return (
    <div className="orders">
      {isLoading ? (
        "loading..."
      ) : error ? (
        "error"
      ) : (
        <div className="container">
          <div className="title">
            <h1>Orders</h1>
          </div>
          <table>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Price</th>
              <th>Contact</th>
            </tr>
            {data.map((order) => (
              <tr key={order?._id}>
                <td>
                  <img className="image" src={order?.image} alt="" />
                </td>
                <td>{order?.title}</td>
                <td>{order?.price}</td>
                <td>
                  <img
                    className="message"
                    src="./img/message.png"
                    alt=""
                    onClick={() => handleContact(order)}
                  />
                </td>
              </tr>
            ))}
          </table>
        </div>
      )}
    </div>
  );
};

export default Orders;
