import { supabase } from "../supabaseClient";
import { User, Address } from "../types";

export const resolvers = {
  Query: {
    getUsers: async (): Promise<User[]> => {
      try {
        const { data: users, error } = await supabase
          .from("users")
          .select("*");

        if (error) throw new Error(error.message);

        for (const user of users) {
          const { data: addresses, error: addressesError } = await supabase
            .from("address")
            .select("*")
            .eq("fid", user.fid);

          if (addressesError) throw new Error(addressesError.message);

          user.addresses = addresses;
        }

        return users;
      } catch (error: any) {
        console.error("Error fetching users:", error);
        throw new Error("Failed to fetch users");
      }
    },

    pfpByFid: async (
      _: unknown,
      { fid }: { fid: number }
    ): Promise<Address | null> => {
      const { data: addresses, error } = await supabase
        .from("address")
        .select("*")
        .eq("fid", fid)
        .single();

      if (error) throw new Error(error.message);

      return addresses || null;
    },

    getUserByAddress: async (
      _: unknown,
      { address }: { address: string }
    ): Promise<User | null> => {
      console.log("getUserByAddress query started for address:", address);
      try {
        console.log(`Searching for fid with address: ${address}`);
        const { data: addressesData, error: addressError } = await supabase
          .from("address")
          .select("fid")
          .eq("address", address)
          .maybeSingle();

        if (addressError) {
          console.error(
            "Error searching for fid based on address:",
            addressError
          );
          throw new Error(addressError.message);
        }

        if (!addressesData) {
          console.log("No fid found for the provided address.");
          return null;
        }

        console.log(
          `fid found: ${addressesData.fid}. Searching for corresponding user.`
        );
        const { data: userData, error: userError } = await supabase
          .from("users")
          .select("*")
          .eq("fid", addressesData.fid)
          .maybeSingle();

        if (userError) {
          console.error("Error searching for user with fid:", userError);
          throw new Error(userError.message);
        }

        if (!userData) {
          console.log("No user found for the provided fid.");
          return null;
        }

        console.log("User found:", userData);
        return userData;
      } catch (error: any) {
        console.error("Error processing getUserByAddress:", error);
        throw new Error("Internal error processing getUserByAddress.");
      }
    },

    getPfpByAddress: async (
      _: unknown,
      { address }: { address: string }
    ): Promise<string | null> => {
      console.log("getPfpByAddress query started for address:", address);
      try {
        console.log(`Searching for fid with address: ${address}`);
        const { data: addressesData, error: addressError } = await supabase
          .from("address")
          .select("fid")
          .eq("address", address)
          .maybeSingle();

        if (addressError) {
          console.error(
            "Error searching for fid based on address:",
            addressError
          );
          throw new Error(addressError.message);
        }

        if (!addressesData) {
          console.log("No fid found for the provided address.");
          return null;
        }

        console.log(
          `fid found: ${addressesData.fid}. Searching for corresponding pfp_url.`
        );
        const { data: userData, error: userError } = await supabase
          .from("users")
          .select("pfp_url")
          .eq("fid", addressesData.fid)
          .maybeSingle();

        if (userError) {
          console.error("Error searching for pfp_url with fid:", userError);
          throw new Error(userError.message);
        }

        if (!userData) {
          console.log("No pfp_url found for the provided fid.");
          return null;
        }

        console.log("pfp_url found:", userData.pfp_url);
        return userData.pfp_url || null;
      } catch (error: any) {
        console.error("Error processing getPfpByAddress:", error);
        throw new Error("Internal error processing getPfpByAddress.");
      }
    },
  },
};
