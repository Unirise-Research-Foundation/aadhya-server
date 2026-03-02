import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedPhysicalActivities1768500400000 implements MigrationInterface {
  name = 'SeedPhysicalActivities1768500400000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Find the Physical assessment
    const result = await queryRunner.query(
      `SELECT id FROM "assessments" WHERE "name" = 'Physical'`,
    );

    if (!result || result.length === 0) {
      throw new Error('Physical assessment not found');
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
      // ── VISION (q1–q9) ──────────────────────────────────────────────────────
      {
        type: 'MCQ',
        domain: 'physical',
        attribute: 'vision',
        metadata: {
          id: 'pa-vision-q1',
          icon: 'Eye',
          questionId: 1,
          tinyText: 'Distance',
          smallText: 'Clear far-away sight',
          mediumText:
            'I can comfortably read text, signs, and faces from a distance without difficulty.',
          largeText: [
            'Have you ever been able to read a board from the back of the room while others squinted? Priya reads road signs well before anyone else in the car can make them out.',
            'Her distance vision is sharp and effortless — the world is clear from near and far. Could your ability to see clearly at a distance be something you take for granted?',
          ],
          label: 'Distance Vision',
          title: 'I can easily read signs and text from a distance',
          subtitle: 'Is your distance vision clear?',
          key: 'vision',
          options: agreeOptions,
        },
      },
      {
        type: 'MCQ',
        domain: 'physical',
        attribute: 'vision',
        metadata: {
          id: 'pa-vision-q2',
          icon: 'Palette',
          questionId: 2,
          tinyText: 'Colour',
          smallText: 'Tells colours apart easily',
          mediumText:
            'I can clearly distinguish between different colours and shades without confusion.',
          largeText: [
            'Have you ever picked out the exact shade of green in a painting that others simply called "green"? Arjun sees the world in its full spectrum of colour, noticing nuances others overlook.',
            'Traffic lights, maps, clothing — colour gives him a layer of information most people use without even realising. Could your colour perception be richer than you think?',
          ],
          label: 'Colour Discrimination',
          title: 'I can clearly distinguish between different colours',
          subtitle: 'Do colours appear distinct and vivid?',
          key: 'vision',
          options: agreeOptions,
        },
      },
      {
        type: 'MCQ',
        domain: 'physical',
        attribute: 'vision',
        metadata: {
          id: 'pa-vision-q3',
          icon: 'BookOpen',
          questionId: 3,
          tinyText: 'Near Vision',
          smallText: 'Reads up close easily',
          mediumText:
            'I can read small text and fine print at close range comfortably, without strain or blurring.',
          largeText: [
            'Have you ever read a full chapter of a book without noticing any fatigue in your eyes? Meera reads small print, instruction leaflets, and ingredient labels without a second thought.',
            'Her near vision is crisp and comfortable whether she is reading for five minutes or five hours. Could your ability to focus up close be a quiet strength?',
          ],
          label: 'Near Vision',
          title: 'I can read small text comfortably without eye strain',
          subtitle: 'Is reading up close comfortable for you?',
          key: 'vision',
          options: agreeOptions,
        },
      },
      {
        type: 'MCQ',
        domain: 'physical',
        attribute: 'vision',
        metadata: {
          id: 'pa-vision-q4',
          icon: 'Scan',
          questionId: 4,
          tinyText: 'Tracking',
          smallText: 'Follows moving objects',
          mediumText:
            'My eyes can smoothly follow a moving object — a ball, a car, a person — without losing track.',
          largeText: [
            'Have you ever watched a fast cricket ball travel from bowler to bat without blinking or losing it? Rohan tracks movement effortlessly — his eyes lock on and follow naturally.',
            'In traffic, in sport, in a crowd — his gaze stays with what matters. Could your visual tracking be giving you an edge you have never fully recognised?',
          ],
          label: 'Visual Tracking',
          title: 'My eyes can smoothly follow a moving object without losing track',
          subtitle: 'Can your eyes keep up with movement?',
          key: 'vision',
          options: agreeOptions,
        },
      },
      {
        type: 'MCQ',
        domain: 'physical',
        attribute: 'vision',
        metadata: {
          id: 'pa-vision-q5',
          icon: 'Sun',
          questionId: 5,
          tinyText: 'Adaptation',
          smallText: 'Light adjustment ease',
          mediumText:
            'I adjust comfortably when moving between bright and dark environments without prolonged discomfort.',
          largeText: [
            'Have you ever walked out of a dim cinema into bright daylight and adjusted almost instantly? Kiran barely notices the transition — her eyes adapt smoothly and without fuss.',
            'Dark rooms, bright screens, midday sun — she moves between them all without difficulty. Could the ease with which your eyes adapt to changing light be worth appreciating?',
          ],
          label: 'Light Adaptation',
          title: 'I adjust comfortably when moving between bright and dark environments',
          subtitle: 'Do your eyes adapt quickly to changing light?',
          key: 'vision',
          options: agreeOptions,
        },
      },
      {
        type: 'MCQ',
        domain: 'physical',
        attribute: 'vision',
        metadata: {
          id: 'pa-vision-q6',
          icon: 'Expand',
          questionId: 6,
          tinyText: 'Peripheral',
          smallText: 'Wide field awareness',
          mediumText:
            'I can notice movement and objects at the edges of my vision without turning my head.',
          largeText: [
            'Have you ever caught something moving at the corner of your eye before anyone else reacted? Dev has a wide field of awareness — shapes and movement at the edges of his vision register easily.',
            'On a busy street or a sports field, his peripheral vision keeps him alert. Could this wide-angle awareness be a practical strength you rely on every single day?',
          ],
          label: 'Peripheral Awareness',
          title: 'I can notice movement and objects at the edges of my vision',
          subtitle: 'Is your peripheral vision wide and aware?',
          key: 'vision',
          options: agreeOptions,
        },
      },
      {
        type: 'MCQ',
        domain: 'physical',
        attribute: 'vision',
        metadata: {
          id: 'pa-vision-q7',
          icon: 'Ruler',
          questionId: 7,
          tinyText: 'Depth',
          smallText: 'Judges distances well',
          mediumText:
            'I can accurately judge how far away objects are and navigate my environment confidently.',
          largeText: [
            'Have you ever reached out and picked up an object perfectly on the first attempt — without misjudging the distance at all? Priya threads needles and parks cars with the same calm precision.',
            'She knows instinctively where things are in space. Could your ability to judge distance be silently guiding everything from sport to driving to handcraft?',
          ],
          label: 'Depth Perception',
          title: 'I can accurately judge how far away objects are',
          subtitle: 'Do you judge distances accurately?',
          key: 'vision',
          options: agreeOptions,
        },
      },
      {
        type: 'MCQ',
        domain: 'physical',
        attribute: 'vision',
        metadata: {
          id: 'pa-vision-q8',
          icon: 'ZoomIn',
          questionId: 8,
          tinyText: 'Detail',
          smallText: 'Notices fine details',
          mediumText:
            'I can easily make out fine details in objects, text, and images that others might struggle to see.',
          largeText: [
            'Have you ever spotted a tiny misprint in a document that everyone else read straight past? Arjun notices the small things — the hairline crack, the slight colour difference, the extra comma.',
            'His eye for detail catches what others miss completely. Could your ability to see fine detail be one of your most underrated visual strengths?',
          ],
          label: 'Visual Detail',
          title: 'I can easily make out fine details in objects and images',
          subtitle: 'Do you see the small details clearly?',
          key: 'vision',
          options: agreeOptions,
        },
      },
      {
        type: 'MCQ',
        domain: 'physical',
        attribute: 'vision',
        metadata: {
          id: 'pa-vision-q9',
          icon: 'Monitor',
          questionId: 9,
          tinyText: 'Eye Comfort',
          smallText: 'Eyes stay comfortable',
          mediumText:
            'My eyes feel comfortable and relaxed even after long periods of reading, screen use, or close work.',
          largeText: [
            'Have you ever read or worked at a screen for hours and noticed your eyes were still comfortable at the end? Meera reads late into the evening without redness, aching, or blurred vision.',
            'Sustained visual work does not tire or irritate her eyes. Could this visual endurance be an asset you have quietly built and never fully credited yourself for?',
          ],
          label: 'Eye Comfort',
          title: 'My eyes feel comfortable after long periods of reading or screen use',
          subtitle: 'Do your eyes stay comfortable with sustained use?',
          key: 'vision',
          options: agreeOptions,
        },
      },

      // ── HEARING (q10–q18) ────────────────────────────────────────────────────
      {
        type: 'MCQ',
        domain: 'physical',
        attribute: 'hearing',
        metadata: {
          id: 'pa-hearing-q10',
          icon: 'Ear',
          questionId: 10,
          tinyText: 'Speech',
          smallText: 'Understands speech clearly',
          mediumText:
            'I can clearly understand what people are saying in normal conversation without asking them to repeat themselves.',
          largeText: [
            'Have you ever followed a conversation in a group without missing a single word? Rohan catches every detail of what is said — he never needs to ask someone to repeat themselves.',
            'Speech is clear and full for him, whether it comes from across a table or across a room. Could your clarity of hearing be giving you an advantage in every conversation?',
          ],
          label: 'Speech Comprehension',
          title: 'I can clearly understand what people are saying in normal conversation',
          subtitle: 'Do you hear speech clearly and easily?',
          key: 'hearing',
          options: agreeOptions,
        },
      },
      {
        type: 'MCQ',
        domain: 'physical',
        attribute: 'hearing',
        metadata: {
          id: 'pa-hearing-q11',
          icon: 'Volume2',
          questionId: 11,
          tinyText: 'Distance',
          smallText: 'Hears distant sounds',
          mediumText:
            'I can hear sounds clearly even when they come from far away, without needing them to be repeated or amplified.',
          largeText: [
            'Have you ever heard someone calling your name from the far end of a building before others noticed? Kiran hears things at distance that simply do not register for those around her.',
            'A whispered conversation across a quiet room, a car turning in the street below — she catches them all. Could your range of hearing be wider than you have ever appreciated?',
          ],
          label: 'Distance Hearing',
          title: 'I can hear sounds clearly even when they are far away',
          subtitle: 'Does your hearing reach far?',
          key: 'hearing',
          options: agreeOptions,
        },
      },
      {
        type: 'MCQ',
        domain: 'physical',
        attribute: 'hearing',
        metadata: {
          id: 'pa-hearing-q12',
          icon: 'Filter',
          questionId: 12,
          tinyText: 'Focus',
          smallText: 'Hears through noise',
          mediumText: 'I can follow a conversation clearly even in noisy or crowded environments.',
          largeText: [
            'Have you ever held a conversation at a loud party without straining or losing the thread? Dev has a natural ability to tune in to the voice he wants and tune out the rest.',
            'Cafes, airports, busy classrooms — he follows conversations in all of them without difficulty. Could your ability to filter sound be a hidden cognitive and auditory strength?',
          ],
          label: 'Noise Filtering',
          title: 'I can follow a conversation clearly even in noisy environments',
          subtitle: 'Can you hear through background noise?',
          key: 'hearing',
          options: agreeOptions,
        },
      },
      {
        type: 'MCQ',
        domain: 'physical',
        attribute: 'hearing',
        metadata: {
          id: 'pa-hearing-q13',
          icon: 'Gauge',
          questionId: 13,
          tinyText: 'Volume',
          smallText: 'Comfortable with sounds',
          mediumText:
            'Sounds in my everyday environment are at a comfortable volume — neither too loud nor too quiet for me.',
          largeText: [
            'Have you ever been in a room where the noise levels felt just right — not overwhelming, not muffled? Priya moves through daily life without sounds feeling excessive or insufficient.',
            'The world sounds balanced to her — she is neither startled by ordinary noises nor straining to hear. Could the way you experience sound volume be a reflection of a well-calibrated system?',
          ],
          label: 'Sound Comfort',
          title: 'Sounds are at a comfortable volume for me in everyday situations',
          subtitle: 'Does everyday sound feel comfortable?',
          key: 'hearing',
          options: agreeOptions,
        },
      },
      {
        type: 'MCQ',
        domain: 'physical',
        attribute: 'hearing',
        metadata: {
          id: 'pa-hearing-q14',
          icon: 'Music',
          questionId: 14,
          tinyText: 'Pitch',
          smallText: 'Tells pitches apart easily',
          mediumText:
            'I can easily distinguish between high-pitched and low-pitched sounds, and notice subtle differences in tone.',
          largeText: [
            'Have you ever told the difference between two sounds that everyone else heard as identical? Arjun hears pitch distinctions that others simply miss — high, low, sharp, flat.',
            'His ears sort sounds by frequency almost automatically. Could your sensitivity to pitch differences be a form of auditory intelligence worth developing?',
          ],
          label: 'Pitch Discrimination',
          title: 'I can distinguish between high-pitched and low-pitched sounds easily',
          subtitle: 'Do you notice differences in pitch?',
          key: 'hearing',
          options: agreeOptions,
        },
      },
      {
        type: 'MCQ',
        domain: 'physical',
        attribute: 'hearing',
        metadata: {
          id: 'pa-hearing-q15',
          icon: 'Navigation',
          questionId: 15,
          tinyText: 'Direction',
          smallText: 'Locates sound source',
          mediumText:
            'I can easily tell which direction a sound is coming from, even in complex environments.',
          largeText: [
            'Have you ever turned instantly toward the exact source of a sound — a phone ringing, someone calling — without needing to search? Meera locates sounds instinctively.',
            'Her ears triangulate position with ease. Could your ability to pinpoint where sounds come from be a natural spatial-auditory gift you have never put a name to?',
          ],
          label: 'Directional Hearing',
          title: 'I can easily tell which direction a sound is coming from',
          subtitle: 'Can you pinpoint where sounds originate?',
          key: 'hearing',
          options: agreeOptions,
        },
      },
      {
        type: 'MCQ',
        domain: 'physical',
        attribute: 'hearing',
        metadata: {
          id: 'pa-hearing-q16',
          icon: 'RadioTower',
          questionId: 16,
          tinyText: 'Sensitivity',
          smallText: 'Notices quiet sounds',
          mediumText:
            'I notice soft or subtle sounds — rustling, distant tapping, quiet voices — that others might completely miss.',
          largeText: [
            'Have you ever heard a faint sound in the background that nobody else in the room seemed to register? Rohan catches subtle sounds — the hiss of a radiator, leaves in the wind outside.',
            'His hearing picks up what most ears simply let pass. Could this sensitivity to quiet sounds be a valuable part of how you experience and interpret the world around you?',
          ],
          label: 'Auditory Sensitivity',
          title: 'I notice soft or subtle sounds that others might not pick up',
          subtitle: 'Do you hear things others miss?',
          key: 'hearing',
          options: agreeOptions,
        },
      },
      {
        type: 'MCQ',
        domain: 'physical',
        attribute: 'hearing',
        metadata: {
          id: 'pa-hearing-q17',
          icon: 'Clock',
          questionId: 17,
          tinyText: 'Stamina',
          smallText: 'Sustained listening ability',
          mediumText:
            'I can listen attentively for extended periods — lectures, conversations, presentations — without losing focus.',
          largeText: [
            'Have you ever sat through a long talk and followed every word right to the end without losing concentration? Kiran listens with real stamina — she stays engaged far longer than those around her.',
            'Long meetings, extended explanations, detailed instructions — she processes them all without fading. Could your listening endurance be one of your most underestimated strengths?',
          ],
          label: 'Listening Endurance',
          title: 'I can listen attentively for extended periods without losing focus',
          subtitle: 'Do you have strong listening stamina?',
          key: 'hearing',
          options: agreeOptions,
        },
      },
      {
        type: 'MCQ',
        domain: 'physical',
        attribute: 'hearing',
        metadata: {
          id: 'pa-hearing-q18',
          icon: 'Brain',
          questionId: 18,
          tinyText: 'Memory',
          smallText: 'Recalls spoken words',
          mediumText:
            'I can remember and accurately repeat sounds, spoken instructions, or verbal information I have heard.',
          largeText: [
            'Have you ever been able to repeat back a telephone number or set of instructions word for word without writing them down? Dev holds spoken information clearly in his mind.',
            'He does not need to hear things twice — once is usually enough for his auditory memory to lock it in. Could remembering what you hear be one of your most reliable cognitive tools?',
          ],
          label: 'Auditory Memory',
          title: 'I can remember and repeat sounds or spoken instructions accurately',
          subtitle: 'Do you remember what you hear?',
          key: 'hearing',
          options: agreeOptions,
        },
      },

      // ── SPEECH (q19–q27) ─────────────────────────────────────────────────────
      {
        type: 'MCQ',
        domain: 'physical',
        attribute: 'speech',
        metadata: {
          id: 'pa-speech-q19',
          icon: 'Mic',
          questionId: 19,
          tinyText: 'Clarity',
          smallText: 'Speaks clearly',
          mediumText:
            'People can understand me clearly when I speak — I rarely need to repeat myself or be asked to speak up.',
          largeText: [
            'Have you ever given directions or an explanation and had the person thank you for how clearly you put it? Priya speaks with a natural clarity that makes every word land as intended.',
            'She never needs to spell things out twice. Could the clarity of your spoken voice be a quiet gift you offer everyone around you?',
          ],
          label: 'Speech Clarity',
          title: 'People can understand me clearly when I speak',
          subtitle: 'Is your speech clear and easy to follow?',
          key: 'speech',
          options: agreeOptions,
        },
      },
      {
        type: 'MCQ',
        domain: 'physical',
        attribute: 'speech',
        metadata: {
          id: 'pa-speech-q20',
          icon: 'Waves',
          questionId: 20,
          tinyText: 'Fluency',
          smallText: 'Speaks without hesitation',
          mediumText:
            'I can speak fluently and smoothly, without noticeable interruptions, repetitions, or prolonged pauses.',
          largeText: [
            'Have you ever spoken for several minutes without stumbling over a single word, holding the room from start to finish? Arjun speaks with an easy, unbroken flow.',
            'His words arrive in the right order, at the right pace, without visible effort. Could your spoken fluency be one of the most powerful tools you bring to any situation?',
          ],
          label: 'Speech Fluency',
          title: 'I can speak fluently and smoothly without interruptions or pauses',
          subtitle: 'Does your speech flow naturally?',
          key: 'speech',
          options: agreeOptions,
        },
      },
      {
        type: 'MCQ',
        domain: 'physical',
        attribute: 'speech',
        metadata: {
          id: 'pa-speech-q21',
          icon: 'SlidersHorizontal',
          questionId: 21,
          tinyText: 'Volume',
          smallText: 'Controls voice volume',
          mediumText:
            'I can easily adjust my speaking volume to suit the situation — quieter in intimate settings, louder in larger spaces.',
          largeText: [
            'Have you ever naturally lowered your voice for a private conversation and raised it to address a group — without thinking about it? Meera modulates her volume instinctively.',
            'She is not too loud in quiet places or too soft in large ones. Could this natural control over your voice volume be making you a more effective communicator than you realise?',
          ],
          label: 'Voice Control',
          title: 'I can easily adjust my voice volume for different situations',
          subtitle: 'Do you control your speaking volume well?',
          key: 'speech',
          options: agreeOptions,
        },
      },
      {
        type: 'MCQ',
        domain: 'physical',
        attribute: 'speech',
        metadata: {
          id: 'pa-speech-q22',
          icon: 'MessageCircle',
          questionId: 22,
          tinyText: 'Expression',
          smallText: 'Expresses thoughts vocally',
          mediumText:
            'I can express my thoughts, feelings, and ideas clearly through speech when I need to.',
          largeText: [
            'Have you ever been in a situation where exactly the right words came to you and you were able to say them out loud without hesitation? Rohan speaks his mind with clarity and confidence.',
            'What is inside his head translates naturally into spoken words that make sense to others. Could your ability to voice your inner thoughts be one of your most important forms of self-expression?',
          ],
          label: 'Verbal Expression',
          title: 'I can express my thoughts and feelings through speech effectively',
          subtitle: 'Does speech let you express yourself fully?',
          key: 'speech',
          options: agreeOptions,
        },
      },
      {
        type: 'MCQ',
        domain: 'physical',
        attribute: 'speech',
        metadata: {
          id: 'pa-speech-q23',
          icon: 'Languages',
          questionId: 23,
          tinyText: 'Pronunciation',
          smallText: 'Pronounces words correctly',
          mediumText:
            'I can pronounce words accurately and correctly, including new or unfamiliar words.',
          largeText: [
            'Have you ever heard an unfamiliar word and been able to say it correctly on the first attempt? Kiran picks up new words and pronounces them naturally without needing to practise.',
            'She never garbles technical terms or stumbles over foreign names. Could your ability to reproduce sounds and words accurately be a quiet linguistic strength?',
          ],
          label: 'Pronunciation',
          title: 'I can pronounce words accurately and correctly',
          subtitle: 'Do you pronounce words correctly?',
          key: 'speech',
          options: agreeOptions,
        },
      },
      {
        type: 'MCQ',
        domain: 'physical',
        attribute: 'speech',
        metadata: {
          id: 'pa-speech-q24',
          icon: 'Timer',
          questionId: 24,
          tinyText: 'Pace',
          smallText: 'Comfortable speaking speed',
          mediumText:
            'I speak at a pace that is comfortable for others to follow — neither too fast to track nor too slow to hold attention.',
          largeText: [
            'Have you ever been told your speaking pace was just right — easy to follow without feeling slow? Dev naturally finds a rhythm that keeps his listeners with him.',
            'He does not rush or drag — his natural pace is one others can comfortably keep up with. Could the steadiness of your speaking pace be one of the reasons people find you easy to listen to?',
          ],
          label: 'Speech Pace',
          title: 'I speak at a pace that is comfortable for others to follow',
          subtitle: 'Is your speaking pace easy to follow?',
          key: 'speech',
          options: agreeOptions,
        },
      },
      {
        type: 'MCQ',
        domain: 'physical',
        attribute: 'speech',
        metadata: {
          id: 'pa-speech-q25',
          icon: 'Radio',
          questionId: 25,
          tinyText: 'Projection',
          smallText: 'Voice carries well',
          mediumText:
            'My voice carries well and can be heard clearly across a room without me needing to strain or shout.',
          largeText: [
            'Have you ever addressed a group and realised everyone could hear you clearly without you raising your voice? Priya has a natural vocal presence — her voice fills a space with ease.',
            'She does not need to shout to be heard across a classroom or meeting room. Could the natural projection of your voice be giving you an authority and presence you rarely think about?',
          ],
          label: 'Voice Projection',
          title: 'My voice carries well and can be heard without straining',
          subtitle: 'Does your voice carry naturally?',
          key: 'speech',
          options: agreeOptions,
        },
      },
      {
        type: 'MCQ',
        domain: 'physical',
        attribute: 'speech',
        metadata: {
          id: 'pa-speech-q26',
          icon: 'MessagesSquare',
          questionId: 26,
          tinyText: 'Conversation',
          smallText: 'Engages in dialogue',
          mediumText:
            'I can participate in back-and-forth conversations with ease, responding naturally and staying on topic.',
          largeText: [
            'Have you ever found yourself in a flowing conversation where your responses came naturally and the exchange felt effortless? Arjun moves through dialogue easily — listening, responding, building on what others say.',
            'Conversations do not exhaust him or leave him lost for words. Could your ease in reciprocal conversation be the foundation of every strong relationship you have built?',
          ],
          label: 'Conversational Ease',
          title: 'I can participate in back-and-forth conversations with ease',
          subtitle: 'Do conversations feel natural for you?',
          key: 'speech',
          options: agreeOptions,
        },
      },
      {
        type: 'MCQ',
        domain: 'physical',
        attribute: 'speech',
        metadata: {
          id: 'pa-speech-q27',
          icon: 'Globe',
          questionId: 27,
          tinyText: 'Phonetics',
          smallText: 'Produces varied sounds',
          mediumText:
            'I can produce the range of sounds and tones needed to speak clearly in different words and contexts.',
          largeText: [
            'Have you ever attempted a new word or sound and found your mouth could produce it naturally on the first try? Meera can shape her mouth and voice to produce a wide range of sounds without difficulty.',
            'Unfamiliar words, different languages, unusual sounds — she reproduces them without strain. Could your phonetic range be a foundation for communication strengths you are still discovering?',
          ],
          label: 'Phonetic Range',
          title: 'I can produce the sounds and tones needed for different words',
          subtitle: 'Can you produce a wide range of sounds?',
          key: 'speech',
          options: agreeOptions,
        },
      },

      // ── INTELLECTUAL (q28–q37) ───────────────────────────────────────────────
      {
        type: 'MCQ',
        domain: 'physical',
        attribute: 'intellectual',
        metadata: {
          id: 'pa-intellectual-q28',
          icon: 'Archive',
          questionId: 28,
          tinyText: 'Memory',
          smallText: 'Retains information well',
          mediumText:
            'I can remember information I have learned and recall it accurately when I need it.',
          largeText: [
            'Have you ever surprised yourself by recalling something you learned months ago — accurately and in detail? Rohan retains what he learns and finds it waiting for him when he needs it.',
            'Facts, names, processes — they stick in his memory reliably. Could your ability to store and retrieve information be one of the most valuable tools in your daily life?',
          ],
          label: 'Memory Retention',
          title: 'I can remember information and recall it when I need it',
          subtitle: 'Does information stick in your memory?',
          key: 'intellectual',
          options: agreeOptions,
        },
      },
      {
        type: 'MCQ',
        domain: 'physical',
        attribute: 'intellectual',
        metadata: {
          id: 'pa-intellectual-q29',
          icon: 'Puzzle',
          questionId: 29,
          tinyText: 'Problem-Solving',
          smallText: 'Solves problems logically',
          mediumText:
            'I can work through problems step by step, thinking clearly to identify causes and find solutions.',
          largeText: [
            'Have you ever faced a problem and systematically broken it down until you found a clear path forward? Kiran approaches every challenge with a calm, methodical mind.',
            'She does not panic — she analyses, considers, and solves. Could your ability to think through problems logically be one of your most reliable intellectual strengths?',
          ],
          label: 'Problem Solving',
          title: 'I can work through problems step by step to find solutions',
          subtitle: 'Do you solve problems systematically?',
          key: 'intellectual',
          options: agreeOptions,
        },
      },
      {
        type: 'MCQ',
        domain: 'physical',
        attribute: 'intellectual',
        metadata: {
          id: 'pa-intellectual-q30',
          icon: 'Focus',
          questionId: 30,
          tinyText: 'Attention',
          smallText: 'Sustains focused attention',
          mediumText:
            'I can concentrate on a task for extended periods without becoming easily distracted or losing focus.',
          largeText: [
            'Have you ever sat with a task for an hour or more and barely noticed the time passing because your focus held steady? Dev enters a state of deep concentration when something matters to him.',
            'Distractions fade and the task becomes everything. Could your capacity for sustained attention be the quiet engine behind your best work?',
          ],
          label: 'Sustained Attention',
          title: 'I can concentrate on a task for extended periods without losing focus',
          subtitle: 'Does your concentration hold over time?',
          key: 'intellectual',
          options: agreeOptions,
        },
      },
      {
        type: 'MCQ',
        domain: 'physical',
        attribute: 'intellectual',
        metadata: {
          id: 'pa-intellectual-q31',
          icon: 'Sparkles',
          questionId: 31,
          tinyText: 'Learning',
          smallText: 'Picks up new things fast',
          mediumText:
            'I can learn and understand new information, concepts, or skills fairly quickly when exposed to them.',
          largeText: [
            'Have you ever picked up a new skill or idea faster than you expected — grasping it after just one or two explanations? Priya absorbs new knowledge with a speed that surprises even her.',
            'New subjects, unfamiliar tools, complex concepts — she understands them sooner than most. Could your ability to learn quickly be a core part of how you move through the world?',
          ],
          label: 'Learning Speed',
          title: 'I can learn and understand new information or skills fairly quickly',
          subtitle: 'Do you pick up new things with ease?',
          key: 'intellectual',
          options: agreeOptions,
        },
      },
      {
        type: 'MCQ',
        domain: 'physical',
        attribute: 'intellectual',
        metadata: {
          id: 'pa-intellectual-q32',
          icon: 'Cloud',
          questionId: 32,
          tinyText: 'Abstract',
          smallText: 'Grasps abstract concepts',
          mediumText:
            'I can understand ideas and concepts that are not concrete or physical — theories, philosophies, hypothetical scenarios.',
          largeText: [
            'Have you ever followed an explanation of something invisible — a principle, a theory, a thought experiment — and found it made complete sense to you? Arjun is at home in the realm of ideas.',
            'Abstract concepts do not confuse or frustrate him — they interest him. Could your comfort with non-concrete thinking be a form of intellectual power most people never fully develop?',
          ],
          label: 'Abstract Reasoning',
          title: 'I can understand concepts and ideas that are not concrete or physical',
          subtitle: 'Do abstract ideas make sense to you?',
          key: 'intellectual',
          options: agreeOptions,
        },
      },
      {
        type: 'MCQ',
        domain: 'physical',
        attribute: 'intellectual',
        metadata: {
          id: 'pa-intellectual-q33',
          icon: 'ListChecks',
          questionId: 33,
          tinyText: 'Instructions',
          smallText: 'Follows complex steps',
          mediumText:
            'I can follow multi-step instructions and complete tasks in the correct order without losing track.',
          largeText: [
            'Have you ever been given a sequence of instructions and completed every step accurately without forgetting or jumbling anything? Meera thrives with complex, ordered tasks.',
            'She holds each step in mind and works through them systematically — first this, then that, then the next thing. Could your ability to follow sequences be a strength that makes you exceptionally reliable?',
          ],
          label: 'Instruction Following',
          title: 'I can follow multi-step instructions and complete tasks in order',
          subtitle: 'Do you follow sequential instructions well?',
          key: 'intellectual',
          options: agreeOptions,
        },
      },
      {
        type: 'MCQ',
        domain: 'physical',
        attribute: 'intellectual',
        metadata: {
          id: 'pa-intellectual-q34',
          icon: 'CalendarCheck',
          questionId: 34,
          tinyText: 'Planning',
          smallText: 'Plans and organizes well',
          mediumText:
            'I can plan ahead, organize my thoughts and tasks, and work toward goals in a structured way.',
          largeText: [
            'Have you ever mapped out a project from start to finish before beginning — and then followed through exactly as planned? Rohan organises his thinking before he acts.',
            'He knows what needs to happen and in what order. Could your ability to plan and organise be the foundation on which all your other strengths rest?',
          ],
          label: 'Cognitive Planning',
          title: 'I can plan ahead and organize my thoughts and tasks effectively',
          subtitle: 'Do you plan and organize your thinking well?',
          key: 'intellectual',
          options: agreeOptions,
        },
      },
      {
        type: 'MCQ',
        domain: 'physical',
        attribute: 'intellectual',
        metadata: {
          id: 'pa-intellectual-q35',
          icon: 'Zap',
          questionId: 35,
          tinyText: 'Processing',
          smallText: 'Processes information fast',
          mediumText:
            'I can process and respond to new information quickly and accurately, even in fast-moving situations.',
          largeText: [
            'Have you ever been in a fast conversation or fast-moving situation and kept up effortlessly — thinking, processing, and responding without lag? Kiran handles rapid-fire information without fumbling.',
            'Her mind processes quickly enough to stay ahead of the moment. Could your processing speed be the thing that allows you to thrive when others feel overwhelmed?',
          ],
          label: 'Processing Speed',
          title: 'I can process and respond to information quickly and accurately',
          subtitle: 'Does your mind process information at pace?',
          key: 'intellectual',
          options: agreeOptions,
        },
      },
      {
        type: 'MCQ',
        domain: 'physical',
        attribute: 'intellectual',
        metadata: {
          id: 'pa-intellectual-q36',
          icon: 'FileText',
          questionId: 36,
          tinyText: 'Comprehension',
          smallText: 'Understands written text',
          mediumText:
            'I understand what I read and can make sense of written information — including complex or unfamiliar texts.',
          largeText: [
            'Have you ever read something dense and demanding and found that the meaning landed clearly without needing to reread it multiple times? Dev reads with genuine comprehension — meaning does not slip away.',
            'Textbooks, reports, dense articles — he extracts what matters from all of them. Could your reading comprehension be one of the most powerful intellectual tools you carry with you?',
          ],
          label: 'Reading Comprehension',
          title: 'I understand what I read and can make sense of written information',
          subtitle: 'Do you understand what you read?',
          key: 'intellectual',
          options: agreeOptions,
        },
      },
      {
        type: 'MCQ',
        domain: 'physical',
        attribute: 'intellectual',
        metadata: {
          id: 'pa-intellectual-q37',
          icon: 'Hash',
          questionId: 37,
          tinyText: 'Numeracy',
          smallText: 'Understands number concepts',
          mediumText:
            'I can understand and work with numbers and basic mathematical ideas comfortably.',
          largeText: [
            'Have you ever worked through a calculation or number problem and found it straightforward — even when others reached for a calculator? Priya handles numbers with ease and confidence.',
            'Quantities, percentages, patterns in data — they make intuitive sense to her. Could your numerical fluency be one of the most practical thinking strengths you have?',
          ],
          label: 'Numeracy',
          title: 'I can understand and work with numbers and basic mathematical ideas',
          subtitle: 'Are you comfortable working with numbers?',
          key: 'intellectual',
          options: agreeOptions,
        },
      },

      // ── MOVEMENT (q38–q46) ──────────────────────────────────────────────────
      {
        type: 'MCQ',
        domain: 'physical',
        attribute: 'movement',
        metadata: {
          id: 'pa-locomotor-q38',
          icon: 'Footprints',
          questionId: 38,
          tinyText: 'Walking',
          smallText: 'Walks steadily',
          mediumText:
            'I can walk steadily and comfortably across different surfaces — smooth floors, uneven ground, stairs.',
          largeText: [
            'Have you ever walked across challenging ground — cobblestones, wet grass, steep paths — without stumbling or needing to slow significantly? Arjun walks with a natural, confident steadiness.',
            'Different surfaces and inclines do not throw him off. Could your ability to walk steadily across varied terrain be an everyday physical strength you rarely stop to appreciate?',
          ],
          label: 'Walking Ability',
          title: 'I can walk steadily and comfortably over different surfaces',
          subtitle: 'Do you walk with steadiness and ease?',
          key: 'locomotor',
          options: agreeOptions,
        },
      },
      {
        type: 'MCQ',
        domain: 'physical',
        attribute: 'movement',
        metadata: {
          id: 'pa-locomotor-q39',
          icon: 'Scale',
          questionId: 39,
          tinyText: 'Balance',
          smallText: 'Maintains good balance',
          mediumText:
            'I have good balance and can stay upright and stable in situations that might challenge others.',
          largeText: [
            'Have you ever stood on a moving bus without holding on, or balanced on one foot without wobbling? Meera has natural physical stability — she rarely loses her footing.',
            'Narrow paths, wobbly surfaces, sudden movements — her balance adjusts without conscious effort. Could your sense of balance be a physical strength that quietly supports everything you do?',
          ],
          label: 'Balance Control',
          title: 'I have good balance and rarely lose my footing',
          subtitle: 'Do you maintain balance with ease?',
          key: 'locomotor',
          options: agreeOptions,
        },
      },
      {
        type: 'MCQ',
        domain: 'physical',
        attribute: 'movement',
        metadata: {
          id: 'pa-locomotor-q40',
          icon: 'Wind',
          questionId: 40,
          tinyText: 'Running',
          smallText: 'Runs with ease',
          mediumText:
            'I can run and move quickly when needed, without significant discomfort or loss of control.',
          largeText: [
            'Have you ever needed to run — to catch something, reach someone, or join in — and found your body responded without hesitation? Rohan runs easily and naturally when speed is needed.',
            'His body moves with confidence at pace. Could your ability to run and move quickly be a physical freedom that many people take for granted but not everyone can access?',
          ],
          label: 'Running Ability',
          title: 'I can run and move quickly without difficulty',
          subtitle: 'Can you run comfortably when needed?',
          key: 'locomotor',
          options: agreeOptions,
        },
      },
      {
        type: 'MCQ',
        domain: 'physical',
        attribute: 'movement',
        metadata: {
          id: 'pa-locomotor-q41',
          icon: 'Move',
          questionId: 41,
          tinyText: 'Coordination',
          smallText: 'Moves smoothly',
          mediumText:
            'My body movements are smooth and well-coordinated — different parts of my body work together without difficulty.',
          largeText: [
            'Have you ever performed a physical task — throwing, catching, dancing — and noticed how naturally your body parts moved together? Kiran is well-coordinated: her hands, feet, and eyes work as one.',
            'Physical tasks that require timing and coordination feel natural to her. Could the fluency of your body coordination be one of your most practical and versatile physical assets?',
          ],
          label: 'Motor Coordination',
          title: 'My body movements are smooth and well-coordinated',
          subtitle: 'Do your body movements flow together?',
          key: 'locomotor',
          options: agreeOptions,
        },
      },
      {
        type: 'MCQ',
        domain: 'physical',
        attribute: 'movement',
        metadata: {
          id: 'pa-locomotor-q42',
          icon: 'MoveUpRight',
          questionId: 42,
          tinyText: 'Climbing',
          smallText: 'Navigates steps and terrain',
          mediumText:
            'I can climb stairs, steps, and uneven terrain without needing to hold on or take unusual care.',
          largeText: [
            'Have you ever bounded up a flight of stairs without thinking — or climbed a rocky path with ease while others paused to find their footing? Dev navigates changes in level naturally.',
            'Stairs, ramps, uneven paths — his body adjusts to elevation changes without conscious effort. Could your ability to navigate different terrains be a sign of strong lower body strength and spatial awareness?',
          ],
          label: 'Stair Climbing',
          title: 'I can climb stairs and uneven terrain without assistance',
          subtitle: 'Do you navigate stairs and terrain comfortably?',
          key: 'locomotor',
          options: agreeOptions,
        },
      },
      {
        type: 'MCQ',
        domain: 'physical',
        attribute: 'movement',
        metadata: {
          id: 'pa-locomotor-q43',
          icon: 'Pen',
          questionId: 43,
          tinyText: 'Fine Motor',
          smallText: 'Precise hand movements',
          mediumText:
            'I can perform precise hand and finger movements — writing, buttoning, using small tools — with ease.',
          largeText: [
            'Have you ever threaded a needle, written neatly, or assembled something small without fumbling? Priya works with her hands and fingers with precision and confidence.',
            'Small tools, delicate objects, fine writing — her fine motor skills are reliable and accurate. Could your precision with hand and finger movements be a practical strength you use dozens of times every day?',
          ],
          label: 'Fine Motor Skills',
          title: 'I can perform precise hand and finger movements with ease',
          subtitle: 'Are your fine motor skills strong?',
          key: 'locomotor',
          options: agreeOptions,
        },
      },
      {
        type: 'MCQ',
        domain: 'physical',
        attribute: 'movement',
        metadata: {
          id: 'pa-locomotor-q44',
          icon: 'Battery',
          questionId: 44,
          tinyText: 'Endurance',
          smallText: 'Physical staying power',
          mediumText:
            'I can sustain physical activity for a reasonable period without tiring too quickly.',
          largeText: [
            'Have you ever kept going physically — walking, working, moving — long after others had needed a rest? Arjun has a steady physical endurance that does not abandon him when he needs it.',
            'He paces himself and keeps going. Could your physical stamina be one of the quiet foundations of everything you accomplish in a day?',
          ],
          label: 'Physical Endurance',
          title: 'I can sustain physical activity without tiring too quickly',
          subtitle: 'Does your physical energy last?',
          key: 'locomotor',
          options: agreeOptions,
        },
      },
      {
        type: 'MCQ',
        domain: 'physical',
        attribute: 'movement',
        metadata: {
          id: 'pa-locomotor-q45',
          icon: 'Bolt',
          questionId: 45,
          tinyText: 'Reaction',
          smallText: 'Reacts quickly',
          mediumText: 'I can react quickly to physical cues and sudden changes in my environment.',
          largeText: [
            'Have you ever instinctively caught something that was falling before you even thought about it? Meera reacts fast — her body responds to sudden events almost before her mind processes them.',
            'Quick reflexes, rapid responses — she is quick when it counts. Could your reaction speed be a physical advantage that shows up in sport, safety, and everyday movement?',
          ],
          label: 'Reaction Time',
          title: 'I can react quickly to physical cues and changes in my environment',
          subtitle: 'Are your physical reactions fast?',
          key: 'locomotor',
          options: agreeOptions,
        },
      },
      {
        type: 'MCQ',
        domain: 'physical',
        attribute: 'movement',
        metadata: {
          id: 'pa-locomotor-q46',
          icon: 'RefreshCw',
          questionId: 46,
          tinyText: 'Flexibility',
          smallText: 'Flexible and agile',
          mediumText:
            'My body is flexible and can move through a comfortable range of motion without stiffness or pain.',
          largeText: [
            'Have you ever reached for something awkward, bent into an unusual position, or stretched beyond the expected range — and found your body moved without protest? Rohan is naturally flexible and agile.',
            'His body bends and stretches without discomfort. Could the flexibility of your body be a physical gift that protects you from injury and keeps you moving freely?',
          ],
          label: 'Physical Flexibility',
          title: 'My body is flexible and moves through its full range of motion',
          subtitle: 'Is your body flexible and agile?',
          key: 'locomotor',
          options: agreeOptions,
        },
      },

      // ── SMELL (q47–q55) ──────────────────────────────────────────────────────
      {
        type: 'MCQ',
        domain: 'physical',
        attribute: 'smell',
        metadata: {
          id: 'pa-smell-q47',
          icon: 'Radar',
          questionId: 47,
          tinyText: 'Detection',
          smallText: 'Detects everyday smells',
          mediumText:
            'I can smell things around me clearly in everyday situations — food, nature, household products.',
          largeText: [
            'Have you ever walked into a bakery and immediately picked up the warm, distinct smell of fresh bread while others were still looking for it? Kiran detects smells quickly and clearly.',
            'The world is full of scent for her — rich, present, and easy to notice. Could your ability to detect everyday smells be a sense you have always had but never fully appreciated?',
          ],
          label: 'Smell Detection',
          title: 'I can smell things around me clearly in everyday situations',
          subtitle: 'Can you detect everyday smells clearly?',
          key: 'smell',
          options: agreeOptions,
        },
      },
      {
        type: 'MCQ',
        domain: 'physical',
        attribute: 'smell',
        metadata: {
          id: 'pa-smell-q48',
          icon: 'Tag',
          questionId: 48,
          tinyText: 'Recognition',
          smallText: 'Recognizes common smells',
          mediumText:
            'I can identify familiar smells — food, flowers, cleaning products — and name them correctly.',
          largeText: [
            'Have you ever caught a scent and known immediately what it was — cinnamon, petrol, rain on warm concrete — without needing to think? Dev recognises smells with accuracy and speed.',
            'His nose connects scents to names and memories effortlessly. Could your ability to identify familiar smells be a sensory intelligence that helps you navigate and enjoy the world?',
          ],
          label: 'Smell Recognition',
          title: 'I can identify familiar smells like food, flowers, and cleaning products',
          subtitle: 'Can you recognise and name common smells?',
          key: 'smell',
          options: agreeOptions,
        },
      },
      {
        type: 'MCQ',
        domain: 'physical',
        attribute: 'smell',
        metadata: {
          id: 'pa-smell-q49',
          icon: 'Feather',
          questionId: 49,
          tinyText: 'Sensitivity',
          smallText: 'Notices faint odours',
          mediumText:
            'I notice faint or subtle smells that are too light for most people to detect.',
          largeText: [
            'Have you ever detected a smell — gas, must, something slightly off — before anyone else in the room? Priya catches faint traces that hover just at the edge of perception.',
            'She picks up what others miss entirely. Could this olfactory sensitivity be protecting you or enriching your experience of the world in ways you have never consciously acknowledged?',
          ],
          label: 'Olfactory Sensitivity',
          title: 'I notice faint or subtle smells that others might miss',
          subtitle: 'Do you detect smells others cannot?',
          key: 'smell',
          options: agreeOptions,
        },
      },
      {
        type: 'MCQ',
        domain: 'physical',
        attribute: 'smell',
        metadata: {
          id: 'pa-smell-q50',
          icon: 'SplitSquare',
          questionId: 50,
          tinyText: 'Distinction',
          smallText: 'Tells smells apart',
          mediumText:
            'I can tell the difference between similar smells that might seem identical to others.',
          largeText: [
            'Have you ever been able to tell two very similar scents apart — two types of coffee, two similar perfumes — where others said they were the same? Arjun distinguishes between smells that most people lump together.',
            'His nose reads the differences others do not notice. Could your ability to discriminate between similar smells be a refined sensory skill you have been undervaluing?',
          ],
          label: 'Smell Discrimination',
          title: 'I can tell the difference between similar smells',
          subtitle: 'Do you notice differences between similar smells?',
          key: 'smell',
          options: agreeOptions,
        },
      },
      {
        type: 'MCQ',
        domain: 'physical',
        attribute: 'smell',
        metadata: {
          id: 'pa-smell-q51',
          icon: 'AlertTriangle',
          questionId: 51,
          tinyText: 'Safety',
          smallText: 'Detects warning smells',
          mediumText:
            'I can quickly notice warning smells — smoke, gas, burning — that indicate danger.',
          largeText: [
            'Have you ever caught the smell of smoke or burning before it became visible, or detected a gas leak before anyone else? Meera picks up warning smells fast and acts on them.',
            'Her nose is a safety alarm. Could your ability to detect danger through smell be a quietly protective function you rely on more than you realise?',
          ],
          label: 'Safety Smell Detection',
          title: 'I can quickly notice warning smells like smoke or gas',
          subtitle: 'Can you detect warning smells quickly?',
          key: 'smell',
          options: agreeOptions,
        },
      },
      {
        type: 'MCQ',
        domain: 'physical',
        attribute: 'smell',
        metadata: {
          id: 'pa-smell-q52',
          icon: 'UtensilsCrossed',
          questionId: 52,
          tinyText: 'Food',
          smallText: 'Smell enhances food',
          mediumText:
            'My sense of smell helps me enjoy and evaluate food — detecting flavour, freshness, and quality.',
          largeText: [
            'Have you ever smelled a dish before tasting it and known exactly how it would taste — the spices, the richness, the freshness? Rohan uses his nose to evaluate food before it reaches his lips.',
            'Smell and taste are deeply intertwined for him. Could your sense of smell be enriching your experience of food in a way that a blocked nose would immediately reveal?',
          ],
          label: 'Food Smell Enjoyment',
          title: 'My sense of smell helps me enjoy and evaluate food',
          subtitle: 'Does smell enhance your experience of food?',
          key: 'smell',
          options: agreeOptions,
        },
      },
      {
        type: 'MCQ',
        domain: 'physical',
        attribute: 'smell',
        metadata: {
          id: 'pa-smell-q53',
          icon: 'Image',
          questionId: 53,
          tinyText: 'Memory',
          smallText: 'Smell triggers memories',
          mediumText:
            'Certain smells bring back clear and vivid memories or strong feelings from my past.',
          largeText: [
            'Have you ever caught a specific scent and been transported instantly to a particular moment in your past — a house, a person, a season? Kiran experiences this powerfully and often.',
            'A smell does not just reach her nose — it reaches her memory. Could the way scent connects to your memory be one of the most emotionally rich aspects of your sensory life?',
          ],
          label: 'Smell Memory Association',
          title: 'Certain smells bring back clear memories or feelings',
          subtitle: 'Do smells trigger your memories?',
          key: 'smell',
          options: agreeOptions,
        },
      },
      {
        type: 'MCQ',
        domain: 'physical',
        attribute: 'smell',
        metadata: {
          id: 'pa-smell-q54',
          icon: 'Shield',
          questionId: 54,
          tinyText: 'Comfort',
          smallText: 'Not overwhelmed by smells',
          mediumText:
            'I am comfortable with everyday smells in my environment without feeling overwhelmed or distressed.',
          largeText: [
            'Have you ever been in a busy market, a kitchen, or a crowded room and found the mix of smells perfectly manageable? Dev moves through scented environments without distress or overload.',
            'Strong smells do not disrupt him. Could your tolerance for varied everyday smells be a sign of a well-regulated sensory system?',
          ],
          label: 'Smell Tolerance',
          title: 'I am comfortable with everyday smells without feeling overwhelmed',
          subtitle: 'Do everyday smells feel manageable?',
          key: 'smell',
          options: agreeOptions,
        },
      },
      {
        type: 'MCQ',
        domain: 'physical',
        attribute: 'smell',
        metadata: {
          id: 'pa-smell-q55',
          icon: 'Locate',
          questionId: 55,
          tinyText: 'Location',
          smallText: 'Locates smell source',
          mediumText:
            'I can generally sense where a smell is coming from, even when the source is not immediately visible.',
          largeText: [
            'Have you ever caught a smell and known which direction it was coming from — the kitchen, outside, upstairs — before seeing the source? Priya uses smell to locate things others simply sniff at without thinking.',
            'Smell gives her directional information. Could this ability to trace smells to their source be a sensory skill more valuable than it first appears?',
          ],
          label: 'Smell Localization',
          title: 'I can generally sense where a smell is coming from',
          subtitle: 'Can you trace where smells originate?',
          key: 'smell',
          options: agreeOptions,
        },
      },

      // ── TOUCH (q56–q64) ──────────────────────────────────────────────────────
      {
        type: 'MCQ',
        domain: 'physical',
        attribute: 'touch',
        metadata: {
          id: 'pa-touch-q56',
          icon: 'Hand',
          questionId: 56,
          tinyText: 'Pressure',
          smallText: 'Senses touch pressure',
          mediumText:
            'I can feel differences in pressure when I touch or hold things — light touch, firm grip, heavy weight.',
          largeText: [
            'Have you ever held something and instinctively known how firmly to grip it — fragile or solid, light or heavy? Arjun reads pressure through his hands without conscious effort.',
            'He senses the weight and resistance of what he touches with ease. Could your sensitivity to touch pressure be a practical physical intelligence you use throughout the day?',
          ],
          label: 'Pressure Sensitivity',
          title: 'I can feel differences in pressure when I touch or hold things',
          subtitle: 'Can you feel differences in touch pressure?',
          key: 'touch',
          options: agreeOptions,
        },
      },
      {
        type: 'MCQ',
        domain: 'physical',
        attribute: 'touch',
        metadata: {
          id: 'pa-touch-q57',
          icon: 'Thermometer',
          questionId: 57,
          tinyText: 'Temperature',
          smallText: 'Senses temperature changes',
          mediumText:
            'I can easily distinguish between hot, warm, cool, and cold surfaces when I touch them.',
          largeText: [
            'Have you ever touched something and immediately known whether it was safe — too hot to pick up, cold enough to chill you? Meera reads temperature through her skin with natural accuracy.',
            "Her hands tell her what her eyes cannot always see. Could your skin's sensitivity to temperature be a quiet protective sense that keeps you safe dozens of times a day?",
          ],
          label: 'Temperature Detection',
          title: 'I can easily distinguish between hot, warm, and cold surfaces',
          subtitle: 'Does your skin sense temperature changes well?',
          key: 'touch',
          options: agreeOptions,
        },
      },
      {
        type: 'MCQ',
        domain: 'physical',
        attribute: 'touch',
        metadata: {
          id: 'pa-touch-q58',
          icon: 'Fingerprint',
          questionId: 58,
          tinyText: 'Texture',
          smallText: 'Distinguishes textures',
          mediumText:
            'I can feel the difference between different textures with my hands — rough, smooth, bumpy, silky.',
          largeText: [
            'Have you ever run your hand across a surface and immediately known exactly what it was made of — wood, fabric, metal, skin — by feel alone? Rohan reads texture through his fingertips like a language.',
            'Different materials speak to him through touch. Could your sensitivity to texture be a tactile intelligence that makes your experience of the physical world richer than you know?',
          ],
          label: 'Texture Discrimination',
          title: 'I can feel the difference between different textures with my hands',
          subtitle: 'Can you tell textures apart by touch?',
          key: 'touch',
          options: agreeOptions,
        },
      },
      {
        type: 'MCQ',
        domain: 'physical',
        attribute: 'touch',
        metadata: {
          id: 'pa-touch-q59',
          icon: 'AlertCircle',
          questionId: 59,
          tinyText: 'Discomfort',
          smallText: 'Aware of discomfort',
          mediumText:
            'I can notice and respond appropriately when something is causing physical discomfort or pain.',
          largeText: [
            "Have you ever immediately noticed a sharp edge, a tight pressure, or a pain that needed attention — and responded to it before it worsened? Kiran is attuned to her body's signals of discomfort.",
            'She notices what is not right and acts on it. Could your awareness of physical discomfort be an important protective sense that stops small problems from becoming larger ones?',
          ],
          label: 'Discomfort Awareness',
          title: 'I can notice and respond when something is causing physical discomfort',
          subtitle: 'Do you notice physical discomfort promptly?',
          key: 'touch',
          options: agreeOptions,
        },
      },
      {
        type: 'MCQ',
        domain: 'physical',
        attribute: 'touch',
        metadata: {
          id: 'pa-touch-q60',
          icon: 'ZoomIn',
          questionId: 60,
          tinyText: 'Fine Touch',
          smallText: 'Feels fine details',
          mediumText:
            'I can feel small objects and fine surface details when handling things with my hands.',
          largeText: [
            'Have you ever picked a small object out of a bag without looking, or felt a tiny embossed detail on a surface? Dev senses fine detail through his fingertips with surprising accuracy.',
            'Small differences in surface, tiny objects, subtle variations — his touch catches what eyes might miss. Could your fine touch sensitivity be a tactile skill with more applications than you have ever considered?',
          ],
          label: 'Fine Touch Sensitivity',
          title: 'I can feel small objects and fine details when handling things',
          subtitle: 'Can your hands feel fine details?',
          key: 'touch',
          options: agreeOptions,
        },
      },
      {
        type: 'MCQ',
        domain: 'physical',
        attribute: 'touch',
        metadata: {
          id: 'pa-touch-q61',
          icon: 'Crosshair',
          questionId: 61,
          tinyText: 'Proprioception',
          smallText: 'Body position awareness',
          mediumText:
            'I am aware of where my body is in space — my posture, the position of my limbs — even without looking.',
          largeText: [
            'Have you ever reached behind you and found exactly what you were looking for, or adjusted your posture in the dark without losing your balance? Priya always knows where her body is in space.',
            'Without looking, she can feel where her arms, legs, and torso are positioned. Could your sense of body awareness be the quiet intelligence that keeps you upright, coordinated, and confident in your movements?',
          ],
          label: 'Body Awareness',
          title: 'I am aware of where my body is in space, even with my eyes closed',
          subtitle: 'Do you know where your body is without looking?',
          key: 'touch',
          options: agreeOptions,
        },
      },
      {
        type: 'MCQ',
        domain: 'physical',
        attribute: 'touch',
        metadata: {
          id: 'pa-touch-q62',
          icon: 'HeartHandshake',
          questionId: 62,
          tinyText: 'Comfort',
          smallText: 'Comfortable with touch',
          mediumText:
            'I am comfortable with everyday physical contact — handshakes, a pat on the back, being in close proximity to others.',
          largeText: [
            'Have you ever received a handshake or a friendly pat and felt perfectly at ease — registering it as warm and ordinary rather than overwhelming? Arjun is comfortable with the kind of everyday physical contact that social life involves.',
            'Touch does not distress or overstimulate him in normal situations. Could your comfort with everyday physical contact be a social and sensory strength that makes connection with others feel natural?',
          ],
          label: 'Touch Tolerance',
          title: 'I am comfortable with everyday physical contact like handshakes',
          subtitle: 'Do you feel comfortable with everyday touch?',
          key: 'touch',
          options: agreeOptions,
        },
      },
      {
        type: 'MCQ',
        domain: 'physical',
        attribute: 'touch',
        metadata: {
          id: 'pa-touch-q63',
          icon: 'Activity',
          questionId: 63,
          tinyText: 'Vibration',
          smallText: 'Senses vibrations',
          mediumText:
            'I can feel vibrations through surfaces and objects — a phone buzzing, an engine running, music through a floor.',
          largeText: [
            'Have you ever felt music through the floor of a venue, or noticed the hum of machinery through a surface, before you could clearly hear it? Meera senses vibration through touch readily and clearly.',
            'The physical world pulses with vibration for her, and she picks it up through her body. Could your ability to sense vibration be a physical awareness that gives you information others simply do not receive?',
          ],
          label: 'Vibration Sense',
          title: 'I can feel vibrations through surfaces and objects easily',
          subtitle: 'Do you sense vibrations through touch?',
          key: 'touch',
          options: agreeOptions,
        },
      },
      {
        type: 'MCQ',
        domain: 'physical',
        attribute: 'touch',
        metadata: {
          id: 'pa-touch-q64',
          icon: 'PackageSearch',
          questionId: 64,
          tinyText: 'Recognition',
          smallText: 'Identifies by touch',
          mediumText:
            'I can recognize and remember objects by touch alone, identifying them without needing to see them.',
          largeText: [
            "Have you ever reached into a bag and identified exactly what you were touching — keys, a pen, a coin — before pulling it out? Rohan's hands work like a secondary pair of eyes.",
            'He reads objects through his palms and fingertips with surprising accuracy. Could your tactile recognition be a form of hands-on intelligence that serves you in ways you have never consciously named?',
          ],
          label: 'Tactile Recognition',
          title: 'I can recognize and remember objects by touch alone',
          subtitle: 'Can you identify objects by touch?',
          key: 'touch',
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
    // Find the Physical assessment
    const result = await queryRunner.query(
      `SELECT id FROM "assessments" WHERE "name" = 'Physical'`,
    );

    if (result && result.length > 0) {
      const assessmentId = result[0].id;

      // Remove all activities associated with this assessment
      await queryRunner.query(
        `DELETE FROM "activities" WHERE "assessmentId" = $1 AND "domain" = $2`,
        [assessmentId, 'physical'],
      );
    }
  }
}
