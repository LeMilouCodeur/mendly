import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Heart, Mail, Loader2, AlertCircle } from 'lucide-react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const EmailCapture = ({ variant = 'primary', ctaText = 'Découvrir Mendly dès sa sortie 💜' }) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  // Email validation function
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    
    // Clear previous messages when user starts typing
    if (message) {
      setMessage('');
      setIsError(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email.trim()) {
      setMessage('Veuillez saisir votre adresse email');
      setIsError(true);
      return;
    }

    if (!validateEmail(email)) {
      setMessage('Veuillez saisir une adresse email valide');
      setIsError(true);
      return;
    }

    setIsLoading(true);
    setMessage('');
    setIsError(false);

    try {
      const response = await axios.post(`${API}/email-subscription`, {
        email: email.trim(),
        source: variant === 'primary' ? 'hero' : 'final-cta'
      });
      
      setMessage(response.data.message);
      setIsError(false);
      setEmail('');
    } catch (error) {
      if (error.response?.status === 400) {
        setMessage('Cet email est déjà enregistré !');
      } else if (error.response?.status === 422) {
        setMessage('Format d\'email invalide');
      } else {
        setMessage('Une erreur est survenue. Réessaie plus tard.');
      }
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`email-capture ${variant === 'secondary' ? 'bg-white' : 'bg-mendly-card'} rounded-xl p-8 shadow-sm`}>
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-mendly-dark mb-2 flex items-center justify-center gap-2">
          <Mail className="w-5 h-5 text-mendly-violet" />
          Pour être prévenu·e du lancement
        </h3>
        <p className="text-sm text-mendly-dark/70">
          📩 Promis, pas de spam. Juste des bonnes nouvelles.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <div className="relative">
          <Input
            type="email"
            placeholder="ton@email.com"
            value={email}
            onChange={handleEmailChange}
            className={`h-12 text-center text-lg transition-all duration-300 ${
              isError 
                ? 'border-red-400 focus:border-red-500 bg-red-50' 
                : 'border-mendly-violet/20 focus:border-mendly-violet'
            }`}
          />
          {isError && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <AlertCircle className="w-5 h-5 text-red-500" />
            </div>
          )}
        </div>
        
        <Button
          type="submit"
          disabled={isLoading}
          className="w-full h-12 bg-mendly-violet hover:bg-mendly-violet/90 transition-all duration-300 transform hover:scale-105 text-white font-semibold rounded-xl shadow-md"
        >
          {isLoading ? (
            <Loader2 className="w-5 h-5 animate-spin mr-2" />
          ) : (
            <Heart className="w-5 h-5 mr-2" />
          )}
          {isLoading ? 'Inscription...' : ctaText}
        </Button>
      </form>

      {message && (
        <div className={`mt-4 p-3 border rounded-lg text-center transition-all duration-300 ${
          isError 
            ? 'bg-red-50 border-red-200 text-red-700' 
            : 'bg-mendly-violet/10 border-mendly-violet/20 text-mendly-violet'
        }`}>
          <div className="flex items-center justify-center gap-2">
            {isError ? (
              <AlertCircle className="w-4 h-4" />
            ) : (
              <Heart className="w-4 h-4" />
            )}
            <p className="font-medium">{message}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmailCapture;