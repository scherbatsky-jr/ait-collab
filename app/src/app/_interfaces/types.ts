interface UserInfo {
    firstName: string
    lastName: string
    email: string
    username: string
    gender: string
    nationality: string
    mentor: Boolean
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

interface Event {
    id: String
    name: String
    type: String
    location: String
    date: {
        year: any
        month: any
        day: any
    }
    time: {
        hour: any
        minute: any
    }
    description: String
    participants: Array<string>
}

interface EventInput {
    name: String
    type: String
    location: String
    date: Object
    time: Object
    description: String
    participants: Array<string>
}

export {
    AcademicInfo,
    ChatMessage,
    Event,
    EventInput,
    FieldOfStudy,
    DropdownOption,
    Department,
    School,
    UserInfo
}