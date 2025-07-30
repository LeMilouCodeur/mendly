# Contracts API - Mendly Landing Page

## Objectif
Remplacer les données mockées par une vraie persistance en base de données MongoDB pour la capture d'emails.

## Données Mockées Actuellement
Dans `/app/frontend/src/mock.js` :
- `mockEmailSubmission(email)` : Simule l'envoi d'email avec délai de 1s

## API Backend à Implémenter

### 1. Model EmailSubscription
```javascript
{
  id: string (UUID),
  email: string (required, unique),
  source: string, // 'hero' | 'final-cta'
  timestamp: datetime,
  ip_address: string (optional),
  user_agent: string (optional)
}
```

### 2. Endpoints à Créer

#### POST /api/email-subscription
- **Description** : Enregistre un nouvel email de subscription
- **Body** : `{ email: string, source?: string }`
- **Response Success (201)** : `{ success: true, message: "Email enregistré avec succès!" }`
- **Response Error (400)** : `{ success: false, message: "Email déjà enregistré" }`
- **Response Error (422)** : `{ success: false, message: "Email invalide" }`

#### GET /api/email-subscriptions (ADMIN)
- **Description** : Récupère la liste des emails (pour admin)
- **Response** : `{ subscriptions: EmailSubscription[], total: number }`

## Frontend Integration

### Fichiers à Modifier
1. **EmailCapture.jsx** : Remplacer `mockEmailSubmission` par appel API réel
2. **mock.js** : Supprimer (ne plus utiliser)

### Logique Frontend
```javascript
const handleSubmit = async (e) => {
  e.preventDefault();
  setIsLoading(true);
  
  try {
    const response = await axios.post(`${API}/email-subscription`, {
      email,
      source: variant === 'primary' ? 'hero' : 'final-cta'
    });
    
    setMessage(response.data.message);
    setEmail('');
  } catch (error) {
    if (error.response?.status === 400) {
      setMessage('Cet email est déjà enregistré !');
    } else {
      setMessage('Une erreur est survenue. Réessaie plus tard.');
    }
  } finally {
    setIsLoading(false);
  }
};
```

## Validation
- Email format validation côté backend
- Vérification unicité de l'email
- Gestion des erreurs appropriée

## Tests à Effectuer
1. Soumission email valide
2. Soumission email déjà existant
3. Soumission email invalide
4. Vérification persistance en base