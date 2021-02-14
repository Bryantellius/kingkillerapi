# KingKiller Chronicle API

- API is intended for fans of Patrick Rothfuss' KingKiller Chronicle Series.
- This is a continually updated project.

## Endpoints

- /api/v1/characters

- Available Characters

  - Kvothe
  - Elodin
  - Denna
  - Abenthy
  - Simmon
  - Wilem
  - Maer Alveron

## Response

- /api/v1/characters

```
{
    "list": [
        {
      "name": string,
      "gender": string,
      "ethnicity": string,
      "skin": string,
      "hair": string,
      "eye-color": string,
      "family-members": [],
      "occupations": string[],
      "study": string[],
      "rank": string,
      "instruments": string[],
      "residences": string[],
      "image-url": string,
      "image-credit": string
    }
    ]
}
```

## Sources

- [Patrick Rothfuss](https://www.patrickrothfuss.com/content/index.asp)
- [KingKiller Chronicle Fandom](https://kingkiller.fandom.com/wiki/Category:Characters)
