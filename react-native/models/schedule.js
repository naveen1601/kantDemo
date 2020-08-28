export default class schedule {
    constructor(scheduleResponse) {

        this.startDate= scheduleResponse?.startDate;
        this.endDate= scheduleResponse?.endDate;
        this.quizList= scheduleResponse?.quiz;
        this.quizId = scheduleResponse?.id;
    }
}