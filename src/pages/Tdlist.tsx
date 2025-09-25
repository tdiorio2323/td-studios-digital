import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import { supabase } from "@/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { DB_ENABLED, requireDB } from "@/db";

// TD Studios page with refined glassmorphism design
const TD_LOGO_URL = "/images/TD FLAG USA.png"; // TD Studios patriotic logo

const Tdlist = () => {
  console.log("Tdlist component rendering...");
  const navigate = useNavigate();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPasswordField, setShowPasswordField] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast({
        title: "Error",
        description: "Please enter your email",
        variant: "destructive",
      });
      return;
    }
    if (!showPasswordField) {
      setShowPasswordField(true);
      return;
    }
    if (!password) {
      toast({
        title: "Error",
        description: "Please enter your password",
        variant: "destructive",
      });
      return;
    }

    // Database-optional: skip auth in no-DB mode
    if (!DB_ENABLED) {
      toast({
        title: "Demo Mode",
        description: "Database disabled - showing demo page only",
        variant: "default",
      });
      return;
    }

    setIsLoading(true);
    try {
      requireDB(toast);
      let auth = await supabase.auth.signInWithPassword({ email, password });
      if (
        auth.error &&
        auth.error.message.includes("Invalid login credentials")
      ) {
        auth = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: `${window.location.origin}/` },
        });
        if (auth.error) throw auth.error;
        toast({
          title: "Account Created",
          description: "Check your email to verify.",
        });
        return;
      }
      if (auth.error) throw auth.error;
      // role-based redirect
      if (auth.data.user) {
        const { data: roleData } = await supabase
          .from("user_roles")
          .select("role")
          .eq("user_id", auth.data.user.id)
          .maybeSingle();
        if (roleData?.role === "admin") navigate("/admin");
        else if (roleData?.role === "brand") navigate("/brand");
        // removed: else navigate("/shop") - no default redirect
      }
    } catch (err: any) {
      if (err.message === "DB_DISABLED") return; // Already handled by requireDB
      toast({
        title: "Auth Error",
        description: err.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
      <div className="bg-black/70 backdrop-blur-md p-8 rounded-2xl shadow-2xl w-80 text-center">
        <img
          src={TD_LOGO_URL}
          alt="TD Studios"
          className="mx-auto mb-6 w-24 h-24 rounded-full shadow-lg object-contain"
        />

        <div className="space-y-4">
          <button
            className="block w-full py-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition shadow-md"
            onClick={() => window.open("/", "_blank")}
          >
            Visit Main Site
          </button>
          <button
            className="block w-full py-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition shadow-md"
            onClick={() => window.open("/shop", "_blank")}
          >
            Shop Products
          </button>
          <button
            className="block w-full py-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition shadow-md"
            onClick={() => window.open("/mylar-designs", "_blank")}
          >
            Mylar Designs
          </button>
          <button
            className="block w-full py-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition shadow-md"
            onClick={() => window.open("/custom-designs", "_blank")}
          >
            Custom Designs
          </button>
          <button
            className="block w-full py-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition shadow-md"
            onClick={() => window.open("/contact", "_blank")}
          >
            Contact Us
          </button>
        </div>
      </div>
    </div>
  );
};

export default Tdlist;
