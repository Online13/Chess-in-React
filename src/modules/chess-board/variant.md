Voici la liste des variantes d'échecs sur plateau carré 2D au format Markdown :

* Standard : C'est le jeu de base avec un plateau de 8x8 cases et 32 pièces aux positions fixes. Les règles de déplacement et de victoire (mat) servent de référence pour toutes les autres variantes.
>> OK

* Chess 960 : La position des pièces sur la première et la dernière rangée est tirée au sort avant chaque début de partie. Cette modification oblige les joueurs à réfléchir dès le premier coup plutôt que de réciter des ouvertures apprises par cœur.
>> update first position
>> update condition roque https://echecs-bretagne.fr/node/2108

* Crazyhouse : Chaque pièce capturée à l'adversaire change de couleur et rejoint votre réserve personnelle de matériel. Vous pouvez, à votre tour de jeu, parachuter une de ces pièces sur n'importe quelle case vide du plateau au lieu de déplacer une pièce déjà présente.
>> add personal reserve
>> add another action when it's your turn (parachute a piece from your reserve)

* Bughouse : Se joue par équipe de deux sur deux échiquiers séparés où les partenaires s'échangent les pièces qu'ils capturent. Une pièce capturée par votre coéquipier devient immédiatement disponible dans votre réserve pour être placée sur votre propre échiquier.
>> ???

* King of the Hill : En plus du mat classique, un joueur peut gagner instantanément en amenant son roi sur l'une des quatre cases centrales (d4, d5, e4, e5). Le contrôle du centre devient donc une condition de victoire directe et non plus seulement un avantage stratégique.
>> update condition of victory (add the possibility to win by bringing the king to the center)

* 3-Check : La partie se termine dès qu'un joueur a infligé trois échecs au roi adverse, peu importe le matériel restant sur le plateau. Cela favorise un jeu extrêmement agressif où les sacrifices de pièces sont fréquents pour forcer des échecs répétitifs.
>> update condition of victory (add the possibility to win by giving 3 checks)
>> need to store the number of checks given to the opponent
>> check by 2 pieces or more at the same time counts as 1 check only

* Antichess : Si vous avez la possibilité de capturer une pièce adverse, la règle vous oblige légalement à le faire. Le but est d'être le premier joueur à perdre toutes ses pièces ou à se retrouver dans une situation de pat.
>> update compute move > if there is a capture move, only allow capture moves
>> remove check & checkmate rule
>> update condition of victory (add the possibility to win by losing all your pieces or by stalemate)
>> promotion: pawn can be promoted to a king


# Backlog de variantes à implémenter plus tard

* Atomic Chess : Toute capture provoque une explosion qui élimine la pièce prenante, la pièce capturée et toutes les pièces non-pions situées sur les cases adjacentes. Un joueur gagne si le roi adverse est pris dans une explosion, même s'il n'est pas directement mis en échec.

* Horde : Un joueur possède une armée classique tandis que l'autre dirige une "horde" de 36 pions occupant presque toute sa moitié de terrain. Les pions gagnent par mat, tandis que l'armée classique gagne en capturant jusqu'au dernier pion adverse.
* Racing Kings : Les deux rois partent du même côté du plateau et doivent faire la course pour atteindre la rangée opposée en premier. Il est strictement interdit de donner un échec, ce qui transforme radicalement la manière de bloquer le passage de l'adversaire.
* Duck Chess : Un canard en plastique est posé sur le plateau et doit obligatoirement être déplacé sur une case vide par chaque joueur après son coup. Le canard bloque totalement la case qu'il occupe, empêchant tout mouvement, prise ou échec à travers lui.
* Fog of War : Le plateau est recouvert d'un brouillard qui ne laisse apparaître que les cases que vos propres pièces peuvent légalement atteindre ou capturer. L'adversaire et ses mouvements restent cachés tant qu'ils n'entrent pas dans votre champ de vision immédiat.
* Capablanca Chess : Se joue sur un plateau élargi de 10x8 cases avec l'ajout de deux nouvelles pièces hybrides : l'Archivêque et le Chancelier. Ces pièces combinent les mouvements du cavalier avec ceux du fou ou de la tour, augmentant considérablement la complexité tactique.
* Échecs de l'Andernach : Lorsqu'une pièce effectue une capture, elle change immédiatement de couleur pour rejoindre le camp adverse, à l'exception des rois. Cette règle change totalement la valeur des échanges puisque capturer une pièce signifie souvent perdre la sienne au profit de l'autre.
* Échecs Circé : Une pièce capturée n'est pas retirée définitivement du jeu mais "renaît" instantanément sur sa case de départ d'origine si celle-ci est libre. Cela rend le mat beaucoup plus difficile car les défenseurs reviennent sans cesse sur le plateau.
* Échecs Messigny : Au lieu de jouer un coup normal, un joueur a le droit d'échanger les positions de deux pièces identiques mais de couleurs opposées (par exemple, deux cavaliers). Cette action est interdite si le joueur précédent vient d'effectuer le même échange sur les mêmes pièces.

Souhaitez-vous que nous passions à la définition des mouvements spécifiques de ces pièces pour votre moteur de jeu ?

