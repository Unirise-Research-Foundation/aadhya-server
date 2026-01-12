import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedMultipleIntelligencesActivities1768500200000 implements MigrationInterface {
  name = 'SeedMultipleIntelligencesActivities1768500200000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Find the Baseline assessment
    const result = await queryRunner.query(`SELECT id FROM "assessments" WHERE "name" = 'Baseline'`);

    if (!result || result.length === 0) {
      throw new Error('Baseline assessment not found');
    }

    const assessmentId = result[0].id;

    const activities = [
      {
        type: 'MCQ',
        domain: 'intelligence',
        attribute: 'INTRAPERSONAL',
        metadata: {
          questionId: 1,
          text: 'I am a private person and I like my private inner world',
          domainDisplayName: 'Intrapersonal Intelligence',
          options: [
            { value: 1, label: 'Completely agree', emoji: '😊', scoreAdjustment: 5 },
            { value: 2, label: 'Somewhat agree', emoji: '🙂', scoreAdjustment: 2 },
            { value: 3, label: 'Unsure', emoji: '😐', scoreAdjustment: 0 },
            { value: 4, label: 'Somewhat disagree', emoji: '😕', scoreAdjustment: -2 },
            { value: 5, label: 'Completely disagree', emoji: '😢', scoreAdjustment: -5 },
          ],
        },
      },
      {
        type: 'MCQ',
        domain: 'intelligence',
        attribute: 'BODILY_KINESTHETIC',
        metadata: {
          questionId: 2,
          text: 'I like to move, tap or fidget when sitting',
          domainDisplayName: 'Bodily-Kinesthetic Intelligence',
          options: [
            { value: 1, label: 'Completely agree', emoji: '😊', scoreAdjustment: 5 },
            { value: 2, label: 'Somewhat agree', emoji: '🙂', scoreAdjustment: 2 },
            { value: 3, label: 'Unsure', emoji: '😐', scoreAdjustment: 0 },
            { value: 4, label: 'Somewhat disagree', emoji: '😕', scoreAdjustment: -2 },
            { value: 5, label: 'Completely disagree', emoji: '😢', scoreAdjustment: -5 },
          ],
        },
      },
      {
        type: 'MCQ',
        domain: 'intelligence',
        attribute: 'LOGICAL_MATHEMATICAL',
        metadata: {
          questionId: 3,
          text: 'I work best in an organized work area',
          domainDisplayName: 'Logical-Mathematical Intelligence',
          options: [
            { value: 1, label: 'Completely agree', emoji: '😊', scoreAdjustment: 5 },
            { value: 2, label: 'Somewhat agree', emoji: '🙂', scoreAdjustment: 2 },
            { value: 3, label: 'Unsure', emoji: '😐', scoreAdjustment: 0 },
            { value: 4, label: 'Somewhat disagree', emoji: '😕', scoreAdjustment: -2 },
            { value: 5, label: 'Completely disagree', emoji: '😢', scoreAdjustment: -5 },
          ],
        },
      },
      {
        type: 'MCQ',
        domain: 'intelligence',
        attribute: 'NATURALISTIC',
        metadata: {
          questionId: 4,
          text: 'I have a collection (e.g. shells, mugs, rocks, hockey cards)',
          domainDisplayName: 'Naturalistic Intelligence',
          options: [
            { value: 1, label: 'Completely agree', emoji: '😊', scoreAdjustment: 5 },
            { value: 2, label: 'Somewhat agree', emoji: '🙂', scoreAdjustment: 2 },
            { value: 3, label: 'Unsure', emoji: '😐', scoreAdjustment: 0 },
            { value: 4, label: 'Somewhat disagree', emoji: '😕', scoreAdjustment: -2 },
            { value: 5, label: 'Completely disagree', emoji: '😢', scoreAdjustment: -5 },
          ],
        },
      },
      {
        type: 'MCQ',
        domain: 'intelligence',
        attribute: 'INTERPERSONAL',
        metadata: {
          questionId: 5,
          text: 'I work best through interaction with people',
          domainDisplayName: 'Interpersonal Intelligence',
          options: [
            { value: 1, label: 'Completely agree', emoji: '😊', scoreAdjustment: 5 },
            { value: 2, label: 'Somewhat agree', emoji: '🙂', scoreAdjustment: 2 },
            { value: 3, label: 'Unsure', emoji: '😐', scoreAdjustment: 0 },
            { value: 4, label: 'Somewhat disagree', emoji: '😕', scoreAdjustment: -2 },
            { value: 5, label: 'Completely disagree', emoji: '😢', scoreAdjustment: -5 },
          ],
        },
      },
      {
        type: 'MCQ',
        domain: 'intelligence',
        attribute: 'LINGUISTIC',
        metadata: {
          questionId: 6,
          text: 'I like puns and other wordplay',
          domainDisplayName: 'Linguistic Intelligence',
          options: [
            { value: 1, label: 'Completely agree', emoji: '😊', scoreAdjustment: 5 },
            { value: 2, label: 'Somewhat agree', emoji: '🙂', scoreAdjustment: 2 },
            { value: 3, label: 'Unsure', emoji: '😐', scoreAdjustment: 0 },
            { value: 4, label: 'Somewhat disagree', emoji: '😕', scoreAdjustment: -2 },
            { value: 5, label: 'Completely disagree', emoji: '😢', scoreAdjustment: -5 },
          ],
        },
      },
      {
        type: 'MCQ',
        domain: 'intelligence',
        attribute: 'MUSICAL',
        metadata: {
          questionId: 7,
          text: 'I play music in my head',
          domainDisplayName: 'Musical Intelligence',
          options: [
            { value: 1, label: 'Completely agree', emoji: '😊', scoreAdjustment: 5 },
            { value: 2, label: 'Somewhat agree', emoji: '🙂', scoreAdjustment: 2 },
            { value: 3, label: 'Unsure', emoji: '😐', scoreAdjustment: 0 },
            { value: 4, label: 'Somewhat disagree', emoji: '😕', scoreAdjustment: -2 },
            { value: 5, label: 'Completely disagree', emoji: '😢', scoreAdjustment: -5 },
          ],
        },
      },
      {
        type: 'MCQ',
        domain: 'intelligence',
        attribute: 'SPATIAL',
        metadata: {
          questionId: 8,
          text: 'I understand colour combinations and what colours work well together',
          domainDisplayName: 'Spatial Intelligence',
          options: [
            { value: 1, label: 'Completely agree', emoji: '😊', scoreAdjustment: 5 },
            { value: 2, label: 'Somewhat agree', emoji: '🙂', scoreAdjustment: 2 },
            { value: 3, label: 'Unsure', emoji: '😐', scoreAdjustment: 0 },
            { value: 4, label: 'Somewhat disagree', emoji: '😕', scoreAdjustment: -2 },
            { value: 5, label: 'Completely disagree', emoji: '😢', scoreAdjustment: -5 },
          ],
        },
      },
      {
        type: 'MCQ',
        domain: 'intelligence',
        attribute: 'LINGUISTIC',
        metadata: {
          questionId: 9,
          text: 'I feel comfortable and get positive reinforcement when dealing with language and words',
          domainDisplayName: 'Linguistic Intelligence',
          options: [
            { value: 1, label: 'Completely agree', emoji: '😊', scoreAdjustment: 5 },
            { value: 2, label: 'Somewhat agree', emoji: '🙂', scoreAdjustment: 2 },
            { value: 3, label: 'Unsure', emoji: '😐', scoreAdjustment: 0 },
            { value: 4, label: 'Somewhat disagree', emoji: '😕', scoreAdjustment: -2 },
            { value: 5, label: 'Completely disagree', emoji: '😢', scoreAdjustment: -5 },
          ],
        },
      },
      {
        type: 'MCQ',
        domain: 'intelligence',
        attribute: 'SPATIAL',
        metadata: {
          questionId: 10,
          text: 'I enjoy solving jigsaw, maze and/or other visual puzzles',
          domainDisplayName: 'Spatial Intelligence',
          options: [
            { value: 1, label: 'Completely agree', emoji: '😊', scoreAdjustment: 5 },
            { value: 2, label: 'Somewhat agree', emoji: '🙂', scoreAdjustment: 2 },
            { value: 3, label: 'Unsure', emoji: '😐', scoreAdjustment: 0 },
            { value: 4, label: 'Somewhat disagree', emoji: '😕', scoreAdjustment: -2 },
            { value: 5, label: 'Completely disagree', emoji: '😢', scoreAdjustment: -5 },
          ],
        },
      },
      {
        type: 'MCQ',
        domain: 'intelligence',
        attribute: 'NATURALISTIC',
        metadata: {
          questionId: 11,
          text: 'I notice similarities and differences in trees, flowers and other things in nature',
          domainDisplayName: 'Naturalistic Intelligence',
          options: [
            { value: 1, label: 'Completely agree', emoji: '😊', scoreAdjustment: 5 },
            { value: 2, label: 'Somewhat agree', emoji: '🙂', scoreAdjustment: 2 },
            { value: 3, label: 'Unsure', emoji: '😐', scoreAdjustment: 0 },
            { value: 4, label: 'Somewhat disagree', emoji: '😕', scoreAdjustment: -2 },
            { value: 5, label: 'Completely disagree', emoji: '😢', scoreAdjustment: -5 },
          ],
        },
      },
      {
        type: 'MCQ',
        domain: 'intelligence',
        attribute: 'INTRAPERSONAL',
        metadata: {
          questionId: 12,
          text: 'I have a good understanding of my feelings and how I will react to situations',
          domainDisplayName: 'Intrapersonal Intelligence',
          options: [
            { value: 1, label: 'Completely agree', emoji: '😊', scoreAdjustment: 5 },
            { value: 2, label: 'Somewhat agree', emoji: '🙂', scoreAdjustment: 2 },
            { value: 3, label: 'Unsure', emoji: '😐', scoreAdjustment: 0 },
            { value: 4, label: 'Somewhat disagree', emoji: '😕', scoreAdjustment: -2 },
            { value: 5, label: 'Completely disagree', emoji: '😢', scoreAdjustment: -5 },
          ],
        },
      },
      {
        type: 'MCQ',
        domain: 'intelligence',
        attribute: 'INTERPERSONAL',
        metadata: {
          questionId: 13,
          text: 'I have a few close friends',
          domainDisplayName: 'Interpersonal Intelligence',
          options: [
            { value: 1, label: 'Completely agree', emoji: '😊', scoreAdjustment: 5 },
            { value: 2, label: 'Somewhat agree', emoji: '🙂', scoreAdjustment: 2 },
            { value: 3, label: 'Unsure', emoji: '😐', scoreAdjustment: 0 },
            { value: 4, label: 'Somewhat disagree', emoji: '😕', scoreAdjustment: -2 },
            { value: 5, label: 'Completely disagree', emoji: '😢', scoreAdjustment: -5 },
          ],
        },
      },
      {
        type: 'MCQ',
        domain: 'intelligence',
        attribute: 'INTERPERSONAL',
        metadata: {
          questionId: 14,
          text: 'I enjoy team sports rather than individual sports',
          domainDisplayName: 'Interpersonal Intelligence',
          options: [
            { value: 1, label: 'Completely agree', emoji: '😊', scoreAdjustment: 5 },
            { value: 2, label: 'Somewhat agree', emoji: '🙂', scoreAdjustment: 2 },
            { value: 3, label: 'Unsure', emoji: '😐', scoreAdjustment: 0 },
            { value: 4, label: 'Somewhat disagree', emoji: '😕', scoreAdjustment: -2 },
            { value: 5, label: 'Completely disagree', emoji: '😢', scoreAdjustment: -5 },
          ],
        },
      },
      {
        type: 'MCQ',
        domain: 'intelligence',
        attribute: 'LOGICAL_MATHEMATICAL',
        metadata: {
          questionId: 15,
          text: 'I enjoy math and/or science',
          domainDisplayName: 'Logical-Mathematical Intelligence',
          options: [
            { value: 1, label: 'Completely agree', emoji: '😊', scoreAdjustment: 5 },
            { value: 2, label: 'Somewhat agree', emoji: '🙂', scoreAdjustment: 2 },
            { value: 3, label: 'Unsure', emoji: '😐', scoreAdjustment: 0 },
            { value: 4, label: 'Somewhat disagree', emoji: '😕', scoreAdjustment: -2 },
            { value: 5, label: 'Completely disagree', emoji: '😢', scoreAdjustment: -5 },
          ],
        },
      },
      {
        type: 'MCQ',
        domain: 'intelligence',
        attribute: 'BODILY_KINESTHETIC',
        metadata: {
          questionId: 16,
          text: 'I participate in extreme sports (e.g. sea kayaking, rock climbing, caving)',
          domainDisplayName: 'Bodily-Kinesthetic Intelligence',
          options: [
            { value: 1, label: 'Completely agree', emoji: '😊', scoreAdjustment: 5 },
            { value: 2, label: 'Somewhat agree', emoji: '🙂', scoreAdjustment: 2 },
            { value: 3, label: 'Unsure', emoji: '😐', scoreAdjustment: 0 },
            { value: 4, label: 'Somewhat disagree', emoji: '😕', scoreAdjustment: -2 },
            { value: 5, label: 'Completely disagree', emoji: '😢', scoreAdjustment: -5 },
          ],
        },
      },
      {
        type: 'MCQ',
        domain: 'intelligence',
        attribute: 'LINGUISTIC',
        metadata: {
          questionId: 17,
          text: 'I enjoy completing crosswords and other word games',
          domainDisplayName: 'Linguistic Intelligence',
          options: [
            { value: 1, label: 'Completely agree', emoji: '😊', scoreAdjustment: 5 },
            { value: 2, label: 'Somewhat agree', emoji: '🙂', scoreAdjustment: 2 },
            { value: 3, label: 'Unsure', emoji: '😐', scoreAdjustment: 0 },
            { value: 4, label: 'Somewhat disagree', emoji: '😕', scoreAdjustment: -2 },
            { value: 5, label: 'Completely disagree', emoji: '😢', scoreAdjustment: -5 },
          ],
        },
      },
      {
        type: 'MCQ',
        domain: 'intelligence',
        attribute: 'INTERPERSONAL',
        metadata: {
          questionId: 18,
          text: 'Being around people energizes me',
          domainDisplayName: 'Interpersonal Intelligence',
          options: [
            { value: 1, label: 'Completely agree', emoji: '😊', scoreAdjustment: 5 },
            { value: 2, label: 'Somewhat agree', emoji: '🙂', scoreAdjustment: 2 },
            { value: 3, label: 'Unsure', emoji: '😐', scoreAdjustment: 0 },
            { value: 4, label: 'Somewhat disagree', emoji: '😕', scoreAdjustment: -2 },
            { value: 5, label: 'Completely disagree', emoji: '😢', scoreAdjustment: -5 },
          ],
        },
      },
      {
        type: 'MCQ',
        domain: 'intelligence',
        attribute: 'MUSICAL',
        metadata: {
          questionId: 19,
          text: 'It is easy for me to follow the beat of music',
          domainDisplayName: 'Musical Intelligence',
          options: [
            { value: 1, label: 'Completely agree', emoji: '😊', scoreAdjustment: 5 },
            { value: 2, label: 'Somewhat agree', emoji: '🙂', scoreAdjustment: 2 },
            { value: 3, label: 'Unsure', emoji: '😐', scoreAdjustment: 0 },
            { value: 4, label: 'Somewhat disagree', emoji: '😕', scoreAdjustment: -2 },
            { value: 5, label: 'Completely disagree', emoji: '😢', scoreAdjustment: -5 },
          ],
        },
      },
      {
        type: 'MCQ',
        domain: 'intelligence',
        attribute: 'INTRAPERSONAL',
        metadata: {
          questionId: 20,
          text: 'I often raise questions concerning values and beliefs',
          domainDisplayName: 'Intrapersonal Intelligence',
          options: [
            { value: 1, label: 'Completely agree', emoji: '😊', scoreAdjustment: 5 },
            { value: 2, label: 'Somewhat agree', emoji: '🙂', scoreAdjustment: 2 },
            { value: 3, label: 'Unsure', emoji: '😐', scoreAdjustment: 0 },
            { value: 4, label: 'Somewhat disagree', emoji: '😕', scoreAdjustment: -2 },
            { value: 5, label: 'Completely disagree', emoji: '😢', scoreAdjustment: -5 },
          ],
        },
      },
      {
        type: 'MCQ',
        domain: 'intelligence',
        attribute: 'INTRAPERSONAL',
        metadata: {
          questionId: 21,
          text: 'I understand that I am responsible for my own behavior',
          domainDisplayName: 'Intrapersonal Intelligence',
          options: [
            { value: 1, label: 'Completely agree', emoji: '😊', scoreAdjustment: 5 },
            { value: 2, label: 'Somewhat agree', emoji: '🙂', scoreAdjustment: 2 },
            { value: 3, label: 'Unsure', emoji: '😐', scoreAdjustment: 0 },
            { value: 4, label: 'Somewhat disagree', emoji: '😕', scoreAdjustment: -2 },
            { value: 5, label: 'Completely disagree', emoji: '😢', scoreAdjustment: -5 },
          ],
        },
      },
      {
        type: 'MCQ',
        domain: 'intelligence',
        attribute: 'NATURALISTIC',
        metadata: {
          questionId: 22,
          text: 'I am actively involved in protecting the environment',
          domainDisplayName: 'Naturalistic Intelligence',
          options: [
            { value: 1, label: 'Completely agree', emoji: '😊', scoreAdjustment: 5 },
            { value: 2, label: 'Somewhat agree', emoji: '🙂', scoreAdjustment: 2 },
            { value: 3, label: 'Unsure', emoji: '😐', scoreAdjustment: 0 },
            { value: 4, label: 'Somewhat disagree', emoji: '😕', scoreAdjustment: -2 },
            { value: 5, label: 'Completely disagree', emoji: '😢', scoreAdjustment: -5 },
          ],
        },
      },
      {
        type: 'MCQ',
        domain: 'intelligence',
        attribute: 'SPATIAL',
        metadata: {
          questionId: 23,
          text: 'I read charts and maps easily',
          domainDisplayName: 'Spatial Intelligence',
          options: [
            { value: 1, label: 'Completely agree', emoji: '😊', scoreAdjustment: 5 },
            { value: 2, label: 'Somewhat agree', emoji: '🙂', scoreAdjustment: 2 },
            { value: 3, label: 'Unsure', emoji: '😐', scoreAdjustment: 0 },
            { value: 4, label: 'Somewhat disagree', emoji: '😕', scoreAdjustment: -2 },
            { value: 5, label: 'Completely disagree', emoji: '😢', scoreAdjustment: -5 },
          ],
        },
      },
      {
        type: 'MCQ',
        domain: 'intelligence',
        attribute: 'BODILY_KINESTHETIC',
        metadata: {
          questionId: 24,
          text: 'I am curious as to how things feel and I tend to touch objects',
          domainDisplayName: 'Bodily-Kinesthetic Intelligence',
          options: [
            { value: 1, label: 'Completely agree', emoji: '😊', scoreAdjustment: 5 },
            { value: 2, label: 'Somewhat agree', emoji: '🙂', scoreAdjustment: 2 },
            { value: 3, label: 'Unsure', emoji: '😐', scoreAdjustment: 0 },
            { value: 4, label: 'Somewhat disagree', emoji: '😕', scoreAdjustment: -2 },
            { value: 5, label: 'Completely disagree', emoji: '😢', scoreAdjustment: -5 },
          ],
        },
      },
      {
        type: 'MCQ',
        domain: 'intelligence',
        attribute: 'LOGICAL_MATHEMATICAL',
        metadata: {
          questionId: 25,
          text: 'I enjoy playing brainteasers and games that involve logical thinking',
          domainDisplayName: 'Logical-Mathematical Intelligence',
          options: [
            { value: 1, label: 'Completely agree', emoji: '😊', scoreAdjustment: 5 },
            { value: 2, label: 'Somewhat agree', emoji: '🙂', scoreAdjustment: 2 },
            { value: 3, label: 'Unsure', emoji: '😐', scoreAdjustment: 0 },
            { value: 4, label: 'Somewhat disagree', emoji: '😕', scoreAdjustment: -2 },
            { value: 5, label: 'Completely disagree', emoji: '😢', scoreAdjustment: -5 },
          ],
        },
      },
      {
        type: 'MCQ',
        domain: 'intelligence',
        attribute: 'BODILY_KINESTHETIC',
        metadata: {
          questionId: 26,
          text: 'I am well coordinated',
          domainDisplayName: 'Bodily-Kinesthetic Intelligence',
          options: [
            { value: 1, label: 'Completely agree', emoji: '😊', scoreAdjustment: 5 },
            { value: 2, label: 'Somewhat agree', emoji: '🙂', scoreAdjustment: 2 },
            { value: 3, label: 'Unsure', emoji: '😐', scoreAdjustment: 0 },
            { value: 4, label: 'Somewhat disagree', emoji: '😕', scoreAdjustment: -2 },
            { value: 5, label: 'Completely disagree', emoji: '😢', scoreAdjustment: -5 },
          ],
        },
      },
      {
        type: 'MCQ',
        domain: 'intelligence',
        attribute: 'INTRAPERSONAL',
        metadata: {
          questionId: 27,
          text: 'I work best when the activity is self-paced',
          domainDisplayName: 'Intrapersonal Intelligence',
          options: [
            { value: 1, label: 'Completely agree', emoji: '😊', scoreAdjustment: 5 },
            { value: 2, label: 'Somewhat agree', emoji: '🙂', scoreAdjustment: 2 },
            { value: 3, label: 'Unsure', emoji: '😐', scoreAdjustment: 0 },
            { value: 4, label: 'Somewhat disagree', emoji: '😕', scoreAdjustment: -2 },
            { value: 5, label: 'Completely disagree', emoji: '😢', scoreAdjustment: -5 },
          ],
        },
      },
      {
        type: 'MCQ',
        domain: 'intelligence',
        attribute: 'LOGICAL_MATHEMATICAL',
        metadata: {
          questionId: 28,
          text: 'I remember things exactly as they are said to me',
          domainDisplayName: 'Logical-Mathematical Intelligence',
          options: [
            { value: 1, label: 'Completely agree', emoji: '😊', scoreAdjustment: 5 },
            { value: 2, label: 'Somewhat agree', emoji: '🙂', scoreAdjustment: 2 },
            { value: 3, label: 'Unsure', emoji: '😐', scoreAdjustment: 0 },
            { value: 4, label: 'Somewhat disagree', emoji: '😕', scoreAdjustment: -2 },
            { value: 5, label: 'Completely disagree', emoji: '😢', scoreAdjustment: -5 },
          ],
        },
      },
      {
        type: 'MCQ',
        domain: 'intelligence',
        attribute: 'MUSICAL',
        metadata: {
          questionId: 29,
          text: 'I like setting songs and poems to music',
          domainDisplayName: 'Musical Intelligence',
          options: [
            { value: 1, label: 'Completely agree', emoji: '😊', scoreAdjustment: 5 },
            { value: 2, label: 'Somewhat agree', emoji: '🙂', scoreAdjustment: 2 },
            { value: 3, label: 'Unsure', emoji: '😐', scoreAdjustment: 0 },
            { value: 4, label: 'Somewhat disagree', emoji: '😕', scoreAdjustment: -2 },
            { value: 5, label: 'Completely disagree', emoji: '😢', scoreAdjustment: -5 },
          ],
        },
      },
      {
        type: 'MCQ',
        domain: 'intelligence',
        attribute: 'NATURALISTIC',
        metadata: {
          questionId: 30,
          text: 'I enjoy digging for and discovering artifacts and unusual items',
          domainDisplayName: 'Naturalistic Intelligence',
          options: [
            { value: 1, label: 'Completely agree', emoji: '😊', scoreAdjustment: 5 },
            { value: 2, label: 'Somewhat agree', emoji: '🙂', scoreAdjustment: 2 },
            { value: 3, label: 'Unsure', emoji: '😐', scoreAdjustment: 0 },
            { value: 4, label: 'Somewhat disagree', emoji: '😕', scoreAdjustment: -2 },
            { value: 5, label: 'Completely disagree', emoji: '😢', scoreAdjustment: -5 },
          ],
        },
      },
      {
        type: 'MCQ',
        domain: 'intelligence',
        attribute: 'INTERPERSONAL',
        metadata: {
          questionId: 31,
          text: 'I prefer group activities rather than ones I do alone',
          domainDisplayName: 'Interpersonal Intelligence',
          options: [
            { value: 1, label: 'Completely agree', emoji: '😊', scoreAdjustment: 5 },
            { value: 2, label: 'Somewhat agree', emoji: '🙂', scoreAdjustment: 2 },
            { value: 3, label: 'Unsure', emoji: '😐', scoreAdjustment: 0 },
            { value: 4, label: 'Somewhat disagree', emoji: '😕', scoreAdjustment: -2 },
            { value: 5, label: 'Completely disagree', emoji: '😢', scoreAdjustment: -5 },
          ],
        },
      },
      {
        type: 'MCQ',
        domain: 'intelligence',
        attribute: 'SPATIAL',
        metadata: {
          questionId: 32,
          text: 'I have a good sense of direction',
          domainDisplayName: 'Spatial Intelligence',
          options: [
            { value: 1, label: 'Completely agree', emoji: '😊', scoreAdjustment: 5 },
            { value: 2, label: 'Somewhat agree', emoji: '🙂', scoreAdjustment: 2 },
            { value: 3, label: 'Unsure', emoji: '😐', scoreAdjustment: 0 },
            { value: 4, label: 'Somewhat disagree', emoji: '😕', scoreAdjustment: -2 },
            { value: 5, label: 'Completely disagree', emoji: '😢', scoreAdjustment: -5 },
          ],
        },
      },
      {
        type: 'MCQ',
        domain: 'intelligence',
        attribute: 'LINGUISTIC',
        metadata: {
          questionId: 33,
          text: 'I like to take part in debates and/or discussions',
          domainDisplayName: 'Linguistic Intelligence',
          options: [
            { value: 1, label: 'Completely agree', emoji: '😊', scoreAdjustment: 5 },
            { value: 2, label: 'Somewhat agree', emoji: '🙂', scoreAdjustment: 2 },
            { value: 3, label: 'Unsure', emoji: '😐', scoreAdjustment: 0 },
            { value: 4, label: 'Somewhat disagree', emoji: '😕', scoreAdjustment: -2 },
            { value: 5, label: 'Completely disagree', emoji: '😢', scoreAdjustment: -5 },
          ],
        },
      },
      {
        type: 'MCQ',
        domain: 'intelligence',
        attribute: 'MUSICAL',
        metadata: {
          questionId: 34,
          text: 'I keep time when music is playing',
          domainDisplayName: 'Musical Intelligence',
          options: [
            { value: 1, label: 'Completely agree', emoji: '😊', scoreAdjustment: 5 },
            { value: 2, label: 'Somewhat agree', emoji: '🙂', scoreAdjustment: 2 },
            { value: 3, label: 'Unsure', emoji: '😐', scoreAdjustment: 0 },
            { value: 4, label: 'Somewhat disagree', emoji: '😕', scoreAdjustment: -2 },
            { value: 5, label: 'Completely disagree', emoji: '😢', scoreAdjustment: -5 },
          ],
        },
      },
      {
        type: 'MCQ',
        domain: 'intelligence',
        attribute: 'SPATIAL',
        metadata: {
          questionId: 35,
          text: 'I like to watch the scenes and activities in movies',
          domainDisplayName: 'Spatial Intelligence',
          options: [
            { value: 1, label: 'Completely agree', emoji: '😊', scoreAdjustment: 5 },
            { value: 2, label: 'Somewhat agree', emoji: '🙂', scoreAdjustment: 2 },
            { value: 3, label: 'Unsure', emoji: '😐', scoreAdjustment: 0 },
            { value: 4, label: 'Somewhat disagree', emoji: '😕', scoreAdjustment: -2 },
            { value: 5, label: 'Completely disagree', emoji: '😢', scoreAdjustment: -5 },
          ],
        },
      },
      {
        type: 'MCQ',
        domain: 'intelligence',
        attribute: 'LOGICAL_MATHEMATICAL',
        metadata: {
          questionId: 36,
          text: 'I like to ask "why" questions and seek clarification of issues and concerns',
          domainDisplayName: 'Logical-Mathematical Intelligence',
          options: [
            { value: 1, label: 'Completely agree', emoji: '😊', scoreAdjustment: 5 },
            { value: 2, label: 'Somewhat agree', emoji: '🙂', scoreAdjustment: 2 },
            { value: 3, label: 'Unsure', emoji: '😐', scoreAdjustment: 0 },
            { value: 4, label: 'Somewhat disagree', emoji: '😕', scoreAdjustment: -2 },
            { value: 5, label: 'Completely disagree', emoji: '😢', scoreAdjustment: -5 },
          ],
        },
      },
      {
        type: 'MCQ',
        domain: 'intelligence',
        attribute: 'BODILY_KINESTHETIC',
        metadata: {
          questionId: 37,
          text: 'I like working with my hands',
          domainDisplayName: 'Bodily-Kinesthetic Intelligence',
          options: [
            { value: 1, label: 'Completely agree', emoji: '😊', scoreAdjustment: 5 },
            { value: 2, label: 'Somewhat agree', emoji: '🙂', scoreAdjustment: 2 },
            { value: 3, label: 'Unsure', emoji: '😐', scoreAdjustment: 0 },
            { value: 4, label: 'Somewhat disagree', emoji: '😕', scoreAdjustment: -2 },
            { value: 5, label: 'Completely disagree', emoji: '😢', scoreAdjustment: -5 },
          ],
        },
      },
      {
        type: 'MCQ',
        domain: 'intelligence',
        attribute: 'INTERPERSONAL',
        metadata: {
          questionId: 38,
          text: 'I enjoy learning about different cultures',
          domainDisplayName: 'Interpersonal Intelligence',
          options: [
            { value: 1, label: 'Completely agree', emoji: '😊', scoreAdjustment: 5 },
            { value: 2, label: 'Somewhat agree', emoji: '🙂', scoreAdjustment: 2 },
            { value: 3, label: 'Unsure', emoji: '😐', scoreAdjustment: 0 },
            { value: 4, label: 'Somewhat disagree', emoji: '😕', scoreAdjustment: -2 },
            { value: 5, label: 'Completely disagree', emoji: '😢', scoreAdjustment: -5 },
          ],
        },
      },
      {
        type: 'MCQ',
        domain: 'intelligence',
        attribute: 'INTRAPERSONAL',
        metadata: {
          questionId: 39,
          text: 'I am not easily influenced by other people',
          domainDisplayName: 'Intrapersonal Intelligence',
          options: [
            { value: 1, label: 'Completely agree', emoji: '😊', scoreAdjustment: 5 },
            { value: 2, label: 'Somewhat agree', emoji: '🙂', scoreAdjustment: 2 },
            { value: 3, label: 'Unsure', emoji: '😐', scoreAdjustment: 0 },
            { value: 4, label: 'Somewhat disagree', emoji: '😕', scoreAdjustment: -2 },
            { value: 5, label: 'Completely disagree', emoji: '😢', scoreAdjustment: -5 },
          ],
        },
      },
      {
        type: 'MCQ',
        domain: 'intelligence',
        attribute: 'NATURALISTIC',
        metadata: {
          questionId: 40,
          text: 'I prefer to be outdoors rather than indoors',
          domainDisplayName: 'Naturalistic Intelligence',
          options: [
            { value: 1, label: 'Completely agree', emoji: '😊', scoreAdjustment: 5 },
            { value: 2, label: 'Somewhat agree', emoji: '🙂', scoreAdjustment: 2 },
            { value: 3, label: 'Unsure', emoji: '😐', scoreAdjustment: 0 },
            { value: 4, label: 'Somewhat disagree', emoji: '😕', scoreAdjustment: -2 },
            { value: 5, label: 'Completely disagree', emoji: '😢', scoreAdjustment: -5 },
          ],
        },
      },
      {
        type: 'MCQ',
        domain: 'intelligence',
        attribute: 'LOGICAL_MATHEMATICAL',
        metadata: {
          questionId: 41,
          text: 'I work best when I have a day planner or timetable',
          domainDisplayName: 'Logical-Mathematical Intelligence',
          options: [
            { value: 1, label: 'Completely agree', emoji: '😊', scoreAdjustment: 5 },
            { value: 2, label: 'Somewhat agree', emoji: '🙂', scoreAdjustment: 2 },
            { value: 3, label: 'Unsure', emoji: '😐', scoreAdjustment: 0 },
            { value: 4, label: 'Somewhat disagree', emoji: '😕', scoreAdjustment: -2 },
            { value: 5, label: 'Completely disagree', emoji: '😢', scoreAdjustment: -5 },
          ],
        },
      },
      {
        type: 'MCQ',
        domain: 'intelligence',
        attribute: 'LINGUISTIC',
        metadata: {
          questionId: 42,
          text: 'I have vivid dreams when sleeping',
          domainDisplayName: 'Linguistic Intelligence',
          options: [
            { value: 1, label: 'Completely agree', emoji: '😊', scoreAdjustment: 5 },
            { value: 2, label: 'Somewhat agree', emoji: '🙂', scoreAdjustment: 2 },
            { value: 3, label: 'Unsure', emoji: '😐', scoreAdjustment: 0 },
            { value: 4, label: 'Somewhat disagree', emoji: '😕', scoreAdjustment: -2 },
            { value: 5, label: 'Completely disagree', emoji: '😢', scoreAdjustment: -5 },
          ],
        },
      },
      {
        type: 'MCQ',
        domain: 'intelligence',
        attribute: 'LINGUISTIC',
        metadata: {
          questionId: 43,
          text: 'I prefer writing long- and short-answer responses rather than multiple-choice responses',
          domainDisplayName: 'Linguistic Intelligence',
          options: [
            { value: 1, label: 'Completely agree', emoji: '😊', scoreAdjustment: 5 },
            { value: 2, label: 'Somewhat agree', emoji: '🙂', scoreAdjustment: 2 },
            { value: 3, label: 'Unsure', emoji: '😐', scoreAdjustment: 0 },
            { value: 4, label: 'Somewhat disagree', emoji: '😕', scoreAdjustment: -2 },
            { value: 5, label: 'Completely disagree', emoji: '😢', scoreAdjustment: -5 },
          ],
        },
      },
      {
        type: 'MCQ',
        domain: 'intelligence',
        attribute: 'NATURALISTIC',
        metadata: {
          questionId: 44,
          text: 'I like planting and caring for a garden',
          domainDisplayName: 'Naturalistic Intelligence',
          options: [
            { value: 1, label: 'Completely agree', emoji: '😊', scoreAdjustment: 5 },
            { value: 2, label: 'Somewhat agree', emoji: '🙂', scoreAdjustment: 2 },
            { value: 3, label: 'Unsure', emoji: '😐', scoreAdjustment: 0 },
            { value: 4, label: 'Somewhat disagree', emoji: '😕', scoreAdjustment: -2 },
            { value: 5, label: 'Completely disagree', emoji: '😢', scoreAdjustment: -5 },
          ],
        },
      },
      {
        type: 'MCQ',
        domain: 'intelligence',
        attribute: 'MUSICAL',
        metadata: {
          questionId: 45,
          text: 'I can hear an off-key note',
          domainDisplayName: 'Musical Intelligence',
          options: [
            { value: 1, label: 'Completely agree', emoji: '😊', scoreAdjustment: 5 },
            { value: 2, label: 'Somewhat agree', emoji: '🙂', scoreAdjustment: 2 },
            { value: 3, label: 'Unsure', emoji: '😐', scoreAdjustment: 0 },
            { value: 4, label: 'Somewhat disagree', emoji: '😕', scoreAdjustment: -2 },
            { value: 5, label: 'Completely disagree', emoji: '😢', scoreAdjustment: -5 },
          ],
        },
      },
      {
        type: 'MCQ',
        domain: 'intelligence',
        attribute: 'INTERPERSONAL',
        metadata: {
          questionId: 46,
          text: 'I usually talk over my personal problems with a friend',
          domainDisplayName: 'Interpersonal Intelligence',
          options: [
            { value: 1, label: 'Completely agree', emoji: '😊', scoreAdjustment: 5 },
            { value: 2, label: 'Somewhat agree', emoji: '🙂', scoreAdjustment: 2 },
            { value: 3, label: 'Unsure', emoji: '😐', scoreAdjustment: 0 },
            { value: 4, label: 'Somewhat disagree', emoji: '😕', scoreAdjustment: -2 },
            { value: 5, label: 'Completely disagree', emoji: '😢', scoreAdjustment: -5 },
          ],
        },
      },
      {
        type: 'MCQ',
        domain: 'intelligence',
        attribute: 'INTRAPERSONAL',
        metadata: {
          questionId: 47,
          text: 'I like to think about abstract concepts',
          domainDisplayName: 'Intrapersonal Intelligence',
          options: [
            { value: 1, label: 'Completely agree', emoji: '😊', scoreAdjustment: 5 },
            { value: 2, label: 'Somewhat agree', emoji: '🙂', scoreAdjustment: 2 },
            { value: 3, label: 'Unsure', emoji: '😐', scoreAdjustment: 0 },
            { value: 4, label: 'Somewhat disagree', emoji: '😕', scoreAdjustment: -2 },
            { value: 5, label: 'Completely disagree', emoji: '😢', scoreAdjustment: -5 },
          ],
        },
      },
      {
        type: 'MCQ',
        domain: 'intelligence',
        attribute: 'BODILY_KINESTHETIC',
        metadata: {
          questionId: 48,
          text: 'I prefer to be physically involved rather than sitting and watching',
          domainDisplayName: 'Bodily-Kinesthetic Intelligence',
          options: [
            { value: 1, label: 'Completely agree', emoji: '😊', scoreAdjustment: 5 },
            { value: 2, label: 'Somewhat agree', emoji: '🙂', scoreAdjustment: 2 },
            { value: 3, label: 'Unsure', emoji: '😐', scoreAdjustment: 0 },
            { value: 4, label: 'Somewhat disagree', emoji: '😕', scoreAdjustment: -2 },
            { value: 5, label: 'Completely disagree', emoji: '😢', scoreAdjustment: -5 },
          ],
        },
      },
      {
        type: 'MCQ',
        domain: 'intelligence',
        attribute: 'MUSICAL',
        metadata: {
          questionId: 49,
          text: 'I find it easy to engage in musical activities',
          domainDisplayName: 'Musical Intelligence',
          options: [
            { value: 1, label: 'Completely agree', emoji: '😊', scoreAdjustment: 5 },
            { value: 2, label: 'Somewhat agree', emoji: '🙂', scoreAdjustment: 2 },
            { value: 3, label: 'Unsure', emoji: '😐', scoreAdjustment: 0 },
            { value: 4, label: 'Somewhat disagree', emoji: '😕', scoreAdjustment: -2 },
            { value: 5, label: 'Completely disagree', emoji: '😢', scoreAdjustment: -5 },
          ],
        },
      },
      {
        type: 'MCQ',
        domain: 'intelligence',
        attribute: 'BODILY_KINESTHETIC',
        metadata: {
          questionId: 50,
          text: 'I understand best by doing (e.g. touching, moving and interacting)',
          domainDisplayName: 'Bodily-Kinesthetic Intelligence',
          options: [
            { value: 1, label: 'Completely agree', emoji: '😊', scoreAdjustment: 5 },
            { value: 2, label: 'Somewhat agree', emoji: '🙂', scoreAdjustment: 2 },
            { value: 3, label: 'Unsure', emoji: '😐', scoreAdjustment: 0 },
            { value: 4, label: 'Somewhat disagree', emoji: '😕', scoreAdjustment: -2 },
            { value: 5, label: 'Completely disagree', emoji: '😢', scoreAdjustment: -5 },
          ],
        },
      },
      {
        type: 'MCQ',
        domain: 'intelligence',
        attribute: 'MUSICAL',
        metadata: {
          questionId: 51,
          text: 'I often raise questions concerning values and beliefs',
          domainDisplayName: 'Musical Intelligence',
          options: [
            { value: 1, label: 'Completely agree', emoji: '😊', scoreAdjustment: 5 },
            { value: 2, label: 'Somewhat agree', emoji: '🙂', scoreAdjustment: 2 },
            { value: 3, label: 'Unsure', emoji: '😐', scoreAdjustment: 0 },
            { value: 4, label: 'Somewhat disagree', emoji: '😕', scoreAdjustment: -2 },
            { value: 5, label: 'Completely disagree', emoji: '😢', scoreAdjustment: -5 },
          ],
        },
      },
      {
        type: 'MCQ',
        domain: 'intelligence',
        attribute: 'LOGICAL_MATHEMATICAL',
        metadata: {
          questionId: 52,
          text: 'I quickly grasp cause and effect relationships',
          domainDisplayName: 'Logical-Mathematical Intelligence',
          options: [
            { value: 1, label: 'Completely agree', emoji: '😊', scoreAdjustment: 5 },
            { value: 2, label: 'Somewhat agree', emoji: '🙂', scoreAdjustment: 2 },
            { value: 3, label: 'Unsure', emoji: '😐', scoreAdjustment: 0 },
            { value: 4, label: 'Somewhat disagree', emoji: '😕', scoreAdjustment: -2 },
            { value: 5, label: 'Completely disagree', emoji: '😢', scoreAdjustment: -5 },
          ],
        },
      },
      {
        type: 'MCQ',
        domain: 'intelligence',
        attribute: 'LOGICAL_MATHEMATICAL',
        metadata: {
          questionId: 53,
          text: 'I can anticipate the moves and consequences in a game plan (e.g. hockey sense, chess sense)',
          domainDisplayName: 'Logical-Mathematical Intelligence',
          options: [
            { value: 1, label: 'Completely agree', emoji: '😊', scoreAdjustment: 5 },
            { value: 2, label: 'Somewhat agree', emoji: '🙂', scoreAdjustment: 2 },
            { value: 3, label: 'Unsure', emoji: '😐', scoreAdjustment: 0 },
            { value: 4, label: 'Somewhat disagree', emoji: '😕', scoreAdjustment: -2 },
            { value: 5, label: 'Completely disagree', emoji: '😢', scoreAdjustment: -5 },
          ],
        },
      },
      {
        type: 'MCQ',
        domain: 'intelligence',
        attribute: 'LINGUISTIC',
        metadata: {
          questionId: 54,
          text: 'I enjoy keeping a written journal and/or writing stories and articles',
          domainDisplayName: 'Linguistic Intelligence',
          options: [
            { value: 1, label: 'Completely agree', emoji: '😊', scoreAdjustment: 5 },
            { value: 2, label: 'Somewhat agree', emoji: '🙂', scoreAdjustment: 2 },
            { value: 3, label: 'Unsure', emoji: '😐', scoreAdjustment: 0 },
            { value: 4, label: 'Somewhat disagree', emoji: '😕', scoreAdjustment: -2 },
            { value: 5, label: 'Completely disagree', emoji: '😢', scoreAdjustment: -5 },
          ],
        },
      },
      {
        type: 'MCQ',
        domain: 'intelligence',
        attribute: 'SPATIAL',
        metadata: {
          questionId: 55,
          text: 'I enjoy fishing and tracking',
          domainDisplayName: 'Spatial Intelligence',
          options: [
            { value: 1, label: 'Completely agree', emoji: '😊', scoreAdjustment: 5 },
            { value: 2, label: 'Somewhat agree', emoji: '🙂', scoreAdjustment: 2 },
            { value: 3, label: 'Unsure', emoji: '😐', scoreAdjustment: 0 },
            { value: 4, label: 'Somewhat disagree', emoji: '😕', scoreAdjustment: -2 },
            { value: 5, label: 'Completely disagree', emoji: '😢', scoreAdjustment: -5 },
          ],
        },
      },
      {
        type: 'MCQ',
        domain: 'intelligence',
        attribute: 'INTERPERSONAL',
        metadata: {
          questionId: 56,
          text: 'I enjoy sharing my ideas and feelings with others',
          domainDisplayName: 'Interpersonal Intelligence',
          options: [
            { value: 1, label: 'Completely agree', emoji: '😊', scoreAdjustment: 5 },
            { value: 2, label: 'Somewhat agree', emoji: '🙂', scoreAdjustment: 2 },
            { value: 3, label: 'Unsure', emoji: '😐', scoreAdjustment: 0 },
            { value: 4, label: 'Somewhat disagree', emoji: '😕', scoreAdjustment: -2 },
            { value: 5, label: 'Completely disagree', emoji: '😢', scoreAdjustment: -5 },
          ],
        },
      },
      {
        type: 'MCQ',
        domain: 'intelligence',
        attribute: 'BODILY_KINESTHETIC',
        metadata: {
          questionId: 57,
          text: 'I enjoy creating things with my hands',
          domainDisplayName: 'Bodily-Kinesthetic Intelligence',
          options: [
            { value: 1, label: 'Completely agree', emoji: '😊', scoreAdjustment: 5 },
            { value: 2, label: 'Somewhat agree', emoji: '🙂', scoreAdjustment: 2 },
            { value: 3, label: 'Unsure', emoji: '😐', scoreAdjustment: 0 },
            { value: 4, label: 'Somewhat disagree', emoji: '😕', scoreAdjustment: -2 },
            { value: 5, label: 'Completely disagree', emoji: '😢', scoreAdjustment: -5 },
          ],
        },
      },
      {
        type: 'MCQ',
        domain: 'intelligence',
        attribute: 'LINGUISTIC',
        metadata: {
          questionId: 58,
          text: 'I like to read a lot',
          domainDisplayName: 'Linguistic Intelligence',
          options: [
            { value: 1, label: 'Completely agree', emoji: '😊', scoreAdjustment: 5 },
            { value: 2, label: 'Somewhat agree', emoji: '🙂', scoreAdjustment: 2 },
            { value: 3, label: 'Unsure', emoji: '😐', scoreAdjustment: 0 },
            { value: 4, label: 'Somewhat disagree', emoji: '😕', scoreAdjustment: -2 },
            { value: 5, label: 'Completely disagree', emoji: '😢', scoreAdjustment: -5 },
          ],
        },
      },
      {
        type: 'MCQ',
        domain: 'intelligence',
        attribute: 'MUSICAL',
        metadata: {
          questionId: 59,
          text: 'I feel proud of my musical accomplishments',
          domainDisplayName: 'Musical Intelligence',
          options: [
            { value: 1, label: 'Completely agree', emoji: '😊', scoreAdjustment: 5 },
            { value: 2, label: 'Somewhat agree', emoji: '🙂', scoreAdjustment: 2 },
            { value: 3, label: 'Unsure', emoji: '😐', scoreAdjustment: 0 },
            { value: 4, label: 'Somewhat disagree', emoji: '😕', scoreAdjustment: -2 },
            { value: 5, label: 'Completely disagree', emoji: '😢', scoreAdjustment: -5 },
          ],
        },
      },
      {
        type: 'MCQ',
        domain: 'intelligence',
        attribute: 'NATURALISTIC',
        metadata: {
          questionId: 60,
          text: 'I learn best when I can go on field trips to explore and observe nature exhibits, museums, or the outdoors',
          domainDisplayName: 'Naturalistic Intelligence',
          options: [
            { value: 1, label: 'Completely agree', emoji: '😊', scoreAdjustment: 5 },
            { value: 2, label: 'Somewhat agree', emoji: '🙂', scoreAdjustment: 2 },
            { value: 3, label: 'Unsure', emoji: '😐', scoreAdjustment: 0 },
            { value: 4, label: 'Somewhat disagree', emoji: '😕', scoreAdjustment: -2 },
            { value: 5, label: 'Completely disagree', emoji: '😢', scoreAdjustment: -5 },
          ],
        },
      },
      {
        type: 'MCQ',
        domain: 'intelligence',
        attribute: 'SPATIAL',
        metadata: {
          questionId: 61,
          text: 'I am good at estimating',
          domainDisplayName: 'Spatial Intelligence',
          options: [
            { value: 1, label: 'Completely agree', emoji: '😊', scoreAdjustment: 5 },
            { value: 2, label: 'Somewhat agree', emoji: '🙂', scoreAdjustment: 2 },
            { value: 3, label: 'Unsure', emoji: '😐', scoreAdjustment: 0 },
            { value: 4, label: 'Somewhat disagree', emoji: '😕', scoreAdjustment: -2 },
            { value: 5, label: 'Completely disagree', emoji: '😢', scoreAdjustment: -5 },
          ],
        },
      },
      {
        type: 'MCQ',
        domain: 'intelligence',
        attribute: 'NATURALISTIC',
        metadata: {
          questionId: 62,
          text: 'I work best in a co-operative group where I can discuss issues with others',
          domainDisplayName: 'Naturalistic Intelligence',
          options: [
            { value: 1, label: 'Completely agree', emoji: '😊', scoreAdjustment: 5 },
            { value: 2, label: 'Somewhat agree', emoji: '🙂', scoreAdjustment: 2 },
            { value: 3, label: 'Unsure', emoji: '😐', scoreAdjustment: 0 },
            { value: 4, label: 'Somewhat disagree', emoji: '😕', scoreAdjustment: -2 },
            { value: 5, label: 'Completely disagree', emoji: '😢', scoreAdjustment: -5 },
          ],
        },
      },
      {
        type: 'MCQ',
        domain: 'intelligence',
        attribute: 'INTRAPERSONAL',
        metadata: {
          questionId: 63,
          text: 'I enjoy contemplating the big picture and universal questions',
          domainDisplayName: 'Intrapersonal Intelligence',
          options: [
            { value: 1, label: 'Completely agree', emoji: '😊', scoreAdjustment: 5 },
            { value: 2, label: 'Somewhat agree', emoji: '🙂', scoreAdjustment: 2 },
            { value: 3, label: 'Unsure', emoji: '😐', scoreAdjustment: 0 },
            { value: 4, label: 'Somewhat disagree', emoji: '😕', scoreAdjustment: -2 },
            { value: 5, label: 'Completely disagree', emoji: '😢', scoreAdjustment: -5 },
          ],
        },
      },
      {
        type: 'MCQ',
        domain: 'intelligence',
        attribute: 'SPATIAL',
        metadata: {
          questionId: 64,
          text: 'I remember things best by seeing them',
          domainDisplayName: 'Spatial Intelligence',
          options: [
            { value: 1, label: 'Completely agree', emoji: '😊', scoreAdjustment: 5 },
            { value: 2, label: 'Somewhat agree', emoji: '🙂', scoreAdjustment: 2 },
            { value: 3, label: 'Unsure', emoji: '😐', scoreAdjustment: 0 },
            { value: 4, label: 'Somewhat disagree', emoji: '😕', scoreAdjustment: -2 },
            { value: 5, label: 'Completely disagree', emoji: '😢', scoreAdjustment: -5 },
          ],
        },
      },
    ];

    // Bulk insert all activities
    for (const activity of activities) {
      await queryRunner.query(
        `INSERT INTO "activities" ("assessmentId", "type", "domain", "attribute", "metadata") 
         VALUES ($1, $2, $3, $4, $5)`,
        [
          assessmentId,
          activity.type,
          activity.domain,
          activity.attribute,
          JSON.stringify(activity.metadata),
        ],
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Find the Baseline assessment
    const result = await queryRunner.query(`SELECT id FROM "assessments" WHERE "name" = 'Baseline'`);

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

