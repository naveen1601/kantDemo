export default {
    ALLOW_FONT_SCALING: false,
    PASSWORD_PATTERN: '^(?=.*[A-Za-z])(?=.*\\d)(?=.*[\\s!#$£¬%&\'()*+,-.\/:;=?@[\\\\\\]^_`{|}~"])[A-Za-z\\d\\s!#$£¬%&\'()*+,-.\/:;=?@[\\\\\\]^_`{|}~"]',
    PASSWORD_MAX_CHARACTERS: 128,
    PASSWORD_MIN_CHARACTERS: 6,
    COMPETENCY_LIST: [],
    BOTS_NUMBER_ARRAY: [8, 10, 12],
    LEADERBOARD_TIMER: 10,
    GRADE_TIMER: [{
        maxGrade: 12,
        timer: 90
    },
    {
        maxGrade: 8,
        timer: 105
    },
    {
        maxGrade: 5,
        timer: 120
    }]
};