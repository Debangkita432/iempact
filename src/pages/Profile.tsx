import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Loader2, User, Calendar, Award, Receipt, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Registration {
  _id: string;
  teamName: string;
  teamNumber: string;
  eventName: string;
  paymentScreenshotUrl: string;
  createdAt: string;
  verified: boolean;
}

interface UserProfile {
  _id: string;
  email: string;
  createdAt: string;
}

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("Please log in to view your profile.");
          setLoading(false);
          return;
        }

        const response = await axios.get(
          `${import.meta.env.VITE_LOCAL_BACKENDURL}/profile`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.success) {
          setUser(response.data.user);
          setRegistrations(response.data.registrations || []);
        } else {
            setError(response.data.message || "Failed to load profile.");
        }

      } catch (err: any) {
        console.error("Profile fetch error:", err);
        if (err.response?.status === 401 || err.response?.status === 403) {
            setError("Session expired. Please log in again.");
             localStorage.removeItem("token");
        } else {
             setError("Could not load profile. Please try again later.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-accent" />
      </div>
    );
  }

  if (error) {
     return (
        <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-4">
             <Navbar />
             <div className="text-center space-y-4">
                <h1 className="font-bebas text-4xl">Access Denied</h1>
                <p className="font-poppins text-foreground/70">{error}</p>
                 <Button variant="hero" onClick={() => navigate("/auth")}>
                   Go to Login
                 </Button>
             </div>
        </div>
     )
  }

  return (
    <>
      <Helmet>
        <title>My Profile | IMPACT 2026</title>
      </Helmet>
      <div className="min-h-screen bg-background text-foreground flex flex-col">
        <Navbar />
        
        <main className="flex-grow pt-24 pb-16 px-4">
            <div className="container mx-auto max-w-5xl space-y-8">
                
                {/* User Header */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-card/30 backdrop-blur-md border border-border/30 rounded-2xl p-6 md:p-10 flex flex-col md:flex-row items-center gap-6"
                >
                    <div className="w-24 h-24 rounded-full bg-accent/20 flex items-center justify-center">
                         <User className="w-12 h-12 text-accent" />
                    </div>
                    <div className="text-center md:text-left space-y-2">
                        <h1 className="font-bebas text-4xl md:text-5xl">My <span className="text-gradient-accent">Profile</span></h1>
                        <p className="font-poppins text-lg text-foreground/80">{user?.email}</p>
                        <p className="font-poppins text-sm text-foreground/50">Member since {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}</p>
                    </div>
                </motion.div>

                {/* Registrations Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                >
                    <h2 className="font-bebas text-3xl mb-6 pl-2 border-l-4 border-accent">My Registrations</h2>

                    {registrations.length === 0 ? (
                         <div className="text-center py-12 bg-card/20 rounded-xl border border-dashed border-border/50">
                             <p className="font-poppins text-foreground/60 mb-4">You haven't registered for any events yet.</p>
                             <Button variant="outline" onClick={() => navigate("/events")}>Browse Events</Button>
                         </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {registrations.map((reg, index) => (
                                <motion.div 
                                    key={reg._id}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.1 + index * 0.05 }}
                                    className="bg-card/20 hover:bg-card/40 transition-colors border border-border/30 rounded-xl p-5 flex flex-col h-full"
                                >
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="p-2 bg-primary/10 rounded-lg">
                                            <Award className="w-6 h-6 text-primary" />
                                        </div>
                                        {/* Status Badge */}
                                        {reg.verified ? (
                                            <span className="bg-green-500/10 text-green-500 text-xs px-2 py-1 rounded-full border border-green-500/20 flex items-center gap-1">
                                                <CheckCircle className="w-3 h-3" /> Verified
                                            </span>
                                        ) : (
                                            <span className="bg-yellow-500/10 text-yellow-500 text-xs px-2 py-1 rounded-full border border-yellow-500/20 flex items-center gap-1">
                                                 <AlertCircle className="w-3 h-3" /> Pending
                                            </span>
                                        )}
                                    </div>
                                    
                                    <h3 className="font-bebas text-2xl mb-2 line-clamp-1">{reg.eventName}</h3>
                                    
                                    <div className="space-y-2 mb-4 flex-grow">
                                        <div className="flex items-center text-sm text-foreground/70">
                                            <User className="w-4 h-4 mr-2 opacity-70" />
                                            <span>Team: {reg.teamName}</span>
                                        </div>
                                         <div className="flex items-center text-sm text-foreground/70">
                                            <Calendar className="w-4 h-4 mr-2 opacity-70" />
                                            <span>{new Date(reg.createdAt).toLocaleDateString()}</span>
                                        </div>
                                    </div>

                                    {reg.paymentScreenshotUrl && (
                                         <a 
                                            href={reg.paymentScreenshotUrl} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="text-xs flex items-center justify-center gap-2 p-2 rounded-lg bg-background/50 hover:bg-accent/20 text-foreground/80 hover:text-accent transition-all border border-border/30"
                                         >
                                            <Receipt className="w-3 h-3" />
                                            View Receipt
                                         </a>
                                    )}
                                </motion.div>
                            ))}
                        </div>
                    )}
                </motion.div>

            </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default Profile;
