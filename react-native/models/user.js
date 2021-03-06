export default class user {
    constructor(loginResponse) {

        this.name = loginResponse?.user?.name;
        this.surName = loginResponse?.user?.surname;
        this.userName = loginResponse?.user?.username;
        this.schoolName = loginResponse?.user?.school?.name;
        this.schoolCode = loginResponse?.user?.school?.schoolCode;
        this.sponsoredBy = loginResponse?.user?.school?.sponsored

        this.grade = loginResponse?.user?.gradesections[0]?.grade?.name;
        this.section = loginResponse?.user?.gradesections[0]?.section?.name;

        this.competencylevelFromAPI = loginResponse?.user?.competency && parseInt (loginResponse.user.competency);
        this.userName = loginResponse?.user?.username;
        this.token = loginResponse?.token;
        this.userId = loginResponse?.user?.id;
        this.rollNumber = loginResponse?.user?.rollNumber;
        
    }
}