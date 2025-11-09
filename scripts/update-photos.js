// Script pour mettre à jour les photos en batch
import { supabase } from '../src/utils/supabase.js'

const photoUpdates = [
  // Femmes
  { nom: 'Aïcha Bello', photo: '/images/candidates/femmes/aicha-bello.jpg' },
  { nom: 'Fatou Diallo', photo: '/images/candidates/femmes/fatou-diallo.jpg' },
  { nom: 'Grace Kossi', photo: '/images/candidates/femmes/grace-kossi.jpg' },
  { nom: 'Mariam Orou', photo: '/images/candidates/femmes/mariam-orou.jpg' },
  { nom: 'Ruth Adimi', photo: '/images/candidates/femmes/ruth-adimi.jpg' },
  { nom: 'Sofia Yaya', photo: '/images/candidates/femmes/sofia-yaya.jpg' },
  
  // Hommes
  { nom: 'Kévin Dossou', photo: '/images/candidates/hommes/kevin-dossou.jpg' },
  { nom: 'Marc Zinsou', photo: '/images/candidates/hommes/marc-zinsou.jpg' },
  { nom: 'Prince Agossou', photo: '/images/candidates/hommes/prince-agossou.jpg' },
  { nom: 'Rodrigue Hounkpatin', photo: '/images/candidates/hommes/rodrigue-hounkpatin.jpg' },
  { nom: 'Steve Lawson', photo: '/images/candidates/hommes/steve-lawson.jpg' },
  { nom: 'Yannick Adé', photo: '/images/candidates/hommes/yannick-ade.jpg' }
]

async function updatePhotos() {
  for (const update of photoUpdates) {
    const { error } = await supabase
      .from('candidates')
      .update({ photo: update.photo })
      .eq('nom', update.nom)

    if (error) {
      console.error(`Erreur pour ${update.nom}:`, error)
    } else {
      console.log(`✅ Photo mise à jour pour ${update.nom}`)
    }
  }
}

updatePhotos()