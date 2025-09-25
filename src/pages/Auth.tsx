import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/supabase/client";
import { AuthPage } from "@/components/AuthPage";

const Auth = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        // Get user role from user_roles table
        supabase
          .from("user_roles")
          .select("role")
          .eq("user_id", session.user.id)
          .maybeSingle()
          .then(({ data }) => {
            if (data) {
              if (data.role === "admin") {
                navigate("/admin");
              } else if (data.role === "brand") {
                navigate("/brand");
              } else {
                navigate("/shop");
              }
            } else {
              // Default to shop if no role found
              navigate("/shop");
            }
          });
      }
    });
  }, [navigate]);

  return (
    <AuthPage
      brandLogoSrc="/TD STUDIOS WHITE TEXT.png"
      mainImageSrc="/TD STUDIOS WHITE TEXT.png"
      bounceSrc="https://i.imgur.com/tWH4c48.png"
      bgImageSrc="/diamond-bg.jpg"
    />
  );
};

export default Auth;
