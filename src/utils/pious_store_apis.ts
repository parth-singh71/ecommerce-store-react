import constants from "./constants";
import axios, { AxiosResponse } from "axios";
import Cookies from "js-cookie";

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
        if ("token" in jsonData) {
          Cookies.set("token", jsonData.token, {
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
        if ("token" in jsonData) {
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
        // const jsonData: Array<Product> = res.data;
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
}

export default PiousApis