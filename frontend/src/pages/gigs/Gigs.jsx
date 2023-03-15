import React, { useEffect, useRef, useState } from "react";
import "./Gigs.scss";
import GigCard from "../../components/GigCard";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import { newRequest } from "../../utils/newRequest";
function Gigs() {
  const { search } = useLocation();
  const id = useLocation();
  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["gigs"],
    queryFn: () =>
      id.search === ""
        ? newRequest
            .get(
              `/gig/allgigs?min=${minRef.current.value}&max=${maxRef.current.value}&sort=${sort}`
            )
            .then((res) => {
              return res.data;
            })
        : newRequest
            .get(
              `/gig/allgigs${search}&min=${minRef.current.value}&max=${maxRef.current.value}&sort=${sort}`
            )
            .then((res) => {
              return res.data;
            }),
  });

  const [sort, setSort] = useState("sales");
  const [open, setOpen] = useState(false);
  const minRef = useRef();
  const maxRef = useRef();
  const reSort = (type) => {
    setSort(type);
    setOpen(false);
  };

  const apply = () => {
    refetch();
  };
  useEffect(() => {
    refetch();
  }, [sort]);
  return (
    <div className="gigs">
      {data?.length === 0 ? (
        <h2> No search result</h2>
      ) : (
        <div className="container">
          <span className="breadcrumbs">Liverr {data?.title} </span>
          <h1>AI Artists</h1>
          <p>
            Explore the boundaries of art and technology with Liverrs AI artists
          </p>
          <div className="menu">
            <div className="left">
              <span>Budget</span>
              <input ref={minRef} type="number" placeholder="min" />
              <input ref={maxRef} type="number" placeholder="max" />
              <button onClick={apply}>Apply</button>
            </div>
            <div className="right">
              <span className="sortBy">Sort by</span>
              <span className="sortType">
                {sort === "sales" ? "Best Selling" : "Newest"}
              </span>
              <img src="./img/down.png" alt="" onClick={() => setOpen(!open)} />
              {open && (
                <div className="rightMenu">
                  {sort === "sales" ? (
                    <span onClick={() => reSort("createdAt")}>Newest</span>
                  ) : (
                    <span onClick={() => reSort("sales")}>Best Selling</span>
                  )}
                  <span onClick={() => reSort("sales")}>Popular</span>
                </div>
              )}
            </div>
          </div>
          <div className="cards">
            {isLoading
              ? "loading"
              : error
              ? "something wrong"
              : data.map((gig) => <GigCard key={gig._id} item={gig} />)}
          </div>
        </div>
      )}
    </div>
  );
}

export default Gigs;
