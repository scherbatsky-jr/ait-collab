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
    departments: Array<Department>
}

interface Department {
    name: String,
    code: String,
    fieldOfStudies: Array<FieldOfStudy>
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
    schoolCode: String,
    departmentCode: String,
    program: String,
    fieldOfStudy: String
}

interface ChatMessage {
    chatId: Number | String;
    userId: Number | String;
    text: String;
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