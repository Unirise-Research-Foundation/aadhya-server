import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedMultipleIntelligencesActivities1768500200000 implements MigrationInterface {
  name = 'SeedMultipleIntelligencesActivities1768500200000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Find the Intelligence assessment
    const result = await queryRunner.query(
      `SELECT id FROM "assessments" WHERE "name" = 'Intelligence'`,
    );

    if (!result || result.length === 0) {
      throw new Error('Intelligence assessment not found');
    }

    const assessmentId = result[0].id;

    const agreeOptions = [
      { value: 1, label: 'Completely agree', emoji: '😊', scoreAdjustment: 5 },
      { value: 2, label: 'Somewhat agree', emoji: '🙂', scoreAdjustment: 2 },
      { value: 3, label: 'Unsure', emoji: '😐', scoreAdjustment: 0 },
      { value: 4, label: 'Somewhat disagree', emoji: '😕', scoreAdjustment: -2 },
      { value: 5, label: 'Completely disagree', emoji: '😢', scoreAdjustment: -5 },
    ];

    const activities = [
      {
        type: 'MCQ',
        domain: 'intelligence',
        attribute: 'intrapersonal',
        metadata: {
          id: 'mi-intrapersonal-q1',
          icon: 'Lock',
          questionId: 1,
          tinyText: 'Solitude',
          smallText: 'Private inner world',
          mediumText:
            'I tend to keep my thoughts and feelings to myself, finding comfort in solitude and personal reflection.',
          largeText: [
            'Have you ever felt most at peace alone with your thoughts? Priya keeps her feelings close and finds real comfort in quiet solitude.',
            'Her journal is her sanctuary. When she is alone, she feels most herself. Could solitude be where you do your best thinking?',
          ],
          label: 'Private Inner World',
          title: 'I am a private person and I like my private inner world',
          subtitle: 'Do you need solitude?',
          key: 'intrapersonal',
          options: agreeOptions,
        },
      },
      {
        type: 'MCQ',
        domain: 'intelligence',
        attribute: 'bodily-kinesthetic',
        metadata: {
          id: 'mi-bodily-kinesthetic-q2',
          icon: 'Activity',
          questionId: 2,
          tinyText: 'Movement',
          smallText: 'Move & fidget tendency',
          mediumText:
            'I feel a strong urge to move my body, whether tapping my foot, drumming my fingers, or shifting in my seat.',
          largeText: [
            'Have you ever been told to sit still, only for your mind to go blank? Arjun fidgets constantly — tapping, bouncing, shifting in his seat.',
            'When he paces while memorising or uses his hands, everything clicks. Could movement actually be the way you think best?',
          ],
          label: 'Body in Motion',
          title: 'I like to move, tap or fidget when sitting',
          subtitle: 'Do you need to move?',
          key: 'bodily-kinesthetic',
          options: agreeOptions,
        },
      },
      {
        type: 'MCQ',
        domain: 'intelligence',
        attribute: 'logical-mathematical',
        metadata: {
          id: 'mi-logical-mathematical-q3',
          icon: 'LayoutGrid',
          questionId: 3,
          tinyText: 'Order',
          smallText: 'Organized work area',
          mediumText:
            'Having a tidy, well-structured workspace helps me think clearly and work more efficiently.',
          largeText: [
            'Can you start work if your desk is a mess? Priya arranges every pen and book before she begins — only then can she truly focus.',
            'When her space is chaotic, her thoughts are too. Could a tidy, structured environment be the key to how you work best?',
          ],
          label: 'Clean Space, Clear Mind',
          title: 'I work best in an organized work area',
          subtitle: 'Do you need order to focus?',
          key: 'logical-mathematical',
          options: agreeOptions,
        },
      },
      {
        type: 'MCQ',
        domain: 'intelligence',
        attribute: 'naturalistic',
        metadata: {
          id: 'mi-naturalistic-q4',
          icon: 'Shell',
          questionId: 4,
          tinyText: 'Collecting',
          smallText: 'Collects natural items',
          mediumText:
            'I enjoy gathering and organizing collections of interesting objects that catch my eye.',
          largeText: [
            'Do you find yourself picking up interesting objects wherever you go? Rohan has boxes of shells, stones, and cards — each one telling its own story.',
            'He loves sorting and comparing his finds, noticing the tiny differences others overlook. Could your collection reveal how you see the world?',
          ],
          label: "Nature's Collector",
          title: 'I have a collection (e.g. shells, mugs, rocks, hockey cards)',
          subtitle: 'Do you love to collect?',
          key: 'naturalistic',
          options: agreeOptions,
        },
      },
      {
        type: 'MCQ',
        domain: 'intelligence',
        attribute: 'interpersonal',
        metadata: {
          id: 'mi-interpersonal-q5',
          icon: 'Users',
          questionId: 5,
          tinyText: 'Collaboration',
          smallText: 'Works best with people',
          mediumText:
            'Collaborating with others brings out my best ideas and keeps me motivated to do my finest work.',
          largeText: [
            "Have you ever had a great idea only after talking it through with someone else? Meera's mind comes alive in conversation — ideas flow when others are around.",
            'Alone, she stares at a blank page. Together, she fills it in minutes. Could collaboration be where your real potential shows?',
          ],
          label: 'Better Together',
          title: 'I work best through interaction with people',
          subtitle: 'Do people spark your best ideas?',
          key: 'interpersonal',
          options: agreeOptions,
        },
      },
      {
        type: 'MCQ',
        domain: 'intelligence',
        attribute: 'linguistic',
        metadata: {
          id: 'mi-linguistic-q6',
          icon: 'Quote',
          questionId: 6,
          tinyText: 'Wordplay',
          smallText: 'Enjoys puns & wordplay',
          mediumText:
            'I love playing with language — puns, double meanings, and clever turns of phrase make me smile.',
          largeText: [
            'Have you ever spotted a pun in a headline and smiled before anyone else noticed? Dev sees double meanings in everyday language — it just comes naturally.',
            'He collects clever phrases and playful expressions the way others collect stamps. Could your love of language be a hidden superpower?',
          ],
          label: 'Language Play',
          title: 'I like puns and other wordplay',
          subtitle: 'Do you love clever wordplay?',
          key: 'linguistic',
          options: agreeOptions,
        },
      },
      {
        type: 'MCQ',
        domain: 'intelligence',
        attribute: 'musical',
        metadata: {
          id: 'mi-musical-q7',
          icon: 'Headphones',
          questionId: 7,
          tinyText: 'Melody',
          smallText: 'Music in my head',
          mediumText:
            'I often have songs or melodies playing in my mind, even when no music is actually on.',
          largeText: [
            'Have you ever caught yourself humming a song you heard hours ago, almost without realising? Ananya always has a melody running through her mind.',
            'For her, silence is never truly silent — there is always a tune. Could your inner soundtrack be telling you something about how you think?',
          ],
          label: 'Inner Soundtrack',
          title: 'I play music in my head',
          subtitle: 'Is there always music playing?',
          key: 'musical',
          options: agreeOptions,
        },
      },
      {
        type: 'MCQ',
        domain: 'intelligence',
        attribute: 'spatial',
        metadata: {
          id: 'mi-spatial-q8',
          icon: 'Palette',
          questionId: 8,
          tinyText: 'Colour',
          smallText: 'Understands colour combos',
          mediumText:
            'I have an intuitive sense of which colours complement each other and can create visually appealing combinations.',
          largeText: [
            'Have you ever glanced at an outfit or a room and instantly known something was off? Kiran sees colour harmony the way musicians hear pitch.',
            'She rearranges colour combinations in her head automatically, without effort. Could your eye for colour be a form of visual intelligence you have been ignoring?',
          ],
          label: 'Colour Awareness',
          title:
            'I understand colour combinations and what colours work well together',
          subtitle: 'Do colours speak to you?',
          key: 'spatial',
          options: agreeOptions,
        },
      },
      {
        type: 'MCQ',
        domain: 'intelligence',
        attribute: 'linguistic',
        metadata: {
          id: 'mi-linguistic-q9',
          icon: 'BookOpen',
          questionId: 9,
          tinyText: 'Expression',
          smallText: 'Comfortable with language',
          mediumText:
            'Working with words and language feels natural to me, and I receive positive feedback when I express myself verbally or in writing.',
          largeText: [
            'Have teachers or friends ever told you that you have a way with words? Arjun always finds the right phrase — writing and speaking feel effortless to him.',
            'He does not struggle to express himself; the words just come. Could language be one of the most natural tools in your personal toolkit?',
          ],
          label: 'Verbal Confidence',
          title:
            'I feel comfortable and get positive reinforcement when dealing with language and words',
          subtitle: 'Do words come naturally to you?',
          key: 'linguistic',
          options: agreeOptions,
        },
      },
      {
        type: 'MCQ',
        domain: 'intelligence',
        attribute: 'spatial',
        metadata: {
          id: 'mi-spatial-q10',
          icon: 'Puzzle',
          questionId: 10,
          tinyText: 'Puzzles',
          smallText: 'Visual puzzle solver',
          mediumText:
            'I get absorbed in jigsaw puzzles, mazes, and other visual challenges that require seeing patterns and spatial relationships.',
          largeText: [
            'Have you ever picked up a jigsaw puzzle and lost two hours without noticing? Rohan cannot walk past a maze or brainteaser without stopping to try.',
            'He sees patterns emerging before the pieces are even in place. Could your love of visual challenges reveal a powerful way you naturally think?',
          ],
          label: 'Visual Problem-Solving',
          title: 'I enjoy solving jigsaw, maze and/or other visual puzzles',
          subtitle: 'Do visual puzzles draw you in?',
          key: 'spatial',
          options: agreeOptions,
        },
      },
      {
        type: 'MCQ',
        domain: 'intelligence',
        attribute: 'naturalistic',
        metadata: {
          id: 'mi-naturalistic-q11',
          icon: 'Flower2',
          questionId: 11,
          tinyText: 'Observation',
          smallText: 'Notices nature patterns',
          mediumText:
            'I naturally spot the differences and similarities between plants, animals, and other elements of the natural world.',
          largeText: [
            "Have you ever noticed which trees change colour first or which flowers bloom at certain times? Priya spots these things instinctively on every walk she takes.",
            "She tells bird species apart by their calls and reads seasons before the calendar changes. Could your eye for nature be a rare and valuable gift?",
          ],
          label: 'Nature Observation',
          title:
            'I notice similarities and differences in trees, flowers and other things in nature',
          subtitle: "Do you see nature's patterns?",
          key: 'naturalistic',
          options: agreeOptions,
        },
      },
      {
        type: 'MCQ',
        domain: 'intelligence',
        attribute: 'intrapersonal',
        metadata: {
          id: 'mi-intrapersonal-q12',
          icon: 'Heart',
          questionId: 12,
          tinyText: 'Self-Awareness',
          smallText: 'Understands own feelings',
          mediumText:
            'I have a clear awareness of my emotions and can usually predict how I will respond in different situations.',
          largeText: [
            'Have you ever known exactly how you would feel before stepping into a difficult situation? Meera can read her own emotions the way others read a weather forecast.',
            'She knows what triggers her and what calms her, well before anything happens. Could this self-knowledge be your secret to navigating life with confidence?',
          ],
          label: 'Emotional Awareness',
          title:
            'I have a good understanding of my feelings and how I will react to situations',
          subtitle: 'Do you know your own feelings?',
          key: 'intrapersonal',
          options: agreeOptions,
        },
      },
      {
        type: 'MCQ',
        domain: 'intelligence',
        attribute: 'interpersonal',
        metadata: {
          id: 'mi-interpersonal-q13',
          icon: 'UserCheck',
          questionId: 13,
          tinyText: 'Depth',
          smallText: 'Few close friends',
          mediumText:
            'I value deep, meaningful friendships with a small circle of people rather than having many acquaintances.',
          largeText: [
            'Have you ever wondered why you prefer one honest conversation over a dozen surface-level ones? Dev has only a handful of close friends — but they know him completely.',
            'He invests deeply in each bond, built over years of shared experiences. Could the quality of your friendships matter more to you than the number?',
          ],
          label: 'Deep Connections',
          title: 'I have a few close friends',
          subtitle: 'Do you prefer a few deep bonds?',
          key: 'interpersonal',
          options: agreeOptions,
        },
      },
      {
        type: 'MCQ',
        domain: 'intelligence',
        attribute: 'interpersonal',
        metadata: {
          id: 'mi-interpersonal-q14',
          icon: 'Trophy',
          questionId: 14,
          tinyText: 'Teamwork',
          smallText: 'Prefers team sports',
          mediumText:
            'I prefer sports where I can work with teammates toward a shared goal rather than competing on my own.',
          largeText: [
            'Have you ever felt that winning alone does not feel as good as winning together? Kiran lives for the team huddle, the shared celebrations, the group effort.',
            'Individual trophies leave her cold — shared victories make her shine. Could the social energy of a team be where you perform your very best?',
          ],
          label: 'Team Player',
          title: 'I enjoy team sports rather than individual sports',
          subtitle: 'Do you thrive as a team?',
          key: 'interpersonal',
          options: agreeOptions,
        },
      },
      {
        type: 'MCQ',
        domain: 'intelligence',
        attribute: 'logical-mathematical',
        metadata: {
          id: 'mi-logical-mathematical-q15',
          icon: 'Calculator',
          questionId: 15,
          tinyText: 'Analysis',
          smallText: 'Enjoys math & science',
          mediumText:
            'I find genuine pleasure in working through mathematical problems and exploring scientific concepts.',
          largeText: [
            'Have you ever felt a quiet thrill when an equation finally balances? Arjun feels it every time — math and science just make sense to him.',
            'He is drawn to the precision of a proven answer. Could logic and evidence be the natural language your mind speaks?',
          ],
          label: 'Analytical Thinking',
          title: 'I enjoy math and/or science',
          subtitle: 'Do numbers and facts excite you?',
          key: 'logical-mathematical',
          options: agreeOptions,
        },
      },
      {
        type: 'MCQ',
        domain: 'intelligence',
        attribute: 'bodily-kinesthetic',
        metadata: {
          id: 'mi-bodily-kinesthetic-q16',
          icon: 'Mountain',
          questionId: 16,
          tinyText: 'Adventure',
          smallText: 'Does extreme sports',
          mediumText:
            'I seek out physically demanding and thrilling activities like rock climbing, kayaking, or caving.',
          largeText: [
            'Have you ever needed to feel your heart pounding just to feel fully alive? Rohan does not watch extreme sports — he seeks them out, craves the rush.',
            'Scaling a rock face or navigating rapids is where he feels completely present. Could physical extremes be where you discover what you are truly made of?',
          ],
          label: 'Physical Adventure',
          title:
            'I participate in extreme sports (e.g. sea kayaking, rock climbing, caving)',
          subtitle: 'Do you crave physical challenge?',
          key: 'bodily-kinesthetic',
          options: agreeOptions,
        },
      },
      {
        type: 'MCQ',
        domain: 'intelligence',
        attribute: 'linguistic',
        metadata: {
          id: 'mi-linguistic-q17',
          icon: 'Grid3x3',
          questionId: 17,
          tinyText: 'Word Games',
          smallText: 'Enjoys word games',
          mediumText:
            'Crosswords, Scrabble, and other word games are among my favourite pastimes.',
          largeText: [
            'Have you ever opened a newspaper and flipped straight to the crossword? Meera cannot resist — word games are the first thing she reaches for in her free time.',
            'Scrabble, crosswords, word searches — she finds them all deeply satisfying. Could your love of word puzzles be pointing to a natural gift with language?',
          ],
          label: 'Word Puzzles',
          title: 'I enjoy completing crosswords and other word games',
          subtitle: 'Do word puzzles pull you in?',
          key: 'linguistic',
          options: agreeOptions,
        },
      },
      {
        type: 'MCQ',
        domain: 'intelligence',
        attribute: 'interpersonal',
        metadata: {
          id: 'mi-interpersonal-q18',
          icon: 'Zap',
          questionId: 18,
          tinyText: 'Social Energy',
          smallText: 'Energized by people',
          mediumText:
            'Social gatherings and time spent with others leave me feeling recharged and inspired rather than drained.',
          largeText: [
            'Have you ever left a gathering feeling more alive than when you arrived? Dev feels recharged after conversations — people energize him in a way nothing else does.',
            'Solitude drains him slowly; people fill him back up. Could social connection be your most reliable source of energy and inspiration?',
          ],
          label: 'Social Energy',
          title: 'Being around people energizes me',
          subtitle: 'Do people fill your energy?',
          key: 'interpersonal',
          options: agreeOptions,
        },
      },
      {
        type: 'MCQ',
        domain: 'intelligence',
        attribute: 'musical',
        metadata: {
          id: 'mi-musical-q19',
          icon: 'Music',
          questionId: 19,
          tinyText: 'Rhythm',
          smallText: 'Follows music beat easily',
          mediumText:
            'I can naturally lock onto the rhythm and beat of any song, tapping along effortlessly.',
          largeText: [
            'Have you ever noticed your foot tapping in perfect time before you even registered the music had started? Kiran locks onto a beat instantly — fast, slow, or complex.',
            "Her body responds to rhythm like a reflex. Could your natural sense of timing be a musical intelligence others simply do not have?",
          ],
          label: 'Rhythmic Sense',
          title: 'It is easy for me to follow the beat of music',
          subtitle: "Do you feel music's rhythm?",
          key: 'musical',
          options: agreeOptions,
        },
      },
      {
        type: 'MCQ',
        domain: 'intelligence',
        attribute: 'intrapersonal',
        metadata: {
          id: 'mi-intrapersonal-q20',
          icon: 'HelpCircle',
          questionId: 20,
          tinyText: 'Inquiry',
          smallText: 'Questions values & beliefs',
          mediumText:
            'I regularly reflect on what I believe and why, questioning assumptions and exploring deeper meaning.',
          largeText: [
            'Have you ever asked why a rule exists or questioned whether a tradition still makes sense? Arjun cannot accept things at face value — he needs to understand why.',
            'For him, questioning is not doubt — it is how he finds real truth. Could your curious, questioning nature be a sign of deep intellectual honesty?',
          ],
          label: 'Philosophical Inquiry',
          title: 'I often raise questions concerning values and beliefs',
          subtitle: 'Do you question what you believe?',
          key: 'intrapersonal',
          options: agreeOptions,
        },
      },
      {
        type: 'MCQ',
        domain: 'intelligence',
        attribute: 'intrapersonal',
        metadata: {
          id: 'mi-intrapersonal-q21',
          icon: 'Shield',
          questionId: 21,
          tinyText: 'Accountability',
          smallText: 'Owns own behaviour',
          mediumText:
            'I recognize that my actions and choices are my own responsibility, and I hold myself accountable.',
          largeText: [
            'Have you ever caught yourself blaming others and then stopped, knowing it was your own choice? Priya takes ownership of her actions — even when it is uncomfortable.',
            'She does not make excuses. She accepts, adjusts, and moves forward. Could this sense of personal responsibility be one of your most powerful qualities?',
          ],
          label: 'Personal Accountability',
          title: 'I understand that I am responsible for my own behavior',
          subtitle: 'Do you own your choices?',
          key: 'intrapersonal',
          options: agreeOptions,
        },
      },
      {
        type: 'MCQ',
        domain: 'intelligence',
        attribute: 'naturalistic',
        metadata: {
          id: 'mi-naturalistic-q22',
          icon: 'TreePine',
          questionId: 22,
          tinyText: 'Stewardship',
          smallText: 'Protects environment actively',
          mediumText:
            'I take real action to protect the environment, whether through recycling, conservation, or community involvement.',
          largeText: [
            'Have you ever felt personally responsible when you saw litter in a park or waste going to landfill? Rohan recycles, conserves water, and joins clean-up events without being asked.',
            'For him, protecting the environment is not a trend — it is a duty. Could your connection to nature be calling you toward something meaningful?',
          ],
          label: 'Environmental Stewardship',
          title: 'I am actively involved in protecting the environment',
          subtitle: 'Do you act for the planet?',
          key: 'naturalistic',
          options: agreeOptions,
        },
      },
      {
        type: 'MCQ',
        domain: 'intelligence',
        attribute: 'spatial',
        metadata: {
          id: 'mi-spatial-q23',
          icon: 'Map',
          questionId: 23,
          tinyText: 'Navigation',
          smallText: 'Reads charts & maps',
          mediumText:
            'I can quickly interpret charts, graphs, and maps, understanding spatial information at a glance.',
          largeText: [
            'Have you ever glanced at a map and immediately known exactly where you were and where to go? Meera reads charts the way others read sentences — quickly and naturally.',
            'She builds mental pictures of spaces and routes almost automatically. Could your ability to read visual information be a powerful and underestimated skill?',
          ],
          label: 'Spatial Literacy',
          title: 'I read charts and maps easily',
          subtitle: 'Do maps make sense to you?',
          key: 'spatial',
          options: agreeOptions,
        },
      },
      {
        type: 'MCQ',
        domain: 'intelligence',
        attribute: 'bodily-kinesthetic',
        metadata: {
          id: 'mi-bodily-kinesthetic-q24',
          icon: 'Hand',
          questionId: 24,
          tinyText: 'Touch',
          smallText: 'Tends to touch objects',
          mediumText:
            'I instinctively reach out to touch things — textures, materials, and surfaces fascinate me.',
          largeText: [
            'Have you ever automatically reached out to feel a texture before your brain even asked why? Dev touches everything — rough bark, smooth glass, soft fabric.',
            'His hands help him understand what his eyes alone cannot. Could your sense of touch be one of the most important ways you experience the world?',
          ],
          label: 'Tactile Curiosity',
          title:
            'I am curious as to how things feel and I tend to touch objects',
          subtitle: 'Do you explore the world by touch?',
          key: 'bodily-kinesthetic',
          options: agreeOptions,
        },
      },
      {
        type: 'MCQ',
        domain: 'intelligence',
        attribute: 'logical-mathematical',
        metadata: {
          id: 'mi-logical-mathematical-q25',
          icon: 'BrainCircuit',
          questionId: 25,
          tinyText: 'Logic',
          smallText: 'Enjoys logical brainteasers',
          mediumText:
            'I love puzzles and games that challenge me to think logically, strategize, and find solutions step by step.',
          largeText: [
            'Have you ever picked up a Sudoku and not looked up until you had solved it completely? Kiran loves the satisfying click of a logic puzzle falling into place.',
            'Brainteasers are not frustrating to her — they are fun. Could your love of logical challenges be pointing to the way your mind most naturally works?',
          ],
          label: 'Logic Games',
          title:
            'I enjoy playing brainteasers and games that involve logical thinking',
          subtitle: 'Do logic puzzles excite you?',
          key: 'logical-mathematical',
          options: agreeOptions,
        },
      },
      {
        type: 'MCQ',
        domain: 'intelligence',
        attribute: 'bodily-kinesthetic',
        metadata: {
          id: 'mi-bodily-kinesthetic-q26',
          icon: 'Dumbbell',
          questionId: 26,
          tinyText: 'Coordination',
          smallText: 'Well coordinated',
          mediumText:
            'My body moves with natural coordination — I pick up physical skills and movements quickly.',
          largeText: [
            'Have you ever been told you make physical tasks look effortless? Arjun catches, balances, and moves with a natural fluency that others spend years trying to learn.',
            'His body knows where it is in space and adjusts instinctively. Could physical coordination be one of your most underappreciated natural abilities?',
          ],
          label: 'Physical Coordination',
          title: 'I am well coordinated',
          subtitle: 'Does your body move with ease?',
          key: 'bodily-kinesthetic',
          options: agreeOptions,
        },
      },
      {
        type: 'MCQ',
        domain: 'intelligence',
        attribute: 'intrapersonal',
        metadata: {
          id: 'mi-intrapersonal-q27',
          icon: 'Timer',
          questionId: 27,
          tinyText: 'Autonomy',
          smallText: 'Works best self-paced',
          mediumText:
            'I do my best work when I can set my own pace rather than being rushed or held back by others.',
          largeText: [
            'Have you ever worked best the moment someone stopped setting your schedule? Priya dives deep when inspired and rests when she needs to — entirely on her own terms.',
            'Rigid timetables stifle her; freedom unlocks her best thinking. Could self-direction be the key that lets you work at your full potential?',
          ],
          label: 'Self-Directed Learning',
          title: 'I work best when the activity is self-paced',
          subtitle: 'Do you thrive at your own pace?',
          key: 'intrapersonal',
          options: agreeOptions,
        },
      },
      {
        type: 'MCQ',
        domain: 'intelligence',
        attribute: 'logical-mathematical',
        metadata: {
          id: 'mi-logical-mathematical-q28',
          icon: 'FileCheck',
          questionId: 28,
          tinyText: 'Precision',
          smallText: 'Exact verbal memory',
          mediumText:
            'I have a strong ability to recall information precisely as it was communicated to me.',
          largeText: [
            'Have you ever been able to repeat a conversation almost word for word long after it happened? Rohan remembers instructions, phrases, and details with unusual accuracy.',
            'His memory does not just capture the gist — it holds the exact words. Could this precise recall be a form of intelligence you have been taking for granted?',
          ],
          label: 'Precise Recall',
          title: 'I remember things exactly as they are said to me',
          subtitle: 'Do you recall words precisely?',
          key: 'logical-mathematical',
          options: agreeOptions,
        },
      },
      {
        type: 'MCQ',
        domain: 'intelligence',
        attribute: 'musical',
        metadata: {
          id: 'mi-musical-q29',
          icon: 'Mic',
          questionId: 29,
          tinyText: 'Composition',
          smallText: 'Sets poems to music',
          mediumText:
            'I enjoy combining words with melody, creating musical versions of poems and songs.',
          largeText: [
            'Have you ever read a poem and immediately heard a melody forming in your mind? Meera cannot help it — words and music naturally come together for her.',
            'She has set favourite lines to tunes nobody else would think of. Could the way you hear language as music be a rare creative gift?',
          ],
          label: 'Musical Composition',
          title: 'I like setting songs and poems to music',
          subtitle: 'Do words inspire melodies in you?',
          key: 'musical',
          options: agreeOptions,
        },
      },
      {
        type: 'MCQ',
        domain: 'intelligence',
        attribute: 'naturalistic',
        metadata: {
          id: 'mi-naturalistic-q30',
          icon: 'Search',
          questionId: 30,
          tinyText: 'Discovery',
          smallText: 'Discovers artifacts & relics',
          mediumText:
            'I love the thrill of digging, exploring, and uncovering unusual or interesting items from the ground.',
          largeText: [
            'Have you ever felt your heart race at the sight of something partially buried or hidden from plain view? Dev digs, searches, and uncovers things others simply walk past.',
            'Each find holds a story — an old coin, a strange fossil, a forgotten relic. Could your sense of discovery reveal a deep curiosity about how the world came to be?',
          ],
          label: 'Discovery & Exploration',
          title:
            'I enjoy digging for and discovering artifacts and unusual items',
          subtitle: 'Do you love finding hidden things?',
          key: 'naturalistic',
          options: agreeOptions,
        },
      },
      {
        type: 'MCQ',
        domain: 'intelligence',
        attribute: 'interpersonal',
        metadata: {
          id: 'mi-interpersonal-q31',
          icon: 'UsersRound',
          questionId: 31,
          tinyText: 'Community',
          smallText: 'Prefers group activities',
          mediumText:
            'I find group activities more enjoyable and motivating than doing things on my own.',
          largeText: [
            'Have you ever chosen the group option without even stopping to consider doing it alone? Kiran comes alive when she is part of something shared.',
            'The collective energy, the laughter, the shared goal — it all motivates her in a way solitude cannot. Could groups be where you naturally perform at your very best?',
          ],
          label: 'Group Preference',
          title: 'I prefer group activities rather than ones I do alone',
          subtitle: 'Do groups bring out your best?',
          key: 'interpersonal',
          options: agreeOptions,
        },
      },
      {
        type: 'MCQ',
        domain: 'intelligence',
        attribute: 'spatial',
        metadata: {
          id: 'mi-spatial-q32',
          icon: 'Compass',
          questionId: 32,
          tinyText: 'Direction',
          smallText: 'Good sense of direction',
          mediumText:
            'I rarely get lost and can navigate to places I have been before with ease, even without a map.',
          largeText: [
            'Have you ever been somewhere once and returned weeks later without needing a map? Arjun builds a mental map of every place he visits, almost automatically.',
            'Friends count on him to lead the way — even in unfamiliar territory. Could your inner compass be a form of spatial intelligence others quietly wish they had?',
          ],
          label: 'Navigation Skills',
          title: 'I have a good sense of direction',
          subtitle: 'Do you always know where you are?',
          key: 'spatial',
          options: agreeOptions,
        },
      },
      {
        type: 'MCQ',
        domain: 'intelligence',
        attribute: 'linguistic',
        metadata: {
          id: 'mi-linguistic-q33',
          icon: 'MessageSquare',
          questionId: 33,
          tinyText: 'Debate',
          smallText: 'Enjoys debates & discussion',
          mediumText:
            "I thrive in debates and discussions where I can articulate my views and engage with others\u2019 ideas.",
          largeText: [
            'Have you ever felt most alive in the middle of a heated, respectful debate? Priya thrives in these moments — the sharper the argument, the better she thinks.',
            'She does not debate to win — she debates to understand. Could your love of discussion be a natural strength in communication and critical thinking?',
          ],
          label: 'Verbal Debate',
          title: 'I like to take part in debates and/or discussions',
          subtitle: 'Do you love a good debate?',
          key: 'linguistic',
          options: agreeOptions,
        },
      },
      {
        type: 'MCQ',
        domain: 'intelligence',
        attribute: 'musical',
        metadata: {
          id: 'mi-musical-q34',
          icon: 'Drum',
          questionId: 34,
          tinyText: 'Timekeeping',
          smallText: 'Keeps time with music',
          mediumText:
            'Whenever music plays, I naturally keep time — clapping, tapping, or moving in rhythm.',
          largeText: [
            'Have you ever noticed your foot tapping in perfect time before you even registered the music had started? Rohan keeps time instinctively — it is almost impossible for him not to.',
            'Whether the rhythm is simple or syncopated, he stays locked in effortlessly. Could your natural timekeeping be a musical ability that goes deeper than you realise?',
          ],
          label: 'Timekeeping',
          title: 'I keep time when music is playing',
          subtitle: 'Do you naturally keep the beat?',
          key: 'musical',
          options: agreeOptions,
        },
      },
      {
        type: 'MCQ',
        domain: 'intelligence',
        attribute: 'spatial',
        metadata: {
          id: 'mi-spatial-q35',
          icon: 'Film',
          questionId: 35,
          tinyText: 'Visuals',
          smallText: 'Notices movie scenes',
          mediumText:
            'I pay close attention to the visual details in movies — the cinematography, set design, and scene composition.',
          largeText: [
            'Have you ever rewound a movie scene just to appreciate the lighting or the way a shot was framed? Meera watches films differently — she notices what the camera is doing.',
            'The composition, the colours, the visual storytelling — she sees it all. Could your eye for visual detail mean you experience film on a completely different level?',
          ],
          label: 'Visual Appreciation',
          title: 'I like to watch the scenes and activities in movies',
          subtitle: "Do you notice a film's visual details?",
          key: 'spatial',
          options: agreeOptions,
        },
      },
      {
        type: 'MCQ',
        domain: 'intelligence',
        attribute: 'logical-mathematical',
        metadata: {
          id: 'mi-logical-mathematical-q36',
          icon: 'CircleHelp',
          questionId: 36,
          tinyText: 'Curiosity',
          smallText: 'Asks why & seeks clarity',
          mediumText:
            'I am driven to understand the reasons behind things and seek clear, thorough explanations.',
          largeText: [
            'Have you ever felt unsatisfied until someone properly explained the reason behind something? Dev cannot move forward without understanding why — surface answers are never enough.',
            'He asks questions that cut to the core, not to annoy, but to truly understand. Could your need for clarity be one of your sharpest intellectual tools?',
          ],
          label: 'Questioning Mind',
          title:
            'I like to ask "why" questions and seek clarification of issues and concerns',
          subtitle: 'Do you always need to know why?',
          key: 'logical-mathematical',
          options: agreeOptions,
        },
      },
      {
        type: 'MCQ',
        domain: 'intelligence',
        attribute: 'bodily-kinesthetic',
        metadata: {
          id: 'mi-bodily-kinesthetic-q37',
          icon: 'Wrench',
          questionId: 37,
          tinyText: 'Crafting',
          smallText: 'Likes working hands-on',
          mediumText:
            'I find deep satisfaction in hands-on work — building, fixing, crafting, and making things.',
          largeText: [
            'Have you ever understood something properly only after you built or took it apart yourself? Kiran learns by doing — her hands are her best thinking tool.',
            'The satisfaction of creating something real and tangible is what drives her. Could working with your hands be the most natural way you learn and express yourself?',
          ],
          label: 'Hands-On Work',
          title: 'I like working with my hands',
          subtitle: 'Do you love building and making?',
          key: 'bodily-kinesthetic',
          options: agreeOptions,
        },
      },
      {
        type: 'MCQ',
        domain: 'intelligence',
        attribute: 'interpersonal',
        metadata: {
          id: 'mi-interpersonal-q38',
          icon: 'Globe',
          questionId: 38,
          tinyText: 'Culture',
          smallText: 'Curious about cultures',
          mediumText:
            'I am fascinated by the customs, traditions, and ways of life of people from different backgrounds.',
          largeText: [
            'Have you ever felt genuinely drawn to understanding how people in other parts of the world live and what they value? Arjun seeks out those conversations everywhere he goes.',
            'Food, music, customs, stories — every culture offers him something new to appreciate. Could your fascination with human diversity be pointing to a deeply empathetic way of seeing the world?',
          ],
          label: 'Cultural Curiosity',
          title: 'I enjoy learning about different cultures',
          subtitle: 'Does cultural diversity fascinate you?',
          key: 'interpersonal',
          options: agreeOptions,
        },
      },
      {
        type: 'MCQ',
        domain: 'intelligence',
        attribute: 'intrapersonal',
        metadata: {
          id: 'mi-intrapersonal-q39',
          icon: 'Anchor',
          questionId: 39,
          tinyText: 'Independence',
          smallText: 'Not easily influenced',
          mediumText:
            'I form my own opinions and hold to my convictions rather than following the crowd.',
          largeText: [
            'Have you ever stayed firm in a belief while everyone around you pushed in a different direction? Priya listens to others, but makes up her own mind — every time.',
            'Peer pressure does not move her. She would rather stand alone in a well-considered belief than follow the crowd. Could your independence of thought be one of your defining strengths?',
          ],
          label: 'Independent Thinking',
          title: 'I am not easily influenced by other people',
          subtitle: 'Do you hold your own ground?',
          key: 'intrapersonal',
          options: agreeOptions,
        },
      },
      {
        type: 'MCQ',
        domain: 'intelligence',
        attribute: 'naturalistic',
        metadata: {
          id: 'mi-naturalistic-q40',
          icon: 'Sun',
          questionId: 40,
          tinyText: 'Nature',
          smallText: 'Prefers outdoors',
          mediumText:
            'Given the choice, I would rather spend my time outside in nature than inside a building.',
          largeText: [
            'Have you ever felt a shift the moment you stepped outside — like something in you exhaled? Rohan cannot stay indoors long before he grows restless and unsettled.',
            'Fresh air and open sky restore him in ways no room ever could. Could your pull toward the outdoors be telling you where you truly belong?',
          ],
          label: 'Outdoor Preference',
          title: 'I prefer to be outdoors rather than indoors',
          subtitle: 'Does the outdoors call to you?',
          key: 'naturalistic',
          options: agreeOptions,
        },
      },
      {
        type: 'MCQ',
        domain: 'intelligence',
        attribute: 'logical-mathematical',
        metadata: {
          id: 'mi-logical-mathematical-q41',
          icon: 'CalendarDays',
          questionId: 41,
          tinyText: 'Structure',
          smallText: 'Works best with schedule',
          mediumText:
            'Having a clear plan, timetable, or day planner helps me stay on track and be productive.',
          largeText: [
            'Have you ever felt scattered until you sat down and mapped out exactly what needed to happen? Meera swears by her planner — it is how she works best.',
            'Without a schedule, she drifts. With one, she is unstoppable. Could structure and planning be the foundation that makes everything else work?',
          ],
          label: 'Structured Planning',
          title: 'I work best when I have a day planner or timetable',
          subtitle: 'Does a schedule keep you focused?',
          key: 'logical-mathematical',
          options: agreeOptions,
        },
      },
      {
        type: 'MCQ',
        domain: 'intelligence',
        attribute: 'linguistic',
        metadata: {
          id: 'mi-linguistic-q42',
          icon: 'Moon',
          questionId: 42,
          tinyText: 'Dreams',
          smallText: 'Has vivid dreams',
          mediumText:
            'My dreams are rich, detailed, and memorable — I often recall them vividly when I wake up.',
          largeText: [
            'Have you ever woken from a dream so vivid and detailed it felt like you had actually lived it? Dev remembers his dreams in striking colour and full story arcs.',
            'Characters, dialogue, whole worlds — his sleeping mind creates them all. Could your rich inner dream life be a sign of a deeply imaginative and creative mind?',
          ],
          label: 'Dream Vividness',
          title: 'I have vivid dreams when sleeping',
          subtitle: 'Do you wake remembering your dreams?',
          key: 'linguistic',
          options: agreeOptions,
        },
      },
      {
        type: 'MCQ',
        domain: 'intelligence',
        attribute: 'linguistic',
        metadata: {
          id: 'mi-linguistic-q43',
          icon: 'PenLine',
          questionId: 43,
          tinyText: 'Writing',
          smallText: 'Prefers written responses',
          mediumText:
            'I prefer expressing my thoughts through written answers where I can develop and refine my ideas.',
          largeText: [
            'Do you always feel a multiple-choice test cannot capture what you truly know? Kiran reaches for a pen every time — it is where she expresses herself most honestly.',
            'A blank page lets her show the full depth of her thinking. Could written expression be your most honest and revealing form of communication?',
          ],
          label: 'Written Expression',
          title:
            'I prefer writing long- and short-answer responses rather than multiple-choice responses',
          subtitle: 'Do you prefer writing over ticking boxes?',
          key: 'linguistic',
          options: agreeOptions,
        },
      },
      {
        type: 'MCQ',
        domain: 'intelligence',
        attribute: 'naturalistic',
        metadata: {
          id: 'mi-naturalistic-q44',
          icon: 'Sprout',
          questionId: 44,
          tinyText: 'Gardening',
          smallText: 'Enjoys gardening',
          mediumText:
            'I find peace and satisfaction in planting, tending, and watching a garden grow.',
          largeText: [
            'Have you ever felt a quiet joy from watching something you planted finally push through the soil? Arjun tends his garden every morning — it is where he finds real calm.',
            'Watering, pruning, watching things grow — each small act connects him to something larger. Could caring for a garden be one of the most grounding things you can do?',
          ],
          label: 'Gardening',
          title: 'I like planting and caring for a garden',
          subtitle: 'Does nurturing a garden bring peace?',
          key: 'naturalistic',
          options: agreeOptions,
        },
      },
      {
        type: 'MCQ',
        domain: 'intelligence',
        attribute: 'musical',
        metadata: {
          id: 'mi-musical-q45',
          icon: 'Ear',
          questionId: 45,
          tinyText: 'Pitch',
          smallText: 'Hears off-key notes',
          mediumText:
            'I can instantly detect when a note is off-key or when an instrument is out of tune.',
          largeText: [
            "Have you ever cringed at a slightly flat note that nobody else in the room seemed to notice? Priya's ears catch pitch errors the moment they happen.",
            'She cannot unhear a wrong note once she has heard it. Could this sensitivity to pitch mean your ear is far more finely tuned than most?',
          ],
          label: 'Pitch Sensitivity',
          title: 'I can hear an off-key note',
          subtitle: 'Do wrong notes bother you?',
          key: 'musical',
          options: agreeOptions,
        },
      },
      {
        type: 'MCQ',
        domain: 'intelligence',
        attribute: 'interpersonal',
        metadata: {
          id: 'mi-interpersonal-q46',
          icon: 'MessageCircle',
          questionId: 46,
          tinyText: 'Sharing',
          smallText: 'Talks problems with friends',
          mediumText:
            'When something is troubling me, my instinct is to talk it through with a trusted friend.',
          largeText: [
            'Have you ever found that a problem solved itself the moment you talked it through? Rohan always reaches for his phone when something heavy is weighing on him.',
            'Talking it out brings him a clarity that no solo thinking ever could. Could conversation be your most powerful and natural problem-solving tool?',
          ],
          label: 'Social Processing',
          title: 'I usually talk over my personal problems with a friend',
          subtitle: 'Do you process problems by talking?',
          key: 'interpersonal',
          options: agreeOptions,
        },
      },
      {
        type: 'MCQ',
        domain: 'intelligence',
        attribute: 'intrapersonal',
        metadata: {
          id: 'mi-intrapersonal-q47',
          icon: 'Lightbulb',
          questionId: 47,
          tinyText: 'Abstraction',
          smallText: 'Thinks in abstractions',
          mediumText:
            'I enjoy exploring abstract ideas and concepts that go beyond the concrete and tangible.',
          largeText: [
            "Have you ever found yourself more interested in 'what is consciousness?' than in today's to-do list? Meera is drawn to ideas that cannot be seen or touched.",
            'Infinity, justice, the nature of time — she could think about these for hours. Could abstract thinking be the sign of a mind that naturally operates at a deeper level?',
          ],
          label: 'Abstract Thinking',
          title: 'I like to think about abstract concepts',
          subtitle: 'Do abstract ideas pull you in?',
          key: 'intrapersonal',
          options: agreeOptions,
        },
      },
      {
        type: 'MCQ',
        domain: 'intelligence',
        attribute: 'bodily-kinesthetic',
        metadata: {
          id: 'mi-bodily-kinesthetic-q48',
          icon: 'PersonStanding',
          questionId: 48,
          tinyText: 'Action',
          smallText: 'Prefers physical involvement',
          mediumText:
            'I would rather be physically doing something than sitting on the sidelines watching.',
          largeText: [
            'Have you ever sat on the sidelines of something and felt genuinely restless — frustrated that you were watching instead of doing? Dev always finds a way to get in.',
            'Passive observation drains him; active participation brings him to life. Could your need to be physically involved be the most honest signal about how you learn and thrive?',
          ],
          label: 'Active Participation',
          title:
            'I prefer to be physically involved rather than sitting and watching',
          subtitle: 'Do you need to do, not watch?',
          key: 'bodily-kinesthetic',
          options: agreeOptions,
        },
      },
      {
        type: 'MCQ',
        domain: 'intelligence',
        attribute: 'musical',
        metadata: {
          id: 'mi-musical-q49',
          icon: 'Music2',
          questionId: 49,
          tinyText: 'Musicality',
          smallText: 'Engages easily in music',
          mediumText:
            'Musical activities — singing, playing, or performing — come naturally and joyfully to me.',
          largeText: [
            'Have you ever picked up an instrument or joined a song and found it came far more naturally than you expected? Kiran steps into musical activities without hesitation.',
            'Singing, playing, performing — it all feels effortless and joyful to her. Could your ease with music be pointing to a natural ability you have not fully explored?',
          ],
          label: 'Musical Ease',
          title: 'I find it easy to engage in musical activities',
          subtitle: 'Does music come naturally to you?',
          key: 'musical',
          options: agreeOptions,
        },
      },
      {
        type: 'MCQ',
        domain: 'intelligence',
        attribute: 'bodily-kinesthetic',
        metadata: {
          id: 'mi-bodily-kinesthetic-q50',
          icon: 'Fingerprint',
          questionId: 50,
          tinyText: 'Kinesthetics',
          smallText: 'Learns by doing',
          mediumText:
            'I understand and remember things best when I can physically interact with them — touching, moving, and experimenting.',
          largeText: [
            'Have you ever read a manual, understood nothing, then figured it out the moment you tried it yourself? Arjun does not learn by listening — he learns by doing.',
            'His hands and body cement knowledge in a way words never can. Could physical interaction with the world be your most powerful learning method?',
          ],
          label: 'Kinesthetic Learning',
          title:
            'I understand best by doing (e.g. touching, moving and interacting)',
          subtitle: 'Do you learn best by doing?',
          key: 'bodily-kinesthetic',
          options: agreeOptions,
        },
      },
      {
        type: 'MCQ',
        domain: 'intelligence',
        attribute: 'musical',
        metadata: {
          id: 'mi-musical-q51',
          icon: 'Music4',
          questionId: 51,
          tinyText: 'Reflection',
          smallText: 'Questions values & beliefs',
          mediumText:
            'Through music and artistic expression, I explore deep questions about values, meaning, and beliefs.',
          largeText: [
            'Have you ever heard a song that made you stop and question something you had always believed? Priya finds that music opens doors to questions she has never dared ask before.',
            'A lyric or a melody can shake something loose in her — something deep. Could music be the lens through which you explore your most important values and beliefs?',
          ],
          label: 'Musical Reflection',
          title: 'Music often prompts questions concerning values and beliefs',
          subtitle: 'Does music make you reflect deeply?',
          key: 'musical',
          options: agreeOptions,
        },
      },
      {
        type: 'MCQ',
        domain: 'intelligence',
        attribute: 'logical-mathematical',
        metadata: {
          id: 'mi-logical-mathematical-q52',
          icon: 'GitBranch',
          questionId: 52,
          tinyText: 'Causality',
          smallText: 'Grasps cause & effect',
          mediumText:
            'I quickly understand how one event leads to another and can trace chains of cause and effect with ease.',
          largeText: [
            'Have you ever watched something happen and immediately understood exactly what caused it and what would follow? Rohan traces cause and effect the way others follow a map.',
            'His mind connects the dots between actions and outcomes almost automatically. Could this causal reasoning be a form of systematic intelligence you rely on every single day?',
          ],
          label: 'Causal Reasoning',
          title: 'I quickly grasp cause and effect relationships',
          subtitle: 'Do you see how things connect?',
          key: 'logical-mathematical',
          options: agreeOptions,
        },
      },
      {
        type: 'MCQ',
        domain: 'intelligence',
        attribute: 'logical-mathematical',
        metadata: {
          id: 'mi-logical-mathematical-q53',
          icon: 'Target',
          questionId: 53,
          tinyText: 'Strategy',
          smallText: 'Anticipates game outcomes',
          mediumText:
            'I can think several moves ahead in games and anticipate the consequences of different strategies.',
          largeText: [
            'Have you ever known what your opponent was going to do before they did it? Meera plays chess, hockey, and strategy games with an instinctive feel for what comes next.',
            'She plans several moves ahead without even consciously trying. Could your ability to anticipate outcomes be a strategic mind waiting to be put to its full use?',
          ],
          label: 'Strategic Foresight',
          title:
            'I can anticipate the moves and consequences in a game plan (e.g. hockey sense, chess sense)',
          subtitle: 'Do you think several moves ahead?',
          key: 'logical-mathematical',
          options: agreeOptions,
        },
      },
      {
        type: 'MCQ',
        domain: 'intelligence',
        attribute: 'linguistic',
        metadata: {
          id: 'mi-linguistic-q54',
          icon: 'NotebookPen',
          questionId: 54,
          tinyText: 'Journaling',
          smallText: 'Enjoys journaling & writing',
          mediumText:
            'I find fulfillment in writing — whether keeping a journal, crafting stories, or composing articles.',
          largeText: [
            'Have you ever made sense of something difficult just by writing it down? Dev keeps a journal not because he has to, but because writing is how he thinks.',
            'It is how he processes emotions, tracks growth, and understands himself. Could the written word be your most natural form of self-expression?',
          ],
          label: 'Creative Writing',
          title:
            'I enjoy keeping a written journal and/or writing stories and articles',
          subtitle: 'Do you find yourself through writing?',
          key: 'linguistic',
          options: agreeOptions,
        },
      },
      {
        type: 'MCQ',
        domain: 'intelligence',
        attribute: 'spatial',
        metadata: {
          id: 'mi-spatial-q55',
          icon: 'Fish',
          questionId: 55,
          tinyText: 'Tracking',
          smallText: 'Enjoys fishing & tracking',
          mediumText:
            'I enjoy outdoor pursuits like fishing and tracking that require patience, observation, and spatial awareness.',
          largeText: [
            'Have you ever followed an animal track through the woods or read the water to find where the fish were hiding? Kiran is drawn to these slow, careful pursuits.',
            'She reads the land and water the way others read a book — naturally and with precision. Could your ability to read natural signs be a form of spatial and environmental intelligence?',
          ],
          label: 'Outdoor Pursuits',
          title: 'I enjoy fishing and tracking',
          subtitle: "Do nature's signs speak to you?",
          key: 'spatial',
          options: agreeOptions,
        },
      },
      {
        type: 'MCQ',
        domain: 'intelligence',
        attribute: 'interpersonal',
        metadata: {
          id: 'mi-interpersonal-q56',
          icon: 'Share2',
          questionId: 56,
          tinyText: 'Openness',
          smallText: 'Shares ideas & feelings',
          mediumText:
            'I enjoy opening up to others, sharing my ideas and feelings to build deeper connections.',
          largeText: [
            'Have you ever felt closer to someone simply because you shared something honest with them? Arjun does not hold back — sharing honestly is just how he connects with people.',
            'For him, honest sharing is the foundation of every meaningful relationship. Could your openness be the quality that creates the deepest connections in your life?',
          ],
          label: 'Open Sharing',
          title: 'I enjoy sharing my ideas and feelings with others',
          subtitle: 'Do you open up easily with others?',
          key: 'interpersonal',
          options: agreeOptions,
        },
      },
      {
        type: 'MCQ',
        domain: 'intelligence',
        attribute: 'bodily-kinesthetic',
        metadata: {
          id: 'mi-bodily-kinesthetic-q57',
          icon: 'Scissors',
          questionId: 57,
          tinyText: 'Making',
          smallText: 'Creates with hands',
          mediumText:
            'I love the process of making things with my hands — crafting, sculpting, building, or assembling.',
          largeText: [
            'Have you ever felt a special pride in something you made yourself — knowing your own hands built it from nothing? Priya crafts, builds, and makes with genuine joy.',
            'The making is as satisfying as the finished result for her. Could creating with your hands be one of the most honest expressions of who you are?',
          ],
          label: 'Creative Making',
          title: 'I enjoy creating things with my hands',
          subtitle: 'Do you love making things by hand?',
          key: 'bodily-kinesthetic',
          options: agreeOptions,
        },
      },
      {
        type: 'MCQ',
        domain: 'intelligence',
        attribute: 'linguistic',
        metadata: {
          id: 'mi-linguistic-q58',
          icon: 'Book',
          questionId: 58,
          tinyText: 'Reading',
          smallText: 'Loves reading',
          mediumText:
            'Reading is one of my favourite activities — I can lose myself in a good book for hours.',
          largeText: [
            'Have you ever picked up a book meaning to read one chapter and looked up two hours later, completely absorbed? Rohan reads everywhere — on buses, at lunch, before bed.',
            'Books are his companions, his teachers, his escape. Could your love of reading be one of the most valuable habits you have quietly built over a lifetime?',
          ],
          label: 'Avid Reader',
          title: 'I like to read a lot',
          subtitle: 'Do books pull you in for hours?',
          key: 'linguistic',
          options: agreeOptions,
        },
      },
      {
        type: 'MCQ',
        domain: 'intelligence',
        attribute: 'musical',
        metadata: {
          id: 'mi-musical-q59',
          icon: 'Award',
          questionId: 59,
          tinyText: 'Pride',
          smallText: 'Proud of music skills',
          mediumText:
            'I take pride in my musical abilities and the accomplishments I have achieved through music.',
          largeText: [
            'Have you ever performed something musical and felt a quiet, deep pride in what you had worked hard to achieve? Meera holds every musical milestone close to her heart.',
            'Each achievement represents hours of practice and genuine love for music. Could your musical accomplishments be among the things that most truly define who you are?',
          ],
          label: 'Musical Pride',
          title: 'I feel proud of my musical accomplishments',
          subtitle: 'Are you proud of your music?',
          key: 'musical',
          options: agreeOptions,
        },
      },
      {
        type: 'MCQ',
        domain: 'intelligence',
        attribute: 'naturalistic',
        metadata: {
          id: 'mi-naturalistic-q60',
          icon: 'Binoculars',
          questionId: 60,
          tinyText: 'Field Learning',
          smallText: 'Learns best outdoors',
          mediumText:
            'I retain information best when I can learn through hands-on exploration of nature, museums, and the outdoors.',
          largeText: [
            'Have you ever truly understood something only after you went and saw it for yourself? Dev learns through field trips, nature walks, and real-world exploration — not from textbooks alone.',
            'Museums, nature reserves, and open fields are his real classrooms. Could experiential, hands-on learning be the method that finally makes knowledge stick for you?',
          ],
          label: 'Experiential Learning',
          title:
            'I learn best when I can go on field trips to explore and observe nature exhibits, museums, or the outdoors',
          subtitle: 'Do you learn best outside?',
          key: 'naturalistic',
          options: agreeOptions,
        },
      },
      {
        type: 'MCQ',
        domain: 'intelligence',
        attribute: 'spatial',
        metadata: {
          id: 'mi-spatial-q61',
          icon: 'Ruler',
          questionId: 61,
          tinyText: 'Estimation',
          smallText: 'Good at estimating',
          mediumText:
            'I can accurately estimate distances, sizes, and quantities without needing to measure.',
          largeText: [
            'Have you ever guessed a distance or a weight and been remarkably close without measuring anything? Kiran trusts her instincts about sizes, distances, and quantities completely.',
            'She rarely needs a ruler — her eye does the job accurately. Could your natural ability to estimate be an underappreciated form of spatial intelligence?',
          ],
          label: 'Spatial Estimation',
          title: 'I am good at estimating',
          subtitle: 'Do you judge distances accurately?',
          key: 'spatial',
          options: agreeOptions,
        },
      },
      {
        type: 'MCQ',
        domain: 'intelligence',
        attribute: 'naturalistic',
        metadata: {
          id: 'mi-naturalistic-q62',
          icon: 'CircleDot',
          questionId: 62,
          tinyText: 'Co-operation',
          smallText: 'Thrives in group discussion',
          mediumText:
            'I do my best thinking and problem-solving when I can discuss issues collaboratively with a group.',
          largeText: [
            'Have you ever had a breakthrough idea that only emerged because someone else in the group sparked it? Arjun does his best thinking in collaborative discussions.',
            'He brings ideas, listens carefully, and builds on what others share — and the results surprise even him. Could group discussion be where your best thinking actually lives?',
          ],
          label: 'Collaborative Discussion',
          title:
            'I work best in a co-operative group where I can discuss issues with others',
          subtitle: 'Do you think best with a group?',
          key: 'naturalistic',
          options: agreeOptions,
        },
      },
      {
        type: 'MCQ',
        domain: 'intelligence',
        attribute: 'intrapersonal',
        metadata: {
          id: 'mi-intrapersonal-q63',
          icon: 'Telescope',
          questionId: 63,
          tinyText: 'Contemplation',
          smallText: 'Ponders universal questions',
          mediumText:
            "I enjoy stepping back to think about the big picture — life's meaning, the universe, and the grand questions.",
          largeText: [
            'Have you ever lost track of time wondering about the nature of the universe or what it means to be human? Priya lives for questions with no easy answers.',
            'While others focus on the immediate, she zooms out to the infinite. Could your love of big questions be a sign of a deeply philosophical mind?',
          ],
          label: 'Big-Picture Thinking',
          title:
            'I enjoy contemplating the big picture and universal questions',
          subtitle: 'Do big questions fascinate you?',
          key: 'intrapersonal',
          options: agreeOptions,
        },
      },
      {
        type: 'MCQ',
        domain: 'intelligence',
        attribute: 'spatial',
        metadata: {
          id: 'mi-spatial-q64',
          icon: 'Eye',
          questionId: 64,
          tinyText: 'Visual Memory',
          smallText: 'Visual memory learner',
          mediumText:
            'I remember information best when I have seen it — images, diagrams, and visual cues stick in my mind.',
          largeText: [
            "Have you ever recalled a page of notes so clearly that you could almost picture exactly where on the page a key fact was written? Rohan's memory is deeply visual.",
            'He sees information in his mind before he can say it out loud. Could visual memory be the way you learn most efficiently and retain knowledge most reliably?',
          ],
          label: 'Visual Memory',
          title: 'I remember things best by seeing them',
          subtitle: 'Do you remember what you see?',
          key: 'spatial',
          options: agreeOptions,
        },
      },
    ];

    // Shuffle activities into random display order
    const shuffled = [...activities];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    // Bulk insert all activities with order field in metadata
    for (let i = 0; i < shuffled.length; i++) {
      const activity = shuffled[i];
      const metadata = { ...activity.metadata, order: i + 1 };
      await queryRunner.query(
        `INSERT INTO "activities" ("assessmentId", "type", "domain", "attribute", "metadata")
         VALUES ($1, $2, $3, $4, $5)`,
        [
          assessmentId,
          activity.type,
          activity.domain,
          activity.attribute,
          JSON.stringify(metadata),
        ],
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Find the Baseline assessment
    const result = await queryRunner.query(
      `SELECT id FROM "assessments" WHERE "name" = 'Baseline'`,
    );

    if (result && result.length > 0) {
      const assessmentId = result[0].id;

      // Remove all activities associated with this assessment
      await queryRunner.query(
        `DELETE FROM "activities" WHERE "assessmentId" = $1 AND "domain" = $2`,
        [assessmentId, 'intelligence'],
      );
    }
  }
}
