# Music Maestro

yo quiero crear una app siguiendo esto: 
CST MVP — PRODUCT / UX SPEC

0. Modelo mental

                         CST
                          │
                          ▼
                       WORK
                          │
              ┌───────────┴───────────┐
              │                       │
         COMPOSITION               RECORDING
              │                       │
         Writers                  Artist
         Splits                   ISRC
         Publisher                Master
         PRO                      Ownership
         ISWC                         │
              │                       │
              └───────────┬───────────┘
                          │
                       RELEASE
                          │
                      Distribution
                          │
                          ▼
                   ROYALTY READY

Una cosa importante:

Work no es la composición.

Work es el contenedor que permite al usuario trabajar con una pieza musical y relacionar:

 composición

 grabación

 release

 derechos

 registros

 distribución

 posteriormente regalías

1. NAVEGACIÓN MVP

No metería 13 opciones.

┌──────────────────────────────┐
│ CST                          │
│                              │
│ HOME                         │
│                              │
│ CATALOG                      │
│   All Music                  │
│   Compositions               │
│   Recordings                 │
│   Releases                   │
│                              │
│ RIGHTS                       │
│   Ownership                  │
│                              │
│ REGISTRATION                 │
│                              │
│ DISTRIBUTION                 │
│                              │
│ ROYALTIES                    │
│                              │
│ ───────────────────────────  │
│ Search                       │
│ Settings                     │
└──────────────────────────────┘

Pero hay una precisión:

Rights, Registration, Distribution y Royalties no deberían ser obligatoriamente destinos independientes para cada acción.

Son también vistas del mismo catálogo.

Esto evita duplicar información.

2. HOME

La Home debe responder:

¿Cómo está mi catálogo?

┌──────────────────────────────────────────────────────────────┐
│ CST                                                          │
│                                                              │
│ Good morning                                                 │
│ Here's what needs your attention.                            │
│                                                              │
│                              [ + Add music ]   [ Search ]     │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│ YOUR CATALOG                                                 │
│                                                              │
│ 128              84              67              31           │
│ Works            Compositions    Recordings      Releases     │
│                                                              │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│ CATALOG HEALTH                                               │
│                                                              │
│                         82%                                  │
│                    ████████████████░░░░                      │
│                                                              │
│ Identity       100%                                          │
│ Rights          91%                                          │
│ Registration    74%                                          │
│ Distribution   88%                                          │
│                                                              │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│ NEEDS ATTENTION                              [ View all ]     │
│                                                              │
│ ⚠ Dime Que Sí                                                │
│   Missing composition registration                           │
│   [Resolve]                                                  │
│                                                              │
│ ⚠ Mi Canción                                                 │
│   Splits are incomplete                                      │
│   [Resolve]                                                  │
│                                                              │
│ ⚠ Another Song                                               │
│   Master ownership missing                                   │
│   [Resolve]                                                  │
│                                                              │
└──────────────────────────────────────────────────────────────┘

3. LA MÉTRICA CENTRAL: CATALOG HEALTH

No quiero un porcentaje que sea decorativo.

Debe salir de reglas reales.

Por ejemplo:

Identity
├── Title
├── Primary artist
└── Type

Rights
├── Writers
├── Splits
├── Publisher
└── Master ownership

Registration
├── PRO
├── ISWC
├── IPI
└── Registration status

Distribution
├── ISRC
├── UPC
├── Distributor
└── Release status

Después:

Royalty Ready
=
Identity
+
Rights
+
Registration
+
Distribution

Esto puede cambiar cuando implementemos el motor de validación.

4. ADD MUSIC

Este es el flujo principal del MVP.

Al pulsar:

+ Add music

no mostraría 25 campos.

┌──────────────────────────────────────────┐
│ Add music                                │
│                                          │
│ Let's get your music into CST.            │
│                                          │
│ What are you adding?                     │
│                                          │
│ ┌──────────────────────────────────────┐ │
│ │ 🎵 Song                              │ │
│ │ Composition + recording              │ │
│ └──────────────────────────────────────┘ │
│                                          │
│ ┌──────────────────────────────────────┐ │
│ │ ✍ Composition                       │ │
│ │ The underlying musical work          │ │
│ └──────────────────────────────────────┘ │
│                                          │
│ ┌──────────────────────────────────────┐ │
│ │ 🎙 Recording                         │ │
│ │ An audio recording / master          │ │
│ └──────────────────────────────────────┘ │
│                                          │
└──────────────────────────────────────────┘

5. ADD MUSIC — ¿YA EXISTE?

Después:

┌──────────────────────────────────────────┐
│ Is this music already somewhere?         │
│                                          │
│ ┌──────────────────────────────────────┐ │
│ │ Yes                                  │ │
│ │                                      │ │
│ │ I already have this music somewhere  │ │
│ └──────────────────────────────────────┘ │
│                                          │
│ ┌──────────────────────────────────────┐ │
│ │ No                                   │ │
│ │                                      │ │
│ │ I'm creating it now                  │ │
│ └──────────────────────────────────────┘ │
└──────────────────────────────────────────┘

6. NUEVA MÚSICA

Si es nueva:

Song title

[________________________]

Primary artist

[________________________]

[Continue]

Después:

What do you have right now?

○ Just the idea
○ A composition
○ A recording
○ A finished song

Esto permite que CST determine qué entidades debe crear.

7. MÚSICA EXISTENTE

Si ya existe:

Where does it exist?

○ Already in my catalog
○ Already released
○ Already distributed
○ I have the audio
○ I have the metadata

No necesitamos que el usuario conozca la diferencia técnica.

CST puede preguntar posteriormente lo necesario.

8. MATCH EXISTING MUSIC

Antes de crear un duplicado:

We found something similar.

┌────────────────────────────────────────────┐
│ Dime Que Sí                               │
│ Bismarck                                  │
│ ISRC: US-XXX-26-XXXX                      │
│                                            │
│ Already in CST                            │
└────────────────────────────────────────────┘

Is this the same music?

[Yes, use this]      [No, create new]

Esto es importantísimo para el MVP.

Un catálogo de derechos no puede llenarse de duplicados.

9. WORK DETAIL

Esta será la pantalla más importante.

┌──────────────────────────────────────────────────────────────┐
│ ← Catalog                                                    │
│                                                              │
│ Dime Que Sí                                                  │
│ Bismarck · Single                                            │
│ CST-000128                                                   │
│                                                              │
│ ● Needs attention                                            │
│                                                              │
│ ┌──────────────────────────────────────────────────────────┐ │
│ │ ROYALTY READINESS                                       │ │
│ │                                                          │ │
│ │ 76%                                                      │ │
│ │ ███████████████░░░░░                                     │ │
│ │                                                          │ │
│ │ ⚠ 2 things need attention                                │ │
│ └──────────────────────────────────────────────────────────┘ │
│                                                              │
│ OVERVIEW                                                     │
│                                                              │
│ COMPOSITION        RECORDING          RELEASE                │
│ ✓ Exists           ✓ Exists           ✓ Exists               │
│ ⚠ Registration     ✓ ISRC             ✓ Distributed         │
│ ⚠ Splits           ✓ Ownership        ✓ Released            │
│                                                              │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│ NEXT ACTION                                                  │
│                                                              │
│ ⚠ Complete writer splits                                    │
│                                                              │
│ The composition cannot be fully registered until ownership  │
│ is confirmed.                                                │
│                                                              │
│ [Complete splits]                                            │
│                                                              │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│ Overview   Composition   Recording   Release   Activity       │
└──────────────────────────────────────────────────────────────┘

10. OVERVIEW

La pestaña Overview no debe convertirse en un formulario.

Debe ser un estado resumido.

OVERVIEW

IDENTITY

Title
Dime Que Sí

Primary artist
Bismarck

Type
Single


COMPOSITION

✓ Exists
⚠ Splits incomplete
⚠ Registration incomplete


RECORDING

✓ Exists
✓ ISRC
✓ Master ownership


RELEASE

✓ Released
✓ Distributed


ROYALTY READINESS

76%

11. COMPOSITION

COMPOSITION

Dime Que Sí

STATUS
⚠ Needs attention


WRITERS

Bismarck García
50%

Juan Pérez
—


SPLITS

Total assigned: 50%

⚠ 50% missing

[Complete splits]


PUBLISHING

Publisher
Prudence

Status
✓ Assigned


REGISTRATION

PRO
BMI

Status
⚠ Not registered

ISWC
—

IPI
—

[Registration details]

12. SPLITS

Al entrar:

WRITER SPLITS

Dime Que Sí


Bismarck García

50%


Juan Pérez

[ 50% ]


TOTAL

100%

✓ Balanced


[Save splits]

Si no suma 100%:

TOTAL

75%

⚠ Splits must equal 100%

Esto debería ser una regla del MIE/validation engine.

13. RECORDING

RECORDING

Dime Que Sí

STATUS
✓ Complete


PRIMARY ARTIST

Bismarck


VERSION

Original


AUDIO

✓ Master attached


IDENTIFIER

ISRC
US-XXX-26-XXXX


MASTER RIGHTS

Owner

Bismarck García

Ownership
100%


DISTRIBUTION

✓ Distributed


[Edit recording]

14. RELEASE

RELEASE

Dime Que Sí

Single

STATUS
✓ Released


RELEASE DATE

June 12, 2026


UPC

XXXXXXXXXXXX


DISTRIBUTOR

DistroKid


PLATFORMS

✓ Spotify
✓ Apple Music
✓ YouTube Music


METADATA

✓ Complete

15. REGISTRATION

Esta pantalla no debe ser un formulario enorme.

Debe mostrar:

REGISTRATION

Composition registration


Dime Que Sí


PRO

BMI

Status
⚠ Not registered

[Register]


IDENTIFIERS

ISWC
—

IPI
—

REGISTRATION HISTORY

No registrations yet.

16. DISTRIBUTION

DISTRIBUTION

Dime Que Sí


STATUS

✓ Distributed


DISTRIBUTOR

DistroKid


RELEASE

June 12, 2026


IDENTIFIERS

ISRC
US-XXX-26-XXXX

UPC
XXXXXXXXXXXX


PLATFORMS

Spotify                 ✓
Apple Music             ✓
YouTube Music           ✓
Amazon Music            ✓

En MVP no intentaría hacer una plataforma de distribución.

Solo registrar y organizar el estado de distribución.

17. RIGHTS

Aquí tenemos que ser muy rigurosos.

No mezclar:

composition ownership

con

master ownership.

RIGHTS

Dime Que Sí


COMPOSITION

Bismarck García        50%
Juan Pérez             50%

Total                  100%


MASTER

Bismarck García       100%

Total                  100%


PUBLISHING

Prudence              50%
Other Publisher       50%


[View full rights]

Y eventualmente tendremos:

Territory
Right type
Ownership
Administration
Effective date
Expiration

Pero no metería toda esa complejidad en el MVP UI hasta que el modelo realmente la necesite.

18. ROYALTIES

Aquí tenemos que ser muy cuidadosos.

No prometería todavía:

“CST sabe cuánto dinero tienes.”

Si todavía no tenemos statements conectados, sería falso.

En MVP pondría:

ROYALTIES

Dime Que Sí


ROYALTY STATUS

● Ready for tracking


COMPOSITION

✓ Identity
✓ Writers
✓ Splits
⚠ Registration


RECORDING

✓ ISRC
✓ Ownership


MATCHING

Ready to match royalty data


[View royalty activity]

Si todavía no hay fuente de royalties:

No royalty data yet.

Once statements are connected,
CST will match income to this work.

Eso mantiene la arquitectura preparada sin inventar funcionalidad.

19. ROYALTIES — FUTURO

La arquitectura debería permitir posteriormente:

ROYALTY SOURCE
      ↓
STATEMENT
      ↓
TRANSACTION
      ↓
ISRC / ISWC
      ↓
RECORDING / COMPOSITION
      ↓
RIGHT HOLDER
      ↓
SPLIT
      ↓
EXPECTED SHARE
      ↓
RECEIVED

Ese es el verdadero objetivo.

20. CATALOG

La tabla principal:

CATALOG

128 works

[ Search ]

All
Compositions
Recordings
Releases


┌───────────────────────────────────────────────────────────────┐
│ WORK            COMPOSITION   RECORDING   RELEASE   HEALTH   │
├───────────────────────────────────────────────────────────────┤
│ Dime Que Sí     ⚠             ✓            ✓         76%      │
│ Mi Canción      ✓             ✓            —         82%      │
│ Sin Nombre      ⚠             ⚠            —         41%      │
│ Old Song        ✓             ✓            ✓         100%     │
└───────────────────────────────────────────────────────────────┘

21. FILTROS INTELIGENTES

FILTER

Status
○ Complete
○ Needs attention

Composition
○ Missing
○ Incomplete
○ Registered

Recording
○ Missing
○ Complete

Release
○ Planned
○ Released
○ Not released

Distribution
○ Distributed
○ Not distributed

Rights
○ Missing
○ Incomplete
○ Complete

Y accesos rápidos:

[ Needs attention ]

[ Ready for royalties ]

[ Missing splits ]

[ Missing registration ]

[ Distributed but unregistered ]

Ese último filtro puede ser especialmente valioso.

22. SMART SEARCH

El buscador debe buscar sobre todo:

Title
Artist
Writer
Publisher
ISRC
ISWC
IPI
UPC
CST-ID

Ejemplo:

Search: US-XXX-26-XXXX

Result:

Dime Que Sí
Recording
Bismarck
Release: June 12, 2026

23. ACTIVITY

ACTIVITY

Dime Que Sí


TODAY

10:42 AM
ISRC added

10:31 AM
Writer split updated

Yesterday
Release linked

August 20
Composition created

No necesitamos todavía un sistema social, comentarios, etc.

24. VALIDATION CENTER

Yo sí agregaría esto al MVP, aunque sea sencillo.

Porque es una de las partes que hace que CST no sea una base de datos.

CATALOG HEALTH

12 issues


CRITICAL

3

Composition ownership incomplete
2 works


HIGH

5

Missing registration
4 works


MEDIUM

4

Missing distribution metadata

Al hacer click:

Missing registration

4 works


Dime Que Sí
[Resolve]

Mi Canción
[Resolve]

Otra Canción
[Resolve]

Song X
[Resolve]

25. NEXT ACTION ENGINE

Este componente debería existir prácticamente en todos los Work Details.

NEXT ACTION

⚠ Complete composition registration

Why?

The song is already distributed,
but its composition is not registered.

[Resolve]

Otro caso:

NEXT ACTION

⚠ Complete master ownership

Why?

The recording exists but ownership
has not been confirmed.

[Resolve]

Otro:

NEXT ACTION

✓ Nothing urgent

This work is royalty-ready.

26. FLUJO A — CANCIÓN NUEVA

+ Add Music
      ↓
Song
      ↓
New
      ↓
Title
      ↓
Artist
      ↓
What do you have?
      ↓
Composition / Recording
      ↓
Create Work
      ↓
WORK DETAIL
      ↓
CST determines missing information
      ↓
Resolve
      ↓
Royalty Ready

27. FLUJO B — CANCIÓN YA EXISTENTE

+ Add Music
      ↓
Song
      ↓
Existing
      ↓
Search / Import
      ↓
MATCH
      ↓
Existing Work?
   ↙       ↘
 YES       NO
  ↓         ↓
Link      Create
  ↓         ↓
  └────┬────┘
       ↓
   Validate
       ↓
Missing information
       ↓
Resolve

28. FLUJO C — CANCIÓN YA DISTRIBUIDA

Add Music
    ↓
Existing
    ↓
Already distributed
    ↓
ISRC / UPC / metadata
    ↓
Match
    ↓
Recording
    ↓
Release
    ↓
Composition
    ↓
Rights
    ↓
Registration
    ↓
Royalty Ready

Y aquí CST puede descubrir:

✓ Distributed
✓ Recording
✓ ISRC
⚠ Composition registration
⚠ Splits

29. FLUJO D — SOLO COMPOSICIÓN

Add Composition
      ↓
Title
      ↓
Writers
      ↓
Splits
      ↓
Publisher
      ↓
PRO
      ↓
Registration
      ↓
Composition Ready

No obligamos a crear un recording.

30. FLUJO E — SOLO RECORDING

Add Recording
      ↓
Audio
      ↓
Artist
      ↓
Version
      ↓
ISRC
      ↓
Master ownership
      ↓
Optional:
Link composition
      ↓
Recording Ready

Esto es importante porque una grabación puede existir sin que CST tenga todavía toda la información de la composición.

31. FLUJO F — PLANIFICAR UN RELEASE

Este sí lo permitiría, pero muy limitado.

Work
 ↓
Release
 ↓
Release date
 ↓
Release type
 ↓
Artwork
 ↓
Metadata
 ↓
Distribution

Nada de:

 calendario de contenido

 campañas

 Instagram

 TikTok

 tareas de marketing

 CRM

Eso es Career y queda fuera del MVP.

32. ESTADOS

No usaría un único status.

El modelo debería pensar:

WORK
├── identity_status
├── composition_status
├── recording_status
├── rights_status
├── registration_status
├── release_status
├── distribution_status
└── royalty_readiness

Por ejemplo:

Dime Que Sí

Identity        COMPLETE
Composition     NEEDS_ATTENTION
Recording       COMPLETE
Rights          COMPLETE
Registration    NEEDS_ATTENTION
Release         COMPLETE
Distribution   COMPLETE
Royalty Ready   76%

Esto es mucho más potente que:

Status: Published

33. REGLAS DEL MVP

CST debería poder detectar como mínimo:

IF splits != 100%
→ Needs attention

IF recording exists AND ISRC missing
→ Needs attention

IF composition exists AND writers missing
→ Needs attention

IF composition registered AND ISWC missing
→ Registration incomplete

IF release exists AND recording missing
→ Invalid release relationship

IF distributed AND ISRC missing
→ Critical metadata issue

IF master ownership missing
→ Rights incomplete

IF composition ownership missing
→ Rights incomplete

Esto conecta directamente con el MIE/Validation Engine que ya tienes.

34. ¿QUÉ NO CONSTRUIRÍA EN ESTE MVP?

Esto es igual de importante.

Fuera:

❌ Career dashboard
❌ Campaign management
❌ Social media
❌ Content calendar
❌ Artist CRM
❌ Fan management
❌ Marketing analytics
❌ Full distribution platform
❌ Full accounting system
❌ Payment processing
❌ Advanced royalty forecasting

Dentro:

✓ Catalog
✓ Composition
✓ Recording
✓ Release
✓ Rights
✓ Splits
✓ Identifiers
✓ Registration status
✓ Distribution status
✓ Validation
✓ Catalog health
✓ Royalty readiness
✓ Activity
✓ Search

35. EL MVP COMPLETO EN UNA SOLA VISTA

                         CST MVP
                            │
             ┌──────────────┴──────────────┐
             │                             │
           HOME                          CATALOG
             │                             │
             │                         ┌───┴────┐
             │                         │        │
             │                       WORKS    FILTERS
             │                         │
             └──────────────┬──────────┘
                            │
                         WORK
                            │
       ┌────────────────────┼────────────────────┐
       │                    │                    │
 COMPOSITION            RECORDING              RELEASE
       │                    │                    │
 Writers                Artist                Date
 Splits                 ISRC                  UPC
 Publisher              Master                Metadata
 PRO                     Ownership             Distribution
 ISWC
       │                    │                    │
       └────────────────────┼────────────────────┘
                            │
                          RIGHTS
                            │
                       REGISTRATION
                            │
                       DISTRIBUTION
                            │
                     VALIDATION ENGINE
                            │
                            ▼
                    ROYALTY READINESS
                            │
                            ▼
                         ROYALTIES

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/40520757-c0ce-48f3-bc15-e9cbd8e7bca7).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
