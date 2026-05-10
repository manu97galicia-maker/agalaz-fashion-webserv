/**
 * Static content for /fr/tenue-bapteme. Lives in /data so the client
 * landing component AND the server-side layout share the source.
 */

export interface BaptemeTenue {
  name: string;
  pieces: string;
  occasion: string;
}

export interface FaqEntry {
  q: string;
  a: string;
}

export const TENUES_BAPTEME: BaptemeTenue[] = [
  {
    name: 'Tenue de baptême femme · invitée',
    pieces:
      "Robe midi en crêpe ou en dentelle dans un ton pastel (poudré, ciel, vieux rose) · ballerines ou escarpins talon moyen · veste cintrée si l'église est fraîche · pochette de soirée discrète",
    occasion: 'Cérémonie religieuse classique, baptême en famille, marraine ou tante',
  },
  {
    name: 'Tenue de baptême femme · marraine',
    pieces:
      "Robe midi élégante en crêpe ivoire ou tons doux · talons moyens · veste tailleur courte · bijoux fins (perles ou or) · cheveux relevés en chignon bas avec accessoire discret",
    occasion: 'Rôle de marraine, photos de famille, cérémonie où vous êtes mise en avant',
  },
  {
    name: 'Tenue de baptême femme · invitée chic',
    pieces:
      'Tailleur pantalon couleur poudrée ou robe portefeuille fluide · escarpins · sac structuré · maquillage soft naturel · cheveux mi-longs lissés ou ondulés',
    occasion: 'Baptême moderne en mairie, brunch après cérémonie, ambiance contemporaine',
  },
  {
    name: 'Tenue de baptême homme',
    pieces:
      'Costume bleu marine ou gris (sans cravate noire) · chemise blanche · cravate ou pochette colorée discrète · chaussures derby ou richelieu marron · ceinture assortie',
    occasion: 'Toute cérémonie, parrain, oncle, papa du baptisé, invité',
  },
  {
    name: 'Tenue de baptême garçon (enfant)',
    pieces:
      "Pantalon en lin ou chino beige · chemise blanche col mao · veste légère ou gilet · mocassins ou ballerines · n'oubliez pas les bretelles ou nœud-papillon optionnel pour photo",
    occasion: 'Le baptisé lui-même, frère ou cousin du bébé, invité enfant',
  },
  {
    name: 'Tenue de baptême fille (enfant)',
    pieces:
      "Robe blanche ou pastel à smocks · chaussures vernies blanches ou ballerines · serre-tête fleuri · gilet en laine fin · chaussettes hautes pour photo",
    occasion: 'Petite invitée, sœur ou cousine du baptisé, fille de la famille',
  },
  {
    name: 'Tenue de baptême bébé · le baptisé',
    pieces:
      'Robe ou ensemble blanc en lin/coton/dentelle · bonnet assorti · chaussons brodés · médaille de baptême en or · couverture de cérémonie pour les photos',
    occasion: 'Le bébé baptisé lui-même — tradition française privilégie le blanc total',
  },
];

export const TENUE_BAPTEME_FAQ: FaqEntry[] = [
  {
    q: "Comment s'habiller pour un baptême ?",
    a: "Pour un baptême classique en France, optez pour une tenue habillée mais pas trop formelle. Femmes : robe midi pastel, ballerines ou escarpins talon moyen, pochette discrète. Hommes : costume bleu marine ou gris, chemise blanche, cravate ou pochette colorée. Évitez le noir total (réservé aux funérailles) et le blanc (réservé au baptisé). Privilégiez les tons poudrés, beiges et pastels.",
  },
  {
    q: "Quelle tenue pour un baptême femme invitée ?",
    a: "Une robe midi en crêpe ou en dentelle dans des tons doux (poudré, ciel, vieux rose) avec des ballerines ou escarpins talon moyen. Ajoutez une veste cintrée si la cérémonie est dans une église, et une pochette de soirée discrète. Évitez le blanc total qui est réservé au bébé baptisé. Évitez aussi les tenues trop courtes ou trop décolletées par respect du lieu.",
  },
  {
    q: "Quelle est la tenue idéale pour la marraine ?",
    a: "La marraine peut être un peu plus mise en avant qu'une simple invitée — robe midi élégante en crêpe ivoire ou tons doux, escarpins moyens, veste tailleur courte, bijoux fins en perles ou or. Cheveux relevés en chignon bas avec accessoire discret pour les photos. Restez sobre : la marraine accompagne, ne vole pas la vedette au baptisé.",
  },
  {
    q: "Quelle tenue pour un baptême garçon ?",
    a: "Pour le baptisé garçon, robe ou ensemble blanc en lin/coton/dentelle, bonnet assorti et chaussons brodés. Pour les garçons invités plus âgés, pantalon en lin ou chino beige, chemise blanche col mao, gilet ou veste légère, mocassins. N'hésitez pas à ajouter un nœud-papillon ou bretelles pour les photos.",
  },
  {
    q: "Quelle couleur éviter pour un baptême ?",
    a: "Évitez le NOIR total (associé aux funérailles, inapproprié pour une cérémonie de joie). Évitez le BLANC total (réservé au baptisé bébé). Évitez aussi les couleurs trop voyantes (rouge vif, orange fluo). Privilégiez les tons doux : poudré, beige, ivoire, ciel, vieux rose, vert sauge, gris perle.",
  },
  {
    q: "Faut-il être habillé en blanc pour le baptisé ?",
    a: "Oui — la tradition française et catholique veut que le baptisé porte du blanc total (robe blanche ou ensemble blanc) symbolisant la pureté de l'âme renouvelée par le baptême. Cela vaut aussi bien pour les bébés que pour les baptisés plus âgés. Les invités évitent donc le blanc.",
  },
  {
    q: "Comment essayer une tenue de baptême avant d'acheter ?",
    a: "Agalaz vous permet de tester n'importe quelle robe ou costume sur votre photo réelle. Téléchargez votre photo et la photo de la tenue convoitée — l'IA montre comment elle vous va en 30 secondes. Premier essai gratuit, sans carte. Évite les achats impulsifs qui ne flattent pas votre silhouette ou votre teint.",
  },
];
