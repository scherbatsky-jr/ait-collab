interface UserInfo {
    firstName: string
    lastName: string
    email: string
    username: string
    gender: string
    nationality: string
    dateOfBirth: Date | null
    academicInfo?: AcademicInfo
}

interface School {
    name: String;
    code: String;
    _id: String;
    fieldOfStudies: Array<FieldOfStudy>
}

interface Department {
    name: String,
    code: String,
}

interface FieldOfStudy {
    name: String,
    code: String
}

interface DropdownOption {
    label: String,
    value: Number | String
}

interface AcademicInfo {
    intakeYear: String,
    intakeMonth: String,
    school: String,
    program: String,
    fieldOfStudy: String
}

interface ChatMessage {
    chatId: Number | String;
    userId: Number | String;
    message: String;
}

export {
    AcademicInfo,
    ChatMessage,
    FieldOfStudy,
    DropdownOption,
    Department,
    School,
    UserInfo
}