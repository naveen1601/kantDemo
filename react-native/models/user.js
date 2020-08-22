export default class user {
    constructor(loginResponse) {

        this.name= loginResponse?.user?.name;
        this.surName= loginResponse?.user?.surname;
        this.userName= loginResponse?.user?.username;
        this.schoolName= loginResponse?.user?.school?.name;

        this.grade= loginResponse?.user?.gradesections[0]?.grade?.name;
        this.section = loginResponse?.user?.gradesections[0]?.section?.name;

        this.competencylevel= loginResponse?.user?.competencylevel.level;
        this.userName= loginResponse?.user?.username;
        this.token= loginResponse?.token;
    }
}