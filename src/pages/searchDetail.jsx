import React from "react";
import MinglePost from "../components/MinglePost/MinglePost";
import { searchServices } from "../services/search.services";
import {useQuery} from "react-query";
import {useParams} from "react-router-dom"

const SearchDetail = () => {
  const {query} = useParams();
  const {data : searchData , isLoading : searchDataLoader} = useQuery(
    ["search", query],
    () => 
    searchServices.searchPost({
        query_custom : query,
    }),
    {
        enabled : Boolean(query)
    }
  );
    const searchPostData = searchData?.data?.results;
    console.log(searchPostData)

    return(
        <>
        <h2>Search Detail</h2>
        {searchPostData?.length > 0
        ? searchPostData?.map((singlePost) => {
            return <MinglePost singlePost={singlePost} />
        })
        : <h2>No Post Found!</h2>
        }
        </>
    );
}

export default SearchDetail;