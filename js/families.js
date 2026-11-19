/**
 * Quiz content for every family.
 *
 * To add a family: add an entry below, put its images in images/<id>/ and its
 * marker in markers/<id>.patt (see tools/make_marker.py). No other code changes
 * are needed; the landing page and the AR page both read from this list.
 *
 * Question fields:
 *   text         Question shown above the answers ("\n" forces a line break).
 *   choices      Exactly four answers, displayed A B / C D.
 *   answer       Index (0-3) of the correct choice.
 *   image        Optional picture shown with the question.
 *   imageWidth   Optional picture width in scene units (default 0.7).
 *   columns      X positions of the left and right answer columns.
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
        image: 'images/dewitt/1.png',
        columns: [-2, 0.6],
        choiceWidth: 5
      },
      {
        text: 'What was the name given to Petrus Johannes de Wit’s Father In Law, Adriaan Koek by the Malay rulers?',
        choices: ['The Merchant', 'Tuan Raja', 'The Trader', 'Tuan Raja Muda'],
        answer: 3,
        image: 'images/dewitt/2.png',
        columns: [-2, 0.6],
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
        image: 'images/dewitt/3.png',
        columns: [-2, 0.5],
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
        image: 'images/fredericks/1.png',
        columns: [-2, 0.6],
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
        image: 'images/fredericks/2.png',
        columns: [-2, 0.6],
        choiceWidth: [3.3, 3.3, 3.3, 3]
      },
      {
        text: 'Where was Tim Fredericks’ paternal grandmother, Cecilia Low from?',
        choices: ['Selangor', 'Johor', 'Melaka', 'Pulau Pinang'],
        answer: 2,
        image: 'images/fredericks/3.png',
        columns: [-1.8, 0.7],
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
        image: 'images/klass/1.png',
        imageWidth: 0.9,
        columns: [-1.5, 0.6],
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
        image: 'images/klass/2.png',
        columns: [-2, 0.5],
        choiceWidth: 3.4
      },
      {
        text: 'An extremely old three-tier cake stand, gifted to newly-wed Edwin and Margaret, was used for celebrations to hold delicacies such as Sugee cake. How old was the cake stand?',
        choices: ['200 years', '250 years', '107 years', '50 years'],
        answer: 2,
        image: 'images/klass/3.png',
        columns: [-1.5, 0.6],
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
        columns: [-1.9, 0.5],
        choiceWidth: 4
      },
      {
        text: 'Before the Fire, The Roof of The Family Home in Bandar Hilir was originally made of what?',
        choices: ['Aluminum', 'Wood', 'Attap', 'Vibranium'],
        answer: 2,
        image: 'images/minjoot/1.png',
        columns: [-1.5, 0.7],
        choiceWidth: 4
      },
      {
        text: 'What Dutch Traditional Shoes Is Marian Wearing In this Picture?',
        choices: ['Jutti', 'Clogs', 'Geta', 'Moccasins'],
        answer: 1,
        image: 'images/minjoot/2.png',
        columns: [-1.5, 0.7],
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
        image: 'images/skelchy/1.png',
        columns: [-1.9, 0.5],
        choiceWidth: 4
      },
      {
        text: 'What was one of Tertullian Skelchy, Honorius Skelchy’s son’s hobbies?',
        choices: ['Baking', 'Bodybuilding', 'Fishing', 'Diving'],
        answer: 1,
        image: 'images/skelchy/2.png',
        columns: [-1.5, 0.7],
        choiceWidth: 4
      },
      {
        text: 'Where did Honorius Skelchy live before marrying in Melaka?',
        choices: ['Macau', 'Portugal', 'India', 'Vietnam'],
        answer: 0,
        columns: [-1.5, 0.7],
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
        image: 'images/westerhout/1.png',
        columns: [-2, 0.6],
        choiceWidth: 3.5
      },
      {
        text: 'Who was the First Westerhout\nto Arrive In Melaka?',
        choices: ['Johann Harmes', 'Jan Jacobz\nWesterhout', 'Hedley Harry\nWesterhout', 'Zioke(Sjouke)\nJanssen Westerhout'],
        answer: 3,
        columns: [-1.9, 0.5],
        choiceWidth: 4
      },
      {
        text: 'On which VOC ship, did Zioke(Sjouke) Janssen Westerhout travel from Holland to Cape of Good Hope, where he became the captain of the ship?',
        choices: ['Meerlust', 'Batavia', 'Zuytdorp', 'VOC Ship Candia'],
        answer: 0,
        image: 'images/westerhout/2.png',
        columns: [-1.5, 0.7],
        choiceWidth: 4
      }
    ]
  }
];
