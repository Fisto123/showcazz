import React from "react";
import "./Gig.scss";
import { Slider } from "infinite-react-carousel/lib";
import { newRequest } from "../../utils/newRequest";
import { useQuery } from "@tanstack/react-query";
import { Link, useLocation, useParams } from "react-router-dom";
import moment from "moment";
import Reviews from "../../components/Reviews";

function Gig() {
  const { gigId } = useParams();
  const { search } = useLocation();
  console.log(search);
  const { isLoading, error, data } = useQuery({
    queryKey: [gigId],
    queryFn: () =>
      search
        ? newRequest.get(`/gig/allgigs?cat=design`).then((res) => {
            return res.data;
          })
        : newRequest.get(`/gig/singlegig/${gigId}`).then((res) => {
            return res.data;
          }),
  });
  const userId = data?.userId;
  const {
    isLoading: isLoadingData,
    error: isErrorData,
    data: dataUser,
  } = useQuery({
    queryKey: ["user"],
    queryFn: () =>
      newRequest.get(`/user/getUser/${userId}`).then((res) => {
        return res.data;
      }),
    enabled: !!userId,
  });

  return (
    <div className="gig">
      {isLoading ? (
        "loading"
      ) : error ? (
        "error"
      ) : (
        <div className="container">
          <div className="left">
            <span className="breadcrumbs">
              Liverr{" >"} {data?.cat} {">"}{" "}
            </span>
            {isLoadingData ? (
              "loading"
            ) : isErrorData ? (
              "error"
            ) : (
              <>
                <h1>{data?.title}</h1>
                <div className="user">
                  <img
                    className="pp"
                    src={dataUser?.img || "/img/noavatar.jpg"}
                    alt=""
                  />
                  <span>{dataUser?.username}</span>
                  {!isNaN(data?.totalStars / data?.starNumber) && (
                    <div className="stars">
                      {Array(Math.round(data?.totalStars / data?.starNumber))
                        .fill()
                        .map((item, i) => (
                          <img src="/img/star.png" alt="" key={i} />
                        ))}
                      <span>
                        {Math.round(data?.totalStars / data?.starNumber)}
                      </span>
                    </div>
                  )}
                </div>
              </>
            )}
            <Slider slidesToShow={1} arrowsScroll={1} className="slider">
              {data?.images?.map((img) => (
                <img src={img || "/img/noavatar.jpg"} key={data._id} alt="" />
              ))}
            </Slider>
            <h2>About This Gig</h2>
            <p>{data?.desc}</p>
            <div className="seller">
              <h2>About The Seller</h2>
              <div className="user">
                <img src={dataUser?.img} alt="" />
                <div className="info">
                  <span>{dataUser?.username}</span>
                  {!isNaN(data.totalStars / data.starNumber) && (
                    <div className="stars">
                      {Array(Math.round(data.totalStars / data.starNumber))
                        .fill()
                        .map((item, i) => (
                          <img src="/img/star.png" alt="" key={i} />
                        ))}
                      <span>
                        {Math.round(data.totalStars / data.starNumber)}
                      </span>
                    </div>
                  )}
                  <button>Contact Me</button>
                </div>
              </div>
              <div className="box">
                <div className="items">
                  <div className="item">
                    <span className="title">From</span>
                    <span className="desc">{dataUser?.country}</span>
                  </div>
                  <div className="item">
                    <span className="title">Member since</span>
                    <span className="desc">
                      {moment(dataUser?.createdAt).format("ll")}
                    </span>
                  </div>
                  <div className="item">
                    <span className="title">Avg. response time</span>
                    <span className="desc">4 hours</span>
                  </div>
                  <div className="item">
                    <span className="title">Last delivery</span>
                    <span className="desc">{data?.deliveryTime} day[s]</span>
                  </div>
                  <div className="item">
                    <span className="title">Languages</span>
                    <span className="desc">English</span>
                  </div>
                </div>
                <hr />
                <p>{dataUser?.desc}</p>
              </div>
            </div>
            <Reviews gigId={gigId} />
          </div>
          <div className="right">
            <div className="price">
              <h3>{data?.shortDesc}</h3>
              <h2>$ {data?.price}</h2>
            </div>
            <p>{data?.shortTitle}</p>
            <div className="details">
              <div className="item">
                <img src="/img/clock.png" alt="" />
                <span>{data?.deliveryTime} Days Delivery</span>
              </div>
              <div className="item">
                <img src="/img/recycle.png" alt="" />
                <span>{data?.revisionNumber} Revisions</span>
              </div>
            </div>
            <div className="features">
              {data?.features?.map((item) => (
                <div className="item" key={item?._id}>
                  <img src="/img/greencheck.png" alt="" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
            <Link to={`/pay/${gigId}`}>
              <button>Continue</button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default Gig;
