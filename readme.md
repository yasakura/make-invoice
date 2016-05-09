# Générateur de facture

Ce projet a pour but de créer une facture au format PDF d'après un fichier JSON.

## Fichier JSON

Pour voir la structure du fichier à utiliser, regardez le fichier _data_exemple.json_.

## Créer une facture

Pour générer une facture, placez-vous à la racine du projet et lancez la commande

```
$ node generate_invoice.js
```

Par défaut le fichier d'entrée est _data_example.json_ et le fichier de sortie _invoice.pdf_.

## Options

Vous pouvez passez à la commande deux options :
```
  --name  le nom et le chemin du PDF de sortie
  --json  l'emplacement d'un JSON à utiliser
```
_Pour l'option --name, ne pas oublier l'extension .pdf après le nom du fichier voulu._

## Licence

MIT
