import constants from "./constants";
import axios, { AxiosResponse } from "axios";
import Cookies from "js-cookie";
import { Product } from "../models/product";
import { ExtendedProductWishlist } from "../models/productWishlist";
import { ExtendedProductCart } from "../models/productCart";

class PiousApis {
  static loginUser = async (username: string, password: string) => {
    // { "token": "6785405fc3ad142536dfdf508edeed160d4c38ef", "user_id": 2 }
    try {
      const url = `${constants.kApiBaseUrl}${constants.kApiLogin}`;
      const body = {
        username: username,
        password: password,
      };
      const headers = {
        "Content-Type": "application/json",
      };
      const res: AxiosResponse = await axios.post(url, body, {
        headers: headers,
      });
      if (res.status == 200) {
        const jsonData = res.data;
        console.log(jsonData);
        if ("token" in jsonData && "user_id" in jsonData) {
          const { token, user_id } = jsonData;
          Cookies.set("authdata", JSON.stringify({ token, userId: user_id }), {
            expires: 1,
            sameSite: "strict",
          });
          return jsonData;
        }
      }
      throw new Error("Something went wrong, Please try again later...");
    } catch (e) {
      if (e instanceof Error) {
        console.log(e);
        alert(e.message);
      }
      return null;
    }
  };

  static signupUser = async (
    username: string,
    email: string,
    password: string
  ) => {
    try {
      const url = `${constants.kApiBaseUrl}${constants.kApiSignup}`;
      const body = {
        username,
        email,
        password,
      };
      const headers = {
        "Content-Type": "application/json",
      };
      const res: AxiosResponse = await axios.post(url, body, {
        headers: headers,
      });
      if (res.status == 200) {
        const jsonData = res.data;
        console.log(jsonData);
        if ("token" in jsonData && "user_id" in jsonData) {
          return jsonData;
        }
      }
      throw new Error("Something went wrong, Please try again later...");
    } catch (e) {
      if (e instanceof Error) {
        console.log(e);
        alert(e.message);
      }
      return null;
    }
  };

  static logoutUser = async (token: string): Promise<boolean | null> => {
    try {
      const url = `${constants.kApiBaseUrl}${constants.kApiLogout}`;

      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      };
      const res: AxiosResponse = await axios.get(url, {
        headers: headers,
      });
      if (res.status == 204) {
        return true;
      }
      throw new Error("Something went wrong, Please try again later...");
    } catch (e) {
      if (e instanceof Error) {
        console.log(e);
        alert(e.message);
      }
      return null;
    }
  };

  static getAllProducts = async (token: string) => {
    try {
      const url = `${constants.kApiBaseUrl}${constants.kApiProducts}`;
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      };
      const res: AxiosResponse = await axios.get(url, {
        headers: headers,
      });
      if (res.status == 200) {
        const jsonData: Product[] = res.data;
        console.log(jsonData);
        return jsonData;
      }
      throw new Error("Something went wrong, Please try again later...");
    } catch (e) {
      if (e instanceof Error) {
        console.log(e);
        alert(e.message);
      }
      return null;
    }
  };

  static addProductToCart = async (
    productId: number,
    authJson: { token: string; userId: number },
    quantity?: number
  ) => {
    const { token, userId } = authJson;
    try {
      const url = `${constants.kApiBaseUrl}${constants.kApiProductsCart}`;
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      };
      const body = {
        quantity: quantity ? quantity : 1,
        user: userId,
        product: productId,
      };
      const res: AxiosResponse = await axios.post(url, body, {
        headers: headers,
      });
      if (res.status == 201) {
        const jsonData = res.data;
        console.log(jsonData);
        return jsonData;
      }
      throw new Error("Something went wrong, Please try again later...");
    } catch (e) {
      if (e instanceof Error) {
        console.log(e);
        alert(e.message);
      }
      return null;
    }
  };

  static getAllProductsInCart = async (token: string, userId: number) => {
    try {
      const url = `${constants.kApiBaseUrl}${constants.kApiProductsCartExtended}?user=${userId}`;
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      };
      const res: AxiosResponse = await axios.get(url, {
        headers: headers,
      });
      if (res.status == 200) {
        const jsonData: ExtendedProductCart[] = res.data;
        console.log(jsonData);
        return jsonData;
      }
      throw new Error("Something went wrong, Please try again later...");
    } catch (e) {
      if (e instanceof Error) {
        console.log(e);
        alert(e.message);
      }
      return null;
    }
  };

  static addProductToWishlist = async (
    productId: number,
    authJson: { token: string; userId: number }
  ) => {
    const { token, userId } = authJson;
    try {
      const url = `${constants.kApiBaseUrl}${constants.kApiProductsWishlist}`;
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      };
      const body = {
        user: userId,
        product: productId,
      };
      const res: AxiosResponse = await axios.post(url, body, {
        headers: headers,
      });
      if (res.status == 201) {
        const jsonData = res.data;
        console.log(jsonData);
        return jsonData;
      }
      throw new Error("Something went wrong, Please try again later...");
    } catch (e) {
      if (e instanceof Error) {
        console.log(e);
        alert(e.message);
      }
      return null;
    }
  };

  static getAllProductsInWishlist = async (token: string, userId: number) => {
    try {
      const url = `${constants.kApiBaseUrl}${constants.kApiProductsWishlistExtended}?user=${userId}`;
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      };
      const res: AxiosResponse = await axios.get(url, {
        headers: headers,
      });
      if (res.status == 200) {
        const jsonData: ExtendedProductWishlist[] = res.data;
        console.log(jsonData);
        return jsonData;
      }
      throw new Error("Something went wrong, Please try again later...");
    } catch (e) {
      if (e instanceof Error) {
        console.log(e);
        alert(e.message);
      }
      return null;
    }
  };

  static getUserDetails = async (token: string, userId: number) => {
    try {
      const url = `${constants.kApiBaseUrl}${constants.kApiUsers}${userId}/`;
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      };
      const res: AxiosResponse = await axios.get(url, {
        headers: headers,
      });
      if (res.status == 200) {
        const jsonData = res.data;
        console.log(jsonData);
        return jsonData;
      }
      throw new Error("Something went wrong, Please try again later...");
    } catch (e) {
      if (e instanceof Error) {
        console.log(e);
        alert(e.message);
      }
    }
  };

  // static addProduct = async (
  //   token: string,
  //   userId: number,
  //   product: Product
  // ) => {
  //   // try {
  //   //   const url = `${constants.kApiBaseUrl}${constants.kApiUsers}${userId}/`;
  //   //   const headers = {
  //   //     "Content-Type": "application/json",
  //   //     Authorization: `Token ${token}`,
  //   //   };
  //   //   const res: AxiosResponse = await axios.get(url, {
  //   //     headers: headers,
  //   //   });
  //   //   if (res.status == 200) {
  //   //     const jsonData = res.data;
  //   //     console.log(jsonData);
  //   //     return jsonData;
  //   //   }
  //   //   throw new Error("Something went wrong, Please try again later...");
  //   // } catch (e) {
  //   //   if (e instanceof Error) {
  //   //     console.log(e);
  //   //     alert(e.message);
  //   //   }
  //   // }
  // };
}

export default PiousApis;
