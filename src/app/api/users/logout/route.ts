import { supabaseClient } from "@/config/dbConfig";

const handleLogout = async () => {
    await supabaseClient.auth.signOut();
  };