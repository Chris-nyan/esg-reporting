import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { GoogleLogin } from '@react-oauth/google';
import api from '@/lib/api';
import { useAuth } from '@/features/auth/context/AuthContext';
import { useNavigate } from 'react-router-dom'; // For redirecting

export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ email: '', password: '', name: '' });
  const { login } = useAuth();
  const navigate = useNavigate();

  // 1. THIS IS NEW: Handles the Google Data
  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      // credential is the JWT sent by Google
      const { data } = await api.post('/auth/google', { 
        credential: credentialResponse.credential 
      });

      // login saves the user/token in AuthContext
      login(data.user, data.token); 
      
      // Redirect to dashboard
      navigate('/');
    } catch (err) {
      console.error("Google Auth Error:", err.response?.data || err.message);
      alert("Google login failed. See console for details.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isLogin ? '/auth/login' : '/auth/signup';
    try {
      const { data } = await api.post(endpoint, formData);
      if (isLogin) {
        login(data.user, data.token);
        navigate('/');
      } else {
        alert("Check your email to verify your account!");
      }
    } catch (err) {
      alert(err.response?.data?.message || "Authentication failed");
    }
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        {!isLogin && (
          <Input 
            placeholder="Full Name" 
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
          />
        )}
        <Input 
          type="email" 
          placeholder="Email" 
          value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
        />
        <Input 
          type="password" 
          placeholder="Password" 
          value={formData.password}
          onChange={(e) => setFormData({...formData, password: e.target.value})}
        />
        
        <Button type="submit" className="w-full">
          {isLogin ? "Sign In" : "Create Account"}
        </Button>
      </form>

      <div className="relative flex items-center py-2">
        <div className="flex-grow border-t border-gray-300"></div>
        <span className="flex-shrink mx-4 text-gray-400 text-xs uppercase text-[10px]">Or continue with</span>
        <div className="flex-grow border-t border-gray-300"></div>
      </div>

      <div className="flex justify-center">
        {/* 2. UPDATED THIS LINE: Points to the new function */}
        <GoogleLogin 
          onSuccess={handleGoogleSuccess} 
          onError={() => console.log('Login Failed')}
          useOneTap
        />
      </div>

      <p className="text-center text-sm text-gray-600">
        {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
        <button 
          onClick={() => setIsLogin(!isLogin)}
          className="font-medium text-green-700 hover:underline"
        >
          {isLogin ? "Sign Up" : "Log In"}
        </button>
      </p>
    </div>
  );
}