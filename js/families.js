/**
 * Quiz content for every family.
 *
 * To add a family: add an entry below, put its images in images/<id>/ and its
 * marker in markers/<id>.patt (see tools/make_marker.py). No other code changes
 * are needed; the landing page and the AR page both read from this list.
 *
 * Family fields:
 *   id             Used in the URL (play.html?family=<id>) and for images/<id>/, markers/<id>.patt.
 *   name           Shown as "<name> Family".
 *   questionWidth  A-Frame text width for the question text.
 *   questions      The quiz, in order.
 *
 * Question fields:
 *   text         Question shown above the answers ("\n" forces a line break).
 *   choices      Exactly four answers.
 *   answer       Index (0-3) of the correct choice (answers are shuffled when shown).
 *   fact         Optional sentence shown after the player answers.
 *   image        Optional picture shown with the question.
 *   imageWidth   Optional picture width in scene units (default 0.7).
 *   choiceWidth  A-Frame text width for the answers (larger = bigger text);
 *                a single number, or one number per choice.
 */
window.FAMILIES = [
  {
    id: 'dewitt',
    name: 'DeWitt',
    questionWidth: 3.3,
    questions: [
      {
        text: 'Where did Willem Adriaan de Wit come from before landing in Malacca?',
        choices: ['Johannesburg', 'Cape Town', 'Durban', 'Portugal'],
        answer: 1,
        fact: 'Willem Adriaan de Wit came to Malacca from Cape Town.',
        image: 'images/dewitt/1.png',
        choiceWidth: 5
      },
      {
        text: 'What was the name given to Petrus Johannes de Wit’s Father In Law, Adriaan Koek by the Malay rulers?',
        choices: ['The Merchant', 'Tuan Raja', 'The Trader', 'Tuan Raja Muda'],
        answer: 3,
        fact: 'The Malay rulers called Adriaan Koek, Petrus Johannes de Wit’s father-in-law, Tuan Raja Muda.',
        image: 'images/dewitt/2.png',
        choiceWidth: 4.5
      },
      {
        text: 'Which occupation did the grandfather, John Charles De Witt have that brought the family much recognition?',
        choices: [
          'Working with Seafield Estates',
          'Signal Master at Malayan\nRailways',
          'Singer Sewing Machines\nDistributor for Southern Malaya',
          'None of the above'
        ],
        answer: 2,
        fact: 'John Charles De Witt brought the family recognition as the Singer Sewing Machines distributor for Southern Malaya.',
        image: 'images/dewitt/3.png',
        choiceWidth: 2.5
      }
    ]
  },
  {
    id: 'fredericks',
    name: 'Fredericks',
    questionWidth: 4,
    questions: [
      {
        text: 'Who is this in the picture?',
        choices: ['Joseph George\nFredericks', 'Clarence Fredericks', 'Timothy Fredericks', 'Tommy Fredericks'],
        answer: 0,
        fact: 'The man in the picture is Joseph George Fredericks.',
        image: 'images/fredericks/1.png',
        choiceWidth: 4
      },
      {
        text: 'Tim grew up thinking he was of Portuguese descent. What made him take the initiative to map his past?',
        choices: [
          'Human curiosity\n& luck',
          'His Father told him',
          'He met their\nlong-lost relative',
          'Finding a list of Dutch\nfamily names, Fredericks\nfrom Melaka'
        ],
        answer: 3,
        fact: 'Tim began mapping his past after finding Fredericks on a list of Dutch family names from Melaka.',
        image: 'images/fredericks/2.png',
        choiceWidth: [3.3, 3.3, 3.3, 3]
      },
      {
        text: 'Where was Tim Fredericks’ paternal grandmother, Cecilia Low from?',
        choices: ['Selangor', 'Johor', 'Melaka', 'Pulau Pinang'],
        answer: 2,
        fact: 'Tim Fredericks’ paternal grandmother, Cecilia Low, was from Melaka.',
        image: 'images/fredericks/3.png',
        choiceWidth: 4
      }
    ]
  },
  {
    id: 'klass',
    name: 'Klass',
    questionWidth: 3.3,
    questions: [
      {
        text: 'The Klass Family Tradition is to capture a complete Family Photograph. After every _____ years, it was customary for a family photograph to be taken.',
        choices: ['1 year', '5 years', '20 years', '10 years'],
        answer: 1,
        fact: 'The Klass family took a complete family photograph every 5 years.',
        image: 'images/klass/1.png',
        imageWidth: 0.9,
        choiceWidth: 4
      },
      {
        text: 'Mr. Klass was awarded a medal for his outstanding service by the Kingdom of England for his service at the General Hospital of Singapore. What medal was it?',
        choices: [
          'The Imperial Service\nMedal',
          'The Distinguished\nService Order',
          'Accumulated Campaign\nService Medal',
          'Armed Forces Service\nMedal'
        ],
        answer: 0,
        fact: 'Mr. Klass received the Imperial Service Medal for his service at the General Hospital of Singapore.',
        image: 'images/klass/2.png',
        choiceWidth: 3.4
      },
      {
        text: 'An extremely old three-tier cake stand, gifted to newly-wed Edwin and Margaret, was used for celebrations to hold delicacies such as Sugee cake. How old was the cake stand?',
        choices: ['200 years', '250 years', '107 years', '50 years'],
        answer: 2,
        fact: 'The cake stand gifted to Edwin and Margaret was 107 years old.',
        image: 'images/klass/3.png',
        choiceWidth: 4
      }
    ]
  },
  {
    id: 'minjoot',
    name: 'Minjoot',
    questionWidth: 4,
    questions: [
      {
        text: 'Who were the earliest Forebears of the Minjoot Family?',
        choices: ['Bastian Minjoot', 'Cornelis Minjoot', 'John William Minjoot', 'Apollina Lucrecia\nMinjoot'],
        answer: 0,
        fact: 'Bastian Minjoot was the earliest forebear of the Minjoot family.',
        choiceWidth: 4
      },
      {
        text: 'Before the Fire, The Roof of The Family Home in Bandar Hilir was originally made of what?',
        choices: ['Aluminum', 'Wood', 'Attap', 'Vibranium'],
        answer: 2,
        fact: 'Before the fire, the roof of the family home in Bandar Hilir was made of attap.',
        image: 'images/minjoot/1.png',
        choiceWidth: 4
      },
      {
        text: 'What Dutch Traditional Shoes Is Marian Wearing In this Picture?',
        choices: ['Jutti', 'Clogs', 'Geta', 'Moccasins'],
        answer: 1,
        fact: 'Marian is wearing clogs, the traditional Dutch shoes.',
        image: 'images/minjoot/2.png',
        choiceWidth: 4
      }
    ]
  },
  {
    id: 'skelchy',
    name: 'Skelchy',
    questionWidth: 4,
    questions: [
      {
        text: 'Who inspired Nigel’s love for baking?',
        choices: ['His mother', 'His father', 'His grandmother', 'His best friend'],
        answer: 0,
        fact: 'Nigel’s love for baking was inspired by his mother.',
        image: 'images/skelchy/1.png',
        choiceWidth: 4
      },
      {
        text: 'What was one of Tertullian Skelchy, Honorius Skelchy’s son’s hobbies?',
        choices: ['Baking', 'Bodybuilding', 'Fishing', 'Diving'],
        answer: 1,
        fact: 'Bodybuilding was one of Tertullian Skelchy’s hobbies.',
        image: 'images/skelchy/2.png',
        choiceWidth: 4
      },
      {
        text: 'Where did Honorius Skelchy live before marrying in Melaka?',
        choices: ['Macau', 'Portugal', 'India', 'Vietnam'],
        answer: 0,
        fact: 'Honorius Skelchy lived in Macau before marrying in Melaka.',
        choiceWidth: 4
      }
    ]
  },
  {
    id: 'westerhout',
    name: 'Westerhout',
    questionWidth: 4,
    questions: [
      {
        text: 'Where are the Roots of The Westerhout Family?',
        choices: ['Sandel Village\nin Friesland (1600)', 'Middleberg Zealand', 'Morten Village', '19th Century Macau'],
        answer: 0,
        fact: 'The roots of the Westerhout family are in Sandel Village, Friesland (1600).',
        image: 'images/westerhout/1.png',
        choiceWidth: 3.5
      },
      {
        text: 'Who was the First Westerhout\nto Arrive In Melaka?',
        choices: ['Johann Harmes', 'Jan Jacobz\nWesterhout', 'Hedley Harry\nWesterhout', 'Zioke(Sjouke)\nJanssen Westerhout'],
        answer: 3,
        fact: 'Zioke (Sjouke) Janssen Westerhout was the first Westerhout to arrive in Melaka.',
        choiceWidth: 4
      },
      {
        text: 'On which VOC ship, did Zioke(Sjouke) Janssen Westerhout travel from Holland to Cape of Good Hope, where he became the captain of the ship?',
        choices: ['Meerlust', 'Batavia', 'Zuytdorp', 'VOC Ship Candia'],
        answer: 0,
        fact: 'Zioke (Sjouke) Janssen Westerhout travelled on the VOC ship Meerlust and became its captain.',
        image: 'images/westerhout/2.png',
        choiceWidth: 4
      }
    ]
  }
];
