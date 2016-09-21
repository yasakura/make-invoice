# Générateur de facture

Ce paquet a pour but de créer une facture au format PDF d'après un fichier JSON.

## Fichier JSON

Exemple de la structure attendue :

``` json
{
  "date": "01/01/1984",
  "invoice_number": "XXXXXX",
  "invoice_object": "Fusce sapien neque",
  "my_company": {
    "name": "Lorem Ipsum",
    "adress": "1 rue de la mairie, 12345 Lorem",
    "phone_number": "+33 (0)1 02 03 04 05",
    "email": "lorem@ipsum.com",
    "siren": "001 002 003",
    "bank": {
      "name":  "Vestibulum orci sapien",
      "iban":  "XX01 0001 0002 0003 0004 0005 006",
      "bic" : "XXXXXXXX"
    }
  },
  "customer": {
    "name": "Lorem",
    "adress" : "2 rue de la cité, 12345 Lorem",
    "siren": "123 456 789",
    "tva_intra" : "FR01 123456789"
  },
  "item": [
    {
      "description": [
        { "item": "Vestibulum orci sapien" },
        { "item": "justo id dignissim varius" }
      ],
      "amount": 1,
      "unit_price": "0.00"
    },
    {
      "description": [
        { "item": "Vestibulum orci sapien" }
      ],
      "amount": 2,
      "unit_price": "0.00"
    }
  ],
  "limit_date_paiement": "30 jours à réception de facture",
  "paiement_mode": [
    { "kind": "- si nécessaire, par chèque à l'ordre de Lorem Ipsum" },
    { "kind": "- de préférence, par virement sur le compte bancaire suivant :" }
  ]
}
```

## Créer une facture

Une fois le paquet installé, lancer la commande suivante pour générer une facture :

```
$ make-invoice
```

Par défaut le fichier d'entrée est _data_example.json_ et le fichier de sortie _invoice.pdf_.
Le fichier sera généré à dans le dossier où vous lancez la commande.

### Options

Vous pouvez passez à la commande deux options :
```
  --name  le nom et le chemin du PDF de sortie
  --json  l'emplacement d'un JSON à utiliser
```

### Résultats

![Screenshot de la facture](imgs/invoice.png)

## Licence

MIT
