import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Heart, Mail, Loader2 } from 'lucide-react';
import { mockEmailSubmission } from '../mock';

const EmailCapture = ({ variant = 'primary', ctaText = 'Découvrir Mendly dès sa sortie 💜' }) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    setMessage('');

    try {
      const result = await mockEmailSubmission(email);
      setMessage(result.message);
      setEmail('');
    } catch (error) {
      setMessage('Une erreur est survenue. Réessaie plus tard.');
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

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="email"
          placeholder="ton@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="h-12 text-center text-lg border-mendly-violet/20 focus:border-mendly-violet"
          required
        />
        
        <Button
          type="submit"
          disabled={isLoading || !email}
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
        <div className="mt-4 p-3 bg-mendly-violet/10 border border-mendly-violet/20 rounded-lg text-center">
          <p className="text-mendly-violet font-medium">{message}</p>
        </div>
      )}
    </div>
  );
};

export default EmailCapture;