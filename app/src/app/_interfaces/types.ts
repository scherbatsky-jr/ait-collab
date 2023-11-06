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
    courses: Array<Course>
}

interface Course {
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

export {
    AcademicInfo,
    Course,
    DropdownOption,
    Department,
    School,
    UserInfo
}