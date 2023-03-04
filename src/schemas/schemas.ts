type ClassInfo = {
    classID: number
    className: string
    classTimes: number
    startDate: string
    courseDescription: string
    officeHours: string
    professorEmail: string
    classTextbook: string
    gradingScale: number
}

type StudentInfo = {
    username: string
    studentID: number
    firstName: string
    lastName: string
    userEmail: string
    classification: string
}

type StudyTimer ={
    startTime: number
    shortBreakTime: number
    longBreakTime: number
    endTime: number
    taskCompletion: Array<Task>
}

type Task ={
    name: string
    type: string
    dueDate: string
    dueTime: number
}

type Calendar ={
    dueDate: string
}

type notification = {
    taskInfo: Task
    exam: ExamSchedule
}

type GradeCalculator = {
    currentGrade: number
    gradeWeight: number
    letterGrade: string
}

type StudySession = {
    vocabTerm: string
    vocabDefinition: string 
    rightAnswerCounter: number
    wrongAnswerCounter: number
}

type ExamSchedule = {
    pointsPossible: number
    letterGrade: string
    examTime: number
    examDate: string
}