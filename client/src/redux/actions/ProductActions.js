import * as types from "../types/types";
import { toast } from "react-toastify";
import axios from "axios";

export const getProducts = () => async (dispatch) => {
  try {
    const response = await axios.get("https://fakestoreapi.com/products");
    dispatch({
      type: types.FETCH_PRODUCTS,
      payload: response.data,
    });
    toast.success("getting successfully", { autoClose: 2000 });
  } catch (err) {
    toast.error(err);
  }
};

////////////////////////////////////////////////////////////////////////////////////////

export const getCategories = () => async (dispatch) => {
  try {
    const response = await axios.get(
      "https://fakestoreapi.com/products/categories"
    );
    dispatch({
      type: types.FETCH_CATEGORIES,
      payload: response.data,
    });
    toast.success("getting successfullyyyyyyyyyyyyyyyyyy", { autoClose: 2000 });
  } catch (err) {
    toast.error(err);
  }
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const filterCategories = (products, category) => async (dispatch) => {
  try {
    const response = await axios.get(
      `https://fakestoreapi.com/products/category/${category}`
    );
    dispatch({
      type: types.FILTER_CATEGORY,
      payload: category === "ALL" ? products : response.data,
      category,
    });
    toast.success("getting successfully", { autoClose: 2000 });
    console.log("hhhhhhhhhhhhhhhhhhhhhhhhh");
  } catch (err) {
    toast.error(err);
  }
};

/////////////////////////////////////////////////////////////////////////////////////////////////
export const filterPrice = (sortedItems, sort) => (dispatch) => {
  let products = sortedItems.slice();
  return dispatch({
    type: types.FILTER_PRICE,
    payload: {
      sort: sort,
      items: products.sort((a, b) =>
        sort === "lowest"
          ? a.price > b.price
            ? 1
            : -1
          : sort === "highest"
          ? a.price < b.price
            ? 1
            : -1
          : sort === "latest"
          ? a.id > b.id
            ? 1
            : -1
          : null
      ),
    },
  });
};
//////////////////////////////////////////////////////////////////////////////////////
export const filterSort = (products, sort) => async (dispatch) => {
  try {
    const response = await axios.get(
      `https://fakestoreapi.com/products?sort=${sort}`
    );
    dispatch({
      type: types.FILTER_SORT,
      payload: sort === "all" ? products : response.data,
      sort: sort,
    });
    toast.success("getting successfully", { autoClose: 2000 });
  } catch (err) {
    toast.error(err);
  }
};
